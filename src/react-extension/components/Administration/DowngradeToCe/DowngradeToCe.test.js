/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.14.0
 */

/**
 * Unit tests on DowngradeToCe in regard of specifications
 */
import { screen, waitFor } from "@testing-library/react";
import DowngradeToCePage from "./DowngradeToCe.test.page";
import { defaultProps, expiredProps, validSubscriptionProps } from "./DowngradeToCe.test.data";
import { LEARN_MORE_URL } from "./DowngradeToCe";
import { DOWNGRADE_SUBSCRIPTION_KEY } from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";

describe("DowngradeToCe", () => {
  let props; // The props to pass

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps();
  });

  describe("As AD I can see the downgrade to Community Edition page", () => {
    it("As AD I should see the page title, subtitle and the What will change section title", async () => {
      expect.assertions(3);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.title).toBe("Downgrade to Community Edition");
      expect(page.description).toBe(
        "Before you downgrade, please review what will change. Your resources, users, groups and folders will remain intact.",
      );
      expect(page.whatWillChangeTitle).toBe("What will change");
    });

    it("As AD I should see the 8 feature cards with their warning texts and descriptions", async () => {
      expect.assertions(3);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.cardTitles).toStrictEqual([
        "Single Sign-On",
        "Account recovery",
        "Users directory",
        "SCIM",
        "Tags",
        "Advanced Policies",
        "Advanced logs",
        "Premium support",
      ]);
      expect(page.cardWarningTexts).toStrictEqual([
        "Configuration and data will be deleted.",
        "Configuration will be deleted.",
        "Configuration will be deleted.",
        "Configuration will be deleted.",
        "All tags will be deleted.",
        "Configuration will be deleted.",
        "Not visible.",
        "Reverting to community support.",
      ]);
      expect(page.cardDescriptions).toStrictEqual([
        "Users will need to use their passphrase to sign in.",
        "Users who lose their passphrase or account kit will lose access to their account.",
        "Users will be managed manually.",
        "Users will be managed manually.",
        null,
        "Administrators won't be able to enforce custom company security policies.",
        "Users won't have access to activity logs.",
        null,
      ]);
    });

    it("As AD I should see the permanent warning banner", async () => {
      expect.assertions(1);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.warningBanner.textContent).toBe(
        "Warning: All users will be logged out during the downgrade. This process may take a few minutes.",
      );
    });

    it("As AD I should see the help sidebar section with the learn more link", async () => {
      expect.assertions(5);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.helpSectionTitle).toBe("Are you sure?");
      expect(page.helpSectionDescription).toBe("Learn more about the impact of downgrading.");
      expect(page.learnMoreLink.textContent).toMatch(/Learn more/);
      expect(page.learnMoreLink.getAttribute("href")).toBe(LEARN_MORE_URL);
      expect(page.learnMoreLink.getAttribute("target")).toBe("_blank");
    });

    it("As AD with an expired subscription key I should see the page", async () => {
      expect.assertions(1);

      const sectionProps = expiredProps();
      const page = new DowngradeToCePage(sectionProps.context, sectionProps);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.exists()).toBe(true);
    });
  });

  describe("As AD I can confirm and trigger the downgrade", () => {
    it("As AD clicking the downgrade button without checking the confirmation checkbox should highlight it and not trigger the downgrade", async () => {
      expect.assertions(2);

      const requestMock = jest.fn();
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.clickDowngrade();

      expect(page.confirmCheckboxHasError).toBe(true);
      expect(requestMock).not.toHaveBeenCalled();
    });

    it("As AD checking the confirmation checkbox after an error should clear the highlight", async () => {
      expect.assertions(2);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.clickDowngrade();
      expect(page.confirmCheckboxHasError).toBe(true);

      await page.checkConfirm();

      expect(page.confirmCheckboxHasError).toBe(false);
    });

    it("As AD clicking the downgrade button should trigger the downgrade, show a success toast and navigate back to the subscription page", async () => {
      expect.hasAssertions();

      const requestMock = jest.fn();
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.checkConfirm();
      await page.clickDowngrade();

      await waitFor(() =>
        expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).toHaveBeenCalledTimes(1),
      );
      expect(requestMock).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
        "Subscription has been removed successfully. The instance is now on Community Edition.",
      );
    });

    it("As AD while the downgrade is pending the downgrade button should be disabled and show a spinner", async () => {
      expect.hasAssertions();

      let resolveRequest;
      const requestMock = jest.fn(() => new Promise((resolve) => (resolveRequest = resolve)));
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.checkConfirm();
      await page.clickDowngrade();

      await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(true));
      expect(page.downgradeButton.hasAttribute("disabled")).toBe(true);
      expect(page.confirmCheckbox.hasAttribute("disabled")).toBe(true);

      resolveRequest();

      await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(false));
    });

    it("As AD on UserAbortsOperationError no feedback should be displayed", async () => {
      expect.hasAssertions();

      const requestMock = jest.fn(() => {
        throw new UserAbortsOperationError();
      });
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.checkConfirm();
      await page.clickDowngrade();

      await waitFor(() => expect(requestMock).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(page.downgradeButton.hasAttribute("disabled")).toBe(false));
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalled();
      expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).not.toHaveBeenCalled();
    });

    it("As AD on an unexpected error a NotifyError dialog should be opened", async () => {
      expect.hasAssertions();

      const error = new Error("Unexpected error");
      const requestMock = jest.fn(() => {
        throw error;
      });
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.checkConfirm();
      await page.clickDowngrade();

      await waitFor(() => expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error }));
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).not.toHaveBeenCalled();
    });
  });

  describe("As AD I can cancel the downgrade", () => {
    it("As AD I should see a Cancel button that is enabled by default", async () => {
      expect.assertions(2);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      expect(page.cancelButton.textContent.trim()).toBe("Cancel");
      expect(page.cancelButton.hasAttribute("disabled")).toBe(false);
    });

    it("As AD clicking the cancel button should navigate back to the subscription page without triggering the downgrade", async () => {
      expect.assertions(2);

      const requestMock = jest.fn();
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.clickCancel();

      await waitFor(() =>
        expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).toHaveBeenCalledTimes(1),
      );
      expect(requestMock).not.toHaveBeenCalled();
    });

    it("As AD while the downgrade is pending the cancel button should be disabled", async () => {
      expect.hasAssertions();

      let resolveRequest;
      const requestMock = jest.fn(() => new Promise((resolve) => (resolveRequest = resolve)));
      props.context.port.addRequestListener(DOWNGRADE_SUBSCRIPTION_KEY, requestMock);

      const page = new DowngradeToCePage(props.context, props);
      await screen.findByText("Downgrade to Community Edition");

      await page.checkConfirm();
      await page.clickDowngrade();

      await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(true));
      expect(page.cancelButton.hasAttribute("disabled")).toBe(true);

      resolveRequest();

      await waitFor(() => expect(page.downgradeButtonIsProcessing).toBe(false));
    });
  });

  describe("As AD I cannot access the downgrade page when the downgrade is not allowed", () => {
    it("As AD with a valid subscription key I should be redirected to the subscription page", async () => {
      expect.hasAssertions();

      const sectionProps = validSubscriptionProps();
      new DowngradeToCePage(sectionProps.context, sectionProps);

      await waitFor(() =>
        expect(sectionProps.navigationContext.onGoToAdministrationSubscriptionRequested).toHaveBeenCalledTimes(1),
      );
    });
  });
});
