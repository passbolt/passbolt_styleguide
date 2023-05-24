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

import {createMemoryHistory} from "history";
import AccountRecoveryInviteUserSettingPreferenceDialogPage from "./AccountRecoveryInviteUserSettingPreferenceDialog.test.page";
import {waitFor} from "@testing-library/react";
import {PolicyVariations} from "./AccountRecoveryInviteUserSettingPreferenceDialog";
import {defaultProps} from "./AccountRecoveryInviteUserSettingPreferenceDialog.test.data";
import each from "jest-each";

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

each([
  {displayAs: PolicyVariations.MANDATORY, text: "It is mandatory to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?"},
  {displayAs: PolicyVariations.OPT_OUT, text: "It is recommended to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?"},
]).describe("AccountRecoveryInviteUserSettingPreferenceDialog", scenario => {
  const props = defaultProps({
    policy: scenario.displayAs
  });

  it(`As LU who haven't decided yet about the account recovery program, I'm prompted to follow a link to securely share my private key with the organization by applying to the account recovery program, scenario: ${JSON.stringify(scenario)}`, async() => {
    const page = new AccountRecoveryInviteUserSettingPreferenceDialogPage(props);
    await waitFor(() => { });

    expect.assertions(1);
    expect(page.message).toStrictEqual(scenario.text);
  });

  it(`As LU who haven't decided yet about the account recovery program, I can choose to continue to my user settings to take a decision about the account recovery, scenario: ${JSON.stringify(scenario)}`, async() => {
    const history = createMemoryHistory();
    const page = new AccountRecoveryInviteUserSettingPreferenceDialogPage(props, history);
    await waitFor(() => { });

    await page.clickOnContinue();
    expect.assertions(1);
    expect(history.location.pathname).toBe("/app/settings/account-recovery/edit");
  });

  it(`As LU who haven't decided yet about the account recovery program, I can postponed my choice for the account recovery programe by clicking the "cancel" button, scenario: ${JSON.stringify(scenario)}`, async() => {
    const page = new AccountRecoveryInviteUserSettingPreferenceDialogPage(props);
    await waitFor(() => { });

    await page.clickOnCancel();
    expect.assertions(2);
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.postpone-user-setting-invitation");
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it(`As LU who haven't decided yet about the account recovery program, I can postponed my choice for the account recovery programe by clicking the cross on the dialog, scenario: ${JSON.stringify(scenario)}`, async() => {
    const page = new AccountRecoveryInviteUserSettingPreferenceDialogPage(props);
    await waitFor(() => { });

    await page.clickOnCross();
    expect.assertions(2);
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.postpone-user-setting-invitation");
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
