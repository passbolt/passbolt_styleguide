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

import SmtpNoneAuthenticationEntity from "./smtpNoneAuthenticationEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import { defaultSmtpNoneAuthenticationEntityDto } from "./smtpSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SmtpSettingsEntity from "./smtpSettingsEntity";

describe("SmtpNoneAuthenticationEntity", () => {
  describe("SmtpNoneAuthenticationEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SmtpNoneAuthenticationEntity.ENTITY_NAME, SmtpNoneAuthenticationEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "id");
      assertEntityProperty.uuid(SmtpNoneAuthenticationEntity, "id");
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "id");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "created");
      assertEntityProperty.dateTime(SmtpNoneAuthenticationEntity, "created");
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "modified");
      assertEntityProperty.dateTime(SmtpNoneAuthenticationEntity, "modified");
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "modified");
    });

    it("validates source property", () => {
      assertEntityProperty.enumeration(
        SmtpNoneAuthenticationEntity,
        "source",
        [
          SmtpSettingsEntity.SETTINGS_SOURCE_DEFAULT,
          SmtpSettingsEntity.SETTINGS_SOURCE_ENV,
          SmtpSettingsEntity.SETTINGS_SOURCE_DB,
          SmtpSettingsEntity.SETTINGS_SOURCE_FILE,
        ],
        ["invalid-source"],
      );
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "source");
    });

    it("validates host property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "host");
      assertEntityProperty.minLength(SmtpNoneAuthenticationEntity, "host", 1);
      assertEntityProperty.maxLength(SmtpNoneAuthenticationEntity, "host", 256);
      assertEntityProperty.required(SmtpNoneAuthenticationEntity, "host");
    });

    it("validates port property", () => {
      assertEntityProperty.integer(SmtpNoneAuthenticationEntity, "port");
      assertEntityProperty.minimum(SmtpNoneAuthenticationEntity, "port", 1);
      assertEntityProperty.maximum(SmtpNoneAuthenticationEntity, "port", 65535);
      assertEntityProperty.required(SmtpNoneAuthenticationEntity, "port");
    });

    it("validates tls property", () => {
      assertEntityProperty.boolean(SmtpNoneAuthenticationEntity, "tls");
      assertEntityProperty.nullable(SmtpNoneAuthenticationEntity, "tls");
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "tls");
    });

    it("validates client property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "client");
      assertEntityProperty.nullable(SmtpNoneAuthenticationEntity, "client");
      assertEntityProperty.maxLength(SmtpNoneAuthenticationEntity, "client", 2048);
      assertEntityProperty.notRequired(SmtpNoneAuthenticationEntity, "client");
    });

    it("validates sender_name property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "sender_name");
      assertEntityProperty.minLength(SmtpNoneAuthenticationEntity, "sender_name", 1);
      assertEntityProperty.maxLength(SmtpNoneAuthenticationEntity, "sender_name", 256);
      assertEntityProperty.required(SmtpNoneAuthenticationEntity, "sender_name");
    });

    it("validates sender_email property", () => {
      assertEntityProperty.string(SmtpNoneAuthenticationEntity, "sender_email");
      assertEntityProperty.emailFormat(SmtpNoneAuthenticationEntity, "sender_email");
      assertEntityProperty.maxLength(SmtpNoneAuthenticationEntity, "sender_email", 256);
      assertEntityProperty.required(SmtpNoneAuthenticationEntity, "sender_email");
    });
  });

  describe("::constructor", () => {
    it("works with valid DTO", () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = new SmtpNoneAuthenticationEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("accepts validate: false with partial data", () => {
      expect.assertions(1);

      const entity = new SmtpNoneAuthenticationEntity({}, { validate: false });
      expect(entity.toDto()).toEqual({});
    });
  });

  describe("::validateBuildRules", () => {
    it("throws if host is missing", () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      delete dto.host;
      expect(() => new SmtpNoneAuthenticationEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::getDefaultData", () => {
    it("returns an empty object", () => {
      expect.assertions(1);
      expect(SmtpNoneAuthenticationEntity.getDefaultData()).toEqual({});
    });
  });
});
