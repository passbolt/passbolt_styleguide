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
 * @since         3.7.0
 */

/**
 * Unit tests on SignInManager in regard of specifications
 */

import {
  domElementWithExtensionSignIn, domElementWithNoExtensionSignIn,
  initializeWindow
} from "./SignInManager.test.data";
import SignInManagerPage from "./SignInManager.test.page";
import SignInManager from "./SignInManager";

beforeEach(() => {
  jest.resetModules();
});

describe("SignInManager", () => {
  // Mock port in window
  initializeWindow();
  // Spy on port request
  jest.spyOn(port, 'request').mockImplementation(() => "");

  afterEach(() => {
    SignInManager.destroy();
  });

  it("As AN I should not be redirected if I click on other button", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementWithNoExtensionSignIn; // The Dom
    const SignInManager = new SignInManagerPage();
    await SignInManager.clickOnOtherButton();
    expect(port.request).not.toHaveBeenCalled();
  });

  it("As AN I should be redirected if I click on sign in", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementWithExtensionSignIn; // The Dom
    const SignInManager = new SignInManagerPage();
    await SignInManager.clickOnSignIn();
    expect(document.documentElement.classList.contains("passbolt-extension")).toBeTruthy();
    expect(port.request).toHaveBeenCalledWith("passbolt.extension.sign-in-url");
  });
});

