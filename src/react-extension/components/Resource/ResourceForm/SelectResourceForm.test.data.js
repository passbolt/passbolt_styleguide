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

import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {resourceTypeV5DefaultDto} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    resourceFormSelected: ResourceEditCreateFormEnumerationTypes.PASSWORD,
    resource: defaultResourceFormDto({secret: {password: ""}}),
    resourceType: new ResourceTypeEntity(resourceTypeV5DefaultDto()),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    onSelectForm: jest.fn(),
    onAddSecret: jest.fn(),
    onDeleteSecret: jest.fn(),
    canUpgradeResource: true,
  };
  return Object.assign(defaultData, data);
}
