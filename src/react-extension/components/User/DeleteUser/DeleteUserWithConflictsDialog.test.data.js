import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn()
  };
}

/**
 * Mocked a user
 */
export const mockUser = {
  "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
  "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
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
  "last_logged_in": ""
};

/**
 * Mocked folders conflict
 */
export const mockFolders = [
  {
    "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "name": "Accounting",
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permissions": [
      {
        "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
        "aco": "Folder",
        "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "ada@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-06-17T16:37:11+00:00",
          "modified": "2020-07-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "17336097-cd30-57ab-bc40-89b31bcc513f",
        "aco": "Folder",
        "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "aro": "User",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
          "username": "admin@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
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
        }
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
    "name": "Bank",
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permissions": [
      {
        "id": "c5355878-fb96-5c21-8bb5-e8de4b24db8b",
        "aco": "Folder",
        "aco_foreign_key": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "ada@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-06-17T16:37:11+00:00",
          "modified": "2020-07-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "875cb5d4-fa9a-57cb-908d-3721264e98b1",
        "aco": "Folder",
        "aco_foreign_key": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        "aro": "User",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
          "username": "admin@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
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
        }
      }
    ],
    "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "personal": false
  },
  {
    "id": "7ecd7376-8540-58c1-88d9-678c027d464a",
    "name": "Blogs",
    "created": "2020-02-01T00:00:00+00:00",
    "modified": "2020-02-01T00:00:00+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permissions": [
      {
        "id": "e8ffb030-09f5-54cd-ad64-68e3e983a3d4",
        "aco": "Folder",
        "aco_foreign_key": "7ecd7376-8540-58c1-88d9-678c027d464a",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "ada@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-06-17T16:37:11+00:00",
          "modified": "2020-07-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "64e2a52c-2a3b-5a0d-88f9-4b6776fae07c",
        "aco": "Folder",
        "aco_foreign_key": "7ecd7376-8540-58c1-88d9-678c027d464a",
        "aro": "User",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00",
        "group": null,
        "user": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
          "username": "admin@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
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
        }
      }
    ],
    "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    "personal": false
  }
];

/**
 * Mocked resources conflict
 */
