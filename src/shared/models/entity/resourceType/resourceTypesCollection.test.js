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
 * @since         4.1.0
 */
import EntitySchema from "../../entity/abstract/entitySchema";
import ResourceTypesCollection from "./resourceTypesCollection";
import {
  resourceTypesCollectionDto,
  buildDefineNumberOfResourceTypesDtos, resourceTypesV4CollectionDto, resourceTypesV5CollectionDto
} from "./resourceTypesCollection.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP,
  resourceTypePasswordStringDto,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_TOTP
} from "./resourceTypeEntity.test.data";
import CollectionValidationError from "../../entity/abstract/collectionValidationError";
import {v4 as uuid} from "uuid";
import expect from "expect";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "./resourceTypeSchemasDefinition";
import {RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5} from "../metadata/metadataTypesSettingsEntity";

describe("ResourceTypesCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceTypesCollection.name, ResourceTypesCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);
      const resourceTypesDto = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesDto);
      expect(resourceTypesCollection.toDto()).toEqual(resourceTypesDto);
    });

    it("constructor works if valid DTO is provided with optional and non supported fields", () => {
      expect.assertions(1);
      const resourceTypesDto = resourceTypesCollectionDto();
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesDto);
      expect(resourceTypesCollection.toDto()).toEqual(resourceTypesDto);
    });

    it("constructor fails if reusing same resource type id", () => {
      expect.assertions(1);
      const resourceTypeDto = resourceTypePasswordStringDto();
      const resourceTypesDto = [resourceTypeDto, resourceTypeDto];
      expect(() => new ResourceTypesCollection(resourceTypesDto)).toThrow(CollectionValidationError);
    });

    it("constructor fails if reusing same resource type slug", () => {
      expect.assertions(1);
      const resourceTypeDto1 = resourceTypePasswordStringDto();
      const resourceTypeDto2 = resourceTypePasswordStringDto();
      const resourceTypesDto = [resourceTypeDto1, resourceTypeDto2];
      expect(() => new ResourceTypesCollection(resourceTypesDto)).toThrow(CollectionValidationError);
    });

    it("constructor should be empty if no resource types are supported", () => {
      expect.assertions(1);
      const dto1 = resourceTypePasswordStringDto({slug: 'unsupported-slug'});
      const dto2 = resourceTypePasswordStringDto({slug: 'unsupported-slug-2'});
      const resourceTypesCollection = new ResourceTypesCollection([dto1, dto2]);
      expect(resourceTypesCollection.length).toStrictEqual(0);
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the build rules: must have unique slug", () => {
      expect.assertions(2);
      const resourceTypeDto1 = resourceTypePasswordStringDto();
      const resourceTypeDto2 = resourceTypePasswordStringDto();
      const resourceTypesDto = [resourceTypeDto1, resourceTypeDto2];
      const options = {ignoreInvalidEntity: true};
      const collection = new ResourceTypesCollection(resourceTypesDto, options);
      expect(collection).toHaveLength(1);
      expect(collection._items[0].toDto()).toStrictEqual(resourceTypeDto1);
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate", () => {
      expect.assertions(2);
      const resourceTypeDto1 = resourceTypePasswordStringDto();
      const resourceTypeDto2 = resourceTypePasswordStringDto({
        id: "wrong-id"
      });
      const resourceTypesDto = [resourceTypeDto1, resourceTypeDto2];
      const options = {ignoreInvalidEntity: true};
      const collection = new ResourceTypesCollection(resourceTypesDto, options);
      expect(collection).toHaveLength(1);
      expect(collection._items[0].toDto()).toStrictEqual(resourceTypeDto1);
    });

    it("Check if resource type id is present or not in the collection", () => {
      const resourceTypesDto = resourceTypesCollectionDto();
      expect.assertions(resourceTypesDto.length + 1);
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesDto);
      for (let i = 0; i < resourceTypesDto.length; i++) {
        expect(resourceTypesCollection.isResourceTypeIdPresent(resourceTypesDto[i].id)).toBeTruthy();
      }
      expect(resourceTypesCollection.isResourceTypeIdPresent(uuid())).toBeFalsy();
    });
  });

  describe("::filterByPasswordResourceTypes", () => {
    it("should filter the collection by resources types behaving like password.", () => {
      expect.assertions(9);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      resourceTypes.filterByPasswordResourceTypes();
      expect(resourceTypes).toHaveLength(6);
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_TOTP)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_TOTP)).toBeFalsy();
    });
  });


  describe("::filterByResourceTypeVersion", () => {
    it("should filter the collection by resources types by the version 4.", () => {
      expect.assertions(9);

      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());

      resourceTypes.filterByResourceTypeVersion("v4");
      expect(resourceTypes).toHaveLength(4);
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_PASSWORD_STRING)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_TOTP)).toBeFalsy();
    });

    it("should filter the collection by resources types by the version 5.", () => {
      expect.assertions(9);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      resourceTypes.filterByResourceTypeVersion("v5");

      expect(resourceTypes).toHaveLength(4);

      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_TOTP)).toBeFalsy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_TOTP)).toBeTruthy();
    });
  });

  describe("::getFirstById", () => {
    it("should get first resource types entity by id.", () => {
      expect.assertions(9);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_PASSWORD_STRING)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(TEST_RESOURCE_TYPE_V5_TOTP)).toBeTruthy();
      expect(resourceTypes.getFirstById(uuid())).toBeFalsy();
    });
  });

  describe("::getFirstBySlug", () => {
    it("should get first resource types entity by slug.", () => {
      expect.assertions(9);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_STRING_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.getFirstBySlug("test")).toBeFalsy();
    });
  });

  describe("::hasOneWithSlug", () => {
    it("should have one with slug.", () => {
      expect.assertions(9);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_STRING_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug(RESOURCE_TYPE_V5_TOTP_SLUG)).toBeTruthy();
      expect(resourceTypes.hasOneWithSlug("test")).toBeFalsy();
    });
  });

  describe("::hasSomePasswordResourceTypes", () => {
    it("should have some password resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.hasSomePasswordResourceTypes()).toBeTruthy();
    });

    it("should have some password resource types v5.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.hasSomePasswordResourceTypes(RESOURCE_TYPE_VERSION_5)).toBeTruthy();
    });

    it("should not have some password resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      expect(resourceTypes.hasSomePasswordResourceTypes(RESOURCE_TYPE_VERSION_4)).toBeFalsy();
    });

    it("should not have some password resource types v5.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      expect(resourceTypes.hasSomePasswordResourceTypes(RESOURCE_TYPE_VERSION_5)).toBeFalsy();
    });
  });

  describe("::hasSomeTotpResourceTypes", () => {
    it("should have some totp resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.hasSomeTotpResourceTypes()).toBeTruthy();
    });

    it("should have some totp resource types v5.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(resourceTypes.hasSomeTotpResourceTypes(RESOURCE_TYPE_VERSION_5)).toBeTruthy();
    });

    it("should not have some totp resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      expect(resourceTypes.hasSomeTotpResourceTypes(RESOURCE_TYPE_VERSION_4)).toBeFalsy();
    });

    it("should not have some totp resource types v5.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      expect(resourceTypes.hasSomeTotpResourceTypes(RESOURCE_TYPE_VERSION_5)).toBeFalsy();
    });
  });

  describe("::hasSomeOfVersion", () => {
    it("should have some v4 resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      expect(resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_4)).toBeTruthy();
    });

    it("should note have some v4 resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      expect(resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_4)).toBeFalsy();
    });

    it("should have some v5 resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      expect(resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_5)).toBeTruthy();
    });

    it("should note have some v5 resource types.", () => {
      expect.assertions(1);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      expect(resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_5)).toBeFalsy();
    });
  });

  describe(":pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      const count = 10_000;
      const dtos = buildDefineNumberOfResourceTypesDtos(count);

      const start = performance.now();
      const collection = new ResourceTypesCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(8);
      expect(time).toBeLessThan(5_000);
    });
  });
});
