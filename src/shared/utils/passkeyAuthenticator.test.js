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
import { getPasskeyAuthenticatorName, normalizePasskeyAaguid } from "./passkeyAuthenticator";

const KEEPASSXC_AAGUID = "fdb141b2-5d84-443e-8a35-4698c205a502";

describe("passkeyAuthenticator", () => {
  describe("::normalizePasskeyAaguid", () => {
    it("should lowercase and trim a dashed aaguid", () => {
      expect.assertions(1);
      expect(normalizePasskeyAaguid("  FDB141B2-5D84-443E-8A35-4698C205A502 ")).toStrictEqual(KEEPASSXC_AAGUID);
    });

    it("should add the dashes to a 32 hex characters aaguid", () => {
      expect.assertions(1);
      expect(normalizePasskeyAaguid("FDB141B25D84443E8A354698C205A502")).toStrictEqual(KEEPASSXC_AAGUID);
    });

    it("should return null for a blank or non string aaguid", () => {
      expect.assertions(5);
      expect(normalizePasskeyAaguid("")).toBeNull();
      expect(normalizePasskeyAaguid("   ")).toBeNull();
      expect(normalizePasskeyAaguid(null)).toBeNull();
      expect(normalizePasskeyAaguid(undefined)).toBeNull();
      expect(normalizePasskeyAaguid(42)).toBeNull();
    });

    it("should return null for a string which is not an aaguid", () => {
      expect.assertions(3);
      expect(normalizePasskeyAaguid("constructor")).toBeNull();
      expect(normalizePasskeyAaguid("fdb141b2-5d84-443e-8a35")).toBeNull();
      expect(normalizePasskeyAaguid("zdb141b2-5d84-443e-8a35-4698c205a502")).toBeNull();
    });
  });

  describe("::getPasskeyAuthenticatorName", () => {
    it("should return the name of a known aaguid", () => {
      expect.assertions(1);
      expect(getPasskeyAuthenticatorName(KEEPASSXC_AAGUID)).toStrictEqual("KeePassXC");
    });

    it("should return the name of a known aaguid given in uppercase or without dashes", () => {
      expect.assertions(2);
      expect(getPasskeyAuthenticatorName(KEEPASSXC_AAGUID.toUpperCase())).toStrictEqual("KeePassXC");
      expect(getPasskeyAuthenticatorName("fdb141b25d84443e8a354698c205a502")).toStrictEqual("KeePassXC");
    });

    it("should return null for an unknown, empty or invalid aaguid", () => {
      expect.assertions(6);
      expect(getPasskeyAuthenticatorName("00000000-0000-0000-0000-000000000000")).toBeNull();
      expect(getPasskeyAuthenticatorName("")).toBeNull();
      expect(getPasskeyAuthenticatorName(null)).toBeNull();
      expect(getPasskeyAuthenticatorName(undefined)).toBeNull();
      expect(getPasskeyAuthenticatorName({})).toBeNull();
      expect(getPasskeyAuthenticatorName("constructor")).toBeNull();
    });
  });
});
