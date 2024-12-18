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
import {
  defaultResourceWorkspaceContext
} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    history: {
      push: jest.fn(),
    },
    ...data
  };
}

/**
 * Props filter by favorite.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterByFavorite(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({filter: {type: ResourceWorkspaceFilterTypes.FAVORITE}}),
    ...data
  });
}

/**
 * Props filter by shared.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterByShared(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({filter: {type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME}}),
    ...data
  });
}

/**
 * Props filter by private.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterByPrivate(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({filter: {type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN}}),
    ...data
  });
}

/**
 * Props filter by shared.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterByExpired(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({filter: {type: ResourceWorkspaceFilterTypes.EXPIRED}}),
    ...data
  });
}
