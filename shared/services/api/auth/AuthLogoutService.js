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
 * @since         4.7.0
 */

import PassboltApiFetchError from "../../../lib/Error/PassboltApiFetchError";
import { ApiClient } from "../../../lib/apiClient/apiClient";

const AUTH_LOGOUT_RESOURCE_NAME = "auth";

/**
 * Service related to logging out the current user
 */
class AuthLogoutService {
  /**
   * Constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    apiClientOptions.setResourceName(AUTH_LOGOUT_RESOURCE_NAME);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Logout the current user using a POST HTTP method.
   * If an error occurs, it attemps to logout the user using a GET HTTP method.
   * @returns {Promise<void>}
   */
  async logout() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("POST", url, null, { redirect: "manual" });
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      return this._logoutLegacy();
    }
  }

  /**
   * Logout (the legacy way that uses the deprecated 'GET' method).
   * @return {Promise<void>}
   * @deprecated the POST method should be used instead to avoid CSRF
   * @throws {PassboltApiFetchError} if the server sends and unexpected HTTP response
   * @private
   */
  async _logoutLegacy() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("GET", url, null, { redirect: "manual" });
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      throw new PassboltApiFetchError("An unexpected error happened during the legacy logout process", {
        code: response.status,
      });
    }
  }
}

export default AuthLogoutService;
