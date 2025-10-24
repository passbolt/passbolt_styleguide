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
 * @since         5.7.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultSecretRevisionDto} from "./secretRevisionEntity.test.data";
import SecretRevisionEntity from "./secretRevisionEntity";
import {defaultUserDto} from "../user/userEntity.test.data";
import {v4 as uuidv4} from "uuid";
import {TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP} from "../resourceType/resourceTypeEntity.test.data";
import UserEntity from "../user/userEntity";
import {readSecret} from "../secret/secretEntity.test.data";

describe("SecretRevision", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretRevisionEntity.name, SecretRevisionEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "id");
      assertEntityProperty.uuid(SecretRevisionEntity, "id");
      assertEntityProperty.required(SecretRevisionEntity, "id");
    });

    it("validates resource_id property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "resource_id");
      assertEntityProperty.uuid(SecretRevisionEntity, "resource_id");
      assertEntityProperty.required(SecretRevisionEntity, "resource_id");
    });

    it("validates resource_type_id property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "resource_type_id");
      assertEntityProperty.uuid(SecretRevisionEntity, "resource_type_id");
      assertEntityProperty.required(SecretRevisionEntity, "resource_type_id");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "created");
      assertEntityProperty.dateTime(SecretRevisionEntity, "created");
      assertEntityProperty.required(SecretRevisionEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "modified");
      assertEntityProperty.dateTime(SecretRevisionEntity, "modified");
      assertEntityProperty.required(SecretRevisionEntity, "modified");
    });

    it("validates deleted property", () => {
      assertEntityProperty.string(SecretRevisionEntity, "deleted");
      assertEntityProperty.dateTime(SecretRevisionEntity, "deleted");
      assertEntityProperty.nullable(SecretRevisionEntity, "deleted");
      assertEntityProperty.notRequired(SecretRevisionEntity, "deleted");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(SecretRevisionEntity, "created_by");
      assertEntityProperty.required(SecretRevisionEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(SecretRevisionEntity, "modified_by");
      assertEntityProperty.required(SecretRevisionEntity, "modified_by");
    });

    it("validates creator property", () => {
      const secretRevisionDto = defaultSecretRevisionDto({}, {withCreator: true});
      const successScenarios = [
        {scenario: "a valid option", value: defaultUserDto()},
      ];
      const failScenarios = [
        {scenario: "with invalid creator", value: {"role": "admin"}},
      ];
      assertEntityProperty.assertAssociation(SecretRevisionEntity, "creator", secretRevisionDto, successScenarios, failScenarios);
    });

    it("validates secrets property", () => {
      const dto = defaultSecretRevisionDto({}, {withSecrets: true});
      const invalidSecret = [{id: "id"}];

      const successScenario = [
        {scenario: "valid secrets collection", value: dto.secrets},
      ];

      const failingScenario = [
        {scenario: "invalid secrets", value: invalidSecret},
      ];
      assertEntityProperty.assertAssociation(SecretRevisionEntity, "secrets", dto, successScenario, failingScenario);
      assertEntityProperty.notRequired(SecretRevisionEntity, "secrets");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(8);
      const dto = defaultSecretRevisionDto();
      const entity = new SecretRevisionEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.resource_id).toStrictEqual(dto.resource_id);
      expect(entity._props.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.deleted).toStrictEqual(null);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(10);
      const dto = defaultSecretRevisionDto({}, {withCreator: true, withSecrets: true});
      const entity = new SecretRevisionEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.resource_id).toStrictEqual(dto.resource_id);
      expect(entity._props.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.deleted).toStrictEqual(dto.deleted);
      expect(entity._creator.toDto(UserEntity.ALL_CONTAIN_OPTIONS)).toStrictEqual(dto.creator);
      expect(entity._secrets.toDto()).toStrictEqual(dto.secrets);
    });
  });

  describe("::toDto", () => {
    it("serialization works with full object inside collection and return with no contain", () => {
      expect.assertions(1);
      const dto = defaultSecretRevisionDto({}, {withCreator: true, withSecrets: true});
      const entity = new SecretRevisionEntity(dto);
      expect(entity.toDto(SecretRevisionEntity.ALL_CONTAIN_OPTIONS)).toEqual(dto);
    });

    it("serialization works with full object inside collection", () => {
      expect.assertions(1);
      const dto = defaultSecretRevisionDto({}, {withCreator: true, withSecrets: true});
      const entity = new SecretRevisionEntity(dto);
      delete dto.creator;
      delete dto.secrets;

      expect(entity.toDto()).toEqual(dto);
    });
  });

  describe("::getters", () => {
    it("`id` should return the right value", () => {
      expect.assertions(1);
      const id = uuidv4();
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({id: id}));
      expect(entity.id).toStrictEqual(id);
    });

    it("`resourceId` should return the right value", () => {
      expect.assertions(1);
      const resource_id = uuidv4();
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({resource_id: resource_id}));
      expect(entity.resourceId).toStrictEqual(resource_id);
    });

    it("`resourceTypeId` should return the right value", () => {
      expect.assertions(1);
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP}));
      expect(entity.resourceTypeId).toStrictEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
    });

    it("`created` should return the right value", () => {
      expect.assertions(1);
      const created = "2024-10-05T12:10:00+00:00";
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({created: created}));
      expect(entity.created).toStrictEqual(created);
    });

    it("`createdBy` should return the right value", () => {
      expect.assertions(1);
      const created_by = uuidv4();
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({created_by: created_by}));
      expect(entity.createdBy).toStrictEqual(created_by);
    });

    it("`modified` should return the right value", () => {
      expect.assertions(1);
      const modified = "2024-10-05T12:10:00+00:00";
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({modified: modified}));
      expect(entity.modified).toStrictEqual(modified);
    });

    it("`modifiedBy` should return the right value", () => {
      expect.assertions(1);
      const modified_by = uuidv4();
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({modified_by: modified_by}));
      expect(entity.modifiedBy).toStrictEqual(modified_by);
    });

    it("`deleted` should return the right value", () => {
      expect.assertions(1);
      const deleted = "2024-10-05T12:10:00+00:00";
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({deleted: deleted}));
      expect(entity.deleted).toStrictEqual(deleted);
    });

    it("`creator` should return the right value", () => {
      expect.assertions(1);
      const creator = defaultUserDto();
      //todo: put back when UserEntity is fully migrated
      delete creator.last_logged_in;
      delete creator.is_mfa_enabled;
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({creator: creator}));
      expect(entity.creator.toDto(UserEntity.ALL_CONTAIN_OPTIONS)).toStrictEqual(creator);
    });

    it("`secrets` should return the right value", () => {
      expect.assertions(1);
      const secrets = [readSecret()];
      const entity = new SecretRevisionEntity(defaultSecretRevisionDto({secrets: secrets}));
      expect(entity.secrets.toDto()).toStrictEqual(secrets);
    });
  });
});
