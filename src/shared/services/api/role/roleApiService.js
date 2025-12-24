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
import { isValidUuid } from "../../../utils/assertions";
import assertString from "validator/es/lib/util/assertString";

const ROLES_API_SERVICE_RESOURCE_NAME = "roles";

export default class RoleApiService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, RoleApiService.RESOURCE_NAME);
  }

  /**
   * API Resource Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return ROLES_API_SERVICE_RESOURCE_NAME;
  }

  /**
   * Find all roles
   *
   * @returns {Promise<PassboltResponseEntity>} response body
   * @throws {Error} if options are invalid or API error
   * @public
   */
  async findAll() {
    const response = await this.apiClient.findAll();
    const body = response.body && response.body.length ? response.body : [];

    return new PassboltResponseEntity({ header: response.header, body: body });
  }

  /**
   * Create a role using Passbolt API
   *
   * @param {Object} roleDto
   * @returns {Promise<PassboltResponseEntity>}
   * @throw {TypeError} if comment dto is invalid or incomplete
   */
  async create(roleDto) {
    if (!roleDto || !roleDto.name) {
      throw new TypeError("Role creation failed, invalid role data.");
    }

    assertString(roleDto.name);
    const response = await this.apiClient.create(roleDto);

    return new PassboltResponseEntity(response);
  }

  /**
   * Update a role using Passbolt API
   *
   * @param {string} id The role id
   * @param {Object} roleDto The role data containing only the name
   * @returns {Promise<PassboltResponseEntity>}
   * @throw {TypeError} if role id or dto is invalid or incomplete
   */
  async update(id, roleDto) {
    if (!id) {
      throw new TypeError("Role update failed, role id is required.");
    }
    if (!roleDto || !roleDto.name) {
      throw new TypeError("Role update failed, invalid role data.");
    }

    isValidUuid(id);
    assertString(roleDto.name);
    const response = await this.apiClient.update(id, roleDto);

    return new PassboltResponseEntity(response);
  }

  /**
   * Delete a role using Passbolt API
   *
   * @param {string} roleId uuid
   * @returns {Promise<PassboltResponseEntity>} Response body
   * @throws {TypeError} if roleId is not a valid uuid
   */
  async delete(roleId) {
    isValidUuid(roleId);

    const response = await this.apiClient.delete(roleId);
    return new PassboltResponseEntity(response);
  }
}
