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
 * Unit tests on DisplayAdministrationWorkspaceBreadcrumb in regard of specifications
 */

import DisplayAdministrationWorkspaceBreadcrumbPage from "./DisplayAdministrationWorkspaceBreadcrumb.test.page";
import { AdministrationWorkspaceMenuTypes } from "../../../contexts/AdministrationWorkspaceContext";
import { defaultAppContext, defaultProps } from "./DisplayAdministrationWorkspaceBreadcrumb.test.data";
import each from "jest-each";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see a Breadcrumb", () => {
  /**
   * As AD I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it("As AD I should see a breadcrumb for none items", () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.NONE); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(0);
  });

  each([
    { menuType: AdministrationWorkspaceMenuTypes.MFA, expectedBreadcrumb: "Multi Factor Authentication" },
    { menuType: AdministrationWorkspaceMenuTypes.USER_DIRECTORY, expectedBreadcrumb: "Users Directory" },
    { menuType: AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION, expectedBreadcrumb: "Email Notification" },
    { menuType: AdministrationWorkspaceMenuTypes.SUBSCRIPTION, expectedBreadcrumb: "Subscription" },
    { menuType: AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION, expectedBreadcrumb: "Internationalisation" },
    { menuType: AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY, expectedBreadcrumb: "Account Recovery" },
    { menuType: AdministrationWorkspaceMenuTypes.SMTP_SETTINGS, expectedBreadcrumb: "Email server" },
    { menuType: AdministrationWorkspaceMenuTypes.SELF_REGISTRATION, expectedBreadcrumb: "Self Registration" },
    { menuType: AdministrationWorkspaceMenuTypes.SSO, expectedBreadcrumb: "Single Sign-On" },
    { menuType: AdministrationWorkspaceMenuTypes.MFA_POLICY, expectedBreadcrumb: "MFA Policy" },
    { menuType: AdministrationWorkspaceMenuTypes.RBAC, expectedBreadcrumb: "Role-Based Access Control" },
    { menuType: AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES, expectedBreadcrumb: "Password Policy" },
    {
      menuType: AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES,
      expectedBreadcrumb: "User Passphrase Policies",
    },
    { menuType: AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY, expectedBreadcrumb: "Password Expiry" },
    { menuType: AdministrationWorkspaceMenuTypes.HEALTHCHECK, expectedBreadcrumb: "Passbolt API Status" },
    {
      menuType: AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA,
      expectedBreadcrumb: "Encrypted metadata",
    },
    { menuType: AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY, expectedBreadcrumb: "Metadata key" },
    { menuType: AdministrationWorkspaceMenuTypes.MIGRATE_METADATA, expectedBreadcrumb: "Migrate metadata" },
    { menuType: AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES, expectedBreadcrumb: "Allow content types" },
    { menuType: AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED, expectedBreadcrumb: "Getting started" },
    { menuType: AdministrationWorkspaceMenuTypes.SCIM, expectedBreadcrumb: "SCIM" },
    { menuType: AdministrationWorkspaceMenuTypes.SECRET_HISTORY, expectedBreadcrumb: "Secret history" },
  ]).describe("As AD I should see a breadcrumb for each menu", (scenario) => {
    it(`for: ${scenario.menuType}`, () => {
      const props = defaultProps(scenario.menuType); // The props to pass
      page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
      expect(page.count).toBe(2);
      expect(page.item(1)).toBe("Home");
      expect(page.item(2)).toBe(scenario.expectedBreadcrumb);
    });
  });
});
