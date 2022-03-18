export default {
  "app": {
    "version": {
      "number": "3.5.0",
      "name": "Wide Open"
    },
    "locale": "en-UK",
    "url": "http://127.0.0.1:3001",
    "debug": 1,
    "server_timezone": "UTC",
    "session_timeout": 24,
    "image_storage": {
      "public_path": "img/public/"
    }
  },
  "passbolt": {
    "legal": {
      "privacy_policy": {
        "url": "https://passbolt.com/privacy"
      },
      "terms": {
        "url": "https://passbolt.com/terms"
      }
    },
    "edition": "pro",
    "plugins": {
      "accountRecovery": {
        "enabled": true
      },
      "import": {
        "version": "2.0.1",
        "config": {
          "format": [
            "kdbx",
            "csv"
          ]
        }
      },
      "export": {
        "version": "2.0.0"
      },
      "selenium_api": {
        "version": "2.2.0"
      },
      "passbolt_test_data": {
        "version": "2.0"
      },
      "license": {
        "version": "2.0.0"
      },
      "ee": {
        "version": "3.0.0"
      },
      "accountSettings": {
        "version": "1.0.0",
        "themes": {
          "css": "api_main.min.css"
        }
      },
      "rememberMe": {
        "version": "2.0.0",
        "options": {
          "300": "5 minutes",
          "900": "15 minutes",
          "1800": "30 minutes",
          "3600": "1 hour",
          "-1": "until I log out"
        }
      },
      "emailNotificationSettings": {
        "version": "1.1.0"
      },
      "emailDigest": {
        "version": "1.0.0"
      },
      "resourceTypes": {
        "version": "1.0.0"
      },
      "reports": {
        "version": "1.0.0"
      },
      "multiFactorAuthentication": {
        "version": "1.1.0"
      },
      "directorySync": {
        "version": "1.0.0"
      },
      "tags": {
        "version": "1.0.1"
      },
      "log": {
        "version": "1.0.0"
      },
      "audit_log": {
        "version": "1.0.0"
      },
      "folders": {
        "version": "2.0.0"
      },
      "previewPassword": {
        "version": "3.0.0"
      },
      "passwordGenerator": {
        "version": "3.3.0"
      },
      "locale": {
        "options": [
          {
            "locale": "de-DE",
            "label": "Deutsch"
          }, {
            "locale": "en-UK",
            "label": "English"
          }, {
            "locale": "fr-FR",
            "label": "Français"
          }, {
            "locale": "ja-JP",
            "label": "日本語"
          }, {
            "locale": "nl-NL",
            "label": "Nederlands"
          }, {
            "locale": "pl-PL",
            "label": "Polski"
          }, {
            "locale": "sv-SE",
            "label": "Svenska"
          }
        ]
      },
      "mobile": {
        "version": "1.0.0"
      }
    }
  }
};
