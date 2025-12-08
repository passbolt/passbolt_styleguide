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
 * @since         3.8.0
 */
import AbstractService from "../abstract/abstractService";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";
import {isValidUuid} from "../../../utils/assertions";

const USER_DIRECTORY_RESOURCE_NAME = "users";

/**
 * Model related to the user service
 */
class UserService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, UserService.RESOURCE_NAME);
  }

  /**
   * Return the list of supported options for the contains option in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedContainOptions() {
    return [
      'is_mfa_enabled',
      'last_logged_in',
      'gpgkey',
      'groups_users',
      'profile',
      'role',
      'account_recovery_user_setting',
      'pending_account_recovery_request',
      'missing_metadata_key_ids'
    ];
  }

  /**
   * Return the list of supported filters for in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedFiltersOptions() {
    return [
      'search',
      'has-groups',
      'has-access',
      'is-admin',
      'is-active',
      'has-role-id'
    ];
  }

  /**
   * Whenever the users is requested.
   * @param {Object} [contains] Return entities associated models, example: {role: true}.
   * @param {Object} [filters] Return entities applied filters, example: {has-role-id: uuid}.
   * @return {Promise<PassboltResponseEntity>}
   */
  async findAll(contains = {}, filters = {}) {
    contains = contains ? this.formatContainOptions(contains, UserService.getSupportedContainOptions()) : null;
    filters = filters ? this.formatFilterOptions(filters, UserService.getSupportedFiltersOptions()) : null;
    const options = {...contains, ...filters};
    const response = await this.apiClient.findAll(options);
    return new PassboltResponseEntity(response);
  }

  /**
   * Find users by role id
   * @param {string} roleId The role id
   * @return {Promise<PassboltResponseEntity>}
   */
  async findByRoleId(roleId) {
    isValidUuid(roleId);
    return this.findAll({}, {"has-role-id": roleId});
  }

  /**
   * API User Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return USER_DIRECTORY_RESOURCE_NAME;
  }
}

export default UserService;

