/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

import {TEST_ROLE_ADMIN_ID, TEST_ROLE_USER_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default (userId) => {
  if(userId === "640ebc06-5ec1-5322-a1ae-6120ed2f3a74") {
    return {
      "errors": {
        "resources": {
          "sole_owner": [
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                  "aco": "Resource",
                  "aco_foreign_key": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-18T08:05:17+00:00",
                  "modified": "2020-08-21T08:53:00+00:00",
                  "group": null,
                  "user": {
                    "id": "f848277c-5398-58f8-a82a-72397af2d450",
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_ADMIN_ID,
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
            }
          ]
        },
        "folders": {
          "sole_owner": [
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_ADMIN_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_ADMIN_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_ADMIN_ID,
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
            },
            {
              "id": "3ed65efd-7c41-5906-9c02-71e2d95951da",
              "name": "Certificates",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "3a2611ed-cbcb-523f-b095-a130187173ae",
                  "aco": "Folder",
                  "aco_foreign_key": "3ed65efd-7c41-5906-9c02-71e2d95951da",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "dd0ed6d4-a7ff-5805-a56f-74562e3052c1",
                  "aco": "Folder",
                  "aco_foreign_key": "3ed65efd-7c41-5906-9c02-71e2d95951da",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
              "personal": false
            },
            {
              "id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
              "name": "Communication",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "35ac3960-fe92-5a8d-ba40-3628445679a5",
                  "aco": "Folder",
                  "aco_foreign_key": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "b42aa193-b9cd-5609-a099-0765aed796c1",
                  "aco": "Folder",
                  "aco_foreign_key": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
              "name": "Continous Integration",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "00e7e1df-b1f6-5fb1-b6d0-cbcb15fa80d8",
                  "aco": "Folder",
                  "aco_foreign_key": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "87e96312-3055-5d3d-a22f-84d3520cdd29",
                  "aco": "Folder",
                  "aco_foreign_key": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
              "personal": false
            },
            {
              "id": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
              "name": "Credit Cards",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "9e458b44-62bf-54fb-a4bc-dd83e71a1123",
                  "aco": "Folder",
                  "aco_foreign_key": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 7,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "4c07d022-8649-51e0-98d7-b1aaba7af92e",
                  "aco": "Folder",
                  "aco_foreign_key": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
              "name": "Human Resources",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "480c325f-ce9c-5086-8400-339877e06bd6",
                  "aco": "Folder",
                  "aco_foreign_key": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "3a8d088d-7c7d-5a60-816d-021310f5b97a",
                  "aco": "Folder",
                  "aco_foreign_key": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 1,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-18T14:49:04+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "299f613b-0706-570a-8636-956186384e0a",
              "name": "IT",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "8e1cb9e9-363b-57d0-b8b7-c85f5b84c57a",
                  "aco": "Folder",
                  "aco_foreign_key": "299f613b-0706-570a-8636-956186384e0a",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "57cd9753-18c1-5a8c-b85f-faf7abffa81d",
                  "aco": "Folder",
                  "aco_foreign_key": "299f613b-0706-570a-8636-956186384e0a",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "25acb455-5368-5055-8d56-36a4f30a81b3",
              "name": "Licenses",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "240ac5c6-de8a-5220-9d32-fb68d75675c2",
                  "aco": "Folder",
                  "aco_foreign_key": "25acb455-5368-5055-8d56-36a4f30a81b3",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "f947154a-7083-5182-99a9-be020d9b9f96",
                  "aco": "Folder",
                  "aco_foreign_key": "25acb455-5368-5055-8d56-36a4f30a81b3",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
              "personal": false
            },
            {
              "id": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
              "name": "Marketing",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "b72b5766-3de3-5209-a553-fd0a016dc151",
                  "aco": "Folder",
                  "aco_foreign_key": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "c7767ea2-7357-5a19-a614-dbef9fd4345b",
                  "aco": "Folder",
                  "aco_foreign_key": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
              "name": "Production",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "f0b404d0-ad8f-5094-81f4-5a83e7e40465",
                  "aco": "Folder",
                  "aco_foreign_key": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "71661ff6-7957-50ba-9d7c-3d3abcbb5a3f",
                  "aco": "Folder",
                  "aco_foreign_key": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
              "personal": false
            },
            {
              "id": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
              "name": "Sales",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "3bb8d63d-ab7c-5e76-b213-421891676ecd",
                  "aco": "Folder",
                  "aco_foreign_key": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "b961aadc-0fa5-535a-8295-ce01a4ae8d40",
                  "aco": "Folder",
                  "aco_foreign_key": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
              "name": "Social Networks",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "3726325c-bf8e-50ee-92ad-78f0ecda9f99",
                  "aco": "Folder",
                  "aco_foreign_key": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "56e08f6b-9e39-51d2-a1c2-604da3497362",
                  "aco": "Folder",
                  "aco_foreign_key": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
            },
            {
              "id": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
              "name": "Staging",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "0f41e5c0-59d5-5dc7-ac39-96ba53f45224",
                  "aco": "Folder",
                  "aco_foreign_key": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "ced38377-9348-55a3-8dd1-d90253bd4b70",
                  "aco": "Folder",
                  "aco_foreign_key": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
              "personal": false
            },
            {
              "id": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
              "name": "Travel",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "14eb12bc-56be-594f-aa44-c088ecd67207",
                  "aco": "Folder",
                  "aco_foreign_key": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "1679283f-ba3c-50fe-afbd-b3e0e3845b61",
                  "aco": "Folder",
                  "aco_foreign_key": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
              "id": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
              "name": "VAT",
              "created": "2020-02-01T00:00:00+00:00",
              "modified": "2020-02-01T00:00:00+00:00",
              "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "permissions": [
                {
                  "id": "7741b2dd-5f5e-5e14-9a0f-4c04eb0f031f",
                  "aco": "Folder",
                  "aco_foreign_key": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
                  "aro": "User",
                  "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
                    "role_id": TEST_ROLE_USER_ID,
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
                  "id": "5e93a367-4e8c-5aae-a4b7-884166b43ddf",
                  "aco": "Folder",
                  "aco_foreign_key": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
                  "aro": "User",
                  "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "type": 15,
                  "created": "2020-08-17T16:37:30+00:00",
                  "modified": "2020-08-17T16:37:30+00:00",
                  "group": null,
                  "user": {
                    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                    "role_id": TEST_ROLE_ADMIN_ID,
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
            }
          ]
        },
        "groups": {
          "sole_manager": [
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
                    "role_id": TEST_ROLE_USER_ID,
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
                    "role_id": TEST_ROLE_USER_ID,
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
          ]
        }
      }
    }
  } else {
    return {
      "errors" : null
    }
  }
};