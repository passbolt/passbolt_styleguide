<<<<<<< Updated upstream
v5.11.0-alpha.5
Provide fixes to:
- PB-50058 - OAuth SMTP: add the new styleguide to backend
=======
## v5.11.0

### Added
- PB-49733 SMTP-OAUTH - WP2.1 Update SmtpSettingsService to SmtpSettingsApiService
- PB-49734 SMTP-OAUTH - WP1.1 Create the SmtpSettingsEntity
- PB-49737 SMTP-OAUTH - WP2.2 Update SmtpTestSettingsService to SmtpTestSettingsApiService
- PB-49738 SMTP-OAUTH - WP2.3 Split SmtpSettingsModel to new architecture pattern
- PB-49739 SMTP-OAUTH - WP2.4 Split SmtpTestSettingsModel to new architecture pattern
- PB-49740 SMTP-OAUTH - WP3.1 Adapt context with the new SMTP entities
- PB-49741 SMTP-OAUTH - WP3.2 Adapt ManageSmtpAdministationSettings to handle the new OAUTH fields
- PB-50058 OAuth SMTP: add the new styleguide to backend
- PB-50157 Enable avatar upload for Safari
- PB-50263 Add a username selector compatible with ProxMox

### Fixed
- PB-46678 Fix quickaccess closing issue on Safari
- PB-49237 DisplayUserBadgeMenu attention required should be displayed on Administration page served by API
- PB-49287 When deleting a user, the URL must changed not to reference the deleted user id
- PB-49476 Fix autofill for websites using identifier as name for username field
- PB-49619 Fix username input field selector for OVH
- PB-49849 Sync generator password policy with the administration after save
- PB-49866 Fix the expiry column in the resource workspace grid is not present anymore
- PB-49882 Fix username input field selector for Supermicro IPMI WebUI
- PB-50023 Fix multifield OTP selector matching hidden inputs
- PB-50077 Fix React router issue that reloads the page unexpectedly
- PB-50177 Fix autofill issues for two websites

### Maintenance
- PB-49129 Delegate tab opening to service worker in order to send all cookie via Safari
- PB-49459 Timeouts not cleared properly when filtering resources/users grids by keywords
- PB-49705 Add missing TOTP unit tests
- PB-50013 Make Safari download custom avatars test of quick fix for CI
- PB-50158 Add Safari enablement through a feature flag
- PB-50202 Add supported formats documentation link in export dialog
- PB-50338 Update eslint dependencies

### Security
- PB-49608 Fix ReDoS vulnerability in PGP armor regex validation
- PB-50271 Fix GHSA-25h7-pfq9-p65f - HIGH CVSS3.1
- PB-50272 Fix brace-expansion vulnerabilities
>>>>>>> Stashed changes
