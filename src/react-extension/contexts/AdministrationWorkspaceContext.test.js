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
 * Unit tests on AdministrationWorkspaceContext in regard of specifications
 */

import { defaultProps } from "./AdministrationWorkspaceContext.test.data";
import AdministrationWorkspaceContextPage from "./AdministrationWorkspaceContext.test.page";
import { AdministrationWorkspaceMenuTypes } from "./AdministrationWorkspaceContext";
import { defaultAppContext } from "./ExtAppContext.test.data";
import { waitFor } from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

describe("Administration Workspace Context", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new AdministrationWorkspaceContextPage(context, props);
  });

  describe("As AD I should have the appropriate settings screen at any time", () => {
    it("As AD I should have an initial filter set to NONE", () => {
      expect.assertions(6);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As LU I should see an error 403", async () => {
      expect.assertions(1);
      const props = defaultProps({
        rbacContext: {
          canIUseAction: () => false,
        },
      });
      const page = new AdministrationWorkspaceContextPage(context, props);
      await page.goToMfa();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.HTTP_403_ACCESS_DENIED);
    });

    it("As AD I should have mfa settings with all disabled", async () => {
      expect.assertions(7);
      await page.goToMfa();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.MFA);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have users directory settings with all disabled", async () => {
      expect.assertions(7);
      await page.goToUsersDirectory();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have email notifications settings with all disabled", async () => {
      expect.assertions(7);
      await page.goToEmailNotifications();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have subscription settings with all disabled", async () => {
      expect.assertions(7);
      await page.goToSubscription();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.SUBSCRIPTION);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have healthcheck status settings with all disabled", async () => {
      expect.assertions(7);
      await page.goToHealthcheck();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.HEALTHCHECK);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });
  });

  describe("As AD I should have the appropriate button enabled at any time", () => {
    it("As AD I should have the save enabled", async () => {
      expect.assertions(1);
      await page.onSaveEnabled();
      expect(page.isSaveEnabled).toBeTruthy();
    });
  });

  describe("As AD I should have the appropriate action enable at any time", () => {
    it("As AD I should enabled must save settings", async () => {
      expect.assertions(1);
      await page.onMustSaveSettings();
      expect(page.mustSaveSettings).toBeTruthy();
    });

    it("As AD I should enabled must edit subscription key", async () => {
      expect.assertions(1);
      await page.onMustEditSubscriptionKey();
      expect(page.mustEditSubscriptionKey).toBeTruthy();
    });

    it("As AD I should enabled must refresh subscription key", async () => {
      expect.assertions(1);
      await page.onMustRefreshSubscriptionKey();
      expect(page.mustRefreshSubscriptionKey).toBeTruthy();
    });

    it("As AD I should enabled reset all action settings", async () => {
      expect.assertions(6);
      await page.onMustSaveSettings();
      await page.onMustEditSubscriptionKey();
      await page.onMustRefreshSubscriptionKey();
      expect(page.mustSaveSettings).toBeTruthy();
      expect(page.mustEditSubscriptionKey).toBeTruthy();
      expect(page.mustRefreshSubscriptionKey).toBeTruthy();
      await page.onResetActionsSettings();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.mustEditSubscriptionKey).toBeFalsy();
      expect(page.mustRefreshSubscriptionKey).toBeFalsy();
    });
  });

  describe("handleAdministrationMenuRouteChange logic", () => {
    it("should set selectedAdministration to MFA Policy when route is /app/administration/mfa-policy-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/mfa-policy-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToMfaPolicy();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.MFA_POLICY);
    });

    it("should set selectedAdministration to Subscription when route is /app/administration/subscription-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/subscription-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToSubscription();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.SUBSCRIPTION);
    });

    it("should set selectedAdministration to Password Policy when route is /app/administration/password-policies-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/password-policies-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToPasswordPolicySettings();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES);
    });

    it("should set selectedAdministration to Users Directory when route is /app/administration/users-directory-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/users-directory-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToUsersDirectory();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
    });

    it("should set selectedAdministration to Users Passphrase when route is /app/administration/user-passphrase-policies-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/user-passphrase-policies-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToUserPassphraseSettings();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES);
    });

    it("should set selectedAdministration to Account Recovery when route is /app/administration/account-recovery-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/account-recovery-teasing",
          key: "unique-key",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToAccountRecoverySettings();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY);
    });

    it("should set selectedAdministration to SSO when route is /app/administration/sso-teasing and user has permission", async () => {
      const props = defaultProps({
        location: {
          pathname: "/app/administration/sso-teasing",
        },
        rbacContext: {
          canIUseAction: () => true,
        },
        context: {
          ...context,
          siteSettings: {
            canIUse: () => true,
            isCommunityEdition: true,
          },
        },
      });

      const page = new AdministrationWorkspaceContextPage(context, props);
      await waitFor(() => {});
      await page.goToSsoSettings();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.SSO);
    });
  });
});
