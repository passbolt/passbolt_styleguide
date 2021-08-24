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
 * @since         3.4.0
 */

/**
 * Unit tests on InformManager in regard of specifications
 */

import {domElementBasicLogin, domElementWithNoUsernamePassword, initializeWindow} from "./InformManager.test.data";
import InformManagerPage from "./InformManager.test.page";
import InFormManager from "./InFormManager";

beforeEach(() => {
  jest.resetModules();
});

describe("InformManager", () => {
  // mock port in window
  initializeWindow();

  afterEach(() => {
    InFormManager.destroy();
  });

  it("As LU I should see the inform call to action", async() => {
    // Set up document body
    document.body.innerHTML = domElementBasicLogin; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnUsername();
    expect(informManager.iframesLength).toBe(1);
    await informManager.mouseOverOnPassword();
    expect(informManager.iframesLength).toBe(2);
    await informManager.blurOnUsername();
    expect(informManager.iframesLength).toBe(1);
    await informManager.blurOnPassword();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnPassword();
    expect(informManager.iframesLength).toBe(1);
    await informManager.mouseOverOnUsername();
    expect(informManager.iframesLength).toBe(2);
  });

  it("As LU I should see the inform call to action when I clicked on it", async() => {
    // Set up document body
    document.body.innerHTML = domElementBasicLogin; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnUsername();
    expect(informManager.iframesLength).toBe(1);
    await informManager.clickOnInformCallToAction();
    expect(informManager.iframesLength).toBe(1);
    await informManager.blurOnUsername();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnPassword();
    expect(informManager.iframesLength).toBe(1);
    await informManager.clickOnInformCallToAction();
    expect(informManager.iframesLength).toBe(1);
    await informManager.blurOnPassword();
    expect(informManager.iframesLength).toBe(0);
  });

  it("As LU I shouldn't see the inform call to action on a page with no login form", async() => {
    // Set up document body
    document.body.innerHTML = domElementWithNoUsernamePassword; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnSearch();
    expect(informManager.iframesLength).toBe(0);
  });
});

