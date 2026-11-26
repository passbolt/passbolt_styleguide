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
import EntitySchema from "../../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../../test/assert/assertEntityProperty";
import ResourceMetadataEntity from "./resourceMetadataEntity";
import { defaultResourceMetadataDto, minimalResourceMetadataDto } from "./resourceMetadataEntity.test.data";
import EntityValidationError from "../../abstract/entityValidationError";
import { defaultIconDto } from "./iconEntity.test.data";
import IconEntity from "./IconEntity";
import CustomFieldsCollection from "../../customField/customFieldsCollection";
import { defaultCustomField } from "../../customField/customFieldEntity.test.data";
import { defaultCustomFieldsCollection } from "../../customField/customFieldsCollection.test.data";

describe("ResourceMetadataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceMetadataEntity.ENTITY_NAME, ResourceMetadataEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(ResourceMetadataEntity, "object_type");
      assertEntityProperty.enumeration(ResourceMetadataEntity, "object_type", [
        ResourceMetadataEntity.METADATA_OBJECT_TYPE,
      ]);
      assertEntityProperty.notRequired(ResourceMetadataEntity, "object_type");
    });

    it("validates resource_type_id property", () => {
      assertEntityProperty.string(ResourceMetadataEntity, "resource_type_id");
      assertEntityProperty.uuid(ResourceMetadataEntity, "resource_type_id");
      assertEntityProperty.required(ResourceMetadataEntity, "resource_type_id");
    });

    it("validates name property", () => {
      assertEntityProperty.string(ResourceMetadataEntity, "name");
      assertEntityProperty.maxLength(ResourceMetadataEntity, "name", 255);
      assertEntityProperty.required(ResourceMetadataEntity, "name");
    });

    it("validates username property", () => {
      assertEntityProperty.string(ResourceMetadataEntity, "username");
      assertEntityProperty.maxLength(ResourceMetadataEntity, "username", 255);
      assertEntityProperty.nullable(ResourceMetadataEntity, "username");
      assertEntityProperty.notRequired(ResourceMetadataEntity, "username");
    });

    it("validates uris property", () => {
      assertEntityProperty.array(ResourceMetadataEntity, "uris");
      assertEntityProperty.assertArrayItemString(ResourceMetadataEntity, "uris");
      assertEntityProperty.arrayStringMaxLength(ResourceMetadataEntity, "uris", ResourceMetadataEntity.URI_MAX_LENGTH);
    });

    it("validates description property", () => {
      assertEntityProperty.string(ResourceMetadataEntity, "description");
      assertEntityProperty.maxLength(ResourceMetadataEntity, "description", 10_000);
      assertEntityProperty.nullable(ResourceMetadataEntity, "description");
      assertEntityProperty.notRequired(ResourceMetadataEntity, "description");
    });

    it("validates icon property", () => {
      const successScenario = [{ scenario: "valid icon", value: defaultIconDto() }];
      assertEntityProperty.assertAssociation(
        ResourceMetadataEntity,
        "icon",
        defaultResourceMetadataDto(),
        successScenario,
        [],
      );
      assertEntityProperty.notRequired(ResourceMetadataEntity, "icon");
    });

    it("validates custom_fields property", () => {
      const successScenario = [{ scenario: "valid custom fileds", value: defaultCustomFieldsCollection() }];
      const failingScenario = [
        { scenario: "invalid data type", value: 42 },
        {
          scenario: "invalid custom field entity",
          value: [defaultCustomField({ metadata_value: "val", secret_value: "val" })],
        },
      ];
      assertEntityProperty.assertAssociation(
        ResourceMetadataEntity,
        "custom_fields",
        defaultResourceMetadataDto(),
        successScenario,
        failingScenario,
      );
      assertEntityProperty.notRequired(ResourceMetadataEntity, "custom_fields");
    });
  });

  describe("::constructor", () => {
    it("constructor returns validation error if dto required fields are missing", () => {
      try {
        new ResourceMetadataEntity({});
      } catch (error) {
        expect(error instanceof EntityValidationError).toBe(true);
        expect(error.details).toEqual({
          name: { required: "The name is required." },
          resource_type_id: { required: "The resource_type_id is required." },
        });
      }
    });

    it("works if minimal DTO is provided", () => {
      const metadataDto = minimalResourceMetadataDto();
      const metadataEntity = new ResourceMetadataEntity(metadataDto);
      expect(metadataEntity.toDto()).toEqual(metadataDto);
    });

    it("works if complete DTO is provided", () => {
      const metadataDto = defaultResourceMetadataDto();
      const metadataEntity = new ResourceMetadataEntity(metadataDto);
      expect(metadataEntity.toDto()).toEqual(metadataDto);
    });

    it("works even if the associated icon cannot be validated", () => {
      const metadataDto = defaultResourceMetadataDto({
        icon: {},
      });
      expect(() => new ResourceMetadataEntity(metadataDto)).not.toThrow();
    });
  });

  describe("::toDto", () => {
    it("should return the full dto", () => {
      expect.assertions(8);

      const metadata = new ResourceMetadataEntity(
        defaultResourceMetadataDto({}, { withIcon: true, withCustomFields: true }),
      );

      const dto = metadata.toDto(ResourceMetadataEntity.DEFAULT_CONTAIN);
      expect(dto.object_type).toStrictEqual("PASSBOLT_RESOURCE_METADATA");
      expect(dto.resource_type_id).toStrictEqual(metadata.resourceTypeId);
      expect(dto.name).toStrictEqual(metadata.name);
      expect(dto.username).toStrictEqual(metadata.username);
      expect(dto.uris).toStrictEqual(metadata.uris);
      expect(dto.description).toStrictEqual(metadata.description);
      expect(dto.icon).toStrictEqual(metadata._icon.toDto());
      expect(dto.custom_fields).toStrictEqual(metadata._customFields.toDto());
    });

    it("should return the minimal dto", () => {
      expect.assertions(8);

      const metadata = new ResourceMetadataEntity(
        defaultResourceMetadataDto({}, { withIcon: true, withCustomFields: true }),
      );

      const dto = metadata.toDto();
      expect(dto.object_type).toStrictEqual("PASSBOLT_RESOURCE_METADATA");
      expect(dto.resource_type_id).toStrictEqual(metadata.resourceTypeId);
      expect(dto.name).toStrictEqual(metadata.name);
      expect(dto.username).toStrictEqual(metadata.username);
      expect(dto.uris).toStrictEqual(metadata.uris);
      expect(dto.description).toStrictEqual(metadata.description);
      expect(dto.icon).toBeUndefined();
      expect(dto.custom_fields).toBeUndefined();
    });
  });

  describe("::getters", () => {
    describe("::icon", () => {
      it("should return the prop _icon", () => {
        expect.assertions(2);

        const iconDto = defaultIconDto();
        const metadata = new ResourceMetadataEntity(
          defaultResourceMetadataDto({
            icon: iconDto,
          }),
        );

        const icon = metadata.icon;
        expect(icon).toBeInstanceOf(IconEntity);
        expect(icon.toDto()).toStrictEqual(iconDto);
      });

      it("should return null if the icon is not set", () => {
        expect.assertions(1);

        const metadata = new ResourceMetadataEntity(defaultResourceMetadataDto());

        expect(metadata.icon).toBeNull();
      });
    });

    describe("::customFields", () => {
      it("should return the prop _customFields", () => {
        expect.assertions(2);

        const customFieldsDto = defaultCustomFieldsCollection();
        const metadata = new ResourceMetadataEntity(
          defaultResourceMetadataDto({
            custom_fields: customFieldsDto,
          }),
        );

        const customFieldsCollection = metadata.customFields;
        expect(customFieldsCollection).toBeInstanceOf(CustomFieldsCollection);
        expect(customFieldsCollection.toDto()).toStrictEqual(customFieldsDto);
      });

      it("should return null if the customFields is not set", () => {
        expect.assertions(1);

        const metadata = new ResourceMetadataEntity(defaultResourceMetadataDto());

        expect(metadata.customFields).toBeNull();
      });
    });
  });

  describe("::unset", () => {
    it("should throw an error if the parameter is not a string", () => {
      expect.assertions(1);

      const metadata = new ResourceMetadataEntity(defaultResourceMetadataDto());

      expect(() => metadata.unset(42)).toThrow();
    });

    it("should throw an error if the parameter is a string bu the property is not part of the schema", () => {
      expect.assertions(1);

      const metadata = new ResourceMetadataEntity(defaultResourceMetadataDto());

      expect(() => metadata.unset("something")).toThrow();
    });

    it("should delete the property", () => {
      expect.assertions(2);

      const prop = "username";
      const dto = defaultResourceMetadataDto();
      const metadata = new ResourceMetadataEntity(dto);

      expect(metadata._props[prop]).toStrictEqual(dto[prop]);
      metadata.unset(prop);
      expect(metadata._props[prop]).toBeUndefined();
    });
  });
});
