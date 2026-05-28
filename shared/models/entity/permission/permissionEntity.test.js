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
import UserEntity from "../user/userEntity";
import GroupEntity from "../group/groupEntity";
import {
  defaultPermissionDto,
  minimumPermissionDto,
  ownerPermissionDto,
  readPermissionDto,
  updatePermissionDto,
  ownerGroupPermissionDto,
} from "./permissionEntity.test.data";

describe("PermissionEntity", () => {
  describe("::getters", () => {
    describe("id", () => {
      it("returns the id when set", () => {
        expect.assertions(1);
        const dto = defaultPermissionDto();
        const entity = new PermissionEntity(dto);
        expect(entity.id).toStrictEqual(dto.id);
      });

      it("returns null when id is not set", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto());
        expect(entity.id).toBeNull();
      });
    });

    describe("aro", () => {
      it("returns the ARO type for a user permission", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto({ aro: PermissionEntity.ARO_USER }));
        expect(entity.aro).toStrictEqual(PermissionEntity.ARO_USER);
      });

      it("returns the ARO type for a group permission", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto({ aro: PermissionEntity.ARO_GROUP }));
        expect(entity.aro).toStrictEqual(PermissionEntity.ARO_GROUP);
      });
    });

    describe("type", () => {
      it("returns the permission type", () => {
        expect.assertions(3);
        expect(
          new PermissionEntity(minimumPermissionDto({ type: PermissionEntity.PERMISSION_READ })).type,
        ).toStrictEqual(PermissionEntity.PERMISSION_READ);
        expect(
          new PermissionEntity(minimumPermissionDto({ type: PermissionEntity.PERMISSION_UPDATE })).type,
        ).toStrictEqual(PermissionEntity.PERMISSION_UPDATE);
        expect(
          new PermissionEntity(minimumPermissionDto({ type: PermissionEntity.PERMISSION_OWNER })).type,
        ).toStrictEqual(PermissionEntity.PERMISSION_OWNER);
      });
    });

    describe("isOwner", () => {
      it("returns true when the permission type is owner", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(ownerPermissionDto());
        expect(entity.isOwner()).toBe(true);
      });

      it("returns false when the permission type is not owner", () => {
        expect.assertions(2);
        expect(new PermissionEntity(readPermissionDto()).isOwner()).toBe(false);
        expect(new PermissionEntity(updatePermissionDto()).isOwner()).toBe(false);
      });
    });

    describe("user", () => {
      it("returns a UserEntity when a user is embedded in the DTO", () => {
        expect.assertions(2);
        const dto = defaultPermissionDto({}, { withUser: true });
        const entity = new PermissionEntity(dto);
        expect(entity.user).toBeInstanceOf(UserEntity);
        expect(entity.user.id).toStrictEqual(dto.aro_foreign_key);
      });

      it("returns null when no user is embedded", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto());
        expect(entity.user).toBeNull();
      });
    });

    describe("group", () => {
      it("returns a GroupEntity when a group is embedded in the DTO", () => {
        expect.assertions(2);
        const dto = ownerGroupPermissionDto();
        const entity = new PermissionEntity(dto);
        expect(entity.group).toBeInstanceOf(GroupEntity);
        expect(entity.group.id).toStrictEqual(dto.aro_foreign_key);
      });

      it("returns null when no group is embedded", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto());
        expect(entity.group).toBeNull();
      });
    });
  });

  describe("::setters", () => {
    describe("id", () => {
      it("sets a valid UUID", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(minimumPermissionDto());
        const newId = crypto.randomUUID();
        entity.id = newId;
        expect(entity.id).toStrictEqual(newId);
      });

      it("throws a TypeError when an invalid UUID is set", () => {
        expect.assertions(2);
        const entity = new PermissionEntity(minimumPermissionDto());
        expect(() => {
          entity.id = "not-a-uuid";
        }).toThrow(TypeError);
        expect(() => {
          entity.id = "";
        }).toThrow(TypeError);
      });
    });

    describe("type", () => {
      it("sets a valid permission type", () => {
        expect.assertions(3);
        const entity = new PermissionEntity(minimumPermissionDto({ type: PermissionEntity.PERMISSION_READ }));
        entity.type = PermissionEntity.PERMISSION_UPDATE;
        expect(entity.type).toStrictEqual(PermissionEntity.PERMISSION_UPDATE);
        entity.type = PermissionEntity.PERMISSION_OWNER;
        expect(entity.type).toStrictEqual(PermissionEntity.PERMISSION_OWNER);
        entity.type = PermissionEntity.PERMISSION_READ;
        expect(entity.type).toStrictEqual(PermissionEntity.PERMISSION_READ);
      });

      it("throws a TypeError when an invalid type is set", () => {
        expect.assertions(2);
        const entity = new PermissionEntity(minimumPermissionDto());
        expect(() => {
          entity.type = 42;
        }).toThrow(TypeError);
        expect(() => {
          entity.type = 0;
        }).toThrow(TypeError);
      });
    });
  });

  describe("::static methods", () => {
    describe("isAroMatching", () => {
      it("returns true when two permissions share the same ARO type and ARO foreign key", () => {
        expect.assertions(1);
        const dto = defaultPermissionDto();
        const entity1 = new PermissionEntity(dto);
        const entity2 = new PermissionEntity(dto);
        expect(PermissionEntity.isAroMatching(entity1, entity2)).toBe(true);
      });

      it("returns false when ARO foreign keys differ", () => {
        expect.assertions(1);
        const entity1 = new PermissionEntity(defaultPermissionDto());
        const entity2 = new PermissionEntity(defaultPermissionDto());
        expect(PermissionEntity.isAroMatching(entity1, entity2)).toBe(false);
      });

      it("returns false when ARO types differ", () => {
        expect.assertions(1);
        const aroForeignKey = crypto.randomUUID();
        const entity1 = new PermissionEntity(
          defaultPermissionDto({ aro: PermissionEntity.ARO_USER, aro_foreign_key: aroForeignKey }),
        );
        const entity2 = new PermissionEntity(
          defaultPermissionDto({ aro: PermissionEntity.ARO_GROUP, aro_foreign_key: aroForeignKey }),
        );
        expect(PermissionEntity.isAroMatching(entity1, entity2)).toBe(false);
      });

      it("throws a TypeError when a non-PermissionEntity is passed", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(defaultPermissionDto());
        expect(() => PermissionEntity.isAroMatching(entity, {})).toThrow(TypeError);
      });
    });

    describe("isAcoAndAroMatching", () => {
      it("returns true when two permissions share the same ACO and ARO", () => {
        expect.assertions(1);
        const dto = defaultPermissionDto();
        const entity1 = new PermissionEntity(dto);
        const entity2 = new PermissionEntity(dto);
        expect(PermissionEntity.isAcoAndAroMatching(entity1, entity2)).toBe(true);
      });

      it("returns false when the ACO foreign keys differ", () => {
        expect.assertions(1);
        const aroForeignKey = crypto.randomUUID();
        const entity1 = new PermissionEntity(
          defaultPermissionDto({ aro_foreign_key: aroForeignKey, aco_foreign_key: crypto.randomUUID() }),
        );
        const entity2 = new PermissionEntity(
          defaultPermissionDto({ aro_foreign_key: aroForeignKey, aco_foreign_key: crypto.randomUUID() }),
        );
        expect(PermissionEntity.isAcoAndAroMatching(entity1, entity2)).toBe(false);
      });

      it("returns false when the ARO foreign keys differ", () => {
        expect.assertions(1);
        const acoForeignKey = crypto.randomUUID();
        const entity1 = new PermissionEntity(defaultPermissionDto({ aco_foreign_key: acoForeignKey }));
        const entity2 = new PermissionEntity(defaultPermissionDto({ aco_foreign_key: acoForeignKey }));
        expect(PermissionEntity.isAcoAndAroMatching(entity1, entity2)).toBe(false);
      });

      it("throws a TypeError when a non-PermissionEntity is passed", () => {
        expect.assertions(1);
        const entity = new PermissionEntity(defaultPermissionDto());
        expect(() => PermissionEntity.isAcoAndAroMatching(entity, null)).toThrow(TypeError);
      });
    });
  });

  describe("::toDto", () => {
    it("returns only scalar props when called without contain options", () => {
      expect.assertions(3);
      const dto = defaultPermissionDto({}, { withUser: true });
      const entity = new PermissionEntity(dto);
      const result = entity.toDto();
      expect(result.user).toBeUndefined();
      expect(result.group).toBeUndefined();
      expect(result).toStrictEqual({
        id: dto.id,
        aco: dto.aco,
        aco_foreign_key: dto.aco_foreign_key,
        aro: dto.aro,
        aro_foreign_key: dto.aro_foreign_key,
        type: dto.type,
        created: dto.created,
        modified: dto.modified,
      });
    });

    it("includes the user association when contain.user is set", () => {
      expect.assertions(2);
      const dto = defaultPermissionDto({}, { withUser: true });
      const entity = new PermissionEntity(dto);
      const result = entity.toDto({ user: true });
      expect(result.user).toBeDefined();
      expect(result.user.id).toStrictEqual(dto.aro_foreign_key);
    });

    it("includes the group association when contain.group is set", () => {
      expect.assertions(2);
      const dto = ownerGroupPermissionDto();
      const entity = new PermissionEntity(dto);
      const result = entity.toDto({ group: true });
      expect(result.group).toBeDefined();
      expect(result.group.id).toStrictEqual(dto.aro_foreign_key);
    });

    it("omits association when the entity has none and contain is set", () => {
      expect.assertions(2);
      const entity = new PermissionEntity(minimumPermissionDto());
      const result = entity.toDto(PermissionEntity.ALL_CONTAIN_OPTIONS);
      expect(result.user).toBeUndefined();
      expect(result.group).toBeUndefined();
    });
  });

  describe("::toJSON", () => {
    it("uses ALL_CONTAIN_OPTIONS to serialize", () => {
      expect.assertions(1);
      const dto = defaultPermissionDto({}, { withUser: true });
      const entity = new PermissionEntity(dto);
      expect(entity.toJSON()).toStrictEqual(entity.toDto(PermissionEntity.ALL_CONTAIN_OPTIONS));
    });

    it("includes user and group when they are present", () => {
      expect.assertions(2);
      const dto = defaultPermissionDto({}, { withUser: true });
      const entity = new PermissionEntity(dto);
      const json = entity.toJSON();
      expect(json.user).toBeDefined();
      expect(json.group).toBeUndefined();
    });
  });
});
