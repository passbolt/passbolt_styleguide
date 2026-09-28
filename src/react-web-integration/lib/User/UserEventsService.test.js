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
 * @since         5.11.0
 */

import UserEventsService from "./UserEventsService";
import { getInputEvent } from "./UserEventsService.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("UserEventsService", () => {
  let keydownEvent;
  let keyupEvent;
  let changeEvent;

  beforeEach(() => {
    keydownEvent = new KeyboardEvent("keydown", { bubbles: true });
    keyupEvent = new KeyboardEvent("keyup", { bubbles: true });
    changeEvent = new Event("change", { bubbles: true });
  });

  describe("_autofillSingleField", () => {
    let field;

    beforeEach(() => {
      field = document.createElement("input");
      jest.spyOn(field, "click");
      jest.spyOn(field, "dispatchEvent");
    });

    it("Should autofill a field with all events", async () => {
      expect.assertions(7);

      await UserEventsService._autofillSingleField(field, "test");

      expect(field.click).toHaveBeenCalledTimes(1);

      expect(field.value).toStrictEqual("test");

      expect(field.dispatchEvent).toHaveBeenCalledTimes(4);
      expect(field.dispatchEvent).toHaveBeenCalledWith(keydownEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(getInputEvent("test"));
      expect(field.dispatchEvent).toHaveBeenCalledWith(keyupEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(changeEvent);
    });

    it("Should autofill a field with a null value", async () => {
      expect.assertions(7);

      await UserEventsService._autofillSingleField(field, null);

      expect(field.click).toHaveBeenCalledTimes(1);

      expect(field.value).toStrictEqual("");

      expect(field.dispatchEvent).toHaveBeenCalledTimes(4);
      expect(field.dispatchEvent).toHaveBeenCalledWith(keydownEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(getInputEvent(null));
      expect(field.dispatchEvent).toHaveBeenCalledWith(keyupEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(changeEvent);
    });

    it("Should not autofill a null field", async () => {
      expect.assertions(1);

      const result = await UserEventsService._autofillSingleField(null, "test");
      expect(result).toStrictEqual(false);
    });

    it("Should not autofill a non-input field", async () => {
      expect.assertions(1);

      field = document.createElement("div");

      const result = await UserEventsService._autofillSingleField(field, "test");
      expect(result).toStrictEqual(false);
    });

    it("Should autofill a field with an empty string value", async () => {
      expect.assertions(7);

      await UserEventsService._autofillSingleField(field, "");

      expect(field.click).toHaveBeenCalledTimes(1);

      expect(field.value).toStrictEqual("");

      expect(field.dispatchEvent).toHaveBeenCalledTimes(4);
      expect(field.dispatchEvent).toHaveBeenCalledWith(keydownEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(getInputEvent(""));
      expect(field.dispatchEvent).toHaveBeenCalledWith(keyupEvent);
      expect(field.dispatchEvent).toHaveBeenCalledWith(changeEvent);
    });
  });

  describe("_autofillMultipleField", () => {
    /**
     * @description This is the typical TOTP case, there are 6 inputs but the value of the first one is spread through the others
     */
    it("Should autofill multiple fields using the first input", async () => {
      expect.assertions(17);

      const value = "123456";

      // We create a field composed of 6 inputs, like some TOTP inputs
      const field = document.createElement("div");
      const inputs = value.split("").map(() => {
        const input = document.createElement("input");

        jest.spyOn(input, "click");
        jest.spyOn(input, "dispatchEvent");

        field.appendChild(input);
        return input;
      });

      // Dummy code to spread the value through the inputs
      inputs[0].addEventListener(
        "change",
        (event) => {
          event.stopPropagation();

          const { value } = event.target;

          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = value[i];
            inputs[i].dispatchEvent(new Event("change", { bubbles: true }));
          }
        },
        { once: true },
      );

      await UserEventsService._autofillMultipleField(field, value);

      for (let i = 0; i < value.length; i++) {
        const input = inputs[i];

        expect(input.value).toStrictEqual(value[i]);

        // The first input also has twice the number of events for the same reason
        if (i === 0) {
          expect(input.click).toHaveBeenCalledTimes(1);

          expect(input.dispatchEvent).toHaveBeenCalledTimes(5);
          expect(input.dispatchEvent).toHaveBeenCalledWith(keydownEvent);
          expect(input.dispatchEvent).toHaveBeenCalledWith(getInputEvent(value[i]));
          expect(input.dispatchEvent).toHaveBeenCalledWith(keyupEvent);
          expect(input.dispatchEvent).toHaveBeenCalledWith(changeEvent);
        } else {
          // Here we stiull have 1 call due to our dummy code
          expect(input.dispatchEvent).toHaveBeenCalledTimes(1);
        }
      }
    });

    /**
     * @description This is the less common TOTP case, there are 6 inputs that need to be filled one by one
     */
    it("Should autofill multiple fields character by character as a fallback", async () => {
      expect.assertions(42);

      const value = "123456";
      // We create a field composed of 6 inputs, like some TOTP inputs
      const field = document.createElement("div");
      const inputs = value.split("").map(() => {
        const input = document.createElement("input");

        jest.spyOn(input, "click");
        jest.spyOn(input, "dispatchEvent");

        field.appendChild(input);
        return input;
      });

      const promise = UserEventsService._autofillMultipleField(field, value);

      // We force the setTimeout to fire so that the fallback is triggered
      jest.runAllTimers();

      await promise;

      for (let i = 0; i < value.length; i++) {
        const input = inputs[i];

        // The first input is clicked twice because the 'multiple' behaviour tries to fill the first input with the whole value first
        expect(input.click).toHaveBeenCalledTimes(i === 0 ? 2 : 1);

        expect(input.value).toStrictEqual(value[i]);

        // The first input also has twice the number of events for the same reason
        expect(input.dispatchEvent).toHaveBeenCalledTimes(i === 0 ? 8 : 4);
        expect(input.dispatchEvent).toHaveBeenCalledWith(keydownEvent);
        expect(input.dispatchEvent).toHaveBeenCalledWith(getInputEvent(value[i]));
        expect(input.dispatchEvent).toHaveBeenCalledWith(keyupEvent);
        expect(input.dispatchEvent).toHaveBeenCalledWith(changeEvent);
      }
    });

    it("Should not autofill a field with no inputs", async () => {
      expect.assertions(1);

      const field = document.createElement("div");
      const result = await UserEventsService._autofillMultipleField(field, "123456");

      expect(result).toStrictEqual(false);
    });

    it("Should clear all inputs before filling character by character", async () => {
      expect.assertions(6);

      const value = "123456";
      const field = document.createElement("div");
      const inputs = value.split("").map(() => {
        const input = document.createElement("input");
        input.value = "x";

        jest.spyOn(input, "click");
        jest.spyOn(input, "dispatchEvent");

        field.appendChild(input);
        return input;
      });

      const promise = UserEventsService._autofillMultipleField(field, value);

      // We force the setTimeout to fire so that the fallback is triggered
      jest.runAllTimers();

      await promise;

      for (let i = 0; i < value.length; i++) {
        expect(inputs[i].value).toStrictEqual(value[i]);
      }
    });
  });

  describe("autofill", () => {
    beforeEach(() => {
      jest.spyOn(UserEventsService, "_autofillSingleField");
      jest.spyOn(UserEventsService, "_autofillMultipleField");
    });

    it("Should call _autofillSingleField for an input field", async () => {
      expect.assertions(3);

      const field = document.createElement("input");

      await expect(UserEventsService.autofill(field, "test")).resolves.toStrictEqual(true);

      expect(UserEventsService._autofillSingleField).toHaveBeenCalledWith(field, "test");
      expect(UserEventsService._autofillMultipleField).not.toHaveBeenCalled();
    });

    it("Should call _autofillMultipleField for a field with child inputs", async () => {
      expect.assertions(3);

      const field = document.createElement("div");
      field.appendChild(document.createElement("input"));

      UserEventsService._autofillMultipleField.mockResolvedValue(true);

      await expect(UserEventsService.autofill(field, "test")).resolves.toStrictEqual(true);

      expect(UserEventsService._autofillMultipleField).toHaveBeenCalledWith(field, "test");
      expect(UserEventsService._autofillSingleField).not.toHaveBeenCalled();
    });

    it("Should call _autofillSingleField for a null field", async () => {
      expect.assertions(3);

      await expect(UserEventsService.autofill(null, "test")).resolves.toStrictEqual(false);

      expect(UserEventsService._autofillSingleField).toHaveBeenCalledWith(null, "test");
      expect(UserEventsService._autofillMultipleField).not.toHaveBeenCalled();
    });

    it("Should call _autofillSingleField for an HTMLElement without child inputs", async () => {
      expect.assertions(3);

      const field = document.createElement("div");

      await expect(UserEventsService.autofill(field, "test")).resolves.toEqual(false);

      expect(UserEventsService._autofillSingleField).toHaveBeenCalledWith(field, "test");
      expect(UserEventsService._autofillMultipleField).not.toHaveBeenCalled();
    });
  });

  describe("getPromiseForChangedField", () => {
    let field;

    beforeEach(() => {
      field = document.createElement("input");
    });

    it("Should resolve with true when a keyup event is dispatched", async () => {
      expect.assertions(1);

      const promise = UserEventsService.getPromiseForChangedField(field);

      field.dispatchEvent(keyupEvent);
      await expect(promise).resolves.toStrictEqual(true);
    });

    it("Should resolve with true when a change event is dispatched", async () => {
      expect.assertions(1);

      const promise = UserEventsService.getPromiseForChangedField(field);

      field.dispatchEvent(changeEvent);
      await expect(promise).resolves.toStrictEqual(true);
    });

    it("Should resolve with false after timeout", async () => {
      expect.assertions(1);

      const promise = UserEventsService.getPromiseForChangedField(field, 50);

      jest.advanceTimersByTime(50);
      await expect(promise).resolves.toStrictEqual(false);
    });

    it("Should return false for a non-HTMLElement field", async () => {
      expect.assertions(1);
      await expect(UserEventsService.getPromiseForChangedField(null)).resolves.toStrictEqual(false);
    });
  });
  describe("fields living in a same-origin iframe", () => {
    let iframe;
    let field;

    beforeEach(() => {
      iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      field = iframe.contentDocument.createElement("input");
      iframe.contentDocument.body.appendChild(field);
    });

    afterEach(() => {
      iframe.remove();
    });

    it("Should treat an input built by another realm as fillable", async () => {
      expect.assertions(2);

      /*
       * The web integration is injected in the top frame only while page classification also resolves
       * fields out of same-origin iframes, so the constructors differ and `instanceof` cannot be used.
       */
      expect(field instanceof HTMLInputElement).toStrictEqual(false);
      expect(UserEventsService._isFillableInput(field)).toStrictEqual(true);
    });

    it("Should autofill a field owned by a same-origin iframe", async () => {
      expect.assertions(2);

      jest.spyOn(field, "dispatchEvent");

      await UserEventsService._autofillSingleField(field, "test");

      expect(field.value).toStrictEqual("test");
      expect(field.dispatchEvent).toHaveBeenCalledTimes(4);
    });

    it("Should build the dispatched events from the field own realm", async () => {
      expect.assertions(1);

      jest.spyOn(field, "dispatchEvent");

      await UserEventsService._autofillSingleField(field, "test");

      const dispatched = field.dispatchEvent.mock.calls.map(([event]) => event);
      expect(dispatched.every((event) => event instanceof iframe.contentWindow.Event)).toStrictEqual(true);
    });
  });

  describe("fields tracked by a framework value accessor", () => {
    let field;
    let trackerSetter;

    beforeEach(() => {
      field = document.createElement("input");
      /*
       * Mimic the accessor React installs on the element instance to track its value: writing through
       * it keeps the tracker in sync with the DOM, which makes React discard the `input` event that
       * follows as a no-op.
       */
      trackerSetter = jest.fn();
      const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      Object.defineProperty(field, "value", {
        configurable: true,
        get: () => descriptor.get.call(field),
        set: (value) => {
          trackerSetter(value);
          descriptor.set.call(field, value);
        },
      });
    });

    it("Should write through the prototype setter, not the accessor installed on the element", async () => {
      expect.assertions(2);

      await UserEventsService._autofillSingleField(field, "test");

      expect(field.value).toStrictEqual("test");
      // The tracker was left stale on purpose: that is what makes the framework acknowledge the change.
      expect(trackerSetter).not.toHaveBeenCalled();
    });
  });

  describe("_isFillableInput", () => {
    it.each([
      { scenario: "null", field: null },
      { scenario: "undefined", field: undefined },
      { scenario: "a text node", field: document.createTextNode("test") },
      { scenario: "a div", field: document.createElement("div") },
    ])("Should return false for $scenario", ({ field }) => {
      expect.assertions(1);
      expect(UserEventsService._isFillableInput(field)).toStrictEqual(false);
    });

    it("Should return false when autofilling a non input element", async () => {
      expect.assertions(1);
      await expect(
        UserEventsService._autofillSingleField(document.createElement("div"), "test"),
      ).resolves.toStrictEqual(false);
    });
  });
});
