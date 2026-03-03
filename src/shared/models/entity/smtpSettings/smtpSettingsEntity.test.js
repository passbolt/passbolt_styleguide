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

import SmtpSettingsEntity from "./smtpSettingsEntity";
import EntitySchema from "../abstract/entitySchema";
import {
  defaultSmtpSettingsEntityDto,
  defaultSmtpNoneAuthenticationEntityDto,
  defaultSmtpUsernameAuthenticationEntityDto,
  defaultSmtpUsernamePasswordAuthenticationEntityDto,
  defaultSmtpOAuthCredentialsGrantSettingsEntityDto,
} from "./smtpSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SmtpNoneAuthenticationEntity from "./smtpNoneAuthenticationEntity";
import SmtpUsernameAuthenticationEntity from "./smtpUsernameAuthenticationEntity";
import SmtpUsernamePasswordAuthenticationEntity from "./smtpUsernamePasswordAuthenticationEntity";
import SmtpOAuthCredentialsGrantSettingsEntity from "./smtpOAuthCredentialsGrantSettingsEntity";

describe("SmtpSettingsEntity", () => {
  describe("SmtpSettingsEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SmtpSettingsEntity.ENTITY_NAME, SmtpSettingsEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "id");
      assertEntityProperty.uuid(SmtpSettingsEntity, "id");
      assertEntityProperty.notRequired(SmtpSettingsEntity, "id");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "created");
      assertEntityProperty.dateTime(SmtpSettingsEntity, "created");
      assertEntityProperty.notRequired(SmtpSettingsEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "modified");
      assertEntityProperty.dateTime(SmtpSettingsEntity, "modified");
      assertEntityProperty.notRequired(SmtpSettingsEntity, "modified");
    });

    it("validates source property", () => {
      assertEntityProperty.enumeration(
        SmtpSettingsEntity,
        "source",
        [
          SmtpSettingsEntity.SETTINGS_SOURCE_DEFAULT,
          SmtpSettingsEntity.SETTINGS_SOURCE_ENV,
          SmtpSettingsEntity.SETTINGS_SOURCE_DB,
          SmtpSettingsEntity.SETTINGS_SOURCE_FILE,
        ],
        ["invalid-source"],
      );
      assertEntityProperty.notRequired(SmtpSettingsEntity, "source");
    });

    it("validates host property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "host");
      assertEntityProperty.minLength(SmtpSettingsEntity, "host", 1);
      assertEntityProperty.maxLength(SmtpSettingsEntity, "host", 256);
      assertEntityProperty.required(SmtpSettingsEntity, "host");
    });

    it("validates port property", () => {
      assertEntityProperty.integer(SmtpSettingsEntity, "port");
      assertEntityProperty.minimum(SmtpSettingsEntity, "port", 1);
      assertEntityProperty.maximum(SmtpSettingsEntity, "port", 65535);
      assertEntityProperty.required(SmtpSettingsEntity, "port");
    });

    it("validates tls property", () => {
      assertEntityProperty.boolean(SmtpSettingsEntity, "tls");
      assertEntityProperty.nullable(SmtpSettingsEntity, "tls");
      assertEntityProperty.notRequired(SmtpSettingsEntity, "tls");
    });

    it("validates client property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "client");
      assertEntityProperty.nullable(SmtpSettingsEntity, "client");
      assertEntityProperty.maxLength(SmtpSettingsEntity, "client", 2048);
      assertEntityProperty.notRequired(SmtpSettingsEntity, "client");
    });

    it("validates sender_name property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "sender_name");
      assertEntityProperty.minLength(SmtpSettingsEntity, "sender_name", 1);
      assertEntityProperty.maxLength(SmtpSettingsEntity, "sender_name", 256);
      assertEntityProperty.required(SmtpSettingsEntity, "sender_name");
    });

    it("validates sender_email property", () => {
      assertEntityProperty.string(SmtpSettingsEntity, "sender_email");
      assertEntityProperty.emailFormat(SmtpSettingsEntity, "sender_email");
      assertEntityProperty.maxLength(SmtpSettingsEntity, "sender_email", 256);
      assertEntityProperty.required(SmtpSettingsEntity, "sender_email");
    });
  });

  describe("::constructor", () => {
    it("works with valid minimal DTO", () => {
      expect.assertions(1);

      const dto = defaultSmtpSettingsEntityDto();
      const entity = new SmtpSettingsEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("works with optional client field", () => {
      expect.assertions(1);

      const dto = defaultSmtpSettingsEntityDto({ client: "passbolt.dev" });
      const entity = new SmtpSettingsEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::createFromSettings", () => {
    it("returns a SmtpOAuthCredentialsGrantSettingsEntity when client_id is set", () => {
      expect.assertions(1);
      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpOAuthCredentialsGrantSettingsEntity);
    });

    it("returns a SmtpNoneAuthenticationEntity when username is undefined", () => {
      expect.assertions(1);
      const dto = defaultSmtpNoneAuthenticationEntityDto();
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpNoneAuthenticationEntity);
    });

    it("returns a SmtpNoneAuthenticationEntity when username is null", () => {
      expect.assertions(1);
      const dto = defaultSmtpNoneAuthenticationEntityDto({ username: null });
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpNoneAuthenticationEntity);
    });

    it("returns a SmtpUsernameAuthenticationEntity when username is set and password is undefined", () => {
      expect.assertions(1);
      const dto = defaultSmtpUsernameAuthenticationEntityDto();
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpUsernameAuthenticationEntity);
    });

    it("returns a SmtpUsernameAuthenticationEntity when username is set and password is null", () => {
      expect.assertions(1);
      const dto = defaultSmtpUsernameAuthenticationEntityDto({ password: null });
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpUsernameAuthenticationEntity);
    });

    it("returns a SmtpUsernamePasswordAuthenticationEntity when username and password are both set", () => {
      expect.assertions(1);
      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto();
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpUsernamePasswordAuthenticationEntity);
    });

    it("does not return a SmtpNoneAuthenticationEntity when username is an empty string", () => {
      expect.assertions(1);
      const dto = defaultSmtpNoneAuthenticationEntityDto({ username: "" });
      expect(SmtpSettingsEntity.createFromSettings(dto)).not.toBeInstanceOf(SmtpNoneAuthenticationEntity);
    });

    it("returns a SmtpUsernamePasswordAuthenticationEntity when username is set and password is an empty string", () => {
      expect.assertions(1);
      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto({ password: "" });
      expect(SmtpSettingsEntity.createFromSettings(dto)).toBeInstanceOf(SmtpUsernamePasswordAuthenticationEntity);
    });

    it("returns a SmtpOAuthCredentialsGrantSettingsEntity when client_id is an empty string", () => {
      expect.assertions(1);
      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto({ client_id: "" });
      expect(SmtpSettingsEntity.createFromSettings(dto, { validate: false })).toBeInstanceOf(
        SmtpOAuthCredentialsGrantSettingsEntity,
      );
    });

    it("forwards options to the sub-entity constructor", () => {
      expect.assertions(1);
      // validate:false allows empty/invalid data without throwing
      expect(() => SmtpSettingsEntity.createFromSettings({}, { validate: false })).not.toThrow();
    });
  });
});
