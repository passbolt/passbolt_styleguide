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

import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import MockPort from "../../../test/mock/MockPort";
import { v4 as uuidv4 } from "uuid";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the app context as administrator for the unit test
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function administratorAppContext() {
  return {
    loggedInUser: { id: "f848277c-5398-58f8-a82a-72397af2d450", role: { name: "admin" } },
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    resourceCommentId: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2", // Selected resource comment id
    mustRefreshComments: false, // Flag telling whether the current list of comments should be refreshed
  };
}

/**
 * Returns the default app context for the unit test
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext() {
  return {
    loggedInUser: { id: "f848277c-5398-58f8-a82a-72397af2d450" },
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    resourceCommentId: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2", // Selected resource comment id
    mustRefreshComments: false, // Flag telling whether the current list of comments should be refreshed
  };
}

/**
 * Default props
 * @returns {{resource: {id: string}}}
 */
export function defaultProps() {
  return {
    resourceWorkspaceContext: {
      details: {
        resource: {
          id: uuidv4(),
        },
      },
    },
    actionFeedbackContext: {
      displaySuccess: () => {},
    },
  };
}
