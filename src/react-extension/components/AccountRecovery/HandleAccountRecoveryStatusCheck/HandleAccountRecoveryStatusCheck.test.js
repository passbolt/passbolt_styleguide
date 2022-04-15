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
import AccountRecoveryInviteUserSettingPreferenceDialog from "../AccountRecoveryInviteUserSettingPreferenceDialog/AccountRecoveryInviteUserSettingPreferenceDialog";

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
   * And  I am asked to join the account recovery program
   * When	I click on the “Continue” choice
   * Then I'm redirected to my account recovery user settings
   * And  I am prompted to join the account recovery program
   */
  it('As a logged in user who has a pending organization account recovery policy, I can see a dialog prompting me to join the account recovery program if the policy is “opt-out” after logging in.', async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "opt-out"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);

    // The user didn't postponed the account recovery program enrollment
    props.context.port.request = jest.fn(() => false);

    expect.assertions(3);
    props.dialogContext.open.mockImplementation((component, data) => {
      expect(component).toBe(AccountRecoveryInviteUserSettingPreferenceDialog);
      expect(data).toStrictEqual({policy: "opt-out"});
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });

    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);
  });

  /**
   * Given that I already postponed am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I am asked to join the account recovery program
   * When	I click on the “Continue” choice
   * Then I'm redirected to my account recovery user settings
   * And  I am prompted to join the account recovery program
   */
  it('As a logged in user who has a pending organization account recovery policy, I can see a dialog prompting me to join the account recovery program if the policy is “mandatory” after logging in.', async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "mandatory"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);

    // The user didn't postponed the account recovery program enrollment
    props.context.port.request = jest.fn(() => false);

    expect.assertions(3);
    props.dialogContext.open.mockImplementation((component, data) => {
      expect(component).toBe(AccountRecoveryInviteUserSettingPreferenceDialog);
      expect(data).toStrictEqual({policy: "mandatory"});
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });

    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);
  });

  /**
   * Given that I already postponed am a registered user
   * And  the Account recovery is enabled for my organisation
   * And  the Account recovery policy is “Opt-out” or “Mandatory”
   * And  I have a pending account recovery organisation policy
   * And  I have postponed my enrollement for the account recovery program
   * Then I'm not prompted to join the account recovery program
   */
  it("As a logged in user who has postponed my account recovery enrollement, I'm not aksed again to enroll.", async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "mandatory"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);

    // The user postponed the account recovery program enrollment
    props.context.port.request = jest.fn(() => true);

    expect.assertions(2);

    new HandleAccountRecoveryStatusCheckPage(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});
    expect(mockedAccountRecoveryUserService.getOrganizationAccountRecoverySettings).toHaveBeenCalledTimes(1);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });
});
