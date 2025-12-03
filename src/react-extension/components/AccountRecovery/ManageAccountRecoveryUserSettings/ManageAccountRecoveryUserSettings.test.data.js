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

import {defaultAccountRecoveryUserContext} from "../../../contexts/AccountRecoveryUserContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultRoleContext} from "../../../contexts/RoleContext.test.data";
import {optOutOrganizationPolicy} from "../HandleAccountRecoveryUserSettingsRoute/HandleAccountRecoveryUserSettingsRoute.test.data";

/**
 * Default props
 * @param {object} [data]
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const roleContext = defaultRoleContext(data.roleContext);
  const roles = data.roles || roleContext.roles;
  return {
    context: defaultUserAppContext(),
    accountRecoveryContext: defaultAccountRecoveryUserContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    dialogContext: defaultDialogContext(),
    onClose: jest.fn(),
    organizationPolicy: optOutOrganizationPolicy(),
    ...data,
    roleContext: roleContext,
    roles: roles,
  };
}
