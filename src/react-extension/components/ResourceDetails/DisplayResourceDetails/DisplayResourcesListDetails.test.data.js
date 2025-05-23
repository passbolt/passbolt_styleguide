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
import {resourceTypesCollectionDto} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {resourceWorkspaceContextWithSelectedResourcesAndVariousPermission} from "../../../contexts/ResourceWorkspaceContext.test.data";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const resourceWorkspaceContext = resourceWorkspaceContextWithSelectedResourcesAndVariousPermission();
  return {
    ...data,
    context: defaultUserAppContext(data.context),
    resourceWorkspaceContext: resourceWorkspaceContext,
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  };
}
