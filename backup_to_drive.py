import gzip
import os
import shutil
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent
DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file"
load_dotenv(BASE_DIR / ".env")


def required_setting(name):
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required setting: {name}")
    return value


def create_database_dump(output_path):
    dump_executable = os.environ.get("MYSQLDUMP_PATH", r"C:\xampp\mysql\bin\mysqldump.exe")
    database = os.environ.get("DB_NAME", "hostel_tracker")
    database_host = os.environ.get("DB_HOST", "localhost")
    database_user = os.environ.get("DB_USER", "root")
    database_password = os.environ.get("DB_PASSWORD", "")

    if not Path(dump_executable).is_file():
        raise RuntimeError(f"mysqldump not found: {dump_executable}")

    command = [
        dump_executable,
        f"--host={database_host}",
        f"--user={database_user}",
        "--single-transaction",
        "--routines",
        "--events",
        "--triggers",
        database,
    ]
    environment = os.environ.copy()
    environment["MYSQL_PWD"] = database_password

    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=environment,
    )
    with gzip.open(output_path, "wb") as compressed_dump:
        shutil.copyfileobj(process.stdout, compressed_dump)
    _, stderr = process.communicate()
    if process.returncode != 0:
        raise RuntimeError(stderr.decode(errors="replace").strip())


def upload_to_drive(file_path):
    folder_id = required_setting("GOOGLE_DRIVE_FOLDER_ID")
    oauth_client_path = os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET_FILE", "").strip()
    if oauth_client_path:
        token_path = Path(os.environ.get("GOOGLE_OAUTH_TOKEN_FILE", BASE_DIR / "google-drive-token.json"))
        credentials = Credentials.from_authorized_user_file(token_path, [DRIVE_SCOPE]) if token_path.is_file() else None
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        if not credentials or not credentials.valid:
            flow = InstalledAppFlow.from_client_secrets_file(oauth_client_path, [DRIVE_SCOPE])
            credentials = flow.run_local_server(port=0)
        token_path.write_text(credentials.to_json())
    else:
        credentials_path = Path(required_setting("GOOGLE_SERVICE_ACCOUNT_FILE"))
        credentials = service_account.Credentials.from_service_account_file(credentials_path, scopes=[DRIVE_SCOPE])
    drive = build("drive", "v3", credentials=credentials, cache_discovery=False)
    metadata = {"name": file_path.name, "parents": [folder_id]}
    with file_path.open("rb") as backup_stream:
        media = MediaIoBaseUpload(backup_stream, mimetype="application/gzip", resumable=True)
        uploaded = drive.files().create(body=metadata, media_body=media, fields="id,name").execute()
    print(f"Uploaded {uploaded['name']} ({uploaded['id']})")


def main():
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    database = os.environ.get("DB_NAME", "hostel_tracker")
    with tempfile.TemporaryDirectory(prefix="rkh-backup-") as temporary_directory:
        dump_path = Path(temporary_directory) / f"{database}-{timestamp}.sql.gz"
        create_database_dump(dump_path)
        upload_to_drive(dump_path)
    print("Daily Google Drive backup completed.")


if __name__ == "__main__":
    main()