/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../../../react-extension/test/mock/MockPort";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    focusSearch: () => {},
    updateSearch: () => {},
    searchHistory: {},
    search: "",
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Mocked resources
 */
export /**
 * Mocked resources
 */
const mockResources = [
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
    "name": "esaie",
    "username": "test",
    "uri": "http:\/\/www.essaie.org\/",
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
