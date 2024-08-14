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
import {sortResourcesAlphabetically} from "./sortUtils";

describe("sortUtils", () => {
  describe('::sortResourceAlphabetically', () => {
    it("should sort resources based on their name given from metadata and in case insensitve way", () => {
      expect.assertions(4);

      const resource1 = defaultResourceDto({name: "resource1"});
      const resource2 = defaultResourceDto({name: "Resource2"});
      const resource3 = defaultResourceDto({name: "resource3"});
      const resource4 = defaultResourceDto({name: "Resource4"});

      const resources = [resource2, resource3, resource4, resource1];

      sortResourcesAlphabetically(resources);

      expect(resources[0]).toStrictEqual(resource1);
      expect(resources[1]).toStrictEqual(resource2);
      expect(resources[2]).toStrictEqual(resource3);
      expect(resources[3]).toStrictEqual(resource4);
    });

    it("should not crash if null is given", () => {
      expect.assertions(1);
      expect(() => sortResourcesAlphabetically(null)).not.toThrow();
    });
  });
});
