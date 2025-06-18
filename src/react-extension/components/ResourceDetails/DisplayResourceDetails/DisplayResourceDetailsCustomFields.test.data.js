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
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(props) {
  return {
    ...props,
    context: defaultAppContext(props.context),
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
    customFields: [{
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadataKey: "API Key"
    },
    {
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadataKey: "Environment"
    },
    {
      id: uuidv4(),
      type: CUSTOM_FIELD_TYPE.PASSWORD,
      metadataKey: "Database URL"
    }]
  },
  permission: updatePermissionDto()
});
