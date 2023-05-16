/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.1.0
 */

/**
 * Unit tests on ConfirmPassphrase in regard of specifications
 */
import ConfirmPassphrasePage from "./ConfirmPassphrase.test.page";
import {defaultProps} from "./ConfirmPassphrase.test.data";
import {waitFor} from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the user confirm passphrase page", () => {
  let page; // The page to test against
  const props = defaultProps();

  describe('As LU I can start confirm my passphrase', () => {
    /**
     * Given the user settings passphrase
     * I should be able to confirm my passphrase
     * I should be able to cancel the confirmation of my passphrase
     * I should see a processing feedback while submitting the form
     * I shouldn’t be able to submit the form if there is an invalid field
     */
    beforeEach(() => {
      page = new ConfirmPassphrasePage(props);
    });

    it('As LU I should be able to confirm my passphrase', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Please enter your passphrase to continue');

      const requestMockImpl = jest.fn(() => new Promise(resolve => resolve));
      jest.spyOn(props.userSettingsContext, 'onCheckProvidePassphraseRequested').mockImplementationOnce(requestMockImpl);

      // Fill the form
      page.insertPassphrase("passphrase");
      await page.verify();
      expect(props.userSettingsContext.onCheckProvidePassphraseRequested).toHaveBeenCalledWith("passphrase");
    });

    it('As LU I should be able to cancel the confirmation of my passphrase', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.userSettingsContext.onGoToIntroductionPassphraseRequested).toHaveBeenCalled();
    });

    it('As LU I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      page.insertPassphrase("passphrase");

      const requestMockImpl = jest.fn(() => new Promise(resolve => resolve));
      jest.spyOn(props.userSettingsContext, 'onCheckProvidePassphraseRequested').mockImplementationOnce(requestMockImpl);

      page.verifyWithoutWaitFor();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.passphrase.getAttribute("disabled")).not.toBeNull();
        expect(page.verifyButton.getAttribute("disabled")).not.toBeNull();
        expect(page.verifyButton.className).toBe('button primary disabled processing');
        expect(page.cancelButton.getAttribute("disabled")).not.toBeNull();
      });
    });

    it("As LU I shouldn't be able to submit the form if there is an invalid field", async() => {
      expect.assertions(4);
      expect(page.verifyButton.getAttribute("disabled")).not.toBeNull();
      expect(page.verifyButton.className).toBe('button primary disabled');

      // Fill the form
      page.insertPassphrase("passphrase");
      const mockReject = error => jest.fn(() => new Promise((resolve, reject) => reject(error)));
      const error = {
        name: "InvalidMasterPasswordError"
      };
      jest.spyOn(props.userSettingsContext, 'onCheckProvidePassphraseRequested').mockImplementationOnce(mockReject(error));
      await page.verify();
      // Throw error message
      expect(page.passphraseErrorMessage).toBe("The passphrase is invalid.");

      jest.spyOn(props.userSettingsContext, 'onCheckProvidePassphraseRequested').mockImplementationOnce(mockReject(new PassboltApiFetchError("Jest simulate API error.")));

      await page.verify();
      const ErrorDialogProps = {error: new Error("Jest simulate API error.")};
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, ErrorDialogProps);
    });
  });
});
