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
export class CsrfToken {
  /**
   * CsrfToken constructor
   * @param {string} token
   */
  constructor(token) {
    this.setToken(token);
  }

  /**
   * Validate
   *
   * @param token
   * @throws {TypeError} if token is not a string or is undefined
   * @public
   */
  setToken(token) {
    this.validate(token);
    this.token = token;
  }

  /**
   * Validate
   *
   * @param token
   * @throws {TypeError} if token is not a string or is undefined
   * @public
   */
  validate(token) {
    if (!token) {
      throw new TypeError('CSRF token cannot be empty.');
    }
    if (typeof token !== 'string') {
      throw new TypeError('CSRF token should be a string.');
    }
  }

  /**
   * Returns the token as key value header
   *
   * @returns {{"X-CSRF-Token": string}}
   */
  toFetchHeaders() {
    return {'X-CSRF-Token': this.token};
  }

  /**
   * Get the current csrf token from cookie
   * @returns {string}
   */
  static getToken() {
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
