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
 * @since         3.0.0
 */
import EntitySchema from "../abstract/entitySchema";
import ResourceTypeEntity from "./resourceTypeEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto,
  resourceTypeTotpDto,
  resourceTypeV5CustomFieldsDto,
  resourceTypeV5StandaloneNoteDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5PasswordStringDto,
  resourceTypeV5TotpDto,
  resourceTypeWithoutSecretDefinitionDto,
} from "./resourceTypeEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";

describe("ResourceTypeEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceTypeEntity.name, ResourceTypeEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(ResourceTypeEntity, "id");
      assertEntityProperty.required(ResourceTypeEntity, "id");
    });

    it("validates name property", () => {
      assertEntityProperty.string(ResourceTypeEntity, "name");
      assertEntityProperty.minLength(ResourceTypeEntity, "name", 1);
      assertEntityProperty.maxLength(ResourceTypeEntity, "name", 255);
      assertEntityProperty.required(ResourceTypeEntity, "name");
    });

    it("validates slug property", () => {
      assertEntityProperty.string(ResourceTypeEntity, "slug");
      assertEntityProperty.minLength(ResourceTypeEntity, "slug", 1);
      assertEntityProperty.maxLength(ResourceTypeEntity, "slug", 64);
      assertEntityProperty.required(ResourceTypeEntity, "slug");
    });

    it("validates definition property", () => {
      const successScenarios = [assertEntityProperty.SCENARIO_OBJECT];
      /*
       * @todo: //add failing scenarios when nested object will be checked
       */
      const failingScenarios = [];

      assertEntityProperty.assert(ResourceTypeEntity, "definition", successScenarios, failingScenarios, "type");
      assertEntityProperty.required(ResourceTypeEntity, "definition");
    });

    it("validates description property", () => {
      const successScenarios = [...assertEntityProperty.SUCCESS_STRING_SCENARIOS, assertEntityProperty.SCENARIO_NULL];
      const failingScenarios = [...assertEntityProperty.FAIL_STRING_SCENARIOS];

      assertEntityProperty.assert(ResourceTypeEntity, "description", successScenarios, failingScenarios, "type");
      assertEntityProperty.notRequired(ResourceTypeEntity, "description");
    });

    it("validates resources_count property", () => {
      assertEntityProperty.integer(ResourceTypeEntity, "resources_count");
      assertEntityProperty.notRequired(ResourceTypeEntity, "resources_count");
    });

    it("validates created property", () => {
      assertEntityProperty.string(ResourceTypeEntity, "created");
      assertEntityProperty.dateTime(ResourceTypeEntity, "created");
      assertEntityProperty.notRequired(ResourceTypeEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(ResourceTypeEntity, "modified");
      assertEntityProperty.dateTime(ResourceTypeEntity, "modified");
      assertEntityProperty.notRequired(ResourceTypeEntity, "modified");
    });

    it("validates deleted property", () => {
      assertEntityProperty.string(ResourceTypeEntity, "deleted");
      assertEntityProperty.dateTime(ResourceTypeEntity, "deleted");
      assertEntityProperty.notRequired(ResourceTypeEntity, "deleted");
      assertEntityProperty.nullable(ResourceTypeEntity, "deleted");
    });
  });

  describe("::constructor", () => {
    it("works if valid minimal DTO is provided", () => {
      expect.assertions(1);
      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);
      expect(entity.toDto()).toEqual(dto);
    });

    it("works if full DTO is provided", () => {
      expect.assertions(1);
      const dto = resourceTypePasswordDescriptionTotpDto();
      const resourceTypeEntity = new ResourceTypeEntity(dto);
      expect(resourceTypeEntity.toDto()).toEqual(dto);
    });

    it("should throw an error if slug is unknown", () => {
      expect.assertions(1);
      const dto = resourceTypePasswordAndDescriptionDto({
        slug: "wrong-slug",
      });
      expect(() => new ResourceTypeEntity(dto)).toThrow(
        new EntityValidationError("Could not validate entity ResourceTypeEntity."),
      );
    });

    it("should throw an error if slug is invalid", () => {
      expect.assertions(1);
      const dto = resourceTypePasswordAndDescriptionDto({
        slug: 42,
      });
      expect(() => new ResourceTypeEntity(dto)).toThrow(
        new EntityValidationError("Could not validate entity ResourceTypeEntity."),
      );
    });
  });

  describe("::marshall", () => {
    it("should set the right plaintext secret definition for: password-string", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "password-string" });
      const expectedSecretDefinition = resourceTypePasswordStringDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: password-and-description", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "password-and-description" });
      const expectedSecretDefinition = resourceTypePasswordAndDescriptionDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: password-description-totp", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "password-description-totp" });
      const expectedSecretDefinition = resourceTypePasswordDescriptionTotpDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: totp", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "totp" });
      const expectedSecretDefinition = resourceTypeTotpDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: v5 default", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "v5-default" });
      const expectedSecretDefinition = resourceTypeV5DefaultDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: v5 default totp", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "v5-default-with-totp" });
      const expectedSecretDefinition = resourceTypeV5DefaultTotpDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: v5 password string", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "v5-password-string" });
      const expectedSecretDefinition = resourceTypeV5PasswordStringDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });

    it("should set the right plaintext secret definition for: v5 totp", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "v5-totp-standalone" });
      const expectedSecretDefinition = resourceTypeV5TotpDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });
    it("should set the right secret definition for: v5 custom fields", () => {
      expect.assertions(2);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "v5-custom-fields" });
      const expectedSecretDefinition = resourceTypeV5CustomFieldsDto().definition.secret;

      const resourceTypeEntity = new ResourceTypeEntity(dto);

      expect(resourceTypeEntity.definition.secret).toBeTruthy();
      expect(resourceTypeEntity.definition.secret).toStrictEqual(expectedSecretDefinition);
    });
  });

  describe("::getters", () => {
    it("should provide the right values when everything is set", () => {
      expect.assertions(3);

      const dto = resourceTypeWithoutSecretDefinitionDto({ slug: "password-description-totp" });
      const entity = new ResourceTypeEntity(dto);

      const expectedDefinition = resourceTypePasswordDescriptionTotpDto().definition;

      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.definition).toStrictEqual(expectedDefinition);
      expect(entity.slug).toStrictEqual(dto.slug);
    });
  });

  describe("::hasTotp", () => {
    it("standalone totp should have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeTruthy();
    });

    it("password totp should have totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeTruthy();
    });

    it("password and description should not have totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeFalsy();
    });

    it("password string should not have totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeFalsy();
    });

    it("v5 default should not have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeFalsy();
    });

    it("v5 default totp should have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeTruthy();
    });

    it("v5 password string should not have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeFalsy();
    });

    it("v5 totp should have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeTruthy();
    });

    it("v5 custom fields should not have totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasTotp()).toBeFalsy();
    });
  });

  describe("::hasPassword", () => {
    it("standalone totp should not have password", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeFalsy();
    });

    it("password totp should have password", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("password and description should have password", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("password string should have password", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("v5 default should have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("v5 default totp should have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("v5 password string should have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeTruthy();
    });

    it("v5 totp should not have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeFalsy();
    });
    it("v5 custom fields should not have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasPassword()).toBeFalsy();
    });
  });

  describe("::hasCustomFields", () => {
    it("standalone totp should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });

    it("password totp should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });

    it("password and description should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });

    it("password string should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });

    it("v5 default should have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeTruthy();
    });

    it("v5 default totp should have password", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeTruthy();
    });

    it("v5 password string should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });

    it("v5 totp should not have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeFalsy();
    });
    it("v5 custom fields should have custom fields", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasCustomFields()).toBeTruthy();
    });
  });

  describe("::isStandaloneTotp", () => {
    it("standalone totp should be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeTruthy();
    });

    it("password totp should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("password and description should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("password string should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("default v5 should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("default v5 totp should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("v5 password string should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });

    it("v5 totp should be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeTruthy();
    });

    it("v5 custom fields should not be standalone totp", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isStandaloneTotp()).toBeFalsy();
    });
  });

  describe("::hasSecretDescription", () => {
    it("standalone totp should not have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeFalsy();
    });

    it("password totp should have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeTruthy();
    });

    it("password and description should have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeTruthy();
    });

    it("password string should not have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeFalsy();
    });

    it("v5 default should have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeTruthy();
    });

    it("v5 default totp should have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeTruthy();
    });

    it("v5 standalone note should have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5StandaloneNoteDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeTruthy();
    });

    it("v5 password string should not have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeFalsy();
    });

    it("v5 totp should not have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeFalsy();
    });
    it("v5 custom fields should not have secret description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasSecretDescription()).toBeFalsy();
    });
  });

  describe("::hasMetadataDescription", () => {
    it("standalone totp should not have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeFalsy();
    });

    it("password totp should not have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeFalsy();
    });

    it("password and description should not have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeFalsy();
    });

    it("password string should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });

    it("v5 default should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });

    it("v5 default totp should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });

    it("v5 password string should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });

    it("v5 totp should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });
    it("v5 custom fields should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });

    it("v5 standalone note should have metadata description", () => {
      expect.assertions(1);

      const dto = resourceTypeV5StandaloneNoteDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.hasMetadataDescription()).toBeTruthy();
    });
  });

  describe("::is V5 or V4", () => {
    it("standalone totp should be v4 version", () => {
      expect.assertions(2);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeFalsy();
      expect(entity.isV4()).toBeTruthy();
    });

    it("password totp should be v4 version", () => {
      expect.assertions(2);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeFalsy();
      expect(entity.isV4()).toBeTruthy();
    });

    it("password and description should be v4 version", () => {
      expect.assertions(2);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeFalsy();
      expect(entity.isV4()).toBeTruthy();
    });

    it("password string should be v4 version", () => {
      expect.assertions(2);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeFalsy();
      expect(entity.isV4()).toBeTruthy();
    });

    it("v5 default should be v5 version", () => {
      expect.assertions(2);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeTruthy();
      expect(entity.isV4()).toBeFalsy();
    });

    it("v5 default totp should be v5 version", () => {
      expect.assertions(2);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeTruthy();
      expect(entity.isV4()).toBeFalsy();
    });

    it("v5 password string should be v5 version", () => {
      expect.assertions(2);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeTruthy();
      expect(entity.isV4()).toBeFalsy();
    });

    it("v5 totp should be v5 version", () => {
      expect.assertions(2);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeTruthy();
      expect(entity.isV4()).toBeFalsy();
    });
    it("v5 custom fields should be v5 version", () => {
      expect.assertions(2);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isV5()).toBeTruthy();
      expect(entity.isV4()).toBeFalsy();
    });
  });

  describe("::isPasswordString", () => {
    it("standalone totp should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("password totp should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordDescriptionTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("password and description should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordAndDescriptionDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("password string should be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypePasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeTruthy();
    });

    it("default v5 should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("default v5 totp should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeV5DefaultTotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("v5 password string should be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeV5PasswordStringDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeTruthy();
    });

    it("v5 totp should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeV5TotpDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });

    it("v5 custom field should not be a password string", () => {
      expect.assertions(1);

      const dto = resourceTypeV5CustomFieldsDto();
      const entity = new ResourceTypeEntity(dto);

      expect(entity.isPasswordString()).toBeFalsy();
    });
  });
});
