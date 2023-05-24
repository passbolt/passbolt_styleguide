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
 * Unit tests on LoginPage in regard of specifications
 */
import LoginPageTest from "./LoginPage.test.page";
import {defaultPropsWithSsoDisabled, defaultPropsWithSsoEnabled} from "./LoginPage.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("Quickaccess::LoginPage", () => {
  it(`As AN I can see the SSO login button by default from the quickacess if I have an SSO kit on my browser profile`, async() => {
    expect.assertions(1);

    const props = defaultPropsWithSsoEnabled();
    const page = new LoginPageTest(props);

    await page.isReady();

    expect(page.ssoLoginButton).toBeTruthy();
  });

  //covers as well `As AN when I sign in via passphrase when I don't have an SSO kit, an SSO kit is generated` as the kit is generated from the background page
  it(`As AN I can login via SSO from the quickacess`, async() => {
    expect.assertions(1);

    const props = defaultPropsWithSsoEnabled();
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSsoLoginButton();

    expect(props.ssoContext.runSignInProcess).toHaveBeenCalled();
  });

  it(`As AN I can still use the login via passphrase if I have an SSO kit on my browser profile`, async() => {
    expect.assertions(1);

    const props = defaultPropsWithSsoEnabled();
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSwitchToPassphraseForm();

    expect(page.passphraseInput).toBeTruthy();
  });

  it(`As AN when I am on the sign in with passphrase quickaccess page, I can switch to login via SSO if I have an SSO kit in my browser profile`, async() => {
    expect.assertions(2);

    const props = defaultPropsWithSsoEnabled();
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSwitchToPassphraseForm();

    expect(page.passphraseInput).toBeTruthy();

    await page.clickOnSwitchToSsoForm();

    expect(page.ssoLoginButton).toBeTruthy();
  });

  it(`As AN I cannot use the SSO login feature if I do not have an SSO kit on my browser profile`, async() => {
    expect.assertions(2);

    const props = defaultPropsWithSsoDisabled();
    const page = new LoginPageTest(props);

    await page.isReady();

    expect(page.passphraseInput).toBeTruthy();
    expect(page.switchToSsoFormButton).toBeFalsy();
  });

  it(`As AN when I try to sign from the quickaccess via SSO, If I close the SSO login popup, the quickaccess should stay on the SSO form`, async() => {
    expect.assertions(1);

    const expectedError = new Error("The user closed the popup");
    expectedError.name = "UserAbortsOperationError";

    const props = defaultPropsWithSsoEnabled({
      ssoContext: {
        runSignInProcess: () => { throw expectedError; }
      }
    });
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSsoLoginButton();

    expect(page.passphraseInput).toBeFalsy();
  });

  it(`As AN when I attempt to sign in from the quickaccess via SSO and an error occurs after a successful SSO third party login, I can see an error message with the error details`, async() => {
    expect.assertions(1);

    const expectedError = new Error("The decrypted passphrase can't decrypt the user's private key");
    expectedError.name = "InvalidMasterPasswordError";

    const props = defaultPropsWithSsoEnabled({
      ssoContext: {
        runSignInProcess: () => { throw expectedError; }
      }
    });
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSsoLoginButton();

    expect(page.ssoErrorMessage.textContent).toBe("An error occured during the sign-in via SSO.The decrypted passphrase can't decrypt the user's private key");
  });

  it(`As AN when I attempt to sign in from the quickaccess via SSO and the API configuration changed, the quickaccess should close and I am redirected to the right tab`, async() => {
    const originalWindowClose = window.close;
    window.close = jest.fn();

    expect.assertions(1);

    const expectedError = new Error("SSO Login can't proceed via quickaccess");
    expectedError.name = "SsoSettingsChangedError";

    const props = defaultPropsWithSsoEnabled({
      ssoContext: {
        runSignInProcess: () => { throw expectedError; }
      }
    });
    const page = new LoginPageTest(props);

    await page.isReady();

    await page.clickOnSsoLoginButton();

    expect(window.close).toHaveBeenCalledTimes(1);

    window.close = originalWindowClose;
  });
});
