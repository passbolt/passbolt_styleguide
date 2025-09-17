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
  resourceTypeV5CustomFieldsDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5TotpDto,
  resourceTypeV5StandaloneNoteDto,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP, TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_TOTP,
  TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE
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
import SecretDataEntity, {SECRET_DATA_OBJECT_TYPE} from "../secretData/secretDataEntity";
import {ResourceEditCreateFormEnumerationTypes} from "../../resource/ResourceEditCreateFormEnumerationTypes";
import TotpEntity from "../totp/totpEntity";
import ResourceMetadataEntity from "./metadata/resourceMetadataEntity";
import {defaultResourceMetadataDto} from "./metadata/resourceMetadataEntity.test.data";
import {defaultCustomFieldsCollection} from "../customField/customFieldsCollection.test.data";
import {defaultSecretDataV5StandaloneTotpDto} from "../secretData/secretDataV5StandaloneTotpEntity.test.data";
import {defaultSecretDataV4StandaloneTotpDto} from "../secretData/secretDataV4StandaloneTotpEntity.test.data";
import {defaultSecretDataV4PasswordStringDto} from "../secretData/secretDataV4PasswordStringEntity.test.data";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../resourceType/resourceTypeSchemasDefinition";
import SecretDataV5DefaultEntity from "../secretData/secretDataV5DefaultEntity";
import SecretDataV5DefaultTotpEntity from "../secretData/secretDataV5DefaultTotpEntity";
import SecretDataV5StandaloneTotpEntity from "../secretData/secretDataV5StandaloneTotpEntity";
import SecretDataV5PasswordStringEntity from "../secretData/secretDataV5PasswordStringEntity";
import SecretDataV4DefaultEntity from "../secretData/secretDataV4DefaultEntity";
import SecretDataV4DefaultTotpEntity from "../secretData/secretDataV4DefaultTotpEntity";
import SecretDataV4StandaloneTotpEntity from "../secretData/secretDataV4StandaloneTotpEntity";
import secretDataV4PasswordStringEntity from "../secretData/secretDataV4PasswordStringEntity";
import SecretDataV5StandaloneCustomFieldsCollection from "../secretData/secretDataV5StandaloneCustomFieldsCollection";
import ResourceTypeEntity from "../resourceType/resourceTypeEntity";
import CustomFieldEntity from "../customField/customFieldEntity";
import {emptyCustomFieldDto} from "../customField/customFieldEntity.test.data";
import {defaultSecretDataV5StandaloneNoteDto} from "../secretData/secretDataV5StandaloneNoteEntity.test.data";

