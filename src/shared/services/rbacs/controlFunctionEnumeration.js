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
 * @since         4.0.0
 */

import AllowControlFunction from "./controlFunctions/allowControlFunction";
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import {uiActions} from "./uiActionEnumeration";

/**
 * The
 * @type {{"CTL_FUNCTION_CONSTANT": "CTL_FUNCTION"}}
 */
export const controlFunctions = {
  ALLOW: 'Allow',
  DENY: 'Deny'
};

/**
 * The
 * @type {{"CTL_FUNCTION": Class}}
 */
export const controlFunctionResolutions = {
  [controlFunctions.ALLOW]: AllowControlFunction,
  [controlFunctions.DENY]: DenyControlFunction
};

/**
 * Default UI action controls for administrator.
 * By default the system makes it always ALLOW, but some action are more complex than allow and deny.
 * @type {{"UI_ACTION": function}}
 */
export const defaultAdminUiActionControlResolution = {
  [uiActions.FOLDERS_USE]: controlFunctionResolutions[controlFunctions.ALLOW] // Default example, to be removed when the placeholder won't be necessary anymore to explain the dat structure
};

/**
 * Default UI action controls for user.
 * By default the system makes it always ALLOW, but some action are restricted by default
 * @type {{"UI_ACTION": function}}
 */
export const defaultUserUiActionControlResolution = {
  [uiActions.FOLDERS_USE]: controlFunctionResolutions[controlFunctions.ALLOW] // Default example, to be removed when the placeholder won't be necessary anymore to explain the dat structure
};
