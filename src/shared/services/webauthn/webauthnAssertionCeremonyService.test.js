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

import WebauthnAssertionCeremonyService from "./webauthnAssertionCeremonyService";

describe("WebauthnAssertionCeremonyService", () => {
  const options = { challenge: "Y2hhbGxlbmdl", rpId: "passbolt.local" };
  const assertion = { id: "credential-id", type: "public-key" };
  let get, parseRequestOptionsFromJSON;

  beforeEach(() => {
    get = jest.fn().mockResolvedValue({ toJSON: () => assertion });
    parseRequestOptionsFromJSON = jest.fn((json) => ({ parsed: json }));
    Object.defineProperty(globalThis, "PublicKeyCredential", {
      value: { parseRequestOptionsFromJSON },
      configurable: true,
    });
    Object.defineProperty(globalThis.navigator, "credentials", { value: { get }, configurable: true });
  });

  describe("::run", () => {
    it("should request the assertion with the parsed options and return its JSON", async () => {
      expect.assertions(3);
      const signal = new AbortController().signal;

      await expect(WebauthnAssertionCeremonyService.run(options, signal)).resolves.toStrictEqual(assertion);
      expect(parseRequestOptionsFromJSON).toHaveBeenCalledWith(options);
      expect(get).toHaveBeenCalledWith({ publicKey: { parsed: options }, signal });
    });

    it("should let the browser error pass through", async () => {
      expect.assertions(1);
      const error = new Error("The operation either timed out or was not allowed.");
      error.name = "NotAllowedError";
      get.mockRejectedValue(error);

      await expect(WebauthnAssertionCeremonyService.run(options, new AbortController().signal)).rejects.toBe(error);
    });
  });
});
