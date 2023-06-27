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
 * Unit tests on EnterNewPassphrase in regard of specifications
 */
import EnterNewPassphrasePage from "./EnterNewPassphrase.test.page";
import {defaultProps} from "./EnterNewPassphrase.test.data";
import {waitFor} from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

jest.mock("../../../../shared/lib/Secret/PwnedPasswords");

describe("As LU I should see the user confirm passphrase page", () => {
  let page; // The page to test against
  const props = defaultProps();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('As LU I can start confirm my passphrase', () => {
    /**
     * Given the user settings passphrase
     * I should be able to enter my new passphrase
     * I should initially see the passphrase I typed as obfuscated
     * I should be able to cancel the update of my passphrase
     * I should see a processing feedback while submitting the form
     * I shouldn’t be able to submit the form if there is an invalid field
     */
    beforeEach(() => {
      page = new EnterNewPassphrasePage(props);
    });

    it('As LU I should be able to enter my new passphrase', async() => {
      expect.assertions(1);
      const expectedPassphrase = 'La belle vie';
      await page.insertPassphrase(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it('As LU I should initially see the passphrase I typed as obfuscated', async() => {
      expect.assertions(1);
      const passphrase = 'La belle vie';
      await page.insertPassphrase(passphrase);
      expect(page.isObfuscated).toBeTruthy();
    });

    it('As LU I should be able to see the non-obfuscate passphrase I typed', async() => {
      expect.assertions(1);
      const passphrase = 'La belle vie';
      await page.insertPassphrase(passphrase);
      await page.toggleObfuscate();
      expect(page.isObfuscated).toBeFalsy();
    });

    it('As LU I should see the passphrase very weak strength updated on change', async() => {
      const veryWeakPassphrase = 'blablabla';
      await page.insertPassphrase(veryWeakPassphrase);
      await waitFor(() => expect(page.isVeryWeakPassphrase).toBeTruthy());
    });

    it('As LU I should see the passphrase weak strength updated on change', async() => {
      const weakPassphrase = 'blablablablab';
      await page.insertPassphrase(weakPassphrase);
      await waitFor(() => expect(page.isWeakPassphrase).toBeTruthy());
    });

    it('As LU I should see the passphrase fair strength updated on change', async() => {
      const fairPassphrase = 'abcdefgh1234=5ABCD';
      await page.insertPassphrase(fairPassphrase);
      await waitFor(() => expect(page.isFairPassphrase).toBeTruthy());
    });

    it('As LU I should see the passphrase strong strength updated on change', async() => {
      const strongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.insertPassphrase(strongPassphrase);
      await waitFor(() => expect(page.isStrongPassphrase).toBeTruthy());
    });

    it('As LU I should see the passphrase very strong strength updated on change', async() => {
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===!';
      await page.insertPassphrase(veryStrongPassphrase);
      await waitFor(() => expect(page.isVeryStrongPassphrase).toBeTruthy());
    });

    it('As LU I should not go to the next step if the passphrase is not strong enough', async() => {
      expect.assertions(1);
      const veryWeakPassphrase = 'blabla';
      await page.insertPassphrase(veryWeakPassphrase);
      expect(page.canUpdate).toBeFalsy();
    });

    it('As LU I should not go to the next step if the passphrase is empty', async() => {
      expect.assertions(1);
      const veryWeakPassphrase = '';
      await page.insertPassphrase(veryWeakPassphrase);
      expect(page.canUpdate).toBeFalsy();
    });

    it('As LU I should go to the next step if the passphrase is strong enough', async() => {
      expect.hasAssertions();
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.insertPassphrase(veryStrongPassphrase);
      await waitFor(() => expect(page.canUpdate).toBeTruthy());
    });

    it('As LU I cannot update the form fields while submitting the form', async() => {
      expect.hasAssertions();
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.insertPassphrase(veryStrongPassphrase);
      await waitFor(() => expect(page.canUpdate).toBeTruthy());

      let generateResolve = null;
      const requestMockImpl = jest.fn(() => new Promise(resolve => generateResolve = resolve));
      jest.spyOn(props.userSettingsContext, 'onUpdatePassphraseRequested').mockImplementationOnce(requestMockImpl);
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        generateResolve();
      };
      await page.update(inProgressFn);
      expect(props.userSettingsContext.onUpdatePassphraseRequested).toHaveBeenCalledWith(veryStrongPassphrase);
    });

    it('As LU I should see a processing feedback while submitting the form', async() => {
      expect.hasAssertions();
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.insertPassphrase(veryStrongPassphrase);
      await waitFor(() => expect(page.canUpdate).toBeTruthy());

      let generateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => generateResolve = resolve));
      jest.spyOn(props.userSettingsContext, 'onUpdatePassphraseRequested').mockImplementationOnce(requestMockImpl);
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
        generateResolve();
      };
      await page.update(inProgressFn);
    });

    it('As LU I should be able to cancel the confirmation of my passphrase', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.userSettingsContext.onGoToIntroductionPassphraseRequested).toHaveBeenCalled();
    });

    it('As LU I should see an error dialog if there is an api error', async() => {
      expect.hasAssertions();
      expect(page.updateButton.getAttribute("disabled")).not.toBeNull();
      expect(page.updateButton.className).toBe('button primary disabled');

      // Fill the form
      await page.insertPassphrase("passphrase");

      await waitFor(() => expect(page.canUpdate).toBeTruthy());
      const mockReject = error => jest.fn(() => new Promise((resolve, reject) => reject(error)));
      jest.spyOn(props.userSettingsContext, 'onUpdatePassphraseRequested').mockImplementationOnce(mockReject(new PassboltApiFetchError("Jest simulate API error.")));
      await page.update(() => {
        if (!page.notInDictionaryHint.classList.contains("success")) {
          throw new Error("The page state didn't change yet.");
        }
      });
      const ErrorDialogProps = {error: new Error("Jest simulate API error.")};
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, ErrorDialogProps);
    });

    it('As LU I should be inform about ExternalServiceUnavailableError for powned password service', async() => {
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.reject());
      expect.assertions(2);
      await page.insertPassphrase("Service is unavailable");
      expect(page.notInDictionaryHint.classList.contains("unavailable")).toBeTruthy();
      expect(page.tootltip.textContent).toBe("The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach");
    });
    it('As LU I should see a complexity as Quality if the passphrase is empty', async() => {
      expect.assertions(2);
      await page.insertPassphrase("");
      expect(page.notInDictionaryHint.classList.length).toBe(0);
      expect(page.isEmptyPassphrase).toBeTruthy();
    });
  });
});
