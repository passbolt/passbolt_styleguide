/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";

const USER_DIRECTORY_RESOURCE_NAME = "directorysync";

/**
 * Model related to the user directory service settings
 */
class UserDirectoryService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
    apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}`);
  }

  /**
   * Find the user directory setting using Passbolt API
   *
   * @return {Promise<Array<SmtpSettingsDto>>|null>}
   */
  async findAll() {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}/settings`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return (await apiClient.findAll()).body;
  }

  /**
   * update the given user directory settings using Passbolt API
   * @param {UserDirectoryDto} UserDirectoryDto
   * @returns {Promise<UserDirectoryDto>}
   */
  async update(userDirectoryDto) {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return (await apiClient.update('settings', userDirectoryDto)).body;
  }

  /**
   * delete the given user directory settings using Passbolt API
   */
  async delete() {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return apiClient.delete("settings");
  }


  /**
   * Whenever the test users directory is requested.
   * @return {Promise<object>}
   */
  async test(usersDirectory) {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}/settings/test`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return apiClient.create(usersDirectory);
  }

  /**
   * Whenever the simulate synchronize users directory is requested.
   * @return {Promise<object>}
   */
  async simulate() {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return (await apiClient.get("synchronize/dry-run")).body;
  }

  /**
   * Whenever the simulate synchronize users directory is requested.
   * @return {Promise<object>}
   */
  async synchronize() {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}/synchronize`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return (await apiClient.create({})).body;
  }


  /**
   * Whenever the users is requested.
   * @return {Promise<object>}
   */
  async findUsers() {
    this.apiClientOptions.setResourceName(`${USER_DIRECTORY_RESOURCE_NAME}/users`);
    const apiClient = new ApiClient(this.apiClientOptions);
    return apiClient.findAll();
  }
}

export default UserDirectoryService;
