/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Unit tests on InformManager in regard of specifications
 */

import {
  domElementLoginOnlyPasswordWithSubmitButton,
  domElementLoginWithAutocompleteAttributeEmail,
  domElementLoginWithAutocompleteAttributeUsername, domElementLoginWithClassCreateAccount,
  domElementLoginWithClassEmail,
  domElementLoginWithClassUsername, domElementLoginWithIdAttributeBenutzerkennung,
  domElementLoginWithIdAttributeEmail, domElementLoginWithIdAttributeLogin,
  domElementLoginWithIdAttributeUsername, domElementLoginWithNameAttributeBenutzerkennung,
  domElementLoginWithNameAttributeEmail, domElementLoginWithNameAttributeLogin,
  domElementLoginWithNameAttributeUsername,
  domElementLoginWithNoTypeAndAutocompleteAttributeEmail,
  domElementLoginWithNoTypeAndAutocompleteAttributeUsername, domElementLoginWithNoTypeAndClassCreateAccount,
  domElementLoginWithNoTypeAndClassEmail,
  domElementLoginWithNoTypeAndClassUsername, domElementLoginWithNoTypeAndIdAttributeBenutzerkennung,
  domElementLoginWithNoTypeAndIdAttributeEmail, domElementLoginWithNoTypeAndIdAttributeLogin,
  domElementLoginWithNoTypeAndIdAttributeUsername, domElementLoginWithNoTypeAndNameAttributeBenutzerkennung,
  domElementLoginWithNoTypeAndNameAttributeEmail, domElementLoginWithNoTypeAndNameAttributeLogin,
  domElementLoginWithNoTypeAndNameAttributeUsername, domElementLoginWithNoTypeAndPlaceHolderAttributeE_mail,
  domElementLoginWithNoTypeAndPlaceHolderAttributeEmail,
  domElementLoginWithNoTypeAndPlaceHolderAttributeUsername, domElementLoginWithPlaceHolderAttributeE_mail,
  domElementLoginWithPlaceHolderAttributeEmail,
  domElementLoginWithPlaceHolderAttributeUsername,
  domElementLoginWithSubmitButton,
  domElementOnlyPassword,
  domElementOnlyUsername, domElementWithMultipleLogin,
  domElementWithNoUsernamePassword,
  initializeWindow
} from "./InformManager.test.data";
import InformManagerPage from "./InformManager.test.page";
import InFormManager from "./InFormManager";
import DomUtils from "../Dom/DomUtils";

beforeEach(() => {
  jest.resetModules();
});

