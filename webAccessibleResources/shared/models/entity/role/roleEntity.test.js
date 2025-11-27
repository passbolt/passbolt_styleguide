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
import RoleEntity from "./roleEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";
import {adminRoleDto, guestRoleDto, userRoleDto, customRoleDto} from "./roleEntity.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";

describe("Role entity", () => {
  describe("ResourceEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(RoleEntity.ENTITY_NAME, RoleEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(RoleEntity, "id");
      assertEntityProperty.uuid(RoleEntity, "id");
      assertEntityProperty.notRequired(RoleEntity, "id");
    });

    it("validates name property", () => {
      assertEntityProperty.string(RoleEntity, "name");
      assertEntityProperty.maxLength(RoleEntity, "name", 255);
      assertEntityProperty.required(RoleEntity, "name");
    });

    it("validates description property", () => {
      assertEntityProperty.string(RoleEntity, "description");
      assertEntityProperty.maxLength(RoleEntity, "description", 255);
      assertEntityProperty.notRequired(RoleEntity, "description");
    });

    it("validates created property", () => {
      assertEntityProperty.string(RoleEntity, "created");
      assertEntityProperty.dateTime(RoleEntity, "created");
      assertEntityProperty.notRequired(RoleEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(RoleEntity, "modified");
      assertEntityProperty.dateTime(RoleEntity, "modified");
      assertEntityProperty.notRequired(RoleEntity, "modified");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);

      const dto = {name: "test"};
      const entity = new RoleEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor works if full valid DTO is provided", () => {
      expect.assertions(1);

      const dto = adminRoleDto({
        'created': '2020-04-25 12:52:00',
        'modified': '2020-04-25 12:52:01',
      });
      const entity = new RoleEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor returns validation error if dto required fields are missing", () => {
      expect.assertions(1);
      expect(() => new RoleEntity({})).toThrow(EntityValidationError);
    });
  });

  describe("::getters", () => {
    it("should return the right data", () => {
      expect.assertions(2);
      const dto = userRoleDto();
      const entity = new RoleEntity(dto);

      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.name).toStrictEqual(dto.name);
    });
  });

  describe("::helpers", () => {
    it("should return the right data", () => {
      expect.assertions(16);
      const adminRole = new RoleEntity(adminRoleDto());
      const userRole = new RoleEntity(userRoleDto());
      const guestRole = new RoleEntity(guestRoleDto());
      const customRole = new RoleEntity(customRoleDto());

      expect(adminRole.isAdmin()).toStrictEqual(true);
      expect(userRole.isAdmin()).toStrictEqual(false);
      expect(guestRole.isAdmin()).toStrictEqual(false);
      expect(customRole.isAdmin()).toStrictEqual(false);

      expect(adminRole.isUser()).toStrictEqual(false);
      expect(userRole.isUser()).toStrictEqual(true);
      expect(guestRole.isUser()).toStrictEqual(false);
      expect(customRole.isUser()).toStrictEqual(false);

      expect(adminRole.isGuest()).toStrictEqual(false);
      expect(userRole.isGuest()).toStrictEqual(false);
      expect(guestRole.isGuest()).toStrictEqual(true);
      expect(customRole.isGuest()).toStrictEqual(false);

      expect(adminRole.isAReservedRole()).toStrictEqual(true);
      expect(userRole.isAReservedRole()).toStrictEqual(true);
      expect(guestRole.isAReservedRole()).toStrictEqual(true);
      expect(customRole.isAReservedRole()).toStrictEqual(false);
    });
  });
});
