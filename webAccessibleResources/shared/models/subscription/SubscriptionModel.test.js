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
import {mockSubscription, mockSubscriptionModel} from '../../../react-extension/components/Administration/DisplaySubscriptionKey/DisplaySubscriptionKey.test.data';
import SubscriptionModel from './SubscriptionModel';

/**
 * Test model related to the subscription model
 */
describe("SubscriptionModel model", () => {
  describe("SubscriptionModel::constructor", () => {
    it("should init model with dto", () => {
      expect.assertions(1);
      const model = new SubscriptionModel(mockSubscription);
      expect(model).toEqual(mockSubscriptionModel);
    });
    it("should init model default value without param", () => {
      expect.assertions(1);
      const model = new SubscriptionModel();
      expect(model).toEqual({
        customerId: "",
        subscriptionId: "",
        users: null,
        email: "",
        expiry: null,
        created: null,
        data: null
      });
    });
    it("should init model with N/A value if email and subscriptionId not exist", () => {
      expect.assertions(2);
      const model = new SubscriptionModel({});
      expect(model.subscriptionId).toEqual("N/A");
      expect(model.email).toEqual("N/A");
    });
  });
});