describe("InformManager", () => {
  // mock port in window
  initializeWindow();

  afterEach(() => {
    InFormManager.destroy();
  });

  it("As LU I should see the inform call to action on form with name attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with name attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNameAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with name attribute login", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNameAttributeLogin; // The Dom
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

  it("As LU I should see the inform call to action on form with name attribute benutzerkennung", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNameAttributeBenutzerkennung; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and name attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with no type name attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type name attribute login", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeLogin; // The Dom
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

  it("As LU I should see the inform call to action on form with no type name attribute benutzerkennung", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeBenutzerkennung; // The Dom
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

  it("As LU I should see the inform call to action on form with id attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithIdAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with id attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithIdAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with id attribute login", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithIdAttributeLogin; // The Dom
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

  it("As LU I should see the inform call to action on form with id attribute benutzerkennung", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithIdAttributeBenutzerkennung; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and id attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and id attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and id attribute login", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeLogin; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and id attribute benutzerkennung", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeBenutzerkennung; // The Dom
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

  it("As LU I should see the inform call to action on form with autocomplete attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithAutocompleteAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with autocomplete attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithAutocompleteAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and autocomplete attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndAutocompleteAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and autocomplete attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndAutocompleteAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with placeholder attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithPlaceHolderAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with placeholder attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithPlaceHolderAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with placeholder attribute e-mail", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithPlaceHolderAttributeE_mail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and placeholder attribute username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and placeholder attribute email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and placeholder attribute e-mail", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeE_mail; // The Dom
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

  it("As LU I should see the inform call to action on form with class username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithClassUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with class email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithClassEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with class create-account-input", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithClassCreateAccount; // The Dom
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

  it("As LU I should see the inform call to action on form with no type and class username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndClassUsername; // The Dom
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

  it("As LU I should see the inform call to action on form with no type class email", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndClassEmail; // The Dom
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

  it("As LU I should see the inform call to action on form with no type class create-account-input", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNoTypeAndClassCreateAccount; // The Dom
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

  it("As LU I should see the inform call to action when I clicked on it and autofill fields", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
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
    await informManager.autofillCredentials('test', 'password');
    expect(informManager.username.value).toBe('test');
    expect(informManager.password.value).toBe('password');
  });

  it("As LU I should autofill a form with only password", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementOnlyPassword; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnPassword();
    expect(informManager.iframesLength).toBe(1);
    await informManager.clickOnInformCallToAction();
    await informManager.autofillCredentials('test', 'password');
    expect(informManager.password.value).toBe('password');
  });

  it("As LU I should autofill a form with only username", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementOnlyUsername; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnUsername();
    expect(informManager.iframesLength).toBe(1);
    await informManager.clickOnInformCallToAction();
    await informManager.autofillCredentials('test', 'password');
    expect(informManager.username.value).toBe('test');
  });

  it("As LU I should see the inform call to action when I clicked on it and autofill only fields in the same parent container", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementWithMultipleLogin; // The Dom
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
    await informManager.clickOnInformCallToAction(2);
    expect(informManager.iframesLength).toBe(1);
    await informManager.blurOnPassword();
    expect(informManager.iframesLength).toBe(0);
    await informManager.autofillCredentials('test', 'password');
    expect(informManager.usernames[0].value).toBe('');
    expect(informManager.passwords[0].value).toBe('');
    expect(informManager.usernames[1].value).toBe('test');
    expect(informManager.passwords[1].value).toBe('password');
    expect(informManager.usernames[2].value).toBe('');
    expect(informManager.passwords[2].value).toBe('');
  });

  it("As LU I should auto save a form", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginWithSubmitButton; // The Dom
    const informManager = new InformManagerPage();
    await informManager.clickOnInformCallToAction();
    await informManager.autofillPassword('password');
    expect(informManager.password.value).toBe('password');
    jest.spyOn(window.port, 'emit').mockImplementationOnce(() => {});
    await informManager.save();
    const save = {
      name: "",
      password: "password",
      url: "http://localhost/",
      username: "",
    };
    expect(window.port.emit).toHaveBeenCalledWith('passbolt.web-integration.autosave', save);
  });

  it("As LU I should auto save a form with only password field", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementLoginOnlyPasswordWithSubmitButton; // The Dom
    const informManager = new InformManagerPage();
    await informManager.clickOnInformCallToAction();
    await informManager.autofillPassword('password');
    expect(informManager.password.value).toBe('password');
    jest.spyOn(window.port, 'emit').mockImplementationOnce(() => {});
    await informManager.save();
    const save = {
      name: "",
      password: "password",
      url: "http://localhost/",
      username: "",
    };
    expect(window.port.emit).toHaveBeenCalledWith('passbolt.web-integration.autosave', save);
  });

  it("As LU I shouldn't see the inform call to action on a page with no login form", async() => {
    // Set up document body
    // eslint-disable-next-line no-unsanitized/property
    document.body.innerHTML = domElementWithNoUsernamePassword; // The Dom
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(0);
    await informManager.focusOnSearch();
    expect(informManager.iframesLength).toBe(0);
  });

  it("As LU I should see the inform call to action in iframe", async() => {
    jest.spyOn(DomUtils, "isRequestInitiatedFromSameOrigin").mockImplementation(() => true);
    // Set up document body
    const iframe = document.createElement('iframe');
    iframe.srcdoc = domElementLoginWithIdAttributeLogin;
    document.body.appendChild(iframe);
    // eslint-disable-next-line no-unsanitized/property
    iframe.contentDocument.body.innerHTML = domElementLoginWithIdAttributeLogin;
    const informManager = new InformManagerPage();
    expect(informManager.iframesLength).toBe(1);
    await informManager.focusOnUsernameIframe();
    expect(informManager.iframesLength).toBe(2);
    await informManager.clickOnInformCallToAction();
    expect(informManager.iframesLength).toBe(2);
    await informManager.blurOnUsernameIframe();
    expect(informManager.iframesLength).toBe(1);
    await informManager.focusOnPasswordIframe();
    expect(informManager.iframesLength).toBe(2);
    await informManager.clickOnInformCallToAction(2);
    expect(informManager.iframesLength).toBe(2);
    await informManager.blurOnPasswordIframe();
    expect(informManager.iframesLength).toBe(1);
  });
});

