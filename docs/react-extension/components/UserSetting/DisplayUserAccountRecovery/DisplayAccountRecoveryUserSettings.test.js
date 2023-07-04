/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

/**
 * Unit tests on EnterNewPassphrase in regard of specifications
 */
import DisplayAccountRecoveryUserSettingsPage from "./DisplayAccountRecoveryUserSettings.test.page";
import {defaultProps, mockedData, getAccountRecoveryUserService} from "./DisplayAccountRecoveryUserSettings.test.data";
import {waitFor} from "@testing-library/react";
import {DateTime} from "luxon";
import ManageAccountRecoveryUserSettings from "../../AccountRecovery/ManageAccountRecoveryUserSettings/ManageAccountRecoveryUserSettings";

beforeEach(() => {
  jest.resetModules();
});

const formatDateTimeAgo = (date, locale) => DateTime.fromISO(date).toRelative({locale});

describe("DisplayAccountRecoveryUserSettings", () => {
  /**
   * Given that I am a logged in user
   * And	the account recovery organization policy is enabled
   * When	I navigate to the user account recovery settings in the user settings workspace
   * Then	I see my current account recovery settings
   */
  it('As a logged in user I can see my account recovery settings', async() => {
    const mockedAccountRecoveryUserService = getAccountRecoveryUserService(mockedData);
    const props = defaultProps({status: "pending"});
    const page = new DisplayAccountRecoveryUserSettingsPage(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.status.textContent).toBe("pending");
    expect(page.requestorName.textContent).toBe("Ada Lovelace (admin)");
    expect(page.requestDate.textContent).toBe(formatDateTimeAgo(mockedData.modified, props.context.locale));
    expect(page.fingerprint).toBe("848E 95CC 7493 129A D862 5831 29B8 1CA8 9360 23DD");
  });

  /**
   * Given that I am a logged in user
   * And  the account recovery organization policy is disabled
   * When I navigate to the user settings workspace
   * Then I can’t see the account recovery section on the left sidebar
   */
  it('As a logged in user I cannot see my account recovery settings if the account recovery organization policy is disabled', async() => {
    const mockedAccountRecoveryUserService = getAccountRecoveryUserService({policy: "disabled"});
    const props = defaultProps({status: "disabled"});
    const page = new DisplayAccountRecoveryUserSettingsPage(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.description.textContent).toBe("Please contact your administrator to enable the account recovery feature.");
  });

  /**
   * Given that I am a logged in user
   * And	the account recovery organization policy is enabled
   * And	I rejected the account recovery program
   * When	I navigate on the user account recovery settings in the user settings workspace
   * Then	I see a “Review” button
   * When	I click on the “Review” button
   * Then	I see the account recovery dialog prompt
   */
  it('As a logged in user who has rejected the account recovery program, I can change my choice from my settings workspace', async() => {
    const mockedAccountRecoveryUserService = getAccountRecoveryUserService(mockedData);
    const props = defaultProps({status: "disabled"});
    const page = new DisplayAccountRecoveryUserSettingsPage(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.reviewButton).not.toBeNull();
    await page.clickOnReview();
  });

  /**
   * Given that I am a logged in user
   * And   my account was created before the account recovery policy was enabled
   * And   I previously closed or cancel the “Recovery (Optional)” and “Recovery (Mandatory)” dialog or the account recovery policy is “Optional, Opt-in”
   * When  I am on the Account recovery settings in the profile workspace
   * Then  I see a breadcrumb saying “All users > Username > Account recovery”
   * And   I see the Account recovery title with a description telling me the purpose of the feature
   * And   I see a section with the account recovery status, a “Review” button
   * When	 I click on the “Review” button
   * Then	 I see the “Recovery (Optional)” or “Recovery (Mandatory)” dialog
   */
  it('As a logged in user I can update my account recovery choice when my review is pending for the Opt-in, Mandatory and Opt-out policies', async() => {
    const mockedAccountRecoveryUserService = getAccountRecoveryUserService(mockedData);
    const props = defaultProps({status: "disabled"});
    const page = new DisplayAccountRecoveryUserSettingsPage(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    await page.clickOnReview();

    expect(props.dialogContext.open).toHaveBeenCalledWith(ManageAccountRecoveryUserSettings, {
      organizationPolicy: mockedData
    });
  });
});
