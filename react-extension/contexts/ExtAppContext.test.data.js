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
import MockPort from "../test/mock/MockPort";
import MockStorage from "../test/mock/MockStorage";
import { defaultAdminUserDto, defaultUserDto } from "../../shared/models/entity/user/userEntity.test.data";
import {
  adminRoleDto,
  TEST_ROLE_ADMIN_ID,
  TEST_ROLE_USER_ID,
  userRoleDto,
} from "../../shared/models/entity/role/roleEntity.test.data";
import { defaultAccountDto } from "../../shared/models/entity/account/accountEntity.test.data";
import AccountEntity from "../../shared/models/entity/account/accountEntity";
import { defaultCeSiteSettings } from "../test/fixture/Settings/siteSettings.test.data";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import { settingsRbacsCollectionData } from "../../shared/models/entity/rbac/rbacsCollection.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext = {}, isCommunityEdition = false) {
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = isCommunityEdition
    ? new SiteSettings(defaultCeSiteSettings())
    : new SiteSettings(siteSettingsFixture);
  const defaultAppContext = {
    locale: "en-UK",
    userSettings,
    siteSettings,
    port: new MockPort(),
    storage: new MockStorage(),
    account: new AccountEntity(defaultAccountDto()),
    loggedInUser: {
      id: userSettings.id,
      role: {
        id: TEST_ROLE_ADMIN_ID,
        name: "admin",
      },
    },
    users: [],
    roles: [
      {
        id: TEST_ROLE_ADMIN_ID,
        name: "admin",
      },
      {
        id: TEST_ROLE_USER_ID,
        name: "user",
      },
    ],
    rbacs: new RbacsCollection([]),
    setContext: jest.fn(),
    foldersMapById: [],
    getHierarchyFolderCache: jest.fn(() => []),
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
    locale: "en-UK",
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    port: new MockPort(),
    storage: new MockStorage(),
    loggedInUser: defaultUserDto({}, { withRole: true }),
    users: [],
    roles: [userRoleDto(), adminRoleDto()],
    resources: [],
    folders: [],
    setContext: jest.fn(),
    rbacs: new RbacsCollection(settingsRbacsCollectionData()),
    foldersMapById: [],
    getHierarchyFolderCache: jest.fn(() => []),
    ...data,
  };
};

/**
 * Default administrator app context
 * @param {object} data Override the default props.
 * @returns {object}
 */
export const defaultAdministratorAppContext = (data = {}) =>
  defaultUserAppContext({
    loggedInUser: defaultAdminUserDto({}, { withRole: true }),
    ...data,
  });
