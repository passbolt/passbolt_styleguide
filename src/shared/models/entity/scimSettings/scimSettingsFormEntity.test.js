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
import ScimSettingsFormEntity from "./scimSettingsFormEntity";
import {
  defaultScimSettingsFormDto,
  minimalScimSettingsFormDto,
  scimSettingsFormDtoWithNullSecretToken,
  scimSettingsFormDtoWithInvalidSecretToken,
  scimSettingsFormDtoWithInvalidSecretTokenLength,
} from "./scimSettingsFormEntity.test.data";
import { v4 as uuidv4 } from "uuid";
import EntityValidationError from "../abstract/entityValidationError";

describe("ScimSettingsFormEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ScimSettingsFormEntity.name, ScimSettingsFormEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(ScimSettingsFormEntity, "id");
      assertEntityProperty.nullable(ScimSettingsFormEntity, "id");
    });

    it("validates scim_user_id property", () => {
      assertEntityProperty.uuid(ScimSettingsFormEntity, "scim_user_id");
      assertEntityProperty.required(ScimSettingsFormEntity, "scim_user_id");
    });

    it("validates setting_id property", () => {
      assertEntityProperty.uuid(ScimSettingsFormEntity, "setting_id");
      assertEntityProperty.nullable(ScimSettingsFormEntity, "setting_id");
    });

    it("validates secret_token property", () => {
      assertEntityProperty.string(ScimSettingsFormEntity, "secret_token");
      assertEntityProperty.nullable(ScimSettingsFormEntity, "secret_token");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(3);
      const dto = minimalScimSettingsFormDto();
      const entity = new ScimSettingsFormEntity(dto);

      expect(entity.scimUserId).toStrictEqual(dto.scim_user_id);
      expect(entity.settingId).toStrictEqual(dto.setting_id);
      expect(entity.secretToken).toBeNull();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(4);
      const dto = defaultScimSettingsFormDto();
      const entity = new ScimSettingsFormEntity(dto);

      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.scimUserId).toStrictEqual(dto.scim_user_id);
      expect(entity.settingId).toStrictEqual(dto.setting_id);
      expect(entity.secretToken).toStrictEqual(dto.secret_token);
    });

    it("constructor sets secret_token to null if not provided", () => {
      expect.assertions(1);
      const dto = minimalScimSettingsFormDto();
      const entity = new ScimSettingsFormEntity(dto);

      expect(entity.secretToken).toBeNull();
    });

    it("constructor sets secret_token to null if explicitly set to null", () => {
      expect.assertions(1);
      const dto = scimSettingsFormDtoWithNullSecretToken();
      const entity = new ScimSettingsFormEntity(dto);

      expect(entity.secretToken).toBeNull();
    });

    it("throws error if scim_user_id is missing", () => {
      expect.assertions(1);
      const dto = {
        setting_id: uuidv4(),
        secret_token: "pb_1234567890abcdef1234567890abcdef123456789",
      };
      expect(() => new ScimSettingsFormEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if setting_id is missing", () => {
      expect.assertions(1);
      const dto = {
        scim_user_id: uuidv4(),
        secret_token: "pb_1234567890abcdef1234567890abcdef123456789",
      };
      expect(() => new ScimSettingsFormEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if secret_token pattern is invalid", () => {
      expect.assertions(1);
      const dto = scimSettingsFormDtoWithInvalidSecretToken();
      expect(() => new ScimSettingsFormEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws error if secret_token length is invalid", () => {
      expect.assertions(1);
      const dto = scimSettingsFormDtoWithInvalidSecretTokenLength();
      expect(() => new ScimSettingsFormEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::associations", () => {
    it("associations should be empty", () => {
      expect.assertions(1);
      expect(ScimSettingsFormEntity.associations).toStrictEqual({});
    });
  });

  describe("::toDto", () => {
    it("returns a DTO with all properties", () => {
      expect.assertions(1);
      const dto = defaultScimSettingsFormDto();
      const entity = new ScimSettingsFormEntity(dto);
      const result = entity.toDto();
      expect(result).toEqual(dto);
    });

    it("returns a DTO without optional props if not provided", () => {
      expect.assertions(2);
      const dto = minimalScimSettingsFormDto();
      const entity = new ScimSettingsFormEntity(dto);
      const result = entity.toDto();
      expect(result.secret_token).toBeUndefined();
      expect(result.id).toBeUndefined();
    });
  });
  describe("::createFromDefault", () => {
    it("should return the default settings", () => {
      expect.assertions(1);
      const uuid = uuidv4();
      const entity = ScimSettingsFormEntity.createFromDefault(uuid);
      expect(entity.scimUserId).toEqual(uuid);
    });
  });
});
