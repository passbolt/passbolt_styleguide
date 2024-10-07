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
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultMetadataPrivateKeyDto, minimalMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";

describe("MetadataPrivateKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataPrivateKeyEntity.name, MetadataPrivateKeyEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "id");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "id");
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "id");
    });

    it("validates metadata_key_id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "metadata_key_id");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "metadata_key_id");
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "metadata_key_id");
    });

    it("validates user_id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "user_id");
      assertEntityProperty.required(MetadataPrivateKeyEntity, "user_id");
    });

    it("validates data property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "data");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "data");
      assertEntityProperty.maxLength(MetadataPrivateKeyEntity, "data", 10_000);
      assertEntityProperty.armoredPgpMessage(MetadataPrivateKeyEntity, "data");
    });

    it("validates armored_key property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "armored_key");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "armored_key");
      assertEntityProperty.maxLength(MetadataPrivateKeyEntity, "armored_key", 10_000);
      assertEntityProperty.armoredPrivateKey(MetadataPrivateKeyEntity, "armored_key");
    });

    it("validates created property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "created");
      assertEntityProperty.dateTime(MetadataPrivateKeyEntity, "created");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "modified");
      assertEntityProperty.dateTime(MetadataPrivateKeyEntity, "modified");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "created_by");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "modified_by");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "modified_by");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(9);
      const dto = minimalMetadataPrivateKeyDto({}, {withData: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toBeUndefined();
      expect(entity._props.metadata_key_id).toBeUndefined();
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.armored_key).toBeUndefined();
      expect(entity._props.created).toBeUndefined();
      expect(entity._props.created_by).toBeUndefined();
      expect(entity._props.modified).toBeUndefined();
      expect(entity._props.modified_by).toBeUndefined();
    });

    it("constructor works if valid DTO is provided: with data", () => {
      expect.assertions(9);
      const dto = defaultMetadataPrivateKeyDto({}, {withData: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.metadata_key_id).toStrictEqual(dto.metadata_key_id);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.armored_key).toBeUndefined();
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
    });

    it("constructor works if valid DTO is provided: with armored_key", () => {
      expect.assertions(9);
      const dto = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.metadata_key_id).toStrictEqual(dto.metadata_key_id);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toBeUndefined();
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
    });

    it("constructor fails if no data and no armored_key is given", () => {
      expect.assertions(1);
      const dto = defaultMetadataPrivateKeyDto();
      delete dto.data;
      delete dto.armored_key;

      expect(() => new MetadataPrivateKeyEntity(dto)).toThrowEntityValidationError("data:armored_key", "at-least-one-defined");
    });

    it("constructor fails if both data and armored_key are given", () => {
      expect.assertions(1);
      const dto = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true, withData: true});

      expect(() => new MetadataPrivateKeyEntity(dto)).toThrowEntityValidationError("data:armored_key", "only-one-defined");
    });
  });

  describe("::getters", () => {
    it("`metadataKeyId` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataPrivateKeyDto({}, {withArmoredKey: true});
      const entity1 = new MetadataPrivateKeyEntity(dto1);

      const dto2 = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true});
      const entity2 = new MetadataPrivateKeyEntity(dto2);

      expect(entity1.metadataKeyId).toBeNull();
      expect(entity2.metadataKeyId).toStrictEqual(dto2.metadata_key_id);
    });

    it("`data` should return the right value", () => {
      expect.assertions(2);
      const dto = defaultMetadataPrivateKeyDto({}, {withData: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.data).toStrictEqual(dto.data);
      expect(entity.armoredKey).toBeNull();
    });

    it("`armoredKey` should return the right value", () => {
      expect.assertions(2);
      const dto = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.data).toBeNull();
      expect(entity.armoredKey).toStrictEqual(dto.armored_key);
    });

    it("`data` should return the right value", () => {
      expect.assertions(2);
      const dto = defaultMetadataPrivateKeyDto({}, {withData: true});
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.data).toStrictEqual(dto.data);
      expect(entity.armoredKey).toBeNull();
    });
  });

  describe("::setters", () => {
    describe("::armoredKey", () => {
      it("`armoredKey` should set the value and erase `data`", () => {
        expect.assertions(4);
        const dto = defaultMetadataPrivateKeyDto({}, {withData: true});
        const entity = new MetadataPrivateKeyEntity(dto);

        expect(entity.data).toStrictEqual(dto.data);
        expect(entity.armoredKey).toBeNull();

        const armoredKey = assertEntityProperty.defaultArmoredKey();
        entity.armoredKey = armoredKey;

        expect(entity.armoredKey).toStrictEqual(armoredKey);
        expect(entity.data).toBeNull();
      });

      it("should validate `armoredKey` propery", () => {
        expect.assertions(1);
        const dto = defaultMetadataPrivateKeyDto({}, {withData: true});
        const entity = new MetadataPrivateKeyEntity(dto);

        const expectedError = new EntityValidationError("Could not validate property armored_key.");

        expect(() => { entity.armoredKey = "Wrong value in there!"; }).toThrowError(expectedError);
      });
    });

    describe("::data", () => {
      it("`data` should set the value and erase `armorkedKey`", () => {
        expect.assertions(4);
        const dto = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true});
        const entity = new MetadataPrivateKeyEntity(dto);

        expect(entity.data).toBeNull();
        expect(entity.armoredKey).toStrictEqual(dto.armored_key);

        const data = assertEntityProperty.defaultPgpMessage();
        entity.data = data;

        expect(entity.data).toStrictEqual(data);
        expect(entity.armoredKey).toBeNull();
      });

      it("should validate `data` propery", () => {
        expect.assertions(1);
        const dto = defaultMetadataPrivateKeyDto({}, {withArmoredKey: true});
        const entity = new MetadataPrivateKeyEntity(dto);

        const expectedError = new EntityValidationError("Could not validate property data.");

        expect(() => { entity.data = "Wrong value in there!"; }).toThrowError(expectedError);
      });
    });
  });
});
