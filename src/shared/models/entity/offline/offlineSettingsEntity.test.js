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
 * @since         5.13.0
 */
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import OfflineSettingsEntity from "./offlineSettingsEntity";
import { defaultOfflineSettingsDto, defaultOfflineSettingsDtoFromApi } from "./offlineSettingsEntity.test.data";
import * as assertEntityProperty from "passbolt-styleguide/test/assert/assertEntityProperty";

describe("OfflineSettingsEntity", () => {
  describe("OfflineSettingsEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(OfflineSettingsEntity.ENTITY_NAME, OfflineSettingsEntity.getSchema());
    });

    it("validates session_duration property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_INTEGER, assertEntityProperty.SCENARIO_FLOAT];
      const failingScenarios = [
        assertEntityProperty.SCENARIO_STRING,
        assertEntityProperty.SCENARIO_OBJECT,
        assertEntityProperty.SCENARIO_ARRAY,
        assertEntityProperty.SCENARIO_NULL,
      ];

      assertEntityProperty.assert(
        OfflineSettingsEntity,
        "session_duration",
        successScenarios,
        failingScenarios,
        "type",
      );
      assertEntityProperty.required(OfflineSettingsEntity, "session_duration");
    });

    it("validates maximum_retention_period property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_INTEGER, assertEntityProperty.SCENARIO_FLOAT];
      const failingScenarios = [
        assertEntityProperty.SCENARIO_STRING,
        assertEntityProperty.SCENARIO_OBJECT,
        assertEntityProperty.SCENARIO_ARRAY,
        assertEntityProperty.SCENARIO_NULL,
      ];

      assertEntityProperty.assert(
        OfflineSettingsEntity,
        "maximum_retention_period",
        successScenarios,
        failingScenarios,
        "type",
      );
      assertEntityProperty.required(OfflineSettingsEntity, "maximum_retention_period");
    });

    it("validates created property", () => {
      assertEntityProperty.string(OfflineSettingsEntity, "created");
      assertEntityProperty.dateTime(OfflineSettingsEntity, "created");
      assertEntityProperty.notRequired(OfflineSettingsEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(OfflineSettingsEntity, "modified");
      assertEntityProperty.dateTime(OfflineSettingsEntity, "modified");
      assertEntityProperty.notRequired(OfflineSettingsEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.string(OfflineSettingsEntity, "created_by");
      assertEntityProperty.uuid(OfflineSettingsEntity, "created_by");
      assertEntityProperty.notRequired(OfflineSettingsEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.string(OfflineSettingsEntity, "modified_by");
      assertEntityProperty.uuid(OfflineSettingsEntity, "modified_by");
      assertEntityProperty.notRequired(OfflineSettingsEntity, "modified_by");
    });
  });

  describe("OfflineSettingsEntity::constructor", () => {
    it("should accept a minimal valid DTO", () => {
      expect.assertions(4);
      const dto = defaultOfflineSettingsDto();

      const entity = new OfflineSettingsEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.sessionDuration).toStrictEqual(dto.session_duration);
      expect(entity.maximumRetentionPeriod).toStrictEqual(dto.maximum_retention_period);
    });

    it("should build an entity with given parameters", () => {
      expect.assertions(8);
      const dto = defaultOfflineSettingsDtoFromApi();

      const entity = new OfflineSettingsEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.sessionDuration).toStrictEqual(dto.session_duration);
      expect(entity.maximumRetentionPeriod).toStrictEqual(dto.maximum_retention_period);
      expect(entity.created).toStrictEqual(dto.created);
      expect(entity.modified).toStrictEqual(dto.modified);
      expect(entity.createdBy).toStrictEqual(dto.created_by);
      expect(entity.modifiedBy).toStrictEqual(dto.modified_by);
    });

    it("should return null for optional getters when not provided", () => {
      expect.assertions(4);
      const entity = new OfflineSettingsEntity(defaultOfflineSettingsDto());

      expect(entity.created).toBeNull();
      expect(entity.modified).toBeNull();
      expect(entity.createdBy).toBeNull();
      expect(entity.modifiedBy).toBeNull();
    });

    it("should throw if session_duration is missing", () => {
      expect.assertions(1);
      const dto = defaultOfflineSettingsDto();
      delete dto.session_duration;
      expect(() => new OfflineSettingsEntity(dto)).toThrow();
    });

    it("should throw if maximum_retention_period is missing", () => {
      expect.assertions(1);
      const dto = defaultOfflineSettingsDto();
      delete dto.maximum_retention_period;
      expect(() => new OfflineSettingsEntity(dto)).toThrow();
    });
  });
});
