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
 * @since         3.8.0
 */

import EditSubscriptionKey from "../../../../react-extension/components/Administration/EditSubscriptionKey/EditSubscriptionKey";


/**
 * the subscription action service
 */
class SubscriptionActionService {
  /**
   * Constructor
   *
   * @param {props} props
   * @public
   */
  constructor(props) {
    this.context = props.context;
    this.dialogContext = props.dialogContext;
    this.subscriptionContext = props.adminSubcriptionContext;
  }

  /**
   * getInstance for singleton pattern
   * @param {context} context
   * @public
   */
  static getInstance(context) {
    if (!this.instance) {
      this.instance = new SubscriptionActionService(context);
    }
    return this.instance;
  }

  /**
   * killInstance singleton
   * @param {context} context
   * @public
   */
  static killInstance() {
    this.instance = null;
  }

  /**
   * Open the subscription key dialog
   * @returns {Promise<boolean>}
   */
  async editSubscription() {
    const editSubscriptionKey = {
      key: this.subscriptionContext.getSubscription().data
    };
    this.context.setContext({editSubscriptionKey});
    this.dialogContext.open(EditSubscriptionKey);
  }
}

export default SubscriptionActionService;

