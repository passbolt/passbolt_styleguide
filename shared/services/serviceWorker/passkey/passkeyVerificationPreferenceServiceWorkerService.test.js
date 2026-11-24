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
 * @since         5.18.0
 */
import MockPort from "../../../../react-extension/test/mock/MockPort";
import PasskeyVerificationPreferenceEntity from "../../../models/entity/passkey/passkeyVerificationPreferenceEntity";
import PasskeyVerificationPreferenceServiceWorkerService from "./passkeyVerificationPreferenceServiceWorkerService";

describe("PasskeyVerificationPreferenceServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new PasskeyVerificationPreferenceServiceWorkerService(port);
  });

  describe("::get", () => {
    it("requests the preference and returns an entity", async () => {
      expect.assertions(2);
      port.addRequestListener("passbolt.passkey.get-verification-preference", () => ({ value: "non_strict" }));
      jest.spyOn(port, "request");

      const preference = await service.get();

      expect(port.request).toHaveBeenCalledWith("passbolt.passkey.get-verification-preference");
      expect(preference).toEqual(new PasskeyVerificationPreferenceEntity({ value: "non_strict" }));
    });

    it("returns null when the user has not chosen yet", async () => {
      expect.assertions(1);
      port.addRequestListener("passbolt.passkey.get-verification-preference", () => null);

      await expect(service.get()).resolves.toBeNull();
    });
  });

  describe("::update", () => {
    it("requests the update and returns the saved entity", async () => {
      expect.assertions(2);
      port.addRequestListener("passbolt.passkey.update-verification-preference", (dto) => dto);
      jest.spyOn(port, "request");
      const preference = new PasskeyVerificationPreferenceEntity({ value: "strict" });

      const saved = await service.update(preference);

      expect(port.request).toHaveBeenCalledWith("passbolt.passkey.update-verification-preference", {
        value: "strict",
      });
      expect(saved).toEqual(preference);
    });

    it("throws if the preference is not an entity", async () => {
      expect.assertions(1);
      await expect(service.update({ value: "strict" })).rejects.toThrow(TypeError);
    });
  });
});
