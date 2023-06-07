import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    users: mockUsers,
    groups: mockGroups,
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
export const mockUsers = [{
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
}, {
  "id": "f848277c-5398-58f8-a82a-72397af2d450",
  "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
  "role": {
    "created": "2012-07-04T13:39:25+00:00",
    "description": "Logged in user",
    "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "modified": "2012-07-04T13:39:25+00:00",
    "name": "user"
  },
  "username": "ada@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-03-13T09:32:49+00:00",
  "modified": "2020-04-13T09:32:49+00:00",
  "profile": {
    "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "first_name": "Ada",
    "last_name": "Lovelace",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "b5e7a332-595f-4e52-9591-79df27f8a978",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      "model": "Avatar",
      "filename": "ada.png",
      "filesize": 170049,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
      "path": "Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:52+00:00",
      "modified": "2020-05-13T09:32:52+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.a99472d5.png",
        "small": "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.65a0ba70.png"
      }
    },
  },
  "__placeholder_last_logged_in__": "2020-05-12T15:56:49+00:00",
  "last_logged_in": "2020-08-12T15:56:49+00:00"
}];

/**
 * Mocked a group
 */
export const mockGroups = [{
  "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
  "name": "Test",
  "deleted": false,
  "created": "2016-01-29T13:39:25+00:00",
  "modified": "2016-01-29T13:39:25+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "my_group_user": {
    "id": "2510a118-c838-5470-a0dd-aff268d4a2b6",
    "group_id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
    "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "is_admin": true,
    "created": "2020-08-17T16:37:13+00:00"
  },
  "groups_users": [
    {
      "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
      "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
      "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "is_admin": true,
      "created": "2020-08-17T16:37:15+00:00"
    },
    {
      "id": "285dc1c5-c358-507e-af2a-9201d9fed9f5",
      "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "is_admin": true,
      "created": "2020-08-17T16:37:15+00:00"
    },
  ],
}];

/**
 * Mocked folders conflict
 */
export const mockFoldersError = [
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
        "modified": "2020-08-17T16:37:30+00:00"
      },
      {
        "id": "17336097-cd30-57ab-bc40-89b31bcc513f",
        "aco": "Folder",
        "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00"
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
        "modified": "2020-08-17T16:37:30+00:00"
      },
      {
        "id": "875cb5d4-fa9a-57cb-908d-3721264e98b1",
        "aco": "Folder",
        "aco_foreign_key": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00"
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
        "modified": "2020-08-17T16:37:30+00:00"
      },
      {
        "id": "64e2a52c-2a3b-5a0d-88f9-4b6776fae07c",
        "aco": "Folder",
        "aco_foreign_key": "7ecd7376-8540-58c1-88d9-678c027d464a",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 15,
        "created": "2020-08-17T16:37:30+00:00",
        "modified": "2020-08-17T16:37:30+00:00"
      }
    ],
    "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    "personal": false
  }
];

/**
 * Mocked resources conflict
 */
export const mockResourcesError = [
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
        "modified": "2020-08-17T16:37:15+00:00"
      },
      {
        "id": "898ce1d0-601f-5194-976b-147a680dd472",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 1,
        "created": "2020-08-17T16:37:15+00:00",
        "modified": "2020-08-17T16:37:15+00:00"
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
        "modified": "2020-08-21T08:53:00+00:00"
      },
      {
        "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
        "aco": "Resource",
        "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "aro": "User",
        "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "type": 1,
        "created": "2020-08-18T07:51:47+00:00",
        "modified": "2020-08-21T08:53:00+00:00"
      },
      {
        "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
        "aco": "Resource",
        "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        "aro": "Group",
        "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
        "type": 1,
        "created": "2020-08-18T07:51:47+00:00",
        "modified": "2020-08-21T08:53:00+00:00"
      }
    ],
    "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "personal": false
  }
];

/**
 * Mocked groups conflict
 */
export const mockGroupsError = [
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
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "is_admin": true,
        "created": "2020-08-17T16:37:13+00:00"
      },
      {
        "id": "a932a3ce-82bc-59b6-ac4e-bf325435e534",
        "group_id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "is_admin": false,
        "created": "2020-08-17T16:37:13+00:00"
      }
    ]
  }
];
