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
 * @since         3.10.0
 */

import {MfaPolicyEnumerationTypes} from "./MfaPolicyEnumeration";

/**
 * Model related to the mfa policy dto for API during the transfert
 */
class MfaPolicyDto {
  /**
   * Constructor
   * @param {MfaPolicyViewModel} settings
   */
  constructor(settings = {rememberMeForAMonth: false}) {
    this.policy = settings.policy || MfaPolicyEnumerationTypes.OPTIN;
    this.remember_me_for_a_month = settings.rememberMeForAMonth;
  }
}

export default MfaPolicyDto;

