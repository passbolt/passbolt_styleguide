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
import PermissionSnapshotEntity from "./permissionSnapshotEntity";
import PermissionsCollection from "./permissionsCollection";
import GroupsCollection from "../group/groupsCollection";
import UsersCollection from "../user/usersCollection";
import { defaultPermissionSnapshotDto } from "./permissionSnapshotEntity.test.data";

describe("PermissionSnapshotEntity", () => {
  describe("PermissionSnapshotEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PermissionSnapshotEntity.ENTITY_NAME, PermissionSnapshotEntity.getSchema());
    });
  });

  describe("PermissionSnapshotEntity::constructor", () => {
    it("works if a valid DTO is provided", () => {
      expect.assertions(8);
      const dto = defaultPermissionSnapshotDto();
      const entity = new PermissionSnapshotEntity(dto);

      expect(entity.created).toEqual(dto.created);
      expect(entity.permissions).toBeInstanceOf(PermissionsCollection);
      expect(entity.permissions).toHaveLength(dto.permissions.length);
      expect(entity.groups).toBeInstanceOf(GroupsCollection);
      expect(entity.groups).toHaveLength(dto.groups.length);
      expect(entity.users).toBeInstanceOf(UsersCollection);
      expect(entity.users).toHaveLength(dto.users.length);
      expect(entity.toDto()).toEqual(dto);
    });

    it("accepts permissions without an owner", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto({
        permissions: [
          {
            aco: "Folder",
            aco_foreign_key: "11111111-1111-4111-8111-111111111111",
            aro: "User",
            aro_foreign_key: "22222222-2222-4222-8222-222222222222",
            type: 1,
          },
        ],
      });
      const entity = new PermissionSnapshotEntity(dto);
      expect(entity.permissions).toHaveLength(1);
    });

    it("should throw if the permissions association is missing", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      delete dto.permissions;
      expect(() => new PermissionSnapshotEntity(dto)).toThrowEntityValidationError("permissions");
    });

    it("should throw if the groups association is missing", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      delete dto.groups;
      expect(() => new PermissionSnapshotEntity(dto)).toThrowEntityValidationError("groups");
    });

    it("should throw if the users association is missing", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      delete dto.users;
      expect(() => new PermissionSnapshotEntity(dto)).toThrowEntityValidationError("users");
    });

    it("should throw if created is missing", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      delete dto.created;
      expect(() => new PermissionSnapshotEntity(dto)).toThrowEntityValidationError("created");
    });

    it("should throw if created is not a valid date-time", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto({ created: "not-a-date" });
      expect(() => new PermissionSnapshotEntity(dto)).toThrowEntityValidationError("created");
    });
  });

  describe("PermissionSnapshotEntity::toDto", () => {
    it("serializes all associations and the created date", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const entity = new PermissionSnapshotEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("toJSON delegates to toDto", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const entity = new PermissionSnapshotEntity(dto);
      expect(JSON.parse(JSON.stringify(entity))).toEqual(entity.toDto());
    });
  });
});
