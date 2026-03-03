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
 * @since         5.11.0
 */

import SmtpOAuthCredentialsGrantSettingsEntity from "./smtpOAuthCredentialsGrantSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import { defaultSmtpOAuthCredentialsGrantSettingsEntityDto } from "./smtpSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("SmtpOAuthCredentialsGrantSettingsEntity", () => {
  describe("SmtpOAuthCredentialsGrantSettingsEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        SmtpOAuthCredentialsGrantSettingsEntity.ENTITY_NAME,
        SmtpOAuthCredentialsGrantSettingsEntity.getSchema(),
      );
    });

    it("validates oauth_username property", () => {
      assertEntityProperty.string(SmtpOAuthCredentialsGrantSettingsEntity, "oauth_username");
      assertEntityProperty.maxLength(SmtpOAuthCredentialsGrantSettingsEntity, "oauth_username", 256);
      assertEntityProperty.required(SmtpOAuthCredentialsGrantSettingsEntity, "oauth_username");
    });

    it("validates tenant_id property", () => {
      assertEntityProperty.string(SmtpOAuthCredentialsGrantSettingsEntity, "tenant_id");
      assertEntityProperty.uuid(SmtpOAuthCredentialsGrantSettingsEntity, "tenant_id");
      assertEntityProperty.required(SmtpOAuthCredentialsGrantSettingsEntity, "tenant_id");
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(SmtpOAuthCredentialsGrantSettingsEntity, "client_id");
      assertEntityProperty.uuid(SmtpOAuthCredentialsGrantSettingsEntity, "client_id");
      assertEntityProperty.required(SmtpOAuthCredentialsGrantSettingsEntity, "client_id");
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(SmtpOAuthCredentialsGrantSettingsEntity, "client_secret");
      assertEntityProperty.maxLength(SmtpOAuthCredentialsGrantSettingsEntity, "client_secret", 256);
      assertEntityProperty.required(SmtpOAuthCredentialsGrantSettingsEntity, "client_secret");
    });
  });

  describe("::constructor", () => {
    it("works with valid DTO", () => {
      expect.assertions(1);

      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      const entity = new SmtpOAuthCredentialsGrantSettingsEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("accepts validate: false with partial data", () => {
      expect.assertions(1);

      const dto = {
        tenant_id: "550e8400-e29b-41d4-a716-446655440001",
        client_id: "550e8400-e29b-41d4-a716-446655440002",
        client_secret: "secret-789",
        oauth_username: "user@office365.com",
      };
      const entity = new SmtpOAuthCredentialsGrantSettingsEntity(dto, { validate: false });
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::validateBuildRules", () => {
    it("throws if host is missing (inherited from SmtpSettingsEntity)", () => {
      expect.assertions(1);

      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      delete dto.host;
      expect(() => new SmtpOAuthCredentialsGrantSettingsEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::getDefaultData", () => {
    it("returns oauth_username, tenant_id, client_id and client_secret as empty strings and password as null", () => {
      expect.assertions(1);

      expect(SmtpOAuthCredentialsGrantSettingsEntity.getDefaultData()).toEqual({
        oauth_username: "",
        password: null,
        tenant_id: "",
        client_id: "",
        client_secret: "",
      });
    });
  });
});
