/**
 * Default props
 * @returns {*}
 */
import {AdminAccountRecoveryContextStep} from "../../../contexts/AdminAccountRecoveryContext";

export function defaultProps(step = AdminAccountRecoveryContextStep.INITIAL_STATE) {
  return {
    adminAccountRecoveryContext: {
      step,
      currentPolicy: {policy: 'disabled'},
      newPolicy: {policy: 'mandatory'},
      confirmSaveRequested: jest.fn(),
      save: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}
