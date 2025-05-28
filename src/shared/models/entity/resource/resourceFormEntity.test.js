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
 * @since         4.10.0
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import ResourceFormEntity from "./resourceFormEntity";
import EntityValidationError from "../abstract/entityValidationError";
import {defaultResourceFormDto} from "./resourceFormEntity.test.data";
import {defaultSecretDataV5DefaultDto} from "../secretData/secretDataV5DefaultEntity.test.data";
import {resourceTypesCollectionDto} from "../resourceType/resourceTypesCollection.test.data";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import {
  resourceTypePasswordAndDescriptionDto, resourceTypePasswordStringDto,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP, TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_TOTP
} from "../resourceType/resourceTypeEntity.test.data";
import {
  defaultSecretDataV5DefaultTotpEntityDto,
  minimalSecretDataV5DefaultTotpEntityDto
} from "../secretData/secretDataV5DefaultTotpEntity.test.data";
import {defaultTotpDto} from "../totp/totpDto.test.data";
import {
  defaultSecretDataV5PasswordStringDto,
  minimalDefaultSecretDataV5PasswordStringDto
} from "../secretData/secretDataV5PasswordStringEntity.test.data";
import {
  defaultSecretDataV4DefaultData,
  minimalDefaultSecretDataV4DefaultData
} from "../secretData/secretDataV4DefaultEntity.test.data";
import {
  defaultSecretDataV4DefaultTotpEntityDto,
  minimalSecretDataV4DefaultTotpEntityDto
} from "../secretData/secretDataV4DefaultTotpEntity.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "../secretData/secretDataEntity";
import {ResourceEditCreateFormEnumerationTypes} from "../../resource/ResourceEditCreateFormEnumerationTypes";
import TotpEntity from "../totp/totpEntity";
import ResourceMetadataEntity from "./metadata/resourceMetadataEntity";

