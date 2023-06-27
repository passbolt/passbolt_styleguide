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
 * @since         4.1.0
 */

import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import {rolesCollectionData} from "../../../../shared/models/entity/role/rolesCollection.test.data";
import {settingsRbacsCollectionData} from "../../../../shared/models/entity/rbac/rbacsCollection.test.data";

/**
 * Returns the default administration rbac context for the unit test
 * @param context An existing administration context
 * @returns {object}
 */
export function defaultAdministrationRbacContext(context = {}) {
  return {
    rbacs: null,
    roles: null,
    rbacsUpdated: new RbacsCollection([]),
    setRbacs: jest.fn(),
    setRbacsUpdated: jest.fn(),
    updateRbacControlFunction: jest.fn(),
    clearContext: jest.fn(),
    ...context
  };
}

/**
 * Returns a populated version of administration rbac context for the unit test
 * @param context An existing administration context
 * @returns {object}
 */
export function populatedAdministrationRbacContext(context = {}) {
  return defaultAdministrationRbacContext({
    rbacs: new RbacsCollection(settingsRbacsCollectionData()),
    roles: new RolesCollection(rolesCollectionData),
    ...context
  });
}

/**
 * Returns a populated version of administration rbac context with updated rbacs settings for the unit test
 * @param context An existing administration context
 * @returns {object}
 */
export function administrationRbacContextWithUpdatedRbac(context = {}) {
  const rbacs = new RbacsCollection(settingsRbacsCollectionData());
  const rbacsUpdated = new RbacsCollection([rbacs.items[3], rbacs.items[7]]);
  return populatedAdministrationRbacContext({
    rbacs,
    rbacsUpdated,
    ...context
  });
}
