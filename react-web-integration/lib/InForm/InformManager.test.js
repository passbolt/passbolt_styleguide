/* eslint-disable no-unsanitized/property */
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
  domElementLoginWithAutocompleteAttributeUsername,
  domElementLoginWithClassCreateAccount,
  domElementLoginWithClassEmail,
  domElementLoginWithClassUsername,
  domElementLoginWithIdAttributeBenutzerkennung,
  domElementLoginWithIdAttributeBenutzername,
  domElementLoginWithIdAttributeEmail,
  domElementLoginWithIdAttributeLogin,
  domElementLoginWithIdAttributeLogto,
  domElementLoginWithIdAttributeUsername,
  domElementLoginWithIdAttributeUtente,
  domElementLoginWithNameAttributeBenutzerkennung,
  domElementLoginWithNameAttributeBenutzername,
  domElementLoginWithNameAttributeBenutzernameAndPasswordAttributePasswort,
  domElementLoginWithNameAttributeEmail,
  domElementLoginWithNameAttributeLogin,
  domElementLoginWithNameAttributeLogto,
  domElementLoginWithNameAttributeUsername,
  domElementLoginWithNameAttributeUtente,
  domElementLoginWithNoTypeAndAutocompleteAttributeEmail,
  domElementLoginWithNoTypeAndAutocompleteAttributeUsername,
  domElementLoginWithNoTypeAndClassCreateAccount,
  domElementLoginWithNoTypeAndClassEmail,
  domElementLoginWithNoTypeAndClassUsername,
  domElementLoginWithNoTypeAndIdAttributeBenutzerkennung,
  domElementLoginWithNoTypeAndIdAttributeBenutzername,
  domElementLoginWithNoTypeAndIdAttributeEmail,
  domElementLoginWithNoTypeAndIdAttributeLogin,
  domElementLoginWithNoTypeAndIdAttributeUsername,
  domElementLoginWithNoTypeAndIdAttributeUtente,
  domElementLoginWithNoTypeAndNameAttributeBenutzerkennung,
  domElementLoginWithNoTypeAndNameAttributeBenutzername,
  domElementLoginWithNoTypeAndNameAttributeEmail,
  domElementLoginWithNoTypeAndNameAttributeLogin,
  domElementLoginWithNoTypeAndNameAttributeUsername,
  domElementLoginWithNoTypeAndNameAttributeUtente,
  domElementLoginWithNoTypeAndPlaceHolderAttributeE_mail,
  domElementLoginWithNoTypeAndPlaceHolderAttributeEmail,
  domElementLoginWithNoTypeAndPlaceHolderAttributeUsername,
  domElementLoginWithPlaceHolderAttributeE_mail,
  domElementLoginWithPlaceHolderAttributeEmail,
  domElementLoginWithPlaceHolderAttributeUsername,
  domElementLoginWithSubmitButton,
  domElementOnlyPassword,
  domElementOnlyUsername,
  domElementWithMultipleLogin,
  domElementWithNoUsernamePassword,
  domGenericTextAndPassword,
  domMultipleUsernameCandidates,
  domNestedUsernamePassword,
  domOTPMultiFieldNumberLookalike,
  domOTPMultiFieldTextLookalike,
  domOTPSingleFieldCustomPatternLookalike,
  domOTPSingleFieldPatternLookalike,
  domSingleOTPField,
  domSingleOTPFieldWithUsernameAndPassword,
  domSingleOTPMultiField,
  domSingleOTPMultiFieldAriaLabel,
  domTwoEmailInputsAndPassword,
  domUsernameByClass,
  domUsernameById,
  domWithMultiplePasswords,
  initializeWindow,
} from "./InformManager.test.data";
import InformManagerPage from "./InformManager.test.page";
import InFormManager from "./InFormManager";
import DomUtils from "../Dom/DomUtils";
import { act } from "react";

beforeEach(() => {
  jest.resetModules();
});

