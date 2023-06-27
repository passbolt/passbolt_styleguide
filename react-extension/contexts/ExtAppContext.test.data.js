/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import UserSettings from "../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../test/fixture/Settings/userSettings";
import SiteSettings from "../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../shared/lib/Settings/ResourceTypesSettings";
import resourceTypesFixture from "../test/fixture/ResourceTypes/resourceTypes";
import MockPort from "../test/mock/MockPort";
import MockStorage from "../test/mock/MockStorage";
import {defaultAdminUserDto, defaultUserDto} from "../../shared/models/entity/user/userEntity.test.data";
import {adminRoleDto, TEST_ROLE_ADMIN_ID, userRoleDto} from "../../shared/models/entity/role/role.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 * @deprecated
 */
export function defaultAppContext(appContext = {}) {
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesFixture);
  const defaultAppContext = {
    locale: 'en-UK',
    userSettings,
    siteSettings,
    resourceTypesSettings,
    port: new MockPort(),
    storage: new MockStorage(),
    loggedInUser: {
      id: userSettings.id,
      role: {
        id: TEST_ROLE_ADMIN_ID,
        name: 'admin'
      }
    },
    users: [],
    roles: [{
      id: TEST_ROLE_ADMIN_ID,
      name: 'admin'
    }],
    setContext: jest.fn()
  };
  return Object.assign(defaultAppContext, appContext);
}

/**
 * Default user app context
 * @param {object} data Override the default props.
 * @returns {object}
 */
export const defaultUserAppContext = (data = {}) => {
  const siteSettings = new SiteSettings(siteSettingsFixture);

  return {
    locale: 'en-UK',
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    resourceTypesSettings: new ResourceTypesSettings(siteSettings, resourceTypesFixture),
    port: new MockPort(),
    storage: new MockStorage(),
    loggedInUser: defaultUserDto(),
    users: [],
    roles: [userRoleDto(), adminRoleDto()],
    resources: [],
    folders: [],
    setContext: jest.fn(),
    ...data
  };
};

/**
 * Default administrator app context
 * @param {object} data Override the default props.
 * @returns {object}
 */
export const defaultAdministratorAppContext = (data = {}) => defaultUserAppContext({
  loggedInUser: defaultAdminUserDto(),
  ...data
});
