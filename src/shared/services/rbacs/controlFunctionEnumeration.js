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
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import {uiActions} from "./uiActionEnumeration";

/**
 * The supported control functions labels.
 * @type {object}
 */
export const controlFunctions = {
  ALLOW: 'Allow',
  DENY: 'Deny'
};

/**
 * The control function labels associated to their relative function.
 * @type {object}
 */
export const controlFunctionResolutions = {
  [controlFunctions.ALLOW]: AllowControlFunction,
  [controlFunctions.DENY]: DenyControlFunction
};

/**
 * Default UI action controls for administrator.
 * By default, the system makes it always ALLOW, but some action are more complex than allow and deny.
 * @type {object}
 */
export const defaultAdminUiActionControlResolution = {
  [uiActions.FOLDERS_USE]: controlFunctionResolutions[controlFunctions.ALLOW] // Default example, to be removed when the placeholder won't be necessary anymore to explain the dat structure
};

/**
 * Default UI action controls for user.
 * By default, the system makes it always ALLOW, but some action are restricted by default
 * @type {object}
 */
export const defaultUserUiActionControlResolution = {
  [uiActions.FOLDERS_USE]: controlFunctionResolutions[controlFunctions.ALLOW] // Default example, to be removed when the placeholder won't be necessary anymore to explain the dat structure
};
