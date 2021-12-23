/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on DisplaySubscriptionKey in regard of specifications
 */


import {
  defaultProps, formatDate,
  mockSubscription, mockSubscriptionExpired, mockSubscriptionUpdated,
  mockSubscriptionUsersExceeded,
  mockUsers
} from "./DisplaySubscriptionKey.test.data";
import DisplaySubscriptionKeyPage from "./DisplaySubscriptionKey.test.page";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {DateTime} from "luxon";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import MockPort from "../../../test/mock/MockPort";
import PassboltSubscriptionError from "../../../lib/Error/PassboltSubscriptionError";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should see the subscription", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const usersFoundRequestMockImpl = jest.fn(() => Promise.resolve(mockUsers));

  describe(' As AD I can see the subscription', () => {
    /**
     * Given a valid subscription
     * When I go to the subscription
     * Then I should see the subscription
     * And I should see the customer id, subscription id, email, users, created, expiry
     * And I should be able to identify each active users
     * And I should be able to identify when the subscription expire
     */
    it('As AD I should see all details about the subscription', async() => {
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Subscription key details");
      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is valid and up to date!");
      expect(page.customerId).toBe(mockSubscription.customer_id);
      expect(page.subscriptionId).toBe(mockSubscription.subscription_id);
      expect(page.email).toBe(mockSubscription.email);
      expect(page.users).toBe(`${mockSubscription.users} (currently: ${mockUsers.length})`);
      expect(page.created).toBe(`${formatDate(mockSubscription.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscription.expiry)} (${DateTime.fromISO(mockSubscription.expiry).toRelative()})`);
      expect(page.help).toBeTruthy();
      expect(page.helpContactSales.getAttribute("href")).toBe("https://www.passbolt.com/contact");
    });

    it('As AD I should be able to identify if the limit of users is exceeded', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("users exceeded", mockSubscriptionUsersExceeded);
      });
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.contactUs.getAttribute("href")).toBe(`https://www.passbolt.com/contact`);
      expect(page.customerId).toBe(mockSubscriptionUsersExceeded.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionUsersExceeded.subscription_id);
      expect(page.email).toBe(mockSubscriptionUsersExceeded.email);
      expect(page.users).toBe(`${mockSubscriptionUsersExceeded.users} (currently: ${mockUsers.length})`);
      expect(page.created).toBe(`${formatDate(mockSubscriptionUsersExceeded.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscriptionUsersExceeded.expiry)} (expired ${DateTime.fromISO(mockSubscriptionUsersExceeded.expiry).toRelative()})`);

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(`https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${mockSubscriptionUsersExceeded.subscription_id}&customer_id=${mockSubscriptionUsersExceeded.customer_id}`);
    });

    it('As AD I should be able to identify if the key is expired', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("key expired", mockSubscriptionExpired);
      });
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.contactUs.getAttribute("href")).toBe(`https://www.passbolt.com/contact`);
      expect(page.customerId).toBe(mockSubscriptionExpired.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionExpired.subscription_id);
      expect(page.email).toBe(mockSubscriptionExpired.email);
      expect(page.users).toBe(`${mockSubscriptionExpired.users} (currently: ${mockUsers.length})`);
      expect(page.created).toBe(`${formatDate(mockSubscriptionExpired.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscriptionExpired.expiry)} (expired ${DateTime.fromISO(mockSubscriptionExpired.expiry).toRelative()})`);

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(`https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${mockSubscriptionExpired.subscription_id}&customer_id=${mockSubscriptionExpired.customer_id}`);
    });

    it('As AD I should be able to identify if the key is missing', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("missing key", {});
      });
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is either missing or not valid.");
      expect(page.contactUs.getAttribute("href")).toBe(`https://www.passbolt.com/contact`);

      await page.goToRenewKey();
      const editSubscriptionKey = {
        key: null
      };
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(props.context.setContext).toHaveBeenCalledWith({editSubscriptionKey});
    });

    it('As AD I should open edit subscription key', async() => {
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});
      const propsUpdated = {
        context: {
          setContext: jest.fn()
        },
        administrationWorkspaceContext: {
          must: {
            editSubscriptionKey: true,
            refreshSubscriptionKey: false
          },
          onResetActionsSettings: jest.fn()
        },
        dialogContext: {
          open: jest.fn()
        }
      };
      const editSubscriptionKey = {
        key: mockSubscription.data
      };

      page.rerender(propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(propsUpdated.context.setContext).toHaveBeenCalledWith({editSubscriptionKey});
      expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
    });

    it('As AD I should refresh the subscription key', async() => {
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});
      const propsUpdated = {
        context: {
          port: new MockPort(),
          onGetSubscriptionKeyRequested: () => mockSubscriptionUpdated,
        },
        administrationWorkspaceContext: {
          must: {
            editSubscriptionKey: false,
            refreshSubscriptionKey: true
          },
          onResetActionsSettings: jest.fn()
        }
      };
      jest.spyOn(propsUpdated.context.port, 'request').mockImplementation(usersFoundRequestMockImpl);

      page.rerender(propsUpdated);
      await waitFor(() => {});
      expect(page.customerId).toBe(mockSubscriptionUpdated.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionUpdated.subscription_id);
      expect(page.email).toBe(mockSubscriptionUpdated.email);
      expect(page.users).toBe(`${mockSubscriptionUpdated.users} (currently: ${mockUsers.length})`);
      expect(page.created).toBe(`${formatDate(mockSubscriptionUpdated.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscriptionUpdated.expiry)} (expired ${DateTime.fromISO(mockSubscriptionUpdated.expiry).toRelative()})`);
      expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
    });
  });

  describe(' As AD I see an error if no subscription was found', () => {
    /**
     * Given no subscription was found
     * When I go to the subscription
     * Then I should see an error
     */

    it('As AD I should see an error if no subscription key was found', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("no subscription key", "");
      });
      mockContextRequest(usersFoundRequestMockImpl);
      page = new DisplaySubscriptionKeyPage(props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is either missing or not valid.");
      expect(page.contactUs.getAttribute("href")).toBe("https://www.passbolt.com/contact");

      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
      await page.updateKey();
      const editSubscriptionKey = {
        key: null
      };
      expect(props.context.setContext).toHaveBeenCalledWith({editSubscriptionKey});
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
    });
  });
});
