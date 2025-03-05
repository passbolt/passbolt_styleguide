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
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {resourceTypesCollectionDto} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {minimalResourceMetadataDto} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(data = {}) {
  const resourceTypeDtos = resourceTypesCollectionDto();
  const resourceTypesCollection = new ResourceTypesCollection(resourceTypeDtos);
  const resourceFormEntity = new ResourceFormEntity(defaultResourceFormDto(
    {
      metadata: minimalResourceMetadataDto()
    }
  ), {resourceTypes: resourceTypesCollection});
  const defaultData = {
    context: defaultAppContext(),
    onChange: jest.fn(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    resource: resourceFormEntity.toDto()
  };
  return Object.assign(defaultData, data);
}
