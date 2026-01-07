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
 * @since         5.4.0
 */

import { defaultGroupDto } from "../models/entity/group/groupEntity.test.data";
import { getGroupFormattedName } from "./groupUtils";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("groupUtils", () => {
  const mockTranslation = jest.fn().mockImplementation((s) => s);

  describe("::getGroupFormattedName", () => {
    it("should return the group name when defined", () => {
      expect.assertions(2);
      const group = defaultGroupDto();
      expect(getGroupFormattedName(group, mockTranslation)).toStrictEqual(group.name);
      expect(mockTranslation).not.toHaveBeenCalled();
    });

    it("should return 'Unknown group' if no name is defined", () => {
      expect.assertions(3);
      const group = {};
      expect(getGroupFormattedName(group, mockTranslation)).toStrictEqual("Unknown group");
      expect(mockTranslation).toHaveBeenCalledTimes(1);
      expect(mockTranslation).toHaveBeenCalledWith("Unknown group");
    });

    it("should return 'Unknown group' if group is not defined", () => {
      expect.assertions(3);
      const group = null;
      expect(getGroupFormattedName(group, mockTranslation)).toStrictEqual("Unknown group");
      expect(mockTranslation).toHaveBeenCalledTimes(1);
      expect(mockTranslation).toHaveBeenCalledWith("Unknown group");
    });
  });
});
