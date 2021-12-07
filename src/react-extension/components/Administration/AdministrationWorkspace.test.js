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
 * Unit tests on AdministrationWorkspace in regard of specifications
 */
import React from 'react';
import {
  defaultAppContext, defaultProps,
} from "./AdministrationWorkspace.test.data";
import AdministrationWorkspacePage from "./AdministrationWorkspace.test.page";
import {waitFor} from "@testing-library/dom";
import {AdministrationWorkspaceMenuTypes} from "../../contexts/AdministrationWorkspaceContext";

jest.mock("./DisplayAdministrationWorkspaceActions/DisplayAdministrationWorkspaceActions", () => () => <></>); // eslint-disable-line no-use-before-define
jest.mock("./DisplayAdministrationMenu/DisplayAdministrationMenu", () => () => <></>);
jest.mock("./DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb", () => () => <></>);
jest.mock("./DisplayMfaAdministration/DisplayMfaAdministration", () => () => <span className="mfa-details"></span>);
jest.mock("./DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration", () => () => <span className="user-directory-details"></span>);
jest.mock("./DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration", () => () => <span className="email-notifications-details"></span>);
jest.mock("./DisplaySubscriptionKey/DisplaySubscriptionKey", () => () => <span className="subscription-key-details"></span>);
jest.mock("./DisplayInternationalizationAdministration/DisplayInternationalizationAdministration", () => () => <span className="internationalization-details"></span>);
jest.mock("./ManageAccountRecoveryAdministrationSettings/ManageAccountRecoveryAdministrationSettings", () => () => <span className="account-recovery-details"></span>);

beforeEach(() => {
  jest.resetModules();
});

describe("Display Administration Workspace", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As AD, I should see the mfa details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.MFA));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeTruthy();
    expect(page.isUserDirectorySelected).toBeFalsy();
    expect(page.isEmailNotificationsSelected).toBeFalsy();
    expect(page.isSubscriptionKeySelected).toBeFalsy();
    expect(page.isInternationalizationSelected).toBeFalsy();
    expect(page.isAccountRecoverySelected).toBeFalsy();
  });

  it('As AD, I should see the user directory details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.USER_DIRECTORY));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeFalsy();
    expect(page.isUserDirectorySelected).toBeTruthy();
    expect(page.isEmailNotificationsSelected).toBeFalsy();
    expect(page.isSubscriptionKeySelected).toBeFalsy();
    expect(page.isInternationalizationSelected).toBeFalsy();
    expect(page.isAccountRecoverySelected).toBeFalsy();
  });

  it('As AD, I should see the email notifications details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeFalsy();
    expect(page.isUserDirectorySelected).toBeFalsy();
    expect(page.isEmailNotificationsSelected).toBeTruthy();
    expect(page.isSubscriptionKeySelected).toBeFalsy();
    expect(page.isInternationalizationSelected).toBeFalsy();
    expect(page.isAccountRecoverySelected).toBeFalsy();
  });

  it('As AD, I should see the subscription key details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.SUBSCRIPTION));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeFalsy();
    expect(page.isUserDirectorySelected).toBeFalsy();
    expect(page.isEmailNotificationsSelected).toBeFalsy();
    expect(page.isSubscriptionKeySelected).toBeTruthy();
    expect(page.isInternationalizationSelected).toBeFalsy();
    expect(page.isAccountRecoverySelected).toBeFalsy();
  });

  it('As AD, I should see the internationalization details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeFalsy();
    expect(page.isUserDirectorySelected).toBeFalsy();
    expect(page.isEmailNotificationsSelected).toBeFalsy();
    expect(page.isSubscriptionKeySelected).toBeFalsy();
    expect(page.isInternationalizationSelected).toBeTruthy();
    expect(page.isAccountRecoverySelected).toBeFalsy();
  });

  it('As AD, I should see the account recovery details area', async() => {
    page = new AdministrationWorkspacePage(context, defaultProps(AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY));
    await waitFor(() => {});
    expect(page.isMfaSelected).toBeFalsy();
    expect(page.isUserDirectorySelected).toBeFalsy();
    expect(page.isEmailNotificationsSelected).toBeFalsy();
    expect(page.isSubscriptionKeySelected).toBeFalsy();
    expect(page.isInternationalizationSelected).toBeFalsy();
    expect(page.isAccountRecoverySelected).toBeTruthy();
  });
});

