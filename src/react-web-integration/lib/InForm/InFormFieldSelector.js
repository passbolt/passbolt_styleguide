/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * All the possible in-form fields DOM selectors
 */
export default {
  /**
   * Selectors to detect username inputs (input type text or not type with id or class or name contain user)
   * The selector create-account-input is for ovh.com website
   * The selector benutzerkennung is for german website
   */
  USERNAME_FIELD_SELECTOR: `input[type='text' i][name*='user' i]:not([hidden]):not([disabled]),
  input[type='text' i][name*='email' i]:not([hidden]):not([disabled]),
  input[type='text' i][name*='login' i]:not([hidden]):not([disabled]),
  input[type='text' i][name*='benutzerkennung' i]:not([hidden]):not([disabled]),
  input[type='text' i][id*='user' i]:not([hidden]):not([disabled]),
  input[type='text' i][id*='email' i]:not([hidden]):not([disabled]),
  input[type='text' i][id*='login' i]:not([hidden]):not([disabled]),
  input[type='text' i][id*='benutzerkennung' i]:not([hidden]):not([disabled]),
  input[type='text' i][class*='user' i]:not([hidden]):not([disabled]),
  input[type='text' i][class*='email' i]:not([hidden]):not([disabled]),
  input[type='text' i][class*='create-account-input' i]:not([hidden]):not([disabled]),
  input[type='text' i][autocomplete*='user' i]:not([hidden]):not([disabled]),
  input[type='text' i][autocomplete*='email' i]:not([hidden]):not([disabled]),
  input[type='text' i][placeholder*='user' i]:not([hidden]):not([disabled]),
  input[type='text' i][placeholder*='email' i]:not([hidden]):not([disabled]),
  input[type='text' i][placeholder*='e-mail' i]:not([hidden]):not([disabled]),
  input[type='email' i]:not([hidden]):not([disabled]),
  input[name*='user' i]:not([type]):not([hidden]):not([disabled]),
  input[name*='email' i]:not([type]):not([hidden]):not([disabled]),
  input[name*='login' i]:not([type]):not([hidden]):not([disabled]),
  input[name*='benutzerkennung' i]:not([type]):not([hidden]):not([disabled]),
  input[id*='user' i]:not([type]):not([hidden]):not([disabled]),
  input[id*='email' i]:not([type]):not([hidden]):not([disabled]),
  input[id*='login' i]:not([type]):not([hidden]):not([disabled]),
  input[id*='benutzerkennung' i]:not([type]):not([hidden]):not([disabled]),
  input[class*='user' i]:not([type]):not([hidden]):not([disabled]),
  input[class*='email' i]:not([type]):not([hidden]):not([disabled]),
  input[class*='create-account-input' i]:not([type]):not([hidden]):not([disabled]),
  input[autocomplete*='user' i]:not([type]):not([hidden]):not([disabled]),
  input[autocomplete*='email' i]:not([type]):not([hidden]):not([disabled]),
  input[placeholder*='user' i]:not([type]):not([hidden]):not([disabled]),
  input[placeholder*='email' i]:not([type]):not([hidden]):not([disabled]),
  input[placeholder*='e-mail' i]:not([type]):not([hidden]):not([disabled])`,
  /** Selectors to detect password inputs (input type password or type text with id or class or name contain password) */
  PASSWORD_FIELD_SELECTOR: `input[type='password' i]:not([hidden]):not([disabled]),
  input[type='text' i][name*='password' i]:not([hidden]):not([disabled]),
  input[type='text' i][id*='password' i]:not([hidden]):not([disabled]),
  input[type='text' i][class*='password' i]:not([hidden]):not([disabled])`
};
