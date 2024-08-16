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

describe("filterUtils", () => (
  describe("::filterResourcesBySearch", () => {
    it("should filter the resources with the given keyword on the resource name", () => {
      expect.assertions(2);
      const field = "name";
      const resource1 = defaultResourceDto({metadata: {[field]: "abc"}});
      const resource2 = defaultResourceDto({metadata: {[field]: "def"}});
      const resource3 = defaultResourceDto({metadata: {[field]: "ghi"}});
      const resource4 = defaultResourceDto({metadata: {[field]: "jkl"}});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource username", () => {
      expect.assertions(2);
      const field = "username";
      const resource1 = defaultResourceDto({metadata: {[field]: "abc"}});
      const resource2 = defaultResourceDto({metadata: {[field]: "def"}});
      const resource3 = defaultResourceDto({metadata: {[field]: "ghi"}});
      const resource4 = defaultResourceDto({metadata: {[field]: "jkl"}});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource primary uri", () => {
      expect.assertions(2);
      const field = "uris";
      const resource1 = defaultResourceDto({metadata: {[field]: ["abc"]}});
      const resource2 = defaultResourceDto({metadata: {[field]: ["def"]}});
      const resource3 = defaultResourceDto({metadata: {[field]: ["ghi"]}});
      const resource4 = defaultResourceDto({metadata: {[field]: ["jkl"]}});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });

    it("should filter the resources with the given keyword on the resource description", () => {
      expect.assertions(2);
      const field = "description";
      const resource1 = defaultResourceDto({metadata: {[field]: "abc"}});
      const resource2 = defaultResourceDto({metadata: {[field]: "def"}});
      const resource3 = defaultResourceDto({metadata: {[field]: "ghi"}});
      const resource4 = defaultResourceDto({metadata: {[field]: "jkl"}});

      const allResources = [resource1, resource2, resource3, resource4];

      const resources = filterResourcesBySearch(allResources, "def");
      expect(resources.length).toStrictEqual(1);
      expect(resources[0]).toStrictEqual(resource2);
    });
  })
));
