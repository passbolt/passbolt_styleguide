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
 * @since         5.17.0
 */

import { enableFetchMocks } from "jest-fetch-mock";
import { ApiMfaVerifyContextProvider, ApiMfaVerifyContextState } from "./ApiMfaVerifyContext";
import {
  defaultAssertionDto,
  defaultProps,
  defaultVerifyBeginDto,
  defaultVerifySettingsDto,
} from "./ApiMfaVerifyContext.test.data";
import { mockApiResponse, mockApiResponseError } from "../../../test/mocks/mockApiResponse";
import WindowNavigationService from "../../shared/utils/windowNavigationService";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";

const SETTINGS_URL = /mfa\/verify\/webauthn\.json/;
const BEGIN_URL = /mfa\/verify\/webauthn\/begin\.json/;
const FINISH_URL = /mfa\/verify\/webauthn\/finish\.json/;
const TRUSTED_DOMAIN = "https://localhost:6006";

describe("ApiMfaVerifyContext", () => {
  let apiMfaVerifyContext, get, parseRequestOptionsFromJSON;

  const initContext = (props = defaultProps()) => {
    apiMfaVerifyContext = new ApiMfaVerifyContextProvider(props);
    const setStateMock = (state) => (apiMfaVerifyContext.state = { ...apiMfaVerifyContext.state, ...state });
    jest.spyOn(apiMfaVerifyContext, "setState").mockImplementation(setStateMock);
  };

  const domException = (name) => {
    const error = new Error(`${name} message`);
    error.name = name;
    return error;
  };

  beforeEach(() => {
    jest.resetAllMocks();
    enableFetchMocks();
    fetch.resetMocks();
    jest.spyOn(WindowNavigationService, "assign").mockImplementation(() => {});
    get = jest.fn().mockResolvedValue({ toJSON: () => defaultAssertionDto() });
    parseRequestOptionsFromJSON = jest.fn((json) => ({ parsed: json }));
    Object.defineProperty(globalThis, "PublicKeyCredential", {
      value: { parseRequestOptionsFromJSON },
      configurable: true,
    });
    Object.defineProperty(globalThis.navigator, "credentials", { value: { get }, configurable: true });
    initContext();
  });

  describe("::onInitializeRequested", () => {
    it("should load the providers and the remember-me policy", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(SETTINGS_URL, () =>
        mockApiResponse(defaultVerifySettingsDto({ isRememberMeForAMonthEnabled: false })),
      );

      await apiMfaVerifyContext.onInitializeRequested();

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.VERIFY_STATE);
      expect(apiMfaVerifyContext.state.providers).toStrictEqual(["totp", "webauthn"]);
      expect(apiMfaVerifyContext.state.isRememberMeForAMonthEnabled).toStrictEqual(false);
    });

    it("should navigate to the login if the session is not authenticated", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponseError(401, "Unauthorized"));

      await apiMfaVerifyContext.onInitializeRequested();

      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/auth/login`);
    });

    it("should navigate to the redirect if the verification is not required", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponseError(400, "No valid MFA settings"));

      await apiMfaVerifyContext.onInitializeRequested();

      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/app/passwords`);
    });

    it("should display an error if the settings cannot be loaded", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponseError(500, "Internal error"));

      await apiMfaVerifyContext.onInitializeRequested();

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.ERROR_STATE);
      expect(apiMfaVerifyContext.state.error).toBeInstanceOf(PassboltApiFetchError);
    });
  });

  describe("::onVerifyRequested", () => {
    it("should verify with the passkey and navigate to the redirect", async () => {
      expect.assertions(4);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, async (req) => {
        expect(await req.json()).toStrictEqual({
          handle: "b1b3f8a2-5c7e-4d7b-9a0e-3f2d8c6e1a45",
          credential: defaultAssertionDto(),
          remember: true,
        });
        return mockApiResponse({});
      });

      await apiMfaVerifyContext.onVerifyRequested(true);

      expect(parseRequestOptionsFromJSON).toHaveBeenCalledWith(defaultVerifyBeginDto().credentialRequestOptions);
      expect(get).toHaveBeenCalledWith({
        publicKey: { parsed: defaultVerifyBeginDto().credentialRequestOptions },
        signal: expect.any(AbortSignal),
      });
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/app/passwords`);
    });

    it("should be in ceremony state during the browser prompt and processing state during the finish", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockImplementation(async () => {
        expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.CEREMONY_STATE);
        return { toJSON: () => defaultAssertionDto() };
      });
      fetch.doMockOnceIf(FINISH_URL, () => {
        expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.PROCESSING_STATE);
        return mockApiResponse({});
      });

      await apiMfaVerifyContext.onVerifyRequested(false);
    });

    it.each([["//evil.example\\@localhost:6006/app"], ["/\\evil.example/app"], ["/app/passwords?filter=favorite"]])(
      "should navigate to the root if the redirect %s is not a plain path",
      async (redirect) => {
        expect.assertions(1);
        initContext(defaultProps({ value: { redirect } }));
        fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
        fetch.doMockOnceIf(FINISH_URL, () => mockApiResponse({}));

        await apiMfaVerifyContext.onVerifyRequested(false);

        expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/`);
      },
    );

    it("should keep the base path of an installation in a subdirectory", async () => {
      expect.assertions(1);
      initContext(defaultProps({ context: { trustedDomain: "https://localhost:6006/passbolt" } }));
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, () => mockApiResponse({}));

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(WindowNavigationService.assign).toHaveBeenCalledWith("https://localhost:6006/passbolt/app/passwords");
    });

    it("should navigate to the login if the begin is not authenticated", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponseError(401, "Unauthorized"));

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/auth/login`);
      expect(get).not.toHaveBeenCalled();
    });

    it("should display an error if the begin fails", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponseError(500, "Internal error"));

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.ERROR_STATE);
      expect(apiMfaVerifyContext.state.error).toBeInstanceOf(PassboltApiFetchError);
      expect(get).not.toHaveBeenCalled();
    });

    it("should display an error if the browser prompt is rejected", async () => {
      expect.assertions(3);
      const error = domException("NotAllowedError");
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockRejectedValue(error);

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.ERROR_STATE);
      expect(apiMfaVerifyContext.state.error).toBe(error);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should display a clear error is the browser rejected the ceremony due to a TLS certificate issue", async () => {
      expect.assertions(3);
      const error = domException("SecurityError");
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockRejectedValue(error);

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.ERROR_STATE);
      expect(apiMfaVerifyContext.state.error).toStrictEqual(
        new Error(
          "The operation requires a secure connection. Passkeys were blocked due to an untrusted TLS certificate or an invalid Relying Party ID.",
        ),
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should display the finish error if the session is still authenticated", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, () => mockApiResponseError(401, "The credential could not be verified."));
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponse(defaultVerifySettingsDto()));

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.ERROR_STATE);
      expect(apiMfaVerifyContext.state.error).toMatchObject({ message: "The credential could not be verified." });
      expect(WindowNavigationService.assign).not.toHaveBeenCalled();
    });

    it("should navigate to the login if the finish failure terminated the session", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, () => mockApiResponseError(401, "Too many failed attempts."));
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponseError(401, "Unauthorized"));

      await apiMfaVerifyContext.onVerifyRequested(false);

      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${TRUSTED_DOMAIN}/auth/login`);
    });
  });

  describe("::onRetryRequested", () => {
    it("should load the settings again after a failed initialization", async () => {
      expect.assertions(4);
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponseError(500, "Internal error"));
      await apiMfaVerifyContext.onInitializeRequested();
      fetch.doMockOnceIf(SETTINGS_URL, () => mockApiResponse(defaultVerifySettingsDto({ providers: ["webauthn"] })));

      await apiMfaVerifyContext.onRetryRequested();

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.VERIFY_STATE);
      expect(apiMfaVerifyContext.state.providers).toStrictEqual(["webauthn"]);
      expect(apiMfaVerifyContext.state.error).toBeNull();
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("should load the settings again after a failed ceremony", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockRejectedValue(domException("NotAllowedError"));
      await apiMfaVerifyContext.onVerifyRequested(false);
      fetch.doMockOnceIf(SETTINGS_URL, () =>
        mockApiResponse(defaultVerifySettingsDto({ isRememberMeForAMonthEnabled: false })),
      );

      await apiMfaVerifyContext.onRetryRequested();

      expect(apiMfaVerifyContext.state.state).toStrictEqual(ApiMfaVerifyContextState.VERIFY_STATE);
      expect(apiMfaVerifyContext.state.isRememberMeForAMonthEnabled).toStrictEqual(false);
      expect(apiMfaVerifyContext.state.error).toBeNull();
    });
  });

  describe("::getNextProviderUrl", () => {
    it.each([
      [["webauthn"], null],
      [["webauthn", "totp"], "totp"],
      [["totp", "webauthn"], "totp"],
      [["totp", "webauthn", "yubikey"], "yubikey"],
      [["totp", "yubikey", "webauthn"], "totp"],
    ])("should return the next provider of %j", (providers, expectedProvider) => {
      expect.assertions(1);
      apiMfaVerifyContext.state.providers = providers;

      const expectedUrl = expectedProvider
        ? `${TRUSTED_DOMAIN}/mfa/verify/${expectedProvider}?redirect=%2Fapp%2Fpasswords`
        : null;
      expect(apiMfaVerifyContext.getNextProviderUrl()).toStrictEqual(expectedUrl);
    });
  });

  describe("::componentWillUnmount", () => {
    it("should abort the pending browser prompt", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      let signal;
      get.mockImplementation((options) => {
        signal = options.signal;
        return new Promise(() => {});
      });
      apiMfaVerifyContext.onVerifyRequested(false);
      await new Promise((resolve) => setTimeout(resolve, 0));

      apiMfaVerifyContext.componentWillUnmount();

      expect(signal.aborted).toStrictEqual(true);
    });
  });
});
