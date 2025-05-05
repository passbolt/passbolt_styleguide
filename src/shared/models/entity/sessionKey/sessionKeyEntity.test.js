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
 * @since         4.10.1
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SessionKeyEntity from "./sessionKeyEntity";
import {defaultSessionKeyDto} from "./sessionKeyEntity.test.data";

describe("SessionKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeyEntity.name, SessionKeyEntity.getSchema());
    });

    it("validates foreign_id property", () => {
      assertEntityProperty.uuid(SessionKeyEntity, "foreign_id");
      assertEntityProperty.required(SessionKeyEntity, "foreign_id");
    });

    it("validates foreign_model property", () => {
      const successEnumerations = ["Resource", "Folder", "Tag"];
      const failEnumerations = ["resource", "folder", "tag", "", "fail"];
      assertEntityProperty.string(SessionKeyEntity, "foreign_model");
      assertEntityProperty.enumeration(SessionKeyEntity, "foreign_model", successEnumerations, failEnumerations);
      assertEntityProperty.required(SessionKeyEntity, "foreign_model");
    });

    it("validates session_key property", () => {
      assertEntityProperty.string(SessionKeyEntity, "session_key");
      assertEntityProperty.required(SessionKeyEntity, "session_key");
      assertEntityProperty.sessionKey(SessionKeyEntity, "session_key");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SessionKeyEntity, "modified");
      assertEntityProperty.notRequired(SessionKeyEntity, "modified");
      assertEntityProperty.dateTime(SessionKeyEntity, "modified");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(4);
      const dto = defaultSessionKeyDto();
      const entity = new SessionKeyEntity(dto);

      expect(entity._props.foreign_id).toStrictEqual(dto.foreign_id);
      expect(entity._props.foreign_model).toStrictEqual(dto.foreign_model);
      expect(entity._props.session_key).toStrictEqual(dto.session_key);
      expect(entity._props.modified).toStrictEqual(dto.modified);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(4);
      const dto = defaultSessionKeyDto({foreign_model: "Folder"});
      const entity = new SessionKeyEntity(dto);

      expect(entity._props.foreign_id).toStrictEqual(dto.foreign_id);
      expect(entity._props.foreign_model).toStrictEqual(dto.foreign_model);
      expect(entity._props.session_key).toStrictEqual(dto.session_key);
      expect(entity._props.modified).toStrictEqual(dto.modified);
    });
  });

  describe("::getters", () => {
    it("`foreignModel` should return the right value", () => {
      expect.assertions(2);
      const dto1 = defaultSessionKeyDto();
      const entity1 = new SessionKeyEntity(dto1);

      const dto2 = defaultSessionKeyDto({foreign_model: "Tag"});
      const entity2 = new SessionKeyEntity(dto2);

      expect(entity1.foreignModel).toBe(dto1.foreign_model);
      expect(entity2.foreignModel).toStrictEqual(dto2.foreign_model);
    });

    it("`foreign_id` should return the right value", () => {
      expect.assertions(1);
      const dto1 = defaultSessionKeyDto();
      const entity1 = new SessionKeyEntity(dto1);

      expect(entity1.foreignId).toStrictEqual(dto1.foreign_id);
    });

    it("`session_key` should return the right value", () => {
      expect.assertions(1);
      const dto1 = defaultSessionKeyDto();
      const entity1 = new SessionKeyEntity(dto1);

      expect(entity1.sessionKey).toStrictEqual(dto1.session_key);
    });
  });

  describe("::dtDto", () => {
    it("to dto", () => {
      expect.assertions(1);
      // default session key dto
      const dto1 = defaultSessionKeyDto();
      const entity1 = new SessionKeyEntity(dto1);
      expect(entity1.toDto()).toEqual(dto1);
    });
  });
});
