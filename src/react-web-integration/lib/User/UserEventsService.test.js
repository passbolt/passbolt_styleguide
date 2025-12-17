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
    const field = {
      click: jest.fn(),
      value: "",
      dispatchEvent: jest.fn(),
    };
    UserEventsService.autofill(field, "test");
    expect(field.click).toHaveBeenCalledTimes(1);
    expect(field.value).toStrictEqual("test");
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keydown", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(
      new InputEvent("input", { inputType: "insertText", data: "test", bubbles: true }),
    );
    expect(field.dispatchEvent).toHaveBeenCalledWith(new KeyboardEvent("keyup", { bubbles: true }));
    expect(field.dispatchEvent).toHaveBeenCalledWith(new Event("change", { bubbles: true }));
  });

  it("As LU I should autofill field with null value", async () => {
    expect.assertions(6);
    const field = {
      click: jest.fn(),
      value: "",
      dispatchEvent: jest.fn(),
    };
    UserEventsService.autofill(field, null);
    expect(field.click).toHaveBeenCalledTimes(1);
    expect(field.value).toStrictEqual(null);
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
    try {
      UserEventsService.autofill(field, "test");
      expect(true).toBeTruthy();
    } catch (error) {
      // Should not catch error
      expect(error).toBeNull();
    }
  });
});
