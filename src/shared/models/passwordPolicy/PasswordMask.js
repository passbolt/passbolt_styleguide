/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

/**
 * Model related to the password mask
 */
class PasswordMask {
  /**
   * Constructor
   * @param {Object} mask
   * @param {PasswordPolicyViewModel} settings
   */
  constructor(mask, settings) {
    this.name = mask.name;
    this.label = mask.label;
    this.characters = mask.characters;
    this.active = settings[mask.name] ?? mask.active;
  }
}

export default PasswordMask;
