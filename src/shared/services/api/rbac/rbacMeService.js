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

import AbstractService from "../abstract/abstractService";

const RBAC_SERVICE_RESOURCE_NAME = '/rbacs/me';

class RbacMeService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, RbacMeService.RESOURCE_NAME);
  }

  /**
   * API Resource Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return RBAC_SERVICE_RESOURCE_NAME;
  }

  /**
   * Return the list of supported options for the contain option in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedContainOptions() {
    return ["action", "ui_action"];
  }

  /**
   * Find the current user rbacs.
   * @param {object} contains
   * @returns {object}
   */
  async findMe(contains) {
    // return [
    //   defaultRbacData({
    //     role_id: '0d51c3a8-5e67-5e3d-882f-e1868966d817',
    //     ui_action: defaultUiActionData({name: 'Resources.export'}),
    //     control_function: 'Deny',
    //     foreign_model: RbacEntity.FOREIGN_MODEL_ACTION
    //   }),
    //   defaultRbacData({
    //     role_id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
    //     ui_action: defaultUiActionData({name: 'Resources.export'}),
    //     control_function: 'Deny',
    //     foreign_model: RbacEntity.FOREIGN_MODEL_UI_ACTION
    //   }),
    //   defaultRbacData({
    //     role_id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
    //     ui_action: defaultUiActionData({name: 'Resources.import'}),
    //     control_function: 'Deny',
    //     foreign_model: RbacEntity.FOREIGN_MODEL_UI_ACTION
    //   }),
    //   defaultRbacData({
    //     role_id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
    //     ui_action: defaultUiActionData({name: 'Secrets.preview'}),
    //     control_function: 'Deny',
    //     foreign_model: RbacEntity.FOREIGN_MODEL_UI_ACTION
    //   }),
    //   defaultRbacData({
    //     role_id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
    //     ui_action: defaultUiActionData({name: 'Users.viewWorkspace'}),
    //     control_function: 'Deny',
    //     foreign_model: RbacEntity.FOREIGN_MODEL_UI_ACTION
    //   }),
    // ];
    const options = contains ? this.formatContainOptions(contains, RbacMeService.getSupportedContainOptions()) : null;
    const response = await this.apiClient.findAll(options);

    return response.body;
  }
}

export default RbacMeService;
