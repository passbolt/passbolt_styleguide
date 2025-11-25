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
import EntitySchema from "../abstract/entitySchema";
import RoleEntity from "./roleEntity";
import RolesCollection from "./rolesCollection";
import {rolesCollectionDto} from "./rolesCollection.test.data";
import {adminRoleDto, customRoleDto, guestRoleDto, userRoleDto} from "./roleEntity.test.data";

describe("RolesCollections", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(RolesCollection.ENTITY_NAME, RolesCollection.getSchema());
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);
      const collection = new RolesCollection([]);
      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTO is provided", () => {
      expect.assertions(4);
      const dto1 = adminRoleDto();
      const dto2 = guestRoleDto();
      const dtos = [dto1, dto2];
      const collection = new RolesCollection(dtos);
      expect(JSON.stringify(collection)).toEqual(JSON.stringify(dtos));
      expect(collection).toHaveLength(2);
      expect(collection.items[0].name).toEqual('admin');
      expect(collection.items[1].name).toEqual('guest');
    });

    it("works if valid complete entities are provided", () => {
      expect.assertions(3);
      const entity1 = new RoleEntity(adminRoleDto());
      const entity2 = new RoleEntity(guestRoleDto());
      const dtos = [entity1, entity2];
      const collection = new RolesCollection(dtos);
      expect(collection).toHaveLength(2);
      expect(collection.items[0]).toEqual(entity1);
      expect(collection.items[1]).toEqual(entity2);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);
      expect(() => new RolesCollection({})).toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dto1 = adminRoleDto();
      const dto2 = userRoleDto({id: 42});

      expect(() => new RolesCollection([dto1, dto2]))
        .toThrowCollectionValidationError("1.id.type");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dto1 = adminRoleDto();
      const dto2 = guestRoleDto({id: dto1.id});

      expect(() => new RolesCollection([dto1, dto2]))
        .toThrowCollectionValidationError("1.id.unique");
    });

    it("should throw if one of data item does not validate the unique name build rule", () => {
      expect.assertions(1);

      const dto1 = adminRoleDto();
      const dto2 = guestRoleDto({name: dto1.name});

      expect(() => new RolesCollection([dto1, dto2]))
        .toThrowCollectionValidationError("1.name.unique");
    });

    it("should throw if the collection is too large", () => {
      expect.assertions(1);

      const rolesCollection = [
        ...rolesCollectionDto,
        customRoleDto(),
        customRoleDto(),
        customRoleDto(),
        customRoleDto(),
      ];

      expect(() => new RolesCollection(rolesCollection)).toThrowCollectionValidationError("maxItems");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      expect.assertions(2);

      const dto1 = adminRoleDto();
      const dto2 = guestRoleDto({id: dto1.id});
      const dto3 = guestRoleDto({name: dto1.name});

      const collection = new RolesCollection([dto1, dto2, dto3], {ignoreInvalidEntity: true});
      expect(collection.items).toHaveLength(1);
      expect(collection.items[0].toDto()).toEqual(dto1);
    });

    it("should, with enabling the ignore invalid option, ignore the item count if the collection is too large", () => {
      expect.assertions(1);

      const rolesCollection = [
        ...rolesCollectionDto,
        customRoleDto(),
        customRoleDto(),
        customRoleDto(),
        customRoleDto(),
      ];

      expect(() => new RolesCollection(rolesCollection, {ignoreInvalidEntity: true})).toThrowCollectionValidationError("maxItems");
    });
  });

  describe("::filterByCustomRole", () => {
    it("should filter the collection by all custom roles", () => {
      expect.assertions(3);

      const collectionDto = [adminRoleDto(), userRoleDto(), guestRoleDto(), customRoleDto(), customRoleDto({name: "other-name"})];
      const rolesCollection = new RolesCollection(collectionDto);

      rolesCollection.filterByCustomRole();
      expect(rolesCollection).toHaveLength(2);
      expect(rolesCollection.items[0].toDto()).toStrictEqual(collectionDto[3]);
      expect(rolesCollection.items[1].toDto()).toStrictEqual(collectionDto[4]);
    });
  });
});
