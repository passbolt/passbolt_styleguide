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
import {
  ApiMfaVerifyDelegatedContextProvider,
  ApiMfaVerifyDelegatedContextState,
} from "./ApiMfaVerifyDelegatedContext";
import { defaultDelegatedFinishResultDto, defaultProps } from "./ApiMfaVerifyDelegatedContext.test.data";
import { defaultAssertionDto, defaultVerifyBeginDto } from "./ApiMfaVerifyContext.test.data";
import { mockApiResponse, mockApiResponseError } from "../../../test/mocks/mockApiResponse";
import WindowNavigationService from "../../shared/utils/windowNavigationService";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";

const BEGIN_URL = /mfa\/verify\/webauthn\/delegated\/begin\.json/;
const FINISH_URL = /mfa\/verify\/webauthn\/delegated\/finish\.json/;
const REDIRECT_URI = "passbolt://mfa/webauthn/callback";

describe("ApiMfaVerifyDelegatedContext", () => {
  let apiMfaVerifyDelegatedContext, get, parseRequestOptionsFromJSON;

  const initContext = (props = defaultProps()) => {
    apiMfaVerifyDelegatedContext = new ApiMfaVerifyDelegatedContextProvider(props);
    const setStateMock = (state) =>
      (apiMfaVerifyDelegatedContext.state = { ...apiMfaVerifyDelegatedContext.state, ...state });
    jest.spyOn(apiMfaVerifyDelegatedContext, "setState").mockImplementation(setStateMock);
  };

  const mockPublicKeyCredential = (value) => {
    Object.defineProperty(globalThis, "PublicKeyCredential", { value, configurable: true });
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
    mockPublicKeyCredential({ parseRequestOptionsFromJSON, prototype: { toJSON: () => {} } });
    Object.defineProperty(globalThis.navigator, "credentials", { value: { get }, configurable: true });
    initContext();
  });

  describe("::constructor", () => {
    it("should start the verification if the browser supports the passkey verification", () => {
      expect.assertions(3);
      jest.spyOn(apiMfaVerifyDelegatedContext, "onVerifyRequested").mockImplementation(() => {});

      apiMfaVerifyDelegatedContext.componentDidMount();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.VERIFY_STATE);
      expect(apiMfaVerifyDelegatedContext.onVerifyRequested).toHaveBeenCalled();
      expect(WindowNavigationService.assign).not.toHaveBeenCalled();
    });

    it.each([
      ["without parseRequestOptionsFromJSON", { prototype: { toJSON: () => {} } }],
      ["without toJSON", { parseRequestOptionsFromJSON: () => {}, prototype: {} }],
    ])("should return to the application if the browser is %s", (_, publicKeyCredential) => {
      expect.assertions(3);
      mockPublicKeyCredential(publicKeyCredential);
      initContext();
      jest.spyOn(apiMfaVerifyDelegatedContext, "onVerifyRequested");

      apiMfaVerifyDelegatedContext.componentDidMount();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(
        ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE,
      );
      expect(apiMfaVerifyDelegatedContext.onVerifyRequested).not.toHaveBeenCalled();
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=browser_unsupported`);
    });
  });

  describe("::onVerifyRequested", () => {
    it("should verify with the passkey and return to the application with the delegated token", async () => {
      expect.assertions(6);
      fetch.doMockOnceIf(BEGIN_URL, async (req) => {
        expect(await req.json()).toStrictEqual({ mfa_delegated_state: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d" });
        return mockApiResponse(defaultVerifyBeginDto());
      });
      fetch.doMockOnceIf(FINISH_URL, async (req) => {
        expect(await req.json()).toStrictEqual({
          mfa_delegated_state: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d",
          handle: "b1b3f8a2-5c7e-4d7b-9a0e-3f2d8c6e1a45",
          credential: defaultAssertionDto(),
        });
        return mockApiResponse(defaultDelegatedFinishResultDto());
      });

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(get).toHaveBeenCalledWith({
        publicKey: { parsed: defaultVerifyBeginDto().credentialRequestOptions },
        signal: expect.any(AbortSignal),
      });
      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.VERIFIED_STATE);
      expect(apiMfaVerifyDelegatedContext.state.delegatedToken).toStrictEqual(
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl",
      );
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(
        `${REDIRECT_URI}?mfa_delegated_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl`,
      );
    });

    it("should be in ceremony state during the browser prompt and processing state during the finish", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockImplementation(async () => {
        expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(
          ApiMfaVerifyDelegatedContextState.CEREMONY_STATE,
        );
        return { toJSON: () => defaultAssertionDto() };
      });
      fetch.doMockOnceIf(FINISH_URL, () => {
        expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(
          ApiMfaVerifyDelegatedContextState.PROCESSING_STATE,
        );
        return mockApiResponse(defaultDelegatedFinishResultDto());
      });

      await apiMfaVerifyDelegatedContext.onVerifyRequested();
    });

    it("should return to the application if the begin rejects the delegated state", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponseError(400, "The delegated state is not valid."));

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.EXPIRED_STATE);
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=state_invalid`);
      expect(get).not.toHaveBeenCalled();
    });

    it.each([["NotAllowedError"], ["AbortError"]])(
      "should return to the application if the browser prompt fails with %s",
      async (name) => {
        expect.assertions(4);
        const error = domException(name);
        fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
        get.mockRejectedValue(error);

        await apiMfaVerifyDelegatedContext.onVerifyRequested();

        expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.ERROR_STATE);
        expect(apiMfaVerifyDelegatedContext.state.error).toBe(error);
        expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=cancelled`);
        expect(fetch).toHaveBeenCalledTimes(1);
      },
    );

    it("should return to the application if the browser prompt fails with an unexpected error", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockRejectedValue(domException("SecurityError"));

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=unknown`);
    });

    it("should return to the application if the finish rejects the assertion", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, () => mockApiResponseError(400, "The credential could not be verified."));

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.ERROR_STATE);
      expect(apiMfaVerifyDelegatedContext.state.error).toBeInstanceOf(PassboltApiFetchError);
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=verification_failed`);
    });

    it("should return to the application if the begin fails with a server error", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponseError(500, "Internal error"));

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.ERROR_STATE);
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=unknown`);
      expect(get).not.toHaveBeenCalled();
    });

    it("should return to the application if the server cannot be reached", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      fetch.doMockOnceIf(FINISH_URL, () => Promise.reject(new TypeError("Failed to fetch")));

      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.ERROR_STATE);
      expect(WindowNavigationService.assign).toHaveBeenCalledWith(`${REDIRECT_URI}?error=unknown`);
    });
  });

  describe("::onRetryRequested", () => {
    it("should display the verify screen again after a failed ceremony", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(BEGIN_URL, () => mockApiResponse(defaultVerifyBeginDto()));
      get.mockRejectedValue(domException("NotAllowedError"));
      await apiMfaVerifyDelegatedContext.onVerifyRequested();

      apiMfaVerifyDelegatedContext.onRetryRequested();

      expect(apiMfaVerifyDelegatedContext.state.state).toStrictEqual(ApiMfaVerifyDelegatedContextState.VERIFY_STATE);
      expect(apiMfaVerifyDelegatedContext.state.error).toBeNull();
    });
  });

  describe("::getReturnToApplicationUrl", () => {
    it.each([
      [{ state: ApiMfaVerifyDelegatedContextState.VERIFY_STATE }, `${REDIRECT_URI}?error=cancelled`],
      [{ state: ApiMfaVerifyDelegatedContextState.CEREMONY_STATE }, null],
      [{ state: ApiMfaVerifyDelegatedContextState.PROCESSING_STATE }, null],
      [
        { state: ApiMfaVerifyDelegatedContextState.VERIFIED_STATE, delegatedToken: "header.pay+load.sig/n=" },
        `${REDIRECT_URI}?mfa_delegated_token=header.pay%2Bload.sig%2Fn%3D`,
      ],
    ])("should return the url of %j", (value, expectedUrl) => {
      expect.assertions(1);
      apiMfaVerifyDelegatedContext.state = { ...apiMfaVerifyDelegatedContext.state, ...value };

      expect(apiMfaVerifyDelegatedContext.getReturnToApplicationUrl()).toStrictEqual(expectedUrl);
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
      apiMfaVerifyDelegatedContext.onVerifyRequested();
      await new Promise((resolve) => setTimeout(resolve, 0));

      apiMfaVerifyDelegatedContext.componentWillUnmount();

      expect(signal.aborted).toStrictEqual(true);
    });
  });
});
