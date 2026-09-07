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

import { createMemoryHistory } from "history";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import OfflineSettingsEntity from "../../../shared/models/entity/offline/offlineSettingsEntity";
import { defaultOfflineSettingsDto } from "../../../shared/models/entity/offline/offlineSettingsEntity.test.data";

/**
 * Default props: the offline settings cap the session duration to 1 hour.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext({ canUseOfflineMode: true }),
    offlineSettings: new OfflineSettingsEntity(defaultOfflineSettingsDto()),
    history: createMemoryHistory({ initialEntries: ["/"], initialIndex: 0 }),
    ...data,
  };
}
