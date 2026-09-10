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
import {
  defaultUserActiveSessionDto,
  offlineUserActiveSessionDto,
} from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import OfflineSettingsEntity from "../../../shared/models/entity/offline/offlineSettingsEntity";
import { defaultOfflineSettingsDto } from "../../../shared/models/entity/offline/offlineSettingsEntity.test.data";

/**
 * Default props: a user signed-in with an online session which lost the server.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    history: createMemoryHistory({ initialEntries: ["/"], initialIndex: 0 }),
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_server_reachable: false })),
    offlineSettings: new OfflineSettingsEntity(defaultOfflineSettingsDto()),
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
    activeSession: new UserActiveSessionEntity(
      defaultUserActiveSessionDto({ is_authenticated: false, is_server_reachable: false }),
    ),
    ...data,
  });
}

/**
 * Props with an offline session already opened.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineSessionProps(data = {}) {
  return defaultProps({
    activeSession: new UserActiveSessionEntity(offlineUserActiveSessionDto()),
    ...data,
  });
}
