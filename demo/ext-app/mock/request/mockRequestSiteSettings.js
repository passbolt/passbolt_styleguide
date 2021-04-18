/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

export default () => {
  return {
    "app": {
      "version": {
        "number": "2.13.5",
        "name": "Stomp"
      },
      "url": "http://127.0.0.1:3000",
      "debug": 1,
      "server_timezone": "UTC",
      "session_timeout": 24,
      "image_storage": {
        "public_path": "img/public/"
      },
    },
    "passbolt": {
      "edition": "pro",
      "legal": {
        "privacy_policy": {
          "url": ""
        },
        "terms": {
          "url": "https:\/\/www.passbolt.com\/terms"
        }
      },
      "plugins": {
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
        "pro": {
          "version": "2.0.0"
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
        "reports": {
          "version": "1.0.0"
        },
        "resourceTypes": {
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
        "groups": {
          "version": "2.0.0"
        },
        "previewPassword": {
          "version": "3.0.0"
        },
        "locale": {
          "options": {
            "en-US": "English (default)",
            "fr-FR": "Français"
          }
        }
      }
    }
  }
};