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

import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  resourceTypeV5DefaultDto, resourceTypeV5TotpDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";


/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    folderParentId: null,
    context: defaultAppContext(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      getHierarchyFolderCache: () => [{name: "Folder", id: "1"}, {name: "subfolder", id: "2"}]
    }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    resourceType: new ResourceTypeEntity(resourceTypeV5DefaultDto()),
    onClose: jest.fn(),
  };

  return Object.assign(defaultData, data);
}

/**
 * Default totp props
 * @returns {*}
 */
export function defaultTotpProps(data = {}) {
  const defaultData = defaultProps({
    resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()),
  });

  return Object.assign(defaultData, data);
}
