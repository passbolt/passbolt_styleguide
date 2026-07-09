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

  describe("PermissionSnapshotEntity::equals", () => {
    it("returns true for two snapshots built from identical permissions, groups, and users", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const b = new PermissionSnapshotEntity(dto);
      expect(a.equals(b)).toBe(true);
    });

    it("ignores differing `created` timestamps so two back-to-back captures of an unchanged parent compare equal", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto({ created: "2026-04-21T12:24:00+00:00" });
      const a = new PermissionSnapshotEntity(dto);
      const b = new PermissionSnapshotEntity({ ...dto, created: "2026-04-21T12:25:00+00:00" });
      expect(a.equals(b)).toBe(true);
    });

    it("returns true regardless of the order in which permissions are returned by the server", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const reversed = { ...dto, permissions: [...dto.permissions].reverse() };
      const b = new PermissionSnapshotEntity(reversed);
      expect(a.equals(b)).toBe(true);
    });

    it("returns false when a permission was added to the parent folder", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const extraPermissionDto = {
        aco: dto.permissions[0].aco,
        aco_foreign_key: dto.permissions[0].aco_foreign_key,
        aro: "User",
        aro_foreign_key: "33333333-3333-4333-8333-333333333333",
        type: 1,
      };
      const b = new PermissionSnapshotEntity({
        ...dto,
        permissions: [...dto.permissions, extraPermissionDto],
      });
      expect(a.equals(b)).toBe(false);
    });

    it("returns false when a permission's type changed (e.g. read promoted to owner)", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const promoted = [...dto.permissions];
      promoted[0] = { ...promoted[0], type: promoted[0].type === 15 ? 1 : 15 };
      const b = new PermissionSnapshotEntity({ ...dto, permissions: promoted });
      expect(a.equals(b)).toBe(false);
    });

    it("returns false when the groups collection differs", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const b = new PermissionSnapshotEntity({ ...dto, groups: dto.groups.slice(0, dto.groups.length - 1) });
      expect(a.equals(b)).toBe(false);
    });

    it("returns false when the users collection differs", () => {
      expect.assertions(1);
      const dto = defaultPermissionSnapshotDto();
      const a = new PermissionSnapshotEntity(dto);
      const b = new PermissionSnapshotEntity({ ...dto, users: dto.users.slice(0, dto.users.length - 1) });
      expect(a.equals(b)).toBe(false);
    });

    it("returns false when compared to null or a non-snapshot value", () => {
      expect.assertions(3);
      const entity = new PermissionSnapshotEntity(defaultPermissionSnapshotDto());
      expect(entity.equals(null)).toBe(false);
      expect(entity.equals(undefined)).toBe(false);
      expect(entity.equals({})).toBe(false);
    });
  });
});
