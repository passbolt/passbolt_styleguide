/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import AllowControlFunction from "./controlFunctions/allowControlFunction";
import AllowIfGroupManagerInOneGroupFunction from "./controlFunctions/allowIfGroupManagerInOneGroupFunction";
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import {uiActions} from "./uiActionEnumeration";
import {actions} from "./actionEnumeration";

/**
 * The supported control functions labels.
 * @type {object}
 */
export const controlFunctions = {
  ALLOW: 'Allow',
  DENY: 'Deny',
  ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP: 'AllowIfGroupManagerInOneGroup'
};

/**
 * The control function labels associated to their relative function.
 * @type {object}
 */
export const controlFunctionResolutions = {
  [controlFunctions.ALLOW]: AllowControlFunction,
  [controlFunctions.DENY]: DenyControlFunction,
  [controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP]: AllowIfGroupManagerInOneGroupFunction
};

/**
 * Default UI action controls for administrator.
 * By default, the system makes it always ALLOW, but some action are more complex than allow and deny.
 * @type {object}
 */
export const defaultAdminActionControlResolution = {
  [uiActions.FOLDERS_USE]: controlFunctionResolutions[controlFunctions.ALLOW] // Default example, to be removed when the placeholder won't be necessary anymore to explain the dat structure
};

/**
 * Default UI action controls for user.
 * By default, the system makes it always ALLOW, but some action are restricted by default
 * @type {object}
 */
export const defaultUserActionControlResolution = {
  [uiActions.ADMINSTRATION_VIEW_WORKSPACE]: controlFunctionResolutions[controlFunctions.DENY],
  [actions.GROUPS_ADD]: controlFunctionResolutions[controlFunctions.DENY],
  [actions.ACCOUNT_RECOVERY_REQUEST_VIEW]: controlFunctionResolutions[controlFunctions.DENY],
  [actions.ACCOUNT_RECOVERY_REQUEST_INDEX]: controlFunctionResolutions[controlFunctions.DENY],
  [actions.ACCOUNT_RECOVERY_RESPONSE_CREATE]: controlFunctionResolutions[controlFunctions.DENY],
};
