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

import { ApiClient } from "../../../lib/apiClient/apiClient";
import AzureSsoSettingsEntity from "../../../models/entity/ssoSettings/AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "../../../models/entity/ssoSettings/GoogleSsoSettingsEntity";

const SSO_LOGIN_SUPPORTED_URLS = {
  [AzureSsoSettingsEntity.PROVIDER_ID]: AzureSsoSettingsEntity.SUPPORTED_URLS,
  [GoogleSsoSettingsEntity.PROVIDER_ID]: GoogleSsoSettingsEntity.SUPPORTED_URLS,
};

/**
 * Handles query to the API to get an SSO login URL to identify the current user
 */
class GetUrlForSsoIdentificationService {
  /**
   * GetUrlForSsoIdentificationService constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
  }

  /**
   * Requests the API to get an URL to start a recover process via SSO.
   * @param {string} providerId the id of the SSO provider
   * @returns {Promise<URL>}
   */
  async getUrl(providerId) {
    this.apiClientOptions.setResourceName(`/sso/recover/${providerId}`);
    const apiClient = new ApiClient(this.apiClientOptions);

    const response = await apiClient.create();
    const url = new URL(response.body.url);

    const supportedUrl = SSO_LOGIN_SUPPORTED_URLS[providerId];

    if (!supportedUrl) {
      throw new Error("The url should be part of the list of supported single sign-on urls.");
    }

    const isValidUrl = supportedUrl.some((supportedUrl) => supportedUrl === url.origin);
    if (!isValidUrl) {
      throw new Error("The url should be part of the list of supported single sign-on urls.");
    }

    return url;
  }
}

export default GetUrlForSsoIdentificationService;
