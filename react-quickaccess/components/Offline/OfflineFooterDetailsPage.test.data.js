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
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { offlineUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import OfflineSettingsEntity from "../../../shared/models/entity/offline/offlineSettingsEntity";
import { defaultOfflineSettingsDto } from "../../../shared/models/entity/offline/offlineSettingsEntity.test.data";
import { defaultSessionTimestampsDto } from "../../../shared/models/entity/sessionTimestamps/sessionTimestampsEntity.test.data";
import { SESSION_TIMESTAMPS_GET_EVENT } from "../../../shared/services/serviceWorker/sessionTimestamps/sessionTimestampsServiceWorkerService";

/**
 * Build an app context which background page returns the given session timestamps.
 * @param {object|null} sessionTimestampsDto The session timestamps returned by the background page.
 * @returns {object}
 */
function contextWithSessionTimestamps(sessionTimestampsDto) {
  const context = defaultAppContext();
  context.port.addRequestListener(SESSION_TIMESTAMPS_GET_EVENT, async () => sessionTimestampsDto);
  return context;
}

/**
 * Props of an offline session signed in a minute ago and last synchronised an hour ago, with the
 * default organisation offline settings.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsProps(data = {}) {
  const sessionTimestampsDto = defaultSessionTimestampsDto({
    last_logged_in: DateTime.now().minus({ minutes: 1 }).toISO(),
    last_seen_online: DateTime.now().minus({ hours: 1 }).toISO(),
  });
  return {
    context: contextWithSessionTimestamps(sessionTimestampsDto),
    history: createMemoryHistory({
      initialEntries: ["/webAccessibleResources/quickaccess/offline-footer-details"],
      initialIndex: 0,
    }),
    activeSession: new UserActiveSessionEntity(offlineUserActiveSessionDto()),
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
  const activeSessionDto = offlineUserActiveSessionDto({ is_server_reachable: true });
  return offlineModeDetailsProps({ activeSession: new UserActiveSessionEntity(activeSessionDto), ...data });
}

/**
 * Props of an offline session which durations already ran out: the session was signed in longer
 * ago than the session duration, and the data was last synchronised beyond the retention period.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsExpiredProps(data = {}) {
  const sessionTimestampsDto = defaultSessionTimestampsDto({
    last_logged_in: DateTime.now().minus({ hours: 2 }).toISO(),
    last_seen_online: DateTime.now().minus({ days: 2 }).toISO(),
  });
  return offlineModeDetailsProps({ context: contextWithSessionTimestamps(sessionTimestampsDto), ...data });
}

/**
 * Props of an offline session without any known dates and without offline settings cached
 * locally, i.e. none of the durations can be determined.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function offlineModeDetailsWithoutDataProps(data = {}) {
  return offlineModeDetailsProps({
    context: contextWithSessionTimestamps(null),
    offlineSettings: null,
    ...data,
  });
}
