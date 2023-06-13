/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.3
 */

import MapObject from './MapObject';

describe("MapObject", () => {
  describe("MapObject::clone", () => {
    it("should clone map object", () => {
      expect.assertions(2);

      const map1 = new Map();
      map1.set('a', 1);
      const clonedMap = MapObject.clone(map1);
      clonedMap.set('a', 2);

      expect(clonedMap.get("a")).toEqual(2);
      expect(map1.get("a")).toEqual(1);
    });
  });

  describe("MapObject::iterators", () => {
    it("should return an array of keys", () => {
      expect.assertions(1);

      const map1 = new Map();
      map1.set('a', 1);
      map1.set('b', 2);

      expect(MapObject.iterators(map1)).toEqual(["a", "b"]);
    });
  });
});
