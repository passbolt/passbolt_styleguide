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
import RoleEntity from "../../../shared/models/entity/role/roleEntity";

export default class CanUse {
  /**
   * Check if a role can use a UI action
   * @param {object} user The logged in user.
   * @param {RbacsCollection} rbacs The collection of rbacs
   * @param {string} actionName The action name to check the control function
   * @returns {boolean}
   */
  static canRoleUseUiAction(user, rbacs, actionName) {
    // Desktop action should always be driven by rbac
    if (window.chrome?.webview) {
      const rbac = rbacs.findRbacByUiActionName(actionName);
      return this.getByRbacOrDefault(rbac, actionName, user);
    }

    const role =  new RoleEntity(user.role);
    // Administrator action are not controlled by rbac.
    if (role.isAdmin()) {
      const adminControlFunction = GetControlFunctionService.getDefaultForAdminAndUiAction(actionName);
      return adminControlFunction.execute();
    }
    // If the action is controlled by rbac for the given role.
    const rbac = rbacs.findRbacByRoleAndUiActionName(role, actionName);

    return this.getByRbacOrDefault(rbac, actionName, user);
  }

  /**
   * Check if a role can use a UI action or return the default userr
   * @param {RbacEntity} rbac The rbac entity
   * @param {string} actionName The action name to check the control function
   * @param {object} user The logged in user.
   * @returns {boolean}
   */
  static getByRbacOrDefault(rbac, actionName, user) {
    if (rbac) {
      const rbacControlFunction = GetControlFunctionService.getByRbac(rbac);
      return rbacControlFunction.execute(user);
    }

    // Fallback on user default.
    const fallbackControlFunction = GetControlFunctionService.getDefaultForUserAndUiAction(actionName);
    return fallbackControlFunction.execute();
  }
}
