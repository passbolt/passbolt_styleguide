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

const USER_DIRECTORY_RESOURCE_NAME = "users";

/**
 * Model related to the user service
 */
class UserService {
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
   * Whenever the users is requested.
   * @return {Promise<object>}
   */
  async findAll() {
    const apiClient = new ApiClient(this.apiClientOptions);
    return apiClient.findAll();
  }
}

export default UserService;

