/**
 * @deprecated should use siteSettings.test.data.js
 * @param isProEdition
 * @returns {{app: {image_storage: {public_path: string}, debug: number, server_timezone: string, locale: string, version: {number: string, name: string}, url: string, session_timeout: number}, passbolt: {plugins: {resourceTypes: {version: string}, reports: {version: string}, folders: {version: string, enabled: boolean}, import: {version: string, config: {format: string[]}}, log: {version: string}, accountRecovery: {version: string, enabled: boolean}, locale: {options: [{label: string, locale: string},{label: string, locale: string},{label: string, locale: string},{label: string, locale: string},{label: string, locale: string},null,null,null,null,null,null,null,null]}, previewPassword: {version: string}, smtpSettings: {version: string, enabled: boolean}, export: {version: string}, multiFactorAuthentication: {version: string, enabled: boolean}, ee: {version: string, enabled: boolean}, directorySync: {version: string, enabled: boolean}, emailNotificationSettings: {version: string}, audit_log: {version: string, enabled: boolean}, mobile: {version: string}, emailDigest: {version: string}, accountRecoveryRequestHelp: {version: string, enabled: boolean}, passbolt_test_data: {version: string}, tags: {version: string, enabled: boolean}, license: {version: string}, passwordGenerator: {version: string}, rememberMe: {options: {"1800": string, "300": string, "3600": string, "-1": string, "900": string}, version: string}, accountSettings: {themes: {css: string}, version: string}, selenium_api: {version: string}}, legal: {terms: {url: string}, privacy_policy: {url: string}}, edition: (string)}}}
 */
const siteSettings = (isProEdition = true) => ({
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
    "edition": isProEdition ? "pro" : "ce",
    "plugins": {
      "accountRecovery": {
        "version": "1.0.0",
        "enabled": isProEdition,
      },
      "rbacs": {
        "version": "1.0.0",
        "enabled": isProEdition,
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
        "version": "3.0.0",
        "enabled": isProEdition
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
        "version": "1.1.0",
        "enabled": isProEdition
      },
      "directorySync": {
        "version": "1.0.0",
        "enabled": isProEdition
      },
      "tags": {
        "version": "1.0.1",
        "enabled": isProEdition
      },
      "log": {
        "version": "1.0.0"
      },
      "audit_log": {
        "version": "1.0.0",
        "enabled": isProEdition
      },
      "folders": {
        "version": "2.0.0",
        "enabled": true
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
            locale: "de-DE",
            label: "Deutsch"
          }, {
            locale: "en-UK",
            label: "English"
          }, {
            locale: "es-ES",
            label: "Español"
          }, {
            locale: "fr-FR",
            label: "Français"
          }, {
            locale: "it-IT",
            label: "Italiano (Beta)"
          }, {
            locale: "ja-JP",
            label: "日本語"
          }, {
            locale: "ko-KR",
            label: "日本語"
          }, {
            locale: "lt-LT",
            label: "Lietuvių"
          }, {
            locale: "nl-NL",
            label: "Nederlands"
          }, {
            locale: "pl-PL",
            label: "Polski"
          }, {
            locale: "pt-BR",
            label: "Português Brasil (beta)"
          }, {
            locale: "ro-RO",
            label: "Română (beta)"
          }, {
            locale: "sv-SE",
            label: "Svenska"
          }
        ]
      },
      "mobile": {
        "version": "1.0.0"
      },
      "accountRecoveryRequestHelp": {
        "version": "1.0.0",
        "enabled": isProEdition
      },
      "smtpSettings": {
        "version": "1.0.0",
        "enabled": true,
      },
    }
  }
});

const siteSettingsPro = siteSettings(true);
export default siteSettingsPro;

export const siteSettingsCe = siteSettings(false);
