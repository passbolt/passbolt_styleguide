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
  mockSubscriptionGoingToExpire,
  mockSubscriptionUsersExceeded,
  mockUsers,
  propsWithoutEditionPlugin,
} from "./DisplaySubscriptionKey.test.data";
import DisplaySubscriptionKeyPage from "./DisplaySubscriptionKey.test.page";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import SubscriptionEntity from "../../../../shared/models/entity/subscription/subscriptionEntity";
import { screen, waitFor } from "@testing-library/react";
import { DateTime } from "luxon";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import PassboltSubscriptionError from "../../../lib/Error/PassboltSubscriptionError";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySubscriptionKeyPage", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe("As AD I can see the subscription", () => {
    it("As AD in PRO mode the subscription key should be fetched on mount", async () => {
      expect.assertions(1);

      const proProps = defaultProps();
      const getSubscriptionKey = jest.spyOn(proProps.context, "onGetSubscriptionKeyRequested");
      page = new DisplaySubscriptionKeyPage(proProps.context, proProps);
      await screen.findByText("Details");

      expect(getSubscriptionKey).toHaveBeenCalledTimes(1);
    });

    it("As AD I should see all details about the subscription", async () => {
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await screen.findByText("Details");

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Details");
      expect(page.edition).toBe("Pro");
      expect(page.serverVersion).toBe("3.5.0");
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
      expect(page.currentEditionCard).toBe(page.proCard);
      expect(page.help).toBeTruthy();
      expect(page.helpContactSales.getAttribute("href")).toBe("https://www.passbolt.com/contact");
    });

    it("As AD I should be able to identify if the limit of users is exceeded", async () => {
      jest.spyOn(props.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltSubscriptionError("users exceeded", mockSubscriptionUsersExceeded);
      });
      page = new DisplaySubscriptionKeyPage(props.context, props);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Details");

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
      await screen.findByText("Details");

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
      const ceProps = defaultProps();
      jest.spyOn(ceProps.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("missing key", {});
      });
      jest.spyOn(ceProps.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Details");

      expect(page.currentEditionCard).toBe(page.communityCard);
      expect(page.edition.startsWith("Community")).toBe(true);

      await page.updateKey();
      expect(ceProps.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey, {
        onSave: expect.any(Function),
        title: "New subscription key",
        warning: "You and your team will be disconnected at the end of the process.",
      });
    });

    it("As AD in CE mode the Upload subscription key button should open EditSubscriptionKey with the create-flow onSave handler", async () => {
      expect.assertions(1);
      const ceProps = defaultProps();
      jest.spyOn(ceProps.context, "onGetSubscriptionKeyRequested").mockImplementationOnce(() => {});
      jest.spyOn(ceProps.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      // Wait until the text is found (This will ensure the state has been updated)
      await screen.findByText("Details");

      await page.updateKey();

      expect(ceProps.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey, {
        onSave: expect.any(Function),
        title: "New subscription key",
        warning: "You and your team will be disconnected at the end of the process.",
      });
    });

    it("As AD in PRO mode the Update key button should open EditSubscriptionKey", async () => {
      expect.assertions(2);
      const proProps = defaultProps();
      page = new DisplaySubscriptionKeyPage(proProps.context, proProps);
      await screen.findByText("Details");

      await page.updateKey();

      expect(proProps.dialogContext.open).toHaveBeenCalledWith(EditSubscriptionKey);
      expect(proProps.context.setContext).toHaveBeenCalledWith({
        editSubscriptionKey: { key: mockSubscription.data },
      });
    });

    it("As AD I should see the help sidebar with title, description and Contact Sales link", async () => {
      expect.assertions(4);
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await screen.findByText("Details");

      expect(page.helpBoxTitle.textContent).toBe("Need help?");
      expect(page.helpBoxDescription.textContent).toBe(
        "For any change or question related to your passbolt subscription, kindly contact our sales team.",
      );
      expect(page.helpContactSales.textContent).toMatch(/Contact Sales/);
      expect(page.helpContactSales.getAttribute("href")).toBe("https://www.passbolt.com/contact");
    });
  });

  describe("As AD with an expiring or expired subscription I can downgrade to CE", () => {
    it("As AD the Downgrade button should not render when the subscription is valid", async () => {
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await screen.findByText("Details");
      expect(page.downgradeToCommunityButton).toBeNull();
    });

    it("As AD the Downgrade button should be visible when the subscription key is expiring", async () => {
      const sectionProps = goingToExpireProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Details");

      expect(page.downgradeToCommunityButton).not.toBeNull();
      expect(page.downgradeToCommunityButton.textContent.trim()).toBe("Downgrade to Community");
      expect(page.renewKeyButton.textContent.trim()).toBe("Renew key");
    });

    it("As AD the Downgrade button should be visible when the subscription key is expired", async () => {
      const sectionProps = expiredProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Details");

      expect(page.downgradeToCommunityButton).not.toBeNull();
    });

    it("As AD clicking Downgrade button should navigate to the downgrade to Community Edition page", async () => {
      expect.assertions(1);

      const sectionProps = goingToExpireProps();
      page = new DisplaySubscriptionKeyPage(sectionProps.context, sectionProps);
      await screen.findByText("Details");

      await page.clickDowngradeToCommunity();

      expect(sectionProps.navigationContext.onGoToAdministrationDowngradeToCeRequested).toHaveBeenCalledTimes(1);
    });
  });

  describe("As CE AD without a subscription key", () => {
    /**
     * Build a CE-mode rendering (no subscription key).
     */
    const ceProps = defaultProps();
    jest.spyOn(ceProps.context, "onGetSubscriptionKeyRequested").mockImplementation(() => {
      throw new PassboltApiFetchError("missing key", {});
    });
    jest.spyOn(ceProps.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);

    it("As CE AD I should see the Community edition badged as the current plan", async () => {
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      await screen.findByText("Details");

      expect(page.currentEditionCard).toBe(page.communityCard);
      expect(page.currentEditionIndicator).toBe("Current plan");
      expect(page.edition.startsWith("Community")).toBe(true);
    });

    it("As CE AD I should see the Plans section with both editions", async () => {
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      await screen.findByText("Details");

      expect(page.plansTitle).toBe("Plans");
      expect(page.communityCard).not.toBeNull();
      expect(page.proCard).not.toBeNull();
    });

    it("As CE AD I should see the Upload subscription key button", async () => {
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      await screen.findByText("Details");

      expect(page.toolbarActionsUpdateButton).not.toBeNull();
      expect(page.toolbarActionsUpdateButton.textContent.trim()).toBe("Upload subscription key");
    });

    it("As CE AD I should see Buy now, Start a free trial and See pricing page links on the Pro plan card", async () => {
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      await screen.findByText("Details");

      expect(page.buyNowLink).not.toBeNull();
      expect(page.buyNowLink.getAttribute("href")).toBe(
        "https://www.passbolt.com/pricing/pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product",
      );
      expect(page.startTrialLink).not.toBeNull();
      expect(page.startTrialLink.getAttribute("href")).toBe(
        "https://www.passbolt.com/contact/pro/free-trial?utm_campaign=21060976-CE%20to%20Pro&utm_source=product",
      );
      expect(page.seePricingLink).not.toBeNull();
      expect(page.seePricingLink.getAttribute("href")).toBe(
        "https://www.passbolt.com/pricing/pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product",
      );
    });

    it("As AD with a valid subscription the Pro edition card should be badged as the current plan", async () => {
      page = new DisplaySubscriptionKeyPage(props.context, props);
      await screen.findByText("Details");

      expect(page.currentEditionCard).toBe(page.proCard);
      expect(page.edition).toBe("Pro");
    });

    it("As CE AD the subscription key should not be fetched on mount", async () => {
      expect.assertions(1);

      const ceProps = defaultProps();
      const getSubscriptionKey = jest.spyOn(ceProps.context, "onGetSubscriptionKeyRequested");
      jest.spyOn(ceProps.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);
      page = new DisplaySubscriptionKeyPage(ceProps.context, ceProps);
      await screen.findByText("Details");

      expect(getSubscriptionKey).not.toHaveBeenCalled();
    });
  });

  describe("As AD when the edition plugin is not present", () => {
    it("As AD in PRO mode the subscription actions should not be rendered", async () => {
      expect.assertions(2);

      const noPluginProps = propsWithoutEditionPlugin();
      page = new DisplaySubscriptionKeyPage(noPluginProps.context, noPluginProps);
      await screen.findByText("Details");

      expect(page.subscriptionActions).toBeNull();
      expect(page.toolbarActionsUpdateButton).toBeNull();
    });

    it("As AD with an expiring subscription the Renew and Downgrade buttons should not be rendered", async () => {
      expect.assertions(2);

      const noPluginProps = propsWithoutEditionPlugin({
        context: { onGetSubscriptionKeyRequested: () => new SubscriptionEntity(mockSubscriptionGoingToExpire) },
      });
      page = new DisplaySubscriptionKeyPage(noPluginProps.context, noPluginProps);
      await screen.findByText("Details");

      expect(page.renewKeyButton).toBeNull();
      expect(page.downgradeToCommunityButton).toBeNull();
    });

    it("As CE AD the Upload subscription key button should not be rendered", async () => {
      expect.assertions(1);

      const noPluginProps = propsWithoutEditionPlugin();
      jest.spyOn(noPluginProps.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);
      page = new DisplaySubscriptionKeyPage(noPluginProps.context, noPluginProps);
      await screen.findByText("Details");

      expect(page.toolbarActionsUpdateButton).toBeNull();
    });

    it("As AD the Details and Plans sections should still be rendered", async () => {
      expect.assertions(3);

      const noPluginProps = propsWithoutEditionPlugin();
      page = new DisplaySubscriptionKeyPage(noPluginProps.context, noPluginProps);
      await screen.findByText("Details");

      expect(page.title).toBe("Details");
      expect(page.plansTitle).toBe("Plans");
      expect(page.proCard).not.toBeNull();
    });
  });
});
