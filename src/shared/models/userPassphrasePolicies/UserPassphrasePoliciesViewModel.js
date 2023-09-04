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
 * @since         4.3.0
 */

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class UserPassphrasePoliciesViewModel {
  /**
   * Constructor
   * @param {UserPassphrasePoliciesDto} settings
   */
  constructor(settings) {
    this.external_dictionary_check = Boolean(settings?.external_dictionary_check);
    this.entropy_minimum = parseInt(settings?.entropy_minimum, 10) || 50;
  }
}

export default UserPassphrasePoliciesViewModel;
