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
        folder: {
          id: uuidv4(),
          name: "folder_name"
        }
      }
    }
  };
}

/**
 * Mocked list of activities
 */
export const activitiesMock = [
  {
    "action_log_id": "c8f93853-290f-42aa-a290-a555c53bdeeb",
    "type": "Folders.updated",
    "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}},
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:26:27+00:00",
    "id": "47e27a62-0bf9-56ae-bd6a-913dd3b8e701"
  }, {
    "action_log_id": "6d1ac9b1-d846-4192-b603-e2abbd4e3695",
    "type": "Permissions.updated",
    "data": {
      "permissions": {
        "added": [{
          "id": "30a55f34-310e-4125-9566-bbd8869482ba",
          "type": 1,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": null,
          "group": {"id": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "name": "Accounting"}
        }],
        "updated": [{
          "id": "0f84dd8e-e9f3-433f-b96f-db704a30e21a",
          "type": 15,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "username": "admin@passbolt.com",
            "profile": {
              "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
              "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "first_name": "Admin",
              "last_name": "User",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }],
        "removed": [{
          "id": "6f7e12ec-c673-4865-a9c5-8d97c83d0d88",
          "type": 15,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": null,
          "group": {"id": "3feba74f-47da-5146-9d8f-76c7266c60ea", "name": "Management"}
        }]
      }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:25:36+00:00",
    "id": "ef0472db-025e-5abd-b2b3-1559ca77125a"
  }, {
    "action_log_id": "079f2faf-1702-4b3c-b083-ba2cc3b74936",
    "type": "Folders.updated",
    "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting"}},
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:25:08+00:00",
    "id": "9ce8e86e-4a2c-5742-b068-dc96b6fbdcee"
  }, {
    "action_log_id": "c88219f7-28b1-4b3f-a31d-88accca08439",
    "type": "Permissions.updated",
    "data": {
      "permissions": {
        "added": [{
          "id": "6f7e12ec-c673-4865-a9c5-8d97c83d0d88",
          "type": 15,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": null,
          "group": {"id": "3feba74f-47da-5146-9d8f-76c7266c60ea", "name": "Management"}
        }],
        "updated": [{
          "id": "0f84dd8e-e9f3-433f-b96f-db704a30e21a",
          "type": 15,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "username": "admin@passbolt.com",
            "profile": {
              "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
              "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "first_name": "Admin",
              "last_name": "User",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }],
        "removed": [{
          "id": "35d93ba4-797f-413f-a29f-24537a57573d",
          "type": 7,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            "username": "betty@passbolt.com",
            "profile": {
              "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
              "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              "first_name": "Betty",
              "last_name": "Holberton",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }, {
          "id": "7aa995bb-6115-43aa-8a90-4e78c2abc545",
          "type": 1,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "f848277c-5398-58f8-a82a-72397af2d450",
            "username": "ada@passbolt.com",
            "profile": {
              "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
              "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
              "first_name": "Ada",
              "last_name": "Lovelace",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }]
      }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:24:58+00:00",
    "id": "4c5622bb-7d31-5d9d-80d3-eb980acec285"
  }, {
    "action_log_id": "f2b91ae1-208c-4cc4-8adb-cc6028c8ea1f",
    "type": "Folders.updated",
    "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Management"}},
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:24:13+00:00",
    "id": "a4e5da20-ec7e-5b6e-82ad-627a9c82983a"
  }
];

/**
 * Mock the least activity to test the pagination
 */
export const lastActivityMock = [
  {
    "action_log_id": "838e3154-f6af-4c71-bf32-48e1f4f35897",
    "type": "Permissions.updated",
    "data": {
      "permissions": {
        "added": [{
          "id": "35d93ba4-797f-413f-a29f-24537a57573d",
          "type": 7,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            "username": "betty@passbolt.com",
            "profile": {
              "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
              "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              "first_name": "Betty",
              "last_name": "Holberton",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }, {
          "id": "7aa995bb-6115-43aa-8a90-4e78c2abc545",
          "type": 1,
          "resource": null,
          "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
          "user": {
            "id": "f848277c-5398-58f8-a82a-72397af2d450",
            "username": "ada@passbolt.com",
            "profile": {
              "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
              "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
              "first_name": "Ada",
              "last_name": "Lovelace",
              "created": "2020-06-13T08:38:56+00:00",
              "modified": "2020-06-13T08:38:56+00:00",
              "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
            },
            "last_logged_in": ""
          },
          "group": null
        }], "updated": [], "removed": []
      }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
    },
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Admin",
        "last_name": "User",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:23:53+00:00",
    "id": "ed336d26-339d-59e8-9992-a072ce83198f"
  }, {
    "action_log_id": "a0f76358-6e93-4466-bb9e-ec2bca1605a0",
    "type": "Folders.created",
    "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Administration"}},
    "creator": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    },
    "created": "2020-06-13T09:23:09+00:00",
    "id": "d8f5f5a0-86b2-5074-a54b-af7e198b8215"
  }
];
