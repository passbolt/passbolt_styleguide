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
import PasskeyVerificationPreferenceEntity from "./passkeyVerificationPreferenceEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPasskeyVerificationPreferenceDto } from "./passkeyVerificationPreferenceEntity.test.data";

describe("PasskeyVerificationPreferenceEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        PasskeyVerificationPreferenceEntity.name,
        PasskeyVerificationPreferenceEntity.getSchema(),
      );
    });

    it("validates value property", () => {
      assertEntityProperty.required(PasskeyVerificationPreferenceEntity, "value");
      assertEntityProperty.enumeration(
        PasskeyVerificationPreferenceEntity,
        "value",
        ["strict", "non_strict"],
        ["sometimes", "STRICT"],
      );
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(1);
      const entity = new PasskeyVerificationPreferenceEntity(defaultPasskeyVerificationPreferenceDto());
      expect(entity.value).toStrictEqual("strict");
    });
  });

  describe("::isStrict", () => {
    it.each([
      ["strict", true],
      ["non_strict", false],
    ])("returns whether %s is strict", (value, expected) => {
      expect.assertions(1);
      const entity = new PasskeyVerificationPreferenceEntity(defaultPasskeyVerificationPreferenceDto({ value }));
      expect(entity.isStrict).toBe(expected);
    });
  });
});
