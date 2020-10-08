import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    groups: null
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
 * Mocked list of groups
 */
export const groupsMock = [
  {
    "id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
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
    }
  },
  {
    "id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
    "name": "Management",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "8e42567e-6e6e-54bc-b17b-0f5afde5b01c",
      "group_id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": false,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
    "name": "Marketing",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "03e26ff8-81d2-5b7f-87e4-99bbc40e1f95",
      "group_id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "c9c8fd8e-a0fa-53f0-967b-42edca3d91e4",
    "name": "Network",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": null
  },
  {
    "id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
    "name": "Operations",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "ad80b164-c30f-53e0-aac1-3040fa2f136d",
      "group_id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": false,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "4ff007f6-80ec-5bf7-8f0a-46a17178db6f",
    "name": "Procurement",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "15f486f6-4f5a-53f7-82ca-974e0be74e95",
      "group_id": "4ff007f6-80ec-5bf7-8f0a-46a17178db6f",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "a89b771e-62ab-5434-b2fa-950827439ac7",
    "name": "Quality assurance",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "99fabba9-e069-59e6-a3b6-775436322b21",
      "group_id": "a89b771e-62ab-5434-b2fa-950827439ac7",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
    "name": "Resource planning",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "d100fc5d-6685-50aa-897b-87ac816e28c8",
      "group_id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "faa73142-fb5e-5891-8b9f-4a00b3836fad",
    "name": "Sales",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "9c937007-8d53-532d-b02f-80f100139990",
      "group_id": "faa73142-fb5e-5891-8b9f-4a00b3836fad",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-08-17T16:37:13+00:00"
    }
  },
  {
    "id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
    "name": "Traffic",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "my_group_user": {
      "id": "c8f4bc84-2ea2-5509-8d6a-6b7378b7fffa",
      "group_id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": false,
      "created": "2020-08-17T16:37:13+00:00"
    }
  }
];
