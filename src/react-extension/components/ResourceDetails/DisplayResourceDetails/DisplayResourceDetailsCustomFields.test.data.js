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
 * @since         5.3.0
 */

import {CUSTOM_FIELD_TYPE} from "../../../../shared/models/entity/customField/customFieldEntity";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {v4 as uuidv4} from "uuid";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {resourceTypesCollectionDto} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {updatePermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {defaultAppContext, defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultUserRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(props) {
  return {
    ...props,
    context: defaultAppContext(props.context),
    rbacContext: defaultUserRbacContext(props.rbacContext),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(props.resourceWorkspaceContext),
  };
}

/**
 * Mocked a resource
 */
export const resourceWithCustomFields = defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
    name: "Passbolt",
    description: "Apache is the world's most used web server software.",
    uris: ["http://www.apache.org/"],
    custom_fields: [{
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadata_key: "API Key",
    },
    {
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadata_key: "Environment"
    },
    {
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadata_key: "Database URL"
    }]
  },
  permission: updatePermissionDto()

});

/**
 * Generates props with RBAC context set to deny UI action.
 * @param {Object} data
 * @param {Object} data.resource - The resource object.
 * @returns {Object}
 */
export function propsWithDenyUiAction(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    resourceWorkspaceContext: {details: {resource: data.resource}}});
}

/**
 * Generates default props for the DisplayResourceDetails component.
 *
 * @param {Object} data
 * @param {Object} data.resource - The resource object.
 * @returns {Object}
 */
export function propsWithApiFlagDisabled(data = {}) {
  return defaultProps({
    context: defaultUserAppContext({
      siteSettings: {
        getServerTimezone: () => '',
        canIUse: () => false,
      }
    }),
    resourceWorkspaceContext: {details: {resource: data.resource}}});
}
