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
 * @since         3.10.0
 */

/**
 * Unit tests on Login in regard of specifications
 */
import SsoLoginPage from "./SsoLogin.test.page";
import {defaultProps} from "./SsoLogin.test.data";
import {waitFor} from "@testing-library/dom";
import SsoProviders from "../../Administration/ManageSsoSettings/SsoProviders.data";

beforeEach(() => {
  jest.resetModules();
});

describe("SsoLogin", () => {
  describe("As a registered user I can use the SSO feature to sign in to passbolt", () => {
    it('As AN I can see the SSO login button if I have an SSO kit set on my browser profile', async() => {
      expect.assertions(2);
      const props = defaultProps();

      const page = new SsoLoginPage(props);
      await waitFor(() => {});

      expect(page.azureLoginButton).toBeTruthy();
      expect(page.secondaryActionLink.textContent).toStrictEqual("Sign in with my passphrase.");
    });

    it('As AN with and SSO kit, I can switch to Sign-in with passphrase', async() => {
      expect.assertions(2);
      const props = defaultProps({
        switchToPassphraseLogin: jest.fn(),
      });

      const page = new SsoLoginPage(props);
      await waitFor(() => {});

      expect(page.secondaryActionLink.textContent).toStrictEqual("Sign in with my passphrase.");

      await page.clickSecondaryActionLink();

      expect(props.switchToPassphraseLogin).toHaveBeenCalledTimes(1);
    });

    it('As AN I can use the SSO login feature to sign in to Passbolt', async() => {
      expect.assertions(3);

      const ssoProvider = SsoProviders.find(provider => provider.id === "azure");
      let signInPromiseResolver = null;
      const props = defaultProps({
        onSsoSignIn: jest.fn().mockImplementation(() => new Promise(resolve => {
          signInPromiseResolver = resolve;
        })),
        switchToPassphraseLogin: jest.fn(),
        ssoProvider,
      });

      const page = new SsoLoginPage(props);
      await waitFor(() => {});

      expect(page.azureLoginButton).toBeTruthy();

      await page.clickOnSsoLogin();

      expect(props.onSsoSignIn).toHaveBeenCalledTimes(1);

      await page.clickSecondaryActionLink();

      expect(props.switchToPassphraseLogin).not.toHaveBeenCalled();

      await signInPromiseResolver();
    });
  });
});
