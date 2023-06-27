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

import {
  defaultAdminAccountRecoveryContext,
  hasPolicyChangesAdminAccountRecoveryContext
} from "../../../../contexts/AdminAccountRecoveryContext.test.data";
import {defaultWorkflowContext} from "../../../../contexts/WorkflowContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: defaultAdminAccountRecoveryContext(props?.adminAccountRecoveryContext),
    workflowContext: defaultWorkflowContext(props?.workflowContext)
  };
  delete props.adminAccountRecoveryContext; // Treated in the default
  delete props.workflowContext; // Treated in the default
  return Object.assign(_props, props);
}

/**
 * Has policy changes props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function hasChangedPolicyProps(props = {}) {
  const _props = {
    adminAccountRecoveryContext: hasPolicyChangesAdminAccountRecoveryContext(props?.adminAccountRecoveryContext),
  };
  return defaultProps(Object.assign(_props, props));
}
