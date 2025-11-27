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

import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";
import AbstractService from "../abstract/abstractService";

const RBAC_SERVICE_RESOURCE_NAME = '/rbacs';

export default class RbacApiService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, RbacApiService.RESOURCE_NAME);
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
   * Find all
   * @param {object} contains
   * @returns {Promise<PassboltResponseEntity>}
   */
  async findAll(contains) {
    const options = contains ? this.formatContainOptions(contains, RbacApiService.getSupportedContainOptions()) : null;
    const response = await this.apiClient.findAll(options);
    return new PassboltResponseEntity(response);
  }

  /**
   * Find all Rbacs for the current logged in user.
   * @param {object} contains
   * @returns {Promise<PassboltResponseEntity>}
   */
  async findMe(contains) {
    const options = contains ? this.formatContainOptions(contains, RbacApiService.getSupportedContainOptions()) : null;
    const response = await this.apiClient.get("me", options);
    return new PassboltResponseEntity(response);
  }

  /**
   * Update all the given rbacs.
   * @param {array} rbacsUpdatedDto A list of update rbacs dto.
   * @param {object} contains
   * @returns {Promise<PassboltResponseEntity>}
   */
  async updateAll(rbacsUpdatedDto, contains = {}) {
    const options = contains ? this.formatContainOptions(contains, RbacApiService.getSupportedContainOptions()) : null;
    const response = await this.apiClient.updateAll(rbacsUpdatedDto, options);
    return new PassboltResponseEntity(response);
  }
}
