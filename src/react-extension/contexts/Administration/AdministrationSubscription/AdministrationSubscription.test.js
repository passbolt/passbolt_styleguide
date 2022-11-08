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

import {defaultProps, mockSubscriptionModel} from "../../../../react-extension/components/Administration/DisplaySubscriptionKey/DisplaySubscriptionKey.test.data";
import {AdminSubscriptionContextProvider} from "./AdministrationSubscription";
import PassboltSubscriptionError from '../../../lib/Error/PassboltSubscriptionError';

describe("AdminSubscriptionContext", () => {
  let adminSubscribeContext; // The adminSubscribeContext to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    adminSubscribeContext = new AdminSubscriptionContextProvider(Object.assign({}, props));
    const setStateMock = state => adminSubscribeContext.state = Object.assign(adminSubscribeContext.state, state);
    jest.spyOn(adminSubscribeContext, "setState").mockImplementation(setStateMock);
  });
  describe("AdminSubscriptionContext::findSubscriptionKey", () => {
    it("should get the current subscription and store it in its state", async() => {
      await adminSubscribeContext.findSubscriptionKey();

      expect.assertions(2);

      expect(adminSubscribeContext.getSubscription()).toEqual(mockSubscriptionModel);
      expect(adminSubscribeContext.isProcessing()).toBeFalsy();
    });

    it("should init subscription with error in case of PassboltSubscriptionError", async() => {
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementation(() => { throw new PassboltSubscriptionError("error", {}); });
      await adminSubscribeContext.findSubscriptionKey();

      expect.assertions(3);
      const subscription = adminSubscribeContext.getSubscription();
      expect(subscription.email).toEqual('N/A');
      expect(subscription.subscriptionId).toEqual('N/A');
      expect(adminSubscribeContext.isProcessing()).toBeFalsy();
    });
  });
  describe("AdminSubscriptionContext::hasSettingsChanges", () => {
    it("should return the number of active user", async() => {
      const activeUsers = await adminSubscribeContext.getActiveUsers();

      expect.assertions(1);

      expect(activeUsers).toEqual(5);
    });
  });

  describe("AdminSubscriptionContext::clearContext", () => {
    it("should clear the context and set it by default", async() => {
      await adminSubscribeContext.findSubscriptionKey();
      adminSubscribeContext.clearContext();

      expect.assertions(2);

      expect(adminSubscribeContext.isProcessing()).toBeTruthy();
      expect(adminSubscribeContext.getSubscription().subscriptionId).toEqual("");
    });
  });
});


