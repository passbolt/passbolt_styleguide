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
import { DateTime } from "luxon";
import UserActiveSessionEntity, {
  USER_ACTIVE_SESSION_OFFLINE,
} from "../../../shared/models/entity/session/userActiveSessionEntity";
import {
  minimalUserActiveSessionDto,
  offlineUserActiveSessionDto,
} from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import OfflineSettingsEntity from "../../../shared/models/entity/offline/offlineSettingsEntity";
import { defaultOfflineSettingsDto } from "../../../shared/models/entity/offline/offlineSettingsEntity.test.data";

/**
 * Props of an offline session signed in a minute ago and last synchronised an hour ago, with the
 * default organisation offline settings.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsProps(data = {}) {
  const activeSessionDto = offlineUserActiveSessionDto({
    last_logged_in: DateTime.now().minus({ minutes: 1 }).toISO(),
    last_seen_online: DateTime.now().minus({ hours: 1 }).toISO(),
  });
  return {
    context: defaultAppContext(),
    history: createMemoryHistory({
      initialEntries: ["/webAccessibleResources/quickaccess/offline-footer-details"],
      initialIndex: 0,
    }),
    activeSession: new UserActiveSessionEntity(activeSessionDto),
    offlineSettings: new OfflineSettingsEntity(defaultOfflineSettingsDto({ data_retention_period: 1 })),
    ...data,
  };
}

/**
 * Props of an offline session while the server is reachable again, i.e. switching to online
 * mode is offered.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsServerReachableProps(data = {}) {
  const activeSessionDto = offlineUserActiveSessionDto({
    is_server_reachable: true,
    last_logged_in: DateTime.now().minus({ minutes: 1 }).toISO(),
    last_seen_online: DateTime.now().minus({ hours: 1 }).toISO(),
  });
  return offlineModeDetailsProps({ activeSession: new UserActiveSessionEntity(activeSessionDto), ...data });
}

/**
 * Props of an offline session which durations already ran out: the session was signed in longer
 * ago than the session duration, and the data was last synchronised beyond the retention period.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsExpiredProps(data = {}) {
  const activeSessionDto = offlineUserActiveSessionDto({
    last_logged_in: DateTime.now().minus({ hours: 2 }).toISO(),
    last_seen_online: DateTime.now().minus({ days: 2 }).toISO(),
  });
  return offlineModeDetailsProps({ activeSession: new UserActiveSessionEntity(activeSessionDto), ...data });
}

/**
 * Props of an offline session without any known dates and without offline settings cached
 * locally, i.e. none of the durations can be determined.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsWithoutDataProps(data = {}) {
  const activeSessionDto = minimalUserActiveSessionDto({
    type: USER_ACTIVE_SESSION_OFFLINE,
    is_server_reachable: false,
  });
  return offlineModeDetailsProps({
    activeSession: new UserActiveSessionEntity(activeSessionDto),
    offlineSettings: null,
    ...data,
  });
}
