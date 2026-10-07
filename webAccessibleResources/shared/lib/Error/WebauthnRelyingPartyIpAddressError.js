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
 * The page is reached through an IP address, which WebAuthn forbids as relying party id, therefore the ceremonies cannot run.
 */
export default class WebauthnRelyingPartyIpAddressError extends Error {
  constructor(message) {
    message = message || "Passkeys require Passbolt to be reached through a domain name, not an IP address.";
    super(message);
    this.name = "WebauthnRelyingPartyIpAddressError";
  }
}
