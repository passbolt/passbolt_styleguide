/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.17.0
 */

/**
 * Fixtures for the generic healthcheck format, GET /healthcheck.json?api-version=v5.
 *
 * The body is a flat list of checks, each one carrying its own domain. The mixed status body was
 * captured from a running API rather than written by hand, so it carries the contract as the
 * server emits it: checks in registration order, domains coming back in several runs, the raw
 * uname string as an info row, and help entries embedding a URL and a backticked command.
 *
 * The entity, context and component tests and the stories all build on these fixtures, so a
 * contract change is edited in one place.
 */

/**
 * A single check dto.
 * @param {object} [data] overrides
 * @returns {object}
 */
export const defaultHealthcheckCheckDto = (data = {}) => ({
  key: "php-version",
  domain_key: "environment",
  domain: { key: "environment", title: "Environment" },
  status: "pass",
  message: "PHP version 8.4.24.",
  help: [],
  ...data,
});

/**
 * A response body carrying every status, captured from a running API.
 * @param {array} [checks] checks to append
 * @returns {array}
 */
export const mixedStatusHealthcheckApiBodyDto = (checks = []) => [
  {
    key: "distribution",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "info",
    message:
      "Linux passbolt-api-web 7.0.14-orbstack-00380-ga7e0a2dc9535 #1 SMP PREEMPT Fri Aug  7 03:48:40 UTC 2026 aarch64 GNU/Linux",
    help: [],
  },
  {
    key: "php-version",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "PHP version 8.4.24.",
    help: [],
  },
  {
    key: "next-min-php-version",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "PHP version is 8.3 or above.",
    help: [],
  },
  {
    key: "operating-system",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "64-bit architecture system detected.",
    help: [],
  },
  {
    key: "gpg",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "info",
    message: "gpg (GnuPG) 2.4.7 / libgcrypt 1.11.0",
    help: [],
  },
  {
    key: "pcre",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "PCRE compiled with unicode support.",
    help: [],
  },
  {
    key: "mbstring",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "Mbstring extension is installed.",
    help: [],
  },
  {
    key: "intl",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "Intl extension is installed.",
    help: [],
  },
  {
    key: "image",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "GD or Imagick extension is installed.",
    help: [],
  },
  {
    key: "tmp-folder-writable",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "The temporary directory and its content are writable and not executable.",
    help: [],
  },
  {
    key: "log-folder-writable",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "pass",
    message: "The logs directory /var/www/html/logs/ and its content are writable.",
    help: [],
  },
  {
    key: "time-sync",
    domain_key: "environment",
    domain: {
      key: "environment",
      title: "Environment",
    },
    status: "info",
    message: "System clock and NTP service information cannot be found.",
    help: [
      "See `timedatectl | grep -i -A 1 clock`. More information: https://www.passbolt.com/docs/hosting/configure/ntp/",
    ],
  },
  {
    key: "app-config-file",
    domain_key: "config-files",
    domain: {
      key: "config-files",
      title: "Config files",
    },
    status: "pass",
    message: "The application config file is present",
    help: [],
  },
  {
    key: "passbolt-config-file",
    domain_key: "config-files",
    domain: {
      key: "config-files",
      title: "Config files",
    },
    status: "pass",
    message: "The passbolt config file is present",
    help: [],
  },
  {
    key: "cache-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "pass",
    message: "Cache is working.",
    help: [],
  },
  {
    key: "debug-disabled-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "error",
    message: "Debug mode is on.",
    help: ["Set debug to false in /var/www/html/config/passbolt.php"],
  },
  {
    key: "salt-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "pass",
    message: "Unique value set for security.salt",
    help: [],
  },
  {
    key: "full-base-url-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "pass",
    message: "Full base url is set to https://passbolt-api.ddev.site",
    help: [],
  },
  {
    key: "valid-full-base-url-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "pass",
    message: "App.fullBaseUrl validation OK.",
    help: [],
  },
  {
    key: "full-base-url-reachable-core",
    domain_key: "core",
    domain: {
      key: "core",
      title: "Core config",
    },
    status: "pass",
    message: "/healthcheck/status is reachable.",
    help: [],
  },
  {
    key: "peer-valid-ssl",
    domain_key: "ssl",
    domain: {
      key: "ssl",
      title: "SSL Certificate",
    },
    status: "pass",
    message: "SSL peer certificate validates.",
    help: [],
  },
  {
    key: "host-valid-ssl",
    domain_key: "ssl",
    domain: {
      key: "ssl",
      title: "SSL Certificate",
    },
    status: "pass",
    message: "Hostname is matching in SSL certificate.",
    help: [],
  },
  {
    key: "not-self-signed-ssl",
    domain_key: "ssl",
    domain: {
      key: "ssl",
      title: "SSL Certificate",
    },
    status: "pass",
    message: "Not using a self-signed certificate.",
    help: [],
  },
  {
    key: "plugin-enabled-smtp-settings",
    domain_key: "smtp-settings",
    domain: {
      key: "smtp-settings",
      title: "SMTP settings",
    },
    status: "pass",
    message: "The SMTP Settings plugin is enabled.",
    help: [],
  },
  {
    key: "plugin-enabled-jwt",
    domain_key: "jwt",
    domain: {
      key: "jwt",
      title: "JWT Authentication",
    },
    status: "pass",
    message: "The JWT Authentication plugin is enabled.",
    help: [],
  },
  {
    key: "php-gpg-module-installed-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "PHP GPG Module is installed and loaded.",
    help: [],
  },
  {
    key: "home-variable-defined-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The environment variable GNUPGHOME is set to /home/leonardo/.gnupg.",
    help: [],
  },
  {
    key: "home-variable-writable-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The directory /home/leonardo/.gnupg containing the keyring is writable by the webserver user.",
    help: [],
  },
  {
    key: "key-not-default-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "error",
    message: "Do not use the default OpenPGP key for the server.",
    help: [
      "Create a key, export it and add the fingerprint to /var/www/html/config/passbolt.php",
      "See. https://www.passbolt.com/help/tech/install#toc_gpg",
    ],
  },
  {
    key: "public-key-readable-and-parsable-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The public key file is defined in /var/www/html/config/passbolt.php and readable.",
    help: [],
  },
  {
    key: "private-key-readable-and-parsable-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The private key file is defined in /var/www/html/config/passbolt.php and readable.",
    help: [],
  },
  {
    key: "fingerprint-match-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The server key fingerprint matches the one defined in /var/www/html/config/passbolt.php.",
    help: [],
  },
  {
    key: "public-key-in-keyring-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message:
      "The server public key defined in the /var/www/html/config/passbolt.php (or environment variables) is in the keyring.",
    help: [],
  },
  {
    key: "public-key-email-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "There is a valid email id defined for the server key.",
    help: [],
  },
  {
    key: "can-encrypt-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The public key can be used to encrypt a message.",
    help: [],
  },
  {
    key: "can-sign-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The private key can be used to sign a message.",
    help: [],
  },
  {
    key: "can-encrypt-sign-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The public and private keys can be used to encrypt and sign a message.",
    help: [],
  },
  {
    key: "can-decrypt-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The private key can be used to decrypt a message.",
    help: [],
  },
  {
    key: "can-decrypt-verify-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The private key can be used to decrypt and verify a message.",
    help: [],
  },
  {
    key: "can-verify-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The public key can be used to verify a signature.",
    help: [],
  },
  {
    key: "gopengpg-public-key-format-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The server public key format is Gopengpg compatible.",
    help: [],
  },
  {
    key: "gopengpg-private-key-format-gpg",
    domain_key: "gpg",
    domain: {
      key: "gpg",
      title: "GPG Configuration",
    },
    status: "pass",
    message: "The server private key format is Gopengpg compatible.",
    help: [],
  },
  {
    key: "latest-version-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "error",
    message:
      "Could not connect to passbolt repository to check versions. It is not possible to check if your version is up-to-date.",
    help: ["Check the network configuration to allow this script to check for updates."],
  },
  {
    key: "ssl-force-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "error",
    message: "Passbolt is not configured to force SSL use.",
    help: ["Set passbolt.ssl.force to true in /var/www/html/config/passbolt.php."],
  },
  {
    key: "ssl-full-base-url-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "App.fullBaseUrl is set to HTTPS.",
    help: [],
  },
  {
    key: "selenium-disabled-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "error",
    message: "Selenium API endpoints are active. This setting should be used for testing only.",
    help: ["Set passbolt.selenium.active to false in /var/www/html/config/passbolt.php."],
  },
  {
    key: "robots-index-disabled-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "Search engine robots are told not to index content.",
    help: [],
  },
  {
    key: "self-registration-plugin-enabled-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "info",
    message: "The Self Registration plugin is disabled.",
    help: ["Enable the plugin in order to define self registration settings."],
  },
  {
    key: "self-registration-provider-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "info",
    message: "Registration is closed, only administrators can add users.",
    help: [],
  },
  {
    key: "self-registration-public-removed-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "The deprecated self registration public setting was not found in /var/www/html/config/passbolt.php.",
    help: [],
  },
  {
    key: "host-availability-check-enabled-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "warning",
    message: "Host availability checking is disabled.",
    help: [
      "Make sure this instance is not publicly available on the internet.",
      "Or set the PASSBOLT_EMAIL_VALIDATE_MX environment variable to true.",
      "Or set passbolt.email.validate.mx to true in /var/www/html/config/passbolt.php.",
    ],
  },
  {
    key: "js-prod-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "Serving the compiled version of the javascript app.",
    help: [],
  },
  {
    key: "email-notification-enabled-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "warning",
    message: "Some email notifications are disabled by the administrator.",
    help: [],
  },
  {
    key: "session-provider-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "The session provider is php.",
    help: [],
  },
  {
    key: "connect-database",
    domain_key: "database",
    domain: {
      key: "database",
      title: "Database",
    },
    status: "pass",
    message: "The application is able to connect to the database",
    help: [],
  },
  {
    key: "tables-count-database",
    domain_key: "database",
    domain: {
      key: "database",
      title: "Database",
    },
    status: "pass",
    message: "56 tables found.",
    help: [],
  },
  {
    key: "default-content-database",
    domain_key: "database",
    domain: {
      key: "database",
      title: "Database",
    },
    status: "pass",
    message: "Some default content is present.",
    help: [],
  },
  {
    key: "mariadb-mysql-version-deprecate",
    domain_key: "database",
    domain: {
      key: "database",
      title: "Database",
    },
    status: "pass",
    message: "The database version is supported.",
    help: [],
  },
  {
    key: "schema-up-to-date-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "pass",
    message: "The database schema is up to date.",
    help: [],
  },
  {
    key: "model-cache-database",
    domain_key: "database",
    domain: {
      key: "database",
      title: "Database",
    },
    status: "pass",
    message: "The model schema cache shows no discrepancies with the database schema.",
    help: [],
  },
  {
    key: "directory-not-writable-jwt",
    domain_key: "jwt",
    domain: {
      key: "jwt",
      title: "JWT Authentication",
    },
    status: "error",
    message: "The /var/www/html/config/jwt/ directory should not be writable.",
    help: [
      "You can try: ",
      "sudo chown -Rf root:leonardo /var/www/html/config/jwt/",
      "sudo chmod 750 /var/www/html/config/jwt/",
      "sudo chmod 640 /var/www/html/config/jwt/jwt.key",
      "sudo chmod 640 /var/www/html/config/jwt/jwt.pem",
    ],
  },
  {
    key: "valid-key-pair-jwt",
    domain_key: "jwt",
    domain: {
      key: "jwt",
      title: "JWT Authentication",
    },
    status: "pass",
    message: "A valid JWT key pair was found.",
    help: [],
  },
  {
    key: "edition-present-in-database-application",
    domain_key: "application",
    domain: {
      key: "application",
      title: "Application configuration",
    },
    status: "error",
    message: "Edition row is missing from organization_settings; defaulting to CE.",
    help: [
      "No edition is recorded in organization_settings — the instance is falling back to CE by default.",
      'Run "bin/cake passbolt populate_edition" or upload a subscription key from the admin UI.',
    ],
  },
  {
    key: "server-can-decrypt-metadata-private-key",
    domain_key: "metadata",
    domain: {
      key: "metadata",
      title: "Metadata",
    },
    status: "pass",
    message: "The server is able to decrypt the metadata private key.",
    help: [],
  },
  {
    key: "no-active-metadata-key",
    domain_key: "metadata",
    domain: {
      key: "metadata",
      title: "Metadata",
    },
    status: "pass",
    message: "Active metadata key found or not required.",
    help: [],
  },
  {
    key: "server-missing-access-to-metadata-key",
    domain_key: "metadata",
    domain: {
      key: "metadata",
      title: "Metadata",
    },
    status: "pass",
    message: "The server has access to the metadata keys or does not require access to it.",
    help: [],
  },
  {
    key: "server-private-metadata-key-validate",
    domain_key: "metadata",
    domain: {
      key: "metadata",
      title: "Metadata",
    },
    status: "pass",
    message: "The server metadata private key is valid.",
    help: [],
  },
  {
    key: "settings-validation-smtp-settings",
    domain_key: "smtp-settings",
    domain: {
      key: "smtp-settings",
      title: "SMTP settings",
    },
    status: "pass",
    message: "SMTP Settings coherent. You may send a test email to validate them.",
    help: [],
  },
  {
    key: "smtp-settings-settings-source",
    domain_key: "smtp-settings",
    domain: {
      key: "smtp-settings",
      title: "SMTP settings",
    },
    status: "warning",
    message: "The SMTP Settings source is: /var/www/html/config/passbolt.php.",
    help: ["It is recommended to set the SMTP Settings in the database through the administration section."],
  },
  {
    key: "smtp-settings-endpoints-disabled",
    domain_key: "smtp-settings",
    domain: {
      key: "smtp-settings",
      title: "SMTP settings",
    },
    status: "warning",
    message: "The SMTP Settings plugin endpoints are enabled.",
    help: [
      "It is recommended to disable the plugin endpoints.",
      "Set the PASSBOLT_SECURITY_SMTP_SETTINGS_ENDPOINTS_DISABLED environment variable to true.",
      "Or set passbolt.security.smtpSettings.endpointsDisabled to true in /var/www/html/config/passbolt.php.",
    ],
  },
  {
    key: "custom-ssl-options-smtp-settings",
    domain_key: "smtp-settings",
    domain: {
      key: "smtp-settings",
      title: "SMTP settings",
    },
    status: "pass",
    message: "No custom SSL configuration for SMTP server.",
    help: [],
  },
  {
    key: "is-request-https-ssl",
    domain_key: "ssl",
    domain: {
      key: "ssl",
      title: "SSL Certificate",
    },
    status: "warning",
    message:
      "SSL access is not enabled. You can still proceed, but it is highly recommended that you configure your web server to use HTTPS before you continue.",
    help: [],
  },
  ...checks,
];

