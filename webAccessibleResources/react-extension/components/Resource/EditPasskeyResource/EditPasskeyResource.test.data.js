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
 * @since         5.18.0
 */

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import { resourcePasskeyDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * Default props with a passkey resource.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext({
      getHierarchyFolderCache: () => [],
    }),
    resource: resourcePasskeyDto(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    ...data,
  };
}
