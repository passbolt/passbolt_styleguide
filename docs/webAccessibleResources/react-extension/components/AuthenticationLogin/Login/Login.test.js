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
 * Unit tests on Login in regard of specifications
 */
import each from "jest-each";
import LoginPage from "./Login.test.page";
import {LoginVariations} from "./Login";
import {defaultProps} from "./Login.test.data";
import {waitFor} from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

describe("Login", () => {
  each([
    {displayAs: LoginVariations.SETUP}, // Login
    {displayAs: LoginVariations.RECOVER}, // Account recovery check passphrase
  ]).describe("Common behavior to all context", _props => {
    it(`As AN I should be able to enter my secret key passphrase, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(2);
      const expectedPassphrase = "some passphrase";
      await page.fillPassphrase(expectedPassphrase);
      expect(page.passphrase).toBe(expectedPassphrase);
      await page.signIn();
      expect(props.onSignIn).toHaveBeenCalledWith("some passphrase", false);
    });

    it(`As AN I should be able to remember my passphrase if the feature is disabled, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({..._props, canRememberMe: false});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(2);
      expect(page.canRememberMe).toBeFalsy();
      const expectedPassphrase = "some passphrase";
      await page.fillPassphrase(expectedPassphrase);
      await page.signIn();
      expect(props.onSignIn).toHaveBeenCalledWith("some passphrase", false);
    });

    it(`As AN I should be able to remember my passphrase if the feature is enabled, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({..._props, canRememberMe: true});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(2);
      expect(page.canRememberMe).toBeTruthy();
      const expectedPassphrase = "some passphrase";
      await page.fillPassphrase(expectedPassphrase);
      await page.toggleRememberMe();
      await page.signIn();
      expect(props.onSignIn).toHaveBeenCalledWith("some passphrase", true);
    });

    it(`As AN I should be able to click on the secondary action, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({..._props});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(1);
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });

    it(`As AN I cannot update the form fields while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let checkResolve = null;
      const onSignIn = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      const props = defaultProps({..._props, onSignIn});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.canChange).toBeFalsy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.signIn(inProgressFn);
      expect(props.onSignIn).toHaveBeenCalledWith("some passphrase", false);
      expect(checkResolve).toBeDefined();
    });

    it(`As AN I should see a processing feedback while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let checkResolve = null;
      const onSignIn = jest.fn(() => new Promise(resolve => checkResolve = resolve));
      const props = defaultProps({..._props, onSignIn});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.hasAssertions();
      const inProgressFn = () => {
        expect(page.isProcessing).toBeTruthy();
        checkResolve();
      };
      await page.fillPassphrase('some passphrase');
      await page.signIn(inProgressFn);
      expect(props.onSignIn).toHaveBeenCalledWith("some passphrase", false);
      expect(checkResolve).toBeDefined();
    });

    it(`As AN I should see an error if the passphrase is empty after submitting the form (first validation), scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(1);
      const emptyPassphrase = ' ';
      await page.fillPassphrase(emptyPassphrase);
      await page.signIn();
      expect(page.hasEmptyPassphraseError).toBeTruthy();
    });

    it(`As AN I should see an error if the passphrase cannot decrypt the secret key, scenario: ${JSON.stringify(_props)}`, async() => {
      const expectedError = {name: 'InvalidMasterPasswordError'};
      const onCheckPassphrase = jest.fn(() => Promise.reject(expectedError));
      const props = defaultProps({..._props, onCheckPassphrase});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(1);
      await page.fillPassphrase('some passphrase');
      await page.signIn();
      expect(page.hasInvalidPassphraseError).toBeTruthy();
    });
  });

  describe('As AN on the Login workflow', () => {
    it('As AN on the Login workflow I should be able to be prompted to enter a passphrase and sign in', async() => {
      const props = defaultProps({displayAs: LoginVariations.SIGN_IN});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(2);
      expect(page.signInButton.textContent).toBe("Sign in");
      expect(page.secondaryActionLink.textContent).toBe("Help, I lost my passphrase.");
    });
  });

  describe('As AN on the Account Recovery workflow', () => {
    it('As AN on the account recovery workflow I should be able to be prompted to enter a passphrase and complete the account recovery', async() => {
      const props = defaultProps({displayAs: LoginVariations.ACCOUNT_RECOVERY});
      const page = new LoginPage(props);

      await waitFor(() => {});

      expect.assertions(2);
      expect(page.signInButton.textContent).toBe("Complete recovery");
      expect(page.secondaryActionLink.textContent).toBe("Help, I lost my passphrase.");
    });
  });

  describe("As a registered user I can use the SSO feature to sign in to passbolt", () => {
    it('As AN I cannot see the SSO login button if I do not have an SSO kit set on my browser profile', async() => {
      expect.assertions(1);
      const props = defaultProps({
        displayAs: LoginVariations.SIGN_IN,
        isSsoAvailable: false,
      });

      const page = new LoginPage(props);
      await waitFor(() => {});

      expect(page.secondaryActionLink.textContent).toStrictEqual("Help, I lost my passphrase.");
    });

    it('As AN I can see the SSO login button if I have an SSO kit set on my browser profile', async() => {
      expect.assertions(1);
      const props = defaultProps({
        displayAs: LoginVariations.SIGN_IN,
        isSsoAvailable: true,
      });

      const page = new LoginPage(props);
      await waitFor(() => {});

      expect(page.secondaryActionLink.textContent).toStrictEqual("Sign in with Single Sign-On.");
    });

    it('As AN with an SSO kit, I can switch to Sign-in with SSO', async() => {
      expect.assertions(2);
      const props = defaultProps({
        switchToSsoLogin: jest.fn(),
        displayAs: LoginVariations.SIGN_IN,
        isSsoAvailable: true,
      });

      const page = new LoginPage(props);
      await waitFor(() => {});

      expect(page.secondaryActionLink.textContent).toStrictEqual("Sign in with Single Sign-On.");

      await page.clickSecondaryActionLink();

      expect(props.switchToSsoLogin).toHaveBeenCalledTimes(1);
    });
  });
});
