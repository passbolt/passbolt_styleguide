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
 * Unit tests on ManageAccountRecoveryAdministrationSettings in regard of specifications
 */
import {
  defaultProps,
  hasChangedPolicyProps,
  mandatoryPolicyPropsWithOrganisationKey,
  optInPolicyPropsWithOrganisationKey,
  optOutPolicyPropsWithOrganisationKey,
} from "./ManageAccountRecoveryAdministrationSettings.test.data";
import ManageAccountRecoveryAdministrationSettingsPage from "./ManageAccountRecoveryAdministrationSettings.test.page";
import {waitFor} from "@testing-library/react";
import DisplayAdministrationAccountRecoveryActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationAccountRecoveryAction/DisplayAdministrationAccountRecoveryActions";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should see the account recovery settings", () => {
  let page; // The page to test against

  it('As AD in the administration workspace, I can see the account recovery section populated with the default value', async() => {
    expect.assertions(12);
    const props = defaultProps(); // The props to pass
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    await waitFor(() => {});
    expect(props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction).toHaveBeenCalledWith(DisplayAdministrationAccountRecoveryActions);
    expect(props.adminAccountRecoveryContext.findAccountRecoveryPolicy).toBeCalled();
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("Account Recovery");
    expect(page.accountRecoveryPolicyTitle).toBe("Account Recovery Policy");
    expect(page.disableRadioButton.isChecked).toBeTruthy();
    expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    expect(page.optInRadioButton.isChecked).toBeFalsy();
    expect(page.optOutRadioButton.isChecked).toBeFalsy();
    expect(page.help).toBeTruthy();
    expect(page.helpReadDocumentation.getAttribute("rel")).toBe("noopener noreferrer");
    await page.unmount();
    expect(props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction).toHaveBeenCalled();
  });

  it('As AD in the administration workspace, I can see the account recovery section populated with the mandatory value', async() => {
    expect.assertions(4);
    const props = mandatoryPolicyPropsWithOrganisationKey(); // The props to pass
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    expect(page.mandatoryRadioButton.isChecked).toBeTruthy();
    expect(page.disableRadioButton.isChecked).toBeFalsy();
    expect(page.optInRadioButton.isChecked).toBeFalsy();
    expect(page.optOutRadioButton.isChecked).toBeFalsy();
  });

  it('As AD in the administration workspace, I can see the account recovery section populated with the opt-in value', async() => {
    expect.assertions(4);
    const props = optInPolicyPropsWithOrganisationKey(); // The props to pass
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    expect(page.disableRadioButton.isChecked).toBeFalsy();
    expect(page.optInRadioButton.isChecked).toBeTruthy();
    expect(page.optOutRadioButton.isChecked).toBeFalsy();
  });

  it('As AD in the administration workspace, I can see the account recovery section populated with the opt-out value', async() => {
    expect.assertions(4);
    const props = optOutPolicyPropsWithOrganisationKey(); // The props to pass
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    expect(page.disableRadioButton.isChecked).toBeFalsy();
    expect(page.optInRadioButton.isChecked).toBeFalsy();
    expect(page.optOutRadioButton.isChecked).toBeTruthy();
  });

  it('As a logged in administrator in the administration workspace, I can select an account recovery policy', async() => {
    expect.assertions(6);
    const props = hasChangedPolicyProps(); // The props to pass
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    expect(page.mandatoryRadioButton.isChecked).toBeTruthy();
    expect(page.disableRadioButton.isChecked).toBeFalsy();
    expect(page.optInRadioButton.isChecked).toBeFalsy();
    expect(page.optOutRadioButton.isChecked).toBeFalsy();
    await page.clickOnOptInPolicyButton();
    const newPolicy = "opt-in";
    expect(props.adminAccountRecoveryContext.changePolicy).toHaveBeenCalledWith(newPolicy);
    expect(page.warningMessage).toBe("Warning, Don't forget to save your settings to apply your modification.");
  });
});
