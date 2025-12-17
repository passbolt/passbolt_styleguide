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
import { adminRoleDto, guestRoleDto, userRoleDto, customRoleDto } from "./roleEntity.test.data";
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
      assertEntityProperty.minLength(RoleEntity, "name", 1);
      assertEntityProperty.maxLength(RoleEntity, "name", 50);
      assertEntityProperty.required(RoleEntity, "name");
    });

    it("validates description property", () => {
      assertEntityProperty.string(RoleEntity, "description");
      assertEntityProperty.maxLength(RoleEntity, "description", 255);
      assertEntityProperty.notRequired(RoleEntity, "description");
      assertEntityProperty.nullable(RoleEntity, "description");
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

      const dto = { name: "test" };
      const entity = new RoleEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor works if full valid DTO is provided", () => {
      expect.assertions(1);

      const dto = adminRoleDto({
        created: "2020-04-25 12:52:00",
        modified: "2020-04-25 12:52:01",
      });
      const entity = new RoleEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("constructor returns validation error if dto required fields are missing", () => {
      expect.assertions(1);
      expect(() => new RoleEntity({})).toThrow(EntityValidationError);
    });

    it("validateBuildRules: should throw an error if the name has trailing spaces", () => {
      expect.assertions(5);
      const dto1 = customRoleDto({ name: " before" });
      const dto2 = customRoleDto({ name: "after " });
      const dto3 = customRoleDto({ name: " both " });
      const dto4 = customRoleDto({ name: "carriage return\n" });
      const dto5 = customRoleDto({ name: "null byte\0 " });

      const expectedError = new EntityValidationError();
      expectedError.addError("name", "trailing-spaces", `The property (name) contains forbidden trailing spaces.`);
      expect(() => new RoleEntity(dto1)).toThrow(expectedError);
      expect(() => new RoleEntity(dto2)).toThrow(expectedError);
      expect(() => new RoleEntity(dto3)).toThrow(expectedError);
      expect(() => new RoleEntity(dto4)).toThrow(expectedError);
      expect(() => new RoleEntity(dto5)).toThrow(expectedError);
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

    it("should not be bypassed using capital letters", () => {
      expect.assertions(12);
      const role1 = new RoleEntity(customRoleDto({ name: "Admin" }));
      const role2 = new RoleEntity(customRoleDto({ name: "adMiN" }));
      const role3 = new RoleEntity(customRoleDto({ name: "User" }));
      const role4 = new RoleEntity(customRoleDto({ name: "usER" }));
      const role5 = new RoleEntity(customRoleDto({ name: "Guest" }));
      const role6 = new RoleEntity(customRoleDto({ name: "guESt" }));

      expect(role1.isAdmin()).toStrictEqual(true);
      expect(role2.isAdmin()).toStrictEqual(true);

      expect(role3.isUser()).toStrictEqual(true);
      expect(role4.isUser()).toStrictEqual(true);

      expect(role5.isGuest()).toStrictEqual(true);
      expect(role6.isGuest()).toStrictEqual(true);

      expect(role1.isAReservedRole()).toStrictEqual(true);
      expect(role2.isAReservedRole()).toStrictEqual(true);
      expect(role3.isAReservedRole()).toStrictEqual(true);
      expect(role4.isAReservedRole()).toStrictEqual(true);
      expect(role5.isAReservedRole()).toStrictEqual(true);
      expect(role6.isAReservedRole()).toStrictEqual(true);
    });

    it("should not be bypassed using capital letters or special characters", () => {
      expect.assertions(12);
      const role1 = new RoleEntity(customRoleDto({ name: "Admİn" }));
      const role2 = new RoleEntity(customRoleDto({ name: "adMi̇N" }));
      const role3 = new RoleEntity(customRoleDto({ name: "Usér" }));
      const role4 = new RoleEntity(customRoleDto({ name: "usÈR" }));
      const role5 = new RoleEntity(customRoleDto({ name: "Gùest" }));
      const role6 = new RoleEntity(customRoleDto({ name: "gũESt" }));

      expect(role1.isAdmin()).toStrictEqual(false);
      expect(role2.isAdmin()).toStrictEqual(false);

      expect(role3.isUser()).toStrictEqual(false);
      expect(role4.isUser()).toStrictEqual(false);

      expect(role5.isGuest()).toStrictEqual(false);
      expect(role6.isGuest()).toStrictEqual(false);

      expect(role1.isAReservedRole()).toStrictEqual(false);
      expect(role2.isAReservedRole()).toStrictEqual(false);
      expect(role3.isAReservedRole()).toStrictEqual(false);
      expect(role4.isAReservedRole()).toStrictEqual(false);
      expect(role5.isAReservedRole()).toStrictEqual(false);
      expect(role6.isAReservedRole()).toStrictEqual(false);
    });
  });
});
