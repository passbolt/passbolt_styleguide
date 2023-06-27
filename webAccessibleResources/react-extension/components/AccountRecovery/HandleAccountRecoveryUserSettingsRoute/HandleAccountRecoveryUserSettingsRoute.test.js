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
 * @since        3.6.0
 */
import {createMemoryHistory} from "history";
import {waitFor} from "@testing-library/dom";
import ManageAccountRecoveryUserSettings from "../ManageAccountRecoveryUserSettings/ManageAccountRecoveryUserSettings";
import HandleAccountRecoveryUserSettingsRoutePage from "./HandleAccountRecoveryUserSettingsRoute.test.page";
import {defaultProps, disabledOrganizationPolicy, optOutOrganizationPolicy} from "./HandleAccountRecoveryUserSettingsRoute.test.data";

describe("HandleAccountRecoveryUserSettingsRoute", () => {
  it("Should redirect to the user's account recovery setting if the organization policy is disabled", async() => {
    const history = createMemoryHistory();
    const organizationPolicy = disabledOrganizationPolicy();
    const props = defaultProps({
      accountRecoveryContext: {
        findAccountRecoveryPolicy: jest.fn(() => organizationPolicy),
        getPolicy: jest.fn(() => organizationPolicy.policy),
        getUserAccountRecoverySubscriptionStatus: jest.fn(() => "pending")
      },
      dialogContext: {
        open: jest.fn()
      }
    });
    new HandleAccountRecoveryUserSettingsRoutePage(props, history);
    await waitFor(() => {});
    expect(history.location.pathname).toBe("/app/settings/account-recovery");
  });

  it("Should redirect to the user's account recovery setting and show a notification if the user has already approved the enrollment", async() => {
    const history = createMemoryHistory();
    const organizationPolicy = optOutOrganizationPolicy();
    const props = defaultProps({
      accountRecoveryContext: {
        findAccountRecoveryPolicy: jest.fn(),
        getPolicy: jest.fn(() => organizationPolicy.policy),
        getUserAccountRecoverySubscriptionStatus: jest.fn(() => "approved"),
        getOrganizationPolicy: jest.fn(() => organizationPolicy),
      },
      dialogContext: {
        open: jest.fn(),
      },
      actionFeedbackContext: {
        displaySuccess: jest.fn(),
      },
    });

    new HandleAccountRecoveryUserSettingsRoutePage(props, history);
    await waitFor(() => {});
    expect(history.location.pathname).toBe("/app/settings/account-recovery");
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("You already enrolled to the account recovery program");
  });

  it("Should display the ManageAccountRecoveryUserSettings dialog if the organization policy is enabled and the user didn't enrolled yet.", async() => {
    const history = createMemoryHistory();
    const organizationPolicy = optOutOrganizationPolicy();
    const props = defaultProps({
      accountRecoveryContext: {
        findAccountRecoveryPolicy: jest.fn(() => organizationPolicy),
        getPolicy: jest.fn(() => organizationPolicy.policy),
        getUserAccountRecoverySubscriptionStatus: jest.fn(() => "pending"),
        getOrganizationPolicy: jest.fn(() => organizationPolicy),
      },
      dialogContext: {
        open: jest.fn(),
      },
      actionFeedbackContext: {
        displaySuccess: jest.fn(),
      },
    });

    new HandleAccountRecoveryUserSettingsRoutePage(props);
    await waitFor(() => {});
    expect(history.location.pathname).not.toBe("/app/settings/account-recovery/edit");
    expect(props.dialogContext.open).toHaveBeenCalledWith(ManageAccountRecoveryUserSettings, {
      organizationPolicy: organizationPolicy
    });
  });
});
