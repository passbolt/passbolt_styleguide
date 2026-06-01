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
 * @since         5.5.0
 */

/**
 * Unit tests on DisplaySubscriptionKeyTeasing
 */
import "../../../../../test/mocks/mockPortal.js";
import { defaultProps } from "./DisplaySubscriptionKeyTeasing.test.data";
import DisplaySubscriptionKeyTeasingPage from "./DisplaySubscriptionKeyTeasing.test.page";
import { waitFor } from "@testing-library/react";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import { CREATE_SUBSCRIPTION_KEY } from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";
import { minimalSubscriptionDto } from "../../../../shared/models/entity/subscription/subscriptionEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplaySubscriptionKeyTeasing", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  /**
   * For an Admin CE user
   * When I go to the Subscription page
   * And I should see the edition, server version and client version
   * And I should see the subscription key text
   * And I should be able to see the upgrade to Pro button
   * And I should be able to see the help section
   */
  it("As CE AD I should see all details about the subscription", async () => {
    page = new DisplaySubscriptionKeyTeasingPage(props.context, props);
    const subscriptionKeyTeasingInfoDescription =
      "Passbolt Community Edition (CE) includes all essential features for team collaboration at no cost.";
    await waitFor(() => {});
    expect(page.title).toBe("Subscription");
    expect(page.subscriptionDetailsTitle).toBe("Details");
    expect(page.edition).toBe("Community Edition");
    expect(page.serverVersion).toBe("3.11.0");
    expect(page.clientVersion).toBe("5.4.4");
    expect(page.subscriptionKeyTeasingInfoTitle).toBe("Passbolt CE is free forever!");
    expect(page.subscriptionKeyTeasingInfoDescription).toBe(subscriptionKeyTeasingInfoDescription);
    await waitFor(() => {});
    expect(page.helpBox).not.toBeNull();
    expect(page.helpBoxTitle.textContent).toBe("Need help?");
    expect(page.helpBoxDescription.textContent).toBe(
      "For any change or question related to your passbolt subscription, kindly contact our sales team.",
    );
    expect(page.helpBoxButton.textContent).toEqual("Contact Sales");
  });

  it("As CE AD I should see the Passbolt Pro Edition section with the documentation link", async () => {
    page = new DisplaySubscriptionKeyTeasingPage(props.context, props);
    const expectedProDescription =
      "Unlock enterprise-grade capabilities such as Single Sign-On (SSO), Active Directory and SCIM provisioning, " +
      "advanced password and access policies, detailed audit logs, and high-availability deployment options." +
      " " +
      "Passbolt Pro Edition also comes with premium technical support from our engineering team, with guaranteed response times " +
      "so you can keep your team productive and secure.";
    await waitFor(() => {});
    expect(page.proEditionTitle).toBe("Passbolt Pro Edition");
    expect(page.proSubscriptionInfoTitle).toBe("Take your team to the next level with Passbolt Pro!");
    expect(page.proSubscriptionInfoDescription).toBe(expectedProDescription);
    expect(page.learnMoreLink).toBeTruthy();
    expect(page.learnMoreLink.textContent).toBe("Learn more about Passbolt Pro Edition");
    expect(page.learnMoreLink.getAttribute("href")).toBe(
      "https://www.passbolt.com/ce-to-pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product",
    );
  });

  it("As CE AD I should see the 'Add a new subscription key' button inside the Pro section", async () => {
    page = new DisplaySubscriptionKeyTeasingPage(props.context, props);
    await waitFor(() => {});
    expect(page.addSubscriptionKeyButton).toBeTruthy();
    expect(page.addSubscriptionKeyButton.textContent).toBe("Add a new subscription key");
  });

  it("As CE AD clicking 'Add a new subscription key' should open the EditSubscriptionKey dialog", async () => {
    const freshProps = defaultProps();
    page = new DisplaySubscriptionKeyTeasingPage(freshProps.context, freshProps);
    await waitFor(() => {});

    await page.clickAddSubscriptionKey();

    expect(freshProps.dialogContext.open).toHaveBeenCalledTimes(1);
    const [dialogComponent, dialogProps] = freshProps.dialogContext.open.mock.calls[0];
    expect(dialogComponent).toBe(EditSubscriptionKey);
    expect(dialogProps.title).toBe("New subscription key");
    expect(typeof dialogProps.onSave).toBe("function");
  });

  it("As CE AD the onSave passed to EditSubscriptionKey should dispatch passbolt.subscription.create", async () => {
    const freshProps = defaultProps();
    page = new DisplaySubscriptionKeyTeasingPage(freshProps.context, freshProps);
    await waitFor(() => {});

    const newKey = "some subscription key";
    const dto = minimalSubscriptionDto({ data: newKey });
    const mockCreateSubscriptionKey = jest.fn().mockResolvedValue(dto);
    freshProps.context.port.addRequestListener(CREATE_SUBSCRIPTION_KEY, mockCreateSubscriptionKey);

    await page.clickAddSubscriptionKey();
    const { onSave } = freshProps.dialogContext.open.mock.calls[0][1];
    await onSave(newKey);

    expect(mockCreateSubscriptionKey).toHaveBeenCalledTimes(1);
    expect(mockCreateSubscriptionKey.mock.calls[0][0]).toEqual({ data: newKey });
  });
});
