/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {MfaProviders} from "./MfaEnumeration";
import Yubikey from './Yubikey';
import Duo from './Duo';


/**
 * Model related to the Mfa dto settings
 */
class MfaDTO {
  /**
   * Constructor
   *
   * @param {MfaModel} mfaModel
   * @public
   */
  constructor(mfaModel = {}) {
    this.providers = [];
    this.setProviders(mfaModel);
    this.yubikey = this.providers.includes(MfaProviders.yubikey) ? new Yubikey(mfaModel) : {};
    this.duo = this.providers.includes(MfaProviders.duo) ? new Duo(mfaModel) : {};
  }

  setProviders(mfaModel) {
    if (mfaModel.totpProviderToggle) {
      this.providers.push(MfaProviders.totp);
    }
    if (mfaModel.yubikeyToggle) {
      this.providers.push(MfaProviders.yubikey);
    }
    if (mfaModel.duoToggle) {
      this.providers.push(MfaProviders.duo);
    }
  }
}

export default MfaDTO;

