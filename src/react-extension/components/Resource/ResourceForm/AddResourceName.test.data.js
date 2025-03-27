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
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {resourceTypesCollectionDto} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    onChange: jest.fn(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    resource: defaultResourceFormDto(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto())
  };
  return Object.assign(defaultData, data);
}
