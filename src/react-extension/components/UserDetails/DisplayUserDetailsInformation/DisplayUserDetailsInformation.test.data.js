import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: {
      getTrustedDomain: () => "some url"
    },
    siteSettings: {
      getServerTimezone: () => ""
    },
    roles: [
      {
        id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
        name: 'Admin'
      }
    ]
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    userWorkspaceContext: {
      details: {
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
      }
    }
  };
}
