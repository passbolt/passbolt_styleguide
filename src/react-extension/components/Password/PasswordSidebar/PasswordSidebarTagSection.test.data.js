import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
  };
}

/**
 * Mocked a resource
 */
export const resourceWithTagMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http://www.apache.org/",
  "description": "Apache is the world's most used web server software.",
  "deleted": false,
  "created": "2019-12-05T13:38:43+00:00",
  "modified": "2019-12-06T13:38:43+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permission": {
    type: 10
  },
  "tags": [
    {
      "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
      "slug": "#gg",
      "is_shared": true
    },
    {
      "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
      "slug": "#test",
      "is_shared": true
    },
    {
      "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
      "slug": "dede",
      "is_shared": false
    },
    {
      "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
      "slug": "ok",
      "is_shared": false
    },
    {
      "id": "f3ad54ab-54c1-457c-8f18-7c40dc4a37d9",
      "slug": "test",
      "is_shared": false
    },
    {
      "id": "5c6bb083-a499-40ff-a639-6593c87a24bd",
      "slug": "There’s always something to look at if you open your eyes",
      "is_shared": false
    }
  ]
};

/**
 * Mocked a resource with the last shared tag
 */
export const resourceWithLastSharedTagMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http://www.apache.org/",
  "description": "Apache is the world's most used web server software.",
  "deleted": false,
  "created": "2019-12-05T13:38:43+00:00",
  "modified": "2019-12-06T13:38:43+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permission": {
    type: 10
  },
  "tags": [
    {
      "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
      "slug": "#test",
      "is_shared": true
    },
    {
      "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
      "slug": "#gallifrey",
      "is_shared": false
    },
    {
      "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
      "slug": "tardis",
      "is_shared": true
    }
  ]
};

/**
 * Mocked a resource
 */
export const resourceWithNoTagMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http://www.apache.org/",
  "description": "Apache is the world's most used web server software.",
  "deleted": false,
  "created": "2019-12-05T13:38:43+00:00",
  "modified": "2019-12-06T13:38:43+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permission": {
    type: 15
  },
  "tags": []
};

/**
 * Mocked a tag list
 */
export const TagMock = [
  {
    "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
    "slug": "#gg",
    "is_shared": true
  },
  {
    "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
    "slug": "tardis",
    "is_shared": false
  },
  {
    "id": "0a710aba-4aa9-439b-a434-5f9f6c9f6442",
    "slug": "tarantino",
    "is_shared": false
  },
  {
    "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
    "slug": "ok",
    "is_shared": false
  }
];
