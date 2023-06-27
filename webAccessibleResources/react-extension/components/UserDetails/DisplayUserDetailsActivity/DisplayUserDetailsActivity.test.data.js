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

import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockPort from "../../../test/mock/MockPort";
import {v4 as uuidv4} from "uuid";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props
 * @returns {{user: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    userWorkspaceContext: {
      details: {
        user: {
          id: uuidv4(),
          name: "user_name"
        }
      },
      refresh: {
        activities: false
      }
    }
  };
}

/**
 * Mocked list of activities
 */
export const activitiesMock = [
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "type": "AccountRecovery.Requests.initiated",
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
      "username": "ada@passbolt.com",
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2021-12-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd0",
    "type": "AccountRecovery.Requests.accepted",
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "admin",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2021-10-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd2",
    "type": "AccountRecovery.Policies.rejected",
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
      "username": "ada@passbolt.com",
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2021-08-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd1",
    "type": "AccountRecovery.Policies.accepted",
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
      "username": "ada@passbolt.com",
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2021-04-17T16:37:12+00:00"
  }
];

/**
 * Mock the least activity to test the pagination
 */
export const lastActivityMock = [
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd4",
    "type": "Users.created",
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "admin",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-01-17T16:37:12+00:00"
  }
];
