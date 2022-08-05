import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import MockPort from "../../../test/mock/MockPort";
import DisplayUserDetailsGroups from "./DisplayUserDetailsGroups";


export default {
  title: 'Components/UserDetails/DisplayUserDetailsGroups',
  component: DisplayUserDetailsGroups
};

const context = {
  port: new MockPort(),
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
  },
  siteSettings: {
    getServerTimezone: () => ""
  },
  roles: [
    {
      id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
      name: 'Admin'
    }
  ],
  groups:  [
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
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
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
          "is_admin": false,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
    },
    {
      "id": "c9c8fd8e-a0fa-53f0-967b-42edca3d91e4",
      "name": "Network",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "my_group_user": null,
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
        "is_admin": true,
        "created": "2020-08-17T16:37:13+00:00"
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
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
        "is_admin": true,
        "created": "2020-08-17T16:37:13+00:00"
      },
      "groups_users": [
        {
          "id": "16714bc3-f96d-5a36-a10a-088094b5bcbc",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
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
        {
          "id": "38a03ec5-a014-5b36-8a94-4f7a8eb42c47",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "3cec78b0-88ec-51eb-bda4-6da61337215b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4810b1b0-1658-58c7-93ab-294223ab8fa5",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4c608094-17c6-5d2e-a8bc-18ebec06acaf",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "4e0a3d0d-7257-51e9-adab-6881f2cdce32",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "6367322a-1bb8-50b3-a012-d8a19e83e25e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "655295f0-2615-515b-8f76-a811ce5fa73c",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "33966163-6457-50a7-968e-836b904d7867",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "72642152-c184-5b55-8a5c-3e1944a9f076",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "74a82584-5d01-5f13-8caa-0e915fe82e3e",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "75aaa317-4b0c-51c9-af3c-f0b0161242c8",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "8923ec7e-0000-5e9c-b361-224ac0e63eba",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "c70e83e5-6f69-5cbe-a0dd-a108759f2069",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "d8514213-5a4a-5e4d-af21-c68b719c268d",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "e61b0160-4c50-5c1e-bee1-40cd0723d945",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "f239fdc8-455a-5426-8c68-ad85c8b53b34",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        },
        {
          "id": "fc727901-e0d3-5390-a459-6533819b963b",
          "group_id": "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
          "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
          "is_admin": true,
          "created": "2020-08-17T16:37:15+00:00"
        }
      ],
    }
  ]
};



const Template = args =>
  <AppContext.Provider value={context}>
    <div className="panel aside">
      <div className="detailed-information">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <DisplayUserDetailsGroups {...args} {...routerProps}/>}></Route>
        </MemoryRouter>
      </div>
    </div>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  userWorkspaceContext: {
    onDetailsLocked: () => {},
    details: {
      user: {
        "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "role": {
          "created": "2012-07-04T13:39:25+00:00",
          "description": "Logged in user",
          "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "modified": "2012-07-04T13:39:25+00:00",
          "name": "user"
        },
        "username": "dame@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-05-13T07:32:49+00:00",
        "modified": "2020-05-13T08:32:49+00:00",
        "profile": {
          "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "first_name": "Dame Steve",
          "last_name": "Shirley",
          "created": "2020-05-13T09:32:49+00:00",
          "modified": "2020-05-13T09:32:49+00:00",
          "avatar": {
            "id": "81100609-d60d-4dc8-a8c8-de45522eee1b",
            "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
            "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            "model": "Avatar",
            "filename": "dame steve.png",
            "filesize": 20676,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "f2695972b9009970ac85aae95f907693268cd249",
            "path": "Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.png",
            "adapter": "Local",
            "created": "2020-05-13T09:32:51+00:00",
            "modified": "2020-05-13T09:32:51+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.a99472d5.png",
              "small": "img\/public\/Avatar\/1b\/9d\/80\/81100609d60d4dc8a8c8de45522eee1b\/81100609d60d4dc8a8c8de45522eee1b.65a0ba70.png"
            }
          }
        },
        "__placeholder_last_logged_in__": "",
        "last_logged_in": "",
        is_mfa_enabled: false
      }
    }
  }
};
