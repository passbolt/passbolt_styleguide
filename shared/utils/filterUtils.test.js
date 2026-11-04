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
  resourceStandalonePinCodeDto,
  resourceStandaloneTotpDto,
} from "../models/entity/resource/resourceEntity.test.data";
import { filterResourcesBySearch, filterResourcesSupportedByQuickAccess } from "./filterUtils";
import { defaultResourceMetadataDto } from "../models/entity/resource/metadata/resourceMetadataEntity.test.data";
import ResourceTypesCollection from "../models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../models/entity/resourceType/resourceTypesCollection.test.data";
import { TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE } from "../models/entity/resourceType/resourceTypeEntity.test.data";

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
  });

  describe("::filterResourcesSupportedByQuickAccess", () => {
    it("should keep the password, totp and pin code resources and drop the others", () => {
      expect.assertions(4);
      const resourceType = new ResourceTypesCollection(resourceTypesCollectionDto());
      const password = defaultResourceDto();
      const totp = resourceStandaloneTotpDto();
      const pinCode = resourceStandalonePinCodeDto();
      const note = defaultResourceDto({ resource_type_id: TEST_RESOURCE_TYPE_V5_STANDALONE_NOTE });
      const resources = filterResourcesSupportedByQuickAccess([password, totp, pinCode, note], resourceType);
      expect(resources.length).toStrictEqual(3);
      expect(resources).toContain(password);
      expect(resources).toContain(pinCode);
      expect(resources).toContain(totp);
    });

    it("should load nothing when resource types are not loaded", () => {
      expect.assertions(1);
      expect(filterResourcesSupportedByQuickAccess([defaultResourceDto()], null)).toStrictEqual([]);
    });
  });
});
