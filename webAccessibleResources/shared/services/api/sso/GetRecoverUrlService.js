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
 * @since         3.11.0
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";

const SSO_RECOVER_START_CASES = {
  DEFAULT: "default"
};

/**
 * Handles query to the API to get a recover URL
 */
class GetRecoverUrlService {
  /**
   * GetRecoverUrlService constructor
   * @param {string} siteDomain
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(siteDomain, apiClientOptions) {
    apiClientOptions.setResourceName("/sso/recover/start");
    this.apiClient = new ApiClient(apiClientOptions);
    this.expectedUrl = new URL(siteDomain);
  }

  /**
   * Request the API to get a recover URL consuming the given token.
   * @param {string} ssoToken the token found after a sucessful SSO login
   * @returns {Promise<URL>}
   */
  async getRecoverUrl(ssoToken) {
    const dto = {
      token: ssoToken,
      case: SSO_RECOVER_START_CASES.DEFAULT
    };
    const response = await this.apiClient.create(dto);
    const url = new URL(response.body.url);

    if (url.origin !== this.expectedUrl.origin) {
      throw new Error('The url should be from the same origin.');
    }

    return url;
  }
}

export default GetRecoverUrlService;

