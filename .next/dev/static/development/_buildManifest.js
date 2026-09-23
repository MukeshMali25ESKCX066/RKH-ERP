self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/rooms"
      },
      {
        "source": "/payment-qr"
      },
      {
        "source": "/uploads/:path*"
      },
      {
        "source": "/login"
      },
      {
        "source": "/student-login"
      },
      {
        "source": "/admin-login"
      },
      {
        "source": "/register"
      },
      {
        "source": "/verify-email"
      },
      {
        "source": "/admin-2fa"
      },
      {
        "source": "/withdraw-application"
      },
      {
        "source": "/student-pending"
      },
      {
        "source": "/student-approved"
      },
      {
        "source": "/complete-profile"
      },
      {
        "source": "/student-dashboard"
      },
      {
        "source": "/student-complaint"
      },
      {
        "source": "/mark-attendance"
      },
      {
        "source": "/edit-profile"
      },
      {
        "source": "/upload-profile-photo"
      },
      {
        "source": "/upload-college-id"
      },
      {
        "source": "/download-fee-receipt"
      },
      {
        "source": "/download-college-id-card"
      },
      {
        "source": "/generate-laundry-token"
      },
      {
        "source": "/forgot-password"
      },
      {
        "source": "/reset-password"
      },
      {
        "source": "/logout"
      },
      {
        "source": "/admin-dashboard"
      },
      {
        "source": "/admin-action"
      },
      {
        "source": "/admin-notification"
      },
      {
        "source": "/warden-login"
      },
      {
        "source": "/warden-dashboard"
      },
      {
        "source": "/warden-attendance"
      },
      {
        "source": "/warden-lock-attendance"
      },
      {
        "source": "/admin-attendance-action"
      },
      {
        "source": "/admin-attendance-save"
      },
      {
        "source": "/mess-warden-login"
      },
      {
        "source": "/mess-warden-dashboard"
      },
      {
        "source": "/laundry-admin-login"
      },
      {
        "source": "/laundry-admin-dashboard"
      },
      {
        "source": "/laundry-verify"
      },
      {
        "source": "/laundry-out-verify"
      },
      {
        "source": "/laundry-pickup"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()