export const mockResources = [
  {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http:\/\/www.apache.org\/",
    "description": "Apache is the world\u0027s most used web server software.",
    "deleted": false,
    "created": "2020-08-15T16:37:15+00:00",
    "modified": "2020-08-16T16:37:15+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "permissions": [
      {
        "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-08-17T16:37:15+00:00",
        "modified": "2020-08-17T16:37:15+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "ada@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-06-17T16:37:11+00:00",
          "modified": "2020-07-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "898ce1d0-601f-5194-976b-147a680dd472",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 1,
        "created": "2020-08-17T16:37:15+00:00",
        "modified": "2020-08-17T16:37:15+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "carol@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-15T16:37:11+00:00",
          "modified": "2020-08-16T16:37:11+00:00",
          "profile": {
            "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            "first_name": "Carol",
            "last_name": "Shaw",
            "created": "2020-08-17T16:37:12+00:00",
            "modified": "2020-08-17T16:37:12+00:00",
            "avatar": {
              "id": "a830e66c-1b8e-42ca-85ef-00a767db9825",
              "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
              "model": "Avatar",
              "filename": "carol.png",
              "filesize": 733439,
              "mime_type": "image\/png",
              "extension": "png",
              "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
              "path": "Avatar\/f8\/54\/6c\/a830e66c1b8e42ca85ef00a767db9825\/a830e66c1b8e42ca85ef00a767db9825.png",
              "adapter": "Local",
              "created": "2020-08-17T16:37:12+00:00",
              "modified": "2020-08-17T16:37:12+00:00",
              "url": {
                "medium": "img\/public\/Avatar\/f8\/54\/6c\/a830e66c1b8e42ca85ef00a767db9825\/a830e66c1b8e42ca85ef00a767db9825.a99472d5.png",
                "small": "img\/public\/Avatar\/f8\/54\/6c\/a830e66c1b8e42ca85ef00a767db9825\/a830e66c1b8e42ca85ef00a767db9825.65a0ba70.png"
              }
            }
          },
          "last_logged_in": ""
        }
      },
      {
        "id": "c953dc56-86ee-5932-ae24-a2df7003c906",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "type": 1,
        "created": "2020-08-17T16:37:15+00:00",
        "modified": "2020-08-17T16:37:15+00:00",
        "group": null,
        "user": {
          "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "dame@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T14:37:11+00:00",
          "modified": "2020-08-17T15:37:11+00:00",
          "profile": {
            "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
            "first_name": "Dame Steve",
            "last_name": "Shirley",
            "created": "2020-08-17T16:37:12+00:00",
            "modified": "2020-08-17T16:37:12+00:00",
            "avatar": {
              "id": "b307581f-c970-421c-bbf8-4fb8212cfe69",
              "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
              "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
              "model": "Avatar",
              "filename": "dame steve.png",
              "filesize": 20676,
              "mime_type": "image\/png",
              "extension": "png",
              "hash": "f2695972b9009970ac85aae95f907693268cd249",
              "path": "Avatar\/72\/ec\/66\/b307581fc970421cbbf84fb8212cfe69\/b307581fc970421cbbf84fb8212cfe69.png",
              "adapter": "Local",
              "created": "2020-08-17T16:37:12+00:00",
              "modified": "2020-08-17T16:37:12+00:00",
              "url": {
                "medium": "img\/public\/Avatar\/72\/ec\/66\/b307581fc970421cbbf84fb8212cfe69\/b307581fc970421cbbf84fb8212cfe69.a99472d5.png",
                "small": "img\/public\/Avatar\/72\/ec\/66\/b307581fc970421cbbf84fb8212cfe69\/b307581fc970421cbbf84fb8212cfe69.65a0ba70.png"
              }
            }
          },
          "last_logged_in": ""
        }
      },
      {
        "id": "6f65173d-a5e8-5014-9659-e1bb4f19707d",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "type": 7,
        "created": "2020-08-17T16:37:15+00:00",
        "modified": "2020-08-17T16:37:15+00:00",
        "group": null,
        "user": {
          "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "betty@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-03T16:37:11+00:00",
          "modified": "2020-08-10T16:37:11+00:00",
          "profile": {
            "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
            "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            "first_name": "Betty",
            "last_name": "Holberton",
            "created": "2020-08-17T16:37:12+00:00",
            "modified": "2020-08-17T16:37:12+00:00",
            "avatar": {
              "id": "bee47684-c689-4e38-8dee-c2d34cce925f",
              "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
              "model": "Avatar",
              "filename": "betty.png",
              "filesize": 115942,
              "mime_type": "image\/png",
              "extension": "png",
              "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
              "path": "Avatar\/5f\/fe\/be\/bee47684c6894e388deec2d34cce925f\/bee47684c6894e388deec2d34cce925f.png",
              "adapter": "Local",
              "created": "2020-08-17T16:37:13+00:00",
              "modified": "2020-08-17T16:37:13+00:00",
              "url": {
                "medium": "img\/public\/Avatar\/5f\/fe\/be\/bee47684c6894e388deec2d34cce925f\/bee47684c6894e388deec2d34cce925f.a99472d5.png",
                "small": "img\/public\/Avatar\/5f\/fe\/be\/bee47684c6894e388deec2d34cce925f\/bee47684c6894e388deec2d34cce925f.65a0ba70.png"
              }
            }
          },
          "last_logged_in": ""
        }
      }
    ]
  },
  {
    "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
    "name": "test_autocomplete_tag",
    "username": "",
    "uri": "fuzdo",
    "description": "",
    "deleted": false,
    "created": "2020-08-18T07:51:47+00:00",
    "modified": "2020-08-18T09:51:45+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "permissions": [
      {
        "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a77",
        "aco": "Resource",
        "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-08-18T08:05:17+00:00",
        "modified": "2020-08-21T08:53:00+00:00",
        "group": null,
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "ada@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-06-17T16:37:11+00:00",
          "modified": "2020-07-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
        "aco": "Resource",
        "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "aro": "User",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "type": 1,
        "created": "2020-08-18T07:51:47+00:00",
        "modified": "2020-08-21T08:53:00+00:00",
        "group": null,
        "user": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
          "username": "admin@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
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
        }
      },
      {
        "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
        "aco": "Resource",
        "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "aro": "Group",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "type": 1,
        "created": "2020-08-18T07:51:47+00:00",
        "modified": "2020-08-21T08:53:00+00:00",
        "group": {
          "id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
          "name": "testGroup",
        },
        "user": null,
      }
    ],
    "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "personal": false
  }
];

/**
 * Mocked groups conflict
 */
export const mockGroups = [
  {
    "id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
    "name": "Accounting",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "groups_users": [
      {
        "id": "38804173-18aa-5ec1-99b9-354496374816",
        "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
        "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
        "is_admin": true,
        "created": "2020-08-17T16:37:13+00:00",
        "user": {
          "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "frances@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
          "profile": {
            "id": "543865d0-5f9b-598d-928b-2811f3cae77f",
            "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
            "first_name": "Frances",
            "last_name": "Allen",
            "created": "2020-08-17T16:37:12+00:00",
            "modified": "2020-08-17T16:37:12+00:00"
          },
          "last_logged_in": ""
        }
      },
      {
        "id": "a932a3ce-82bc-59b6-ac4e-bf325435e534",
        "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
        "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
        "is_admin": false,
        "created": "2020-08-17T16:37:13+00:00",
        "user": {
          "id": "620de627-8f07-5427-9149-e2c43219c5aa",
          "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "username": "grace@passbolt.com",
          "active": true,
          "deleted": false,
          "created": "2020-08-17T16:37:11+00:00",
          "modified": "2020-08-17T16:37:11+00:00",
          "profile": {
            "id": "d12b4113-9368-5923-9e86-deea9fdca094",
            "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
            "first_name": "Grace",
            "last_name": "Hopper",
            "created": "2020-08-17T16:37:12+00:00",
            "modified": "2020-08-17T16:37:12+00:00"
          },
          "last_logged_in": ""
        }
      }
    ]
  }
];
