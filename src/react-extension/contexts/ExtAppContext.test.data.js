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

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */

export function defaultAppContext(appContext) {
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
        name: 'admin'
      }
    },
    users: [],
    roles: [{
      id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
      name: 'Admin'
    }]
  };
  return Object.assign(defaultAppContext, appContext || {});
}
