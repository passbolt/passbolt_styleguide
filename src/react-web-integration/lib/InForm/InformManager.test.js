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
  domDialogLoginWithUsernamePassword,
  domDialogWithoutInputAndLoginInBody,
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
import ShadowRootCacheService from "../../services/ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../../services/ShadowDom/ShadowMutationObserverService";
import ShadowDomFocusHealerService from "../../services/ShadowDom/ShadowDomFocusHealerService";
import ElementVisibilityService from "../../services/DomExtraction/ElementVisibilityService";
import ScrapingIdentityService from "../../services/Scraping/ScrapingIdentityService";
import ScrapingCacheService from "../../services/Scraping/ScrapingCacheService";
import { act } from "react";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();

  // Reset the shadow services' module-private state so the per-document observer/cache installed
  // by the manager does not leak between tests (document is the same object across the file).
  ShadowRootCacheService._shadowRootsCache = new WeakMap();
  ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
  ShadowMutationObserverService._shadowMutationSubscribers = new Set();

  // The classification pipeline registers fields by identity; reset the shared registries per test.
  ScrapingIdentityService._idByElement = new WeakMap();
  ScrapingIdentityService._elementById = new Map();
  ScrapingIdentityService._seq = 0;
  ScrapingCacheService._payloadByElement = new WeakMap();
  ScrapingCacheService._keywordsByElement = new WeakMap();

  // jsdom has no layout: drive viewability explicitly and give fields a usable rect so the pipeline
  // (and its pseudo-form/no-<form> path) can extract and cluster fields. Defined as a plain prototype
  // function (not a jest spy) so per-test `jest.spyOn(element, "getBoundingClientRect")` overrides in
  // the positioning tests create their own element-level property instead of colliding on a shared mock.
  jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
  Object.defineProperty(Element.prototype, "getBoundingClientRect", {
    configurable: true,
    writable: true,
    value: () => ({ x: 0, y: 0, left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20 }),
  });
});

