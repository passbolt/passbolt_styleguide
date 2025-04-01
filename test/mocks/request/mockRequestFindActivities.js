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

export default (type, id, options) => {
  if (type === 'Folder' && options.page === 1) {
    return [{
      "action_log_id": "c8f93853-290f-42aa-a290-a555c53bdeeb",
      "type": "Folders.updated",
      "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}},
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:26:27+00:00",
      "id": "47e27a62-0bf9-56ae-bd6a-913dd3b8e701"
    }, {
      "action_log_id": "6d1ac9b1-d846-4192-b603-e2abbd4e3695",
      "type": "Permissions.updated",
      "data": {
        "permissions": {
          "added": [{
            "id": "30a55f34-310e-4125-9566-bbd8869482ba",
            "type": 1,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": null,
            "group": {"id": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "name": "Accounting"}
          }],
          "updated": [{
            "id": "0f84dd8e-e9f3-433f-b96f-db704a30e21a",
            "type": 15,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "username": "admin@passbolt.com",
              "profile": {
                "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "first_name": "Admin",
                "last_name": "User",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }],
          "removed": [{
            "id": "6f7e12ec-c673-4865-a9c5-8d97c83d0d88",
            "type": 15,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": null,
            "group": {"id": "3feba74f-47da-5146-9d8f-76c7266c60ea", "name": "Management"}
          }]
        }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
      },
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:25:36+00:00",
      "id": "ef0472db-025e-5abd-b2b3-1559ca77125a"
    }, {
      "action_log_id": "079f2faf-1702-4b3c-b083-ba2cc3b74936",
      "type": "Folders.updated",
      "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting"}},
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:25:08+00:00",
      "id": "9ce8e86e-4a2c-5742-b068-dc96b6fbdcee"
    }, {
      "action_log_id": "c88219f7-28b1-4b3f-a31d-88accca08439",
      "type": "Permissions.updated",
      "data": {
        "permissions": {
          "added": [{
            "id": "6f7e12ec-c673-4865-a9c5-8d97c83d0d88",
            "type": 15,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": null,
            "group": {"id": "3feba74f-47da-5146-9d8f-76c7266c60ea", "name": "Management"}
          }],
          "updated": [{
            "id": "0f84dd8e-e9f3-433f-b96f-db704a30e21a",
            "type": 15,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
              "username": "admin@passbolt.com",
              "profile": {
                "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
                "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "first_name": "Admin",
                "last_name": "User",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }],
          "removed": [{
            "id": "35d93ba4-797f-413f-a29f-24537a57573d",
            "type": 7,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              "username": "betty@passbolt.com",
              "profile": {
                "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
                "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
                "first_name": "Betty",
                "last_name": "Holberton",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }, {
            "id": "7aa995bb-6115-43aa-8a90-4e78c2abc545",
            "type": 1,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "f848277c-5398-58f8-a82a-72397af2d450",
              "username": "ada@passbolt.com",
              "profile": {
                "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                "first_name": "Ada",
                "last_name": "Lovelace",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }]
        }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
      },
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:24:58+00:00",
      "id": "4c5622bb-7d31-5d9d-80d3-eb980acec285"
    }, {
      "action_log_id": "f2b91ae1-208c-4cc4-8adb-cc6028c8ea1f",
      "type": "Folders.updated",
      "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Management"}},
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:24:13+00:00",
      "id": "a4e5da20-ec7e-5b6e-82ad-627a9c82983a"
    }];
  } else if (type === 'Folder' && options.page === 2) {
    return [{
      "action_log_id": "838e3154-f6af-4c71-bf32-48e1f4f35897",
      "type": "Permissions.updated",
      "data": {
        "permissions": {
          "added": [{
            "id": "35d93ba4-797f-413f-a29f-24537a57573d",
            "type": 7,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              "username": "betty@passbolt.com",
              "profile": {
                "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
                "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
                "first_name": "Betty",
                "last_name": "Holberton",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }, {
            "id": "7aa995bb-6115-43aa-8a90-4e78c2abc545",
            "type": 1,
            "resource": null,
            "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"},
            "user": {
              "id": "f848277c-5398-58f8-a82a-72397af2d450",
              "username": "ada@passbolt.com",
              "profile": {
                "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                "first_name": "Ada",
                "last_name": "Lovelace",
                "created": "2020-06-13T08:38:56+00:00",
                "modified": "2020-06-13T08:38:56+00:00",
                "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
              },
              "last_logged_in": ""
            },
            "group": null
          }], "updated": [], "removed": []
        }, "resource": null, "folder": {"id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Accounting updated"}
      },
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:23:53+00:00",
      "id": "ed336d26-339d-59e8-9992-a072ce83198f"
    }, {
      "action_log_id": "a0f76358-6e93-4466-bb9e-ec2bca1605a0",
      "type": "Folders.created",
      "data": {"folder": {"folder_id": "2cce1173-30a6-44a2-ae2b-b865ea1411b0", "name": "Administration"}},
      "creator": {
        "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "username": "admin@passbolt.com",
        "profile": {
          "first_name": "Admin",
          "last_name": "User",
          "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
        },
        "last_logged_in": ""
      },
      "created": "2020-06-13T09:23:09+00:00",
      "id": "d8f5f5a0-86b2-5074-a54b-af7e198b8215"
    }];
  }
  else if (type === 'Resource' && options.page === 1) {
    return [
      {
        "action_log_id": "eebf0a92-18a4-440e-8aa8-799287fc2c26",
        "type": "Permissions.updated",
        "data": {
          "permissions": {
            "added": [{
              "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4223",
              "type": 1,
              "permissions_history_folder": null,
              "resource": {
                "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                "metadata": {
                  "name": "test_autocomplete_tag"
                }
              },
              "user": {
                "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                "username": "carol@passbolt.com",
                "profile": {
                  "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
                  "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "first_name": "Carol",
                  "last_name": "Shaw",
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
              },
              "group": null
            }],
            "updated": [
              {
                "id": "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
                "type": 1,
                "permissions_history_folder": null,
                "resource": {
                  "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                  "metadata": {
                    "name": "test_autocomplete_tag"
                  }
                },
                "user": {
                  "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
                  "username": "admin@passbolt.com",
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
                },
                "group": null
              },
              {
                "id": "79dc7e17-0d98-4cab-964e-c47422b709cb",
                "type": 15,
                "permissions_history_folder": null,
                "resource": {
                  "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                  "metadata": {
                    "name": "test_autocomplete_tag"
                  }
                },
                "user": {
                  "id": "f848277c-5398-58f8-a82a-72397af2d450",
                  "username": "ada@passbolt.com",
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
                },
                "group": null
              }
            ],
            "removed": [{
              "id": "79dc7e17-0d98-4cab-964e-c47422b709cc",
              "type": 15,
              "permissions_history_folder": null,
              "resource": {
                "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                "metadata": {
                  "name": "test_autocomplete_tag"
                }
              },
              "user": {
                "id": "f848277c-5398-58f8-a82a-72397af2d450",
                "username": "betty@passbolt.com",
                "profile": {
                  "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
                  "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
                  "first_name": "Betty",
                  "last_name": "Holberton",
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
              },
              "group": null
            }]
          },
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          },
          "folder": null
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-21T08:53:00+00:00",
        "id": "5b998a97-29fb-5b1d-86d7-a026867addec"
      },
      {
        "action_log_id": "6bb08a19-1dbc-48ed-bcfc-7e0e390d357e",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T10:23:06+00:00",
        "id": "8ca2c693-b719-58c8-b203-40d880487544"
      },
      {
        "action_log_id": "666f2f91-dbfc-4b0e-a1ce-6a92462b2159",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T10:23:04+00:00",
        "id": "085b1651-ef22-5906-9c61-70519434ba2c"
      },
      {
        "action_log_id": "0567541c-1b7c-4f71-afc3-fac0f0afd4f2",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T10:22:59+00:00",
        "id": "4421941c-668a-516c-90bd-042fc40bf494"
      },
      {
        "action_log_id": "c255b7bc-0695-4c94-be62-34477f733e66",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T10:22:55+00:00",
        "id": "479e5167-a6fb-5fab-a17c-ca1bc634d21f"
      }
    ];
  } else if (type === 'Resource' && options.page === 2) {
    return [
      {
        "action_log_id": "c2be5e30-c44c-4590-9fdb-aee55ca968ad",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T09:26:05+00:00",
        "id": "0917f58c-9cd6-5292-9c76-c800d34778a8"
      },
      {
        "action_log_id": "fdf41b26-3066-4d4b-938c-4150c4179164",
        "type": "Resource.Secrets.read",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T09:22:42+00:00",
        "id": "9d9b4cf4-a536-5a91-a5a8-2f3abac94901"
      },
      {
        "action_log_id": "1663d2e1-9d2b-4ccf-bd89-3b4ea7669088",
        "type": "Permissions.updated",
        "data": {
          "permissions": {
            "added": [
              {
                "id": "79dc7e17-0d98-4cab-964e-c47422b709cb",
                "type": 15,
                "permissions_history_folder": null,
                "resource": {
                  "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
                  "metadata": {
                    "name": "test_autocomplete_tag"
                  }
                },
                "user": {
                  "id": "f848277c-5398-58f8-a82a-72397af2d450",
                  "username": "ada@passbolt.com",
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
                },
                "group": null
              }
            ],
            "updated": [],
            "removed": []
          },
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          },
          "folder": null
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T08:05:17+00:00",
        "id": "dce7f9cd-e252-57a9-834b-a315d51d1a70"
      },
      {
        "action_log_id": "e65cd6d3-c738-478c-9f2d-f62224384c9e",
        "type": "Resources.created",
        "data": {
          "resource": {
            "id": "f9f79749-4bce-4e61-8016-68c942a8f2d9",
            "metadata": {
              "name": "test_autocomplete_tag"
            }
          }
        },
        "creator": {
          "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
          "username": "admin@passbolt.com",
          "profile": {
            "first_name": "Admin",
            "last_name": "User",
            "avatar": {
              "url": {
                "medium": "img\/avatar\/user_medium.png",
                "small": "img\/avatar\/user.png"
              }
            }
          },
          "last_logged_in": ""
        },
        "created": "2020-08-18T07:51:47+00:00",
        "id": "59dd653d-05f4-5d29-ab83-566cc41ab22d"
      }
    ];
  }
};
