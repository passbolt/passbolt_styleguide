/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.11.0
 */

import UserEventsService from "../lib/User/UserEventsService";
import { defaultFormData } from "./Autofill.test.data";
import MockPort from "../../react-extension/test/mock/MockPort";
import AutofillPage from "./Autofill.test.page";
import { FAIL_STRING_SCENARIOS } from "../../../test/assert/assertEntityProperty";
import { TotpCodeGeneratorService } from "../../shared/services/otp/TotpCodeGeneratorService";
import ElementVisibilityService from "../services/DomExtraction/ElementVisibilityService";
import ScrapingIdentityService from "../services/Scraping/ScrapingIdentityService";
import ScrapingCacheService from "../services/Scraping/ScrapingCacheService";
import ShadowRootCacheService from "../services/ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../services/ShadowDom/ShadowMutationObserverService";

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

  ShadowRootCacheService._shadowRootsCache = new WeakMap();
  ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
  ShadowMutationObserverService._shadowMutationSubscribers = new Set();

  // The classification pipeline registers fields by identity; reset the shared registries per test.
  ScrapingIdentityService._idByElement = new WeakMap();
  ScrapingIdentityService._elementById = new Map();
  ScrapingIdentityService._seq = 0;
  ScrapingCacheService._payloadByElement = new WeakMap();
  ScrapingCacheService._keywordsByElement = new WeakMap();

  // jsdom has no layout: drive viewability explicitly and give fields a usable rect so the pseudo-form
  // (no-<form>) path can cluster orphan fields (mirrors the DomExtraction test setup).
  jest.spyOn(ElementVisibilityService, "isElementViewable").mockReturnValue(true);
  jest
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockReturnValue({ x: 0, y: 0, left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20 });

  Object.defineProperty(window, "port", {
    writable: true,
    value: new MockPort(),
  });

  jest.spyOn(UserEventsService, "autofill").mockReturnValue();
  jest.spyOn(window.port, "emit").mockResolvedValue();
});

describe("Autofill::fillForm", () => {
  describe("Should autofill the form", () => {
    let formData;

    beforeEach(() => {
      formData = defaultFormData();
    });

    it("Should autofill both the username and the password of a login form", () => {
      expect.assertions(4);
      document.body.innerHTML = `
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>`;
      const usernameElement = document.querySelector("input[name='username']");
      const passwordElement = document.querySelector("input[name='password']");

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should autofill the username nested inside a shadow root", () => {
      expect.assertions(4);

      document.body.innerHTML = "";
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const usernameElement = document.createElement("input");
      usernameElement.type = "text";
      usernameElement.name = "username";
      const passwordElement = document.createElement("input");
      passwordElement.type = "password";
      shadowRoot.appendChild(usernameElement);
      shadowRoot.appendChild(passwordElement);
      document.body.appendChild(host);

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should prefer the login scope password when several scopes carry a password", () => {
      expect.assertions(4);
      document.body.innerHTML = `
        <form id="signup">
          <input type="email" name="email" autocomplete="email" />
          <input type="password" name="new-password" autocomplete="new-password" />
          <input type="password" name="confirm-password" autocomplete="new-password" />
        </form>
        <form id="login">
          <input type="text" name="username" autocomplete="username" />
          <input type="password" name="password" autocomplete="current-password" />
        </form>`;
      const usernameElement = document.querySelector("#login input[name='username']");
      const passwordElement = document.querySelector("#login input[name='password']");

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(UserEventsService.autofill).not.toHaveBeenCalledWith(
        document.querySelector("#signup input[name='new-password']"),
        formData.secret,
      );
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should autofill only the password when no username field is found", () => {
      expect.assertions(3);
      document.body.innerHTML = `<form><input type="password" name="password" /></form>`;
      const passwordElement = document.querySelector("input[type='password']");

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should autofill only the username when no password field exists", () => {
      expect.assertions(3);
      document.body.innerHTML = `<input type="email" name="email" autocomplete="username" />`;
      const usernameElement = document.querySelector("input[name='email']");

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should autofill the username, the password and the TOTP", () => {
      expect.assertions(5);
      document.body.innerHTML = `
        <form>
          <input type="text" name="username" autocomplete="username" />
          <input type="password" name="password" autocomplete="current-password" />
          <input type="text" name="otp" autocomplete="one-time-code" />
        </form>`;
      const usernameElement = document.querySelector("input[name='username']");
      const passwordElement = document.querySelector("input[name='password']");
      const otpElement = document.querySelector("input[name='otp']");
      const totp = TotpCodeGeneratorService.generate(formData.otp);

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(3);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(otpElement, totp);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });

    it("Should leave the TOTP field untouched when the credential carries no otp", () => {
      expect.assertions(4);
      document.body.innerHTML = `
        <form>
          <input type="text" name="username" autocomplete="username" />
          <input type="password" name="password" autocomplete="current-password" />
          <input type="text" name="otp" autocomplete="one-time-code" />
        </form>`;
      const usernameElement = document.querySelector("input[name='username']");
      const passwordElement = document.querySelector("input[name='password']");
      formData = defaultFormData({ otp: undefined });

      const page = new AutofillPage();
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameElement, formData.username);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordElement, formData.secret);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });
  });

  describe("With no suitable element", () => {
    it("Should catch and emit an error when no fillable field is found", () => {
      expect.assertions(2);
      document.body.innerHTML = `<form><input type="text" name="search" placeholder="Search" /></form>`;

      const formData = defaultFormData();
      const page = new AutofillPage();
      page.fillForm(formData);

      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
        name: "Error",
        message: "Unable to find the input elements on this page.",
      });
      expect(UserEventsService.autofill).not.toHaveBeenCalled();
    });
  });

  describe("With a TOTP generation failure", () => {
    it("Should catch and emit an error when the TOTP generation fails", () => {
      expect.assertions(3);
      document.body.innerHTML = `<form><input type="text" name="otp" autocomplete="one-time-code" /></form>`;

      jest.spyOn(TotpCodeGeneratorService, "generate").mockReturnValueOnce(undefined);

      const formData = defaultFormData();
      const page = new AutofillPage();

      expect(() => page.fillForm(formData)).not.toThrow();
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
        name: "Error",
        message: "Error while generating the TOTP.",
      });
      expect(UserEventsService.autofill).not.toHaveBeenCalled();
    });
  });
});

