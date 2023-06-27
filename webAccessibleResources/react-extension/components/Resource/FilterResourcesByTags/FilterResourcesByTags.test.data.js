import MockPort from "../../../test/mock/MockPort";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
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
 * @todo refactor using the defaultResourceWorkspaceContext from the context .data.test.js
 */
export function defaultResourceWorkspaceContext(context) {
  const defaultResourceWorkspaceContext = {
    filter: {
      type: ResourceWorkspaceFilterTypes.TAG,
      payload: {
        tag: {
          id: "1"
        }
      }
    }
  };
  return Object.assign(defaultResourceWorkspaceContext, context || {});
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    history: {
      push: jest.fn()
    },
    dragContext: {
      dragging: true,
      draggedItems: {
        resources: [resource]
      }
    }
  };
}

/**
 * Mocked list of tags
 */
export const tagsMock = [
  {
    id: "1",
    slug: "test",
    is_shared: false
  },
  {
    id: "2",
    slug: "slug",
    is_shared: false
  },
  {
    id: "3",
    slug: "#git",
    is_shared: true
  },
  {
    id: "4",
    slug: "gpg",
    is_shared: false
  },
  {
    id: "5",
    slug: "there’s always something to look at if you open your eyes!",
    is_shared: false
  }
];

export const resource = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http:\/\/www.apache.org\/",
  "description": "Apache is the world\u0027s most used web server software.",
  "deleted": false,
  "created": "2020-08-25T08:35:19+00:00",
  "modified": "2020-08-26T08:35:19+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "favorite": {
    "id": "56216dba-b6da-592b-87cb-fb5cbbd0a424",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "foreign_model": "Resource",
    "created": "2020-08-27T08:35:21+00:00",
    "modified": "2020-08-27T08:35:21+00:00"
  },
  "permission": {
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00"
  },
  "tags": [
    {
      "id": "1",
      "slug": "test",
      "is_shared": false
    },
  ],
  "folder_parent_id": null,
  "personal": false,
  "resource_type_id": "669f8c64-242a-59fb-92fc-81f660975fd3"
};
