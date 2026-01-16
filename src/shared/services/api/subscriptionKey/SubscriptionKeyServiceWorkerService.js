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

import assertString from "validator/es/lib/util/assertString";
import SubscriptionEntity from "../../../models/entity/subscription/subscriptionEntity";

export const GET_SUBSCRIPTION_KEY = "passbolt.subscription.get";
export const UPDATE_SUBSCRIPTION_KEY = "passbolt.subscription.update";

class SubscriptionKeyServiceWorkerService {
  /**
   * Constructor
   * @param {Port} port The browser extension service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the subscription key
   * @returns {Promise<SubscriptionEntity>} The subscription key
   */
  async findOrganizationSubscriptionKey() {
    const response = await this.port.request(GET_SUBSCRIPTION_KEY);
    return new SubscriptionEntity(response);
  }

  /**
   * Update the subscription key
   * @param {string} subscriptionKey The new subscription key
   * @returns {Promise<SubscriptionEntity>} The updated subscription entity
   */
  async updateOrganizationSubscriptionKey(subscriptionKey) {
    assertString(subscriptionKey);

    const response = await this.port.request(UPDATE_SUBSCRIPTION_KEY, {
      data: subscriptionKey,
    });

    return new SubscriptionEntity(response);
  }
}

export default SubscriptionKeyServiceWorkerService;
