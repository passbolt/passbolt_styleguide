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
 * @since         5.5.0
 */
/**
 * Unit tests on AdministrationHomePage in regard of specifications
 */
jest.mock("../../../../img/svg/Frame.svg", () => () => <svg data-testid="frame-svg" />);
import React from "react";
import AdministrationHomePagePage from "./AdministrationHomePage.test.page";
import { defaultProps } from "./AdministrationHomePage.test.data";
import { waitFor } from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

const scenarios = [
  {
    field: "subscription",
    title: "Subscription",
    proRedirect: "onGoToAdministrationSubscriptionRequested",
    ceRedirect: "onGoToAdministrationSubscriptionRequestedTeasing",
    clickMethod: "goToSubscription",
  },
  {
    field: "mfaPolicy",
    title: "MFA Policy",
    proRedirect: "onGoToAdministrationMfaPolicyRequested",
    ceRedirect: "onGoToAdministrationMfaPolicyRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToMfaPolicy",
  },
  {
    field: "userDirectory",
    title: "Users Directory",
    proRedirect: "onGoToAdministrationUsersDirectoryRequested",
    ceRedirect: "onGoToAdministrationUsersDirectoryRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToUserDirectory",
  },
  {
    field: "passwordPolicySettings",
    title: "Password Policy",
    proRedirect: "onGoToAdministrationPasswordPoliciesRequested",
    ceRedirect: "onGoToAdministrationPasswordPoliciesRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToPasswordPolicySettings",
  },
  {
    field: "userPassphrasePolicies",
    title: "User Passphrase Policies",
    proRedirect: "onGoToAdministrationUserPassphrasePoliciesRequested",
    ceRedirect: "onGoToAdministrationUserPassphrasePoliciesRequestedTeasing",
    checkProIcon: true,
    clickMethod: "gotoUserPassphrasePolicies",
  },
  {
    field: "emailNotifications",
    title: "Email Notifications",
    proRedirect: "onGoToAdministrationEmailNotificationsRequested",
    clickMethod: "goToEmailNotifications",
  },
  {
    field: "healthCheck",
    title: "API Status",
    proRedirect: "onGoToAdministrationHealthcheckRequested",
    clickMethod: "goToHealthCheck",
  },
  {
    field: "internationalization",
    title: "Internationalisation",
    proRedirect: "onGoToAdministrationInternationalizationRequested",
    clickMethod: "goToInternationalisation",
  },
  {
    field: "accountRecovery",
    title: "Account Recovery",
    proRedirect: "onGoToAdministrationAccountRecoveryRequested",
    ceRedirect: "onGoToAdministrationAccountRecoveryRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToAccountRecovery",
  },
  {
    field: "selfRegistration",
    title: "Self Registration",
    proRedirect: "onGoToAdministrationSelfRegistrationRequested",
    clickMethod: "goToSelfRegistration",
  },
  {
    field: "passwordExpirySettings",
    title: "Password Expiry",
    proRedirect: "onGoToAdministrationPasswordExpirySettingsRequested",
    clickMethod: "goToPasswordExpirySettings",
  },
  {
    field: "contentTypesEncryptedMetadata",
    title: "Encrypted Metadata",
    proRedirect: "onGoToAdministrationContentTypesEncryptedMetadataRequested",
    clickMethod: "gotoContentTypesEncryptedMetadata",
  },
  {
    field: "contentTypesMetadataKey",
    title: "Metadata Key",
    proRedirect: "onGoToAdministrationContentTypesMetadataKeyRequested",
    clickMethod: "gotoContentTypesMetadataKey",
  },
  {
    field: "migrateMetadata",
    title: "Migrate Metadata",
    proRedirect: "onGoToAdministrationMigrateMetadataRequested",
    clickMethod: "gotoMigrateMetadata",
  },
  {
    field: "ssoSettings",
    title: "Single Sign-On",
    proRedirect: "onGoToAdministrationSsoRequested",
    ceRedirect: "onGoToAdministrationSsoRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToSsoSettings",
  },
  {
    field: "smtpSettings",
    title: "Email Server",
    proRedirect: "onGoToAdministrationSmtpSettingsRequested",
    clickMethod: "goToSmtpSettings",
  },
  {
    field: "scimSettings",
    title: "SCIM",
    proRedirect: "onGoToAdministrationScimRequested",
    ceRedirect: "onGoToAdministrationScimRequestedTeasing",
    checkProIcon: true,
    clickMethod: "goToscimSettings",
  },
  {
    field: "secretHistorySettings",
    title: "Secret History",
    proRedirect: "onGoToAdministrationSecretHistoryRequested",
    clickMethod: "goToSecretHistorySettings",
  },
  {
    field: "offlineSettings",
    title: "Offline mode",
    proRedirect: "onGoToAdministrationOfflineRequested",
    clickMethod: "goToOfflineSettings",
  },
];

/**
 * Each Menu Item should exist
 * For PRO Admin, pro-teasing icon should not be visible
 * For CE Admin, pro-teasing icon should be visible for pro menu items and not for others
 * Clicking on menu item should redirect to respective component
 */
describe.each(scenarios)("Display Administration Menu for PRO Admins", (currentScenario) => {
  it(`As AD, I should see: ${currentScenario.title}`, async () => {
    const props = defaultProps();
    jest.spyOn(props.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(false);
    const redirectSpy = currentScenario.proRedirect
      ? jest.spyOn(props.navigationContext, currentScenario.proRedirect)
      : null;

    const page = new AdministrationHomePagePage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    await waitFor(() => {});
    expect(page[currentScenario.field]).toBeTruthy();
    expect(page.proTeasingIcon(currentScenario.title)).not.toBeTruthy();
    // Click the menu item
    if (currentScenario.clickMethod && typeof page[currentScenario.clickMethod] === "function") {
      await page[currentScenario.clickMethod]();
      expect(redirectSpy).toHaveBeenCalled();
    }
  });
});

describe.each(scenarios)("Display Administration Menu for CE Admins", (currentScenario) => {
  it(`As AD, I should see: ${currentScenario.title}`, async () => {
    const props = defaultProps({}, true);
    jest.spyOn(props.context.siteSettings, "isCommunityEdition", "get").mockReturnValue(true);

    const redirectSpy =
      currentScenario.checkProIcon || currentScenario.title === "Subscription"
        ? jest.spyOn(props.navigationContext, currentScenario.ceRedirect) || null
        : jest.spyOn(props.navigationContext, currentScenario.proRedirect) || null;

    const page = new AdministrationHomePagePage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    await waitFor(() => {});
    expect(page[currentScenario.field]).toBeTruthy();
    currentScenario.checkProIcon
      ? expect(page.proTeasingIcon(currentScenario.title)).toBeTruthy()
      : expect(page.proTeasingIcon(currentScenario.title)).not.toBeTruthy();

    // Click the menu item
    if (currentScenario.clickMethod && typeof page[currentScenario.clickMethod] === "function") {
      await page[currentScenario.clickMethod]();
      expect(redirectSpy).toHaveBeenCalled();
    }
  });
});
