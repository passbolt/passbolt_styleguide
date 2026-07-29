/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        5.13.0
 */

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { createMemoryHistory } from "history";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";

/**
 * Default props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    history: createMemoryHistory({ initialEntries: ["/"], initialIndex: 0 }),
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto()),
    ...data,
  };
}

/**
 * Props with the user not authenticated.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function unauthenticatedProps(data = {}) {
  return defaultProps({
    context: defaultAppContext(),
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_authenticated: false })),
    ...data,
  });
}
