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
 * Unit tests on SessionExpired in regard of specifications
 */
import {waitFor} from "@testing-library/dom";
import {defaultProps, defaultAccountRecoveryUserService, getOrganizationAccountRecoveryPolicy} from "./HandleAccountRecoveryStatusCheck.test.data";
import HandleAccountRecoveryStatusCheckPage from "./HandleAccountRecoveryStatusCheck.test.page";
import ManageAccountRecoveryUserSettings from "../ManageAccountRecoveryUserSettings/ManageAccountRecoveryUserSettings";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("As a logged in user, I have to approve or reject the new account recovery policy", () => {
  const props = defaultProps(); // The props to pass

  /**
   * Given that I am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I am prompted to join the account recovery program
   * When	I select the “Approve” choice
   * And  I click on the save button
   * Then	I see a dialog to enter my passphrase
   * When	I enter my passphrase
   * Then	I see the “Enter passphrase” dialog is closed
   * And  I see account recovery prompt dialog closed
   * And  I see a progress dialog
   * Then I see the progress dialog is closed
   * And  I see a notification at the top telling my I joined the account recovery program
   * And  I see the account recovery page in my settings workspace
   * And  I see the Account recovery status enabled with a green dot
   *
   *
   * Given that I am a registered user
   * And	the Account recovery is enabled for my organization
   * And	the Account recovery policy is “Opt-out”
   * And	I have a pending account recovery organization policy
   * When	I log in
   * Then	I am prompted to join the account recovery program
   * And	I see a “Recovery (Recommended)” dialog opened
   * And	I see a close button to go back to my current workspace
   * And	I see a explanation telling me the purpose of the account recovery policy
   * And	I see the information of the administrator who enabled the policy
   * And	I see a list of 2 options with radio button, title, description
   * And	I see the “Reject” option is not selected by default
   * And	I see the “Approve” option is selected by default
   * And	I see a “Learn more” button to see the documentation
   * And	I see a “Cancel” button to close the dialog
   * And	I see a “Save” button
   */
  it('As a logged in user who has a pending organization account recovery policy, I can see a dialog prompting me to join the account recovery program if the policy is “opt-out” after logging in.', async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "opt-out"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);

    expect.assertions(2);
    props.dialogContext.open.mockImplementation((component, data) => {
      expect(component).toBe(ManageAccountRecoveryUserSettings);
      expect(data).toStrictEqual({organizationPolicy});
    });

    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);
  });

  /**
   * Given that I am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I am prompted to join the account recovery program
   * When	I select the “Approve” choice
   * And  I click on the save button
   * Then	I see a dialog to enter my passphrase
   * When	I enter my passphrase
   * Then	I see the “Enter passphrase” dialog is closed
   * And  I see account recovery prompt dialog closed
   * And  I see a progress dialog
   * Then I see the progress dialog is closed
   * And  I see a notification at the top telling my I joined the account recovery program
   * And  I see the account recovery page in my settings workspace
   * And  I see the Account recovery status enabled with a green dot
   *
   *
   * Given that I am a registered user
   * And	the Account recovery is enabled for my organization
   * And	the Account recovery policy is “Mandatory”
   * And	I have a pending account recovery organization policy
   * When	I log in
   * Then	I am prompted to join the account recovery program
   * And	I see a “Recovery (Mandatory)” dialog opened
   * And	I see a close button to go back to my current workspace
   * And	I see a explanation telling me the purpose of the account recovery policy
   * And	I see the information of the administrator who enabled the policy
   * And	I see the “Approve” option is selected by default
   * And	I see a “Learn more” button to see the documentation
   * And	I see a “Cancel” button to go back to my current workspace
   * And	I see a “Save” button
   */
  it('As a logged in user who has a pending organization account recovery policy, I can see a dialog prompting me to join the account recovery program if the policy is “mandatory” after logging in.', async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "mandatory"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);

    expect.assertions(2);
    props.dialogContext.open.mockImplementation((component, data) => {
      expect(component).toBe(ManageAccountRecoveryUserSettings);
      expect(data).toStrictEqual({organizationPolicy});
    });

    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);
  });

  /**
   * Given that I am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I am prompted to join the account recovery program
   * When	I select the “Approve” choice
   * And  I click on the save button
   * Then	I see a dialog to enter my passphrase
   * When	I enter my passphrase
   * Then	I see the “Enter passphrase” dialog is closed
   * And  I see account recovery prompt dialog closed
   * And  I see a progress dialog
   * Then I see the progress dialog is closed
   * And  I see a notification at the top telling my I joined the account recovery program
   * And  I see the account recovery page in my settings workspace
   * And  I see the Account recovery status enabled with a green dot
   *
   *
   * Given that I am a registered user
   * And  I have a pending account recovery organization policy
   * And  the Account recovery policy “Opt-in” account recovery is enabled
   * When I login
   * Then I am not prompted to join the account recovery program
   */
  it('As a logged in user who has a pending organisation account recovery policy, I can join the account recovery program when I am prompted to join it.', async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "opt-in"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);
    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);

    // we ensure that the test doesn't finish before the entire app mounted, otherwise we can't prove the dialog is effectively not called.
    await waitFor(() => {
      if (mockedAccountRecoveryUserService.getOrganizationAccountRecoverySettings.mock.calls.length === 0) {
        throw new Error("Component didn't finish mounting yet.");
      }
    });

    // now we should be pretty sure that HandleAccountRecoveryStatusCheck.componentDidMount has finished his business. So, we can now prove if the dialog has been called or not.
    expect.assertions(1);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });
});
