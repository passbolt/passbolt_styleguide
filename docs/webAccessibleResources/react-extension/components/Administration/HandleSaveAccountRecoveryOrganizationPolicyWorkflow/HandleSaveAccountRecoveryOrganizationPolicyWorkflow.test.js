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
 * Unit tests on HandleSaveAccountRecovery in regard of specifications
 */

import HandleSaveAccountRecoveryOrganizationPolicyWorkflowPage from "./HandleSaveAccountRecoveryOrganizationPolicyWorkflow.test.page";
import {defaultProps, hasPolicyChangesProps} from "./HandleSaveAccountRecoveryOrganizationPolicyWorkflow.test.data";
import ConfirmSaveAccountRecoverySettings from "../ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings";
import ProvideAccountRecoveryOrganizationKey from "../ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";
import {waitFor} from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the dialog of the different save step of account recovery policy", () => {
  it('As AD I should not see a dialog', async() => {
    const props = defaultProps();
    new HandleSaveAccountRecoveryOrganizationPolicyWorkflowPage(props);
    expect(props.dialogContext.open).not.toBeCalled();
  });

  it('As AD I should see the confirm save account recovery settings', async() => {
    const props = hasPolicyChangesProps();
    const expectDialogProps = {
      policy: "opt-in",
      onClose: expect.any(Function),
      onSubmit: expect.any(Function)
    };

    expect.assertions(1);
    new HandleSaveAccountRecoveryOrganizationPolicyWorkflowPage(props);
    await waitFor(() => {});
    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveAccountRecoverySettings, expect.objectContaining(expectDialogProps));
  });

  it.skip('As AD I should see the provided ork', async() => {
    // @todo to complete, but it's a bit overmocked
    const props = hasPolicyChangesProps();
    const expectDialogProps = {
      onCancel: expect.any(Function),
      onError: expect.any(Function),
      onSubmit:  expect.any(Function)
    };

    expect.assertions(1);
    new HandleSaveAccountRecoveryOrganizationPolicyWorkflowPage(props);
    await waitFor(() => {});
    expect(props.dialogContext.open).toHaveBeenCalledWith(ProvideAccountRecoveryOrganizationKey, expect.objectContaining(expectDialogProps));
  });
});
