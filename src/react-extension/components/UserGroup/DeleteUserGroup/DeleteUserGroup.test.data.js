import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    deleteGroupDialogProps: {
      group: mockGroup()
    },
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
 * Mocked a group
 */
export function mockGroup(group = {})  {
  return Object.assign({"id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
    "name": "Leadership team",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "2510a118-c838-5470-a0dd-aff268d4a2b6",
      "group_id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    },
    "groups_users": [
      {
        "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
        "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
        "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
        "is_admin": true,
        "created": "2020-08-17T16:37:15+00:00"
      },
      {
        "id": "285dc1c5-c358-507e-af2a-9201d9fed9f5",
        "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
        "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
        "is_admin": true,
        "created": "2020-08-17T16:37:15+00:00"
      },
    ]
  }, group);
}
