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
      "Passbolt Community Edition (CE) includes all essential features for team collaboration at no cost. For advanced needs such as Single Sign-On (SSO), AD or SCIM integration, consider upgrading to Passbolt Pro. The Pro version also offers premium technical support from our engineering team to ensure smooth operation and expert assistance.";
    await waitFor(() => {});
    expect(page.title).toBe("Subscription");
    expect(page.subscriptionDetailsTitle).toBe("Details");
    expect(page.edition).toBe("Community Edition");
    expect(page.serverVersion).toBe("3.11.0");
    expect(page.clientVersion).toBe("5.4.4");
    expect(page.upgradeButton).toBeTruthy();
    expect(page.upgradeButton.getAttribute("href")).toBe(
      "https://www.passbolt.com/ce-to-pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product",
    );
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
});
