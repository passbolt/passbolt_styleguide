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
 * @since         2.11.0
 */

import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {defaultResourceWorkspaceContext,} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultContextualMenuContext} from "../../../contexts/ContextualMenuContext.test.data";
import {
  defaultResourceDto, resourceStandaloneTotpDto,
  resourceWithFavoriteDto, resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import ColumnsResourceSettingCollection
  from "../../../../shared/models/entity/resource/columnsResourceSettingCollection";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";

/**
 * Default props as when initializing the list with no content.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    contextualMenuContext: defaultContextualMenuContext(),
    ...data
  };
}

/**
 * Get a list of resources.
 * @returns {array}
 */
const getResources = () => [
  resourceWithFavoriteDto({name: 'apache'}),
  defaultResourceDto({name: 'bower'}),
  defaultResourceDto({name: 'test'}),
  resourceWithTotpDto({name: 'totp'}),
  resourceStandaloneTotpDto({name: 'standalone totp'}),
];

/**
 * Props with populated filtered resources.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithFilteredResources(data = {}) {
  const resources = getResources();
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filteredResources: resources,
    }),
    ...data
  });
}

/**
 * Props with populated filtered resources and denied UI action.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithFilteredResourcesAndDenyUiAction(data = {}) {
  return propsWithFilteredResources({
    rbacContext: denyRbacContext(),
    ...data
  });
}

/**
 * Props with populated filtered resources.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithFilteredResourcesAndColumnsHidden(data = {}) {
  const resources = getResources();
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filteredResources: resources,
      columnsResourceSetting: new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "attentionRequired", label: "Attention", position: 2, show: true},
        {id: "name", label: "Name", position: 3, show: true},
        {id: "expires", label: "Expires", position: 4, show: true},
        {id: "username", label: "Username", position: 5, show: false},
        {id: "password", label: "Password", position: 6, show: true},
        {id: "totp", label: "TOTP", position: 7, show: false},
        {id: "uri", label: "URI", position: 8, show: true},
        {id: "modified", label: "Modified", position: 9, show: false}]),
    }),
    ...data
  });
}

/**
 * Props with populated filtered resources and all selected
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithAllResourcesSelected(data = {}) {
  const resources = getResources();
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filteredResources: resources,
      selectedResources: resources,
      filter: {
        type: ResourceWorkspaceFilterTypes.ALL
      },
    }),
    ...data
  });
}

/**
 * Props with no filtered resources for a given filter type.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithNoResourcesForFilter(type, data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filter: {
        type: type
      }
    }),
    ...data
  });
}
