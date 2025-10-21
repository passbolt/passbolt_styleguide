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
 * @since         5.7.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import GroupServiceWorkerService, {GROUPS_FIND_MY_GROUPS} from "./groupServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GroupServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new GroupServiceWorkerService(port);
  });

  describe("::findMyGroups", () => {
    it("requests the service worker with the expected event and return a group collection.", async() => {
      expect.assertions(2);

      jest.spyOn(port, "request").mockImplementation(() => {});
      await service.findMyGroups();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_FIND_MY_GROUPS);
    });
  });
});
