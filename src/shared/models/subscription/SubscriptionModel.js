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
 * @link          https=//www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */
/**
 * Model related to the subscription model for UI
 */
class SubscriptionModel {
  /**
   * Constructor
   * @param {SubscriptionDto} subscriptionDto
   */
  constructor(subscriptionDto) {
    this.customerId = subscriptionDto?.customer_id || "";
    this.subscriptionId = subscriptionDto ? "subscription_id" in subscriptionDto ? subscriptionDto.subscription_id : "N/A" : "";
    this.users = subscriptionDto?.users || null;
    this.email = subscriptionDto ? "email" in subscriptionDto ? subscriptionDto.email : "N/A" : "";
    this.expiry  = subscriptionDto?.expiry || null;
    this.created  = subscriptionDto?.created || null;
    this.data  = subscriptionDto?.data || null;
  }
}

export default SubscriptionModel;
