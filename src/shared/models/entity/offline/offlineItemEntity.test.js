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
 * @since         5.13.0
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import OfflineItemEntity from "./offlineItemEntity";
import { defaultOfflineItemDto } from "./offlineItemEntity.test.data";
import { v4 as uuidv4 } from "uuid";

describe("OfflineItemEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(OfflineItemEntity.name, OfflineItemEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(OfflineItemEntity, "id");
      assertEntityProperty.required(OfflineItemEntity, "id");
    });

    it("validates foreign_model property", () => {
      const successEnumerations = ["Resource", "Folder"];
      const failEnumerations = ["resource", "folder", "", "fail"];
      assertEntityProperty.string(OfflineItemEntity, "foreign_model");
      assertEntityProperty.enumeration(OfflineItemEntity, "foreign_model", successEnumerations, failEnumerations);
      assertEntityProperty.required(OfflineItemEntity, "foreign_model");
    });

    it("validates foreign key property", () => {
      assertEntityProperty.uuid(OfflineItemEntity, "foreign_key");
      assertEntityProperty.required(OfflineItemEntity, "foreign_key");
    });

    it("validates user id property", () => {
      assertEntityProperty.uuid(OfflineItemEntity, "user_id");
      assertEntityProperty.required(OfflineItemEntity, "user_id");
    });

    it("validates created property", () => {
      assertEntityProperty.string(OfflineItemEntity, "created");
      assertEntityProperty.dateTime(OfflineItemEntity, "created");
      assertEntityProperty.required(OfflineItemEntity, "created");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(OfflineItemEntity, "created_by");
      assertEntityProperty.required(OfflineItemEntity, "created_by");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(6);
      const dto = defaultOfflineItemDto();
      const entity = new OfflineItemEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.foreign_model).toStrictEqual(dto.foreign_model);
      expect(entity._props.foreign_key).toStrictEqual(dto.foreign_key);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
    });
  });

  describe("::getters", () => {
    it("`created` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultOfflineItemDto({ created: "2024-10-05T12:10:00+00:00" });
      const entity = new OfflineItemEntity(dto);

      expect(entity.created).toStrictEqual(dto.created);
    });

    it("`id` should return the right value", () => {
      expect.assertions(1);
      const id = uuidv4();
      const dto1 = defaultOfflineItemDto({ id: id });
      const entity1 = new OfflineItemEntity(dto1);

      expect(entity1.id).toStrictEqual(id);
    });

    it("`foreign_model` should return the right value", () => {
      expect.assertions(1);
      const foreign_model = "Folder";
      const dto1 = defaultOfflineItemDto({ foreign_model });
      const entity1 = new OfflineItemEntity(dto1);

      expect(entity1.foreignModel).toStrictEqual(foreign_model);
    });

    it("`foreign_key` should return the right value", () => {
      expect.assertions(1);
      const foreign_key = uuidv4();
      const dto1 = defaultOfflineItemDto({ foreign_key });
      const entity1 = new OfflineItemEntity(dto1);

      expect(entity1.foreignKey).toStrictEqual(foreign_key);
    });

    it("`user_id` should return the right value", () => {
      expect.assertions(1);
      const user_id = uuidv4();
      const dto1 = defaultOfflineItemDto({ user_id });
      const entity1 = new OfflineItemEntity(dto1);

      expect(entity1.userId).toStrictEqual(user_id);
    });

    it("`created` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultOfflineItemDto({ created: "2022-10-11T08:09:00+00:00" });
      const entity = new OfflineItemEntity(dto);
      expect(entity.created).toStrictEqual(dto.created);
    });

    it("`created_by` should return the right value", () => {
      expect.assertions(1);
      const created_by = uuidv4();
      const dto1 = defaultOfflineItemDto({ created_by });
      const entity1 = new OfflineItemEntity(dto1);

      expect(entity1.createdBy).toStrictEqual(created_by);
    });
  });

  describe("::toDto", () => {
    it("default to dto", () => {
      expect.assertions(1);
      // minimal set with the data property
      const dto = defaultOfflineItemDto();
      const entity = new OfflineItemEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });
  });
});
