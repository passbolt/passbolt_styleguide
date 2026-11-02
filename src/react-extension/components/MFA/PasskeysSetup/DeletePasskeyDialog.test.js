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
/**
 * Unit tests on DeletePasskeyDialog in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import DeletePasskeyDialogPage from "./DeletePasskeyDialog.test.page";
import { defaultProps } from "./DeletePasskeyDialog.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("DeletePasskeyDialog", () => {
  describe("As LU I can delete a passkey", () => {
    it("As LU I should know what passkey I am deleting", () => {
      expect.assertions(6);
      const props = defaultProps();
      const page = new DeletePasskeyDialogPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Delete passkey");
      expect(page.passkeyName.textContent).toEqual(props.passkey.name);
      expect(page.closeButton).not.toBeNull();
      expect(page.submitButton.textContent).toEqual("Delete passkey");
      expect(page.cancelButton.textContent).toEqual("Cancel");
    });

    it("As LU I should see a fallback name for an unnamed passkey", () => {
      expect.assertions(1);
      const props = defaultProps({ passkey: { id: "8e3874ae-4b40-590b-968a-418f704b9d9a", name: null } });
      const page = new DeletePasskeyDialogPage(props);

      expect(page.passkeyName.textContent).toEqual("Passkey");
    });

    it("As LU I should see a success feedback after deleting a passkey", async () => {
      expect.assertions(4);
      const props = defaultProps();
      const page = new DeletePasskeyDialogPage(props);

      await page.click(page.submitButton);

      expect(props.mfaContext.deletePasskey).toHaveBeenCalledWith(props.passkey.id);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
        "The passkey has been deleted successfully.",
      );
      expect(props.onClose).toHaveBeenCalled();
      expect(props.onDeleted).toHaveBeenCalled();
    });

    it("As LU I should see a processing feedback while submitting the form", async () => {
      expect.assertions(3);
      let deleteResolve;
      const props = defaultProps({
        mfaContext: { deletePasskey: jest.fn(() => new Promise((resolve) => (deleteResolve = resolve))) },
      });
      const page = new DeletePasskeyDialogPage(props);

      page.clickWithoutWaitFor(page.submitButton);

      await waitFor(() => {
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.submitButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.submitButtonProcessing).not.toBeNull();
        deleteResolve();
      });
    });

    it("As LU I should be able to cancel the operation by clicking on the close button", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const page = new DeletePasskeyDialogPage(props);

      await page.click(page.closeButton);

      expect(props.onClose).toHaveBeenCalled();
      expect(props.mfaContext.deletePasskey).not.toHaveBeenCalled();
    });

    it("As LU I should be able to cancel the operation by clicking on the cancel button", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DeletePasskeyDialogPage(props);

      await page.click(page.cancelButton);

      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I should be able to cancel the operation with the keyboard (escape)", () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DeletePasskeyDialogPage(props);

      page.escapeKey();

      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I should see an error dialog and keep the dialog open when the deletion fails", async () => {
      expect.assertions(4);
      const error = new Error("Jest simulate API error.");
      const props = defaultProps({ mfaContext: { deletePasskey: jest.fn(() => Promise.reject(error)) } });
      const page = new DeletePasskeyDialogPage(props);

      await page.click(page.submitButton);
      await waitFor(() => {
        if (page.submitButton.hasAttribute("disabled")) {
          throw new Error("The dialog is still processing");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error });
      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onDeleted).not.toHaveBeenCalled();
      expect(page.submitButton.hasAttribute("disabled")).toBeFalsy();
    });
  });
});
