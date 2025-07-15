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
import {
  defaultResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_TOTP
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultClipboardContext} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";

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
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    clipboardContext: defaultClipboardContext(),
    ...data
  };
}

/**
 * Get a list of resources.
 * @returns {array}
 */
const getResources = () => [
  resourceWithFavoriteDto({metadata: defaultResourceMetadataDto({name: 'apache'})}),
  defaultResourceDto({metadata: defaultResourceMetadataDto({name: 'bower'})}),
  defaultResourceDto({metadata: defaultResourceMetadataDto({name: 'test'})}),
  resourceWithTotpDto({metadata: defaultResourceMetadataDto({name: 'totp', resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP})}),
  resourceStandaloneTotpDto({metadata: defaultResourceMetadataDto({name: 'standalone totp', resource_type_id: TEST_RESOURCE_TYPE_TOTP})}),
  defaultResourceDto({metadata: defaultResourceMetadataDto({name: 'will-expire'}), expired: "3023-12-25T00:00:00.000Z"}),
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
    context: defaultUserAppContext({
      getHierarchyFolderCache: () => [{
        "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "name": "Accounting",
        "folder_parent_id": null,
        "personal": false
      }, {
        "id": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        "name": "Bank",
        "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "personal": false
      }],
    }),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filteredResources: resources,
      columnsResourceSetting: new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "icon", label: "Icon", position: 2, show: true},
        {id: "name", label: "Name", position: 3, show: true},
        {id: "expires", label: "Expires", position: 4, show: true},
        {id: "username", label: "Username", position: 5, show: false},
        {id: "password", label: "Password", position: 6, show: true},
        {id: "totp", label: "TOTP", position: 7, show: false},
        {id: "uri", label: "URI", position: 8, show: true},
        {id: "modified", label: "Modified", position: 9, show: false},
        {id: "location", label: "Location", position: 10, show: true}]),
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
