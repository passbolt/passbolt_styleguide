
import {MfaProviders} from './MfaEnumeration';
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https=//www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information; please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */


/**
 * Model related to the mfa model settings
 */
class MfaModel {
  /**
   * Constructor
   *
   * @param {MfaDTO} mfaDTO from db
   * @public
   */
  constructor(mfaDTO = {}) {
    // ONE TIME PASSWORD
    this.totpProviderToggle = "providers" in mfaDTO ? mfaDTO.providers.includes(MfaProviders.totp) : false; // One Time Password toggle value

    // YUBIKEY
    this.yubikeyToggle = "providers" in mfaDTO ? mfaDTO.providers.includes(MfaProviders.yubikey) : false; //  yubikey toggle value
    this.yubikeyClientIdentifier = "yubikey" in mfaDTO ? mfaDTO.yubikey.clientId : ""; // yubikey client identifier
    this.yubikeySecretKey = "yubikey" in mfaDTO ? mfaDTO.yubikey.secretKey : ""; // yubikey secret key

    // DUO
    this.duoToggle = "providers" in mfaDTO ? mfaDTO.providers.includes(MfaProviders.duo) : false; //  yubikey toggle value
    this.duoHostname = "duo" in mfaDTO ? mfaDTO.duo.hostName : ""; // duo hostname
    this.duoIntegrationKey = "duo" in mfaDTO ? mfaDTO.duo.integrationKey : ""; // yubikey secret key
    this.duoSalt = "duo" in mfaDTO ? mfaDTO.duo.salt : ""; // duo salt
    this.duoSecretKey = "duo" in mfaDTO ? mfaDTO.duo.secretKey : ""; // duo secret key
  }
}

export default MfaModel;


