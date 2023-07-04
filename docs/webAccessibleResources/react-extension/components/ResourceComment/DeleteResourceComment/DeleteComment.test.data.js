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
import {v4 as uuidv4} from "uuid";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the app context as administrator for the unit test
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function administratorAppContext() {
  return {
    loggedInUser: {id: 'f848277c-5398-58f8-a82a-72397af2d450', role: {name: 'admin'}},
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    resourceCommentId: '9e56b21f-36f1-44a7-a363-1c6ccbbf09e2', // Selected resource comment id
    mustRefreshComments: false // Flag telling whether the current list of comments should be refreshed
  };
}

/**
 * Returns the default app context for the unit test
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext() {
  return {
    loggedInUser: {id: 'f848277c-5398-58f8-a82a-72397af2d450'},
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    resourceCommentId: '9e56b21f-36f1-44a7-a363-1c6ccbbf09e2', // Selected resource comment id
    mustRefreshComments: false // Flag telling whether the current list of comments should be refreshed
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
          id: uuidv4()
        }
      }
    },
    actionFeedbackContext: {
      displaySuccess: () => {}
    }
  };
}

/**
 * Mocked list of comments
 */
export const commentsMock = [{
  children: [],
  content: "This is a comment",
  created: "2020-08-22T13:13:19+00:00",
  created_by: "f848277c-5398-58f8-a82a-72397af2d450",
  creator: {
    id: "f848277c-5398-58f8-a82a-72397af2d450",
    role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
    active: true,
    deleted: false,
    last_logged_in: "",
    profile: {
      avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
      created: "2020-09-01T13:11:08+00:00",
      first_name: "Ada",
      id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
      last_name: "Lovelace",
      modified: "2020-09-01T13:11:08+00:00",
      user_id: "f848277c-5398-58f8-a82a-72397af2d450",
    },
  },
  role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
  username: "ada@passbolt.com",
  foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
  foreign_model: "Resource",
  id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
  modified: "2020-09-01T13:13:19+00:00",
  modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  parent_id: null,
  user_id: "f848277c-5398-58f8-a82a-72397af2d450",
}, {
  children: [],
  content: "This is another comment",
  created: "2020-09-01T13:13:19+00:00",
  created_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  creator: {
    id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
    active: true,
    deleted: false,
    last_logged_in: "",
    profile: {
      avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
      created: "2020-09-01T13:11:08+00:00",
      first_name: "Carol",
      id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
      last_name: "Shaw",
      modified: "2020-09-01T13:11:08+00:00",
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    },
  },
  role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
  username: "carol@passbolt.com",
  foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
  foreign_model: "Resource",
  id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
  modified: "2020-09-01T13:13:19+00:00",
  modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  parent_id: null,
  user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
}, {
  children: [],
  content: "This is a third comment",
  created: "2020-08-25T13:13:19+00:00",
  created_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  creator: {
    id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
    active: true,
    deleted: false,
    last_logged_in: "",
    profile: {
      avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
      created: "2020-09-01T13:11:08+00:00",
      first_name: "Betty",
      id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
      last_name: "Holberton",
      modified: "2020-09-01T13:11:08+00:00",
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    },
  },
  role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
  username: "betty@passbolt.com",
  foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
  foreign_model: "Resource",
  id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
  modified: "2020-09-01T13:13:19+00:00",
  modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  parent_id: null,
  user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
}];
