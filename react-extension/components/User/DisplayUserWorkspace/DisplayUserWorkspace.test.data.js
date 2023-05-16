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
 * @since         2.11.0
 */

import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultContext(data = {}) {
  const defaultData = defaultAppContext();
  return Object.assign(defaultData, data);
}

/**
 * Props with user details
 */
export function propsWithUserDetails() {
  return {
    userWorkspaceContext: {
      details: {
        user: 'some user',
        locked: true
      }
    }
  };
}

/**
 * Props with user group details
 */
export function propsWithGroupDetails() {
  return {
    userWorkspaceContext: {
      details: {
        group: 'some group',
        locked: true
      }
    }
  };
}


/**
 * Props with user details locked to false
 */
export function propsWithoutLock() {
  return {
    userWorkspaceContext: {
      details: {
        locked: false
      }
    }
  };
}

