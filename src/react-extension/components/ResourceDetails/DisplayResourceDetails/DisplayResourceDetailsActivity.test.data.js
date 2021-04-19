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
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    resourceWorkspaceContext: {
      details: {
        resource: {
          id: uuidv4(),
          name: "resource_name"
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
    "action_log_id": "eebf0a92-18a4-440e-8aa8-799287fc2c26",
    "type": "Permissions.updated",
    "data": {
      "permissions": {
        "added": [],
        "updated": [
          {
            "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
            "type": 1,
            "permissions_history_folder": null,
            "resource": {
              "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
              "name": "test_autocomplete_tag"
            },
            "user": {
              "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "username": "admin@passbolt.com",
              "profile": {
                "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "first_name": "Admin",
                "last_name": "User",
                "created": "2020-08-17T16:37:12+00:00",
                "modified": "2020-08-17T16:37:12+00:00",
                "avatar": {
                  "url": {
                    "medium": "img\/avatar\/user_medium.png",
                    "small": "img\/avatar\/user.png"
                  }
                }
              },
              "last_logged_in": ""
            },
            "group": null
          },
          {
            "id": "79dc7e17-0d98-4cab-964e-c47422b709cb",
            "type": 15,
            "permissions_history_folder": null,
            "resource": {
              "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
              "name": "test_autocomplete_tag"
            },
            "user": {
              "id": "f848277c-5398-58f8-a82a-72397af2d450",
              "username": "ada@passbolt.com",
              "profile": {
                "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                "first_name": "Ada",
                "last_name": "Lovelace",
                "created": "2020-08-17T16:37:12+00:00",
                "modified": "2020-08-17T16:37:12+00:00",
                "avatar": {
                  "id": "50adf80e-3534-413a-bdd8-e34c9be6d1b6",
                  "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                  "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                  "model": "Avatar",
                  "filename": "ada.png",
                  "filesize": 170049,
                  "mime_type": "image\/png",
                  "extension": "png",
                  "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
                  "path": "Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.png",
                  "adapter": "Local",
                  "created": "2020-08-17T16:37:13+00:00",
                  "modified": "2020-08-17T16:37:13+00:00",
                  "url": {
                    "medium": "img\/public\/Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.a99472d5.png",
                    "small": "img\/public\/Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.65a0ba70.png"
                  }
                }
              },
              "last_logged_in": ""
            },
            "group": null
          }
        ],
        "removed": []
      },
      "resource": {
        "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "name": "test_autocomplete_tag"
      },
      "folder": null
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-08-21T08:53:00+00:00",
    "id": "5b998a97-29fb-5b1d-86d7-a026867addec"
  },
  {
    "action_log_id": "6bb08a19-1dbc-48ed-bcfc-7e0e390d357e",
    "type": "Resource.Secrets.read",
    "data": {
      "resource": {
        "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "name": "test_autocomplete_tag"
      }
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Ada",
        "last_name": "User",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-08-18T10:23:06+00:00",
    "id": "8ca2c693-b719-58c8-b203-40d880487544"
  },
  {
    "action_log_id": "c255b7bc-0695-4c94-be62-34477f733e66",
    "type": "Resource.Secrets.read",
    "data": {
      "resource": {
        "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "name": "test_autocomplete_tag"
      }
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "Ada",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-08-18T10:22:55+00:00",
    "id": "479e5167-a6fb-5fab-a17c-ca1bc634d21f"
  },
  {
    "action_log_id": "1663d2e1-9d2b-4ccf-bd89-3b4ea7669088",
    "type": "Permissions.updated",
    "data": {
      "permissions": {
        "added": [
          {
            "id": "79dc7e17-0d98-4cab-964e-c47422b709cb",
            "type": 15,
            "permissions_history_folder": null,
            "resource": {
              "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
              "name": "test_autocomplete_tag"
            },
            "user": {
              "id": "f848277c-5398-58f8-a82a-72397af2d450",
              "username": "ada@passbolt.com",
              "profile": {
                "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                "first_name": "Ada",
                "last_name": "Lovelace",
                "created": "2020-08-17T16:37:12+00:00",
                "modified": "2020-08-17T16:37:12+00:00",
                "avatar": {
                  "id": "50adf80e-3534-413a-bdd8-e34c9be6d1b6",
                  "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                  "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                  "model": "Avatar",
                  "filename": "ada.png",
                  "filesize": 170049,
                  "mime_type": "image\/png",
                  "extension": "png",
                  "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
                  "path": "Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.png",
                  "adapter": "Local",
                  "created": "2020-08-17T16:37:13+00:00",
                  "modified": "2020-08-17T16:37:13+00:00",
                  "url": {
                    "medium": "img\/public\/Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.a99472d5.png",
                    "small": "img\/public\/Avatar\/22\/47\/85\/50adf80e3534413abdd8e34c9be6d1b6\/50adf80e3534413abdd8e34c9be6d1b6.65a0ba70.png"
                  }
                }
              },
              "last_logged_in": ""
            },
            "group": null
          }
        ],
        "updated": [],
        "removed": []
      },
      "resource": {
        "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "name": "test_autocomplete_tag"
      },
      "folder": null
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User4",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-08-18T08:05:17+00:00",
    "id": "dce7f9cd-e252-57a9-834b-a315d51d1a70"
  }
];

/**
 * Mock the least activity to test the pagination
 */
export const lastActivityMock = [
  {
    "action_log_id": "e65cd6d3-c738-478c-9f2d-f62224384c9e",
    "type": "Resources.created",
    "data": {
      "resource": {
        "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "name": "test_autocomplete_tag"
      }
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {
          "url": {
            "medium": "img\/avatar\/user_medium.png",
            "small": "img\/avatar\/user.png"
          }
        }
      },
      "last_logged_in": ""
    },
    "created": "2020-08-18T07:51:47+00:00",
    "id": "59dd653d-05f4-5d29-ab83-566cc41ab22d"
  }
];
