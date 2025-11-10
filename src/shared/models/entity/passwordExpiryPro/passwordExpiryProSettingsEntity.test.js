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
 * @since         4.5.0
 */
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import PasswordExpiryProSettingsEntity from "./passwordExpiryProSettingsEntity";
import {defaultPasswordExpiryProSettingsDto, defaultPasswordExpirySettingsDto, defaultPasswordExpirySettingsDtoFromApi} from "../passwordExpiry/passwordExpirySettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("passwordExpiryProSettings entity", () => {
  describe("PasswordExpiryProSettingsEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PasswordExpiryProSettingsEntity.ENTITY_NAME, PasswordExpiryProSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(PasswordExpiryProSettingsEntity, "id");
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "id");
    });

    it("validates default_expiry_period property", () => {
      assertEntityProperty.integer(PasswordExpiryProSettingsEntity, "default_expiry_period");
      assertEntityProperty.nullable(PasswordExpiryProSettingsEntity, "default_expiry_period", 1);
      /*
       * @todo: add min and max validation where the schema will be reviewed
       * assertEntityProperty.min(PasswordExpiryProSettingsEntity, "default_expiry_period", 1);
       * assertEntityProperty.max(PasswordExpiryProSettingsEntity, "default_expiry_period", 999);
       */
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "default_expiry_period");
    });

    it("validates policy_override property", () => {
      assertEntityProperty.boolean(PasswordExpiryProSettingsEntity, "policy_override");
      assertEntityProperty.required(PasswordExpiryProSettingsEntity, "policy_override");
    });

    it("validates automatic_expiry property", () => {
      assertEntityProperty.boolean(PasswordExpiryProSettingsEntity, "automatic_expiry");
      assertEntityProperty.required(PasswordExpiryProSettingsEntity, "automatic_expiry");
    });

    it("validates automatic_update property", () => {
      assertEntityProperty.boolean(PasswordExpiryProSettingsEntity, "automatic_update");
      assertEntityProperty.required(PasswordExpiryProSettingsEntity, "automatic_update");
    });

    it("validates created property", () => {
      assertEntityProperty.string(PasswordExpiryProSettingsEntity, "created");
      assertEntityProperty.dateTime(PasswordExpiryProSettingsEntity, "created");
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(PasswordExpiryProSettingsEntity, "modified");
      assertEntityProperty.dateTime(PasswordExpiryProSettingsEntity, "modified");
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(PasswordExpiryProSettingsEntity, "created_by");
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(PasswordExpiryProSettingsEntity, "modified_by");
      assertEntityProperty.notRequired(PasswordExpiryProSettingsEntity, "modified_by");
    });
  });

  it("should accept a mininal valid DTO", () => {
    expect.assertions(1);
    const minmalDto = defaultPasswordExpiryProSettingsDto();

    expect(() => new PasswordExpiryProSettingsEntity(minmalDto)).not.toThrow();
  });

  it("should build an entity with default", () => {
    expect.assertions(1);

    const entity = PasswordExpiryProSettingsEntity.createFromDefault();
    expect(entity.toDto()).toStrictEqual({
      automatic_update: true,
      automatic_expiry: true,
      policy_override: false,
      default_expiry_period: null
    });
  });

  it("should build an entity with given parameters", () => {
    expect.assertions(1);
    const expectedDto = {
      automatic_update: true,
      automatic_expiry: false,
      policy_override: true,
      default_expiry_period: 60
    };

    const entity = PasswordExpiryProSettingsEntity.createFromDefault(expectedDto);
    expect(entity.toDto()).toStrictEqual(expectedDto);
  });

  describe("::isFeatureEnabled", () => {
    it("should return true when id is set", () => {
      expect.assertions(1);

      const dto = defaultPasswordExpirySettingsDtoFromApi();
      const entity = new PasswordExpiryProSettingsEntity(dto);

      expect(entity.isFeatureEnabled).toStrictEqual(true);
    });

    it("should return false when id is not set", () => {
      expect.assertions(1);

      const dto = defaultPasswordExpirySettingsDto();

      const entity = new PasswordExpiryProSettingsEntity(dto);

      expect(entity.isFeatureEnabled).toStrictEqual(false);
    });
  });

  describe("::calculateDefaultResourceExpiryDate", () => {
    it("should return null when feature is not enabled (no id)", () => {
      expect.assertions(1);

      const dto = defaultPasswordExpirySettingsDto({
        automatic_update: true,
        automatic_expiry: true,
        default_expiry_period: 30
      });
      delete dto.id;
      const entity = new PasswordExpiryProSettingsEntity(dto);

      expect(entity.calculateDefaultResourceExpiryDate()).toBeNull();
    });

    it("should return null when default_expiry_period is null", () => {
      expect.assertions(1);

      const dto = defaultPasswordExpirySettingsDto({
        id: "10801423-4151-42a4-99d1-86e66145a08c",
        automatic_update: true,
        automatic_expiry: true,
        default_expiry_period: null
      });
      const entity = new PasswordExpiryProSettingsEntity(dto);

      expect(entity.calculateDefaultResourceExpiryDate()).toBeNull();
    });

    it("should calculate expiry date when feature is enabled and period is set", () => {
      expect.assertions(3);

      const dto = defaultPasswordExpirySettingsDto({
        id: "10801423-4151-42a4-99d1-86e66145a08c",
        automatic_update: true,
        automatic_expiry: true,
        default_expiry_period: 30
      });
      const entity = new PasswordExpiryProSettingsEntity(dto);

      const result = entity.calculateDefaultResourceExpiryDate();

      expect(result).not.toBeNull();
      expect(typeof result).toStrictEqual("string");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });
});
