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
 * All the possible in-fields DOM selectors
 */
export default {
  /** Selectors to detect username inputs (input type text or not type with id or class or name contain user) */
  USERNAME_FIELD_SELECTOR: `input[type='text'][name*='user']:not([hidden]):not([disabled]),
  input[type='text'][name*='email']:not([hidden]):not([disabled]),
  input[type='text'][id*='user']:not([hidden]):not([disabled]),
  input[type='text'][id*='email']:not([hidden]):not([disabled]),
  input[type='text'][class*='user']:not([hidden]):not([disabled]),
  input[type='text'][class*='email']:not([hidden]):not([disabled]),
  input[type='Text'][name*='user']:not([hidden]):not([disabled]),
  input[type='Text'][name*='email']:not([hidden]):not([disabled]),
  input[type='Text'][id*='user']:not([hidden]):not([disabled]),
  input[type='Text'][id*='email']:not([hidden]):not([disabled]),
  input[type='Text'][class*='user']:not([hidden]):not([disabled]),
  input[type='Text'][class*='email']:not([hidden]):not([disabled]),
  input[type='TEXT'][name*='user']:not([hidden]):not([disabled]),
  input[type='TEXT'][name*='email']:not([hidden]):not([disabled]),
  input[type='TEXT'][id*='user']:not([hidden]):not([disabled]),
  input[type='TEXT'][id*='email']:not([hidden]):not([disabled]),
  input[type='TEXT'][class*='user']:not([hidden]):not([disabled]),
  input[type='TEXT'][class*='email']:not([hidden]):not([disabled]),
  input[type='email']:not([hidden]):not([disabled]),
  input[type='Email']:not([hidden]):not([disabled]),
  input[type='EMAIL']:not([hidden]):not([disabled]),
  input[name*='user']:not([type]):not([hidden]):not([disabled]),
  input[name*='email']:not([type]):not([hidden]):not([disabled]),
  input[id*='user']:not([type]):not([hidden]):not([disabled]),
  input[id*='email']:not([type]):not([hidden]):not([disabled]),
  input[class*='user']:not([type]):not([hidden]):not([disabled]),
  input[class*='email']:not([type]):not([hidden]):not([disabled])`,
  /** Selectors to detect password inputs (input type password or type text with id or class or name contain password) */
  PASSWORD_FIELD_SELECTOR: `input[type='password']:not([hidden]):not([disabled]),
  input[type='Password']:not([hidden]):not([disabled]),
  input[type='PASSWORD']:not([hidden]):not([disabled]),
  input[type='text'][name*='password']:not([hidden]):not([disabled]),
  input[type='text'][id*='password']:not([hidden]):not([disabled]),
  input[type='text'][class*='password']:not([hidden]):not([disabled]),
  input[type='Text'][name*='password']:not([hidden]):not([disabled]),
  input[type='Text'][id*='password']:not([hidden]):not([disabled]),
  input[type='Text'][class*='password']:not([hidden]):not([disabled]),
  input[type='TEXT'][name*='password']:not([hidden]):not([disabled]),
  input[type='TEXT'][id*='password']:not([hidden]):not([disabled]),
  input[type='TEXT'][class*='password']:not([hidden]):not([disabled])`
}