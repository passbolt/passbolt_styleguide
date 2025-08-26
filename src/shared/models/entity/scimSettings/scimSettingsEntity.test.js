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
 * @since         5.5.0
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import ScimSettingsEntity from "./scimSettingsEntity";
import {
  defaultScimSettingsDto,
  minimalScimSettingsDto,
  scimSettingsDtoWithNullSecretToken,
  scimSettingsDtoWithInvalidSecretToken,
  scimSettingsDtoWithInvalidSecretTokenLength
} from "./scimSettingsEntity.test.data";
import {v4 as uuidv4} from "uuid";
import EntityValidationError from "../abstract/entityValidationError";

describe("ScimSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ScimSettingsEntity.name, ScimSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(ScimSettingsEntity, "id");
      assertEntityProperty.nullable(ScimSettingsEntity, "id");
    });

    it("validates scim_user_id property", () => {
      assertEntityProperty.uuid(ScimSettingsEntity, "scim_user_id");
      assertEntityProperty.required(ScimSettingsEntity, "scim_user_id");
    });

    it("validates setting_id property", () => {
      assertEntityProperty.uuid(ScimSettingsEntity, "setting_id");
      assertEntityProperty.nullable(ScimSettingsEntity, "setting_id");
    });

    it("validates secret_token property", () => {
      assertEntityProperty.string(ScimSettingsEntity, "secret_token");
      assertEntityProperty.nullable(ScimSettingsEntity, "secret_token");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(3);
      const dto = minimalScimSettingsDto();
      const entity = new ScimSettingsEntity(dto);

      expect(entity.scimUserId).toStrictEqual(dto.scim_user_id);
      expect(entity.settingId).toStrictEqual(dto.setting_id);
      expect(entity.secretToken).toBeNull();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(4);
      const dto = defaultScimSettingsDto();
      const entity = new ScimSettingsEntity(dto);

      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.scimUserId).toStrictEqual(dto.scim_user_id);
      expect(entity.settingId).toStrictEqual(dto.setting_id);
      expect(entity.secretToken).toStrictEqual(dto.secret_token);
    });

    it("constructor sets secret_token to null if not provided", () => {
      expect.assertions(1);
      const dto = minimalScimSettingsDto();
      const entity = new ScimSettingsEntity(dto);

      expect(entity.secretToken).toBeNull();
    });

    it("constructor sets secret_token to null if explicitly set to null", () => {
      expect.assertions(1);
      const dto = scimSettingsDtoWithNullSecretToken();
      const entity = new ScimSettingsEntity(dto);

      expect(entity.secretToken).toBeNull();
    });

    it("throws error if scim_user_id is missing", () => {
      expect.assertions(1);
      const dto = {
        setting_id: uuidv4(),
        secret_token: "pb_1234567890abcdef1234567890abcdef123456789"
      };
      expect(() => new ScimSettingsEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if setting_id is missing", () => {
      expect.assertions(1);
      const dto = {
        scim_user_id: uuidv4(),
        secret_token: "pb_1234567890abcdef1234567890abcdef123456789"
      };
      expect(() => new ScimSettingsEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if secret_token pattern is invalid", () => {
      expect.assertions(1);
      const dto = scimSettingsDtoWithInvalidSecretToken();
      expect(() => new ScimSettingsEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if secret_token length is invalid", () => {
      expect.assertions(1);
      const dto = scimSettingsDtoWithInvalidSecretTokenLength();
      expect(() => new ScimSettingsEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::associations", () => {
    it("associations should be empty", () => {
      expect.assertions(1);
      expect(ScimSettingsEntity.associations).toStrictEqual({});
    });
  });

  describe("::toDto", () => {
    it("returns a DTO with all properties", () => {
      expect.assertions(1);
      const dto = defaultScimSettingsDto();
      const entity = new ScimSettingsEntity(dto);
      const result = entity.toDto();
      expect(result).toEqual(dto);
    });

    it("returns a DTO without optional props if not provided", () => {
      expect.assertions(2);
      const dto = minimalScimSettingsDto();
      const entity = new ScimSettingsEntity(dto);
      const result = entity.toDto();
      expect(result.secret_token).toBeUndefined();
      expect(result.id).toBeUndefined();
    });
  });
});
