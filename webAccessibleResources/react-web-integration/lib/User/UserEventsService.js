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

export const AUTOFILL_TIMEOUT = 100;

/**
 * The user events service
 */
class UserEventsService {
  /**
   * Autofill a field with the value and simulate all user events
   * @param {HTMLElement} field the field to autofill
   * @param {string} value the value to fill in the field
   * @returns {Promise} A promise that resolves when the field is autofilled or after a timeout
   */
  static async autofill(field, value) {
    if (field instanceof HTMLElement) {
      const hasChildInput = field.querySelector("input");
      if (hasChildInput) {
        // If the field has children, we try to fill each child input
        return UserEventsService._autofillMultipleField(field, value);
      }
    }

    // Otherwise, we fill the field itself
    return UserEventsService._autofillSingleField(field, value);
  }

  /**
   * Get a promise that resolves when the field is changed.
   * @param {HTMLElement} field the field to listen to
   * @param {number} timeout the timeout in milliseconds
   * @returns {Promise} A promise that resolves with `true` when the field is changed or with `false` after the timeout fired
   */
  static async getPromiseForChangedField(field, timeout = AUTOFILL_TIMEOUT) {
    if (!(field instanceof HTMLElement)) {
      return false;
    }

    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => resolve(false), timeout);

      const handler = () => {
        resolve(true);
        clearTimeout(timeoutId);
        field.removeEventListener("keyup", handler);
        field.removeEventListener("change", handler);
      };

      field.addEventListener("keyup", handler, { once: true });
      field.addEventListener("change", handler, { once: true });
    });
  }

  /**
   * Autofill a field with the value and simulate all user events
   * @param {HTMLElement} field the field to autofill
   * @param {string} value the value to fill in the field
   * @returns {Promise} A promise that resolves when the field is autofilled
   */
  static async _autofillSingleField(field, value) {
    // Check if field is not null
    if (field instanceof HTMLInputElement) {
      const changedPromise = UserEventsService.getPromiseForChangedField(field);

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

      return changedPromise;
    }

    return false;
  }

  /**
   * Autofill multiple inputs with the value and simulate all user events.
   * It first tries to fill the field using only the first input.
   * If it fails, it tries to fill the field using all inputs one by one.
   *
   * ⚠️ This is primarily designed to fill OTP fields, where each input is a single character
   *
   * @param {HTMLElement} field the field to autofill
   * @param {string} value the value to fill in the field
   */
  static async _autofillMultipleField(field, value) {
    const allInputChildren = field.querySelectorAll("input");
    if (allInputChildren.length > 0) {
      // We get the last (fillable) field to know if it has been filled
      const lastInput = allInputChildren[value.length - 1];
      let lastInputFilledPromise = UserEventsService.getPromiseForChangedField(lastInput);

      // First we try to fill the value using the first input as this is the most common case
      await UserEventsService._autofillSingleField(allInputChildren[0], value);

      const lastInputChanged = await lastInputFilledPromise;
      if (lastInputChanged) {
        return true;
      } else {
        // If the last input was not filled, we try to fill the value using all inputs one by one
        lastInputFilledPromise = UserEventsService.getPromiseForChangedField(lastInput);

        // We clear all inputs first to avoid bugs with some websites that don't handle filling again already filled inputs
        for (let i = 0; i < value.length; i++) {
          allInputChildren[i].value = "";
        }

        for (let i = 0; i < value.length; i++) {
          await UserEventsService._autofillSingleField(allInputChildren[i], value[i]);
        }

        return lastInputFilledPromise;
      }
    }

    return UserEventsService._autofillSingleField(field, value);
  }
}

export default UserEventsService;
