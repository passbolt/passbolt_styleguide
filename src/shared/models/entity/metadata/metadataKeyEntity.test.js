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
import {defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";
import MetadataKeyEntity from "./metadataKeyEntity";
import {defaultMetadataKeyDto, minimalMetadataKeyDto} from "./metadataKeyEntity.test.data";
import MetadataPrivateKeysCollection from "./metadataPrivateKeysCollection";

describe("MetadataKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataKeyEntity.name, MetadataKeyEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "id");
      assertEntityProperty.notRequired(MetadataKeyEntity, "id");
      assertEntityProperty.nullable(MetadataKeyEntity, "id");
    });

    it("validates fingerprint property", () => {
      assertEntityProperty.fingerprint(MetadataKeyEntity, "fingerprint");
      assertEntityProperty.string(MetadataKeyEntity, "fingerprint");
      assertEntityProperty.required(MetadataKeyEntity, "fingerprint");
    });

    it("validates armored_key property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "armored_key");
      assertEntityProperty.required(MetadataKeyEntity, "armored_key");
      assertEntityProperty.maxLength(MetadataKeyEntity, "armored_key", 10_000);
      assertEntityProperty.armoredPrivateKey(MetadataKeyEntity, "armored_key");
    });

    it("validates created property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "created");
      assertEntityProperty.dateTime(MetadataKeyEntity, "created");
      assertEntityProperty.notRequired(MetadataKeyEntity, "created");
      assertEntityProperty.nullable(MetadataKeyEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "modified");
      assertEntityProperty.dateTime(MetadataKeyEntity, "modified");
      assertEntityProperty.notRequired(MetadataKeyEntity, "modified");
      assertEntityProperty.nullable(MetadataKeyEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "created_by");
      assertEntityProperty.notRequired(MetadataKeyEntity, "created_by");
      assertEntityProperty.nullable(MetadataKeyEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "modified_by");
      assertEntityProperty.notRequired(MetadataKeyEntity, "modified_by");
      assertEntityProperty.nullable(MetadataKeyEntity, "modified_by");
    });

    it("validates deleted property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "deleted");
      assertEntityProperty.dateTime(MetadataKeyEntity, "deleted");
      assertEntityProperty.notRequired(MetadataKeyEntity, "deleted");
      assertEntityProperty.nullable(MetadataKeyEntity, "deleted");
    });

    it("validates metadata_private_keys property", () => {
      const successScenarios = [
        {scenario: "a valid option", value: [defaultMetadataPrivateKeyDto({}, {withData: true})]},
      ];
      const failScenarios = [
        {scenario: "with invalid metadata private key build rule", value: defaultMetadataPrivateKeyDto()},
      ];
      assertEntityProperty.assertAssociation(MetadataKeyEntity, "metadata_private_keys", defaultMetadataKeyDto(), successScenarios, failScenarios);
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(9);
      const dto = minimalMetadataKeyDto();
      const entity = new MetadataKeyEntity(dto);

      expect(entity._props.id).toBeUndefined();
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toBeUndefined();
      expect(entity._props.created_by).toBeUndefined();
      expect(entity._props.modified).toBeUndefined();
      expect(entity._props.modified_by).toBeUndefined();
      expect(entity._props.deleted).toBeUndefined();
      expect(entity._props.metadata_private_keys).toBeUndefined();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(10);
      const dto = defaultMetadataKeyDto({});
      const entity = new MetadataKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.deleted).toStrictEqual(dto.deleted);
      expect(entity._props.metadata_private_keys).toBeUndefined();
      expect(entity._metadata_private_keys).toStrictEqual(new MetadataPrivateKeysCollection(dto.metadata_private_keys));
    });

    it("constructor throw an error if the id and the private metadata key ids are different", () => {
      expect.assertions(10);
      const dto = defaultMetadataKeyDto({});
      const entity = new MetadataKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.deleted).toStrictEqual(dto.deleted);
      expect(entity._props.metadata_private_keys).toBeUndefined();
      expect(entity._metadata_private_keys).toStrictEqual(new MetadataPrivateKeysCollection(dto.metadata_private_keys));
    });
  });

  describe("::getters", () => {
    it("`metadataPrivateKeys` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataKeyDto();
      const entity1 = new MetadataKeyEntity(dto1);

      const dto2 = defaultMetadataKeyDto();
      const entity2 = new MetadataKeyEntity(dto2);

      expect(entity1.metadataPrivateKeys).toBeNull();
      expect(entity2.metadataPrivateKeys).toStrictEqual(new MetadataPrivateKeysCollection(dto2.metadata_private_keys));
    });
  });
});