describe("Autofill::validateData", () => {
  ["username", "secret", "url"].forEach((parameterName) => {
    FAIL_STRING_SCENARIOS.forEach(({ scenario, value: parameterValue }) => {
      it(`Should catch and emit an error when ${parameterName} is ${scenario}`, () => {
        expect.assertions(2);

        const formData = defaultFormData({ [parameterName]: parameterValue });
        const page = new AutofillPage();
        page.fillForm(formData);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
          name: "Error",
          message: `The parameter ${parameterName} is not valid`,
        });

        expect(UserEventsService.autofill).not.toHaveBeenCalled();
      });
    });
  });

  it(`Should catch and emit an error when otp is not an invalid object`, () => {
    expect.assertions(2);

    const formData = defaultFormData({ otp: {} });
    const page = new AutofillPage();
    page.fillForm(formData);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
      name: "Error",
      message: `The parameter otp is not valid`,
    });

    expect(UserEventsService.autofill).not.toHaveBeenCalled();
  });

  it(`Should catch and emit an error when no credentials are not provided`, () => {
    expect.assertions(2);

    const formData = defaultFormData({ username: undefined, secret: undefined, otp: undefined });
    const page = new AutofillPage();
    page.fillForm(formData);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
      name: "Error",
      message: `Either otp or username/secret parameters are required`,
    });

    expect(UserEventsService.autofill).not.toHaveBeenCalled();
  });
});

describe("Autofill::isRequestInitiatedFromSameOrigin", () => {
  it("Should emit an error when the request is from a different origin", () => {
    expect.assertions(2);
    document.body.innerHTML = `<form><input type="text" name="username" /><input type="password" /></form>`;

    const formData = defaultFormData({ url: "https://passbolt.com/login" });
    const page = new AutofillPage();
    page.fillForm(formData);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
      name: "Error",
      message: "The request is not initiated from same origin",
    });

    expect(UserEventsService.autofill).not.toHaveBeenCalled();
  });

  it("Should emit an error when the url is an empty string", () => {
    expect.assertions(2);
    document.body.innerHTML = `<form><input type="text" name="username" /><input type="password" /></form>`;

    const formData = defaultFormData({ url: "" });
    const page = new AutofillPage();
    page.fillForm(formData);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
      name: "Error",
      message: "The request is not initiated from same origin",
    });

    expect(UserEventsService.autofill).not.toHaveBeenCalled();
  });
});
