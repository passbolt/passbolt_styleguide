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
 * @since         5.17.0
 */
/**
 * Unit tests on DisplayUserSettingsWorkspaceBreadcrumb in regard of specifications
 */
import DisplayUserSettingsWorkspaceBreadcrumbPage from "./DisplayUserSettingsWorkspaceBreadcrumb.test.page";
import { defaultAppContext, defaultProps } from "./DisplayUserSettingsWorkspaceBreadcrumb.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayUserSettingsWorkspaceBreadcrumb", () => {
  const context = defaultAppContext(); // The applicative context

  describe.each([
    { pathname: "/app/settings/profile", expectedBreadcrumb: "Profile" },
    { pathname: "/app/settings/passphrase", expectedBreadcrumb: "Passphrase" },
    { pathname: "/app/settings/security-token", expectedBreadcrumb: "Security token" },
    { pathname: "/app/settings/theme", expectedBreadcrumb: "Theme" },
    { pathname: "/app/settings/mfa", expectedBreadcrumb: "Multi Factor Authentication" },
    { pathname: "/app/settings/mfa/totp", expectedBreadcrumb: "Multi Factor Authentication" },
    { pathname: "/app/settings/mfa/duo", expectedBreadcrumb: "Multi Factor Authentication" },
    { pathname: "/app/settings/mfa/webauthn", expectedBreadcrumb: "Multi Factor Authentication" },
    { pathname: "/app/settings/keys", expectedBreadcrumb: "Keys inspector" },
    { pathname: "/app/settings/mobile", expectedBreadcrumb: "Mobile transfer" },
    { pathname: "/app/settings/account-recovery", expectedBreadcrumb: "Account Recovery" },
    { pathname: "/app/settings/account-recovery/edit", expectedBreadcrumb: "Account Recovery" },
    { pathname: "/app/settings/desktop", expectedBreadcrumb: "Desktop app setup" },
  ])("As LU I should see the breadcrumb of each settings page", (scenario) => {
    it(`for: ${scenario.pathname}`, () => {
      expect.assertions(4);
      const props = defaultProps();
      const page = new DisplayUserSettingsWorkspaceBreadcrumbPage(context, props, scenario.pathname);

      expect(page.exists()).toBeTruthy();
      expect(page.count).toBe(3);
      expect(page.item(1)).toBe("All users");
      expect(page.item(3)).toBe(scenario.expectedBreadcrumb);
    });
  });

  it("As LU I should see my name as the second item", () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new DisplayUserSettingsWorkspaceBreadcrumbPage(context, props, "/app/settings/profile");

    const user = context.loggedInUser;
    expect(page.item(2)).toBe(`${user.profile.first_name} ${user.profile.last_name}`);
  });
});
