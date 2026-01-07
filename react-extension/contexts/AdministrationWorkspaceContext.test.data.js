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
 * @since         3.0.0
 */

/**
 * Default props
 */
export function defaultProps(data = {}) {
  return {
    rbacContext: {
      canIUseAction: () => true,
    },
    ...data,
  };
}

/**
 * Returns the default administration context for the unit test
 * @param context An existing administration context
 * @returns {object}
 */
export function defaultAdministrationWorkspaceContext(context = {}) {
  const defaultContext = {
    must: {
      editSubscriptionKey: false,
      refreshSubscriptionKey: false,
    },
    onResetActionsSettings: jest.fn(),
    setDisplayAdministrationWorkspaceAction: jest.fn(),
    resetDisplayAdministrationWorkspaceAction: jest.fn(),
  };
  return Object.assign(defaultContext, context);
}
