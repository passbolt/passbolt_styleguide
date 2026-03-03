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

import SmtpUsernameAuthenticationEntity from "./smtpUsernameAuthenticationEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import { defaultSmtpUsernameAuthenticationEntityDto } from "./smtpSettingsEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("SmtpUsernameAuthenticationEntity", () => {
  describe("SmtpUsernameAuthenticationEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        SmtpUsernameAuthenticationEntity.ENTITY_NAME,
        SmtpUsernameAuthenticationEntity.getSchema(),
      );
    });

    it("validates username property", () => {
      assertEntityProperty.string(SmtpUsernameAuthenticationEntity, "username");
      assertEntityProperty.maxLength(SmtpUsernameAuthenticationEntity, "username", 256);
      assertEntityProperty.required(SmtpUsernameAuthenticationEntity, "username");
    });
  });

  describe("::constructor", () => {
    it("works with valid DTO", () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernameAuthenticationEntityDto();
      const entity = new SmtpUsernameAuthenticationEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("accepts validate: false with partial data", () => {
      expect.assertions(1);

      const dto = { username: "test@example.com" };
      const entity = new SmtpUsernameAuthenticationEntity(dto, { validate: false });
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::validateBuildRules", () => {
    it("throws if host is missing (inherited from SmtpSettingsEntity)", () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernameAuthenticationEntityDto();
      delete dto.host;
      expect(() => new SmtpUsernameAuthenticationEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::getDefaultData", () => {
    it("returns username as empty string and other auth fields as null", () => {
      expect.assertions(1);

      expect(SmtpUsernameAuthenticationEntity.getDefaultData()).toEqual({
        username: "",
        password: null,
        tenant_id: null,
        client_id: null,
        client_secret: null,
      });
    });
  });
});