describe("InformManager", () => {
  // mock port in window
  initializeWindow();

  beforeEach(() => {
    jest.clearAllMocks();
    // Force to true as Jest do not provide opacity value
    jest.spyOn(InFormManager, "isPageNotVisible").mockImplementation(() => false);
    Element.prototype.getAnimations = () => [];
    /** Mock create element to add a content window property in the iframe due to jest issue with iframe in shadow dom **/
    const div = document.createElement("div");
    const iframe = document.createElement("iframe");
    jest.spyOn(document, "createElement").mockImplementation((elementName) => {
      if (elementName === "div") {
        return div.cloneNode();
      } else if (elementName === "iframe") {
        const iframeMock = iframe.cloneNode();
        Object.defineProperty(iframeMock, "contentWindow", {
          value: {},
        });
        return iframeMock;
      }
    });
  });

  afterEach(() => {
    InFormManager.destroy();
  });

  describe("Username fields", () => {
    it("As LU I should see the inform call to action on form with name attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));
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

    it("As LU I should see the inform call to action on form with name attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));
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

    it("As LU I should see the inform call to action on form with name attribute login", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeLogin; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));
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

    it("As LU I should see the inform call to action on form with name attribute logto", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeLogto; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));
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

    it("As LU I should see the inform call to action on form with name attribute benutzerkennung", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeBenutzerkennung; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with name attribute benutzername", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeBenutzername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with name attribute utente (Italian)", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUtente; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with name attribute benutzername and password attribute passwort", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeBenutzernameAndPasswordAttributePasswort; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and name attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type name attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type name attribute login", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeLogin; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type name attribute benutzerkennung", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeBenutzerkennung; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type name attribute benutzername", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeBenutzername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type name attribute utente (Italian)", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndNameAttributeUtente; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute login", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeLogin; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute logto", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeLogto; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute benutzerkennung", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeBenutzerkennung; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute benutzername", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeBenutzername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with id attribute utente (Italian)", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithIdAttributeUtente; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute login", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeLogin; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute benutzerkennung", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeBenutzerkennung; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute benutzername", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeBenutzername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and id attribute utente (Italian)", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndIdAttributeUtente; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with autocomplete attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithAutocompleteAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with autocomplete attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithAutocompleteAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and autocomplete attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndAutocompleteAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and autocomplete attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndAutocompleteAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with placeholder attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithPlaceHolderAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with placeholder attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithPlaceHolderAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with placeholder attribute e-mail", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithPlaceHolderAttributeE_mail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and placeholder attribute username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and placeholder attribute email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and placeholder attribute e-mail", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndPlaceHolderAttributeE_mail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with class username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithClassUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with class email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithClassEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with class create-account-input", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithClassCreateAccount; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type and class username", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndClassUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type class email", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndClassEmail; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with no type class create-account-input", async () => {
      expect.assertions(7);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNoTypeAndClassCreateAccount; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should autofill a form with only username", async () => {
      expect.assertions(3);
      // Set up document body
      document.body.innerHTML = domElementOnlyUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      await informManager.clickOnInformCallToAction();
      await informManager.autofillCredentials("test", "password");
      expect(informManager.username.value).toBe("test");
    });
  });

  describe("Password fields", () => {
    it("As LU I should autofill a form with only password", async () => {
      expect.assertions(3);
      // Set up document body
      document.body.innerHTML = domElementOnlyPassword; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnPassword();
      expect(informManager.iframesLength).toBe(1);
      await informManager.clickOnInformCallToAction();
      await informManager.autofillCredentials("test", "password");
      expect(informManager.password.value).toBe("password");
    });
  });

  describe("Multiple fields", () => {
    it("As LU I should see the inform call to action on form with nested username and password fields", async () => {
      expect.assertions(7);
      document.body.innerHTML = domNestedUsernamePassword;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with multiple username candidates", async () => {
      expect.assertions(7);
      document.body.innerHTML = domMultipleUsernameCandidates;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with username identified by id", async () => {
      expect.assertions(7);
      document.body.innerHTML = domUsernameById;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with username identified by class", async () => {
      expect.assertions(7);
      document.body.innerHTML = domUsernameByClass;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with multiple password fields", async () => {
      expect.assertions(7);
      document.body.innerHTML = domWithMultiplePasswords;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action on form with generic text and password", async () => {
      expect.assertions(4);
      document.body.innerHTML = domGenericTextAndPassword;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      await informManager.focusOnPassword();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnPassword();
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should see the inform call to action on form with two email inputs and password", async () => {
      expect.assertions(8);
      document.body.innerHTML = domTwoEmailInputsAndPassword;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(2);
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
  });

  describe("TOTP fields", () => {
    it("As LU I should see the inform call to action on form with a single OTP field", async () => {
      expect.assertions(5);
      document.body.innerHTML = domSingleOTPField;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      await informManager.focusOnOtp();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnOtp();
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should see the inform call to action on form with OTP, username and password fields", async () => {
      expect.assertions(9);
      document.body.innerHTML = domSingleOTPFieldWithUsernameAndPassword;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      await informManager.mouseOverOnPassword();
      expect(informManager.iframesLength).toBe(2);
      await informManager.mouseOverOnOtp();
      expect(informManager.iframesLength).toBe(3);
      await informManager.blurOnUsername();
      expect(informManager.iframesLength).toBe(2);
      await informManager.blurOnPassword();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnOtp();
      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnOtp();
      expect(informManager.iframesLength).toBe(1);
      await informManager.mouseOverOnUsername();
      expect(informManager.iframesLength).toBe(2);
    });

    it("As LU I should see the inform call to action on form with OTP multi-field input", async () => {
      expect.assertions(5);
      document.body.innerHTML = domSingleOTPMultiField;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      await informManager.focusOnOtp();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnOtp();
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should see the inform call to action on form with OTP multi-field with aria-label", async () => {
      expect.assertions(5);
      document.body.innerHTML = domSingleOTPMultiFieldAriaLabel;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      await informManager.focusOnOtp();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnOtp();
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I shouldn't see the inform call on a form with 6 generic number inputs", async () => {
      expect.assertions(4);
      document.body.innerHTML = domOTPMultiFieldNumberLookalike;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      expect(informManager.otps.length).toBe(0);
    });

    it("As LU I shouldn't see the inform call on a form with 6 generic text inputs", async () => {
      expect.assertions(4);
      document.body.innerHTML = domOTPMultiFieldTextLookalike;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      expect(informManager.otps.length).toBe(0);
    });

    it("As LU I shouldn't see the inform call on a form with a single input using a generic numeric pattern", async () => {
      expect.assertions(4);
      document.body.innerHTML = domOTPSingleFieldPatternLookalike;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      expect(informManager.otps.length).toBe(0);
    });

    it("As LU I shouldn't see the inform call on a form with a single input using a custom pattern", async () => {
      expect.assertions(4);
      document.body.innerHTML = domOTPSingleFieldCustomPatternLookalike;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      expect(informManager.otps.length).toBe(0);
    });
  });

  describe("User actions", () => {
    it("As LU I should see the inform call to action when I clicked on it and autofill fields", async () => {
      expect.assertions(9);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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
      await informManager.autofillCredentials("test", "password");
      expect(informManager.username.value).toBe("test");
      expect(informManager.password.value).toBe("password");
    });

    it("As LU I should see the inform call to action when I clicked on it and autofill fields should trigger input and change events", async () => {
      expect.assertions(11);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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
      informManager.username.addEventListener("input", (event) => {
        expect(event.target.value).toBe("test");
      });
      informManager.username.addEventListener("change", (event) => {
        expect(event.target.value).toBe("test");
      });
      informManager.password.addEventListener("input", (event) => {
        expect(event.target.value).toBe("password");
      });
      informManager.password.addEventListener("change", (event) => {
        expect(event.target.value).toBe("password");
      });
      await informManager.autofillCredentials("test", "password");
    });

    it("As LU I should see the inform call to action when I clicked on it and autofill only fields in the same parent container", async () => {
      expect.assertions(13);
      // Set up document body
      document.body.innerHTML = domElementWithMultipleLogin; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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
      await informManager.autofillCredentials("test", "password");
      expect(informManager.usernames[0].value).toBe("");
      expect(informManager.passwords[0].value).toBe("");
      expect(informManager.usernames[1].value).toBe("test");
      expect(informManager.passwords[1].value).toBe("password");
      expect(informManager.usernames[2].value).toBe("");
      expect(informManager.passwords[2].value).toBe("");
    });

    it("As LU I should auto save a form", async () => {
      expect.assertions(2);
      // Set up document body
      document.body.innerHTML = domElementLoginWithSubmitButton; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      await informManager.clickOnInformCallToAction();
      await informManager.autofillPassword("password");
      expect(informManager.password.value).toBe("password");
      jest.spyOn(window.port, "emit").mockImplementationOnce(() => {});
      await informManager.save();
      const save = {
        name: "",
        password: "password",
        url: "http://localhost/",
        username: "",
      };
      expect(window.port.emit).toHaveBeenCalledWith("passbolt.web-integration.autosave", save);
    });

    it("As LU I should auto save a form with only password field", async () => {
      expect.assertions(2);
      // Set up document body
      document.body.innerHTML = domElementLoginOnlyPasswordWithSubmitButton; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      await informManager.clickOnInformCallToAction();
      await informManager.autofillPassword("password");
      expect(informManager.password.value).toBe("password");
      jest.spyOn(window.port, "emit").mockImplementationOnce(() => {});
      await informManager.save();
      const save = {
        name: "",
        password: "password",
        url: "http://localhost/",
        username: "",
      };
      expect(window.port.emit).toHaveBeenCalledWith("passbolt.web-integration.autosave", save);
    });
  });

  describe("CTA visibility", () => {
    it("As LU I shouldn't see the inform call to action on a page with no login form", async () => {
      expect.assertions(2);
      // Set up document body
      document.body.innerHTML = domElementWithNoUsernamePassword; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnSearch();
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should see the inform call to action on form with name attribute username in shadow dom", async () => {
      expect.assertions(7);
      const div = document.createElement("div");
      div.id = "shadow-root";
      document.body.appendChild(div);
      const shadowRoot = div.attachShadow({ mode: "open" });
      // Set up document shadowRoot
      shadowRoot.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

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

    it("As LU I should see the inform call to action in iframe", async () => {
      expect.assertions(7);
      jest.spyOn(DomUtils, "isRequestInitiatedFromSameOrigin").mockImplementation(() => true);
      // Set up document body
      const iframe = document.createElement("iframe");
      iframe.srcdoc = domElementLoginWithIdAttributeLogin;
      document.body.appendChild(iframe);
      iframe.contentDocument.body.innerHTML = domElementLoginWithIdAttributeLogin;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsernameIframe();
      expect(informManager.iframesLength).toBe(1);
      await informManager.clickOnInformCallToAction();
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnUsernameIframe();
      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnPasswordIframe();
      expect(informManager.iframesLength).toBe(1);
      await informManager.clickOnInformCallToAction(1);
      expect(informManager.iframesLength).toBe(1);
      await informManager.blurOnPasswordIframe();
      expect(informManager.iframesLength).toBe(0);
    });
  });

  describe("Destroy", () => {
    it("As LU I should destroy inform on port specific message", async () => {
      expect.assertions(4);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      jest.spyOn(InFormManager, "destroy");
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      await informManager.destroy();
      expect(InFormManager.destroy).toHaveBeenCalledTimes(1);
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should destroy inform if opacity of the body change", async () => {
      expect.assertions(4);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      jest.spyOn(InFormManager, "destroy");
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      document.body.style.opacity = "0.3";
      await informManager.focusOnUsername();

      expect(InFormManager.destroy).toHaveBeenCalledTimes(1);
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should destroy inform if opacity of the html change", async () => {
      expect.assertions(4);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      jest.spyOn(InFormManager, "destroy");
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      document.documentElement.style.opacity = "0.3";
      await informManager.focusOnUsername();

      expect(InFormManager.destroy).toHaveBeenCalledTimes(1);
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should destroy inform if opacity of the host change", async () => {
      expect.assertions(4);
      // Set up document body
      document.body.innerHTML = domElementLoginWithNameAttributeUsername; // The Dom
      jest.spyOn(InFormManager, "destroy");
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
      InFormManager.host.setAttribute("style", "opacity: 0.3 !important");
      await informManager.focusOnUsername();

      expect(InFormManager.destroy).toHaveBeenCalledTimes(1);
      expect(informManager.iframesLength).toBe(0);
    });
  });
});
