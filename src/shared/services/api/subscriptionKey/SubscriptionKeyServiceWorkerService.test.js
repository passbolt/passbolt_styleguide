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
 * @since         5.9.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import SubscriptionEntity from "../../../models/entity/subscription/subscriptionEntity";
import { minimalSubscriptionDto } from "../../../models/entity/subscription/subscriptionEntity.test.data";
import SubscriptionKeyServiceWorkerService, {
  GET_SUBSCRIPTION_KEY,
  UPDATE_SUBSCRIPTION_KEY,
} from "./SubscriptionKeyServiceWorkerService";

describe("SubscriptionKeyServiceWorkerService", () => {
  /**
   * @type {MockPort}
   */
  let port,
    /**
     * @type {SubscriptionKeyServiceWorkerService}
     */
    service;

  beforeEach(() => {
    port = new MockPort();
    service = new SubscriptionKeyServiceWorkerService(port);
  });

  describe("::findOrganizationSubscriptionKey", () => {
    it("requests the service worker for the organisation subscription key", async () => {
      expect.assertions(2);
      const dto = minimalSubscriptionDto();
      const mockGetSubscriptionKey = jest.fn().mockResolvedValue(dto);
      port.addRequestListener(GET_SUBSCRIPTION_KEY, mockGetSubscriptionKey);

      const result = await service.findOrganizationSubscriptionKey();
      expect(mockGetSubscriptionKey).toHaveBeenCalledTimes(1);
      expect(result).toEqual(new SubscriptionEntity(dto));
    });
  });

  describe("::updateOrganizationSubscriptionKey", () => {
    it("requests the service worker to update the organisation subscription key", async () => {
      expect.assertions(3);
      const newKey = "new key";
      const dto = minimalSubscriptionDto({ data: newKey });
      const mockUpdateSubscriptionKey = jest.fn().mockResolvedValue(dto);
      port.addRequestListener(UPDATE_SUBSCRIPTION_KEY, mockUpdateSubscriptionKey);

      const result = await service.updateOrganizationSubscriptionKey(newKey);
      expect(mockUpdateSubscriptionKey).toHaveBeenCalledTimes(1);
      // Can't use `toHaveBeenCalledWith` because MockPort forces an additional argument
      expect(mockUpdateSubscriptionKey.mock.calls[0][0]).toEqual({ data: newKey });
      expect(result).toEqual(new SubscriptionEntity(dto));
    });
  });
});
