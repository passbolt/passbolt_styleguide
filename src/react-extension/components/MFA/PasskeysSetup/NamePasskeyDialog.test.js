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
 * @since         5.17.0
 */
import { waitForTrue } from "../../../../../test/utils/waitFor";
import NamePasskeyDialogPage from "./NamePasskeyDialog.test.page";
import { defaultProps } from "./NamePasskeyDialog.test.data";
import { defaultPasskeyDto } from "../../../contexts/MFAContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("NamePasskeyDialog", () => {
  const nameValidationError = () => ({
    name: "PassboltApiFetchError",
    message: "Could not validate the data.",
    data: { code: 400, body: { name: { maxLength: "The name should not be longer than 255 characters." } } },
  });

  describe("As LU I can name the passkey I created", () => {
    it("As LU I should see the name of a known authenticator as suggested name", () => {
      expect.assertions(6);
      const page = new NamePasskeyDialogPage(defaultProps());

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Name your passkey");
      expect(page.nameInput.value).toEqual("Chrome on Mac");
      expect(page.icon).not.toBeNull();
      expect(page.saveButton.textContent).toEqual("Save");
      expect(page.cancelButton.textContent).toEqual("Cancel");
    });

    it("As LU I should see a fallback name for an unknown authenticator", () => {
      expect.assertions(1);
      const page = new NamePasskeyDialogPage(defaultProps({ aaguid: "00000000-0000-0000-0000-000000000000" }));

      expect(page.nameInput.value).toEqual("Passkey");
    });

    it("As LU I should see a fallback name when the authenticator is not provided", () => {
      expect.assertions(1);
      const page = new NamePasskeyDialogPage(defaultProps({ aaguid: null }));

      expect(page.nameInput.value).toEqual("Passkey");
    });

    it("As LU I should see a numbered suggested name when I already have a passkey with the authenticator name", () => {
      expect.assertions(1);
      const passkeys = [defaultPasskeyDto({ name: "chrome on mac" })];
      const page = new NamePasskeyDialogPage(defaultProps({ passkeys }));

      expect(page.nameInput.value).toEqual("Chrome on Mac (2)");
    });

    it("As LU I should see the next free number in the suggested name", () => {
      expect.assertions(1);
      const passkeys = [
        defaultPasskeyDto({ name: "Passkey" }),
        defaultPasskeyDto({ name: "Passkey (2)" }),
        defaultPasskeyDto({ name: "Passkey (4)" }),
      ];
      const page = new NamePasskeyDialogPage(defaultProps({ aaguid: null, passkeys }));

      expect(page.nameInput.value).toEqual("Passkey (3)");
    });

    it("As LU I should see a success feedback after saving the passkey", async () => {
      expect.assertions(5);
      const props = defaultProps();
      const page = new NamePasskeyDialogPage(props);

      await page.fillName("  My laptop ");
      await page.save();

      expect(props.mfaContext.finishPasskeyRegistration).toHaveBeenCalledWith("My laptop");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
        "The passkey has been added successfully.",
      );
      expect(props.onClose).toHaveBeenCalled();
      expect(props.onSaved).toHaveBeenCalled();
      expect(props.onFailed).not.toHaveBeenCalled();
    });

    it("As LU I should not be able to interact with the dialog while the passkey is saved", async () => {
      expect.assertions(5);
      let resolveFinish;
      const finishPasskeyRegistration = jest.fn(() => new Promise((resolve) => (resolveFinish = resolve)));
      const props = defaultProps({ mfaContext: { finishPasskeyRegistration } });
      const page = new NamePasskeyDialogPage(props);

      page.saveWithoutWaitFor();

      await waitForTrue(() => page.saveButtonProcessing !== null);
      expect(page.saveButtonProcessing).not.toBeNull();
      expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.nameInput.hasAttribute("disabled")).toBeTruthy();
      expect(page.closeButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
      resolveFinish();
      await waitForTrue(() => props.onClose.mock.calls.length > 0);
    });
  });

  describe("As LU I should see the name errors", () => {
    it("As LU I should see an error when the name is empty", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const page = new NamePasskeyDialogPage(props);

      await page.fillName("   ");
      await page.save();

      expect(page.nameError.textContent).toEqual("A name is required.");
      expect(props.mfaContext.finishPasskeyRegistration).not.toHaveBeenCalled();
    });

    it("As LU I should see an error when the name is already used, whatever the case", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new NamePasskeyDialogPage(props);

      await page.fillName("passkey 2");
      await page.save();

      expect(page.nameError.textContent).toEqual("This name already exists, please provide another one.");
      expect(props.mfaContext.finishPasskeyRegistration).not.toHaveBeenCalled();

      await page.fillName("Passkey 4");
      expect(page.nameError).toBeNull();
    });

    it("As LU I should see the name error of the API and be able to retry", async () => {
      expect.assertions(6);
      const finishPasskeyRegistration = jest.fn(() => Promise.reject(nameValidationError()));
      const props = defaultProps({ mfaContext: { finishPasskeyRegistration } });
      const page = new NamePasskeyDialogPage(props);

      await page.save();
      await waitForTrue(() => page.nameError !== null);

      expect(page.nameError.textContent).toEqual("The name should not be longer than 255 characters.");
      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onFailed).not.toHaveBeenCalled();

      finishPasskeyRegistration.mockImplementation(async () => {});
      await page.fillName("My laptop");
      await page.save();

      expect(finishPasskeyRegistration).toHaveBeenLastCalledWith("My laptop");
      expect(props.onClose).toHaveBeenCalled();
      expect(props.onSaved).toHaveBeenCalled();
    });
  });

  describe("As LU I should be informed when the passkey is not added", () => {
    it("As LU I should see the dialog closing when the passkey cannot be saved", async () => {
      expect.assertions(4);
      const error = { name: "PassboltApiFetchError", message: "The limit is reached.", data: { code: 400, body: "" } };
      const props = defaultProps({
        mfaContext: { finishPasskeyRegistration: jest.fn(() => Promise.reject(error)) },
      });
      const page = new NamePasskeyDialogPage(props);

      await page.save();

      expect(props.onClose).toHaveBeenCalled();
      expect(props.onFailed).toHaveBeenCalledWith(error);
      expect(props.onSaved).not.toHaveBeenCalled();
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
    });

    it("As LU I should abort the registration when I close the dialog", async () => {
      expect.assertions(4);
      const props = defaultProps();
      const page = new NamePasskeyDialogPage(props);

      await page.close();

      expect(props.mfaContext.abortPasskeyRegistration).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
      expect(props.onAborted).toHaveBeenCalled();
      expect(props.mfaContext.finishPasskeyRegistration).not.toHaveBeenCalled();
    });

    it("As LU I should abort the registration when I cancel the dialog", async () => {
      expect.assertions(4);
      const props = defaultProps();
      const page = new NamePasskeyDialogPage(props);

      await page.cancel();

      expect(props.mfaContext.abortPasskeyRegistration).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
      expect(props.onAborted).toHaveBeenCalled();
      expect(props.mfaContext.finishPasskeyRegistration).not.toHaveBeenCalled();
    });
  });
});
