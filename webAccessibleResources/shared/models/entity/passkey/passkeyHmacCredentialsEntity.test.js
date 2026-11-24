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
import EntitySchema from "../abstract/entitySchema";
import PasskeyHmacCredentialsEntity from "./passkeyHmacCredentialsEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPasskeyHmacCredentialsDto } from "./passkeyHmacCredentialsEntity.test.data";

describe("PasskeyHmacCredentialsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PasskeyHmacCredentialsEntity.name, PasskeyHmacCredentialsEntity.getSchema());
    });

    it("validates algorithm property", () => {
      assertEntityProperty.required(PasskeyHmacCredentialsEntity, "algorithm");
      assertEntityProperty.enumeration(PasskeyHmacCredentialsEntity, "algorithm", ["hmac-sha256"], ["hmac-sha512"]);
    });

    it.each(["cred_with_uv", "cred_without_uv"])("validates %s property", (propertyName) => {
      assertEntityProperty.string(PasskeyHmacCredentialsEntity, propertyName);
      assertEntityProperty.required(PasskeyHmacCredentialsEntity, propertyName);
      assertEntityProperty.minLength(PasskeyHmacCredentialsEntity, propertyName, 43);
      assertEntityProperty.maxLength(PasskeyHmacCredentialsEntity, propertyName, 43);
      assertEntityProperty.assert(
        PasskeyHmacCredentialsEntity,
        propertyName,
        [{ scenario: "base64url", value: "4Kq6Bm8-l_UqCF_YNagyT6J2HxKa5DAGjbBFJbdrlQE" }],
        [
          { scenario: "base64", value: "4Kq6Bm8+l/UqCF/YNagyT6J2HxKa5DAGjbBFJbdrlQE" },
          { scenario: "padded", value: "4Kq6Bm8-l_UqCF_YNagyT6J2HxKa5DAGjbBFJbdrlQ=" },
        ],
        "pattern",
      );
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultPasskeyHmacCredentialsDto();
      const entity = new PasskeyHmacCredentialsEntity(dto);

      expect(entity.algorithm).toStrictEqual(dto.algorithm);
      expect(entity.credWithUv).toStrictEqual(dto.cred_with_uv);
      expect(entity.credWithoutUv).toStrictEqual(dto.cred_without_uv);
    });
  });
});
