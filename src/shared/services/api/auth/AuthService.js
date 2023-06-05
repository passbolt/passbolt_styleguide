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

import PassboltApiFetchError from "../../../lib/Error/PassboltApiFetchError";
import PassboltBadResponseError from "../../../lib/Error/PassboltBadResponseError";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
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
   * Logout
   * @returns {Promise<void>}
   */
  async logout() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("POST", url, null, {redirect: "manual"});
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      return this._logoutLegacy();
    }
  }

  /**
   * Logout (the legacy way that uses the deprecated 'GET' method).
   * @return {Promise<void>}
   * @deprecated the POST method should be used instead to avoid CSRF
   * @private
   */
  async _logoutLegacy() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/logout`, {});
    const response = await this.apiClient.sendRequest("GET", url, null, {redirect: "manual"});
    const isResponseOk = response.ok || response.status === 0; // status is 0 as there should be a redirection that is handled manually
    if (!isResponseOk) {
      throw new PassboltApiFetchError('An unexpected error happened during the legacy logout process', {
        code: response.status
      });
    }
  }

  /**
   * Retrieve the server key
   * @returns {Promise<{armored_key: string, fingerprint: string}>}
   */
  async getServerKey() {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/verify`, {});
    const response = await this.apiClient.fetchAndHandleResponse('GET', url);
    return this.mapGetServerKey(response.body);
  }

  /**
   * Map the get server key result of the API.
   * @param data
   * @returns {{armored_key: string, fingerprint: string}}
   */
  mapGetServerKey(data) {
    const {keydata, fingerprint} = data;
    return {
      armored_key: keydata,
      fingerprint: fingerprint
    };
  }

  /**
   * Verify
   * @returns {Promise<void>}
   */
  async verify(fingerprint, serverVerifyToken) {
    const url = this.apiClient.buildUrl(`${this.apiClient.baseUrl}/verify`, {});

    const body = new FormData();
    body.append('data[gpg_auth][keyid]', fingerprint);
    body.append('data[gpg_auth][server_verify_token]', serverVerifyToken);

    const fetchOptions = this.apiClient.buildFetchOptions();
    fetchOptions.method = 'POST';
    fetchOptions.body = body;
    // It is required to let this property unset in order to let the browser determine it by itself and set the additional variable boundary required by the API to parse the payload.
    delete fetchOptions.headers['content-type'];

    let response, responseJson;
    try {
      response = await fetch(url.toString(), fetchOptions);
    } catch (error) {
      // Catch Network error such as connection lost.
      throw new PassboltServiceUnavailableError(error.message);
    }

    try {
      responseJson = await response.json();
    } catch (error) {
      /*
       * If the response cannot be parsed, it's not a Passbolt API response.
       * It can be a for example a proxy timeout error (504).
       */
      throw new PassboltBadResponseError();
    }

    if (!response.ok) {
      const message = responseJson.header.message;
      throw new PassboltApiFetchError(message, {
        code: response.status,
        body: responseJson.body
      });
    }

    return response;
  }
}

export default AuthService;
