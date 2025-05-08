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
 * @since         5.1.0
 */
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import EntitySchema from "../abstract/entitySchema";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import MetadataTrustedKeyEntity from "./metadataTrustedKeyEntity";
import {defaultMetadataTrustedKeyDto} from "./metadataTrustedKeyEntity.test.data";
import MetadataKeyEntity from "./metadataKeyEntity";
import {defaultMetadataKeyDto} from "./metadataKeyEntity.test.data";

describe("MetadataTrustedKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataTrustedKeyEntity.name, MetadataTrustedKeyEntity.getSchema());
    });

    it("validates fingerprint property", () => {
      assertEntityProperty.string(MetadataTrustedKeyEntity, "fingerprint");
      assertEntityProperty.fingerprint(MetadataKeyEntity, "fingerprint");
      assertEntityProperty.required(MetadataTrustedKeyEntity, "fingerprint");
    });

    it("validates signed property", () => {
      assertEntityProperty.string(MetadataTrustedKeyEntity, "signed");
      assertEntityProperty.dateTime(MetadataTrustedKeyEntity, "signed");
      assertEntityProperty.required(MetadataTrustedKeyEntity, "signed");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(2);
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);

      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.signed).toStrictEqual(dto.signed);
    });
  });

  describe("::getters", () => {
    it("`fingerprint` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);

      expect(entity.fingerprint).toStrictEqual(pgpKeys.metadataKey.fingerprint);
    });

    it("`signed` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);

      expect(entity.signed).toStrictEqual(pgpKeys.metadataKey.created);
    });
  });

  describe("::isMetadataKeyTrusted", () => {
    it("returns true if metadata key is trusted", () => {
      expect.assertions(1);
      const metadataKey = new MetadataKeyEntity(defaultMetadataKeyDto());
      const dto = defaultMetadataTrustedKeyDto({fingerprint: metadataKey.fingerprint});
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted(metadataKey)).toBeTruthy();
    });

    it("return false if metadata key is not trusted even if fingerprint match", () => {
      expect.assertions(1);
      const metadataKey = new MetadataKeyEntity(defaultMetadataKeyDto());
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);

      expect(entity.isMetadataKeyTrusted(metadataKey)).toBeFalsy();
    });

    it("throws if the parameter to check is not of type MetadataKeyEntity", () => {
      expect.assertions(1);
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);

      expect(() => entity.isMetadataKeyTrusted({})).toThrow(TypeError);
    });
  });
});
