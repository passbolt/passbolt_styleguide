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

import {defaultResourceDto} from "../models/entity/resource/resourceEntity.test.data";
import {filterResourcesBySearch} from "./filterUtils";
import {defaultResourceMetadataDto} from "../models/entity/resource/metadata/resourceMetadataEntity.test.data";

describe("filterUtils", () => (
  describe("::filterResourcesBySearch", () => {
    it("should filter the resources with the given keyword on the resource name", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "abc"})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "def"})});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "ghi"})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "jkl"})});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource username", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({username: "abc"})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({username: "def"})});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({username: "ghi"})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({username: "jkl"})});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource primary uri", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({uris: ["abc"]})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({uris: ["def"]})});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({uris: ["ghi"]})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({uris: ["jkl"]})});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource description", () => {
      expect.assertions(2);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({description: "abc"})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({description: "def"})});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({description: "ghi"})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({description: "jkl"})});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });
  })
));
