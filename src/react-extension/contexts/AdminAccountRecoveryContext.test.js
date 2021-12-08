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

import {defaultProps} from "./AdminAccountRecoveryContext.test.data";
import {AdminAccountRecoveryContextProvider, AdminAccountRecoveryContextState} from "./AdminAccountRecoveryContext";
import {clear} from 'jest-useragent-mock';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  clear();
});

describe("AdminAccountRecovery Context", () => {
  let adminAccountRecoveryContext; // The adminAccountRecoveryContext to text
  const props = defaultProps(); // The props to pass

  describe('As AD I should complete an adminAccountRecovery setup', () => {
    beforeEach(() => {
      adminAccountRecoveryContext = new AdminAccountRecoveryContextProvider(props);
      const setStateMock = state => adminAccountRecoveryContext.state = Object.assign(adminAccountRecoveryContext.state, state);
      jest.spyOn(adminAccountRecoveryContext, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(adminAccountRecoveryContext.props.context.port, 'request').mockImplementation(requestMock);
    });

    it('As AD I should start with the state INITIAL_STATE', () => {
      expect(adminAccountRecoveryContext.state.step).toBe(AdminAccountRecoveryContextState.INITIAL_STATE);
    });

    it('As AD I should get the current policy', async() => {
      const currentPolicy = {
        policy: "disabled"
      };
      const requestAccountRecoveryPolicyMock = jest.fn(() => currentPolicy);
      jest.spyOn(adminAccountRecoveryContext.props.context.port, 'request').mockImplementation(requestAccountRecoveryPolicyMock);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.get");
      expect(adminAccountRecoveryContext.state.currentPolicy).toBe(currentPolicy);
    });

    it('As AD I should change the policy', async() => {
      const currentPolicy = {
        policy: "disabled"
      };
      const newPolicy = {
        policy: "mandatory"
      };
      const requestAccountRecoveryPolicyMock = jest.fn(() => currentPolicy);
      jest.spyOn(adminAccountRecoveryContext.props.context.port, 'request').mockImplementation(requestAccountRecoveryPolicyMock);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.get");
      expect(adminAccountRecoveryContext.state.currentPolicy).toBe(currentPolicy);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.state.newPolicy).toBe(newPolicy);
      expect(adminAccountRecoveryContext.state.hasChanged).toBeTruthy();
    });

    it('As AD I should initiate the save with the DISPLAY_SUMMARY step', async() => {
      await adminAccountRecoveryContext.initiateSaveRequested();
      expect(adminAccountRecoveryContext.state.step).toBe(AdminAccountRecoveryContextState.DISPLAY_SUMMARY);
    });

    it('As AD I should confirm the save with the DISPLAY_SUMMARY step', async() => {
      await adminAccountRecoveryContext.confirmSaveRequested();
      expect(adminAccountRecoveryContext.state.step).toBe(AdminAccountRecoveryContextState.ENTER_CURRENT_ORK);
    });

    it('As AD I should save my new policy', async() => {
      const currentPolicy = {
        policy: "mandatory",
        account_recovery_organization_public_key: {
          fingerprint: "123456788"
        }
      };
      const newPolicy = {
        policy: "mandatory",
        account_recovery_organization_public_key: {
          fingerprint: "123456789"
        }
      };
      const requestAccountRecoveryPolicyMock = jest.fn(() => currentPolicy);
      jest.spyOn(adminAccountRecoveryContext.props.context.port, 'request').mockImplementation(requestAccountRecoveryPolicyMock);
      await adminAccountRecoveryContext.findAccountRecoveryPolicy();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.get");
      expect(adminAccountRecoveryContext.state.currentPolicy).toBe(currentPolicy);
      await adminAccountRecoveryContext.changePolicy(newPolicy);
      expect(adminAccountRecoveryContext.state.newPolicy).toBe(newPolicy);
      expect(adminAccountRecoveryContext.state.hasChanged).toBeTruthy();
      await adminAccountRecoveryContext.save();
      expect(adminAccountRecoveryContext.props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.save-organization-settings", newPolicy);
      expect(adminAccountRecoveryContext.state.currentPolicy).toBe(newPolicy);
    });
  });
});
