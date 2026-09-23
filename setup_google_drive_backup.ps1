param(
    [string]$TaskName = "RKH ERP Daily Google Drive Backup",
    [string]$RunAt = "02:00"
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$python = Join-Path $projectRoot ".venv\Scripts\python.exe"
$script = Join-Path $projectRoot "backup_to_drive.py"

if (-not (Test-Path $python)) {
    throw "Virtual environment not found: $python"
}
if (-not (Test-Path (Join-Path $projectRoot "google-service-account.json"))) {
    throw "Add google-service-account.json to the project root first."
}

$action = New-ScheduledTaskAction -Execute $python -Argument "`"$script`"" -WorkingDirectory $projectRoot
$trigger = New-ScheduledTaskTrigger -Daily -At $RunAt
Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Description "Back up the RKH ERP hostel_tracker database to Google Drive." -Force
Write-Host "Scheduled '$TaskName' daily at $RunAt."