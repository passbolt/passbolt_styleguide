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
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";
import {decryptedMetadataPrivateKeyDto, defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";

describe("MetadataTrustedKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataTrustedKeyEntity.name, MetadataTrustedKeyEntity.getSchema());
    });

    it("validates fingerprint property", () => {
      assertEntityProperty.string(MetadataTrustedKeyEntity, "fingerprint");
      assertEntityProperty.minLength(MetadataTrustedKeyEntity, "fingerprint", 40);
      assertEntityProperty.maxLength(MetadataTrustedKeyEntity, "fingerprint", 40);
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

    it("constructor fails if fingerprint is malformed", () => {
      expect.assertions(1);
      expect(() => new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto({fingerprint: "10"}))).toThrowEntityValidationError("fingerprint", "minLength");
    });

    it("constructor fails if created is not a date", () => {
      expect.assertions(1);
      expect(() => new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto({signed: "not a date"}))).toThrowEntityValidationError("signed", "format");
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
    it("should return true if metadata key is trusted", () => {
      expect.assertions(1);
      const metadataPrivateKey = new MetadataPrivateKeyEntity(decryptedMetadataPrivateKeyDto());
      metadataPrivateKey.dataSignedByCurrentUser = pgpKeys.metadataKey.created;

      const dto = defaultMetadataTrustedKeyDto({fingerprint: metadataPrivateKey.data.fingerprint});
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted(metadataPrivateKey)).toBeTruthy();
    });

    it("should return false if metadata key is not trusted even if fingerprint match", () => {
      expect.assertions(1);
      const metadataPrivateKey = new MetadataPrivateKeyEntity(decryptedMetadataPrivateKeyDto());

      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted(metadataPrivateKey)).toBeFalsy();
    });

    it("should return false if metadata key is trusted and fingerprint not match", () => {
      expect.assertions(1);
      const metadataPrivateKey = new MetadataPrivateKeyEntity(decryptedMetadataPrivateKeyDto());
      metadataPrivateKey.dataSignedByCurrentUser = pgpKeys.metadataKey.created;

      const dto = defaultMetadataTrustedKeyDto({fingerprint: pgpKeys.ada.fingerprint});
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted(metadataPrivateKey)).toBeFalsy();
    });

    it("should return false if metadata private key is not decrypted", () => {
      expect.assertions(1);
      const metadataPrivateKey = new MetadataPrivateKeyEntity(defaultMetadataPrivateKeyDto());

      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted(metadataPrivateKey)).toBeFalsy();
    });

    it("should return false if parameter is not a metadata private key", () => {
      expect.assertions(1);
      const dto = defaultMetadataTrustedKeyDto();
      const entity = new MetadataTrustedKeyEntity(dto);


      expect(entity.isMetadataKeyTrusted({})).toBeFalsy();
    });
  });
});
