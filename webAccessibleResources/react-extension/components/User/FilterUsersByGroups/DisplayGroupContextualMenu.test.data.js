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
 * @since         5.16.0
 */

import MockPort from "../../../test/mock/MockPort";
import { defaultGroupDto } from "../../../../shared/models/entity/group/groupEntity.test.data";

/**
 * Default app context
 * @param {object} appContext An existing app context
 * @returns {object}
 */
export function defaultAppContext(appContext = {}) {
  return {
    port: new MockPort(),
    setContext: jest.fn(),
    ...appContext,
  };
}

/**
 * Default props
 * @param {object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    group: defaultGroupDto(),
    hide: jest.fn(),
    dialogContext: {
      open: jest.fn(),
    },
    userWorkspaceContext: {
      onGroupToEdit: jest.fn(),
    },
    ...props,
  };
}