describe("InformManager", () => {
  // mock port in window
  initializeWindow();

  beforeEach(() => {
    jest.clearAllMocks();
    // Force to true as Jest do not provide opacity value
    jest.spyOn(InFormManager, "isPageNotVisible").mockImplementation(() => false);
    jest
      .spyOn(ElementVisibilityService, "isElementViewable")
      .mockImplementation((element) => !(parseFloat(getComputedStyle(element).opacity) < 0.4));
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

      return Document.prototype.createElement.call(document, elementName);
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

    // The classifier intentionally ignores the `class` attribute (noise-prone: utility/framework class
    // names). When both fields are type=text and rely solely on their class (no real type=password to
    // anchor structural inference), nothing is detected. Real login forms expose type=password plus
    // name/id/autocomplete, which the "no type and class ..." fixtures below still cover.
    it("As LU I shouldn't detect fields that rely solely on their class attribute (class email)", async () => {
      expect.assertions(3);
      document.body.innerHTML = domElementLoginWithClassEmail;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
    });

    it("As LU I shouldn't detect fields that rely solely on their class attribute (class create-account-input)", async () => {
      expect.assertions(3);
      document.body.innerHTML = domElementLoginWithClassCreateAccount;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
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
      // A keyword-less text field preceding a password is inferred as the username by structural
      // analysis, so a call-to-action is attached to it as well.
      expect.assertions(7);
      document.body.innerHTML = domGenericTextAndPassword;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(1);
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

    it("As LU I shouldn't detect an OTP multi-field that relies solely on its class attribute", async () => {
      // The classifier intentionally ignores the `class` attribute, so OTP inputs identified only by a
      // class (here `time-otp`) are not detected. The aria-label variant below is the covered case.
      expect.assertions(4);
      document.body.innerHTML = domSingleOTPMultiField;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);
      expect(informManager.usernames.length).toBe(0);
      expect(informManager.passwords.length).toBe(0);
      expect(informManager.otps.length).toBe(0);
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
      // Three stacked login blocks with no <form>: give each block a distinct, separated rect so the
      // pseudo-form extraction clusters them into three separate scopes (one username + password each)
      // rather than merging into a single scope where the extra usernames would be rationalized away.
      [...document.querySelectorAll("input")].forEach((input, index) => {
        const top = Math.floor(index / 2) * 300;
        jest
          .spyOn(input, "getBoundingClientRect")
          .mockReturnValue({ x: 0, y: top, top, left: 0, right: 100, bottom: top + 20, width: 100, height: 20 });
      });
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
      // The iframe document is a separate realm, so the prototype rect stub set in beforeEach does not
      // reach its inputs; give them a usable rect so the pseudo-form path discovers them (jsdom has no
      // layout inside the iframe either).
      [...iframe.contentDocument.querySelectorAll("input")].forEach((input) => {
        jest
          .spyOn(input, "getBoundingClientRect")
          .mockReturnValue({ x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 20, width: 100, height: 20 });
      });
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

  describe("Dialog parent element", () => {
    describe("InFormManager::getContainerElement", () => {
      it("As LU the container is the dialog when one of the given fields is contained in a dialog", async () => {
        expect.assertions(2);

        document.body.innerHTML = domDialogLoginWithUsernamePassword;

        let informManager;
        await act(async () => (informManager = new InformManagerPage()));

        const dialog = document.querySelector("dialog");
        expect(informManager.iframesLength).toBe(0);
        expect(InFormManager.getContainerElement(informManager.usernames, informManager.passwords)).toBe(dialog);
      });

      it("As LU the container is the body when none of the given fields is contained in a dialog", async () => {
        expect.assertions(1);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;

        let informManager;
        await act(async () => (informManager = new InformManagerPage()));
        expect(InFormManager.getContainerElement(informManager.usernames, informManager.passwords)).toBe(document.body);
      });
    });

    it("As LU I should mount the host inside the dialog when an input is contained in a dialog", async () => {
      expect.assertions(3);

      document.body.innerHTML = domDialogLoginWithUsernamePassword;

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      const dialog = document.querySelector("dialog");
      expect(InFormManager.host.parentNode).toBe(dialog);
      expect(informManager.iframesLength).toBe(0);

      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
    });

    it("As LU I should mount the host in the body when no input is contained in a dialog", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(InFormManager.host.parentNode).toBe(document.body);

      await informManager.focusOnUsername();
      expect(informManager.iframesLength).toBe(1);
    });

    it("As LU I should mount the host in the body when a dialog has no input and the form is in the body", async () => {
      expect.assertions(3);

      document.body.innerHTML = domDialogWithoutInputAndLoginInBody;

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      const dialog = document.querySelector("dialog");
      expect(InFormManager.host.parentNode).toBe(document.body);
      expect(dialog.contains(InFormManager.host)).toBe(false);
      expect(informManager.iframesLength).toBe(0);
    });

    it("As LU I should not destroy inform when the host is legitimately inside a dialog and the DOM changes", async () => {
      expect.assertions(3);

      document.body.innerHTML = domDialogLoginWithUsernamePassword;

      jest.spyOn(InFormManager, "destroy");
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      const dialog = document.querySelector("dialog");
      expect(InFormManager.host.parentNode).toBe(dialog);

      // A DOM change elsewhere triggers the mutation observer
      document.body.append(document.createElement("div"));
      await informManager.focusOnUsername();

      expect(InFormManager.destroy).not.toHaveBeenCalled();
      expect(InFormManager.host.parentNode).toBe(dialog);
    });

    it("As LU it tries to remount the host when it is moved outside the body or a dialog", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      const retryMountHostSpy = jest.spyOn(InFormManager, "retryMountHost").mockImplementation(() => {});

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));
      expect(InFormManager.host.parentNode).toBe(document.body);

      // Move the host into another element
      const otherElement = document.createElement("div");
      document.body.append(otherElement);
      otherElement.appendChild(informManager.host);

      // The document observer catches the moved host; the re-scan is debounced, so wait for it.
      await waitFor(
        () => {
          if (!retryMountHostSpy.mock.calls.length) {
            throw new Error("retryMountHost has not been called yet");
          }
        },
        { timeout: 2000 },
      );

      expect(retryMountHostSpy).toHaveBeenCalled();

      // Restore now: the suite clears (not restores) mocks between tests, so the persistent
      // implementation would otherwise leak into the retryMountHost tests below.
      retryMountHostSpy.mockRestore();
    });

    describe("InFormManager::retryMountHost", () => {
      let destroySpy;
      let ensureHostMountedSpy;

      beforeEach(() => {
        jest.useFakeTimers();
        destroySpy = jest.spyOn(InFormManager, "destroy");
        // Spy only (real impl by default). The remount is now driven by ensureHostMounted, not by the
        // classification (findAndSetAuthenticationFields) — that is the security/extraction decoupling.
        ensureHostMountedSpy = jest.spyOn(InFormManager, "ensureHostMounted");
      });

      afterEach(() => {
        ensureHostMountedSpy.mockRestore();
        destroySpy.mockRestore();
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it("As LU it retries to remount the host with an increasing delay then destroys if it keeps being moved", async () => {
        expect.assertions(1);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        let informManager;
        await act(async () => (informManager = new InformManagerPage()));

        // Move the host into another element; the re-mount never sticks.
        const otherElement = document.createElement("div");
        document.body.append(otherElement);
        otherElement.appendChild(informManager.host);
        ensureHostMountedSpy.mockImplementation(() => {});

        InFormManager.retryMountHost();

        jest.advanceTimersByTime(600); // 100 + 200 + 300 = 600 ms, 3 attemps to remount with increasing delay
        expect(destroySpy).toHaveBeenCalledTimes(1);
      });

      it("As LU it does not destroy inform when the host is successfully remounted", async () => {
        expect.assertions(2);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        let informManager;
        await act(async () => (informManager = new InformManagerPage()));

        // Move the host into another element; the real ensureHostMounted moves it back.
        const otherElement = document.createElement("div");
        document.body.append(otherElement);
        otherElement.appendChild(informManager.host);

        InFormManager.retryMountHost();
        jest.advanceTimersByTime(100);

        expect(destroySpy).not.toHaveBeenCalled();
        expect(informManager.host.parentNode).toBe(document.body);
      });

      it("As LU it remounts the host WITHOUT triggering the classification/extraction (security ≠ extraction)", async () => {
        expect.assertions(2);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        await act(async () => new InformManagerPage());

        // Neutralize the actual remount so the retry setTimeout stays inert; we only assert what is called.
        ensureHostMountedSpy.mockImplementation(() => {});
        const scanSpy = jest.spyOn(InFormManager, "findAndSetAuthenticationFields");
        const credentialsSpy = jest.spyOn(InFormManager, "findAndSetCredentialsFormFields");

        InFormManager.retryMountHost();

        expect(scanSpy).not.toHaveBeenCalled();
        expect(credentialsSpy).not.toHaveBeenCalled();

        scanSpy.mockRestore();
        credentialsSpy.mockRestore();
      });
    });

    describe("InFormManager::_ensureHostIntegrity", () => {
      it("should return true and NOT remount when the host is at a valid location", async () => {
        expect.assertions(2);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        await act(async () => new InformManagerPage());
        jest.spyOn(InFormManager, "isHostInValidLocation").mockReturnValue(true);
        const retrySpy = jest.spyOn(InFormManager, "retryMountHost").mockImplementation(() => {});

        const result = InFormManager._ensureHostIntegrity();

        expect(result).toBe(true);
        expect(retrySpy).not.toHaveBeenCalled();

        InFormManager.isHostInValidLocation.mockRestore();
        retrySpy.mockRestore();
      });

      it("should return false and remount when the host has been moved (anti-tampering)", async () => {
        expect.assertions(2);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        await act(async () => new InformManagerPage());
        jest.spyOn(InFormManager, "isHostInValidLocation").mockReturnValue(false);
        const retrySpy = jest.spyOn(InFormManager, "retryMountHost").mockImplementation(() => {});

        const result = InFormManager._ensureHostIntegrity();

        expect(result).toBe(false);
        expect(retrySpy).toHaveBeenCalledTimes(1);

        InFormManager.isHostInValidLocation.mockRestore();
        retrySpy.mockRestore();
      });
    });

    describe("InFormManager::ensureHostMounted", () => {
      it("should move the host back to the given container when it has drifted", async () => {
        expect.assertions(2);

        document.body.innerHTML = domElementLoginWithNameAttributeUsername;
        let informManager;
        await act(async () => (informManager = new InformManagerPage()));

        // Move the host out; ensureHostMounted with the default container (body) puts it back.
        const otherElement = document.createElement("div");
        document.body.append(otherElement);
        otherElement.appendChild(informManager.host);
        expect(informManager.host.parentNode).toBe(otherElement);

        InFormManager.ensureHostMounted(document.body);

        expect(informManager.host.parentNode).toBe(document.body);
      });
    });

    it("As LU I should move the host into a dialog that opens after initialization", async () => {
      expect.assertions(3);

      document.body.innerHTML = `<div>No login fields here</div>`;

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(InFormManager.host.parentNode).toBe(document.body);
      expect(informManager.iframesLength).toBe(0);

      // A modal dialog containing a login form opens afterwards
      const dialog = document.createElement("dialog");
      dialog.open = true;
      const username = document.createElement("input");
      username.type = "text";
      username.name = "username";
      const password = document.createElement("input");
      password.type = "password";
      dialog.append(username, password);

      document.body.append(dialog);

      await act(async () => {
        InFormManager.findAndSetInputFields();
        await waitFor(() => {});
      });

      expect(InFormManager.host.parentNode).toBe(dialog);
    });

    it("As LU it re-appends the host as the last child of its container so it wins at equal z-index", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      // The host mounts in the body; simulate a later-inserted overlay (e.g. a modal) becoming the last child.
      const overlay = document.createElement("div");
      document.body.append(overlay);
      expect(document.body.lastChild).not.toBe(informManager.host);

      // A re-scan must move the host back to the end so that, at equal z-index, it stays painted on top
      // (repairing both the hidden call-to-action and elementFromPoint hit-testing on the modal).
      await act(async () => {
        InFormManager.findAndSetInputFields();
        await waitFor(() => {});
      });

      expect(document.body.lastChild).toBe(informManager.host);
    });
  });

  describe("InFormManager::onShadowMutation", () => {
    it("should ignore the mutations of its own call-to-action shadow root", async () => {
      expect.assertions(1);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();

      InFormManager.onShadowMutation(InFormManager.shadowRoot, [], true);

      expect(InFormManager.updateAuthenticationFieldsDebounce).not.toHaveBeenCalled();
    });

    it("should trigger the re-scan for a document-scope mutation only when it is relevant", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();

      // An irrelevant document mutation (no field added/removed, no watched attribute) must not re-scan.
      const irrelevantNode = document.createElement("span");
      InFormManager.onShadowMutation(
        document,
        [{ type: "childList", addedNodes: [irrelevantNode], removedNodes: [] }],
        false,
      );
      expect(InFormManager.updateAuthenticationFieldsDebounce).not.toHaveBeenCalled();

      // A relevant document mutation (a field added) re-scans.
      const fieldNode = document.createElement("input");
      InFormManager.onShadowMutation(
        document,
        [{ type: "childList", addedNodes: [fieldNode], removedNodes: [] }],
        false,
      );
      expect(InFormManager.updateAuthenticationFieldsDebounce).toHaveBeenCalledTimes(1);
    });

    it("should not re-scan for an irrelevant shadow-scope mutation", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();
      const findSpy = jest.spyOn(InFormManager, "findAndSetAuthenticationFields");
      const otherShadowRoot = document.createElement("div").attachShadow({ mode: "open" });

      InFormManager.onShadowMutation(otherShadowRoot, [], false);

      expect(InFormManager.updateAuthenticationFieldsDebounce).not.toHaveBeenCalled();
      expect(InFormManager.findAndSetAuthenticationFields).not.toHaveBeenCalled();

      // The suite clears (not restores) mocks between tests; restore so the spy does not leak below.
      findSpy.mockRestore();
    });

    it("should re-scan synchronously and schedule a debounced follow-up when a shadow root becomes known", async () => {
      // The focus healer signals shadowRootsChanged=true when a field is focused. The re-scan must be
      // synchronous (so the call-to-action is attached within the same focus turn) AND also scheduled once
      // more (debounced) to catch a web component that hydrates just after an autofocus.
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();
      const findSpy = jest.spyOn(InFormManager, "findAndSetAuthenticationFields").mockImplementation();

      InFormManager.onShadowMutation(document, [], true);

      expect(InFormManager.findAndSetAuthenticationFields).toHaveBeenCalledTimes(1);
      expect(InFormManager.updateAuthenticationFieldsDebounce).toHaveBeenCalledTimes(1);

      // The suite clears (not restores) mocks between tests, so restore the persistent no-op now to avoid
      // leaking it into the tests below.
      findSpy.mockRestore();
    });

    it("should NOT queue an expensive field scan for a non-relevant document mutation (only the host check)", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();
      InFormManager._pendingFieldScan = false;

      // A childList mutation adding a plain <div> (no field) — irrelevant.
      const div = document.createElement("div");
      InFormManager.onShadowMutation(document, [{ type: "childList", addedNodes: [div], removedNodes: [] }], false);

      // The debounce is still scheduled (host-tampering check must run on every document batch)...
      expect(InFormManager.updateAuthenticationFieldsDebounce).toHaveBeenCalledTimes(1);
      // ...but no expensive extraction is queued for an unrelated mutation.
      expect(InFormManager._pendingFieldScan).toBe(false);
    });

    it("should queue an expensive field scan for a relevant document mutation", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();
      InFormManager._pendingFieldScan = false;

      // A childList mutation adding an <input> (matches the field selector) — relevant.
      const input = document.createElement("input");
      InFormManager.onShadowMutation(document, [{ type: "childList", addedNodes: [input], removedNodes: [] }], false);

      expect(InFormManager.updateAuthenticationFieldsDebounce).toHaveBeenCalledTimes(1);
      expect(InFormManager._pendingFieldScan).toBe(true);
    });

    it("should queue a field scan when a pre-rendered login modal is revealed via its wrapper (visibility attribute)", async () => {
      expect.assertions(1);

      document.body.innerHTML = domElementLoginWithNameAttributeUsername;
      await act(async () => new InformManagerPage());
      InFormManager.updateAuthenticationFieldsDebounce = jest.fn();
      InFormManager._pendingFieldScan = false;

      // mydealz-style reveal: the login form pre-exists in the DOM, hidden; opening the modal only
      // toggles `style` on its wrapper — no childList mutation, no mutation on the fields themselves.
      const modalWrapper = document.createElement("div");
      modalWrapper.appendChild(document.createElement("input"));
      InFormManager.onShadowMutation(
        document,
        [{ type: "attributes", attributeName: "style", target: modalWrapper }],
        false,
      );

      expect(InFormManager._pendingFieldScan).toBe(true);
    });
  });

  describe("Focus healer integration", () => {
    it("should install the focusin healer on initialization", async () => {
      expect.assertions(1);

      document.body.innerHTML = "";
      jest.spyOn(ShadowDomFocusHealerService, "installFocusinHealer");

      await act(async () => new InformManagerPage());

      expect(ShadowDomFocusHealerService.installFocusinHealer).toHaveBeenCalledTimes(1);
    });

    it("should discover a field within a shadow dom attached after the initial scan", async () => {
      expect.hasAssertions();

      document.body.innerHTML = "";
      const host = document.createElement("div");
      document.body.appendChild(host);

      let page;
      await act(async () => (page = new InformManagerPage()));

      // Later, a shadow root is attached
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      input.type = "text";
      input.name = "username";
      shadowRoot.appendChild(input);

      expect(page.username).toBeUndefined();

      // Simulate a focus on the field
      ShadowDomFocusHealerService._focusinHandler({
        composedPath: () => [input, shadowRoot, host, document.body, document],
      });

      await waitFor(() => expect(InFormManager.callToActionFields.length).toBeGreaterThan(0), { timeout: 3000 });

      expect(page.username).toBe(input);

      await page.focusOnUsername();
      expect(page.iframesLength).toBe(1);
    });
  });

  describe("InFormManager::_mutationsAffectAuthenticationFields", () => {
    it("should return true when a relevant field is added or removed", async () => {
      expect.assertions(2);

      await act(async () => new InformManagerPage());
      const input = document.createElement("input");
      const wrapper = document.createElement("div");
      wrapper.appendChild(document.createElement("input"));

      expect(
        InFormManager._mutationsAffectAuthenticationFields([
          { type: "childList", addedNodes: [input], removedNodes: [] },
        ]),
      ).toBe(true);
      expect(
        InFormManager._mutationsAffectAuthenticationFields([
          { type: "childList", addedNodes: [wrapper], removedNodes: [] },
        ]),
      ).toBe(true);
    });

    it("should return false for irrelevant childList mutations and non-childList records", async () => {
      expect.assertions(2);

      await act(async () => new InformManagerPage());
      const div = document.createElement("div");

      expect(
        InFormManager._mutationsAffectAuthenticationFields([
          { type: "childList", addedNodes: [div], removedNodes: [] },
        ]),
      ).toBe(false);
      expect(
        InFormManager._mutationsAffectAuthenticationFields([
          { type: "attributes", target: document.createElement("input") },
        ]),
      ).toBe(false);
    });
  });

  describe("InFormManager::_attributeMutationAffectsField", () => {
    it("should return true when a watched attribute changes on a field element", async () => {
      expect.assertions(1);

      await act(async () => new InformManagerPage());
      const input = document.createElement("input");

      expect(InFormManager._attributeMutationAffectsField([{ type: "attributes", target: input }])).toBe(true);
    });

    it("should return false for an attribute mutation on a non-field element", async () => {
      expect.assertions(1);

      await act(async () => new InformManagerPage());
      const div = document.createElement("div");

      expect(InFormManager._attributeMutationAffectsField([{ type: "attributes", target: div }])).toBe(false);
    });

    it("should return true when a visibility attribute changes on a container holding a field (pre-rendered modal reveal)", async () => {
      expect.assertions(2);

      await act(async () => new InformManagerPage());
      const wrapper = document.createElement("div");
      wrapper.appendChild(document.createElement("input"));

      // v-show style reveal: display toggled via `style` on the wrapper, the input itself gets no mutation.
      expect(
        InFormManager._attributeMutationAffectsField([{ type: "attributes", attributeName: "style", target: wrapper }]),
      ).toBe(true);
      expect(
        InFormManager._attributeMutationAffectsField([{ type: "attributes", attributeName: "class", target: wrapper }]),
      ).toBe(true);
    });

    it("should return false when a non-visibility attribute changes on a container holding a field", async () => {
      expect.assertions(1);

      await act(async () => new InformManagerPage());
      const wrapper = document.createElement("div");
      wrapper.appendChild(document.createElement("input"));

      // Identity attributes only matter ON the field itself, not on a container — no needless re-scan.
      expect(
        InFormManager._attributeMutationAffectsField([{ type: "attributes", attributeName: "name", target: wrapper }]),
      ).toBe(false);
    });
  });

  describe("IFrame positioning", () => {
    it("should be positionned at the top-left of the containing block", async () => {
      expect.assertions(3);

      document.body.innerHTML = domElementOnlyUsername;
      InFormManager.host = null;

      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      expect(informManager.iframesLength).toBe(0);

      expect(informManager.host.getAttribute("style")).toContain("top: 0");
      expect(informManager.host.getAttribute("style")).toContain("left: 0");
    });

    it("As LU the call-to-action is positioned relative to the host containing block", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementOnlyUsername;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      jest
        .spyOn(informManager.username, "getBoundingClientRect")
        .mockReturnValue({ x: 200, y: 100, top: 100, left: 200, right: 500, bottom: 140, width: 300, height: 40 });
      jest.spyOn(informManager.host, "getBoundingClientRect").mockReturnValue({ top: 30, left: 40 });

      await informManager.focusOnUsername();

      expect(informManager.callToActionIframe.style.left).toBe("435px");
      expect(informManager.callToActionIframe.style.top).toBe("81px");
    });

    it("menu should be positioned relative to the containing block", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementOnlyUsername;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      jest
        .spyOn(informManager.username, "getBoundingClientRect")
        .mockReturnValue({ x: 200, y: 100, top: 100, left: 200, right: 500, bottom: 140, width: 300, height: 40 });
      jest.spyOn(informManager.host, "getBoundingClientRect").mockReturnValue({ top: 50, left: 60 });

      await informManager.focusOnUsername();
      await informManager.clickOnInformCallToAction();
      await informManager.openInFormMenu();

      expect(informManager.menuIframe.style.left).toBe("73px");
      expect(informManager.menuIframe.style.top).toBe("90px");
    });

    it("menu should be clamped to zero", async () => {
      expect.assertions(2);

      document.body.innerHTML = domElementOnlyUsername;
      let informManager;
      await act(async () => (informManager = new InformManagerPage()));

      jest
        .spyOn(informManager.username, "getBoundingClientRect")
        .mockReturnValue({ x: 50, y: 10, top: 10, left: 50, right: 150, bottom: 30, width: 100, height: 20 });
      jest.spyOn(informManager.host, "getBoundingClientRect").mockReturnValue({ top: 100, left: 0 });

      await informManager.focusOnUsername();
      await informManager.clickOnInformCallToAction();
      await informManager.openInFormMenu();

      expect(informManager.menuIframe.style.left).toBe("0px");
      expect(informManager.menuIframe.style.top).toBe("0px");
    });
  });
});
