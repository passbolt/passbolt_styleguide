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
 * @since         5.0.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SecretDataV5DefaultEntity from "./secretDataV5DefaultEntity";
import {defaultSecretDataV5DefaultDto, minimalDefaultSecretDataV5DefaultDto} from "./secretDataV5DefaultEntity.test.data";

describe("secretDataV5PasswordStringEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5DefaultEntity.name, SecretDataV5DefaultEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataV5DefaultEntity, "object_type");
      assertEntityProperty.required(SecretDataV5DefaultEntity, "object_type");
      assertEntityProperty.enumeration(SecretDataV5DefaultEntity, "object_type", ["PASSBOLT_SECRET_DATA"], ["any other values"]);
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV5DefaultEntity, "password");
      assertEntityProperty.nullable(SecretDataV5DefaultEntity, "password");
      assertEntityProperty.maxLength(SecretDataV5DefaultEntity, "password", 4096);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(2);
      const dto = minimalDefaultSecretDataV5DefaultDto();
      const entity = new SecretDataV5DefaultEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toBeNull();
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);

      const dto = defaultSecretDataV5DefaultDto();
      const entity = new SecretDataV5DefaultEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual(dto.password);
    });
  });
});
