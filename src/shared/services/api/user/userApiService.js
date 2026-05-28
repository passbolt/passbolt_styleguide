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

const USER_SERVICE_RESOURCE_NAME = "users";

class UserApiService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, UserApiService.RESOURCE_NAME);
  }

  /**
   * API User Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return USER_SERVICE_RESOURCE_NAME;
  }

  /**
   * Return the list of supported options for the contains option in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedContainOptions() {
    return [
      "LastLoggedIn", // @deprecated v2.13 should use last_logged_in
      "is_mfa_enabled",
      // since v3
      "last_logged_in", // only use when v2.13 support is dropped
      "gpgkey",
      "groups_users",
      "profile",
      "role",
      "account_recovery_user_setting",
      "pending_account_recovery_request",
      "missing_metadata_key_ids",
    ];
  }

  /**
   * Return the list of supported filters for in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedFiltersOptions() {
    return ["search", "has-groups", "has-access", "is-admin", "is-active", "has-role-id"];
  }

  /**
   * Return the list of supported orders for in API find operations
   *
   * @returns {Array<string>} list of supported option
   */
  static getSupportedOrdersOptions() {
    return [
      "Profile.first_name DESC",
      "Profile.first_name ASC",
      "Profile.last_name DESC",
      "Profile.last_name ASC",
      "Profile.created DESC",
      "Profile.created ASC",
      "Profile.modified DESC",
      "Profile.modified ASC",
    ];
  }

  /**
   * Get a user for a given id
   *
   * @param {string} id user uuid
   * @param {Object} [contains] optional example: {permissions: true}
   * @throws {Error} if API call fails, service unreachable, etc.
   * @throws {TypeError} if user id is not a valid uuid
   * @returns {Object} userDto
   */
  async get(id, contains) {
    this.assertValidId(id);
    contains = contains ? this.formatContainOptions(contains, UserApiService.getSupportedContainOptions()) : null;
    const options = { ...contains };
    const response = await this.apiClient.get(id, options);
    return response.body;
  }

  /**
   * Find all users
   *
   * @param {Object} [contains] optional example: {profile: true}
   * @param {Object} [filters] optional
   * @param {Object} [orders] optional
   * @return {Promise<PassboltResponseEntity>}
   * @throws {Error} if options are invalid or API error
   * @public
   */
  async findAll(contains, filters, orders) {
    // @deprecated dirty fix to support old versions of contain: to remove when support for v2.14 is dropped
    const legacyContain = UserApiService.remapToLegacyContain(contains);
    contains = contains ? this.formatContainOptions(legacyContain, UserApiService.getSupportedContainOptions()) : null;
    filters = filters ? this.formatFilterOptions(filters, UserApiService.getSupportedFiltersOptions()) : null;
    orders = orders ? this.formatOrderOptions(orders, UserApiService.getSupportedOrdersOptions()) : null;
    const options = { ...contains, ...filters, ...orders };
    const response = await this.apiClient.findAll(options);
    return new PassboltResponseEntity(response);
  }

  /**
   * Find users by role id
   * @param {string} roleId The role id
   * @return {Promise<PassboltResponseEntity>}
   */
  async findByRoleId(roleId) {
    this.assertValidId(roleId);
    return this.findAll({}, { "has-role-id": roleId });
  }

  /**
   * Helper to remap to legacy contain options to improve backward compatibility
   * @deprecated remove when support for v2.14 is dropped
   *
   * @param {Object} contains
   * ex. {last_logged_in: true}
   * @returns {Object} updated contains
   * ex. {LastLoggedIn: true}
   * @public
   */
  static remapToLegacyContain(contains) {
    if (!contains) {
      return undefined;
    }
    if (Object.prototype.hasOwnProperty.call(contains, "last_logged_in")) {
      contains.LastLoggedIn = contains.last_logged_in;
      delete contains.last_logged_in;
    }
    return contains;
  }

  /**
   * Create a user using Passbolt API
   *
   * @param {Object} data
   * @returns {Promise<*>} Response body
   * @public
   */
  async create(data) {
    this.assertNonEmptyData(data);
    const response = await this.apiClient.create(data);
    return response.body;
  }

  /**
   * Update a user using Passbolt API
   *
   * @param {String} userId uuid
   * @param {Object} userData
   * @returns {Promise<*>} Response body
   * @throw {TypeError} if user id is not a valid uuid
   * @public
   */
  async update(userId, userData) {
    this.assertValidId(userId);
    this.assertNonEmptyData(userData);
    const response = await this.apiClient.update(userId, userData);
    return response.body;
  }

  /**
   * Update a user avatar using Passbolt API
   *
   * @param {String} userId uuid
   * @param {Blob} file the file to upload
   * @param {string} filename the filename
   * @returns {Promise<*>} Response body
   * @throw {TypeError} if user id is not a valid uuid
   * @public
   */
  async updateAvatar(userId, file, filename) {
    this.assertValidId(userId);
    this.assertNonEmptyData(file);
    this.assertNonEmptyData(filename);
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/${userId}`);
    const body = new FormData();
    body.append("profile[avatar][file]", file, filename);
    const fetchOptions = await this.apiClient.buildFetchOptions();
    // It is required to let this property unset in order to let the browser determine it by itself and set the additional variable boundary required by the API to parse the payload.
    delete fetchOptions.headers["content-type"];
    const response = await this.apiClient.fetchAndHandleResponse("POST", url, body, fetchOptions);
    return response.body;
  }

  /**
   * Delete a user using Passbolt API
   *
   * @param {string} userId uuid
   * @param {object} transfer for example instructions for permissions transfer
   * @param {boolean} [dryRun] optional (default false)
   * @returns {Promise<*>} Response body
   * @throw {TypeError} if user id is not a valid uuid
   * @throw {ApiFetchError} if user cannot be deleted
   * @public
   */
  async delete(userId, transfer, dryRun) {
    this.assertValidId(userId);
    const data = transfer ? { transfer: transfer } : {};
    const response = await this.apiClient.delete(userId, data, {}, dryRun);
    return response.body;
  }

  /**
   * Resend invite
   *
   * @param {string} username The user username
   * @returns {Promise<*>} Response body
   * @throw {ApiFetchError} if the invite cannot be resent
   * @public
   */
  async resendInvite(username) {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/recover`);
    const data = { username: username };
    const bodyString = this.apiClient.buildBody(data);
    return this.apiClient.fetchAndHandleResponse("POST", url, bodyString);
  }

  /**
   * Keep the session alive
   * @returns {Promise<bool>}
   */
  async keepSessionAlive() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/me`, {});
    await this.apiClient.fetchAndHandleResponse("GET", url);
    return true;
  }

  /**
   * Request help credentials lost.
   * @param {object} requestHelpDto The request help data.
   * @returns {Promise<*>} response body
   * @throws {Error} if options are invalid or API error
   */
  async requestHelpCredentialsLost(requestHelpDto) {
    const bodyString = this.apiClient.buildBody(requestHelpDto);
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/recover`, {});
    const response = await this.apiClient.fetchAndHandleResponse("POST", url, bodyString);
    return response.body;
  }
}

export default UserApiService;
