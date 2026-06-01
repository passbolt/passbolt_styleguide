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
  defaultProps,
  expiredProps,
  formatDate,
  goingToExpireProps,
  mockSubscription,
  mockSubscriptionExpired,
  mockSubscriptionUsersExceeded,
  mockUsers,
} from "./DisplaySubscriptionKey.test.data";
import DisplaySubscriptionKeyPage from "./DisplaySubscriptionKey.test.page";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import { screen, waitFor } from "@testing-library/react";
import { DateTime } from "luxon";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import PassboltSubscriptionError from "../../../lib/Error/PassboltSubscriptionError";
import ConfirmDowngradeSubscriptionDialog from "../ConfirmDowngradeSubscriptionDialog/ConfirmDowngradeSubscriptionDialog";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { DOWNGRADE_SUBSCRIPTION_KEY } from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySubscriptionKeyPage", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  describe(" As AD I can see the subscription", () => {
    /**
     * Given a valid subscription
     * When I go to the subscription
     * Then I should see the subscription
     * And I should see the customer id, subscription id, email, users, created, expiry
     * And I should be able to identify each active users
     * And I should be able to identify when the subscription expire
     */
    it("As AD I should see all details about the subscription", async () => {
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Subscription key details");
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
      expect(page.expiry).toBe(
        `${formatDate(mockSubscription.expiry)} (${DateTime.fromISO(mockSubscription.expiry).toRelative()})`,
      );
      expect(page.help).toBeTruthy();
      expect(page.helpContactSales.getAttribute("href")).toBe("https://www.passbolt.com/contact");
    });

    it("As AD I should be able to identify if the limit of users is exceeded", async () => {
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("users exceeded", mockSubscriptionUsersExceeded);
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Subscription key details");

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.customerId).toBe(mockSubscriptionUsersExceeded.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionUsersExceeded.subscription_id);
      expect(page.email).toBe(mockSubscriptionUsersExceeded.email);
      await waitFor(() => {
        expect(page.users).toBe(`${mockSubscriptionUsersExceeded.users} (currently: ${mockUsers.length})`);
      });
      expect(page.created).toBe(`${formatDate(mockSubscriptionUsersExceeded.created)}`);
      expect(page.expiry).toBe(
        `${formatDate(mockSubscriptionUsersExceeded.expiry)} (expired ${DateTime.fromISO(mockSubscriptionUsersExceeded.expiry).toRelative()})`,
      );

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(
        `https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${mockSubscriptionUsersExceeded.subscription_id}&customer_id=${mockSubscriptionUsersExceeded.customer_id}`,
      );
    });

    it("As AD I should be able to identify if the key is expired", async () => {
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("key expired", mockSubscriptionExpired);
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Subscription key details");

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is not valid.");
      expect(page.customerId).toBe(mockSubscriptionExpired.customer_id);
      expect(page.subscriptionId).toBe(mockSubscriptionExpired.subscription_id);
      expect(page.email).toBe(mockSubscriptionExpired.email);
      await waitFor(() => {
        expect(page.users).toBe(`${mockSubscriptionExpired.users} (currently: ${mockUsers.length})`);
      });
      expect(page.created).toBe(`${formatDate(mockSubscriptionExpired.created)}`);
      expect(page.expiry).toBe(
        `${formatDate(mockSubscriptionExpired.expiry)} (expired ${DateTime.fromISO(mockSubscriptionExpired.expiry).toRelative()})`,
      );

      await page.goToRenewKey();
      expect(props.navigationContext.onGoToNewTab).toHaveBeenCalledWith(
        `https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${mockSubscriptionExpired.subscription_id}&customer_id=${mockSubscriptionExpired.customer_id}`,
      );
    });

    it("As AD I should be able to identify if the key is missing", async () => {
      expect.assertions(3);
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("missing key", {});
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Subscription key details");

      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is either missing or not valid.");

      await page.updateKey();
      const editSubscriptionKey = {
        key: null,
      };
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(props.context.setContext).toHaveBeenCalledWith({ editSubscriptionKey });
    });

    it("As AD I should open edit subscription key", async () => {
      expect.assertions(2);
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {});
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Subscription key details");

      const editSubscriptionKey = {
        key: null,
      };

      await page.updateKey();

      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(props.context.setContext).toHaveBeenCalledWith({ editSubscriptionKey });
    });
  });

  describe(" As AD with an expiring or expired subscription I can downgrade to CE", () => {
    it("As AD I should not see the renew/downgrade section when the subscription is valid", async () => {
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await screen.findByText("Subscription key details");
      expect(page.downgradeSection).toBeNull();
    });

    it("As AD I should see the renew/downgrade section when the subscription key is expiring", async () => {
      const sectionProps = goingToExpireProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      expect(page.downgradeSection).not.toBeNull();
      expect(page.downgradeSectionTitle).toBe("Renew or downgrade your subscription");
      expect(page.downgradeSectionParagraphs).toHaveLength(3);
      expect(page.downgradeLearnMoreLink.textContent).toBe("Learn more about Community Edition");
      expect(page.downgradeLearnMoreLink.getAttribute("href")).toBe("https://www.passbolt.com/community");
      expect(page.renewKeyButton.textContent.trim()).toBe("Renew key");
      expect(page.downgradeNowButton.textContent.trim()).toBe("Downgrade now");
    });

    it("As AD I should see the renew/downgrade section when the subscription key is expired", async () => {
      const sectionProps = expiredProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      expect(page.downgradeSection).not.toBeNull();
      expect(page.downgradeNowButton).not.toBeNull();
    });

    it("As AD clicking Downgrade now should open ConfirmDowngradeSubscriptionDialog with onSubmit and onClose", async () => {
      const sectionProps = goingToExpireProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      await page.clickDowngradeNow();

      expect(sectionProps.dialogContext.open).toHaveBeenCalledTimes(1);
      const [dialogComponent, dialogProps] = sectionProps.dialogContext.open.mock.calls[0];
      expect(dialogComponent).toBe(ConfirmDowngradeSubscriptionDialog);
      expect(typeof dialogProps.onSubmit).toBe("function");
      expect(typeof dialogProps.onClose).toBe("function");
    });

    it("As AD the captured onSubmit should dispatch passbolt.subscription.downgrade, show a success toast and close the dialog", async () => {
      const sectionProps = goingToExpireProps();
      const dialogKey = "dialog-key-test";
      sectionProps.dialogContext.open = jest.fn().mockReturnValue(dialogKey);
      const mockDowngrade = jest.fn().mockResolvedValue(undefined);
      sectionProps.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, mockDowngrade);

      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      await page.clickDowngradeNow();
      const { onSubmit } = sectionProps.dialogContext.open.mock.calls[0][1];
      await onSubmit();

      expect(mockDowngrade).toHaveBeenCalledTimes(1);
      expect(sectionProps.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
        "Subscription has been removed successfully. The instance is now on Community Edition.",
      );
      expect(sectionProps.dialogContext.close).toHaveBeenCalledWith(dialogKey);
    });

    it("As AD on UserAbortsOperationError no success toast or NotifyError is shown and the dialog stays open", async () => {
      const sectionProps = goingToExpireProps();
      const mockDowngrade = jest.fn().mockRejectedValue({ name: "UserAbortsOperationError" });
      sectionProps.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, mockDowngrade);

      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      await page.clickDowngradeNow();
      const { onSubmit } = sectionProps.dialogContext.open.mock.calls[0][1];
      await onSubmit();

      expect(sectionProps.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(sectionProps.dialogContext.close).not.toHaveBeenCalled();
      expect(sectionProps.dialogContext.open).toHaveBeenCalledTimes(1);
    });

    it("As AD on an unexpected error a NotifyError dialog should be opened", async () => {
      const sectionProps = goingToExpireProps();
      const error = new Error("boom");
      const mockDowngrade = jest.fn().mockRejectedValue(error);
      sectionProps.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, mockDowngrade);
      jest.spyOn(console, "error").mockImplementation(() => {});

      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Renew or downgrade your subscription");

      await page.clickDowngradeNow();
      const { onSubmit } = sectionProps.dialogContext.open.mock.calls[0][1];
      await onSubmit();

      expect(sectionProps.dialogContext.open).toHaveBeenCalledTimes(2);
      expect(sectionProps.dialogContext.open).toHaveBeenLastCalledWith(NotifyError, { error });
    });
  });

  describe(" As AD I see an error if no subscription was found", () => {
    /**
     * Given no subscription was found
     * When I go to the subscription
     * Then I should see an error
     */

    it("As AD I should see an error if no subscription key was found", async () => {
      expect.assertions(3);
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("no subscription key", "");
      });

      page = new DisplaySubscriptionKeyPage(props.context, props);
      await waitFor(() => {});
      expect(page.subscriptionDetailsTitle).toBe("Your subscription key is either missing or not valid.");

      jest.spyOn(props.dialogContext, "open").mockImplementationOnce(() => {});
      await page.updateKey();
      const editSubscriptionKey = {
        key: null,
      };
      expect(props.context.setContext).toHaveBeenCalledWith({ editSubscriptionKey });
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
    });
  });
});