/**
 * The same instance, with every check passing.
 * @param {array} [checks] checks to append
 * @returns {array}
 */
export const allPassHealthcheckApiBodyDto = (checks = []) => [
  ...mixedStatusHealthcheckApiBodyDto().map((check) => ({ ...check, status: "pass", help: [] })),
  ...checks,
];

/**
 * A body where one domain comes back in two runs instead of one contiguous block, which is what
 * happens as soon as a plugin registers a check into a domain that already exists.
 * @returns {array}
 */
export const nonContiguousHealthcheckApiBodyDto = () => [
  {
    key: "php-version",
    domain_key: "environment",
    domain: { key: "environment", title: "Environment" },
    status: "pass",
    message: "PHP version 8.4.24.",
    help: [],
  },
  {
    key: "app-config-file",
    domain_key: "config-files",
    domain: { key: "config-files", title: "Config files" },
    status: "pass",
    message: "The application config file is present.",
    help: [],
  },
  {
    key: "time-sync",
    domain_key: "environment",
    domain: { key: "environment", title: "Environment" },
    status: "info",
    message: "System clock and NTP service information cannot be found.",
    help: ["See `timedatectl | grep -i -A 1 clock`."],
  },
];

/**
 * A domain the frontend has never heard of, a check it has never heard of, and a check whose
 * status is outside the documented vocabulary. All three have to render with no component change.
 * @param {array} [checks] checks to append
 * @returns {array}
 */
export const unknownContractHealthcheckApiBodyDto = (checks = []) => [
  {
    key: "entanglement-coherence",
    domain_key: "quantumEntanglement",
    domain: { key: "quantumEntanglement", title: "Quantum Entanglement" },
    status: "pass",
    message: "The entanglement coherence is nominal.",
    help: [],
  },
  {
    key: "flux-capacitor",
    domain_key: "quantumEntanglement",
    domain: { key: "quantumEntanglement", title: "Quantum Entanglement" },
    status: "teapot",
    message: "The flux capacitor reports a status nobody has documented yet.",
    help: ["Consult the manual that does not exist yet.", "See. https://www.passbolt.com/docs/"],
  },
  {
    key: "something-entirely-new",
    domain_key: "quantumEntanglement",
    domain: { key: "quantumEntanglement", title: "Quantum Entanglement" },
    status: "error",
    message: "A brand new check that no frontend release has ever heard of.",
    help: ["Set PASSBOLT_SOMETHING_ENTIRELY_NEW to true."],
  },
  ...checks,
];

/**
 * An instance where everything was excluded from the response, or that has no healthcheck at all.
 * @returns {array}
 */
export const emptyHealthcheckApiBodyDto = () => [];
