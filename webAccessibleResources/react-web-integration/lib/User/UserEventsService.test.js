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
 * Unit tests on UserEventsService in regard of specifications
 */

import UserEventsService from "./UserEventsService";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("UserEventsService", () => {
  it("As LU I should autofill field with all events", async () => {
    expect.assertions(6);

    const field = document.createElement("input");

    jest.spyOn(field, "click");
    jest.spyOn(field, "dispatchEvent");

    await UserEventsService.autofill(field, "test");

    expect(field.click).toHaveBeenCalledTimes(1);
    expect(field.value).toStrictEqual("test");
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keydown", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(
      new InputEvent("input", { inputType: "insertText", data: "test", bubbles: true }),
    );
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keyup", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(new Event("change", { bubbles: true }));
  });

  it("As LU I should autofill multiple fields with all events", async () => {
    expect.assertions(24);

    const value = "test";
    const field = document.createElement("div");
    const inputs = [];
    for (let i = 0; i < value.length; i++) {
      const input = document.createElement("input");
      field.appendChild(input);

      jest.spyOn(input, "click");
      jest.spyOn(input, "dispatchEvent");

      inputs[i] = input;
    }

    await UserEventsService.autofill(field, value);

    for (let i = 0; i < value.length; i++) {
      const input = inputs[i];

      // The first input is clicked twice because the multiple behaviour tries to fill the first input with the whole value first
      expect(input.click).toHaveBeenCalledTimes(i === 0 ? 2 : 1);
      expect(input.value).toStrictEqual(value[i]);
      expect(input.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keydown", { bubbles: true }));
      expect(input.dispatchEvent).toHaveBeenCalledWith(
        new InputEvent("input", { inputType: "insertText", data: value[i], bubbles: true }),
      );
      expect(input.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keyup", { bubbles: true }));
      expect(input.dispatchEvent).toHaveBeenCalledWith(new Event("change", { bubbles: true }));
    }
  });

  it("As LU I should autofill field with null value", async () => {
    expect.assertions(6);

    const field = document.createElement("input");

    jest.spyOn(field, "click");
    jest.spyOn(field, "dispatchEvent");

    await UserEventsService.autofill(field, null);

    expect(field.click).toHaveBeenCalledTimes(1);
    expect(field.value).toStrictEqual("");
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keydown", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(
      new InputEvent("input", { inputType: "insertText", data: null, bubbles: true }),
    );
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keyup", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(new Event("change", { bubbles: true }));
  });

  it("As LU I should not autofill null field", async () => {
    expect.assertions(1);
    const field = null;
    await expect(UserEventsService.autofill(field, "test")).resolves.not.toThrow();
  });
});
