/**
 * return LoggedInUser get request fetch
 */
import {TEST_ROLE_USER_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default () => {
  return {
    "header": {
      "id": "3130fc97-c763-4afc-965d-379d6e288646",
      "status": "success",
      "servertime": 1605086054,
      "title": "app__dryRun_success",
      "action": "4d7a3fb5-3ff3-5a84-bb23-5b8e620b6620",
      "message": "The simulation was done successfully.",
      "url": "\/directorysync\/synchronize\/dry-run.json?api-version=v2",
      "code": 200
    },
    "body": {
      "users": [
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user ada@passbolt.com was mapped with an existing user in passbolt.",
          "model": "Users",
          "data": {
            "id": "f848277c-5398-58f8-a82a-72397af2d450",
            "username": "ada@passbolt.com",
            "active": true,
            "deleted": false,
            "created": "2020-09-02T14:33:25+00:00",
            "modified": "2020-10-02T14:33:25+00:00",
            "last_logged_in": null
          },
          "action": "create",
          "status": "sync",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user betty@passbolt.com was mapped with an existing user in passbolt.",
          "model": "Users",
          "data": {
            "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            "username": "betty@passbolt.com",
            "active": true,
            "deleted": false,
            "created": "2020-10-19T14:33:25+00:00",
            "modified": "2020-10-26T14:33:25+00:00",
            "last_logged_in": null
          },
          "action": "create",
          "status": "sync",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user zoe@passbolt.com was successfully added to passbolt.",
          "model": "Users",
          "data": {
            "username": "zoe@passbolt.com",
            "profile": {
              "id": "be3bf0d8-6f65-408b-ab29-b342764c41af",
              "user_id": "8b70d987-d26d-4eb2-a5ef-61805dab2162",
              "first_name": "Zoe",
              "last_name": "Logos",
              "created": "2020-11-11T09:14:12+00:00",
              "modified": "2020-11-11T09:14:12+00:00",
              "avatar": {
                "url": {
                  "medium": "img\/avatar\/user_medium.png",
                  "small": "img\/avatar\/user.png"
                }
              }
            },
            "role_id": TEST_ROLE_USER_ID,
            "deleted": false,
            "created": "2020-11-11T09:14:12+00:00",
            "modified": "2020-11-11T09:14:12+00:00",
            "id": "8b70d987-d26d-4eb2-a5ef-61805dab2162",
            "last_logged_in": null
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The previously deleted user sofia@passbolt.com was not re-added to passbolt.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user undefined could not be added because of data validation issues.",
          "model": "Users",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        },
        {
          "message": "The user max@passbolt.com was successfully added to passbolt.",
          "model": "Users",
          "data": {
            "username": "max@passbolt.com",
            "profile": {
              "id": "8a990683-bcd2-4939-9c3f-0ef171347d0f",
              "user_id": "a028287d-0b83-4d32-a412-2c0df2dd27c4",
              "first_name": "Maxence",
              "last_name": "Zanardo",
              "created": "2020-11-11T09:14:12+00:00",
              "modified": "2020-11-11T09:14:12+00:00",
              "avatar": {
                "url": {
                  "medium": "img\/avatar\/user_medium.png",
                  "small": "img\/avatar\/user.png"
                }
              }
            },
            "role_id": TEST_ROLE_USER_ID,
            "deleted": false,
            "created": "2020-11-11T09:14:12+00:00",
            "modified": "2020-11-11T09:14:12+00:00",
            "id": "a028287d-0b83-4d32-a412-2c0df2dd27c4",
            "last_logged_in": null
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:12+00:00",
          "version": "2"
        }
      ],
      "groups": [
        {
          "message": "The group Administrators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Administrators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "869c8db1-df88-41ef-bf20-5fd2e31e8836",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "1652c26f-4360-4e96-a9ee-0310c42d3b8d"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "869c8db1-df88-41ef-bf20-5fd2e31e8836"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "73264e61-9522-4ce7-9dea-975e80034855",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "a02a2012-0fea-4f7e-a880-8d57913c47a0"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "73264e61-9522-4ce7-9dea-975e80034855"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Guests was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Guests",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "93e0653a-b4c5-4529-9210-877c0e0b4b9b",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "7ce8a68b-d227-4e53-a29c-ca0c4d00647e"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "93e0653a-b4c5-4529-9210-877c0e0b4b9b"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Print Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Print Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "f511e93d-346f-4d98-a541-81d3eea41671",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "338d27d6-3f15-4a05-8c71-5739c48ada86"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "f511e93d-346f-4d98-a541-81d3eea41671"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Backup Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Backup Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "6774dda0-c795-452b-a2c1-86df1d1c82f6",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "42f3222a-fd49-49a8-9f4d-225ed0f6369a"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "6774dda0-c795-452b-a2c1-86df1d1c82f6"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Replicator was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Replicator",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ea134684-88c6-4e0d-98e3-f4a2ceb66171",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "9dbcd503-405e-4cf4-9c33-dc39ecd3c220"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "ea134684-88c6-4e0d-98e3-f4a2ceb66171"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Remote Desktop Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Remote Desktop Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "51d617c8-e83f-443f-954b-3e4cfd460f5c",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "650ce9e8-f2be-4cda-98dc-53b134f3906d"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "51d617c8-e83f-443f-954b-3e4cfd460f5c"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Network Configuration Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Network Configuration Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "bbbea2d9-5ace-4a20-8fe8-cba49ccfbd4f",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "dca9f2b9-2a67-45b9-8f7e-ad5631b3e462"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "bbbea2d9-5ace-4a20-8fe8-cba49ccfbd4f"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Performance Monitor Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Performance Monitor Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "39c018cc-ead1-468b-8f09-62f29a51bb3d",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "6f9eb058-f557-4b17-bc78-7456ab4bc401"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "39c018cc-ead1-468b-8f09-62f29a51bb3d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Performance Log Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Performance Log Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "0d02639e-47ae-4c44-b42a-395be618cf46",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "25677d12-ccdc-45f2-83bb-725851807f43"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "0d02639e-47ae-4c44-b42a-395be618cf46"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Distributed COM Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Distributed COM Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "3ba6681f-3353-4625-a786-5c7cd41c134a",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "cf014e83-fd5c-44d5-a0d7-93b6ab286c4a"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "3ba6681f-3353-4625-a786-5c7cd41c134a"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group IIS_IUSRS was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "IIS_IUSRS",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ee18b607-c686-4b6c-8eec-8c846c6863bd",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "693683b6-f7d0-4bec-b539-251518e24c0c"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "ee18b607-c686-4b6c-8eec-8c846c6863bd"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Cryptographic Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Cryptographic Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "b97d67d8-8772-4941-9a2d-417453c83e59",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "13032620-be66-4d89-9a2e-d8ca53fa5ceb"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "b97d67d8-8772-4941-9a2d-417453c83e59"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Event Log Readers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Event Log Readers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ed55d1bc-1de0-415d-a73b-96c14e1adc4d",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "dcfb25b7-dc9a-42ee-8bc7-cf166bdd8e1a"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "ed55d1bc-1de0-415d-a73b-96c14e1adc4d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Certificate Service DCOM Access was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Certificate Service DCOM Access",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "95776c8d-fd1b-4dea-b3f1-d4a50f52e0c8",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "038fa222-bcd2-447a-a346-b5fac10ac2cb"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "95776c8d-fd1b-4dea-b3f1-d4a50f52e0c8"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group RDS Remote Access Servers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "RDS Remote Access Servers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "9b4307c8-df30-49c5-8f66-82b17966af9d",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "dff78d05-d401-4443-b3c6-30832c003700"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "9b4307c8-df30-49c5-8f66-82b17966af9d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group RDS Endpoint Servers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "RDS Endpoint Servers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "903ed18c-f80f-48b4-805c-5467485fb3bf",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "09925ec9-8d25-4714-a067-8c8f8ea88e50"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "903ed18c-f80f-48b4-805c-5467485fb3bf"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group RDS Management Servers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "RDS Management Servers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "1f94f937-b034-4a4c-9266-64fa857f5593",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "2ae1b660-dd14-45b7-9a28-d50a041c7bd0"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "1f94f937-b034-4a4c-9266-64fa857f5593"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Hyper-V Administrators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Hyper-V Administrators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "8d10d67f-2615-43ee-8e04-2eb50ecb885a",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "7ddb3385-55a0-41cf-a643-dd23fde08756"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "8d10d67f-2615-43ee-8e04-2eb50ecb885a"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Access Control Assistance Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Access Control Assistance Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7aaec203-5afe-470e-8da4-a66173cd6cd2",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "cb372600-e65e-43a4-a2ec-8bf0135cdabb"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "7aaec203-5afe-470e-8da4-a66173cd6cd2"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:13+00:00",
          "version": "2"
        },
        {
          "message": "The group Remote Management Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Remote Management Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "67f9c07c-e89d-497b-bd7c-c7dc95147eaf",
                "created": "2020-11-11T09:14:13+00:00",
                "id": "2a112138-e955-4e71-9349-45fa7f872583"
              }
            ],
            "created": "2020-11-11T09:14:13+00:00",
            "modified": "2020-11-11T09:14:13+00:00",
            "id": "67f9c07c-e89d-497b-bd7c-c7dc95147eaf"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group System Managed Accounts Group was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "System Managed Accounts Group",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7e293e50-4fe6-4060-a40a-e0232325d5c1",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "9262315c-c2c9-44f7-a66c-2907fd60c87d"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "7e293e50-4fe6-4060-a40a-e0232325d5c1"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Storage Replica Administrators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Storage Replica Administrators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7bf02cd6-7ed1-4c3a-86b9-0e23082ada76",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "31777f18-698a-4c14-909f-e0ce92e64445"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "7bf02cd6-7ed1-4c3a-86b9-0e23082ada76"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Domain Computers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Domain Computers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "62effff5-1351-4caa-8917-f7a3df2bd833",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "f2057493-ed23-462d-b93a-1e030e89208a"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "62effff5-1351-4caa-8917-f7a3df2bd833"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Domain Controllers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Domain Controllers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ca8a8e3e-0508-4950-b865-3b086f52285d",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "fee524b8-1691-42ef-ac0c-8a6223f28373"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "ca8a8e3e-0508-4950-b865-3b086f52285d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Schema Admins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Schema Admins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "f6511b22-9849-4ad6-b473-b91428cc7271",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "dcf1e853-8750-402a-bd4b-070d5a95b7eb"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "f6511b22-9849-4ad6-b473-b91428cc7271"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Enterprise Admins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Enterprise Admins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "8ff587c0-6b7f-4fd6-aae0-b9a82798b0d8",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "b53103a7-6d42-460c-abc5-816476497b34"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "8ff587c0-6b7f-4fd6-aae0-b9a82798b0d8"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Cert Publishers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Cert Publishers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "0e3f2a9c-ea60-4ef8-8a6f-bd36a305196b",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "9fd450cf-df54-4196-8a31-53ad88bc7015"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "0e3f2a9c-ea60-4ef8-8a6f-bd36a305196b"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Domain Admins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Domain Admins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7887204e-24c4-4a33-a2d8-2fd4aea713d4",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "bfa3790d-7be6-4f2f-a2df-2e330a9c03cc"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "7887204e-24c4-4a33-a2d8-2fd4aea713d4"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Domain Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Domain Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "80a68e29-63bf-4bbc-a64b-86d94d95f16e",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "b7668f8c-9e78-42a6-8c68-8c9869f2cbe4"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "80a68e29-63bf-4bbc-a64b-86d94d95f16e"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Domain Guests was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Domain Guests",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "2b76c024-8bcd-41ba-8e5c-12f8af7e5131",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "baac7786-634d-4d1f-b6c0-88dab0862173"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "2b76c024-8bcd-41ba-8e5c-12f8af7e5131"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Group Policy Creator Owners was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Group Policy Creator Owners",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "2a34544f-89dd-42a7-94ca-97dc2785c165",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "d28ba505-252e-470b-94fc-2e243d760631"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "2a34544f-89dd-42a7-94ca-97dc2785c165"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group RAS and IAS Servers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "RAS and IAS Servers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "20e5f4a8-ea03-468b-bd3d-4afe14b85fca",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "14ad949d-3a01-4330-933c-fa607e257935"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "20e5f4a8-ea03-468b-bd3d-4afe14b85fca"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Server Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Server Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "205476d5-f2b7-4c30-95af-b487c2db205f",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "97777db4-0d56-49d4-8101-53e75f1f0ae8"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "205476d5-f2b7-4c30-95af-b487c2db205f"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Account Operators was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Account Operators",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "25be58b6-1972-4dbd-80b9-a65cd7e980a4",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "59690290-adcf-4158-9bf2-26e1e186fa39"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "25be58b6-1972-4dbd-80b9-a65cd7e980a4"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Pre-Windows 2000 Compatible Access was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Pre-Windows 2000 Compatible Access",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "334b12d7-1faa-4159-a5de-6273dfe705ae",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "410a62c1-9c80-4016-9d45-57ac40e7aeec"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "334b12d7-1faa-4159-a5de-6273dfe705ae"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Incoming Forest Trust Builders was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Incoming Forest Trust Builders",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "cc4e9a10-dc93-4d91-8737-cc4c46218607",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "aa4e2c26-1815-4921-9fe2-0c5eaae74786"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "cc4e9a10-dc93-4d91-8737-cc4c46218607"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Windows Authorization Access Group was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Windows Authorization Access Group",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "0e7c3c5a-9c68-4537-b8f3-d439d56134bf",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "f843573b-cace-4a64-b02a-5d2f78e40051"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "0e7c3c5a-9c68-4537-b8f3-d439d56134bf"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Terminal Server License Servers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Terminal Server License Servers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "b94648e0-383f-4802-ac73-20a86988b9b0",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "205fa0ac-ce54-4c79-8af3-3067583456aa"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "b94648e0-383f-4802-ac73-20a86988b9b0"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Allowed RODC Password Replication Group was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Allowed RODC Password Replication Group",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "59c1e9a9-c4a4-4fd8-8c31-b84c2953efa6",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "390569be-1cae-4e10-bdad-96e0987f646a"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "59c1e9a9-c4a4-4fd8-8c31-b84c2953efa6"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Denied RODC Password Replication Group was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Denied RODC Password Replication Group",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "9b35d0f1-9943-40c5-9509-674f5cc6d6d2",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "61c67699-0a5d-4366-9d01-3968062ba814"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "9b35d0f1-9943-40c5-9509-674f5cc6d6d2"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Read-only Domain Controllers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Read-only Domain Controllers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "d0947ad9-b52c-43ee-8b12-dd18a7b9562d",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "017f5992-f823-4501-adb8-c7c2f9964bc7"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "d0947ad9-b52c-43ee-8b12-dd18a7b9562d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Enterprise Read-only Domain Controllers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Enterprise Read-only Domain Controllers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "17010396-da90-4da6-8c49-bc7c5cc705b1",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "e384db1d-7606-484a-aedf-acde8f64d881"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "17010396-da90-4da6-8c49-bc7c5cc705b1"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Cloneable Domain Controllers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Cloneable Domain Controllers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "b8144f67-23af-43d6-91a6-13958941c83e",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "8f93483d-143a-4c4e-93ed-d37fae60c0c0"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "b8144f67-23af-43d6-91a6-13958941c83e"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Protected Users was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Protected Users",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "30a7ab47-2904-45e3-bee7-56a46c958380",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "badb38c2-5ea3-4064-8c1f-ee78fc254ead"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "30a7ab47-2904-45e3-bee7-56a46c958380"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Key Admins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Key Admins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "8196bb7b-3468-41a3-8443-7688f4625cd9",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "39fd5817-7efc-4927-a0ce-3f96ed547e56"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "8196bb7b-3468-41a3-8443-7688f4625cd9"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Enterprise Key Admins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Enterprise Key Admins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "a966fc29-8c34-47e3-b5bf-970dc667de7f",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "77a7d0d1-0057-4512-b20d-956ebbb7aac7"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "a966fc29-8c34-47e3-b5bf-970dc667de7f"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group DnsAdmins was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "DnsAdmins",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "e4f9fb25-19cc-4152-b748-a756ec32adec",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "7db2691d-c68e-41bb-bb38-1805a66734e8"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "e4f9fb25-19cc-4152-b748-a756ec32adec"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group DnsUpdateProxy was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "DnsUpdateProxy",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "6207f9d0-0c88-4c59-b052-a9b865fadbdf",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "bfcbe094-af5b-4ef3-9e74-365defecec45"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "6207f9d0-0c88-4c59-b052-a9b865fadbdf"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Finance was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Finance",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "f5e2637a-1e79-4937-be72-54b1f1981f0a",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "6a3d7cf5-1f00-4f1e-b4c0-7e1e9cfe5403"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "f5e2637a-1e79-4937-be72-54b1f1981f0a"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The user zoe@passbolt.com could not be added to the group Finance because he has not yet activated his account.",
          "model": "GroupsUsers",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Finance",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "f5e2637a-1e79-4937-be72-54b1f1981f0a",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "6a3d7cf5-1f00-4f1e-b4c0-7e1e9cfe5403"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "f5e2637a-1e79-4937-be72-54b1f1981f0a"
          },
          "action": "create",
          "status": "ignore",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Operations could not be mapped with an existing group in passbolt because it was created after.",
          "model": "Groups",
          "data": [],
          "action": "create",
          "status": "error",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group DevOps was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "DevOps",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "3518e14a-1665-4baf-9068-7701511e2abd",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "68f189ca-5c6d-4ffa-8105-decfb616e097"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "3518e14a-1665-4baf-9068-7701511e2abd"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Test1 was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Test1",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "dd365a16-69f5-4687-9bce-350eddfa654e",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "68496f40-6448-48de-a835-675319c443aa"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "dd365a16-69f5-4687-9bce-350eddfa654e"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Test2 was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Test2",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7da1dd34-1e43-491f-8178-be57c4d9901e",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "ecec90e1-6231-46a1-b4c5-546092c98c80"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "7da1dd34-1e43-491f-8178-be57c4d9901e"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The user ada@passbolt.com was successfully added to the group Test2.",
          "model": "GroupsUsers",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Test2",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "7da1dd34-1e43-491f-8178-be57c4d9901e",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "ecec90e1-6231-46a1-b4c5-546092c98c80"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "7da1dd34-1e43-491f-8178-be57c4d9901e"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group TestGroup was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "TestGroup",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "bf5744e0-6e37-4f62-a9ce-0d41ef78dc6a",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "fec5d73c-f509-43b0-a190-25d8ee244d2b"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "bf5744e0-6e37-4f62-a9ce-0d41ef78dc6a"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The user ada@passbolt.com was successfully added to the group TestGroup.",
          "model": "GroupsUsers",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "TestGroup",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "bf5744e0-6e37-4f62-a9ce-0d41ef78dc6a",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "fec5d73c-f509-43b0-a190-25d8ee244d2b"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "bf5744e0-6e37-4f62-a9ce-0d41ef78dc6a"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Administration was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Administration",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "1b5c09f3-6375-4db9-b09d-d1a763f7646d",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "3b77a13e-16f4-460d-803e-4e127f53d3b2"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "1b5c09f3-6375-4db9-b09d-d1a763f7646d"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group Developers was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Developers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ec131912-3c8e-4483-87c4-377195a063da",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "28da8be9-1a9a-4438-91bd-3d70271e55f8"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "ec131912-3c8e-4483-87c4-377195a063da"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The user ada@passbolt.com was successfully added to the group Developers.",
          "model": "GroupsUsers",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "Developers",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "ec131912-3c8e-4483-87c4-377195a063da",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "28da8be9-1a9a-4438-91bd-3d70271e55f8"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "ec131912-3c8e-4483-87c4-377195a063da"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        },
        {
          "message": "The group MyParentGroup was successfully added to passbolt.",
          "model": "Groups",
          "data": {
            "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
            "deleted": false,
            "name": "MyParentGroup",
            "groups_users": [
              {
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "is_admin": true,
                "group_id": "edcf981b-a430-4d4e-8f6d-ece08c2f7373",
                "created": "2020-11-11T09:14:14+00:00",
                "id": "defd9bc5-3db1-45db-bb57-79177df84988"
              }
            ],
            "created": "2020-11-11T09:14:14+00:00",
            "modified": "2020-11-11T09:14:14+00:00",
            "id": "edcf981b-a430-4d4e-8f6d-ece08c2f7373"
          },
          "action": "create",
          "status": "success",
          "created": "2020-11-11T09:14:14+00:00",
          "version": "2"
        }
      ]
    }
  }
}