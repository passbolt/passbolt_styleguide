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

import SmtpUsernamePasswordAuthenticationEntity from "./smtpUsernamePasswordAuthenticationEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import { defaultSmtpUsernamePasswordAuthenticationEntityDto } from "./smtpSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("SmtpUsernamePasswordAuthenticationEntity", () => {
  describe("SmtpUsernamePasswordAuthenticationEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        SmtpUsernamePasswordAuthenticationEntity.ENTITY_NAME,
        SmtpUsernamePasswordAuthenticationEntity.getSchema(),
      );
    });

    it("validates username property", () => {
      assertEntityProperty.string(SmtpUsernamePasswordAuthenticationEntity, "username");
      assertEntityProperty.maxLength(SmtpUsernamePasswordAuthenticationEntity, "username", 256);
      assertEntityProperty.required(SmtpUsernamePasswordAuthenticationEntity, "username");
    });

    it("validates password property", () => {
      assertEntityProperty.string(SmtpUsernamePasswordAuthenticationEntity, "password");
      assertEntityProperty.maxLength(SmtpUsernamePasswordAuthenticationEntity, "password", 4096);
      assertEntityProperty.required(SmtpUsernamePasswordAuthenticationEntity, "password");
    });
  });

  describe("::constructor", () => {
    it("works with valid DTO", () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto();
      const entity = new SmtpUsernamePasswordAuthenticationEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("accepts validate: false with partial data", () => {
      expect.assertions(1);

      const dto = { username: "test@example.com", password: "secret" };
      const entity = new SmtpUsernamePasswordAuthenticationEntity(dto, { validate: false });
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::validateBuildRules", () => {
    it("throws if host is missing (inherited from SmtpSettingsEntity)", () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto();
      delete dto.host;
      expect(() => new SmtpUsernamePasswordAuthenticationEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::getDefaultData", () => {
    it("returns username and password as empty strings and other auth fields as null", () => {
      expect.assertions(1);

      expect(SmtpUsernamePasswordAuthenticationEntity.getDefaultData()).toEqual({
        username: "",
        password: "",
        tenant_id: null,
        client_id: null,
        client_secret: null,
      });
    });
  });
});
