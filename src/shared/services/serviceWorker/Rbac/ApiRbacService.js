import RbacMeService from "../../api/rbac/rbacMeService";
import CanUse from "../../rbacs/canUseService";
import RbacsCollection from "../../../models/entity/rbac/rbacsCollection";

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */

export default class ApiRbacService {
  /**
   * @param {ApiClientOptions} apiClientOptions The api client options
   * @param {RoleEntity} role The user role
   */
  constructor(apiClientOptions, role) {
    console.log('------');
    console.log(apiClientOptions, role);
    this.rbacMeService = new RbacMeService(apiClientOptions);
    this.role = role;
    this.rbacs = null;
  }

  /**
   * Check if the given account can use a UI action.
   * @param {string} actionName The name of the ui action to check for.
   * @returns {Promise<boolean>}
   */
  async canIUseUiAction(actionName) {
    const rbacs = await this.getOrFindRbacsMe({ui_action: true});

    return CanUse.canRoleUseUiAction(this.role, rbacs, actionName);
  }


  async getOrFindRbacsMe(contains) {
    if (!this.rbacs) {
      const collectionDto = await this.rbacMeService.findMe(contains);
      this.rbacs = new RbacsCollection(collectionDto);
    }
    return this.rbacs;
  }
}
