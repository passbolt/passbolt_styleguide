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
 */

export class ApiClientOptions {
  /**
   * Set base url
   *
   * @param {string|URL} baseUrl
   * @throws {TypeError} if baseUrl is empty, or not a string or valid URL
   * @returns {ApiClientOptions}
   * @public
   */
  setBaseUrl(baseUrl) {
    if (!baseUrl) {
      throw new TypeError('ApiClientOption baseUrl is required.');
    }
    if (typeof baseUrl === 'string') {
      try {
        this.baseUrl = new URL(baseUrl);
      } catch (error) {
        throw new TypeError('ApiClientOption baseUrl is invalid.', {cause: error});
      }
    } else {
      if (baseUrl instanceof URL) {
        this.baseUrl = baseUrl;
      } else {
        throw new TypeError('ApiClientOptions baseurl should be a string or URL');
      }
    }
    return this;
  }

  /**
   * Set the resource name
   *
   * @throws {TypeError} if resourceName is empty, or not a string
   * @param {string} resourceName name
   * @returns {ApiClientOptions}
   * @public
   */
  setResourceName(resourceName) {
    if (!resourceName) {
      throw new TypeError('ApiClientOptions.setResourceName resourceName is required.');
    }
    if (typeof resourceName !== 'string') {
      throw new TypeError('ApiClientOptions.setResourceName resourceName should be a valid string.');
    }
    this.resourceName = resourceName;
    return this;
  }

  /**
   * @returns {URL} baseUrl
   * @public
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * @returns {string} resourceName
   * @public
   */
  getResourceName() {
    return this.resourceName;
  }

  /**
   * Returns the relevant client options as fetch options headers
   *
   * @returns {Promise<Object|null>}
   */
  async getHeaders() {
    const csrfToken = await this.getCsrfToken();
    if (csrfToken) {
      return {
        "X-CSRF-Token": csrfToken
      };
    }
  }

  /**
   * Returns the current csrf-token
   * @returns {Promise<string|null>}
   * @private
   */
  async getCsrfToken() {
    //if this is called from an API-served page
    if (typeof browser === "undefined" || typeof browser.cookies === "undefined") {
      const csrfToken = document?.cookie
        ?.split('; ')
        ?.find(row => row.startsWith('csrfToken'))
        ?.split('=');

      if (csrfToken && csrfToken.length === 2) {
        return csrfToken[1];
      }
      return null;
    }

    // else this is called from the browser extension
    const stringUrl = this.baseUrl.toString();
    const url = stringUrl.slice(-1) === "/" ? stringUrl : `${stringUrl}/`;
    const csrfCookie = await browser.cookies.get({name: "csrfToken", url: url});
    return csrfCookie?.value || null;
  }
}
