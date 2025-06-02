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
 * @since         5.1.0
 */
import UserEntity from "./userEntity";
import EntitySchema from "../abstract/entitySchema";
import {defaultUserDto} from "../user/userEntity.test.data";
import * as assertEntityProperty from "passbolt-styleguide/test/assert/assertEntityProperty";
import RoleEntity from "../role/roleEntity";
import ProfileEntity from "../profile/profileEntity";
import GpgkeyEntity from "../gpgkey/gpgkeyEntity";
import {v4 as uuid} from "uuid";

/**
 * These tests are duplicata and adaptation from the UserEntity of the Bext.
 * TODO: migrate the bext tests to here and add the missing ones.
 * Currently, as the entity has been simplified to keep only necessary elements, the
 * tests have to be adapted as well by removing the unrelevant ones.
 * Once the entity migrated, the tests should be completed with the one from the bext.
 */
describe("UserEntity", () => {
  describe("UserEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(UserEntity.ENTITY_NAME, UserEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(UserEntity, "id");
      assertEntityProperty.uuid(UserEntity, "id");
      assertEntityProperty.notRequired(UserEntity, "id");
    });

    it("validates role_id property", () => {
      assertEntityProperty.string(UserEntity, "role_id");
      assertEntityProperty.uuid(UserEntity, "role_id");
      assertEntityProperty.notRequired(UserEntity, "role_id");
    });

    it("validates username with basic validation rule", () => {
      assertEntityProperty.string(UserEntity, "username");
      assertEntityProperty.required(UserEntity, "username");
    });

    it("validates active property", () => {
      assertEntityProperty.boolean(UserEntity, "active");
      assertEntityProperty.notRequired(UserEntity, "active");
    });

    it("validates deleted property", () => {
      assertEntityProperty.boolean(UserEntity, "deleted");
      assertEntityProperty.notRequired(UserEntity, "deleted");
    });

    it("validates disabled property", () => {
      assertEntityProperty.dateTime(UserEntity, "disabled");
      assertEntityProperty.nullable(UserEntity, "disabled");
      assertEntityProperty.notRequired(UserEntity, "disabled");
    });

    it("validates missing_metadata_key_ids property", () => {
      assertEntityProperty.array(UserEntity, "missing_metadata_key_ids");
      assertEntityProperty.assertArrayItemUuid(UserEntity, "missing_metadata_key_ids");
      assertEntityProperty.notRequired(UserEntity, "missing_metadata_key_ids");
    });

    it("validates created property", () => {
      assertEntityProperty.string(UserEntity, "created");
      assertEntityProperty.dateTime(UserEntity, "created");
      assertEntityProperty.notRequired(UserEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(UserEntity, "modified");
      assertEntityProperty.dateTime(UserEntity, "modified");
      assertEntityProperty.notRequired(UserEntity, "modified");
    });
  });

  describe("UserEntity::constructor", () => {
    it("works if valid minimal DTO is provided", () => {
      const dto = {
        "username": "ada@passbolt.com",
      };
      const entity = new UserEntity(dto);
      expect(entity.toDto()).toEqual(dto);
      expect(entity.id).toBe(null);
      expect(entity.username).toEqual(dto.username);
      expect(entity.roleId).toBeNull();
      expect(entity.isActive).toBeNull();
      expect(entity.isDeleted).toBeNull();
      expect(entity.created).toBeNull();
      expect(entity.modified).toBeNull();
      expect(entity.profile).toBeNull();
      expect(entity.gpgkey).toBeNull();
    });

    it("works if valid DTO with associated entity data is provided", () => {
      const dto = defaultUserDto({}, {
        withRole: true,
        withGpgkey: true,
      });
      const filtered = {
        id: dto.id,
        role_id: dto.role_id,
        username: dto.username,
        active: dto.active,
        deleted: dto.deleted,
        disabled: dto.disabled,
        created: dto.created,
        modified: dto.modified,
      };

      const entity = new UserEntity(dto);
      expect(entity.toDto()).toEqual(filtered);
      expect(entity.profile.firstName).toEqual(dto.profile.first_name);
      expect(entity.profile.lastName).toEqual(dto.profile.last_name);
      expect(entity.role).toBeInstanceOf(RoleEntity);
      expect(entity.profile).toBeInstanceOf(ProfileEntity);
      expect(entity.gpgkey).toBeInstanceOf(GpgkeyEntity);
      expect(entity.role.name).toEqual('user');
      expect(entity.gpgkey.armoredKey.startsWith('-----BEGIN PGP PUBLIC KEY BLOCK-----')).toBe(true);

      const dtoWithContain = entity.toDto({
        role: true,
        profile: true,
        gpgkey: true,
      });
      expect(dtoWithContain.role.name).toEqual('user');
      expect(dtoWithContain.profile.first_name).toEqual(dto.profile.first_name);
      expect(dtoWithContain.gpgkey.armored_key.startsWith('-----BEGIN PGP PUBLIC KEY BLOCK-----')).toBe(true);
    });
  });

  describe("UserEntity::toDto", () => {
    it("serialization works with full object inside collection", () => {
      const dto = defaultUserDto({}, {
        withRole: true,
        withGpgkey: true,
      });
      const entity = new UserEntity(dto);

      //todo: put back when UserEntity is fully migrated
      delete dto.last_logged_in;
      delete dto.is_mfa_enabled;

      expect(entity.toDto(UserEntity.ALL_CONTAIN_OPTIONS)).toEqual(dto);
    });
  });

  describe("::missingMetadataKeysIds", () => {
    it("should return an empty array if missing_metadata_key_ids is not defined", () => {
      expect.assertions(1);

      const dto = defaultUserDto({}, {
        withRole: true,
        withGpgkey: true,
      });
      const entity = new UserEntity(dto);

      expect(entity.missingMetadataKeysIds).toEqual([]);
    });
    it("should return an array of missing_metadata_key_ids", () => {
      expect.assertions(1);
      const uuid1 = uuid();
      const uuid2 = uuid();

      const dto = defaultUserDto({
        missing_metadata_key_ids: [
          uuid1,
          uuid2
        ]
      }, {
        withRole: true,
        withGpgkey: true,
      });
      const entity = new UserEntity(dto);

      expect(entity.missingMetadataKeysIds).toEqual([
        uuid1,
        uuid2
      ]);
    });


    it("should set the missing_metadata_key_ids", () => {
      expect.assertions(1);
      const uuid1 = uuid();
      const uuid2 = uuid();

      const dto = defaultUserDto({
        missing_metadata_key_ids: []
      }, {
        withRole: true,
        withGpgkey: true,
      });
      const entity = new UserEntity(dto);
      entity.missingMetadataKeysIds = [
        uuid1,
        uuid2
      ];
      expect(entity.missingMetadataKeysIds).toEqual([
        uuid1,
        uuid2
      ]);
    });
  });
});
