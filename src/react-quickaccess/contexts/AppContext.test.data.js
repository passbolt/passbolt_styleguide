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

import SiteSettings from "../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../react-extension/test/fixture/Settings/siteSettings";
import MockPort from "../../react-extension/test/mock/MockPort";
import MockStorage from "../../react-extension/test/mock/MockStorage";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../react-extension/test/fixture/Settings/userSettings";
import { defaultUserDto } from "../../shared/models/entity/user/userEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @param data An existing app context
 * @returns {Object}
 */
export function defaultAppContext(data = {}) {
  const siteSettings = new SiteSettings(siteSettingsFixture);

  return {
    locale: "en-UK",
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    port: new MockPort(),
    storage: new MockStorage(),
    loggedInUser: defaultUserDto(),
    users: [],
    resources: [],
    focusSearch: jest.fn(),
    updateSearch: jest.fn(),
    getOpenerTabId: () => 1,
    search: "",
    searchHistory: {},
    ...data,
  };
}
