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
 * @since         3.10.0
 */

import {waitFor} from "@testing-library/react";
import {defaultProps} from "./MfaInviteUserSettingsPreferenceDialog.test.data";
import MfaInviteUserSettingsPreferenceDialogPage from "./MfaInviteUserSettingsPreferenceDialog.test.page";

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe("MfaInviteUserSettingsPreferenceDialog", () => {
  const props = defaultProps();

  it(`As LU who haven't decided yet about the mfa program, I'm prompted to follow a link to securely share my private key with the organization by applying to the mfa program`, async() => {
    const page = new MfaInviteUserSettingsPreferenceDialogPage(props);
    await waitFor(() => { });

    expect.assertions(1);
    expect(page.message).toStrictEqual("Your administrator requires you to configure a Multi Factor Authentication method for your account.");
  });

  it(`As LU who haven't decided yet about the mfa program, I can choose to continue to my user settings to take a decision about the mfa`, async() => {
    const page = new MfaInviteUserSettingsPreferenceDialogPage(props);
    await waitFor(() => { });

    await page.clickOnContinue();
    expect.assertions(2);
    expect(props.navigationContext.onGoToUserSettingsMfaRequested).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it(`As LU who haven't decided yet about the mfa program, I can postponed my choice for the mfa programe by clicking the "cancel" button`, async() => {
    const page = new MfaInviteUserSettingsPreferenceDialogPage(props);
    await waitFor(() => { });

    await page.clickOnCancel();
    expect.assertions(2);
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-policy.postpone-user-setting-invitation");
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it(`As LU who haven't decided yet about the mfa program, I can postponed my choice for the mfa programe by clicking the cross on the dialog`, async() => {
    const page = new MfaInviteUserSettingsPreferenceDialogPage(props);
    await waitFor(() => { });

    await page.clickOnCross();
    expect.assertions(2);
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-policy.postpone-user-setting-invitation");
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
