/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import {ApiClient} from "../../../lib/apiClient/apiClient";
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";

export default class ApiAppAccountRecoveryUserService {
  constructor() {
    this.baseUrl = this.getBaseUrl();
  }

  async getOrganizationAccountRecoverySettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("account-recovery/organization-policies");
    const apiClient = new ApiClient(apiClientOptions);
    const accountRecoverySettings = await apiClient.findAll();
    return accountRecoverySettings.body;
  }

  /**
   * Get the application base url
   * @return {string}
   */
  getBaseUrl() {
    const baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, '');
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.baseUrl)
      .setCsrfToken(this.getCsrfToken());
  }

  /**
   * Get csrf token
   * @returns {string}
   */
  getCsrfToken() {
    const cookieString = document.cookie;
    if (!cookieString) {
      return undefined;
    }
    const cookieArray = cookieString.split('; ');
    if (!cookieArray) {
      return undefined;
    }
    const csrfCookie = cookieArray.find(row => row.startsWith('csrfToken'));
    if (!csrfCookie) {
      return undefined;
    }
    const csrfToken = csrfCookie.split('=');
    if (csrfToken && csrfToken.length === 2) {
      return csrfToken[1];
    }

    return undefined;
  }
}
