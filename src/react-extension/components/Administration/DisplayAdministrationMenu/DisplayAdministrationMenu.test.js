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
 * Unit tests on DisplayAdministrationMenu in regard of specifications
 */


import DisplayAdministrationMenuPage from "./DisplayAdministrationMenu.test.page";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAppContext, defaultProps} from "./DisplayAdministrationMenu.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the administration menu", () => {
  /**
   * As AD I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As AD I should be able to go to mfa', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.MFA); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToMfa();
    expect(page.menuSelected).toBe('Multi Factor Authentication');
    expect(props.navigationContext.onGoToAdministrationMfaRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to user directory', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.USER_DIRECTORY); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToUserDirectory();
    expect(page.menuSelected).toBe('Users Directory');
    expect(props.navigationContext.onGoToAdministrationUsersDirectoryRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to email notifications', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToEmailNotifications();
    expect(page.menuSelected).toBe('Email Notifications');
    expect(props.navigationContext.onGoToAdministrationEmailNotificationsRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to subscription', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.SUBSCRIPTION); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToSubscription();
    expect(page.menuSelected).toBe('Subscription');
    expect(props.navigationContext.onGoToAdministrationSubscriptionRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to internationalisation', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToInternationalization();
    expect(page.menuSelected).toBe('Internationalisation');
    expect(props.navigationContext.onGoToAdministrationInternationalizationRequested).toHaveBeenCalled();
  });

  it('As AD I should be able to go to account recovery', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY); // The props to pass
    page = new DisplayAdministrationMenuPage(context, props);
    expect(page.exists()).toBeTruthy();
    await page.goToAccountRecovery();
    expect(page.menuSelected).toBe('Account Recovery');
    expect(props.navigationContext.onGoToAdministrationAccountRecoveryRequested).toHaveBeenCalled();
  });
});
