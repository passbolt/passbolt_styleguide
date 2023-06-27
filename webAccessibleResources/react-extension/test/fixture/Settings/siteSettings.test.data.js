/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */

export const defaultCeSiteSettings = siteSettings => {
  const defaultData = {
    "app": {
      "url": "http://127.0.0.1:3001",
      "locale": "en-UK",
      "version": {
        "number": "3.11.0",
        "name": "Regular"
      },
      "server_timezone": "UTC",
      "session_timeout": 24,
      "image_storage": {
        "public_path": "img\/public\/"
      }
    },
    "passbolt": {
      "legal": {
        "privacy_policy": {
          "url": ""
        },
        "terms": {
          "url": "https:\/\/www.passbolt.com\/terms"
        }
      },
      "edition": "ce",
      "plugins": {
        "export": {
          "version": "2.0.0",
          "enabled": true
        },
        "import": {
          "version": "2.0.1",
          "enabled": true,
          "config": {
            "format": [
              "kdbx",
              "csv"
            ]
          }
        },
        "previewPassword": {
          "enabled": true
        },
        "resourceTypes": {
          "version": "1.0.0",
          "enabled": true
        },
        "mobile": {
          "version": "1.0.0",
          "enabled": true
        },
        "jwtAuthentication": {
          "version": "3.3.0",
          "enabled": true
        },
        "accountRecoveryRequestHelp": {
          "enabled": true
        },
        "smtpSettings": {
          "version": "1.0.0",
          "enabled": true
        },
        "selfRegistration": {
          "version": "1.0.0",
          "enabled": true
        },
        "selenium_api": {
          "version": "2.2.0"
        },
        "passbolt_test_data": {
          "version": "2.0"
        },
        "accountSettings": {
          "version": "1.0.0"
        },
        "inFormIntegration": {
          "version": "1.0.0",
          "enabled": true
        },
        "locale": {
          "version": "3.2.0",
          "options": [
            {
              "locale": "de-DE",
              "label": "Deutsch"
            },
            {
              "locale": "en-UK",
              "label": "English"
            },
            {
              "locale": "es-ES",
              "label": "Espa\u00f1ol"
            },
            {
              "locale": "fr-FR",
              "label": "Fran\u00e7ais"
            },
            {
              "locale": "it-IT",
              "label": "Italiano (beta)"
            },
            {
              "locale": "ja-JP",
              "label": "\u65e5\u672c\u8a9e"
            },
            {
              "locale": "ko-KR",
              "label": "\ud55c\uad6d\uc5b4 (beta)"
            },
            {
              "locale": "lt-LT",
              "label": "Lietuvi\u0173"
            },
            {
              "locale": "nl-NL",
              "label": "Nederlands"
            },
            {
              "locale": "pl-PL",
              "label": "Polski"
            },
            {
              "locale": "pt-BR",
              "label": "Portugu\u00eas Brasil (beta)"
            },
            {
              "locale": "ro-RO",
              "label": "Rom\u00e2n\u0103 (beta)"
            },
            {
              "locale": "sv-SE",
              "label": "Svenska"
            }
          ]
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
          "version": "1.1.0",
          "enabled": true
        },
        "emailDigest": {
          "version": "1.0.0",
          "enabled": true
        },
        "reports": {
          "version": "1.0.0",
          "enabled": true
        },
        "passwordGenerator": {
          "version": "3.3.0",
          "enabled": true
        },
        "multiFactorAuthentication": {
          "version": "1.1.0",
          "enabled": true
        },
        "log": {
          "version": "1.0.1",
          "enabled": true
        }
      }
    }
  };
  return Object.assign(defaultData, siteSettings);
};

export const defaultProSiteSettings = siteSettings => {
  const defaultData = defaultCeSiteSettings();
  defaultData.passbolt.edition = "pro";
  defaultData.passbolt.plugins = Object.assign(defaultData.passbolt.plugins, {
    "accountRecoveryRequestHelp": {
      "enabled": true
    },
    "accountRecovery": {
      "version": "1.0.0",
      "enabled": true
    },
    "sso": {
      "version": "1.0.0",
      "enabled": true
    },
    "mfaPolicies": {
      "version": "1.0.0",
      "enabled": true
    },
    "ssoRecover": {
      "enabled": false
    },
    "ee": {
      "version": "2.0.0"
    },
    "directorySync": {
      "version": "1.0.0"
    },
    "tags": {
      "version": "1.0.1",
      "enabled": true
    },
    "folders": {
      "version": "2.0.0",
      "enabled": true
    }
  });

  return Object.assign(defaultData, siteSettings);
};

export const customEmailValidationSiteSettings = siteSettings => {
  const defaultData = defaultProSiteSettings();
  defaultData.passbolt.email = {
    "validate": {
      "regex": "\/.*@passbolt.(c|com)$\/"
    }
  };

  return Object.assign(defaultData, siteSettings);
};
