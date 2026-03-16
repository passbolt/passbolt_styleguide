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

export const defaultSmtpSettingsEntityDto = (data = {}) => ({
  host: "smtp.example.com",
  port: 587,
  tls: true,
  sender_name: "Passbolt",
  sender_email: "sender@passbolt.com",
  ...data,
});

export const defaultSmtpNoneAuthenticationEntityDto = (data = {}) => ({
  ...defaultSmtpSettingsEntityDto(),
  ...data,
});

export const defaultSmtpUsernameAuthenticationEntityDto = (data = {}) => ({
  ...defaultSmtpSettingsEntityDto(),
  username: "user@example.com",
  ...data,
});

export const defaultSmtpUsernamePasswordAuthenticationEntityDto = (data = {}) => ({
  ...defaultSmtpUsernameAuthenticationEntityDto(),
  password: "secret",
  ...data,
});

export const defaultSmtpOAuthCredentialsGrantSettingsEntityDto = (data = {}) => ({
  ...defaultSmtpSettingsEntityDto(),
  oauth_username: "user@office365.com",
  tenant_id: "550e8400-e29b-41d4-a716-446655440001",
  client_id: "550e8400-e29b-41d4-a716-446655440002",
  client_secret: "secret-789",
  ...data,
});
