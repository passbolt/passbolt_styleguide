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
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAppContext, defaultProps} from "./DisplayAdministrationWorkspaceBreadcrumb.test.data";

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

  it('As AD I should see a breadcrumb for none items', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.NONE); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(0);
  });

  it('As AD I should see a breadcrumb mfa', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.MFA); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Multi Factor Authentication");
    expect(page.item(3)).toBe("Settings");
  });

  it('As AD I should see a breadcrumb for user directory', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.USER_DIRECTORY); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Users Directory");
    expect(page.item(3)).toBe("Settings");
  });

  it('As AD I should see a breadcrumb for email notifications', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Email Notification");
    expect(page.item(3)).toBe("Settings");
  });

  it('As AD I should see a breadcrumb for subscription', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.SUBSCRIPTION); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Subscription");
    expect(page.item(3)).toBe("Settings");
  });

  it('As AD I should see a breadcrumb for internationalization', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Internationalisation");
    expect(page.item(3)).toBe("Settings");
  });

  it('As AD I should see a breadcrumb for account recovery', () => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY); // The props to pass
    page = new DisplayAdministrationWorkspaceBreadcrumbPage(context, props);
    expect(page.count).toBe(3);
    expect(page.item(1)).toBe("Administration");
    expect(page.item(2)).toBe("Account Recovery");
    expect(page.item(3)).toBe("Settings");
  });
});
