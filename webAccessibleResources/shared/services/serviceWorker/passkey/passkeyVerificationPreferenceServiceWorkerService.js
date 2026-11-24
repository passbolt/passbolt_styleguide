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
 * @since         5.18.0
 */
import PasskeyVerificationPreferenceEntity from "../../../models/entity/passkey/passkeyVerificationPreferenceEntity";

export const PASSKEY_GET_VERIFICATION_PREFERENCE = "passbolt.passkey.get-verification-preference";
export const PASSKEY_UPDATE_VERIFICATION_PREFERENCE = "passbolt.passkey.update-verification-preference";

export default class PasskeyVerificationPreferenceServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the user's passkey verification preference.
   * @returns {Promise<PasskeyVerificationPreferenceEntity|null>} null when the user has not chosen yet.
   */
  async get() {
    const preferenceDto = await this.port.request(PASSKEY_GET_VERIFICATION_PREFERENCE);
    return preferenceDto ? new PasskeyVerificationPreferenceEntity(preferenceDto) : null;
  }

  /**
   * Update the user's passkey verification preference.
   * @param {PasskeyVerificationPreferenceEntity} preference The preference.
   * @returns {Promise<PasskeyVerificationPreferenceEntity>} The saved preference.
   */
  async update(preference) {
    if (!(preference instanceof PasskeyVerificationPreferenceEntity)) {
      throw new TypeError("The parameter `preference` should be of type PasskeyVerificationPreferenceEntity.");
    }
    const preferenceDto = await this.port.request(PASSKEY_UPDATE_VERIFICATION_PREFERENCE, preference.toDto());
    return new PasskeyVerificationPreferenceEntity(preferenceDto);
  }
}
