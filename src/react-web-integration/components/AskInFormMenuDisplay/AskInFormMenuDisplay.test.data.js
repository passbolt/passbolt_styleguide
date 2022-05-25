/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Context with an unanthenticated user
 * @type {{port: {request: (function(): {isAuthenticated: boolean, isMfaRequired: boolean})}}}
 */
export const contextWithUnauthenticatedUser = {
  port: {
    on: jest.fn(),
    request: () => ({isAuthenticated: false, isMfaRequired: false})
  }
};

/**
 * Context with an authenticated user
 * @type {{port: {request: (function(): {isAuthenticated: boolean, isMfaRequired: boolean})}}}
 */
export const contextWithAuthenticatedUser = {
  port: {
    on: jest.fn(),
    request: () => ({isAuthenticated: true, isMfaRequired: false})
  }
};
