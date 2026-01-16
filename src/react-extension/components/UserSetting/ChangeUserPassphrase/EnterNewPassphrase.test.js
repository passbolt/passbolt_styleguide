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
import { defaultProps, propsWithExternalDictionaryCheckDisabled } from "./EnterNewPassphrase.test.data";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { waitForTrue } from "../../../../../test/utils/waitFor";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {
  passphraseIsInDictionnary,
  passphraseIsNotInDictionnary,
} from "../../../../shared/services/api/secrets/pownedService.data";

jest.mock("../../../../shared/lib/Secret/PwnedPasswords");

describe("As LU I should see the user confirm passphrase page", () => {
  let page; // The page to test against
  const props = defaultProps();

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.spyOn(props.context.siteSettings, "canIUse").mockImplementation(() => false); // Hackaton: Don't break the tests with the introduction of the password policy default entropy
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("As LU I can start confirm my passphrase", () => {
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

    it("As LU I should be able to enter my new passphrase", async () => {
      expect.assertions(2);
      expect(page.exists()).toStrictEqual(true);
      const expectedPassphrase = "La belle vie";
      await page.insertPassphrase(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it("As LU I should initially see the passphrase I typed as obfuscated", async () => {
      expect.assertions(1);
      const passphrase = "La belle vie";
      await page.insertPassphrase(passphrase);
      expect(page.isObfuscated).toBeTruthy();
    });

    it("As LU I should be able to see the non-obfuscate passphrase I typed", async () => {
      expect.assertions(1);
      const passphrase = "La belle vie";
      await page.insertPassphrase(passphrase);
      await page.toggleObfuscate();
      expect(page.isObfuscated).toBeFalsy();
    });

    it("As LU I should see the passphrase very weak strength updated on change", async () => {
      expect.assertions(1);
      const veryWeakPassphrase = "blablabla";
      await page.insertPassphrase(veryWeakPassphrase);
      expect(page.isVeryWeakPassphrase).toBeTruthy();
    });

    it("As LU I should see the passphrase weak strength updated on change", async () => {
      expect.assertions(1);
      const weakPassphrase = "blablablablab";
      await page.insertPassphrase(weakPassphrase);
      expect(page.isWeakPassphrase).toBeTruthy();
    });

    it("As LU I should see the passphrase fair strength updated on change", async () => {
      expect.assertions(1);
      const fairPassphrase = "abcdefgh1234=5ABCD";
      await page.insertPassphrase(fairPassphrase);
      expect(page.isFairPassphrase).toBeTruthy();
    });

    it("As LU I should see the passphrase strong strength updated on change", async () => {
      expect.assertions(1);
      const strongPassphrase = "abcdefgh1234=5ABCD===";
      await page.insertPassphrase(strongPassphrase);
      expect(page.isStrongPassphrase).toBeTruthy();
    });

    it("As LU I should see the passphrase very strong strength updated on change", async () => {
      expect.assertions(1);
      const veryStrongPassphrase = "abcdefgh1234=5ABCD===!";
      await page.insertPassphrase(veryStrongPassphrase);
      expect(page.isVeryStrongPassphrase).toBeTruthy();
    });

    it("As LU I should not go to the next step if the passphrase is not strong enough", async () => {
      expect.assertions(1);
      const veryWeakPassphrase = "blabla";
      await page.insertPassphrase(veryWeakPassphrase);
      expect(page.canUpdate).toBeFalsy();
    });

    it("As LU I should not go to the next step if the passphrase is empty", async () => {
      expect.assertions(1);
      const veryWeakPassphrase = "";
      await page.insertPassphrase(veryWeakPassphrase);
      expect(page.canUpdate).toBeFalsy();
    });

    it("As LU I should go to the next step if the passphrase is strong enough", async () => {
      expect.assertions(1);
      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.insertPassphrase(veryStrongPassphrase);
      expect(page.canUpdate).toBeTruthy();
    });

    it("As LU I cannot update the form fields while submitting the form", async () => {
      expect.assertions(2);
      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.insertPassphrase(veryStrongPassphrase);
      expect(page.canUpdate).toBeTruthy();

      let generateResolve = null;
      props.userSettingsContext.onUpdatePassphraseRequested.mockImplementation((passphrase) => {
        expect(passphrase).toStrictEqual(veryStrongPassphrase);
        return new Promise((resolve) => {
          generateResolve = resolve;
        });
      });

      await page.update(() => !page.canChange);
      await waitForTrue(() => Boolean(generateResolve));
      await generateResolve();
    });

    it("As LU I should see a processing feedback while submitting the form", async () => {
      expect.assertions(1);

      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation(() => passphraseIsNotInDictionnary());
      let generateResolve = null;
      props.userSettingsContext.onUpdatePassphraseRequested.mockImplementation(
        () =>
          new Promise((resolve) => {
            generateResolve = resolve;
          }),
      );

      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.insertPassphrase(veryStrongPassphrase);
      await page.update(() => page.isProcessing);
      expect(page.isProcessing).toBeTruthy();
      await generateResolve();
    });

    it("As LU I should be able to cancel the confirmation of my passphrase", async () => {
      expect.assertions(1);
      await page.cancel();
      expect(props.userSettingsContext.onGoToIntroductionPassphraseRequested).toHaveBeenCalled();
    });

    it("As LU I should see an error dialog if there is an api error", async () => {
      expect.assertions(2);
      props.userSettingsContext.onUpdatePassphraseRequested.mockImplementation(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      // Fill the form
      await page.insertPassphrase("abcdefgh1234=5ABCD===");
      await page.update(() => props.dialogContext.open.mock.calls.length > 0);

      const ErrorDialogProps = { error: new Error("Jest simulate API error.") };
      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, ErrorDialogProps);
    });

    it("As LU I should see a complexity as Quality if the passphrase is empty", async () => {
      expect.assertions(1);
      await page.insertPassphrase("");
      expect(page.isEmptyPassphrase).toBeTruthy();
    });

    it(`As LU I cannot update my passphrase with a secret from a data breach`, async () => {
      expect.assertions(2);
      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation(() => passphraseIsInDictionnary());
      await page.insertPassphrase("abcdefgh1234=5ABCD===");
      await page.update(() => true);
      expect(page.isProcessing).toBeFalsy();
      expect(page.passphraseBreachedErrorMessage.textContent).toBe("The passphrase is part of an exposed data breach.");
    });

    it(`As LU I see the entropy updated when I type a character after having typed a passphrase from a data breach`, async () => {
      expect.assertions(3);
      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation(() => passphraseIsInDictionnary());
      await page.insertPassphrase("passphrase from breached data");
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
      await page.update(() => true);
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 0.0");
      await page.insertPassphrase("passphrase from breached tada");
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
    });

    it(`As LU I can update my passphrase after having changed the passphrase used from a data breach`, async () => {
      expect.assertions(3);

      const notBreachedPassphrase = "notBreachedPassphrase";
      props.userSettingsContext.onUpdatePassphraseRequested.mockImplementation((passphrase) => {
        expect(passphrase).toStrictEqual(notBreachedPassphrase);
      });

      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation((passphrase) =>
        passphraseIsInDictionnary({
          inDictionary: passphrase !== notBreachedPassphrase,
        }),
      );

      await page.insertPassphrase("passphrase from breached data");
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");

      await page.update(() => true);
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 0.0");

      await page.insertPassphrase(notBreachedPassphrase);
      await page.update(() => true);
    });
  });

  describe("With user passphrase policies external dictionary check disabled", () => {
    it("As LU I should be inform that my passphrae might be part of a data breach if external dictionary check is disabled", async () => {
      expect.assertions(2);
      const props = propsWithExternalDictionaryCheckDisabled();

      let generateResolve = null;
      props.userSettingsContext.onUpdatePassphraseRequested.mockImplementation(
        () =>
          new Promise((resolve) => {
            generateResolve = resolve;
          }),
      );

      const page = new EnterNewPassphrasePage(props);
      await page.insertPassphrase("ispowned service unavailable");

      const spyOnPownedService = jest
        .spyOn(PownedService.prototype, "evaluateSecret")
        .mockImplementation(() => passphraseIsInDictionnary());
      await page.insertPassphrase("passphrase from breached data");
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
      await page.update(() => true);
      await generateResolve();
      expect(spyOnPownedService).not.toHaveBeenCalled();
    });
  });
});
