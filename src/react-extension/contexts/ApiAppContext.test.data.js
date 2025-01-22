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
import SiteSettings from "../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../test/fixture/Settings/siteSettings";
import {ApiClientOptions} from "../../shared/lib/apiClient/apiClientOptions";
import MockPort from "../test/mock/MockPort";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../test/fixture/Settings/userSettings";
/**
 * Returns the default api app context for the unit test
 * @param {Object} appContext (Optional)Properties to override
 * @returns {Object}
 * @deprecated Check what was done for ExtAppContext
 */
export function defaultAppContext(appContext = {}) {
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const defaultAppContext = {
    locale: 'en-UK',
    onRefreshLocaleRequested: jest.fn(),
    userSettings,
    siteSettings,
    trustedDomain: "https://localhost:6006",
    loggedInUser: {
      id: userSettings.id,
      username: "user@passbolt.com",
      role: {
        name: 'admin'
      }
    },
    port: new MockPort(),
    setContext: jest.fn(),
    baseUrl: "https://localhost:6006",
    getApiClientOptions: () => new ApiClientOptions()
      .setBaseUrl("https://localhost:6006")
  };
  return Object.assign(defaultAppContext, appContext);
}
