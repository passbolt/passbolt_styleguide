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
 * @since         5.0.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import CsrfTokenServiceWorkerService, {GET_CSRF_TOKEN_EVENT} from "./csrfTokenServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CsrfTokenServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new CsrfTokenServiceWorkerService(port);
  });

  describe("::getCsrfToken", () => {
    it("requests the service worker with the expected event and return the csrf token.", async() => {
      expect.assertions(2);

      const csrfToken = "546d233f65e51e6964c55bc7354973ed7e5a76235abacebef837d42bbb249f668e3379a5862222d38a7883c216d4a796a7993a2d4d05d6b3fd4872acbc296a9a";
      jest.spyOn(port, "request").mockReturnValue(csrfToken);
      const settings = await service.getCsrfToken();

      expect(port.request).toHaveBeenCalledWith(GET_CSRF_TOKEN_EVENT);
      expect(settings).toEqual(csrfToken);
    });
  });
});
