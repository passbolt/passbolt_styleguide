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
 * @since         5.6.0
 */

import EntitySchema from "../abstract/entitySchema";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import SecretDataV5StandaloneNoteEntity from "./secretDataV5StandaloneNoteEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultSecretDataV5StandaloneNoteDto} from "./secretDataV5StandaloneNoteEntity.test.data";

describe("secretDataV5StandaloneNoteEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5StandaloneNoteEntity.name, SecretDataV5StandaloneNoteEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.enumeration(SecretDataV5StandaloneNoteEntity, "object_type", [SECRET_DATA_OBJECT_TYPE], ["any other values"]);
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV5StandaloneNoteEntity, "description");
      assertEntityProperty.required(SecretDataV5StandaloneNoteEntity, "description");
      assertEntityProperty.maxLength(SecretDataV5StandaloneNoteEntity, "description", 50000);
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);

      const dto = defaultSecretDataV5StandaloneNoteDto();
      const entity = new SecretDataV5StandaloneNoteEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });


  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5StandaloneNoteDto();
      const entity = SecretDataV5StandaloneNoteEntity.createFromDefault({});

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.description).toStrictEqual("");
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5StandaloneNoteDto();
      const entity = SecretDataV5StandaloneNoteEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default description", () => {
      expect.assertions(1);
      expect(SecretDataV5StandaloneNoteEntity.getDefaultProp("description")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV5StandaloneNoteEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV5StandaloneNoteEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = defaultSecretDataV5StandaloneNoteDto();
      const entity = SecretDataV5StandaloneNoteEntity.createFromDefault(dto);
      expect(entity.areSecretsDifferent({description: ""})).toBeTruthy();
    });

    it("should return false", () => {
      const dto = defaultSecretDataV5StandaloneNoteDto();
      const entity = new SecretDataV5StandaloneNoteEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
