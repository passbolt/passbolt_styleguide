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

/**
 * Returns the default navigation context for the unit test
 * @param context An existing navigation context
 * @returns {object}
 */
export function defaultNavigationContext(context = {}) {
  const defaultContext = {
    onGoToNewTab: jest.fn(),
    onGoToPasswordsRequested: jest.fn()
  };
  return Object.assign(defaultContext, context);
}
