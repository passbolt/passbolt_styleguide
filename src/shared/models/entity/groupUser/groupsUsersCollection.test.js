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
 * @since         2.13.0
 */
import GroupsUsersCollection from "./groupsUsersCollection";
import EntitySchema from "../abstract/entitySchema";
import {defaultGroupUser} from "../groupUser/groupUserEntity.test.data.js";
import GroupUserEntity from "../groupUser/groupUserEntity";

describe("Groups users collection", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(GroupsUsersCollection.ENTITY_NAME, GroupsUsersCollection.getSchema());
  });

  describe("GroupsCollection::constructor", () => {
    it("works with empty collection", () => {
      new GroupsUsersCollection([]);
    });

    it("works if valid minimal DTO is provided", () => {
      const dto1 = defaultGroupUser({});
      const dto2 = defaultGroupUser({is_admin: true});
      const dto3 = defaultGroupUser({});
      const dtos = [dto1, dto2, dto3];
      const collection = new GroupsUsersCollection(dtos);

      expect.assertions(16);
      expect(collection.items).toHaveLength(3);
      expect(collection.items[0]).toBeInstanceOf(GroupUserEntity);
      expect(collection.items[0]._props.id).toEqual(dto1.id);
      expect(collection.items[0]._props.user_id).toEqual(dto1.user_id);
      expect(collection.items[0]._props.group_id).toEqual(dto1.group_id);
      expect(collection.items[0]._props.is_admin).toEqual(dto1.is_admin);
      expect(collection.items[1]).toBeInstanceOf(GroupUserEntity);
      expect(collection.items[1]._props.id).toEqual(dto2.id);
      expect(collection.items[1]._props.user_id).toEqual(dto2.user_id);
      expect(collection.items[1]._props.group_id).toEqual(dto2.group_id);
      expect(collection.items[1]._props.is_admin).toEqual(dto2.is_admin);
      expect(collection.items[2]).toBeInstanceOf(GroupUserEntity);
      expect(collection.items[2]._props.id).toEqual(dto3.id);
      expect(collection.items[2]._props.user_id).toEqual(dto3.user_id);
      expect(collection.items[2]._props.group_id).toEqual(dto3.group_id);
      expect(collection.items[2]._props.is_admin).toEqual(dto3.is_admin);
    });

    it("works if valid group user entity is provided", () => {
      const entity = new GroupUserEntity(defaultGroupUser());
      const dtos = [entity];
      const collection = new GroupsUsersCollection(dtos);

      expect.assertions(6);
      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]).toBeInstanceOf(GroupUserEntity);
      expect(collection.items[0]._props.id).toEqual(entity._props.id);
      expect(collection.items[0]._props.user_id).toEqual(entity._props.user_id);
      expect(collection.items[0]._props.group_id).toEqual(entity._props.group_id);
      expect(collection.items[0]._props.is_admin).toEqual(entity._props.is_admin);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);
      expect(() => new GroupsUsersCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the collection entity schema", () => {
      const dto1 = defaultGroupUser();
      const dto2 = defaultGroupUser({id: 42});

      expect.assertions(1);
      expect(() => new GroupsUsersCollection([dto1, dto2]))
        .toThrowCollectionValidationError("1.id.type");
    });

    it("should, with enabling the ignore invalid option, ignore group user which do not validate their schema", () => {
      const dto1 = defaultGroupUser();
      const dto2 = defaultGroupUser({group_id: 42});
      const dto3 = defaultGroupUser();

      expect.assertions(3);
      const collection = new GroupsUsersCollection([dto1, dto2, dto3], {ignoreInvalidEntity: true});
      expect(collection.items).toHaveLength(2);
      expect(collection.items[0].id).toEqual(dto1.id);
      expect(collection.items[1].id).toEqual(dto3.id);
    });
  });
});
