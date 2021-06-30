/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 *
 */


/**
 * All the possible in-form fields DOM selectors
 */
export default {
  /** Selectors to detect username inputs */
  USERNAME_FIELD_SELECTOR: "input[type='text']:not([hidden]):not([disabled]), input[type='Text']:not([hidden]):not([disabled]), input[type='TEXT']:not([hidden]):not([disabled]), input[type='email']:not([hidden]):not([disabled]), input[type='Email']:not([hidden]):not([disabled]), input[type='EMAIL']:not([hidden]):not([disabled]), input:not([type]):not([hidden]):not([disabled])",
  /** Selectors to detect password inputs */
  PASSWORD_FIELD_SELECTOR: "input[type='password']:not([hidden]):not([disabled]), input[type='Password']:not([hidden]):not([disabled]), input[type='PASSWORD']:not([hidden]):not([disabled])",
}