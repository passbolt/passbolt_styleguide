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
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
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
    "allowedUsersPermission": [
      {
        "permissionId": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
        "username": "ada@passbolt.com",
        "first_name": "Ada",
        "last_name": "Lovelace",
      },
      {
        "permissionId": "17336097-cd30-57ab-bc40-89b31bcc513f",
        "username": "admin@passbolt.com",
        "first_name": "Admin",
        "last_name": "User",
      }
    ]
  },
  {
    "id": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
    "name": "Bank",
    "allowedUsersPermission": [
      {
        "permissionId": "c5355878-fb96-5c21-8bb5-e8de4b24db8b",
        "username": "ada@passbolt.com",
        "first_name": "Ada",
        "last_name": "Lovelace",
      },
      {
        "permissionId": "875cb5d4-fa9a-57cb-908d-3721264e98b1",
        "username": "admin@passbolt.com",
        "first_name": "Admin",
        "last_name": "User",
      }
    ]
  },
  {
    "id": "7ecd7376-8540-58c1-88d9-678c027d464a",
    "name": "Blogs",
    "allowedUsersPermission": [
      {
        "permissionId": "64e2a52c-2a3b-5a0d-88f9-4b6776fae07c",
        "username": "admin@passbolt.com",
        "first_name": "Admin",
        "last_name": "User",
      }
    ]
  }
];

/**
 * Mocked resources conflict
 */
export const mockResources = [
  {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "allowedUsersPermission": [
      {
        "permissionId": "898ce1d0-601f-5194-976b-147a680dd472",
        "username": "carol@passbolt.com",
        "first_name": "Carol",
        "last_name": "Shaw",
      },
      {
        "id": "c953dc56-86ee-5932-ae24-a2df7003c906",
        "username": "dame@passbolt.com",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
      },
      {
        "permissionId": "6f65173d-a5e8-5014-9659-e1bb4f19707d",
        "username": "betty@passbolt.com",
        "first_name": "Betty",
        "last_name": "Holberton",
      }
    ]
  },
  {
    "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
    "name": "test_autocomplete_tag",
    "allowedUsersPermission": null,
    "allowedGroupsPermission": [
      {
        "permissionId": "79dc7e17-0d98-4cab-964e-c47422b709ef",
        "name": "groupTest",
      },
      {
        "permissionId": "fa5f5d7a-32cc-4c5b-9478-f58584ca4233",
        "name": "groupTest2",
      }
    ],
  }
];

/**
 * Mocked groups conflict
 */
export const mockGroups = [
  {
    "id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
    "name": "Accounting",
    "allowedUsersPermission": [
      {
        "permissionId": "38804173-18aa-5ec1-99b9-354496374816",
        "username": "frances@passbolt.com",
        "first_name": "Frances",
        "last_name": "Allen",
      },
      {
        "permissionId": "a932a3ce-82bc-59b6-ac4e-bf325435e534",
        "username": "grace@passbolt.com",
        "first_name": "Grace",
        "last_name": "Hopper",
      }
    ]
  }
];
