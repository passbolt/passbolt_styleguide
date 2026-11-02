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
import MfaWebauthnVerifyService from "./MfaWebauthnVerifyService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse, mockApiResponseError } from "../../../../../test/mocks/mockApiResponse";
import PassboltApiFetchError from "../../../lib/Error/PassboltApiFetchError";

beforeEach(() => {
  enableFetchMocks();
  fetch.resetMocks();
});

describe("MfaWebauthnVerifyService", () => {
  let service;

  beforeEach(() => {
    service = new MfaWebauthnVerifyService(defaultApiClientOptions());
  });

  describe("::findSettings", () => {
    it("should get the verification settings", async () => {
      expect.assertions(3);
      const settings = { providers: ["totp", "webauthn"], isRememberMeForAMonthEnabled: true };
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toStrictEqual("https://localhost/mfa/verify/webauthn.json?api-version=v2");
        return mockApiResponse(settings);
      });

      await expect(service.findSettings()).resolves.toStrictEqual(settings);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\.json/, () => mockApiResponseError(401, "Unauthorized"));

      await expect(service.findSettings()).rejects.toThrow(PassboltApiFetchError);
    });
  });

  describe("::begin", () => {
    it("should post to the begin endpoint and return the ceremony options", async () => {
      expect.assertions(4);
      const beginDto = { handle: "handle-1", credentialRequestOptions: { challenge: "Y2hhbGxlbmdl" } };
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/begin\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(req.url).toStrictEqual("https://localhost/mfa/verify/webauthn/begin.json?api-version=v2");
        expect(await req.json()).toStrictEqual({});
        return mockApiResponse(beginDto);
      });

      await expect(service.begin()).resolves.toStrictEqual(beginDto);
    });
  });

  describe("::finish", () => {
    it("should post the assertion to the finish endpoint", async () => {
      expect.assertions(3);
      const finishDto = { handle: "handle-1", credential: { id: "credential-id" }, remember: true };
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/finish\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(req.url).toStrictEqual("https://localhost/mfa/verify/webauthn/finish.json?api-version=v2");
        expect(await req.json()).toStrictEqual({
          handle: "handle-1",
          credential: { id: "credential-id" },
          remember: true,
        });
        return mockApiResponse({});
      });

      await service.finish(finishDto);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/finish\.json/, () => mockApiResponseError(400, "Bad request"));

      await expect(service.finish({})).rejects.toThrow(PassboltApiFetchError);
    });
  });
});
