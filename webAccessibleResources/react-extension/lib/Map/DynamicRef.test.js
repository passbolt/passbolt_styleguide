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
 * @since         3.9.0
 */

import useDynamicRefs from './DynamicRef';

describe("DynamicRef", () => {
  const dynamicRefs = useDynamicRefs();

  describe("DynamicRef::setRef", () => {
    it("should set value if valid key provided", () => {
      expect.assertions(2);

      const key = "test";
      dynamicRefs.setRef(key);
      expect(dynamicRefs.getRef(key)).not.toBeNull();
      expect(dynamicRefs.getRef(key)).toBeDefined();
    });

    it("should not set value if key does not exist", () => {
      expect.assertions(1);

      console.warn = jest.fn();
      dynamicRefs.setRef();
      expect(console.warn.mock.calls[0][0]).toBe("useDynamicRefs: Cannot set ref without key");
    });

    it("should not set value if key is not a string", () => {
      expect.assertions(1);

      console.warn = jest.fn();
      dynamicRefs.setRef(null);
      expect(console.warn.mock.calls[0][0]).toBe("useDynamicRefs: Cannot set ref without key");
    });
  });

  describe("DynamicRef::getRef", () => {
    it("should not set value if key does not exist", () => {
      expect.assertions(1);

      console.warn = jest.fn();
      dynamicRefs.getRef();
      expect(console.warn.mock.calls[0][0]).toBe("useDynamicRefs: Cannot get ref without key");
    });
  });
});
