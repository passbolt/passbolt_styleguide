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

import MetadataTypesSettingsEntity, {
  RESOURCE_TYPE_VERSION_4,
  RESOURCE_TYPE_VERSION_5
} from "./metadataTypesSettingsEntity";
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV50FreshDto, defaultMetadataTypesSettingsV50OMigratedFromV4WithSupportV4Dto,
  defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto,
  defaultMetadataTypesSettingsV6Dto
} from "./metadataTypesSettingsEntity.test.data";

describe("MetadataTypesSettings", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataTypesSettingsEntity.name, MetadataTypesSettingsEntity.getSchema());
    });

    it("validates default_resource_types property", () => {
      assertEntityProperty.string(MetadataTypesSettingsEntity, "default_resource_types");
      assertEntityProperty.enumeration(MetadataTypesSettingsEntity, "default_resource_types", [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5], ['not-valid-version', '']);
      assertEntityProperty.required(MetadataTypesSettingsEntity, "default_resource_types");
    });

    it("validates default_folder_type property", () => {
      assertEntityProperty.string(MetadataTypesSettingsEntity, "default_folder_type");
      assertEntityProperty.enumeration(MetadataTypesSettingsEntity, "default_folder_type", [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5], ['not-valid-version', '']);
      assertEntityProperty.required(MetadataTypesSettingsEntity, "default_folder_type");
    });

    it("validates default_tag_type property", () => {
      assertEntityProperty.string(MetadataTypesSettingsEntity, "default_tag_type");
      assertEntityProperty.enumeration(MetadataTypesSettingsEntity, "default_tag_type", [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5], ['not-valid-version', '']);
      assertEntityProperty.required(MetadataTypesSettingsEntity, "default_tag_type");
    });

    it("validates default_comment_type property", () => {
      assertEntityProperty.string(MetadataTypesSettingsEntity, "default_comment_type");
      assertEntityProperty.enumeration(MetadataTypesSettingsEntity, "default_comment_type", [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5], ['not-valid-version', '']);
      assertEntityProperty.required(MetadataTypesSettingsEntity, "default_comment_type");
    });

    it("validates allow_creation_of_v5_resources property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v5_resources");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v5_resources");
    });

    it("validates allow_creation_of_v5_folders property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v5_folders");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v5_folders");
    });

    it("validates allow_creation_of_v5_tags property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v5_tags");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v5_tags");
    });

    it("validates allow_creation_of_v5_comments property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v5_comments");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v5_comments");
    });

    it("validates allow_creation_of_v4_resources property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v4_resources");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v4_resources");
    });

    it("validates allow_creation_of_v4_folders property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v4_folders");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v4_folders");
    });

    it("validates allow_creation_of_v4_tags property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v4_tags");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v4_tags");
    });

    it("validates allow_creation_of_v4_comments property", () => {
      assertEntityProperty.boolean(MetadataTypesSettingsEntity, "allow_creation_of_v4_comments");
      assertEntityProperty.required(MetadataTypesSettingsEntity, "allow_creation_of_v4_comments");
    });
  });

  describe("::constructor", () => {
    it("constructor works if default v4 DTO is provided. Whenever the instance is still running a v4.", () => {
      expect.assertions(12);
      const dto = defaultMetadataTypesSettingsV4Dto();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });

    it("constructor works if default v5 DTO is provided. Whenever the migration is completed to v5.", () => {
      expect.assertions(12);
      const dto = defaultMetadataTypesSettingsV6Dto();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.allow_creation_of_v5_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_comments).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_comments).toBeFalsy();
    });

    it("constructor works if default v5 fresh instance DTO is provided. Resources should be created by default in v5, in v4 resources are not accepted.", () => {
      expect.assertions(12);
      const dto = defaultMetadataTypesSettingsV50FreshDto();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });

    it("constructor works if default v5 instance on-going migration from v4 DTO is provided. Resources should be created by default in v4, in v5 resources are accepted.", () => {
      expect.assertions(12);
      const dto = defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });

    it("constructor works if default v5 instance migrated from v4 with support of v4 DTO is provided. Resources should be created by default in v5, and v5 resources are accepted.", () => {
      expect.assertions(12);
      const dto = defaultMetadataTypesSettingsV50OMigratedFromV4WithSupportV4Dto();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });
  });

  describe("::createFromV4Default", () => {
    it("creates from default v4 metadata types settings", () => {
      expect.assertions(12);
      const dto = MetadataTypesSettingsEntity.createFromV4Default();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });
  });

  describe("::createFromV5Default", () => {
    it("creates from default metadata types settings", () => {
      expect.assertions(12);
      const dto = MetadataTypesSettingsEntity.createFromDefault();
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_comments).toBeTruthy();
    });

    it("creates from default metadata types settings with alteration", () => {
      expect.assertions(12);
      const dto = MetadataTypesSettingsEntity.createFromDefault({
        default_resource_types: RESOURCE_TYPE_VERSION_5,
        default_folder_type: RESOURCE_TYPE_VERSION_5,
        default_tag_type: RESOURCE_TYPE_VERSION_5,
        default_comment_type: RESOURCE_TYPE_VERSION_5,
        allow_creation_of_v5_resources: true,
        allow_creation_of_v5_folders: true,
        allow_creation_of_v5_tags: true,
        allow_creation_of_v5_comments: true,
        allow_creation_of_v4_resources: false,
        allow_creation_of_v4_folders: false,
        allow_creation_of_v4_tags: false,
        allow_creation_of_v4_comments: false,
      });
      const entity = new MetadataTypesSettingsEntity(dto);

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_5);
      expect(entity._props.allow_creation_of_v5_resources).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_folders).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_tags).toBeTruthy();
      expect(entity._props.allow_creation_of_v5_comments).toBeTruthy();
      expect(entity._props.allow_creation_of_v4_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_comments).toBeFalsy();
    });
  });

  describe("::defaultResourceTypes", () => {
    it("get default_resource_types property value", () => {
      expect.assertions(2);
      let entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto());
      expect(entity.defaultResourceTypes).toEqual(RESOURCE_TYPE_VERSION_4);
      entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      expect(entity.defaultResourceTypes).toEqual(RESOURCE_TYPE_VERSION_5);
    });
  });

  describe("::allowCreationOfV5Resources", () => {
    it("get allow_creation_of_v5_resources property value", () => {
      expect.assertions(2);
      let entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto());
      expect(entity.allowCreationOfV5Resources).toBeFalsy();
      entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      expect(entity.allowCreationOfV5Resources).toBeTruthy();
    });
  });

  describe("::allowCreationOfV4Resources", () => {
    it("get default_resource_types allow_creation_of_v4_resources value", () => {
      expect.assertions(2);
      let entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto());
      expect(entity.allowCreationOfV4Resources).toBeTruthy();
      entity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      expect(entity.allowCreationOfV4Resources).toBeFalsy();
    });
  });
});
