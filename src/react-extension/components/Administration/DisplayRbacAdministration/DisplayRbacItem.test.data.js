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
 * @since         4.5.0
 */

import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import { settingsRbacsCollectionData } from "../../../../shared/models/entity/rbac/rbacsCollection.test.data";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import { rolesCollectionDto } from "../../../../shared/models/entity/role/rolesCollection.test.data";
import { uiActions } from "../../../../shared/services/rbacs/uiActionEnumeration";

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */

export function defaultProps(props = {}) {
  return {
    label: "ui action test",
    level: 1,
    roles: new RolesCollection(rolesCollectionDto),
    actionName: uiActions.DESKTOP_TRANSFER,
    onChange: jest.fn(),
    rbacs: new RbacsCollection(settingsRbacsCollectionData()),
    rbacsUpdated: new RbacsCollection(settingsRbacsCollectionData()),
    ...props,
  };
}