describe("Resource Form entity", () => {
  describe("ResourceFormEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceFormEntity.name, ResourceFormEntity.getSchema());
    });

    it("validates resource_type_id property", () => {
      assertEntityProperty.string(ResourceFormEntity, "resource_type_id");
      assertEntityProperty.uuid(ResourceFormEntity, "resource_type_id");
      assertEntityProperty.required(ResourceFormEntity, "resource_type_id");
    });
  });

  describe("ResourceEntity::constructor", () => {
    it("constructor returns validation error if dto required fields are missing", () => {
      expect.assertions(2);
      try {
        new ResourceFormEntity({});
      } catch (error) {
        expect(error instanceof EntityValidationError).toBe(true);
        expect(error.details).toStrictEqual({
          secret: {required: "The secret is required."},
          resource_type_id: {required: "The resource_type_id is required."},
        });
      }
    });

    it("works if minimal DTO is provided for a resource v5 default", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if complete DTO is provided for a resource v5 default", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({secret: defaultSecretDataV5DefaultDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v5 default totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: minimalSecretDataV5DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if complete DTO is provided for a resource v5 default totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: defaultSecretDataV5DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v5 totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v5 password string", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING, secret: minimalDefaultSecretDataV5PasswordStringDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if complete DTO is provided for a resource v5 password string", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING, secret: defaultSecretDataV5PasswordStringDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v4 default", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: minimalDefaultSecretDataV4DefaultData({description: ""})});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if complete DTO is provided for a resource v4 default", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: defaultSecretDataV4DefaultData()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v4 default totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: minimalSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if complete DTO is provided for a resource v4 default totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: defaultSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v4 totp", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("works if minimal DTO is provided for a resource v4 password string", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING, secret: {password: "password"}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });
  });

  describe("ResourceEntity::addSecret", () => {
    it("add secret password on v5 totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD);
      resourceDto.secret.password = "";
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret note on v5 totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      resourceDto.secret.description = "";
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret note on v5 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      resourceDto.secret.description = "";
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret totp on v5 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const totpEntity = TotpEntity.createFromDefault({}, {validate: false});

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.TOTP, {validate: false});
      resourceDto.secret.totp = totpEntity.toDto();
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret note on a resource v5 password string", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING, secret: minimalDefaultSecretDataV5PasswordStringDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      resourceDto.secret.description = "";
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret totp on a resource v5 password string", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING, secret: minimalDefaultSecretDataV5PasswordStringDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const totpEntity = TotpEntity.createFromDefault({}, {validate: false});

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.TOTP, {validate: false});
      resourceDto.secret.totp = totpEntity.toDto();
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret note on resource v4 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: minimalDefaultSecretDataV4DefaultData()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      resourceDto.secret.description = "";
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret totp on resource v4 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: minimalDefaultSecretDataV4DefaultData({description: ""})});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const totpEntity = TotpEntity.createFromDefault({}, {validate: false});

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.TOTP, {validate: false});
      resourceDto.secret.totp = totpEntity.toDto();
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret note on a resource v4 totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      resourceDto.secret.description = "";
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret password on a resource v4 totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD);
      resourceDto.secret.password = "";
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret totp on a resource v4 password string", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING, secret: {password: "password"}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
      const totpEntity = TotpEntity.createFromDefault({}, {validate: false});

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.TOTP, {validate: false});
      resourceDto.secret.totp = totpEntity.toDto();
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.secret.description = resourceDto.metadata.description;
      resourceDto.metadata.description = null;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("add secret unknown should do nothing", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret("unknown");
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("throw an error if add secret is not a string", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(() => resourceFormEntity.addSecret({})).toThrow(TypeError);
    });
  });

  describe("ResourceEntity::deleteSecret", () => {
    it("delete secret password on v5 default totp with password and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: minimalSecretDataV5DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD);
      delete resourceDto.secret.password;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v5 default totp with totp and note", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto(), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, {validate: false});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v5 default totp with password, note and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: defaultSecretDataV5DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret totp on v5 default totp with password and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: minimalSecretDataV5DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.TOTP);
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v5 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret password on v5 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({secret: defaultSecretDataV5DefaultDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, {validate: false});
      delete resourceDto.secret.password;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret password on v4 default totp with password and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: minimalSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD);
      delete resourceDto.secret.password;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v4 default totp with totp and note", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: {totp: defaultTotpDto(), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, {validate: false});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v4 default totp with password, note and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: defaultSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret totp on v4 default totp with password and totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: minimalSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.TOTP);
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret note on v4 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: defaultSecretDataV4DefaultData()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.NOTE);
      delete resourceDto.secret.description;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret password on v4 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: defaultSecretDataV4DefaultData()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, {validate: false});
      delete resourceDto.secret.password;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("delete secret unknown should do nothing", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret("unknown");
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("throw an error if delete secret is not a string", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(() => resourceFormEntity.deleteSecret({})).toThrow(TypeError);
    });
  });

  describe("ResourceEntity::convertToMetadataDescription", () => {
    it("convert secret note to metadata description on v4 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: defaultSecretDataV4DefaultData()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.convertToMetadataDescription();
      resourceDto.metadata.description = resourceDto.secret.description;
      delete resourceDto.secret.description;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_STRING;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_STRING;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_STRING);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("throw an error if secret entity class is not found", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: defaultSecretDataV4DefaultData()});
      const resourceTypeDtos = [resourceTypePasswordAndDescriptionDto()];
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(() => resourceFormEntity.convertToMetadataDescription({})).toThrow(TypeError);
    });
  });

  describe("ResourceEntity::convertToNote", () => {
    it("convert secret note to metadata description on v4 password string", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING, secret: {password: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.convertToNote();
      resourceDto.secret.description = resourceDto.metadata.description;
      resourceDto.metadata.description = null;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
    });

    it("throw an error if secret entity class is not found", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING, secret: {password: ""}});
      const resourceTypeDtos = [resourceTypePasswordStringDto()];
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      expect(() => resourceFormEntity.convertToNote({})).toThrow(TypeError);
    });
  });

  describe("ResourceEntity::removeEmptySecret", () => {
    it("remove totp secret and add require password secret from v4 password, description and totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: {totp: defaultTotpDto({secret_key: ""}), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.removeEmptySecret({validate: false});
      resourceFormEntity.addRequiredSecret();
      resourceDto.secret.password = "";
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("remove totp secret and add require password secret from v5 default totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto({secret_key: ""}), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.removeEmptySecret({validate: false});
      resourceFormEntity.addRequiredSecret();
      resourceDto.secret.password = null;
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type is a v4 password, description", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: {password: "", description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.removeEmptySecret();
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type is a v5 default", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.removeEmptySecret();
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type is a v4 totp", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.removeEmptySecret();
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type is a v5 totp", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.removeEmptySecret();
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });
  });

  describe("ResourceEntity::addRequiredSecret", () => {
    it("add require password secret from v4 password, description and totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: {totp: defaultTotpDto(), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.addRequiredSecret();
      resourceDto.secret.password = "";
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("add require password secret from v5 default totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto(), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.addRequiredSecret();
      resourceDto.secret.password = null;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource has password for password and description", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: {password: "", description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do not add password if the resource has password for a v5 default", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type has no password for a v4 totp", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("Do nothing if the resource type has no password for a v5 totp", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addRequiredSecret();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });
  });
  describe("ResourceFormEntity:upgradeToV5", () => {
    it("Should upgrade resource password string to v5 default", () => {
      expect.assertions(4);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING, secret: {password: "password"}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.upgradeToV5();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.metadata.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.metadata.objectType).toEqual(ResourceMetadataEntity.METADATA_OBJECT_TYPE);
      expect(resourceFormEntity.secret.objectType).toEqual(SECRET_DATA_OBJECT_TYPE);
    });
    it("Should upgrade resource password and description to v5 default", () => {
      expect.assertions(4);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: {password: "", description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.upgradeToV5();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.metadata.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.metadata.objectType).toEqual(ResourceMetadataEntity.METADATA_OBJECT_TYPE);
      expect(resourceFormEntity.secret.objectType).toEqual(SECRET_DATA_OBJECT_TYPE);
    });
    it("Should upgrade resource password-description-totp to v5 default", () => {
      expect.assertions(4);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP, secret: minimalSecretDataV4DefaultTotpEntityDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.upgradeToV5();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.metadata.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.metadata.objectType).toEqual(ResourceMetadataEntity.METADATA_OBJECT_TYPE);
      expect(resourceFormEntity.secret.objectType).toEqual(SECRET_DATA_OBJECT_TYPE);
    });

    it("Should upgrade resource standalone-totp to v5 totp", () => {
      expect.assertions(4);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.upgradeToV5();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.metadata.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.metadata.objectType).toEqual(ResourceMetadataEntity.METADATA_OBJECT_TYPE);
      expect(resourceFormEntity.secret.objectType).toEqual(SECRET_DATA_OBJECT_TYPE);
    });

    it("Should do nothing if resource is already a v5", () => {
      expect.assertions(4);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.upgradeToV5();
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.metadata.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_TOTP);
      expect(resourceFormEntity.metadata.objectType).toEqual(ResourceMetadataEntity.METADATA_OBJECT_TYPE);
      expect(resourceFormEntity.secret.objectType).toEqual(SECRET_DATA_OBJECT_TYPE);
    });
  });
});
