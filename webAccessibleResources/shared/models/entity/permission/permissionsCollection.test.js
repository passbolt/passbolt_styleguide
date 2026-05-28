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
import PermissionEntity from "./permissionEntity";
import EntitySchema from "../abstract/entitySchema";
import PermissionsCollection from "./permissionsCollection";
import {
  defaultPermissionDto,
  minimumPermissionDto,
  ownerFolderPermissionDto,
  ownerMinimalFolderPermissionDto,
  ownerPermissionDto,
  readMinimalFolderPermissionDto,
  readPermissionDto,
  updateFolderPermissionDto,
  updateMinimalFolderPermissionDto,
} from "./permissionEntity.test.data";
import { defaultPermissionsDtos } from "./permissionCollection.test.data";
import { defaultUserDto } from "../user/userEntity.test.data";
import { defaultGroupDto } from "../group/groupEntity.test.data";

describe("PermissionsCollection", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(PermissionsCollection.ENTITY_NAME, PermissionsCollection.getSchema());
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);
      const collection = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTOs are provided", () => {
      expect.assertions(21);
      const acoForeignKey = crypto.randomUUID();
      const dto1 = minimumPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = minimumPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto3 = minimumPermissionDto({ aco_foreign_key: acoForeignKey });
      const dtos = [dto1, dto2, dto3];
      const collection = new PermissionsCollection(dtos);
      expect(collection.items).toHaveLength(3);
      expect(collection.toDto()).toEqual(dtos);
      expect(JSON.stringify(collection)).toEqual(JSON.stringify(dtos));
      expect(collection.items[0]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[0]._props.aco).toEqual(dto1.aco);
      expect(collection.items[0]._props.aco_foreign_key).toEqual(dto1.aco_foreign_key);
      expect(collection.items[0]._props.aro).toEqual(dto1.aro);
      expect(collection.items[0]._props.aro_foreign_key).toEqual(dto1.aro_foreign_key);
      expect(collection.items[0]._props.type).toEqual(dto1.type);
      expect(collection.items[1]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[1]._props.aco).toEqual(dto2.aco);
      expect(collection.items[1]._props.aco_foreign_key).toEqual(dto2.aco_foreign_key);
      expect(collection.items[1]._props.aro).toEqual(dto2.aro);
      expect(collection.items[1]._props.aro_foreign_key).toEqual(dto2.aro_foreign_key);
      expect(collection.items[1]._props.type).toEqual(dto2.type);
      expect(collection.items[2]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[2]._props.aco).toEqual(dto3.aco);
      expect(collection.items[2]._props.aco_foreign_key).toEqual(dto3.aco_foreign_key);
      expect(collection.items[2]._props.aro).toEqual(dto3.aro);
      expect(collection.items[2]._props.aro_foreign_key).toEqual(dto3.aro_foreign_key);
      expect(collection.items[2]._props.type).toEqual(dto3.type);
    });

    it("works if valid complete entities are provided", () => {
      expect.assertions(19);
      const acoForeignKey = crypto.randomUUID();
      const entity1 = new PermissionEntity(defaultPermissionDto({ aco_foreign_key: acoForeignKey }));
      const entity2 = new PermissionEntity(defaultPermissionDto({ aco_foreign_key: acoForeignKey }));
      const entity3 = new PermissionEntity(defaultPermissionDto({ aco_foreign_key: acoForeignKey }));
      const entities = [entity1, entity2, entity3];
      const collection = new PermissionsCollection(entities);
      expect(collection.items).toHaveLength(3);
      expect(collection.items[0]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[0]._props.aco).toEqual(entity1.aco);
      expect(collection.items[0]._props.aco_foreign_key).toEqual(entity1.acoForeignKey);
      expect(collection.items[0]._props.aro).toEqual(entity1.aro);
      expect(collection.items[0]._props.aro_foreign_key).toEqual(entity1.aroForeignKey);
      expect(collection.items[2]._props.type).toEqual(entity1.type);
      expect(collection.items[1]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[1]._props.aco).toEqual(entity2.aco);
      expect(collection.items[1]._props.aco_foreign_key).toEqual(entity2.acoForeignKey);
      expect(collection.items[1]._props.aro).toEqual(entity2.aro);
      expect(collection.items[1]._props.aro_foreign_key).toEqual(entity2.aroForeignKey);
      expect(collection.items[2]._props.type).toEqual(entity2.type);
      expect(collection.items[2]).toBeInstanceOf(PermissionEntity);
      expect(collection.items[2]._props.aco).toEqual(entity3.aco);
      expect(collection.items[2]._props.aco_foreign_key).toEqual(entity3.acoForeignKey);
      expect(collection.items[2]._props.aro).toEqual(entity3.aro);
      expect(collection.items[2]._props.aro_foreign_key).toEqual(entity3.aroForeignKey);
      expect(collection.items[2]._props.type).toEqual(entity3.type);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);
      expect(() => new PermissionsCollection({})).toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the collection entity schema", () => {
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, id: 42 });

      expect.assertions(1);
      expect(() => new PermissionsCollection([dto1, dto2])).toThrowCollectionValidationError("1.id.type");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, id: dto1.id });

      expect.assertions(1);
      expect(() => new PermissionsCollection([dto1, dto2])).toThrowCollectionValidationError("1.id.unique");
    });

    it("should throw if one of data item does not validate the unique user id build rule", () => {
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, aro_foreign_key: dto1.aro_foreign_key });

      expect.assertions(1);
      expect(() => new PermissionsCollection([dto1, dto2])).toThrowCollectionValidationError(
        "1.aro_foreign_key.unique",
      );
    });

    it("should throw if one of data item does not validate the same aco_foreign_key build rule", () => {
      const dto1 = defaultPermissionDto();
      const dto2 = defaultPermissionDto();

      expect.assertions(1);
      expect(() => new PermissionsCollection([dto1, dto2])).toThrowCollectionValidationError(
        "1.aco_foreign_key.same_aco",
      );
    });

    it("should throw if one of data item does not validate the owner build rule", () => {
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, type: PermissionEntity.PERMISSION_READ });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, type: PermissionEntity.PERMISSION_UPDATE });

      expect.assertions(1);
      expect(() => new PermissionsCollection([dto1, dto2])).toThrowCollectionValidationError("owner");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      const acoForeignKey = crypto.randomUUID();
      const dto1 = readPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, type: 42 });
      const dto3 = ownerPermissionDto({ aco_foreign_key: acoForeignKey });

      expect.assertions(3);
      const collection = new PermissionsCollection([dto1, dto2, dto3], { ignoreInvalidEntity: true });
      expect(collection.items).toHaveLength(2);
      expect(collection.items[0].id).toEqual(dto1.id);
      expect(collection.items[1].id).toEqual(dto3.id);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async () => {
      const count = 10_000;
      const dtos = defaultPermissionsDtos({}, { count });

      const start = performance.now();
      const collection = new PermissionsCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(5_000);
    });
  });

  describe("::addOrReplace", () => {
    it("should throw if the permission does not validate its schema", () => {
      expect.assertions(1);
      const collection = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      expect(() => collection.addOrReplace({})).toThrowEntityValidationError("aco", "required");
    });

    it("should throw if the permission has the same id but does not validate the same aco build rule", () => {
      expect.assertions(1);
      const dto1 = updateFolderPermissionDto();
      const dto2 = ownerFolderPermissionDto({ id: dto1.id });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      expect(() => collection.addOrReplace(dto2)).toThrowEntityValidationError("aco_foreign_key", "same_aco");
    });

    it("should throw if the permission is owned by a matching aro does not validate the same aco build rule", () => {
      expect.assertions(1);
      const dto1 = updateMinimalFolderPermissionDto();
      const dto2 = ownerMinimalFolderPermissionDto({ aro: dto1.aro, aro_foreign_key: dto1.aro_foreign_key });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });

      expect(() => collection.addOrReplace(dto2)).toThrowEntityValidationError("aco_foreign_key", "same_aco");
    });

    it("should not throw if the owner build rules does not validate after adding or replacing a permission", () => {
      expect.assertions(2);
      const dto1 = readMinimalFolderPermissionDto();
      const dto2 = updateMinimalFolderPermissionDto({ aco: dto1.aco, aco_foreign_key: dto1.aco_foreign_key });
      const dto3 = updateMinimalFolderPermissionDto({
        aco: dto1.aco,
        aco_foreign_key: dto1.aco_foreign_key,
        aro: dto1.aro,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(dto2);
      expect(collection.permissions.length).toBe(2);
      collection.addOrReplace(new PermissionEntity(dto3));
      expect(collection.permissions.length).toBe(2);
    });

    it("adds a permission to the collection if the collection is empty", () => {
      expect.assertions(3);
      const dto1 = ownerFolderPermissionDto();
      const collection = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      collection.addOrReplace(dto1);
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0]).toBeInstanceOf(PermissionEntity);
      expect(collection.permissions[0].id).toEqual(dto1.id);
    });

    it("adds a permission to the collection if there is no matching permission to replace", () => {
      expect.assertions(3);
      const dto1 = ownerFolderPermissionDto();
      const dto2 = ownerFolderPermissionDto({ aco_foreign_key: dto1.aco_foreign_key });
      const collection = new PermissionsCollection([dto1]);
      collection.addOrReplace(dto2);
      expect(collection.permissions.length).toBe(2);
      expect(collection.permissions[0].id).toEqual(dto1.id);
      expect(collection.permissions[1].id).toEqual(dto2.id);
    });

    it("replaces permission matching the same id if new permission has higher access right", () => {
      expect.assertions(3);
      const dto1 = updateFolderPermissionDto();
      const dto2 = ownerFolderPermissionDto({
        id: dto1.id,
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].id).toEqual(dto1.id);
      expect(collection.permissions[0].type).toEqual(dto2.type);
    });

    it("does not replace permission matching the same id if new permission does not have higher access right", () => {
      expect.assertions(3);
      const dto1 = ownerFolderPermissionDto();
      const dto2 = updateFolderPermissionDto({
        id: dto1.id,
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].id).toEqual(dto1.id);
      expect(collection.permissions[0].type).toEqual(dto1.type);
    });

    it("replaces permission matching the same aro/aco if new permission has higher access right", () => {
      expect.assertions(2);
      const dto1 = updateMinimalFolderPermissionDto();
      const dto2 = ownerMinimalFolderPermissionDto({
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].type).toEqual(dto2.type);
    });

    it("does not replace permission matching the same aro/aco if new permission does not have higher access right", () => {
      expect.assertions(2);
      const dto1 = ownerMinimalFolderPermissionDto();
      const dto2 = updateMinimalFolderPermissionDto({
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].type).toEqual(dto1.type);
    });

    it("identifies new permission as replacement if same aco/aro but new permission has no id and existing one has one", () => {
      expect.assertions(3);
      const dto1 = updateFolderPermissionDto();
      const dto2 = ownerMinimalFolderPermissionDto({
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].type).toEqual(dto2.type);
      expect(collection.permissions[0].id).toBeNull();
    });

    it("identifies new permission as replacement if same aco/aro but new permission has id and existing one has none", () => {
      expect.assertions(3);
      const dto1 = updateMinimalFolderPermissionDto();
      const dto2 = ownerFolderPermissionDto({
        aco_foreign_key: dto1.aco_foreign_key,
        aro_foreign_key: dto1.aro_foreign_key,
      });
      const collection = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      collection.addOrReplace(new PermissionEntity(dto2));
      expect(collection.permissions.length).toBe(1);
      expect(collection.permissions[0].type).toEqual(dto2.type);
      expect(collection.permissions[0].id).toEqual(dto2.id);
    });

    it("addOrReplace allow updating permissions to higher ones multiple manipulations", () => {
      const folderId = crypto.randomUUID();
      const user1Id = crypto.randomUUID();
      const user2Id = crypto.randomUUID();
      const user3Id = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user1Id });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user2Id });
      const dto3 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user2Id });
      const dto4 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user2Id });
      const dto5 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user2Id });
      const dto6 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: user3Id });
      const collection = new PermissionsCollection([dto1, dto2]);

      // same same
      collection.addOrReplace(new PermissionEntity(dto3));
      expect(collection.permissions.length).toBe(2);
      expect(collection.permissions[1].type).toBe(1);

      // but different
      collection.addOrReplace(new PermissionEntity(dto4));
      expect(collection.permissions.length).toBe(2);
      expect(collection.permissions[1].type).toBe(PermissionEntity.PERMISSION_OWNER);

      // now for something really different
      collection.addOrReplace(new PermissionEntity(dto5));
      expect(collection.permissions.length).toBe(2);
      expect(collection.permissions[1].type).toBe(PermissionEntity.PERMISSION_OWNER);

      // stop it already
      collection.addOrReplace(new PermissionEntity(dto6));
      expect(collection.permissions.length).toBe(3);
      expect(collection.permissions[2].type).toBe(1);
    });
  });

  describe("::sum", () => {
    it("union returns set1 + set2 - no overlap", () => {
      const folderId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([dto2], { assertAtLeastOneOwner: false });

      const set3 = PermissionsCollection.sum(set1, set2);
      expect(set3.toDto()).toEqual([dto1, dto2]);

      const set4 = PermissionsCollection.sum(set2, set1);
      expect(set4.toDto()).toEqual([dto2, dto1]);
    });

    it("union returns set1 + set2 - full overlap", () => {
      const folderId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto2 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto3 = updateMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([dto3, dto1, dto2], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([dto1, dto3, dto2], { assertAtLeastOneOwner: false });

      const set3 = PermissionsCollection.sum(set1, set2);
      const set4 = PermissionsCollection.sum(set2, set1);
      expect(set3.toDto()).toEqual([dto3, dto1, dto2]);
      expect(set4.toDto()).toEqual([dto1, dto3, dto2]);
    });

    it("union returns set1 + set2 - overlap highest right wins", () => {
      const folderId = crypto.randomUUID();
      const userId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: userId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: userId });
      const dto3 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: userId });
      const set1 = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([dto2], { assertAtLeastOneOwner: false });

      const set3 = PermissionsCollection.sum(set1, set2);
      const set4 = PermissionsCollection.sum(set2, set1);
      const result = [dto3];
      expect(set3.toDto()).toEqual(result);
      expect(set4.toDto()).toEqual(result);
    });

    it("union returns set1 + set2 - empty left or right", () => {
      const folderId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([], { assertAtLeastOneOwner: false });

      const set3 = PermissionsCollection.sum(set1, set2);
      expect(set3.toDto()).toEqual([dto1, dto2]);

      const set4 = PermissionsCollection.sum(set2, set1);
      expect(set4.toDto()).toEqual([dto1, dto2]);
    });

    it("union returns set1 + set2 - no owner set throws error", () => {
      const folderId = crypto.randomUUID();
      const dto1 = updateMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([dto2], { assertAtLeastOneOwner: false });

      expect.assertions(1);
      expect(() => PermissionsCollection.sum(set1, set2)).toThrowCollectionValidationError("owner");
    });

    it("union returns set1 + set2 - not same aco throws error", () => {
      const dto1 = updateMinimalFolderPermissionDto();
      const dto2 = ownerMinimalFolderPermissionDto();
      const set1 = new PermissionsCollection([dto1], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([dto2], { assertAtLeastOneOwner: false });

      expect.assertions(1);
      expect(() => PermissionsCollection.sum(set1, set2)).toThrowCollectionValidationError(
        "0.aco_foreign_key.same_aco",
      );
    });
  });

  describe("::toJSON", () => {
    it("must serialize with assoc", () => {
      const folderId = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: folderId }, { withUser: true });
      const dto2 = defaultPermissionDto({ aco_foreign_key: folderId }, { withGroup: true });
      const dtos = [dto1, dto2];

      const permissionCollection = new PermissionsCollection(dtos);
      const permissions = JSON.parse(JSON.stringify(permissionCollection));
      expect(permissions[0].user.profile.first_name).toBe("Ada");
      expect(permissions[0].user.profile.avatar.id).toBe(dto1.user.profile.avatar.id);
      expect(permissions[1].group.name).toBe("Current group");
    });
  });

  describe("::diff", () => {
    it("diff set1 - set2", () => {
      const folderId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const dto3 = updateMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      let set1, set2, set3;

      // nothing to remove
      set1 = new PermissionsCollection([dto3], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([dto3]);

      // nothing to remove 2
      set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto3], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([dto1, dto2]);

      // nothing to change
      set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([]);

      // nothing left
      set1 = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([]);

      // nothing right
      set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([dto1, dto2]);

      // nothing at all
      set1 = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([]);

      // nothing left 2
      set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto1, dto2, dto3], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([]);

      // something left
      set1 = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto1, dto3], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([dto2]);

      // something left 2
      set1 = new PermissionsCollection([dto1, dto2, dto3], { assertAtLeastOneOwner: false });
      set2 = new PermissionsCollection([dto3], { assertAtLeastOneOwner: false });
      set3 = PermissionsCollection.diff(set1, set2, false);
      expect(set3.toDto()).toEqual([dto1, dto2]);
    });

    it("does not throw when the result contains at least one owner and assertAtLeastOneOwner is true", () => {
      expect.assertions(2);
      const folderId = crypto.randomUUID();
      const owner = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const read = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([owner, read], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([read], { assertAtLeastOneOwner: false });

      let result;
      expect(() => {
        result = PermissionsCollection.diff(set1, set2);
      }).not.toThrow();
      expect(result.toDto()).toEqual([owner]);
    });

    it("throws a CollectionValidationError when the result has no owner and assertAtLeastOneOwner is true", () => {
      expect.assertions(1);
      const folderId = crypto.randomUUID();
      const owner = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const read = readMinimalFolderPermissionDto({ aco_foreign_key: folderId });
      const set1 = new PermissionsCollection([owner, read], { assertAtLeastOneOwner: false });
      const set2 = new PermissionsCollection([owner], { assertAtLeastOneOwner: false });

      expect(() => PermissionsCollection.diff(set1, set2)).toThrowCollectionValidationError("owner");
    });

    it("diff set1 - set2, part 2", () => {
      const folderId = crypto.randomUUID();
      const userId = crypto.randomUUID();
      const owner = ownerMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: userId });
      const read = readMinimalFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: userId });
      let resultSet;

      // check remove equal or lower
      const ownerSet = new PermissionsCollection([owner], { assertAtLeastOneOwner: false });
      const readSet = new PermissionsCollection([read], { assertAtLeastOneOwner: false });
      resultSet = PermissionsCollection.diff(ownerSet, readSet, false);
      expect(resultSet.toDto()).toEqual([owner]);
      resultSet = PermissionsCollection.diff(readSet, ownerSet, false);
      expect(resultSet.toDto()).toEqual([]);
      resultSet = PermissionsCollection.diff(ownerSet, ownerSet, false);
      expect(resultSet.toDto()).toEqual([]);
    });
  });

  describe("::sortPermissionsByAroAndName", () => {
    it("should order users by their name", () => {
      expect.assertions(3);

      const userA = defaultUserDto();
      userA.profile.first_name = "user A";
      const userB = defaultUserDto();
      userB.profile.first_name = "user B";

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "User", user: userA }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: userB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(-1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionA)).toStrictEqual(0);
    });

    it("should consider equal permissions with users having the same name", () => {
      expect.assertions(1);

      const userA = defaultUserDto();
      userA.profile.first_name = "user";
      const userB = defaultUserDto();
      userB.profile.first_name = "user";

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "User", user: userA }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: userB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(0);
    });

    it("should put user without definition after users with definition", () => {
      expect.assertions(2);

      const userB = defaultUserDto();
      userB.profile.first_name = "user B";

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "User", user: null }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: userB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(-1);
    });

    it("both undefined users should be considered equal", () => {
      expect.assertions(1);

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "User", user: null }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: null }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(0);
    });

    it("should order groups by their name", () => {
      expect.assertions(3);

      const groupA = defaultGroupDto({ name: "Group A" });
      const groupB = defaultGroupDto({ name: "Group B" });

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: groupA }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: groupB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(-1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionA)).toStrictEqual(0);
    });

    it("should consider equal permissions with groups having the same name", () => {
      expect.assertions(1);

      const groupA = defaultGroupDto({ name: "Group" });
      const groupB = defaultGroupDto({ name: "Group" });

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: groupA }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: groupB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(0);
    });

    it("should put group without definition after groups with definition", () => {
      expect.assertions(2);

      const groupB = defaultGroupDto({ name: "Group B" });

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: null }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: groupB }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(-1);
    });

    it("should put group after users", () => {
      expect.assertions(2);

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: defaultGroupDto() }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: defaultUserDto() }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(-1);
    });

    it("should put undefined group after users", () => {
      expect.assertions(2);

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: null }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: defaultUserDto() }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(-1);
    });

    it("should put undefined users after group", () => {
      expect.assertions(2);

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: defaultGroupDto() }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: null }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(-1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(1);
    });

    it("should put undefined group after undefined user", () => {
      expect.assertions(2);

      const permissionA = new PermissionEntity(defaultPermissionDto({ aro: "Group", group: null }));
      const permissionB = new PermissionEntity(defaultPermissionDto({ aro: "User", user: null }));

      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionA, permissionB)).toStrictEqual(1);
      expect(PermissionsCollection.sortPermissionsByAroAndName(permissionB, permissionA)).toStrictEqual(-1);
    });
  });

  describe("::assertAtLeastOneOwner", () => {
    it("does not throw for an empty collection", () => {
      expect.assertions(1);
      const collection = new PermissionsCollection([], { assertAtLeastOneOwner: false });
      expect(() => collection.assertAtLeastOneOwner()).not.toThrow();
    });

    it("does not throw when the collection has at least one owner permission", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const collection = new PermissionsCollection([
        ownerPermissionDto({ aco_foreign_key: acoForeignKey }),
        readPermissionDto({ aco_foreign_key: acoForeignKey }),
      ]);
      expect(() => collection.assertAtLeastOneOwner()).not.toThrow();
    });

    it("throws a CollectionValidationError when there is no owner permission", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const collection = new PermissionsCollection([readPermissionDto({ aco_foreign_key: acoForeignKey })], {
        assertAtLeastOneOwner: false,
      });
      expect(() => collection.assertAtLeastOneOwner()).toThrowCollectionValidationError("owner");
    });
  });

  describe("::toDto", () => {
    it("returns all permissions serialized with ALL_CONTAIN_OPTIONS when called without argument", () => {
      expect.assertions(2);
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey }, { withUser: true });
      const dto2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey }, { withGroup: true });
      const collection = new PermissionsCollection([dto1, dto2]);
      const result = collection.toDto();
      expect(result[0].user).toBeDefined();
      expect(result[1].group).toBeDefined();
    });

    it("returns permissions serialized with explicit contain options", () => {
      expect.assertions(2);
      const acoForeignKey = crypto.randomUUID();
      const dto1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey }, { withUser: true });
      const collection = new PermissionsCollection([dto1]);
      const resultWithUser = collection.toDto({ user: true });
      expect(resultWithUser[0].user).toBeDefined();
      const resultWithoutUser = collection.toDto({});
      expect(resultWithoutUser[0].user).toBeUndefined();
    });
  });

  describe("::getByAroMatchingPermission", () => {
    it("returns the matching permission when a permission with the same ARO exists", () => {
      expect.assertions(2);
      const acoForeignKey = crypto.randomUUID();
      const dto1 = ownerPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = readPermissionDto({ aco_foreign_key: acoForeignKey });
      const collection = new PermissionsCollection([dto1, dto2]);
      const needle = new PermissionEntity(
        ownerPermissionDto({
          aco_foreign_key: acoForeignKey,
          aro_foreign_key: dto1.aro_foreign_key,
        }),
      );
      const result = collection.getByAroMatchingPermission(needle);
      expect(result).toBeInstanceOf(PermissionEntity);
      expect(result.id).toStrictEqual(dto1.id);
    });

    it("returns undefined when no permission matches the given ARO", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const collection = new PermissionsCollection([ownerPermissionDto({ aco_foreign_key: acoForeignKey })]);
      const needle = new PermissionEntity(readPermissionDto({ aco_foreign_key: acoForeignKey }));
      expect(collection.getByAroMatchingPermission(needle)).toBeUndefined();
    });
  });

  describe("::getByAro", () => {
    it("returns the matching permission when a permission with the given aro type and id exists", () => {
      expect.assertions(2);
      const acoForeignKey = crypto.randomUUID();
      const dto = ownerPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_USER });
      const collection = new PermissionsCollection([dto]);
      const result = collection.getByAro(PermissionEntity.ARO_USER, dto.aro_foreign_key);
      expect(result).toBeInstanceOf(PermissionEntity);
      expect(result.id).toStrictEqual(dto.id);
    });

    it("returns undefined when no permission matches the aro type and id", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const collection = new PermissionsCollection([ownerPermissionDto({ aco_foreign_key: acoForeignKey })]);
      expect(collection.getByAro(PermissionEntity.ARO_USER, crypto.randomUUID())).toBeUndefined();
    });

    it("returns undefined when the aro type does not match", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const dto = ownerPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_USER });
      const collection = new PermissionsCollection([dto]);
      expect(collection.getByAro(PermissionEntity.ARO_GROUP, dto.aro_foreign_key)).toBeUndefined();
    });
  });

  describe("::containAtLeastPermission", () => {
    it("returns true when the collection contains a permission with equal type for the given ARO", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const dto = ownerPermissionDto({ aco_foreign_key: acoForeignKey });
      const collection = new PermissionsCollection([dto]);
      expect(collection.containAtLeastPermission(dto.aro, dto.aro_foreign_key, PermissionEntity.PERMISSION_OWNER)).toBe(
        true,
      );
    });

    it("returns true when the collection contains a permission with superior type for the given ARO", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const dto = ownerPermissionDto({ aco_foreign_key: acoForeignKey });
      const collection = new PermissionsCollection([dto]);
      expect(collection.containAtLeastPermission(dto.aro, dto.aro_foreign_key, PermissionEntity.PERMISSION_READ)).toBe(
        true,
      );
    });

    it("returns false when the collection only contains a permission with inferior type for the given ARO", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const dto = readPermissionDto({ aco_foreign_key: acoForeignKey });
      const collection = new PermissionsCollection([dto], { assertAtLeastOneOwner: false });
      expect(collection.containAtLeastPermission(dto.aro, dto.aro_foreign_key, PermissionEntity.PERMISSION_OWNER)).toBe(
        false,
      );
    });

    it("returns false when the ARO foreign key is not in the collection", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const collection = new PermissionsCollection([ownerPermissionDto({ aco_foreign_key: acoForeignKey })]);
      expect(
        collection.containAtLeastPermission(
          PermissionEntity.ARO_USER,
          crypto.randomUUID(),
          PermissionEntity.PERMISSION_READ,
        ),
      ).toBe(false);
    });
  });

  describe("::cloneForAco", () => {
    it("creates a new collection with all permissions adapted to the given ACO", () => {
      expect.assertions(5);
      const sourceFolderId = crypto.randomUUID();
      const targetResourceId = crypto.randomUUID();
      const dto1 = ownerMinimalFolderPermissionDto({ aco_foreign_key: sourceFolderId });
      const dto2 = readMinimalFolderPermissionDto({ aco_foreign_key: sourceFolderId });
      const source = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });

      const cloned = source.cloneForAco(PermissionEntity.ACO_RESOURCE, targetResourceId);

      expect(cloned).toBeInstanceOf(PermissionsCollection);
      expect(cloned.length).toBe(2);
      expect(cloned.items[0].acoForeignKey).toStrictEqual(targetResourceId);
      expect(cloned.items[1].acoForeignKey).toStrictEqual(targetResourceId);
      expect(cloned.items[0].aco).toStrictEqual(PermissionEntity.ACO_RESOURCE);
    });

    it("preserves ARO information on the cloned permissions", () => {
      expect.assertions(2);
      const sourceFolderId = crypto.randomUUID();
      const targetFolderId = crypto.randomUUID();
      const dto = ownerMinimalFolderPermissionDto({ aco_foreign_key: sourceFolderId });
      const source = new PermissionsCollection([dto], { assertAtLeastOneOwner: false });

      const cloned = source.cloneForAco(PermissionEntity.ACO_FOLDER, targetFolderId);

      expect(cloned.items[0].aroForeignKey).toStrictEqual(dto.aro_foreign_key);
      expect(cloned.items[0].type).toStrictEqual(dto.type);
    });

    it("throws when assertAtLeastOneOwner is true and there is no owner in the source", () => {
      expect.assertions(1);
      const sourceFolderId = crypto.randomUUID();
      const dto = readMinimalFolderPermissionDto({ aco_foreign_key: sourceFolderId });
      const source = new PermissionsCollection([dto], { assertAtLeastOneOwner: false });

      expect(() =>
        source.cloneForAco(PermissionEntity.ACO_RESOURCE, crypto.randomUUID()),
      ).toThrowCollectionValidationError("owner");
    });

    it("does not throw when assertAtLeastOneOwner is false and there is no owner", () => {
      expect.assertions(1);
      const sourceFolderId = crypto.randomUUID();
      const dto = readMinimalFolderPermissionDto({ aco_foreign_key: sourceFolderId });
      const source = new PermissionsCollection([dto], { assertAtLeastOneOwner: false });

      expect(() => source.cloneForAco(PermissionEntity.ACO_RESOURCE, crypto.randomUUID(), false)).not.toThrow();
    });
  });

  describe("::sort", () => {
    it("sorts the collection in-place: users before groups, each sorted by name", () => {
      expect.assertions(4);
      const acoForeignKey = crypto.randomUUID();

      const userB = defaultUserDto();
      userB.profile.first_name = "B";
      const userA = defaultUserDto();
      userA.profile.first_name = "A";
      const groupB = defaultGroupDto({ name: "Group B" });
      const groupA = defaultGroupDto({ name: "Group A" });

      const permGroupB = new PermissionEntity(
        ownerPermissionDto({ aco_foreign_key: acoForeignKey, aro: "Group", group: groupB }),
      );
      const permUserB = new PermissionEntity(
        readPermissionDto({ aco_foreign_key: acoForeignKey, aro: "User", user: userB }),
      );
      const permGroupA = new PermissionEntity(
        readPermissionDto({ aco_foreign_key: acoForeignKey, aro: "Group", group: groupA }),
      );
      const permUserA = new PermissionEntity(
        readPermissionDto({ aco_foreign_key: acoForeignKey, aro: "User", user: userA }),
      );

      const collection = new PermissionsCollection([permGroupB, permUserB, permGroupA, permUserA], {
        assertAtLeastOneOwner: false,
      });
      collection.sort();

      expect(collection.items[0].user.profile.firstName).toBe("A");
      expect(collection.items[1].user.profile.firstName).toBe("B");
      expect(collection.items[2].group.name).toBe("Group A");
      expect(collection.items[3].group.name).toBe("Group B");
    });

    it("mutates the collection items in-place", () => {
      expect.assertions(1);
      const acoForeignKey = crypto.randomUUID();
      const dto1 = ownerPermissionDto({ aco_foreign_key: acoForeignKey });
      const dto2 = readPermissionDto({ aco_foreign_key: acoForeignKey });
      const collection = new PermissionsCollection([dto1, dto2], { assertAtLeastOneOwner: false });
      const itemsBefore = collection.items;
      collection.sort();
      expect(collection.items).toBe(itemsBefore);
    });
  });

  describe("::hasGroupPermission", () => {
    it("should return true when the collection contains at least one group permission", () => {
      expect.assertions(1);

      const acoForeignKey = crypto.randomUUID();
      const userPermission = defaultPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_USER });
      const groupPermission = defaultPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_GROUP });
      const collection = new PermissionsCollection([userPermission, groupPermission]);

      expect(collection.hasGroupPermission).toBe(true);
    });

    it("should return false when the collection does not contain any group permission", () => {
      expect.assertions(1);

      const acoForeignKey = crypto.randomUUID();
      const userPermission1 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_USER });
      const userPermission2 = defaultPermissionDto({ aco_foreign_key: acoForeignKey, aro: PermissionEntity.ARO_USER });
      const collection = new PermissionsCollection([userPermission1, userPermission2]);

      expect(collection.hasGroupPermission).toBe(false);
    });
  });
});
