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

import SubscriptionActionService from './SubscriptionActionService';

beforeEach(() => {
  jest.resetModules();
});

describe("SubscriptionActionService", () => {
  let subscriptionActionService;

  const props = {
    context: {
      setContext: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    adminSubcriptionContext: {
      getSubscription: () => ({data: "mockData"})
    }
  };

  beforeEach(() => {
    SubscriptionActionService.killInstance();
    subscriptionActionService = SubscriptionActionService.getInstance(props);
  });

  describe("MfaFormService::getInstance", () => {
    it("should be a singleton", () => {
      expect.assertions(1);
      expect(subscriptionActionService).toBeDefined();
    });
    it("should not create a new instance", () => {
      expect.assertions(1);
      const newInstance = SubscriptionActionService.getInstance();
      expect(subscriptionActionService).toEqual(newInstance);
    });
  });

  describe("MfaFormService::killInstance", () => {
    it("should kill the instance and create a new one", () => {
      expect.assertions(1);
      SubscriptionActionService.killInstance();
      subscriptionActionService = SubscriptionActionService.getInstance({"context": null, "dialogContext": null, "adminSubcriptionContext": null});
      expect(subscriptionActionService).toEqual({"context": null, "dialogContext": null, "subscriptionContext": null});
    });
  });

  describe("MfaFormService::editSubscription", () => {
    it("should kill the instance and create a new one", () => {
      expect.assertions(1);
      const editSubscriptionKey = {
        key: props.adminSubcriptionContext.getSubscription().data
      };
      subscriptionActionService.editSubscription();
      expect(props.context.setContext).toHaveBeenCalledWith({editSubscriptionKey});
    });
  });
});

