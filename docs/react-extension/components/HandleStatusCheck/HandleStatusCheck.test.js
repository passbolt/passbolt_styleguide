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
import {defaultProps, defaultAccountRecoveryUserService, getOrganizationAccountRecoveryPolicy} from "./HandleStatusCheck.test.data";
import HandleStatusCheck from "./HandleStatusCheck.test.page";
import AccountRecoveryInviteUserSettingPreferenceDialog from "../../components/AccountRecovery/AccountRecoveryInviteUserSettingPreferenceDialog/AccountRecoveryInviteUserSettingPreferenceDialog";
import MfaInviteUserSettingsPreferenceDialog from "../MFA/MfaInviteUserSettingsPreferenceDialog";
import {MfaPolicyEnumerationTypes} from "../../../shared/models/mfaPolicy/MfaPolicyEnumeration";

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

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
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

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
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

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
    await waitFor(() => {});
    expect(mockedAccountRecoveryUserService.getOrganizationAccountRecoverySettings).toHaveBeenCalledTimes(1);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });

  /**
   *Given I am an anonymous user
   *And	I am on passbolt sign-in screen
   *And	The MFA policy is set to “Mandatory”
   *And	I did not configure yet my MFA
   *When	I sign-in
   *Then	I see a “Enable Multi Factor Authentication” dialog
   */
  it("As a user signing I am requested to enable MFA when the MFA policy is 'Mandatory'", async() => {
    expect.assertions(3);

    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService();
    // Mock the first call for account-recovery
    jest.spyOn(props.context.siteSettings, 'canIUse').mockImplementation(feature => feature === "mfaPolicies");
    // Mock the call for mfa-policy
    props.context.port.request.mockImplementation(() => false);
    jest.spyOn(props.mfaContext, "getPolicy").mockImplementationOnce(() => MfaPolicyEnumerationTypes.MANDATORY);

    props.dialogContext.open.mockImplementationOnce(component => {
      expect(component).toBe(MfaInviteUserSettingsPreferenceDialog);
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);

    //Should not with OPT-in
    jest.spyOn(props.mfaContext, "getPolicy").mockImplementationOnce(() => MfaPolicyEnumerationTypes.OPTIN);
    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });

  /**
   *Given I am a signed-in user
   *And	The MFA policy is set to “Mandatory”
   *And	I did not configure yet my MFA
   *When	I click later
   *And	I refresh the page
   *Then	I should not be requested to configure MFA
   */
  it("As a user signing I can postpone the MFA configuration request to the next sign-in operation", async() => {
    expect.assertions(1);

    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService();
    // Mock the first call for account-recovery
    jest.spyOn(props.context.siteSettings, 'canIUse').mockImplementation(feature => feature === "mfaPolicies");
    // Mock the call for mfa-policy
    props.context.port.request.mockImplementation(() => true);
    jest.spyOn(props.mfaContext, "getPolicy").mockImplementationOnce(() => MfaPolicyEnumerationTypes.MANDATORY);

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });

  /**
   *Given I am an anonymous user
   *And	I am on passbolt sign-in screen
   *And	The MFA policy is set to “Mandatory”
   *And	I already configured my MFA
   *When	I sign-in
   *Then	I should not see the  “Enable Multi Factor Authentication” dialog
   */
  it("As a user signing I am not requested to enable MFA when the MFA policy is “Mandatory” if I already setup MFA", async() => {
    expect.assertions(1);

    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService();
    // Mock the first call for account-recovery
    jest.spyOn(props.context.siteSettings, 'canIUse').mockImplementation(feature => feature === "mfaPolicies");
    // Mock the call for mfa-policy
    props.context.port.request.mockImplementation(() => true);
    jest.spyOn(props.mfaContext, "getPolicy").mockImplementationOnce(() => MfaPolicyEnumerationTypes.MANDATORY);
    jest.spyOn(props.mfaContext, "hasMfaSettings").mockImplementationOnce(() => true);

    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
    expect(props.dialogContext.open).not.toHaveBeenCalled();
  });

  /**
   *Given I am an anonymous user
   *And	I am on passbolt sign-in screen
   *And	The MFA policy is set to “Mandatory”
   *And	I did not configure yet my MFA
   *And	The account recovery policy is set to “Mandatory”
   *And	I did not configure yet my account recovery
   *When	I sign-in
   *Then	I see the account recovery program request dialog
   *And	I should not see the MFA configuration request dialo
   */
  it("As a signed-in user who is required to enable MFA & account recovery I should see the account recovery program request first", async() => {
    const organizationPolicy = getOrganizationAccountRecoveryPolicy({policy: "mandatory"});
    const mockedAccountRecoveryUserService = defaultAccountRecoveryUserService(organizationPolicy);
    // Mock the first call for account-recovery
    jest.spyOn(props.context.siteSettings, 'canIUse').mockImplementation(() => true);
    jest.spyOn(props.mfaContext, "getPolicy").mockImplementationOnce(() => MfaPolicyEnumerationTypes.MANDATORY);

    // The user didn't postponed the account recovery program enrollment
    props.context.port.request = jest.fn(() => false);

    expect.assertions(3);
    props.dialogContext.open.mockImplementation((component, data) => {
      expect(component).toBe(AccountRecoveryInviteUserSettingPreferenceDialog);
      expect(data).toStrictEqual({policy: "mandatory"});
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });
    new HandleStatusCheck(props, mockedAccountRecoveryUserService);
  });
});
