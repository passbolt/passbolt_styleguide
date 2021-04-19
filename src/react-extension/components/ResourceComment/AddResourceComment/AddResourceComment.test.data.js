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
    loggedInUser: {id: 'f848277c-5398-58f8-a82a-72397af2d450'},
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
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
    }
  };
}

/**
 * Mocked list of comments
 */
export const commentsMock = [{
  children: [],
  content: "tetete",
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
      first_name: "Karl",
      id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
      last_name: "Devooght",
      modified: "2020-09-01T13:11:08+00:00",
      user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
    },
  },
  role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
  username: "karl@passbolt.com",
  foreign_key: "f302754f-f290-42a6-9ea3-7049c6d4dbe3",
  foreign_model: "Resource",
  id: "9e56b21f-36f1-44a7-a363-1c6ccbbf09e2",
  modified: "2020-09-01T13:13:19+00:00",
  modified_by: "5247399c-6c8a-47f0-8880-aa854e01e554",
  parent_id: null,
  user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
}];

/** A too long comment */
export const tooLongComment = "The way I see it every life is a pile of good things and bad things. The good things don’t always soften the bad things but vice versa the bad things don’t always spoil the good things and make them unimportant. The good things don’t always soften the bad things but vice versa the bad things don’t always spoil the good things and make them unimportant.";
