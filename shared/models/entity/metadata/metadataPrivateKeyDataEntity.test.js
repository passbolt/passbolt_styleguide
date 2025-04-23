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
 * @since         4.10.0
 */
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import MetadataPrivateKeyDataEntity from "./metadataPrivateKeyDataEntity";
import {defaultMetadataPrivateKeyDataDto, fullMetadataPrivateKeyDataDto} from "./metadataPrivateKeyDataEntity.test.data";

describe("MetadataPrivateKeyDataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataPrivateKeyDataEntity.name, MetadataPrivateKeyDataEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(MetadataPrivateKeyDataEntity, "object_type");
      assertEntityProperty.required(MetadataPrivateKeyDataEntity, "object_type");
      assertEntityProperty.enumeration(MetadataPrivateKeyDataEntity, "object_type", ["PASSBOLT_METADATA_PRIVATE_KEY"], ["any other values"]);
    });

    it("validates domain property", () => {
      assertEntityProperty.string(MetadataPrivateKeyDataEntity, "domain");
      assertEntityProperty.required(MetadataPrivateKeyDataEntity, "domain");
      assertEntityProperty.maxLength(MetadataPrivateKeyDataEntity, "domain", 1024);
    });

    it("validates fingerprint property", () => {
      assertEntityProperty.string(MetadataPrivateKeyDataEntity, "fingerprint");
      assertEntityProperty.required(MetadataPrivateKeyDataEntity, "fingerprint");
      assertEntityProperty.fingerprint(MetadataPrivateKeyDataEntity, "fingerprint");
    });

    it("validates armored_key property", () => {
      assertEntityProperty.string(MetadataPrivateKeyDataEntity, "armored_key");
      assertEntityProperty.maxLength(MetadataPrivateKeyDataEntity, "armored_key", 10_000);
      assertEntityProperty.required(MetadataPrivateKeyDataEntity, "armored_key");
      assertEntityProperty.armoredPrivateKey(MetadataPrivateKeyDataEntity, "armored_key");
    });

    it("validates passphrase property", () => {
      assertEntityProperty.string(MetadataPrivateKeyDataEntity, "passphrase");
      assertEntityProperty.required(MetadataPrivateKeyDataEntity, "passphrase");
      assertEntityProperty.maxLength(MetadataPrivateKeyDataEntity, "passphrase", 1024);
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(5);
      const dto = defaultMetadataPrivateKeyDataDto();
      const entity = new MetadataPrivateKeyDataEntity(dto);

      expect(entity._props.object_type).toStrictEqual("PASSBOLT_METADATA_PRIVATE_KEY");
      expect(entity._props.domain).toStrictEqual(dto.domain);
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.passphrase).toStrictEqual("");
    });

    it("constructor works if valid DTO is provided: with data", () => {
      expect.assertions(5);
      const dto = fullMetadataPrivateKeyDataDto();
      const entity = new MetadataPrivateKeyDataEntity(dto);

      expect(entity._props.object_type).toStrictEqual("PASSBOLT_METADATA_PRIVATE_KEY");
      expect(entity._props.domain).toStrictEqual(dto.domain);
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.passphrase).toStrictEqual(dto.passphrase);
    });
  });

  describe("::getters", () => {
    it("`armoredKey` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultMetadataPrivateKeyDataDto();
      const entity = new MetadataPrivateKeyDataEntity(dto);

      expect(entity.armoredKey).toStrictEqual(dto.armored_key);
    });
    it("`fingerprint` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultMetadataPrivateKeyDataDto();
      const entity = new MetadataPrivateKeyDataEntity(dto);

      expect(entity.fingerprint).toStrictEqual(dto.fingerprint);
    });
  });
});
