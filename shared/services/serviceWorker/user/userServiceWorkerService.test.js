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
 * @since         5.13.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import UsersCollection from "../../../models/entity/user/usersCollection";
import { defaultUsersDtos } from "../../../models/entity/user/usersCollection.test.data";
import UserServiceWorkerService, { USERS_GET_BY_IDS } from "./userServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new UserServiceWorkerService(port);
  });

  describe("::getByIds", () => {
    it("requests the service worker with the expected event and returns a UsersCollection.", async () => {
      expect.assertions(4);

      const usersDto = defaultUsersDtos(3);
      const requestedIds = usersDto.map((user) => user.id);
      port.addRequestListener(USERS_GET_BY_IDS, () => usersDto);
      jest.spyOn(port, "request");

      const result = await service.getByIds(requestedIds);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(USERS_GET_BY_IDS, requestedIds);
      expect(result).toBeInstanceOf(UsersCollection);
      expect(result.toDto()).toStrictEqual(usersDto);
    });
  });
});
