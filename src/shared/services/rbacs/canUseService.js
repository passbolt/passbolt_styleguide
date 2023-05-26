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

import GetControlFunctionService from "./getControlFunctionService";

export default class CanUse {
  /**
   * Check if a role can use a UI action
   * @param {RoleEntity} role The role to check for.
   * @param {RbacsCollection} rbacs The collection of rbacs
   * @param {string} actionName The action name to check the control function
   * @returns {boolean}
   */
  static canRoleUseUiAction(role, rbacs, actionName) {
    // Administrator action are not controlled by rbac.
    if (role.isAdmin()) {
      const adminControlFunction = GetControlFunctionService.getDefaultForAdminAndUiAction(actionName);
      return adminControlFunction.execute();
    }

    // If the action is controlled by rbac for the given role.
    const rbac = rbacs.findRbacByRoleAndUiActionName(role, actionName);
    if (rbac) {
      const rbacControlFunction = GetControlFunctionService.getByRbac(rbac);
      return rbacControlFunction.execute();
    }

    // Fallback on user default.
    const fallbackControlFunction = GetControlFunctionService.getDefaultForUserAndUiAction(actionName);
    return fallbackControlFunction.execute();
  }
}
