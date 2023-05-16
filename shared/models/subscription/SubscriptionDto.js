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
 * Model related to the subscription dto for API
 */
class SubscriptionDto {
  /**
   * Constructor
   * @param {SubscriptionModel} SubscriptionModel
   */
  constructor(subscriptionModel = {}) {
    this.customer_id = subscriptionModel.customerId;
    this.subscription_id = subscriptionModel.subscriptionId;
    this.users = subscriptionModel.users;
    this.email = subscriptionModel.email;
    this.expiry  = subscriptionModel.expiry;
    this.created  = subscriptionModel.created;
    this.data  = subscriptionModel.data;
  }
}

export default SubscriptionDto;

