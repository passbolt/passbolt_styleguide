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
  mockSubscription, mockSubscriptionExpired,
  mockSubscriptionUsersExceeded,
  mockUsers
} from "./DisplaySubscriptionKey.test.data";
import DisplaySubscriptionKeyPage from "./DisplaySubscriptionKey.test.page";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {DateTime} from "luxon";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import PassboltSubscriptionError from "../../../lib/Error/PassboltSubscriptionError";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySubscriptionKeyPage", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
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
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Subscription key details");
      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is valid and up to date!");
      expect(page.customerId).toBe(mockSubscription.customer_id);
      expect(page.subscriptionId).toBe(mockSubscription.subscription_id);
      expect(page.email).toBe(mockSubscription.email);
      await waitFor(() => {
        expect(page.users).toBe(`${mockSubscription.users} (currently: ${mockUsers.length})`);
      });
      expect(page.created).toBe(`${formatDate(mockSubscription.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscription.expiry)} (${DateTime.fromISO(mockSubscription.expiry).toRelative()})`);
      expect(page.help).toBeTruthy();
      expect(page.helpContactSales.getAttribute("href")).toBe("https://www.passbolt.com/contact");
    });

    it('As AD I should be able to identify if the limit of users is exceeded', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("users exceeded", mockSubscriptionUsersExceeded);
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.contactUs.getAttribute("href")).toBe(`https://www.passbolt.com/contact`);
      expect(page.customerId).toBe(mockSubscriptionUsersExceeded.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionUsersExceeded.subscription_id);
      expect(page.email).toBe(mockSubscriptionUsersExceeded.email);
      await waitFor(() => {
        expect(page.users).toBe(`${mockSubscriptionUsersExceeded.users} (currently: ${mockUsers.length})`);
      });
      expect(page.created).toBe(`${formatDate(mockSubscriptionUsersExceeded.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscriptionUsersExceeded.expiry)} (expired ${DateTime.fromISO(mockSubscriptionUsersExceeded.expiry).toRelative()})`);

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(`https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${mockSubscriptionUsersExceeded.subscription_id}&customer_id=${mockSubscriptionUsersExceeded.customer_id}`);
    });

    it('As AD I should be able to identify if the key is expired', async() => {
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("key expired", mockSubscriptionExpired);
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await waitFor(() => {});

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.contactUs.getAttribute("href")).toBe(`https://www.passbolt.com/contact`);
      expect(page.customerId).toBe(mockSubscriptionExpired.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionExpired.subscription_id);
      expect(page.email).toBe(mockSubscriptionExpired.email);
      await waitFor(() => {
        expect(page.users).toBe(`${mockSubscriptionExpired.users} (currently: ${mockUsers.length})`);
      });
      expect(page.created).toBe(`${formatDate(mockSubscriptionExpired.created)}`);
      expect(page.expiry).toBe(`${formatDate(mockSubscriptionExpired.expiry)} (expired ${DateTime.fromISO(mockSubscriptionExpired.expiry).toRelative()})`);

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(`https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${mockSubscriptionExpired.subscription_id}&customer_id=${mockSubscriptionExpired.customer_id}`);
    });


    it('As AD I should be able to identify if the key is missing', async() => {
      expect.assertions(4);
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("missing key", {});
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
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
      expect.assertions(2);
      page = new DisplaySubscriptionKeyPage(props.context, props);

      await waitFor(() => {});

      const editSubscriptionKey = {
        key: mockSubscription.data
      };

      await page.updateKey();

      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(props.context.setContext).toHaveBeenCalledWith({editSubscriptionKey});
    });
  });

  describe(' As AD I see an error if no subscription was found', () => {
  /**
   * Given no subscription was found
   * When I go to the subscription
   * Then I should see an error
   */


    it('As AD I should see an error if no subscription key was found', async() => {
      expect.assertions(4);
      jest.spyOn(props.context, 'onGetSubscriptionKeyRequested').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("no subscription key", "");
      });

      page = new DisplaySubscriptionKeyPage(props.context, props);
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
