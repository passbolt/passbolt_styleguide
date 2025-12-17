/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import each from "jest-each";
import { CreateGpgKeyVariation } from "./CreateGpgKey";
import { defaultProps } from "./CreateGpgKey.test.data";
import CreateGpgKeyPage from "./CreateGpgKey.test.page";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import { passphraseIsInDictionnary } from "../../../../shared/services/api/secrets/pownedService.data";
import { defaultUserPassphrasePoliciesEntityDto } from "../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data";

jest.mock("../../../../shared/lib/Secret/PwnedPasswords");

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("CreateGpgKey", () => {
  each([
    { displayAs: CreateGpgKeyVariation.SETUP }, // Create a gpg key for the setup workflow
    { displayAs: CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY }, // Create a gpg key for the account recovery workflow
  ]).describe("Common behavior to all context", (_props) => {
    it(`As AN I should be able to enter a passphrase, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const expectedPassphrase = "La belle vie";
      await page.fill(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it(`As AN I should initially see the passphrase I typed as obfuscated, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const passphrase = "La belle vie";
      await page.fill(passphrase);
      expect(page.isObfuscated).toBeTruthy();
    });

    it(`As AN I should be able to see the non-obfuscate passphrase I typed, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const passphrase = "La belle vie";
      await page.fill(passphrase);
      await page.toggleObfuscate();
      expect(page.isObfuscated).toBeFalsy();
    });

    it(`As AN I should see the passphrase very weak strength updated on change, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const veryWeakPassphrase = "blablablabla";
      await page.fill(veryWeakPassphrase);
      expect(page.isVeryWeakPassphrase).toBeTruthy();
    });

    it(`As AN I should see the passphrase weak strength updated on change, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const weakPassphrase = "blablablablab";
      await page.fill(weakPassphrase);
      await waitFor(() => expect(page.isWeakPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase fair strength updated on change, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const fairPassphrase = "abcdefgh1234=5ABCD";
      await page.fill(fairPassphrase);
      await waitFor(() => expect(page.isFairPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase strong strength updated on change, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const strongPassphrase = "abcdefgh1234=5ABCD===";
      await page.fill(strongPassphrase);
      await waitFor(() => expect(page.isStrongPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase very strong strength updated on change, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const veryStrongPassphrase = "abcdefgh1234=5ABCD===!";
      await page.fill(veryStrongPassphrase);
      await waitFor(() => expect(page.isVeryStrongPassphrase).toBeTruthy());
    });

    it(`As AN I should not go to the next step if the passphrase is not strong enough, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const veryWeakPassphrase = "blabla";
      await page.fill(veryWeakPassphrase);
      expect(page.canGoToNextStep).toBeFalsy();
    });

    it(`As AN I should not go to the next step if the passphrase is empty, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const veryWeakPassphrase = "";
      await page.fill(veryWeakPassphrase);
      expect(page.canGoToNextStep).toBeFalsy();
    });

    it(`As AN I should go to the next step if the passphrase is strong enough, scenario: ${JSON.stringify(_props)}`, async () => {
      expect.assertions(1);
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.fill(veryStrongPassphrase);
      await waitFor(() => {
        if (!page.canGoToNextStep) {
          throw new Error("page is not updated yet");
        }
      });
      expect(page.canGoToNextStep).toBeTruthy();
    });

    it(`As AN I cannot update the form fields while submitting the form, scenario: ${JSON.stringify(_props)}`, async () => {
      let generateResolve = null;
      const onComplete = jest.fn(() => new Promise((resolve) => (generateResolve = resolve)));
      const props = defaultProps({ ..._props, onComplete });
      const page = new CreateGpgKeyPage(props);

      expect.hasAssertions();
      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.fill(veryStrongPassphrase);
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        generateResolve();
      };
      await waitFor(() => expect(page.canGoToNextStep).toBeTruthy());
      await page.generateKey(inProgressFn);
      await waitFor(() => expect(onComplete).toHaveBeenCalled());
      expect(generateResolve).toBeDefined();
    });

    it(`As AN I should see a processing feedback while submitting the form, scenario: ${JSON.stringify(_props)}`, async () => {
      let generateResolve = null;
      const onComplete = jest.fn(() => new Promise((resolve) => (generateResolve = resolve)));
      const props = defaultProps({ ..._props, onComplete });
      const page = new CreateGpgKeyPage(props);

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
      };
      const veryStrongPassphrase = "abcdefgh1234=5ABCD===";
      await page.fill(veryStrongPassphrase);
      await waitFor(() => expect(page.canGoToNextStep).toBeTruthy());
      await page.generateKey(inProgressFn);
      await waitFor(() => expect(onComplete).toHaveBeenCalled());
      expect(generateResolve).toBeDefined();
    });
  });

  describe("As AN on the Setup workflow", () => {
    it("As AN on the setup workflow I should be able to be prompted to enter a passphrase", async () => {
      expect.assertions(1);
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);

      expect(page.title).toBe("Welcome to Passbolt, please select a passphrase!");
    });

    it(`As AN on the setup workflow I should be able to import an existing key instead`, async () => {
      expect.assertions(2);
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);

      expect(page.secondaryActionLink.textContent).toContain("Or use an existing private key.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });

    it(`As AN on the setup workflow I cannot set a passphrase from a data breach`, async () => {
      expect.assertions(5);
      const spyOnPwnedService = jest
        .spyOn(PownedService.prototype, "evaluateSecret")
        .mockImplementation(() => passphraseIsInDictionnary());
      const passphrase = "passphrase from breached data";
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);
      await page.fill(passphrase);

      expect(page.passphraseErrorMessage).toBeNull();
      await page.generateKey();

      expect(spyOnPwnedService).toHaveBeenCalledTimes(1);
      expect(spyOnPwnedService).toHaveBeenCalledWith(passphrase);
      expect(page.passphraseErrorMessage.textContent).toBe("The passphrase is part of an exposed data breach.");
      expect(page.nextButton.disabled).toStrictEqual(true);
    });

    it("As AN on the setup workflow, if the pwnedpassword feature flag is unset I do not know if my passphrase is found in a data breach", async () => {
      expect.assertions(2);

      let generateResolve = null;
      const onComplete = jest.fn(() => new Promise((resolve) => (generateResolve = resolve)));
      const props = defaultProps({
        onComplete,
        displayAs: CreateGpgKeyVariation.SETUP,
        userPassphrasePolicies: defaultUserPassphrasePoliciesEntityDto({
          external_dictionary_check: false,
        }),
      });

      const spyOnPwnedService = jest
        .spyOn(PownedService.prototype, "evaluateSecret")
        .mockImplementation(() => passphraseIsInDictionnary());
      const passphrase = "passphrase from breached data";
      const page = new CreateGpgKeyPage(props);
      await page.fill(passphrase);

      expect(page.passphraseErrorMessage).toBeNull();
      await page.generateKey();
      await generateResolve();

      expect(spyOnPwnedService).not.toHaveBeenCalled();
    });

    it(`As AN on the setup workflow I see the entropy updated when I type a character after having typed a passphrase from a data breach`, async () => {
      expect.assertions(3);
      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation(() => passphraseIsInDictionnary());
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);
      await page.fill("passphrase from breached data");

      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
      await page.generateKey();
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 0.0");

      await page.fill("passphrase from breached tada");
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
    });

    it(`As AN on the setup workflow I can submit the from after having changed the passphrase used from a data breach`, async () => {
      expect.assertions(4);
      const notBreachedPassphrase = "notBreachedPassphrase";
      jest.spyOn(PownedService.prototype, "evaluateSecret").mockImplementation((passphrase) =>
        passphraseIsInDictionnary({
          inDictionary: passphrase !== notBreachedPassphrase,
        }),
      );
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);
      await page.fill("passphrase from breached data");

      expect(page.passphraseComplexity.textContent).toContain("Entropy: 137.9");
      await page.generateKey();
      expect(page.passphraseComplexity.textContent).toContain("Entropy: 0.0");

      await page.fill(notBreachedPassphrase);
      await page.generateKey();

      expect(props.onComplete).toHaveBeenCalledTimes(1);
      expect(props.onComplete).toHaveBeenCalledWith(notBreachedPassphrase);
    });
  });

  describe("As AN on the Recover workflow", () => {
    it("As AN on the setup workflow I should be able to be prompted to enter a new passphrase", async () => {
      expect.assertions(1);
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);

      expect(page.title).toBe("Welcome to Passbolt, please select a passphrase!");
    });

    it("As AN I should see a complexity as Quality if the passphrase is empty", async () => {
      expect.assertions(2);
      const props = defaultProps({ displayAs: CreateGpgKeyVariation.SETUP });
      const page = new CreateGpgKeyPage(props);
      await waitFor(() => {});

      await page.fill("");

      expect(page.isEmptyPassphrase).toBeTruthy();
      await waitFor(() => expect(page.isEmptyPassphrase).toBeTruthy());
    });
  });
});
