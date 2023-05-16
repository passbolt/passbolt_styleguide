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

import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {
  defaultAccountRecoveryUserContext,
} from "../../../contexts/AccountRecoveryUserContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultContext(data = {}) {
  const defaultData = defaultAppContext({
    loggedInUser: {
      role: {
        name: 'admin'
      }
    }
  });
  return Object.assign(defaultData, data);
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    accountRecoveryContext: defaultAccountRecoveryUserContext(),
    userWorkspaceContext: {
      onUserScrolled: () => {},
      scrollTo: {
        user: {
          "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "role": {
            "created": "2012-07-04T13:39:25+00:00",
            "description": "Logged in user",
            "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
            "modified": "2012-07-04T13:39:25+00:00",
            "name": "user"
          },
          "username": "dame@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-05-13T07:32:49+00:00",
          "modified": "2020-05-13T08:32:49+00:00",
          "profile": {
            "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
            "first_name": "Dame Steve",
            "last_name": "Shirley",
            "created": "2020-05-13T09:32:49+00:00",
            "modified": "2020-05-13T09:32:49+00:00",
            "avatar": {
              "id": "81100609-d60d-4dc8-a8c8-de45522eee1b",
              "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
              "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
              "model": "Avatar",
              "filename": "dame steve.png",
              "filesize": 20676,
              "mime_type": "image\/png",
              "extension": "png",
              "hash": "f2695972b9009970ac85aae95f907693268cd249",
              "path": "Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.png",
              "adapter": "Local",
              "created": "2020-05-13T09:32:51+00:00",
              "modified": "2020-05-13T09:32:51+00:00",
              "url": {
                "medium": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.a99472d5.png",
                "small": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.65a0ba70.png"
              }
            }
          },
          "__placeholder_last_logged_in__": "",
          "last_logged_in": "",
          is_mfa_enabled: false
        }
      },
      onSorterChanged: () => {},
      onUserSelected: {
        single: () => {}
      },
      sorter: {
        propertyName: 'modified'
      },
      selectedUsers: [],
      filteredUsers: [{
        "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "role": {
          "created": "2012-07-04T13:39:25+00:00",
          "description": "Logged in user",
          "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "modified": "2012-07-04T13:39:25+00:00",
          "name": "user"
        },
        "username": "carol@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-05-11T09:32:49+00:00",
        "modified": "2020-05-12T09:32:49+00:00",
        "profile": {
          "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "first_name": "Carol",
          "last_name": "Shaw",
          "created": "2020-05-13T09:32:49+00:00",
          "modified": "2020-05-13T09:32:49+00:00",
          "avatar": {
            "id": "0f769127-3053-45e4-bd8e-75e766bb4d52",
            "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            "model": "Avatar",
            "filename": "carol.png",
            "filesize": 733439,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
            "path": "Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.png",
            "adapter": "Local",
            "created": "2020-05-13T09:32:51+00:00",
            "modified": "2020-05-13T09:32:51+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",
              "small": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"
            }
          }
        },
        "__placeholder_last_logged_in__": "",
        "last_logged_in": "",
        is_mfa_enabled: false
      },
      {
        "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "role": {
          "created": "2012-07-04T13:39:25+00:00",
          "description": "Logged in user",
          "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "modified": "2012-07-04T13:39:25+00:00",
          "name": "user"
        },
        "username": "dame@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-05-13T07:32:49+00:00",
        "modified": "2020-05-13T08:32:49+00:00",
        "profile": {
          "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "first_name": "Dame Steve",
          "last_name": "Shirley",
          "created": "2020-05-13T09:32:49+00:00",
          "modified": "2020-05-13T09:32:49+00:00",
          "avatar": {
            "id": "81100609-d60d-4dc8-a8c8-de45522eee1b",
            "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
            "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            "model": "Avatar",
            "filename": "dame steve.png",
            "filesize": 20676,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "f2695972b9009970ac85aae95f907693268cd249",
            "path": "Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.png",
            "adapter": "Local",
            "created": "2020-05-13T09:32:51+00:00",
            "modified": "2020-05-13T09:32:51+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.a99472d5.png",
              "small": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.65a0ba70.png"
            }
          }
        },
        "__placeholder_last_logged_in__": "",
        "last_logged_in": "",
        is_mfa_enabled: false
      }],
      filter: {
        type: UserWorkspaceFilterTypes.ALL
      },
      getTranslatedRoleName: name => name,
    }
  };
}

/**
 * Props with null users
 * @returns {any}
 */
export function propsWithNullUsers() {
  return {
    userWorkspaceContext: {
      filteredUsers: null,
      filter: {
        type: UserWorkspaceFilterTypes.ALL
      }
    }
  };
}

/**
 * Props with no users using the text search
 * @returns {any}
 */
export function propsWithNoUsersWithTextSearch() {
  return {
    userWorkspaceContext: {
      filteredUsers: [],
      filter: {
        type: UserWorkspaceFilterTypes.TEXT
      }
    }
  };
}

/**
 * Props with no users using the text search
 * @returns {any}
 */
export function propsWithFirstUserAttentionRequired() {
  const props = defaultProps();
  props.userWorkspaceContext.filteredUsers[0].pending_account_recovery_request = true;
  return props;
}
