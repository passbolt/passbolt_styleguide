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
import ManageAccountRecoveryUserSettingsPage from "./ManageAccountRecoveryUserSettings.test.page";
import { waitFor } from "@testing-library/react";
import { defaultProps } from "./ManageAccountRecoveryUserSettings.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { optOutOrganizationPolicy } from "../HandleAccountRecoveryUserSettingsRoute/HandleAccountRecoveryUserSettingsRoute.test.data";
import { waitForTrue } from "../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

describe("ManageAccountRecoveryUserSettings", () => {
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
  it("As a logged in user I can update my account recovery choice when my review is pending for the Opt-in, Mandatory and Opt-out policies (default state recommended)", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    expect(page.title.textContent).toBe("Recovery (Recommended)");
    expect(page.acceptCheckbox.checked).toBeTruthy();
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
  it("As a logged in user I can update my account recovery choice when my review is pending for the Opt-in, Mandatory and Opt-out policies (default state optional)", async () => {
    expect.assertions(3);
    const props = defaultProps({
      organizationPolicy: optOutOrganizationPolicy({
        policy: "opt-in",
      }),
    });
    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();

    expect(page.title.textContent).toBe("Recovery (Optional)");
    expect(page.rejectCheckbox.checked).toBeTruthy();
  });

  /**
   * Given that I am a registered user
   * And	the Account recovery is enabled for my organization
   * And	the Account recovery policy is “Opt-out”
   * And	I have a pending account recovery organization policy
   * And	I am prompted to join the account recovery program
   * When	I select reject
   * And	I click on the save button
   * Then	the dialog is closed
   *
   *
   * Given that I am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I am prompted to join the account recovery program
   * When I select the “Approve” choice
   * And  I click on the save button
   * Then I see a dialog to enter my passphrase
   * When I enter my passphrase
   * Then I see the “Enter passphrase” dialog is closed
   * And  I see account recovery prompt dialog closed
   * And  I see a progress dialog
   * Then I see the progress dialog is closed
   * And  I see a notification at the top telling my I joined the account recovery program
   * And  I see the account recovery page in my settings workspace
   * And  I see the Account recovery status enabled with a green dot
   */
  it("As a logged in user who has a pending organization account recovery policy, I can select not to join the account recovery program if the policy is “opt-out”", async () => {
    const props = defaultProps({
      organizationPolicy: optOutOrganizationPolicy({
        policy: "opt-in",
      }),
    });
    props.context.port.addRequestListener(
      "passbolt.account-recovery.save-user-settings",
      async (accountRecoveryUserSettingDto) => {
        expect(accountRecoveryUserSettingDto).toStrictEqual({ status: "rejected" });
      },
    );
    props.context.port.addRequestListener("passbolt.users.find-logged-in-user", async (refreshCache) => {
      expect(refreshCache).toStrictEqual(true);
    });
    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => {});

    expect.assertions(7);
    expect(page.exists()).toBeTruthy();
    expect(page.rejectCheckbox.checked).toBeTruthy();

    await page.clickOnSave();
    await waitForTrue(() => props.accountRecoveryContext.setUserAccountRecoveryStatus.mock.calls.length > 0);
    expect(props.accountRecoveryContext.setUserAccountRecoveryStatus).toHaveBeenCalledWith("rejected");

    await waitForTrue(() => props.actionFeedbackContext.displaySuccess.mock.calls.length > 0);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
      "The account recovery subscription setting has been updated.",
    );
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should display an error notification dialog if an error happens when communicating with the background page", async () => {
    const props = defaultProps({
      organizationPolicy: optOutOrganizationPolicy({
        policy: "opt-in",
      }),
    });
    const errorMessage = "The background page couldn't process the request";
    props.context.port.addRequestListener("passbolt.account-recovery.save-user-settings", async () => {
      throw new Error(errorMessage);
    });

    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => {});

    expect.assertions(1);
    await page.clickOnSave();

    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
      error: new Error(errorMessage),
    });
  });
});
