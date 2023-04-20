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
 * @since         4.1.0
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";

const AUTH_RESOURCE_NAME = "auth";

/**
 * Model related to the user directory service settings
 */
class AuthService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
    apiClientOptions.setResourceName(AUTH_RESOURCE_NAME);
    this.apiClient = new ApiClient(this.apiClientOptions);
  }

  /**
   * Logout the user
   *
   * @return {Promise<void>}
   */
  async logout() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("POST", url, null, {redirect: "manual"});
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      if (response.status !== 404) {
        throw new Error('An unexpected error happened during the logout process', {
          code: response.status
        });
      }

      //@todo: remove depreacted function call
      return this._logoutLegacy();
    }
  }

  /**
   * Logout the user (the legacy way using GET method)
   * @private
   * @deprecated
   * @return {Promise<void>}
   */
  async _logoutLegacy() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("GET", url, null, {redirect: "manual"});
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      throw new Error('An unexpected error happened during the legacy logout process', {
        code: response.status
      });
    }
  }
}

export default AuthService;
