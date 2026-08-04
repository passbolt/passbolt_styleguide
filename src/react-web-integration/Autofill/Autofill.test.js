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

/* eslint-disable no-unsanitized/property */

import UserEventsService from "../lib/User/UserEventsService";
import {
  domElementLoginWithNameAttributeUsername,
  domElementOnlyPassword,
  domElementOnlyUsername,
  domElementWithNoUsernamePassword,
  domElementLoginWithPlaceHolderAttributeUsername,
  domElementWithMultipleLogin,
  domGenericTextAndPassword,
  domWithMultiplePasswords,
  domMultipleUsernameCandidates,
  domNestedUsernamePassword,
  domTwoEmailInputsAndPassword,
  domUsernameByClass,
  domUsernameById,
  domSingleOTPField,
  domSingleOTPFieldWithUsernameAndPassword,
  domSingleOTPMultiField,
  domPartslink24ThreeFieldLogin,
  domSDRLoginForm,
  domBestKeywordOnFirstElement,
  domSameKeywordPriorityTwoElements,
  domOTPSingleFieldPatternLookalike,
  domOTPMultiFieldNumberLookalike,
} from "../lib/InForm/InformManager.test.data";
import { defaultFormData } from "./Autofill.test.data";
import MockPort from "../../react-extension/test/mock/MockPort";
import AutofillPage from "./Autofill.test.page";
import { FAIL_STRING_SCENARIOS } from "../../../test/assert/assertEntityProperty";
import { TotpCodeGeneratorService } from "../../shared/services/otp/TotpCodeGeneratorService";
import ShadowRootCacheService from "../lib/Dom/ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../lib/Dom/ShadowDom/ShadowMutationObserverService";

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

  ShadowRootCacheService._shadowRootsCache = new WeakMap();
  ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
  ShadowMutationObserverService._shadowMutationSubscribers = new Set();

  Object.defineProperty(window, "port", {
    writable: true,
    value: new MockPort(),
  });

  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    writable: true,
    value: 100,
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

    describe("With password and username elements", () => {
      it.each([
        { label: "username and password", value: domElementLoginWithNameAttributeUsername },
        { label: "nested username and password", value: domNestedUsernamePassword },
        { label: "username by id", value: domUsernameById },
        { label: "username by class", value: domUsernameByClass },
        { label: "username by placeholder", value: domElementLoginWithPlaceHolderAttributeUsername },
      ])("Should autofill both username and password for $label", ({ value: testCase }) => {
        expect.assertions(4);
        document.body.innerHTML = testCase;

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(page.username, formData.username);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(page.password, formData.secret);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });
    });

    describe("With a password element inside a shadow dom", () => {
      it("Should autofill the username outside the shadow root", () => {
        expect.assertions(4);

        document.body.innerHTML = "<div id='login-container'><input type='text' name='username'/></div>";
        const container = document.getElementById("login-container");
        const usernameField = container.querySelector("input");
        const host = document.createElement("div");
        const shadowRoot = host.attachShadow({ mode: "open" });
        const passwordField = document.createElement("input");
        passwordField.type = "password";
        shadowRoot.appendChild(passwordField);
        container.appendChild(host);

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameField, formData.username);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordField, formData.secret);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });

      it("Should autofill the username inside the shadow root", () => {
        expect.assertions(4);

        document.body.innerHTML = "";
        const host = document.createElement("div");
        const shadowRoot = host.attachShadow({ mode: "open" });
        const wrapper = document.createElement("div");
        const usernameField = document.createElement("input");
        usernameField.type = "text";
        usernameField.name = "username";
        const passwordField = document.createElement("input");
        passwordField.type = "password";
        wrapper.appendChild(usernameField);
        wrapper.appendChild(passwordField);
        shadowRoot.appendChild(wrapper);
        document.body.appendChild(host);

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameField, formData.username);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordField, formData.secret);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });

      it("Should autofill the username nested in a shadow root separate from the password", () => {
        // Descope/Vaadin: username and password live in distinct web components (separate shadow roots)
        // under a common container. Climbing up from the password element to locate the username must
        // pierce the sibling shadow root, otherwise only the password gets filled.
        expect.assertions(4);

        document.body.innerHTML = "<div id='login-container'></div>";
        const container = document.getElementById("login-container");

        const usernameHost = document.createElement("div");
        const usernameShadow = usernameHost.attachShadow({ mode: "open" });
        const usernameField = document.createElement("input");
        usernameField.type = "email";
        usernameField.name = "email";
        usernameField.setAttribute("autocomplete", "username");
        usernameShadow.appendChild(usernameField);

        const passwordHost = document.createElement("div");
        const passwordShadow = passwordHost.attachShadow({ mode: "open" });
        const passwordField = document.createElement("input");
        passwordField.type = "password";
        passwordShadow.appendChild(passwordField);

        container.appendChild(usernameHost);
        container.appendChild(passwordHost);

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameField, formData.username);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordField, formData.secret);
        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });
    });

    describe("With password element only", () => {
      it("Should autofill only password when no username field is found near password", () => {
        expect.assertions(3);
        document.body.innerHTML = domElementOnlyPassword;

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(page.password, formData.secret);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });
    });

    describe("With no password element", () => {
      it("Should autofill username from document when no password element exists", () => {
        expect.assertions(3);
        document.body.innerHTML = domElementOnlyUsername;

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(page.username, formData.username);

        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });

      it("Should autofill username nested in a shadow root when no password element exists", () => {
        // Reproduces the Descope/Vaadin single-step (email only) form: the username input lives inside a
        // web component's shadow DOM and there is no password field. The document-level username search
        // must pierce the shadow DOM to find it.
        expect.assertions(3);

        document.body.innerHTML = "";
        const host = document.createElement("div");
        const shadowRoot = host.attachShadow({ mode: "open" });
        const usernameField = document.createElement("input");
        usernameField.type = "email";
        usernameField.name = "email";
        usernameField.setAttribute("autocomplete", "username");
        shadowRoot.appendChild(usernameField);
        document.body.appendChild(host);

        const page = new AutofillPage();
        page.fillForm(formData);

        expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
        expect(UserEventsService.autofill).toHaveBeenCalledWith(usernameField, formData.username);
        expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
      });
    });

    describe("With no suitable element", () => {
      it("Should catch and emit an error when no elements are found", () => {
        expect.assertions(2);
        document.body.innerHTML = domElementWithNoUsernamePassword;

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

    describe("With OTP element", () => {
      it("Should catch and emit an error when TOTP generation failed", () => {
        expect.assertions(3);
        document.body.innerHTML = domSingleOTPField;

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
    document.body.innerHTML = domElementLoginWithNameAttributeUsername;

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
    document.body.innerHTML = domElementLoginWithNameAttributeUsername;

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

describe("Autofill::getPasswordElement", () => {
  it("Should skip hidden password fields and use the first visible one", () => {
    expect.assertions(3);
    document.body.innerHTML = domWithMultiplePasswords;

    const formData = defaultFormData();

    const page = new AutofillPage();
    // Only the second password is visible
    page.password.offsetWidth = 0;
    page.fillForm(formData);

    expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.username, formData.username);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.passwords[1], formData.secret);
  });
});

describe("Autofill::getUsernameElementBasedOnPasswordElement", () => {
  it("Should get the username field when all password fields are hidden", () => {
    expect.assertions(3);
    document.body.innerHTML = domElementWithMultipleLogin;

    const formData = defaultFormData();
    const page = new AutofillPage();

    // Hide all passwords
    page.passwords.forEach((password) => {
      password.offsetWidth = 0;
    });

    page.fillForm(formData);

    expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.username, formData.username);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });
});

describe("Autofill::getOTPElement", () => {
  [
    { label: "the autocomplete attribute is set", value: domSingleOTPField },
    { label: "there is a single OTP field represented by multiple inputs", value: domSingleOTPMultiField },
  ].forEach(({ label, value: testCase }) => {
    it(`Should get the OTP field when ${label}`, () => {
      expect.assertions(3);
      document.body.innerHTML = testCase;

      const formData = defaultFormData();
      const page = new AutofillPage();

      const totp = page.generateTOTP(formData.otp);
      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
      expect(UserEventsService.autofill).toHaveBeenCalledWith(page.otp, totp);

      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
    });
  });

  it(`Should get the OTP field when there are username and password fields`, () => {
    expect.assertions(5);
    document.body.innerHTML = domSingleOTPFieldWithUsernameAndPassword;

    const formData = defaultFormData();
    const page = new AutofillPage();

    const totp = page.generateTOTP(formData.otp);
    page.fillForm(formData);

    expect(UserEventsService.autofill).toHaveBeenCalledTimes(3);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.username, formData.username);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.password, formData.secret);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(page.otp, totp);

    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  [
    { label: "the pattern isn't supported", value: domOTPSingleFieldPatternLookalike },
    {
      label: "there is a single OTP field represented by multiple generic number inputs",
      value: domOTPMultiFieldNumberLookalike,
    },
  ].forEach(({ label, value: testCase }) => {
    it(`Shouldn't get the OTP field when ${label}`, () => {
      expect.assertions(2);
      document.body.innerHTML = testCase;

      const formData = defaultFormData();
      const page = new AutofillPage();

      page.fillForm(formData);

      expect(UserEventsService.autofill).toHaveBeenCalledTimes(0);
      expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "ERROR", {
        message: "Unable to find the input elements on this page.",
        name: "Error",
      });
    });
  });
});

describe("Autofill::extractUsernameElementWithFallback", () => {
  it("Should prefer the input with a username-related keyword in its id", () => {
    expect.assertions(1);
    document.body.innerHTML = domMultipleUsernameCandidates;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const expectedUsernameEl = document.querySelector("#user_email");
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedUsernameEl, formData.username);
  });

  it("Should fall back to the first matching element when multiple candidates exist", () => {
    expect.assertions(2);
    document.body.innerHTML = domTwoEmailInputsAndPassword;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const firstEmailInput = document.querySelector("#first-field");
    expect(UserEventsService.autofill).toHaveBeenCalledWith(firstEmailInput, formData.username);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  it("Should autofill only password when text input does not match username selectors", () => {
    expect.assertions(3);
    document.body.innerHTML = domGenericTextAndPassword;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const passwordEl = document.querySelector('input[type="password"]');
    expect(UserEventsService.autofill).toHaveBeenCalledTimes(1);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(passwordEl, formData.secret);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  it("Should prefer userLogin over accountLogin on partslink24 3-field form", () => {
    expect.assertions(4);
    document.body.innerHTML = domPartslink24ThreeFieldLogin;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const expectedUsernameEl = document.querySelector('[name="userLogin"]');
    const expectedPasswordEl = document.querySelector('[type="password"]');
    expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedUsernameEl, formData.username);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedPasswordEl, formData.secret);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  it("Should autofill Italian 'Utente' username field on SDR login form", () => {
    expect.assertions(4);
    document.body.innerHTML = domSDRLoginForm;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const expectedUsernameEl = document.querySelector("#Utente");
    const expectedPasswordEl = document.querySelector("#Password");
    expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedUsernameEl, formData.username);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedPasswordEl, formData.secret);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  it("Should pick the first element when it has the best keyword score", () => {
    expect.assertions(3);
    document.body.innerHTML = domBestKeywordOnFirstElement;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const expectedUsernameEl = document.querySelector('[name="username"]');
    expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedUsernameEl, formData.username);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });

  it("Should pick the first element in DOM order when two elements have the same keyword priority", () => {
    expect.assertions(3);
    document.body.innerHTML = domSameKeywordPriorityTwoElements;

    const formData = defaultFormData();
    const page = new AutofillPage();
    page.fillForm(formData);

    const expectedUsernameEl = document.querySelector('[name="main_user"]');
    expect(UserEventsService.autofill).toHaveBeenCalledTimes(2);
    expect(UserEventsService.autofill).toHaveBeenCalledWith(expectedUsernameEl, formData.username);
    expect(window.port.emit).toHaveBeenCalledWith(formData.requestId, "SUCCESS");
  });
});
