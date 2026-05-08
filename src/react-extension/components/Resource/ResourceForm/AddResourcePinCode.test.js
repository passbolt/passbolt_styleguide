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
 * @since         5.12.0
 */

import AddResourcePinCodePage from "./AddResourcePinCode.test.page";
import { defaultProps, defaultPropsWithValue, pinCodeErrors, pinCodeWarnings } from "./AddResourcePinCode.test.data";
import { PinCodeGenerator } from "../../../../shared/lib/SecretGenerator/PinCodeGenerator";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("AddResourcePinCode", () => {
  describe("As LU I can see the pin code form.", () => {
    it("renders the form with an empty pin and collapsed advanced settings.", () => {
      expect.assertions(5);

      const page = new AddResourcePinCodePage(defaultProps());

      expect(page.exists()).toEqual(true);
      expect(page.title.textContent).toEqual("Pin code");
      expect(page.pinCode.value).toEqual("");
      expect(page.pinCodeGenerateButton).not.toBeNull();
      expect(page.pinCodeLengthNumber).toBeNull();
    });

    it("exposes length inputs defaulting to 4 once advanced settings is opened.", async () => {
      expect.assertions(2);

      const page = new AddResourcePinCodePage(defaultProps());

      await page.click(page.advancedSettingsToggle);

      expect(page.pinCodeLengthNumber.value).toEqual("4");
      expect(page.pinCodeLengthRange.value).toEqual("4");
    });
  });

  describe("Fill form pin code", () => {
    it("generates pin code when clicking on the generate button should call callback function.", async () => {
      expect.assertions(2);

      jest.spyOn(PinCodeGenerator, "generate").mockImplementationOnce(() => "1234");

      const props = defaultProps();
      const page = new AddResourcePinCodePage(props);

      await page.click(page.pinCodeGenerateButton);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ name: "secret.pin_code", value: "1234" }),
        }),
      );
    });

    it("Enter pin code should call callback function.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new AddResourcePinCodePage(props);

      await page.fill(page.pinCode, "9876");
      page.rerender(defaultPropsWithValue("9876"));

      expect(props.onChange).toHaveBeenCalledTimes(4);
      expect(props.onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ name: "secret.pin_code", value: "9876" }),
        }),
      );
    });
  });

  describe("View pin code", () => {
    it("views pin code when clicking on the view button.", async () => {
      expect.assertions(6);

      const page = new AddResourcePinCodePage(defaultProps());

      await page.fill(page.pinCode, "1234");

      await page.click(page.pinCodeViewButton);
      expect(page.pinCode.getAttribute("type")).toBe("text");
      expect(page.pinCodeViewButton.classList.contains("eye-open")).toBe(false);
      expect(page.pinCodeViewButton.classList.contains("eye-close")).toBe(true);

      await page.click(page.pinCodeViewButton);
      expect(page.pinCode.getAttribute("type")).toBe("password");
      expect(page.pinCodeViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.pinCodeViewButton.classList.contains("eye-close")).toBe(false);
    });
  });

  describe("Length selector", () => {
    it("changing the number input regenerates a pin of the new length.", async () => {
      expect.assertions(4);

      const generateSpy = jest.spyOn(PinCodeGenerator, "generate");

      const props = defaultProps();
      const page = new AddResourcePinCodePage(props);

      await page.click(page.advancedSettingsToggle);
      await page.fill(page.pinCodeLengthNumber, "8");

      expect(page.pinCodeLengthNumber.value).toEqual("8");

      expect(generateSpy).toHaveBeenCalledTimes(1);
      expect(generateSpy).toHaveBeenCalledWith(8);

      expect(props.onChange).toHaveBeenCalledWith({
        target: { name: "secret.pin_code", value: expect.stringMatching(/^\d{8}$/) },
      });
    });

    it("clamps out-of-range values before generating.", async () => {
      expect.assertions(3);

      const generateSpy = jest.spyOn(PinCodeGenerator, "generate");

      const props = defaultProps();
      const page = new AddResourcePinCodePage(props);

      await page.click(page.advancedSettingsToggle);
      await page.fill(page.pinCodeLengthNumber, "99");

      // Two key strokes
      expect(generateSpy).toHaveBeenCalledTimes(2);
      expect(generateSpy).toHaveBeenCalledWith(12);

      expect(props.onChange).toHaveBeenCalledWith({
        target: { name: "secret.pin_code", value: expect.stringMatching(/^\d{12}$/) },
      });
    });
  });

  describe("Disabled state", () => {
    it("disables the pin input, dice button and length inputs.", async () => {
      expect.assertions(4);

      const props = defaultProps({ disabled: true });
      const page = new AddResourcePinCodePage(props);

      await page.click(page.advancedSettingsToggle);

      expect(page.pinCode.hasAttribute("disabled")).toEqual(true);
      expect(page.pinCodeGenerateButton.hasAttribute("disabled")).toEqual(true);
      expect(page.pinCodeLengthNumber.hasAttribute("disabled")).toEqual(true);
      expect(page.pinCodeLengthRange.hasAttribute("disabled")).toEqual(true);
    });
  });

  describe("Errors", () => {
    it("focuses the pin input when a validation error is present on mount.", () => {
      expect.assertions(1);

      const props = defaultProps({ errors: pinCodeErrors("pattern") });
      const page = new AddResourcePinCodePage(props);

      expect(document.activeElement).toBe(page.pinCode);
    });

    it("renders the pattern error message.", () => {
      expect.assertions(1);

      const props = defaultProps({
        errors: pinCodeErrors("pattern"),
        resource: { secret: { pin_code: "12ab" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code must only contain digits.");
    });

    it("renders the minLength error message for a partially filled pin.", () => {
      expect.assertions(1);

      const props = defaultProps({
        errors: pinCodeErrors("minLength"),
        resource: { secret: { pin_code: "12" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code must be at least 4 digits.");
    });

    it("renders the required error message for an empty pin with minLength flag.", () => {
      expect.assertions(1);

      const props = defaultProps({
        errors: pinCodeErrors("required"),
        resource: { secret: { pin_code: "" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code is required.");
    });

    it("renders the maxLength error message.", () => {
      expect.assertions(1);

      const props = defaultProps({
        errors: pinCodeErrors("maxLength"),
        resource: { secret: { pin_code: "1234567890123" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code cannot exceed 12 digits.");
    });

    it("renders the required error message.", () => {
      expect.assertions(1);

      const props = defaultProps({ errors: pinCodeErrors("required") });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code is required.");
    });
  });

  describe("Warnings", () => {
    it("renders the maxLength warning message and the attention icon when warnings include secret.pin_code maxLength.", () => {
      expect.assertions(2);

      const props = defaultProps({
        warnings: pinCodeWarnings("maxLength"),
        resource: { secret: { pin_code: "123456789012" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeWarningMessage.textContent).toEqual(
        "Warning: this is the maximum size for this field, make sure your data was not truncated.",
      );
      expect(page.attentionIcon).not.toBeNull();
    });

    it("suppresses the maxLength warning when a maxLength error is also present.", () => {
      expect.assertions(3);

      const props = defaultProps({
        errors: pinCodeErrors("maxLength"),
        warnings: pinCodeWarnings("maxLength"),
        resource: { secret: { pin_code: "1234567890123" } },
      });
      const page = new AddResourcePinCodePage(props);

      expect(page.pinCodeErrorMessage.textContent).toEqual("The PIN code cannot exceed 12 digits.");
      expect(page.pinCodeWarningMessage).toBeNull();
      expect(page.attentionIcon).toBeNull();
    });
  });
});
