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
import {waitFor} from "@testing-library/react";
import each from "jest-each";
import {CreateGpgKeyVariation} from "./CreateGpgKey";
import {defaultProps} from "./CreateGpgKey.test.data";
import CreateGpgKeyPage from "./CreateGpgKey.test.page";

jest.mock("../../../../shared/lib/Secret/PwnedPasswords");

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllTimers();
});


describe("CreateGpgKey", () => {
  each([
    {displayAs: CreateGpgKeyVariation.SETUP}, // Create a gpg key for the setup workflow
    {displayAs: CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY}, // Create a gpg key for the account recovery workflow
  ]).describe("Common behavior to all context", _props => {
    it(`As AN I should be able to enter a passphrase, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const expectedPassphrase = 'La belle vie';
      await page.fill(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it(`As AN I should initially see the passphrase I typed as obfuscated, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const passphrase = 'La belle vie';
      await page.fill(passphrase);
      expect(page.isObfuscated).toBeTruthy();
    });

    it(`As AN I should be able to see the non-obfuscate passphrase I typed, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const passphrase = 'La belle vie';
      await page.fill(passphrase);
      await page.toggleObfuscate();
      expect(page.isObfuscated).toBeFalsy();
    });

    it(`As AN I should see the passphrase very weak strength updated on change, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const veryWeakPassphrase = 'blablablabla';
      await page.fill(veryWeakPassphrase);
      expect(page.isVeryWeakPassphrase).toBeTruthy();
    });

    it(`As AN I should see the passphrase weak strength updated on change, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const weakPassphrase = 'blablablablab';
      await page.fill(weakPassphrase);
      await waitFor(() => expect(page.isWeakPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase fair strength updated on change, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const fairPassphrase = 'abcdefgh1234=5ABCD';
      await page.fill(fairPassphrase);
      await waitFor(() => expect(page.isFairPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase strong strength updated on change, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const strongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.fill(strongPassphrase);
      await waitFor(() => expect(page.isStrongPassphrase).toBeTruthy());
    });

    it(`As AN I should see the passphrase very strong strength updated on change, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===!';
      await page.fill(veryStrongPassphrase);
      await waitFor(() => expect(page.isVeryStrongPassphrase).toBeTruthy());
    });

    it(`As AN I should not go to the next step if the passphrase is not strong enough, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const veryWeakPassphrase = 'blabla';
      await page.fill(veryWeakPassphrase);
      expect(page.canGoToNextStep).toBeFalsy();
    });

    it(`As AN I should not go to the next step if the passphrase is empty, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      const veryWeakPassphrase = '';
      await page.fill(veryWeakPassphrase);
      expect(page.canGoToNextStep).toBeFalsy();
    });

    it(`As AN I should go to the next step if the passphrase is strong enough, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new CreateGpgKeyPage(props);

      expect.hasAssertions();
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.fill(veryStrongPassphrase);
      await waitFor(() => expect(page.canGoToNextStep).toBeTruthy());
    });

    it(`As AN I cannot update the form fields while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let generateResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => generateResolve = resolve));
      const props = defaultProps({..._props, onComplete});
      const page = new CreateGpgKeyPage(props);

      expect.hasAssertions();
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.fill(veryStrongPassphrase);
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        generateResolve();
      };
      await waitFor(() => expect(page.canGoToNextStep).toBeTruthy());
      await page.generateKey(inProgressFn);
      await waitFor(() =>  expect(onComplete).toHaveBeenCalled());
      expect(generateResolve).toBeDefined();
    });

    it(`As AN I should see a processing feedback while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let generateResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => generateResolve = resolve));
      const props = defaultProps({..._props, onComplete});
      const page = new CreateGpgKeyPage(props);

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
      };
      const veryStrongPassphrase = 'abcdefgh1234=5ABCD===';
      await page.fill(veryStrongPassphrase);
      await waitFor(() => expect(page.canGoToNextStep).toBeTruthy());
      await page.generateKey(inProgressFn);
      await waitFor(() =>  expect(onComplete).toHaveBeenCalled());
      expect(generateResolve).toBeDefined();
    });
  });

  describe('As AN on the Setup workflow', () => {
    it('As AN on the setup workflow I should be able to be prompted to enter a passphrase', async() => {
      const props = defaultProps({displayAs: CreateGpgKeyVariation.SETUP});
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      expect(page.title).toBe("Welcome to Passbolt, please select a passphrase!");
    });

    it(`As AN on the setup workflow I should be able to import an existing key instead`, async() => {
      const props = defaultProps({displayAs: CreateGpgKeyVariation.SETUP});
      const page = new CreateGpgKeyPage(props);

      expect.assertions(2);
      expect(page.secondaryActionLink.textContent).toContain("Or use an existing private key.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });
  });

  describe('As AN on the Recover workflow', () => {
    it('As AN on the setup workflow I should be able to be prompted to enter a new passphrase', async() => {
      const props = defaultProps({displayAs: CreateGpgKeyVariation.SETUP});
      const page = new CreateGpgKeyPage(props);

      expect.assertions(1);
      expect(page.title).toBe("Welcome to Passbolt, please select a passphrase!");
    });

    it('As AN I should be inform about ExternalServiceUnavailableError for powned password service', async() => {
      const props = defaultProps({displayAs: CreateGpgKeyVariation.SETUP});
      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.reject());
      const page = new CreateGpgKeyPage(props);
      expect.assertions(2);
      await page.fill("Service is unavailable");
      expect(page.notInDictionaryHint.classList.contains("unavailable")).toBeTruthy();
      expect(page.tootltip.textContent).toBe("The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach");
    });

    it("As AN I should see a complexity as Quality if the passphrase is empty", async() => {
      const props = defaultProps({displayAs: CreateGpgKeyVariation.SETUP});
      const page = new CreateGpgKeyPage(props);
      expect.assertions(2);

      await page.fill("");

      expect(page.isEmptyPassphrase).toBeTruthy();
      expect(page.notInDictionaryHint.classList.length).toBe(0);
    });
  });
});
