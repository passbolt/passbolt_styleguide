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
 * @since         5.11.0
 */

export const defaultSmtpSettingsFormEntityDto = (data = {}) => ({
  host: "smtp.example.com",
  port: 587,
  tls: true,
  sender_name: "Passbolt",
  sender_email: "sender@passbolt.com",
  client: "",
  username: "user@example.com",
  password: "secret",
  provider: "other",
  ...data,
});

export const noneAuthenticationFormDto = (data = {}) => ({
  ...defaultSmtpSettingsFormEntityDto(),
  username: null,
  password: null,
  ...data,
});

export const usernameAuthenticationFormDto = (data = {}) => ({
  ...defaultSmtpSettingsFormEntityDto(),
  password: null,
  ...data,
});

export const usernamePasswordAuthenticationFormDto = (data = {}) => ({
  ...defaultSmtpSettingsFormEntityDto(),
  ...data,
});

export const oauthFormDto = (data = {}) => ({
  ...defaultSmtpSettingsFormEntityDto(),
  username: null,
  password: null,
  oauth_username: "oauth-user@example.com",
  tenant_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  client_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  client_secret: "my-client-secret",
  provider: "other",
  ...data,
});

export const gmailFormDto = (data = {}) => ({
  ...defaultSmtpSettingsFormEntityDto(),
  host: "smtp.gmail.com",
  port: 587,
  tls: true,
  provider: "google-mail",
  ...data,
});
