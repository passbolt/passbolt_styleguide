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
 * @since         3.4.0
 */

/**
 * Unit tests on ManageAccountRecoveryAdministrationSettings in regard of specifications
 */


import {
  defaultProps, mockAccountRecoveryDisableWithOrganizationKey
} from "./ManageAccountRecoveryAdministrationSettings.test.data";
import ManageAccountRecoveryAdministrationSettingsPage from "./ManageAccountRecoveryAdministrationSettings.test.page";
import {waitFor} from "@testing-library/react";
import MockPort from "../../../test/mock/MockPort";
import ConfirmSaveAccountRecoverySettings
  from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should see the account recovery settings", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const accountRecoverySettingsFoundRequestMockImpl = jest.fn(() => Promise.resolve(mockAccountRecoveryDisableWithOrganizationKey));

  it('As AD in the administration workspace, I can see the account recovery section populated with the default value', async() => {
    mockContextRequest(accountRecoverySettingsFoundRequestMockImpl);
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("Account Recovery");
    expect(page.accountRecoveryPolicyTitle).toBe("Account Recovery Policy");
    await expect(page.disableRadioButton.isChecked).toBeTruthy();
    await expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    await expect(page.optInRadioButton.isChecked).toBeFalsy();
    await expect(page.optOutRadioButton.isChecked).toBeFalsy();
    expect(page.help).toBeTruthy();
    expect(page.helpReadDocumentation.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it('As a logged in administrator in the administration workspace, I can select an account recovery policy', async() => {
    mockContextRequest(accountRecoverySettingsFoundRequestMockImpl);
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    await waitFor(() => {});
    await page.selectPolicy(page.mandatoryRadioButton);
    await expect(page.mandatoryRadioButton.isChecked).toBeTruthy();
    await expect(page.disableRadioButton.isChecked).toBeFalsy();
    await expect(page.optInRadioButton.isChecked).toBeFalsy();
    await expect(page.optOutRadioButton.isChecked).toBeFalsy();
    expect(page.warningMessage).toBe("Warning, Don't forget to save your settings to apply your modification.");
  });

  it('As a logged in administrator in the administration workspace, I can disable the account recovery policy', async() => {
    mockContextRequest(accountRecoverySettingsFoundRequestMockImpl);
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    await waitFor(() => {});
    await page.selectPolicy(page.optInRadioButton);
    await expect(page.optInRadioButton.isChecked).toBeTruthy();
    await expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    await expect(page.disableRadioButton.isChecked).toBeFalsy();
    await expect(page.optOutRadioButton.isChecked).toBeFalsy();
    await page.selectPolicy(page.disableRadioButton);
    await expect(page.disableRadioButton.isChecked).toBeTruthy();
    await expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    await expect(page.optInRadioButton.isChecked).toBeFalsy();
    await expect(page.optOutRadioButton.isChecked).toBeFalsy();
  });

  it('As a logged in administrator in the administration workspace, I can save the account recovery policy', async() => {
    mockContextRequest(accountRecoverySettingsFoundRequestMockImpl);
    page = new ManageAccountRecoveryAdministrationSettingsPage(props);
    await waitFor(() => {});
    await page.selectPolicy(page.optInRadioButton);
    await expect(page.optInRadioButton.isChecked).toBeTruthy();
    await expect(page.mandatoryRadioButton.isChecked).toBeFalsy();
    await expect(page.disableRadioButton.isChecked).toBeFalsy();
    await expect(page.optOutRadioButton.isChecked).toBeFalsy();

    expect(props.administrationWorkspaceContext.onSaveEnabled).toHaveBeenCalled();
    const propsUpdated = {
      context: {
        port: new MockPort(),
      },
      administrationWorkspaceContext: {
        must: {
          save: true
        },
        onResetActionsSettings: jest.fn(),
        can: {
          save: true
        },
        onSaveEnabled: jest.fn(),
      },
      dialogContext: {
        open: jest.fn()
      }
    };
    page.rerender(propsUpdated);
    await waitFor(() => {});
    const accountRecovery = {
      organizationRecoveryKey: {
        hasChanged: false,
        value: {
          algorithm: "RSA",
          created: "2021-08-05T02:50:34.12",
          expires: "Never",
          fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
          keyLength: 4096,
          user_ids: [{
            name: 'A-Test',
            email: 'a-test@passbolt.com'
          }, {
            name: 'B-Test',
            email: 'b-test@passbolt.com'
          }]
        }
      },
      policy: {
        hasChanged: true,
        info: "Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.",
        value: "opt-in"
      }
    };
    expect(propsUpdated.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveAccountRecoverySettings, {accountRecovery});
    expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
  });
});
