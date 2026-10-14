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
import MfaWebauthnDelegatedVerifyService from "./MfaWebauthnDelegatedVerifyService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse, mockApiResponseError } from "../../../../../test/mocks/mockApiResponse";
import PassboltApiFetchError from "../../../lib/Error/PassboltApiFetchError";

beforeEach(() => {
  enableFetchMocks();
  fetch.resetMocks();
});

describe("MfaWebauthnDelegatedVerifyService", () => {
  let service;

  beforeEach(() => {
    service = new MfaWebauthnDelegatedVerifyService(defaultApiClientOptions());
  });

  describe("::begin", () => {
    it("should post the delegated state to the begin endpoint and return the ceremony options", async () => {
      expect.assertions(4);
      const beginDto = { handle: "handle-1", credentialRequestOptions: { challenge: "Y2hhbGxlbmdl" } };
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/delegated\/begin\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(req.url).toStrictEqual("https://localhost/mfa/verify/webauthn/delegated/begin.json?api-version=v2");
        expect(await req.json()).toStrictEqual({ mfa_delegated_state: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d" });
        return mockApiResponse(beginDto);
      });

      await expect(service.begin("0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d")).resolves.toStrictEqual(beginDto);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/delegated\/begin\.json/, () =>
        mockApiResponseError(400, "The delegated state is not valid."),
      );

      await expect(service.begin("0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d")).rejects.toThrow(PassboltApiFetchError);
    });
  });

  describe("::finish", () => {
    it("should post the assertion to the finish endpoint and return the delegated token", async () => {
      expect.assertions(4);
      const finishDto = {
        mfa_delegated_state: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d",
        handle: "handle-1",
        credential: { id: "credential-id" },
      };
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/delegated\/finish\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(req.url).toStrictEqual("https://localhost/mfa/verify/webauthn/delegated/finish.json?api-version=v2");
        expect(await req.json()).toStrictEqual({
          mfa_delegated_state: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d",
          handle: "handle-1",
          credential: { id: "credential-id" },
        });
        return mockApiResponse({ mfa_delegated_token: "delegated-token" });
      });

      await expect(service.finish(finishDto)).resolves.toStrictEqual({ mfa_delegated_token: "delegated-token" });
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/mfa\/verify\/webauthn\/delegated\/finish\.json/, () =>
        mockApiResponseError(400, "The credential could not be verified."),
      );

      await expect(service.finish({})).rejects.toThrow(PassboltApiFetchError);
    });
  });
});
