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
 * @since         5.10.0
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import ExportPoliciesSettingsEntity from "./ExportPoliciesSettingsEntity";
import {
  defaultExportPoliciesSettingsDto,
  envExportPoliciesSettingsDto,
  dbExportPoliciesSettingsDto,
  fileExportPoliciesSettingsDto,
  exportPoliciesSettingsWithMetadataDto,
  SETTINGS_SOURCE_DEFAULT,
  SETTINGS_SOURCE_ENV,
  SETTINGS_SOURCE_DB,
  SETTINGS_SOURCE_FILE,
} from "./ExportPoliciesSettingsEntity.test.data";

describe("ExportPoliciesSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ExportPoliciesSettingsEntity.ENTITY_NAME, ExportPoliciesSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(ExportPoliciesSettingsEntity, "id");
      assertEntityProperty.notRequired(ExportPoliciesSettingsEntity, "id");
    });

    it("validates allow_csv_format property", () => {
      assertEntityProperty.boolean(ExportPoliciesSettingsEntity, "allow_csv_format");
      assertEntityProperty.required(ExportPoliciesSettingsEntity, "allow_csv_format");
    });

    it("validates source property", () => {
      assertEntityProperty.string(ExportPoliciesSettingsEntity, "source");
      assertEntityProperty.required(ExportPoliciesSettingsEntity, "source");
      assertEntityProperty.enumeration(ExportPoliciesSettingsEntity, "source", [
        SETTINGS_SOURCE_DEFAULT,
        SETTINGS_SOURCE_ENV,
        SETTINGS_SOURCE_DB,
        SETTINGS_SOURCE_FILE,
      ]);
    });

    it("validates created property", () => {
      assertEntityProperty.dateTime(ExportPoliciesSettingsEntity, "created");
      assertEntityProperty.notRequired(ExportPoliciesSettingsEntity, "created");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(ExportPoliciesSettingsEntity, "created_by");
      assertEntityProperty.notRequired(ExportPoliciesSettingsEntity, "created_by");
    });

    it("validates modified property", () => {
      assertEntityProperty.dateTime(ExportPoliciesSettingsEntity, "modified");
      assertEntityProperty.notRequired(ExportPoliciesSettingsEntity, "modified");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(ExportPoliciesSettingsEntity, "modified_by");
      assertEntityProperty.notRequired(ExportPoliciesSettingsEntity, "modified_by");
    });
  });

  describe("::constructor", () => {
    it("works if valid minimal DTO is provided", () => {
      expect.assertions(3);
      const dto = defaultExportPoliciesSettingsDto();
      const entity = new ExportPoliciesSettingsEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.allowCsvFormat).toBe(true);
      expect(entity.source).toBe(SETTINGS_SOURCE_DEFAULT);
    });

    it("works with env source DTO", () => {
      expect.assertions(2);
      const dto = envExportPoliciesSettingsDto();
      const entity = new ExportPoliciesSettingsEntity(dto);

      expect(entity.allowCsvFormat).toBe(false);
      expect(entity.source).toBe(SETTINGS_SOURCE_ENV);
    });

    it("works with db source DTO", () => {
      expect.assertions(2);
      const dto = dbExportPoliciesSettingsDto();
      const entity = new ExportPoliciesSettingsEntity(dto);

      expect(entity.allowCsvFormat).toBe(true);
      expect(entity.source).toBe(SETTINGS_SOURCE_DB);
    });

    it("works with file source DTO", () => {
      expect.assertions(2);
      const dto = fileExportPoliciesSettingsDto();
      const entity = new ExportPoliciesSettingsEntity(dto);

      expect(entity.allowCsvFormat).toBe(false);
      expect(entity.source).toBe(SETTINGS_SOURCE_FILE);
    });

    it("works if valid DTO with all fields is provided", () => {
      expect.assertions(8);
      const dto = exportPoliciesSettingsWithMetadataDto();
      const entity = new ExportPoliciesSettingsEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.id).toBe(dto.id);
      expect(entity.allowCsvFormat).toBe(dto.allow_csv_format);
      expect(entity.source).toBe(dto.source);
      expect(entity.created).toBe(dto.created);
      expect(entity.createdBy).toBe(dto.created_by);
      expect(entity.modified).toBe(dto.modified);
      expect(entity.modifiedBy).toBe(dto.modified_by);
    });
  });

  describe("::createFromDefault", () => {
    it("should create a valid entity without provided data", () => {
      expect.assertions(3);
      const entity = ExportPoliciesSettingsEntity.createFromDefault();

      expect(entity.allowCsvFormat).toBe(false);
      expect(entity.source).toBe(SETTINGS_SOURCE_DEFAULT);
      expect(entity.id).toBeNull();
    });

    it("should create a valid entity with custom data", () => {
      expect.assertions(2);
      const entity = ExportPoliciesSettingsEntity.createFromDefault({
        allow_csv_format: false,
        source: SETTINGS_SOURCE_ENV,
      });

      expect(entity.allowCsvFormat).toBe(false);
      expect(entity.source).toBe(SETTINGS_SOURCE_ENV);
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the correct entity name", () => {
      expect.assertions(1);
      expect(ExportPoliciesSettingsEntity.ENTITY_NAME).toBe("ExportPoliciesSettings");
    });
  });

  describe("::static constants", () => {
    it("should have SETTINGS_SOURCE_DEFAULT constant", () => {
      expect(ExportPoliciesSettingsEntity.SETTINGS_SOURCE_DEFAULT).toBe(SETTINGS_SOURCE_DEFAULT);
    });

    it("should have SETTINGS_SOURCE_ENV constant", () => {
      expect(ExportPoliciesSettingsEntity.SETTINGS_SOURCE_ENV).toBe(SETTINGS_SOURCE_ENV);
    });

    it("should have SETTINGS_SOURCE_DB constant", () => {
      expect(ExportPoliciesSettingsEntity.SETTINGS_SOURCE_DB).toBe(SETTINGS_SOURCE_DB);
    });

    it("should have SETTINGS_SOURCE_FILE constant", () => {
      expect(ExportPoliciesSettingsEntity.SETTINGS_SOURCE_FILE).toBe(SETTINGS_SOURCE_FILE);
    });
  });
});
