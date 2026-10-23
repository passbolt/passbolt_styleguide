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
import { assertWebauthnRelyingPartyIsNotIpAddress } from "../../utils/assertions";
import WindowNavigationService from "../../utils/windowNavigationService";

/**
 * Runs the WebAuthn assertion ceremony in the page.
 */
export default class WebauthnAssertionCeremonyService {
  /**
   * Request an assertion from the authenticator.
   * Errors of the browser (NotAllowedError, AbortError, SecurityError, ...) are not caught.
   * @param {object} credentialRequestOptions The credential request options JSON as returned by the API
   * @param {AbortSignal} signal The signal aborting the pending browser prompt
   * @returns {Promise<object>} The assertion as AuthenticationResponseJSON
   * @throws {WebauthnRelyingPartyIpAddressError} if the page is reached through an IP address
   */
  static async run(credentialRequestOptions, signal) {
    assertWebauthnRelyingPartyIsNotIpAddress(WindowNavigationService.getHostname());
    const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(credentialRequestOptions);
    const credential = await navigator.credentials.get({ publicKey, signal });
    return credential.toJSON();
  }
}
