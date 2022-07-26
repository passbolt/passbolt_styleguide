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
 * Unit tests on CheckPassphrase in regard of specifications
 */
import {defaultProps} from "./CheckPassphrase.test.data";
import CheckPassphrasePage from "./CheckPassphrase.test.page";
import each from "jest-each";
import {CheckPassphraseVariations} from "./CheckPassphrase";
import PwnedPasswords from "../../../../shared/lib/Secret/PwnedPasswords";
import {waitFor} from "@testing-library/dom";

jest.mock("../../../../shared/lib/Secret/PwnedPasswords");

beforeEach(() => {
  jest.resetModules();
  PwnedPasswords.pwnedPasswords.mockResolvedValue(false);
});

describe("Check passphrase", () => {
  let page, // The page to test against.
    props; // The component props

  each([
    {displayAs: CheckPassphraseVariations.SETUP, canRememberMe: true}, // Setup with remember me enabled
    {displayAs: CheckPassphraseVariations.SETUP, canRememberMe: false}, // Setup with remember me disabled
    {displayAs: CheckPassphraseVariations.RECOVER, canRememberMe: true}, // Recover with remember me enabled
    {displayAs: CheckPassphraseVariations.RECOVER, canRememberMe: false}, // Recover with remember me disabled
  ]).describe("Common behavior to all context", _props => {
    it(`As AN I should be able to enter my secret key passphrase, scenario: ${JSON.stringify(_props)}`, async() => {
      props = defaultProps(_props);
      page = new CheckPassphrasePage(props);

      expect.assertions(1);
      const expectedPassphrase = "some passphrase";
      await page.fillPassphrase(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
    });

    it(`As AN I cannot update the form fields while submitting the form , scenario: ${JSON.stringify(_props)}`, async() => {
      let checkResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      props = defaultProps({..._props, onComplete});
      page = new CheckPassphrasePage(props);

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.verify(inProgressFn);
      expect(props.onComplete).toHaveBeenCalledWith("some passphrase", false);
      expect(checkResolve).toBeDefined();
    });

    it(`As AN I should see a processing feedback while submitting the form , scenario: ${JSON.stringify(_props)}`, async() => {
      let checkResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      props = defaultProps({..._props, onComplete});
      page = new CheckPassphrasePage(props);

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.verify(inProgressFn);
      expect(props.onComplete).toHaveBeenCalledWith("some passphrase", false);
      expect(checkResolve).toBeDefined();
    });

    it(`As AN I should see an error if the passphrase is empty after submitting the form (first validation) , scenario: ${JSON.stringify(_props)}`, async() => {
      props = defaultProps(_props);
      page = new CheckPassphrasePage(props);

      expect.assertions(1);
      const emptyPassphrase = ' ';
      await page.fillPassphrase(emptyPassphrase);
      await page.verify();
      expect(page.hasEmptyPassphraseError).toBeTruthy();
    });

    it(`As AN I should see an error if f the passphrase cannot decrypt the secret key , scenario: ${JSON.stringify(_props)}`, async() => {
      const expectedError = {name: 'InvalidMasterPasswordError'};
      const onComplete = jest.fn(() => Promise.reject(expectedError));
      props = defaultProps({..._props, onComplete});
      page = new CheckPassphrasePage(props);

      expect.assertions(1);
      await page.fillPassphrase('some passphrase');
      await page.verify();
      expect(page.hasInvalidPassphraseError).toBeTruthy();
    });
  });

  describe("Check Passphrase and remember me", () => {
    it("As AN I should not see the remember me option if I enable it through the props", async() => {
      expect.assertions(1);
      props = defaultProps({canRememberMe: true});
      page = new CheckPassphrasePage(props);
      expect(page.canRememberMe).toBeTruthy();
    });

    it("As AN I should not see the remember me option if I disable it through the props", async() => {
      expect.assertions(1);
      props = defaultProps({canRememberMe: false});
      page = new CheckPassphrasePage(props);
      expect(page.canRememberMe).toBeFalsy();
    });

    it("As AN I should be able to ask to remember my passphrase", async() => {
      props = defaultProps({canRememberMe: true});
      page = new CheckPassphrasePage(props);

      expect.assertions(3);
      expect(page.rememberMe).toBe("false");
      await page.toggleRememberMe();
      expect(page.rememberMe).toBe("true");
      await page.fillPassphrase('some passphrase');
      await page.verify(() => {
        if (!props.onComplete.mock.calls.length) {
          throw new Error("The page is still processing");
        }
      });
      expect(props.onComplete).toHaveBeenCalledWith("some passphrase", true);
    });

    it("As AN I should be able to ask to not remember my passphrase", async() => {
      props = defaultProps({canRememberMe: true});
      page = new CheckPassphrasePage(props);

      expect.assertions(2);
      expect(page.rememberMe).toBe("false");
      await page.fillPassphrase('some passphrase');
      await page.verify(() => {
        if (!props.onComplete.mock.calls.length) {
          throw new Error("The page is still processing");
        }
      });
      expect(props.onComplete).toHaveBeenCalledWith("some passphrase", false);
    });
  });

  describe("Check passphrase and secondary action", () => {
    it("As AN completing the setup I should be able to go to the generate key screen from the check passphrase state.", async() => {
      props = defaultProps({displayAs: CheckPassphraseVariations.SETUP});
      page = new CheckPassphrasePage(props);

      expect.assertions(2);
      expect(page.secondaryActionLink.textContent).toContain("I lost my passphrase, generate a new private key.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });

    it("As AN completing the recover I should be able to request some help if I lost my credentials.", async() => {
      props = defaultProps({displayAs: CheckPassphraseVariations.RECOVER});
      page = new CheckPassphrasePage(props);

      expect.assertions(2);
      expect(page.secondaryActionLink.textContent).toContain("Help, I lost my passphrase.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });
  });

  describe("Check pwned passphrase", () => {
    it("As AN completing the setup I should not be able to use a passphrase that is part of a data breach.", async() => {
      let pwnedResolve;
      const pwnedServiceImpl = () => new Promise(resolve => {
        pwnedResolve = resolve;
      });

      PwnedPasswords.pwnedPasswords.mockImplementation(pwnedServiceImpl);
      props = defaultProps({displayAs: CheckPassphraseVariations.SETUP});
      page = new CheckPassphrasePage(props);

      expect.assertions(1);
      await page.fillPassphrase('test@test.com');
      await page.verify();

      await waitFor(() => {
        if (pwnedResolve === undefined) {
          throw new Error("Service is not called yet!");
        }
      });
      await pwnedResolve(1);
      await waitFor(() => {
        if (page.isProcessing) {
          throw new Error("The page is still processing");
        }
      });

      expect(props.onComplete).not.toHaveBeenCalled();
    });

    it("As AN completing the recover I should be able to recover my account even if my passphrase is part of a data breach.", async() => {
      let pwnedResolve;
      const pwnedServiceImpl = () => new Promise(resolve => {
        pwnedResolve = resolve;
      });

      PwnedPasswords.pwnedPasswords.mockImplementation(pwnedServiceImpl);
      props = defaultProps({displayAs: CheckPassphraseVariations.RECOVER});
      page = new CheckPassphrasePage(props);

      expect.assertions(1);
      await page.fillPassphrase('test@test.com');
      await page.verify();

      await waitFor(() => {
        if (pwnedResolve === undefined) {
          throw new Error("Service is not called yet!");
        }
      });
      await pwnedResolve(1);
      await waitFor(() => {
        if (page.isProcessing) {
          throw new Error("The page is still processing");
        }
      });

      expect(props.onComplete).toHaveBeenCalledWith("test@test.com", false);
    });
  });
});