describe("Resource Form entity", () => {
  describe("ResourceFormEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceFormEntity.name, ResourceFormEntity.getSchema());
    });

    it("validates metadata property", () => {
      const dto = defaultResourceFormDto();
      const successScenarios = [
        {scenario: "valid metadata object", value: defaultResourceMetadataDto()},
      ];
      const failScenarios = [
        {scenario: "invalid metadata type: integer", value: 42},
      ];
      assertEntityProperty.assertAssociation(ResourceFormEntity, "metadata", dto, successScenarios, failScenarios);
      assertEntityProperty.requiredInSchema(ResourceFormEntity, "metadata");
    });

    it("validates secret property", () => {
      const dto = defaultResourceFormDto();
      const successScenarios = [
        //v4
        {scenario: "valid secret: SecretDataV4DefaultEntity", value: defaultSecretDataV5DefaultDto()},
        {scenario: "valid secret: SecretDataV4DefaultTotpEntity", value: defaultSecretDataV4DefaultTotpEntityDto()},
        {scenario: "valid secret: SecretDataV4StandaloneTotpEntity", value: defaultSecretDataV4StandaloneTotpDto()},
        {scenario: "valid secret: SecretDataV4PasswordStringEntity", value: defaultSecretDataV4PasswordStringDto()},
        //v5
        {scenario: "valid secret: SecretDataV5DefaultEntity", value: defaultSecretDataV5DefaultDto()},
        {scenario: "valid secret: SecretDataV5DefaultTotpEntity", value: defaultSecretDataV5DefaultTotpEntityDto()},
        {scenario: "valid secret: SecretDataV5StandaloneTotpEntity", value: defaultSecretDataV5StandaloneTotpDto()},
        {scenario: "valid secret: SecretDataV5PasswordStringEntity", value: defaultSecretDataV5PasswordStringDto()},
        {scenario: "valid secret: SecretDataV5StandaloneCustomFieldsCollection", value: defaultCustomFieldsCollection()},
      ];
      const failScenarios = [
        {scenario: "invalid secret type: integer", value: 42},
      ];
      assertEntityProperty.assertAssociation(ResourceFormEntity, "secret", dto, successScenarios, failScenarios);
      assertEntityProperty.requiredInSchema(ResourceFormEntity, "secret");
    });

    it("validates resource_type_id property", () => {
      assertEntityProperty.string(ResourceFormEntity, "resource_type_id");
      assertEntityProperty.uuid(ResourceFormEntity, "resource_type_id");
      assertEntityProperty.required(ResourceFormEntity, "resource_type_id");
    });
  });

  describe("::constructor", () => {
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

    it("works if complete DTO is provided for a resource v5 standalone note", () => {
      expect.assertions(1);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE, secret: defaultSecretDataV5StandaloneNoteDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      console.log(resourceTypeDtos);
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

  describe("::getSecretEntityClassByResourceType", () => {
    it("should return the right secret entity", () => {
      const scenarios = [
        {slug: RESOURCE_TYPE_V5_DEFAULT_SLUG, expectation: SecretDataV5DefaultEntity},
        {slug: RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG, expectation: SecretDataV5DefaultTotpEntity},
        {slug: RESOURCE_TYPE_V5_TOTP_SLUG, expectation: SecretDataV5StandaloneTotpEntity},
        {slug: RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG, expectation: SecretDataV5PasswordStringEntity},
        {slug: RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG, expectation: SecretDataV4DefaultEntity},
        {slug: RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG, expectation: SecretDataV4DefaultTotpEntity},
        {slug: RESOURCE_TYPE_TOTP_SLUG, expectation: SecretDataV4StandaloneTotpEntity},
        {slug: RESOURCE_TYPE_PASSWORD_STRING_SLUG, expectation: secretDataV4PasswordStringEntity},
        {slug: RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG, expectation: SecretDataV5StandaloneCustomFieldsCollection},
        {slug: "something-else", expectation: null},
      ];
      expect.assertions(scenarios.length);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      for (let i = 0; i < scenarios.length; i++) {
        const {slug, expectation} = scenarios[i];
        expect(resourceForm.getSecretEntityClassByResourceType(slug)).toStrictEqual(expectation);
      }
    });
  });

  describe("::associations", () => {
    it("associations should have metadata and secret", () => {
      expect.assertions(1);
      expect(ResourceFormEntity.associations).toStrictEqual({metadata: ResourceMetadataEntity, secret: SecretDataEntity});
    });
  });

  describe("::isResourceTypeHasSecretProperty", () => {
    it("should return true if the entity has a password", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5DefaultDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "secret.password")).toStrictEqual(true);
    });

    it("should return true if the entity has a totp", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5DefaultTotpDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "secret.totp")).toStrictEqual(true);
    });

    it("should return true if the entity has a secure note", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5DefaultDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "secret.description")).toStrictEqual(true);
    });

    it("should return true if the entity has custom fields", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5CustomFieldsDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "secret.custom_fields")).toStrictEqual(true);
    });

    it("should return true if the entity has standalone note", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5StandaloneNoteDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "secret.description")).toStrictEqual(true);
    });

    it("should return false if the entity has not the target secret", () => {
      expect.assertions(1);

      const resourceForm = new ResourceFormEntity(defaultResourceFormDto(), {validate: false});
      const resourceTypes = new ResourceTypeEntity(resourceTypeV5TotpDto());

      expect(resourceForm.isResourceTypeHasSecretProperty(resourceTypes, "other")).toStrictEqual(false);
    });
  });

  describe("::addSecret", () => {
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

    it("add secret custom fields on v5 totp", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS);
      resourceDto.secret.custom_fields = [CustomFieldEntity.createFromDefault().toDto()];
      resourceDto.secret.custom_fields[0].id = resourceFormEntity.secret.customFields.items[0]._props.id;
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

    it("add secret custom fields on v5 default", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto();
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS);
      resourceDto.secret.custom_fields = [CustomFieldEntity.createFromDefault().toDto()];
      resourceDto.secret.custom_fields[0].id = resourceFormEntity.secret.customFields.items[0]._props.id;
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

    it("add secret custom fields on a resource v5 password string", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING, secret: minimalDefaultSecretDataV5PasswordStringDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection});
      resourceFormEntity.addSecret(ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS);
      resourceDto.secret.custom_fields = [CustomFieldEntity.createFromDefault().toDto()];
      resourceDto.secret.custom_fields[0].id = resourceFormEntity.secret.customFields.items[0]._props.id;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
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

  describe("::deleteSecret", () => {
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

    it("delete secret password on v5 default should create a standalone note", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceFormDto({secret: defaultSecretDataV5DefaultDto()});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: resourceTypesCollection});
      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.PASSWORD, {validate: false});
      delete resourceDto.secret.password;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;

      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE);
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

    it("delete custom_field on v5 default totp", () => {
      expect.assertions(5);
      const custom_fields = defaultCustomFieldsCollection();
      const resourceDto = defaultResourceFormDto({
        metadata: defaultResourceMetadataDto(),
        secret: defaultSecretDataV5DefaultTotpEntityDto({custom_fields}),
      });

      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.metadata._customFields).toBeFalsy();
      expect(resourceFormEntity.secret._customFields).toBeTruthy();

      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS, {validate: false});
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceFormEntity.secret._customFields).toBeFalsy();
      expect(resourceFormEntity.metadata._customFields).toBeFalsy();
    });

    it("delete custom_field on v5 default", () => {
      expect.assertions(5);
      const custom_fields = defaultCustomFieldsCollection();
      const resourceDto = defaultResourceFormDto({
        metadata: defaultResourceMetadataDto(),
        secret: defaultSecretDataV5DefaultDto({custom_fields}),
      });

      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: resourceTypesCollection});
      expect(resourceFormEntity.metadata._customFields).toBeFalsy();
      expect(resourceFormEntity.secret._customFields).toBeTruthy();

      resourceFormEntity.deleteSecret(ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS, {validate: false});
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.secret._customFields).toBeFalsy();
      expect(resourceFormEntity.metadata._customFields).toBeFalsy();
    });
  });

  describe("::convertToMetadataDescription", () => {
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

  describe("::convertToNote", () => {
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

  describe("::removeEmptySecret", () => {
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

    it("remove totp secret should set a standalone note from v5 default totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP, secret: {object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto({secret_key: ""}), description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.removeEmptySecret({validate: false});
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE);
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
      resourceFormEntity.addSecret("secret.password");
      resourceDto.secret.password = "";
      delete resourceDto.secret.totp;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("remove custom fields secret and add require password secret from v5 default totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT, secret: {object_type: SECRET_DATA_OBJECT_TYPE, custom_fields: [emptyCustomFieldDto()], description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.removeEmptySecret({validate: false});
      resourceFormEntity.addSecret("secret.password");
      resourceDto.secret.password = "";
      delete resourceDto.secret.custom_fields;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_DEFAULT;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_DEFAULT);
      expect(resourceFormEntity.toDto()).toEqual(resourceDto);
      expect(resourceFormEntity.validate()).toBeNull();
    });

    it("remove custom fields secret should set a standalone note from v5 default totp resource", () => {
      expect.assertions(3);
      const resourceDto = defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT, secret: {object_type: SECRET_DATA_OBJECT_TYPE, custom_fields: [emptyCustomFieldDto()], description: ""}});
      const resourceTypeDtos = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);

      const resourceFormEntity = new ResourceFormEntity(resourceDto, {resourceTypes: resourceTypesCollection, validate: false});
      resourceFormEntity.removeEmptySecret({validate: false});
      delete resourceDto.secret.custom_fields;
      resourceDto.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;
      resourceDto.metadata.resource_type_id = TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE;
      // expectation
      expect(resourceFormEntity.resourceTypeId).toEqual(TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE);
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

  describe("::addRequiredSecret", () => {
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

  describe(":upgradeToV5", () => {
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
