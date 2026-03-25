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

export const defaultPingOneSsoSettingsDto = (data = {}) => ({
  url: "https://auth.pingone.com",
  client_id: "passbolt-client-id",
  client_secret: "passbolt-client-secret",
  environment_id: "env-123-456",
  email_claim: "email",
  ...data,
});
