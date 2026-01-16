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
 * @since         4.8.0
 */

/**
 * The user events service
 */
class UserEventsService {
  /**
   * Autofill a field with the value and simulate all user events
   * @param {HTMLInputElement} field the field to autofill
   * @param {string} value the value to fill in the field
   */
  static autofill(field, value) {
    // Check if field is not null
    if (field) {
      const keydownEvent = new KeyboardEvent("keydown", { bubbles: true });
      const inputEvent = new InputEvent("input", { inputType: "insertText", data: value, bubbles: true });
      const keyupEvent = new KeyboardEvent("keyup", { bubbles: true });
      const changeEvent = new Event("change", { bubbles: true });

      // Click on the field
      field.click();
      // Set the value
      field.value = value;
      // Dispatch events, they happen in this order: down, input, up, change, ↑, ↑, ↓, ↓, ←, →, ←, →, B, A
      field.dispatchEvent(keydownEvent);
      field.dispatchEvent(inputEvent);
      field.dispatchEvent(keyupEvent);
      field.dispatchEvent(changeEvent);
    }
  }
}

export default UserEventsService;
