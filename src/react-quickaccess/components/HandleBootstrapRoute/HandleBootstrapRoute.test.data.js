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

import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import { BOOTSTRAP_FEATURE } from "../../ExtQuickAccess";
import { defaultAppContext } from "../../contexts/AppContext.test.data";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(),
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto()),
    history: {
      push: jest.fn(),
    },
    bootstrapFeature: BOOTSTRAP_FEATURE.AUTOSAVE_CREDENTIALS,
  };
  return Object.assign(defaultProps, props);
}

/**
 * Props with the given active session and offline mode capability.
 * @param {object} activeSessionDto The active session dto.
 * @param {boolean} canUseOfflineMode Whether the user can use the offline mode.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function propsWithOfflineModeCapability(activeSessionDto, canUseOfflineMode, props = {}) {
  return defaultProps({
    context: defaultAppContext({ canUseOfflineMode }),
    activeSession: new UserActiveSessionEntity(activeSessionDto),
    bootstrapFeature: null,
    ...props,
  });
}
