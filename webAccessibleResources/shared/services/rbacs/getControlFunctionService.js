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

import {
  controlFunctionResolutions,
  defaultAdminUiActionControlResolution,
  defaultUserUiActionControlResolution
} from "./controlFunctionEnumeration";
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import AllowControlFunction from "./controlFunctions/allowControlFunction";

export default class GetControlFunctionService {
  /**
   * Get the control function defined for a given rbac.
   * @param {RbacEntity} rbac The rbac to get the control function for.
   * @returns {ControlFunction} The control function associated to the rbac. If no suitable control function found
   * DenyControlFunction is return.
   */
  static getByRbac(rbac) {
    const controlFunction = controlFunctionResolutions[rbac.controlFunction];

    if (!controlFunction) {
      console.warn(`Could not find control function for the given rbac entity (${rbac.id})`);
      return DenyControlFunction;
    }

    return controlFunction;
  }

  /**
   * Get the default control function for an admin for a given ui action.
   * @param {string} uiActionName The ui action name to get the control function for.
   * @returns {ControlFunction}
   */
  static getDefaultForAdminAndUiAction(uiActionName) {
    return defaultAdminUiActionControlResolution[uiActionName] || AllowControlFunction;
  }

  /**
   * Get the default control function for a user and for a given ui aciton
   * @param {string} uiActionName The ui action name to get the control function for.
   * @returns {ControlFunction}
   */
  static getDefaultForUserAndUiAction(uiActionName) {
    return defaultUserUiActionControlResolution[uiActionName] || AllowControlFunction;
  }
}
