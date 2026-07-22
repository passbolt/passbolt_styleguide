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
import GroupUserEntity from "./groupUserEntity";
import UserEntity from "../user/userEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "passbolt-styleguide/test/assert/assertEntityProperty";
import {
  defaultGroupUser,
  defaultGroupUserWithUserDto,
  minimumGroupUserDto,
} from "passbolt-styleguide/src/shared/models/entity/groupUser/groupUserEntity.test.data.js";

describe("GroupUserEntity", () => {
  describe("GroupUserEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(GroupUserEntity.ENTITY_NAME, GroupUserEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(GroupUserEntity, "id");
      assertEntityProperty.uuid(GroupUserEntity, "id");
      assertEntityProperty.notRequired(GroupUserEntity, "id");
    });

    it("validates user_id property", () => {
      assertEntityProperty.string(GroupUserEntity, "user_id");
      assertEntityProperty.uuid(GroupUserEntity, "user_id");
      assertEntityProperty.required(GroupUserEntity, "user_id");
    });

    it("validates group_id property", () => {
      assertEntityProperty.string(GroupUserEntity, "group_id");
      assertEntityProperty.uuid(GroupUserEntity, "group_id");
      assertEntityProperty.notRequired(GroupUserEntity, "group_id");
    });

    it("validates is_admin property", () => {
      assertEntityProperty.boolean(GroupUserEntity, "is_admin");
      assertEntityProperty.required(GroupUserEntity, "is_admin");
    });

    it("validates created property", () => {
      assertEntityProperty.string(GroupUserEntity, "created");
      assertEntityProperty.dateTime(GroupUserEntity, "created");
      assertEntityProperty.notRequired(GroupUserEntity, "created");
    });
  });

  describe("GroupUserEntity::constructor", () => {
    it("constructor works if a valid minimal DTO is provided", () => {
      const dto = minimumGroupUserDto();
      const entity = new GroupUserEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor works if a valid complete DTO is provided", () => {
      const dto = defaultGroupUser();
      const entity = new GroupUserEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("GroupUserEntity::user association", () => {
    it("constructor parses an embedded user as a UserEntity", () => {
      const dto = defaultGroupUserWithUserDto();
      const entity = new GroupUserEntity(dto);
      expect(entity.user).toBeInstanceOf(UserEntity);
      expect(entity.user.id).toEqual(dto.user.id);
      expect(entity.user.username).toEqual(dto.user.username);
    });

    it("user getter returns null when the DTO has no user", () => {
      const dto = defaultGroupUser();
      const entity = new GroupUserEntity(dto);
      expect(entity.user).toBeNull();
    });

    it("zero-arg toDto() omits user for back-compat", () => {
      const dto = defaultGroupUserWithUserDto();
      const entity = new GroupUserEntity(dto);
      const result = entity.toDto();
      expect(result.user).toBeUndefined();
    });

    it("toDto(GroupUserEntity.ALL_CONTAIN_OPTIONS) returns the full DTO including user with profile and gpgkey", () => {
      const dto = defaultGroupUserWithUserDto();
      const entity = new GroupUserEntity(dto);
      const result = entity.toDto(GroupUserEntity.ALL_CONTAIN_OPTIONS);
      expect(result.user).toBeDefined();
      expect(result.user.id).toEqual(dto.user.id);
      expect(result.user.profile).toBeDefined();
      expect(result.user.gpgkey).toBeDefined();
    });

    it("JSON.parse(JSON.stringify(entity)) retains user id, profile, and gpgkey", () => {
      const dto = defaultGroupUserWithUserDto();
      const entity = new GroupUserEntity(dto);
      const serialized = JSON.stringify(entity);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.user).toBeDefined();
      expect(deserialized.user.id).toEqual(dto.user.id);
      expect(deserialized.user.profile).toBeDefined();
      expect(deserialized.user.gpgkey).toBeDefined();
    });

    it("constructor throws EntityValidationError for an invalid embedded user", () => {
      const dto = defaultGroupUser({ user: { username: 42 } });
      expect(() => {
        new GroupUserEntity(dto);
      }).toThrow(EntityValidationError);
    });
  });
});
