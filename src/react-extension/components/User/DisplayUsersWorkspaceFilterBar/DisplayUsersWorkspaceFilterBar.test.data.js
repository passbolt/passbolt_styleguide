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
 * @since         5.0.0
 */
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";
import {defaultUserWorkspaceContext} from "../../../contexts/UserWorkspaceContext.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    history: {
      push: jest.fn(),
    },
    ...data
  };
}

/**
 * Props filter by shared.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterBySuspended(data = {}) {
  return defaultProps({
    userWorkspaceContext: defaultUserWorkspaceContext({filter: {type: UserWorkspaceFilterTypes.SUSPENDED_USER}}),
    ...data
  });
}
