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

import ShadowDomQueryService from "../../services/ShadowDom/ShadowDomQueryService";

export const AUTOFILL_TIMEOUT = 100;

/**
 * The user events service
 */
class UserEventsService {
  /**
   * Whether the given value is an input element that can be filled.
   *
   * Element-ness is asserted through `nodeType` (ShadowDomQueryService.isElement) rather than
   * `instanceof HTMLInputElement`: the web integration runs in the top frame only, while page
   * classification also resolves fields out of same-origin iframes. Such a field is built from its
   * own frame's constructors, so an `instanceof` evaluated against the top frame's globals is always
   * false even though the element is a perfectly valid input.
   *
   * @param {*} field the candidate element
   * @returns {boolean} true if the value is an input element, whichever realm built it
   */
  static _isFillableInput(field) {
    return ShadowDomQueryService.isElement(field) && field.tagName === "INPUT";
  }

  /**
   * Assign a value to an input, bypassing any accessor a framework installed on the element itself.
   *
   * React (and other frameworks relying on the same technique) redefines `value` directly on the
   * element instance to track it. Assigning through that accessor updates the tracker at the same
   * time as the DOM, so the `input` event dispatched right after looks like a no-op: `onChange` never
   * runs, the application state keeps its previous value and the next render wipes the field. Writing
   * through the setter inherited from the prototype leaves the tracker stale, which is exactly what
   * makes the framework acknowledge the change.
   *
   * @param {HTMLElement} field the input to write into
   * @param {string} value the value to write
   */
  static _setNativeValue(field, value) {
    const setter = UserEventsService._findPrototypeValueSetter(field);
    if (setter) {
      setter.call(field, value);
    } else {
      field.value = value;
    }
  }

  /**
   * Find the `value` setter inherited from the element's prototype chain, skipping own properties.
   * The chain is walked from the element's own realm, so this works for fields living in same-origin
   * iframes too.
   * @param {HTMLElement} field the input to inspect
   * @returns {Function|null} the inherited `value` setter, or null when there is none
   */
  static _findPrototypeValueSetter(field) {
    let prototype = Object.getPrototypeOf(field);

    while (prototype) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
      if (descriptor?.set) {
        return descriptor.set;
      }
      prototype = Object.getPrototypeOf(prototype);
    }

    return null;
  }

  /**
   * Autofill a field with the value and simulate all user events
   * @param {HTMLElement} field the field to autofill
   * @param {string} value the value to fill in the field
   * @returns {Promise} A promise that resolves when the field is autofilled or after a timeout
   */
  static async autofill(field, value) {
    if (ShadowDomQueryService.isElement(field)) {
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
    if (!ShadowDomQueryService.isElement(field)) {
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
    if (!UserEventsService._isFillableInput(field)) {
      return false;
    }

    const changedPromise = UserEventsService.getPromiseForChangedField(field);
    const view = field.ownerDocument.defaultView;
    const keydownEvent = new view.KeyboardEvent("keydown", { bubbles: true });
    const inputEvent = new view.InputEvent("input", { inputType: "insertText", data: value, bubbles: true });
    const keyupEvent = new view.KeyboardEvent("keyup", { bubbles: true });
    const changeEvent = new view.Event("change", { bubbles: true });

    field.click();
    // Dispatch events, they happen in this order: down, input, up, change, ↑, ↑, ↓, ↓, ←, →, ←, →, B, A
    field.dispatchEvent(keydownEvent);
    UserEventsService._setNativeValue(field, value);
    field.dispatchEvent(inputEvent);
    field.dispatchEvent(keyupEvent);
    field.dispatchEvent(changeEvent);

    return changedPromise;
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
          UserEventsService._setNativeValue(allInputChildren[i], "");
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
