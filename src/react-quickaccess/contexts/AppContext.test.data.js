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
 * @since         3.8.0
 */

import SiteSettingsEntity from "../../shared/models/entity/siteSettings/siteSettingsEntity";
import siteSettingsFixture from "../../react-extension/test/fixture/Settings/siteSettings";
import MockPort from "../../react-extension/test/mock/MockPort";
import MockStorage from "../../react-extension/test/mock/MockStorage";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../react-extension/test/fixture/Settings/userSettings";
import { defaultUserDto } from "../../shared/models/entity/user/userEntity.test.data";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import UserActiveSessionEntity from "../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../shared/models/entity/session/userActiveSessionEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @param data An existing app context
 * @returns {Object}
 */
export function defaultAppContext(data = {}) {
  const siteSettings = new SiteSettingsEntity(siteSettingsFixture);

  return {
    locale: "en-UK",
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    port: new MockPort(),
    storage: new MockStorage(),
    loggedInUser: defaultUserDto({}, { withRole: true }),
    users: [],
    resources: [],
    updateSearch: jest.fn(),
    openerTabId: 1,
    search: "",
    searchHistory: {},
    closeWindow: jest.fn(),
    setWindowBlurBehaviour: () => jest.fn(),
    shouldCloseAtWindowBlur: false,
    rbacs: new RbacsCollection([]),
    canUseOfflineMode: false,
    // authentication transitions
    loginOnlineSuccessCallBack: jest.fn(),
    loginOfflineSuccessCallBack: jest.fn(),
    mfaRequiredCallback: jest.fn(),
    bootstrapFeature: "",
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_authenticated: false })),
    activeSessionLocalStorageContext: {
      get: jest.fn(),
      activeSession: null,
      updateLocalStorage: jest.fn(),
    },
    ...data,
  };
}
