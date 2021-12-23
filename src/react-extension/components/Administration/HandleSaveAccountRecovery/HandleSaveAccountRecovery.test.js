/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.5.0
 */

/**
 * Unit tests on HandleSaveAccountRecovery in regard of specifications
 */


import HandleSaveAccountRecoveryPage from "./HandleSaveAccountRecovery.test.page";
import {defaultProps} from "./HandleSaveAccountRecovery.test.data";
import {AdminAccountRecoveryContextStep} from "../../../contexts/AdminAccountRecoveryContext";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";
import ProvideOrganizationKey from "../ProvideOrganizationKey/ProvideOrganizationKey";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the dialog of the different save step of account recovery policy", () => {
  it('As AD I should not see a dialog', async() => {
    const props = defaultProps();
    new HandleSaveAccountRecoveryPage(props);
    expect(props.dialogContext.open).not.toBeCalled();
  });

  it('As AD I should see the confirm save account recovery settings', async() => {
    const props = defaultProps(AdminAccountRecoveryContextStep.DISPLAY_SUMMARY);
    new HandleSaveAccountRecoveryPage(props);
    const accountRecoveryPolicy = {
      currentPolicy: props.adminAccountRecoveryContext.currentPolicy,
      newPolicy: props.adminAccountRecoveryContext.newPolicy,
      confirmSaveRequested: props.adminAccountRecoveryContext.confirmSaveRequested
    };
    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveAccountRecoverySettings, {accountRecoveryPolicy});
  });

  it('As AD I should see the provide ork', async() => {
    const props = defaultProps(AdminAccountRecoveryContextStep.ENTER_CURRENT_ORK);
    new HandleSaveAccountRecoveryPage(props);
    const accountRecoveryPolicy = {
      currentPolicy: props.adminAccountRecoveryContext.currentPolicy,
      newPolicy: props.adminAccountRecoveryContext.newPolicy,
      save: props.adminAccountRecoveryContext.save
    };
    expect(props.dialogContext.open).toHaveBeenCalledWith(ProvideOrganizationKey, {accountRecoveryPolicy});
  });
});
