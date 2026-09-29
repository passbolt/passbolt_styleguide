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

import {
  defaultResourceDto,
  resourceStandaloneCustomFieldsDto,
  resourceStandaloneNoteDto,
  resourceStandalonePinCodeDto,
  resourceStandaloneTotpDto,
  resourceUnknownResourceTypeDto,
} from "../models/entity/resource/resourceEntity.test.data";
import { filterResourcesBySearch, filterResourcesSupportedByQuickAccess } from "./filterUtils";
import { defaultResourceMetadataDto } from "../models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {
  customFieldWithAllInMetadata,
  customFieldWithAllInSecret,
} from "../models/entity/customField/customFieldEntity.test.data";
import CustomFieldEntity from "../models/entity/customField/customFieldEntity";
import ResourceTypesCollection from "../models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../models/entity/resourceType/resourceTypesCollection.test.data";

describe("filterUtils", () => {
  describe("::filterResourcesBySearch", () => {
    it("should filter the resources with the given keyword on the resource name", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "abc" }) });
      const resource2 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "def" }) });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "ghi" }) });
      const resource4 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "jkl" }) });

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource username", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ username: "abc" }) });
      const resource2 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ username: "def" }) });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ username: "ghi" }) });
      const resource4 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ username: "jkl" }) });

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource primary uri", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ uris: ["abc"] }) });
      const resource2 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ uris: ["def"] }) });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ uris: ["ghi"] }) });
      const resource4 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ uris: ["jkl"] }) });

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource description", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ description: "abc" }) });
      const resource2 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ description: "def" }) });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ description: "ghi" }) });
      const resource4 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ description: "jkl" }) });

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the custom field labels", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "abc",
          custom_fields: [
            customFieldWithAllInMetadata({ metadata_key: "license" }),
            customFieldWithAllInMetadata({ metadata_key: "serial" }),
          ],
        }),
      });
      const resource2 = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "def",
          custom_fields: [customFieldWithAllInMetadata({ metadata_key: "token" })],
        }),
      });
      const resource3 = defaultResourceDto({ metadata: defaultResourceMetadataDto({ name: "serial" }) });

      const allResources = [resource1, resource2, resource3];

      const resources = filterResourcesBySearch(allResources, "license");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource1);
    });

    it("should never match the custom field values", () => {
      expect.assertions(1);
      const resource = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "abc",
          custom_fields: [customFieldWithAllInMetadata({ metadata_key: "license", metadata_value: "XYZ-123" })],
        }),
      });

      const resources = filterResourcesBySearch([resource], "XYZ-123");
      expect(resources.length).toStrictEqual(0);
    });

    it("should never match a custom field label stored in the secret", () => {
      expect.assertions(1);
      const customField = new CustomFieldEntity(customFieldWithAllInSecret({ secret_key: "license" }));
      const resource = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "abc",
          custom_fields: [customField.toMetadataDto()],
        }),
      });

      const resources = filterResourcesBySearch([resource], "license");
      expect(resources.length).toStrictEqual(0);
    });

    it("should require all the searched words to match, across the name and the custom field labels", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "router",
          custom_fields: [customFieldWithAllInMetadata({ metadata_key: "serial" })],
        }),
      });
      const resource2 = defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "router",
          custom_fields: [customFieldWithAllInMetadata({ metadata_key: "license" })],
        }),
      });

      const resources = filterResourcesBySearch([resource1, resource2], "router serial");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource1);
    });
  });

  describe("::filterResourcesSupportedByQuickAccess", () => {
    it("should keep the password, totp, pin code, note and custom fields resources and drop the unknown types", () => {
      expect.assertions(6);
      const resourceType = new ResourceTypesCollection(resourceTypesCollectionDto());
      const password = defaultResourceDto();
      const totp = resourceStandaloneTotpDto();
      const pinCode = resourceStandalonePinCodeDto();
      const note = resourceStandaloneNoteDto();
      const customFields = resourceStandaloneCustomFieldsDto();
      const unknown = resourceUnknownResourceTypeDto();
      const resources = filterResourcesSupportedByQuickAccess(
        [password, totp, pinCode, note, customFields, unknown],
        resourceType,
      );
      expect(resources.length).toStrictEqual(5);
      expect(resources).toContain(password);
      expect(resources).toContain(totp);
      expect(resources).toContain(pinCode);
      expect(resources).toContain(note);
      expect(resources).toContain(customFields);
    });

    it("should load nothing when resource types are not loaded", () => {
      expect.assertions(1);
      expect(filterResourcesSupportedByQuickAccess([defaultResourceDto()], null)).toStrictEqual([]);
    });
  });
});
