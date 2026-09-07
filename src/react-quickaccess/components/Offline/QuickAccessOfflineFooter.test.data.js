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
 * @since         6.0.0
 */

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { createMemoryHistory } from "history";
import UserActiveSessionEntity, {
  USER_ACTIVE_SESSION_OFFLINE,
  USER_ACTIVE_SESSION_ONLINE,
} from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";

/**
 * Build the props with the given active session.
 * @param {object} activeSessionDto The active session dto.
 * @param {object} data Override the default props.
 * @returns {object}
 */
function buildProps(activeSessionDto, data = {}) {
  return {
    context: defaultAppContext(),
    history: createMemoryHistory({ initialEntries: ["/"], initialIndex: 0 }),
    activeSession: new UserActiveSessionEntity(activeSessionDto),
    ...data,
  };
}

/**
 * Props with an offline session while the server is reachable again (offline home).
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineSessionServerReachableProps(data = {}) {
  return buildProps(
    defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE, is_server_reachable: true }),
    data,
  );
}

/**
 * Props with an offline session while the server is unreachable.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineSessionServerUnreachableProps(data = {}) {
  return buildProps(
    defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE, is_server_reachable: false }),
    data,
  );
}

/**
 * Props with a logged-out offline session while the server is reachable again (after "Go back online",
 * before re-authenticating online). The footer must not show here.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineSessionLoggedOutServerReachableProps(data = {}) {
  return buildProps(
    defaultUserActiveSessionDto({
      type: USER_ACTIVE_SESSION_OFFLINE,
      is_authenticated: false,
      is_server_reachable: true,
    }),
    data,
  );
}

/**
 * Props with an online session while the server is unreachable (the server-unavailable screen).
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function onlineSessionServerUnreachableProps(data = {}) {
  return buildProps(
    defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_ONLINE, is_server_reachable: false }),
    data,
  );
}

/**
 * Props with an online session while the server is reachable (the footer is not relevant).
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function onlineSessionServerReachableProps(data = {}) {
  return buildProps(defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_ONLINE, is_server_reachable: true }), data);
}
