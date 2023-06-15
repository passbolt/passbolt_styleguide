/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../test/mock/MockPort";
import {TEST_ROLE_ADMIN_ID, TEST_ROLE_USER_ID} from "../../shared/models/entity/role/role.test.data";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    siteSettings: {
      canIUse: () => true
    },
    users,
    roles,
    groups
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 */
export function defaultProps() {
  return {};
}

/**
 * Default user workspace context
 * @param {Object} data Context properties to override
 * @return {Object}
 */
export function defaultUserWorkspaceContext(data = {}) {
  const _default = {
    onUserSelected: {
      single: jest.fn()
    }
  };
  return Object.assign(_default, data);
}

/**
 * Default users
 */
export const users = [{
  "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
  "role_id": TEST_ROLE_USER_ID,
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
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
  "role_id": TEST_ROLE_USER_ID,
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
}, {
  "id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
  "role_id": TEST_ROLE_USER_ID,
  "username": "edith@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:30:49+00:00",
  "modified": "2020-05-13T09:31:49+00:00",
  "profile": {
    "id": "08710a74-8996-5f60-b5db-ffabfa85bfe6",
    "user_id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "first_name": "Edith",
    "last_name": "Clarke",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "9bdfae1c-8c4c-4c39-8025-9f4b064397e6",
      "user_id": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "foreign_key": "08710a74-8996-5f60-b5db-ffabfa85bfe6",
      "model": "Avatar",
      "filename": "edith.png",
      "filesize": 20462,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "6a508422b1765eaa13c28f4611340414622f9cf9",
      "path": "Avatar\/38\/5a\/fe\/9bdfae1c8c4c4c3980259f4b064397e6\/9bdfae1c8c4c4c3980259f4b064397e6.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:50+00:00",
      "modified": "2020-05-13T09:32:50+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/38\/5a\/fe\/9bdfae1c8c4c4c3980259f4b064397e6\/9bdfae1c8c4c4c3980259f4b064397e6.a99472d5.png",
        "small": "img\/public\/Avatar\/38\/5a\/fe\/9bdfae1c8c4c4c3980259f4b064397e6\/9bdfae1c8c4c4c3980259f4b064397e6.65a0ba70.png"
      }
    }
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
  "role_id": TEST_ROLE_USER_ID,
  "username": "betty@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-04-29T09:32:49+00:00",
  "modified": "2020-05-06T09:32:49+00:00",
  "profile": {
    "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
    "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "first_name": "Betty",
    "last_name": "Holberton",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "a8c648a9-ee7f-416d-9ad1-322e8ef28c0b",
      "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
      "model": "Avatar",
      "filename": "betty.png",
      "filesize": 115942,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
      "path": "Avatar\/c2\/6f\/26\/a8c648a9ee7f416d9ad1322e8ef28c0b\/a8c648a9ee7f416d9ad1322e8ef28c0b.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:52+00:00",
      "modified": "2020-05-13T09:32:52+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/c2\/6f\/26\/a8c648a9ee7f416d9ad1322e8ef28c0b\/a8c648a9ee7f416d9ad1322e8ef28c0b.a99472d5.png",
        "small": "img\/public\/Avatar\/c2\/6f\/26\/a8c648a9ee7f416d9ad1322e8ef28c0b\/a8c648a9ee7f416d9ad1322e8ef28c0b.65a0ba70.png"
      }
    }
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "f848277c-5398-58f8-a82a-72397af2d450",
  "role_id": TEST_ROLE_USER_ID,
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
}, {
  "id": "887422c0-bef6-59a7-bbda-84c253ee0848",
  "role_id": TEST_ROLE_USER_ID,
  "username": "frances@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "543865d0-5f9b-598d-928b-2811f3cae77f",
    "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
    "first_name": "Frances",
    "last_name": "Allen",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "ede0c1b7-d1e5-4656-9d20-3c287795db7e",
      "user_id": "887422c0-bef6-59a7-bbda-84c253ee0848",
      "foreign_key": "543865d0-5f9b-598d-928b-2811f3cae77f",
      "model": "Avatar",
      "filename": "frances.png",
      "filesize": 283883,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "95af1b264a94de0b75af95e75030832245afc8bf",
      "path": "Avatar\/28\/72\/68\/ede0c1b7d1e546569d203c287795db7e\/ede0c1b7d1e546569d203c287795db7e.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:51+00:00",
      "modified": "2020-05-13T09:32:51+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/28\/72\/68\/ede0c1b7d1e546569d203c287795db7e\/ede0c1b7d1e546569d203c287795db7e.a99472d5.png",
        "small": "img\/public\/Avatar\/28\/72\/68\/ede0c1b7d1e546569d203c287795db7e\/ede0c1b7d1e546569d203c287795db7e.65a0ba70.png"
      }
    }
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
  "role_id": TEST_ROLE_USER_ID,
  "username": "kathleen@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "90c45240-00ae-5aea-92a1-4b5488d5ec11",
    "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
    "first_name": "Kathleen",
    "last_name": "Antonelli",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "eebb84ba-2189-47e9-857b-baddbbf15f3e",
      "user_id": "32d29702-85e2-539d-98ac-6abfa7aadf01",
      "foreign_key": "90c45240-00ae-5aea-92a1-4b5488d5ec11",
      "model": "Avatar",
      "filename": "kathleen.png",
      "filesize": 53376,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "95474e9309c7c7f14fbe5c3b0f943bd145c0a366",
      "path": "Avatar\/f8\/2e\/87\/eebb84ba218947e9857bbaddbbf15f3e\/eebb84ba218947e9857bbaddbbf15f3e.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:51+00:00",
      "modified": "2020-05-13T09:32:51+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/f8\/2e\/87\/eebb84ba218947e9857bbaddbbf15f3e\/eebb84ba218947e9857bbaddbbf15f3e.a99472d5.png",
        "small": "img\/public\/Avatar\/f8\/2e\/87\/eebb84ba218947e9857bbaddbbf15f3e\/eebb84ba218947e9857bbaddbbf15f3e.65a0ba70.png"
      }
    }
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss12@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "0615ba9d-e88c-5b48-841a-98dd2a5be0c3",
    "user_id": "ecc26246-0331-5297-ac16-1c1e57d22ebd",
    "first_name": "jav\u0026#x0A;ascript:document.write(\u0027XSS13\u0027);",
    "last_name": "jav\u0026#x0A;ascript:document.write(\u0027XSS13\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
  "role_id": TEST_ROLE_USER_ID,
  "username": "nancy@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "0c39d45d-5355-53d8-ab10-8375ce3425da",
    "user_id": "e7fa0375-61df-5dbc-9e42-e0d363bd0ecf",
    "first_name": "Nancy",
    "last_name": "Leveson",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss8@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "0f713577-7e19-5b6c-8844-1e0d6f8f2878",
    "user_id": "4404acbb-8066-5910-a5e1-c3eb0e63dfff",
    "first_name": "\u0026#x6A\u0026#x61\u0026#x76\u0026#x61\u0026#x73\u0026#x63\u0026#x72\u0026#x69\u0026#x70\u0026#x74\u0026#x3A\u0026#x64\u0026#x6f\u0026#x63\u0026#x75\u0026#x6d\u0026#x65\u0026#x6e\u0026#x74\u0026#x2e\u0026#x77\u0026#x72\u0026#x69\u0026#x74\u0026#x65\u0026#x27\u0026#x58\u0026#x53\u0026#x53\u0026#x39\u0026#x27\u0026#x29",
    "last_name": "\u0026#x6A\u0026#x61\u0026#x76\u0026#x61\u0026#x73\u0026#x63\u0026#x72\u0026#x69\u0026#x70\u0026#x74\u0026#x3A\u0026#x64\u0026#x6f\u0026#x63\u0026#x75\u0026#x6d\u0026#x65\u0026#x6e\u0026#x74\u0026#x2e\u0026#x77\u0026#x72\u0026#x69\u0026#x74\u0026#x65\u0026#x27\u0026#x58\u0026#x53\u0026#x53\u0026#x39\u0026#x27\u0026#x29",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
  "role_id": TEST_ROLE_USER_ID,
  "username": "lynne@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "12265c99-7d79-5b69-b63d-bb28cd29c6bd",
    "user_id": "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
    "first_name": "Lynne",
    "last_name": "Jolitz",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "92946500-2940-54ff-889a-3da69afe5078",
  "role_id": TEST_ROLE_USER_ID,
  "username": "joan@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "1fcdc377-3759-5dff-8b91-3b5d00cec999",
    "user_id": "92946500-2940-54ff-889a-3da69afe5078",
    "first_name": "Joan",
    "last_name": "Clarke",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss14@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "2d314443-3968-505b-b636-4b3635692a5b",
    "user_id": "bab9c9c5-3b61-5594-9855-b352fbbc348c",
    "first_name": "\u0022\u003E\u003Cscript\u003Edocument.write(\u0027xss15\u0027)\u003C\/script\u003E",
    "last_name": "\u0022\u003E\u003Cscript\u003Edocument.write(\u0027xss15\u0027)\u003C\/script\u003E",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "5b81d798-df23-5d02-9f49-709851a4501f",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss2@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "2fd90402-c571-5d95-a929-7f17c6012d99",
    "user_id": "5b81d798-df23-5d02-9f49-709851a4501f",
    "first_name": "javascript:document.write(\u0022XSS3\u0022)",
    "last_name": "javascript:document.write(\u0022XSS3\u0022)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
  "role_id": TEST_ROLE_USER_ID,
  "username": "hedy@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "403c7bdf-068d-585a-8fc0-2049a131f8e6",
    "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
    "first_name": "Hedy",
    "last_name": "Lamarr",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss16@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "4a7ffe65-3e66-595f-9500-60541c32d2ac",
    "user_id": "2eb86906-983b-59dc-ba9f-6e8e7754c416",
    "first_name": "\u0026{document.write(\u0027XSS17\u0027)}",
    "last_name": "\u0026{document.write(\u0027XSS17\u0027)}",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "688efba3-0fe6-5bb3-9524-c4088274c178",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss0@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "562928e0-d4b5-537d-b841-79efe2e05744",
    "user_id": "688efba3-0fe6-5bb3-9524-c4088274c178",
    "first_name": "javascript:document.write(\u0027xss1\u0027);",
    "last_name": "javascript:document.write(\u0027xss1\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss7@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "57c50395-6776-58f6-a801-6e3172b151e8",
    "user_id": "67ed8efc-0ab0-5797-be26-2449f979e82a",
    "first_name": "\u0026#0000106;\u0026#0000097;\u0026#0000118;\u0026#0000097;\u0026#0000115;\u0026#0000099;\u0026#0000114;\u0026#0000105;\u0026#0000112;\u0026#0000116;\u0026#0000058;\u0026#0000100;\u0026#0000111;\u0026#0000099;\u0026#0000117;\u0026#0000109;\u0026#0000101;\u0026#0000110;\u0026#0000116;\u0026#0000046;\u0026#0000119;\u0026#0000114;\u0026#0000105;\u0026#0000116;\u0026#0000101;\u0026#000",
    "last_name": "\u0026#0000106;\u0026#0000097;\u0026#0000118;\u0026#0000097;\u0026#0000115;\u0026#0000099;\u0026#0000114;\u0026#0000105;\u0026#0000112;\u0026#0000116;\u0026#0000058;\u0026#0000100;\u0026#0000111;\u0026#0000099;\u0026#0000117;\u0026#0000109;\u0026#0000101;\u0026#0000110;\u0026#0000116;\u0026#0000046;\u0026#0000119;\u0026#0000114;\u0026#0000105;\u0026#0000116;\u0026#0000101;\u0026#000",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "8d038399-ecac-55b4-8ad3-b7f0650de2a2",
  "role_id": TEST_ROLE_USER_ID,
  "username": "orna@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "5984642b-1be7-539a-850f-749c752bd610",
    "user_id": "8d038399-ecac-55b4-8ad3-b7f0650de2a2",
    "first_name": "Orna",
    "last_name": "Berry",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
  "role_id": TEST_ROLE_USER_ID,
  "username": "ping@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "5ab1b8a0-6ef9-5d49-81c2-ae1de848b629",
    "user_id": "f7e9754a-2f64-5cdd-8ba2-178b33383505",
    "first_name": "Ping",
    "last_name": "Fu",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "742554b6-2940-5b7d-a8e7-b03a19f78b8e",
  "role_id": TEST_ROLE_USER_ID,
  "username": "margaret@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "5d3858cc-73e2-5b0f-9757-4ce9fecb7b6c",
    "user_id": "742554b6-2940-5b7d-a8e7-b03a19f78b8e",
    "first_name": "Margaret",
    "last_name": "Hamilton",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss6@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "670f1154-53c9-50c0-ab14-0cd3c16cc472",
    "user_id": "7afa66ed-53aa-5d65-84c5-506d2b362898",
    "first_name": "\u0026#106;\u0026#97;\u0026#118;\u0026#97;\u0026#115;\u0026#99;\u0026#114;\u0026#105;\u0026#112;\u0026#116;\u0026#58;\u0026#100;\u0026#111;\u0026#99;\u0026#117;\u0026#109;\u0026#101;\u0026#110;\u0026#116;\u0026#46;\u0026#119;\u0026#114;\u0026#105;\u0026#116;\u0026#101;\u0026#40;\u0026#39;\u0026#88;\u0026#83;\u0026#83;\u0026#55;\u0026#39;\u0026#41;",
    "last_name": "\u0026#106;\u0026#97;\u0026#118;\u0026#97;\u0026#115;\u0026#99;\u0026#114;\u0026#105;\u0026#112;\u0026#116;\u0026#58;\u0026#100;\u0026#111;\u0026#99;\u0026#117;\u0026#109;\u0026#101;\u0026#110;\u0026#116;\u0026#46;\u0026#119;\u0026#114;\u0026#105;\u0026#116;\u0026#101;\u0026#40;\u0026#39;\u0026#88;\u0026#83;\u0026#83;\u0026#55;\u0026#39;\u0026#41;",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss15@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "6d994e96-70ce-599a-b5ab-91f30253dfa5",
    "user_id": "9244beb0-db82-5f76-a29b-f537c6b644ef",
    "first_name": "\u0022\u003Eonclick=document.write(\u0027xxs16\u0027)",
    "last_name": "\u0022\u003Eonclick=document.write(\u0027xxs16\u0027)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss1@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "8be7b3cc-d122-57d1-b68c-9f577cc34013",
    "user_id": "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
    "first_name": "javascript:document.write(\u0027xss2\u0027)",
    "last_name": "javascript:document.write(\u0027xss2\u0027)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "admin@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
    "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "first_name": "Admin",
    "last_name": "User",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "2020-05-13T15:56:49+00:00",
  is_mfa_enabled: true
}, {
  "id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss3@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "9c154eba-b9fa-508d-a8e7-9679be8c2016",
    "user_id": "e428e724-9264-5599-b28f-b7b622fcf1e6",
    "first_name": "JaVaScRiPt:document.write(\u0027XSS4\u0027)",
    "last_name": "JaVaScRiPt:document.write(\u0027XSS4\u0027)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
  "role_id": TEST_ROLE_USER_ID,
  "username": "wang@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "a2143312-d2f3-5ab5-a790-29a1f5d0217d",
    "user_id": "98c2bef5-cd5f-59e7-a1a7-0107c9a7cf08",
    "first_name": "Wang",
    "last_name": "Xiaoyun",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "33966163-6457-50a7-968e-836b904d7867",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss5@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "a9dfd11b-c442-5b3a-9fad-6d5995245f5d",
    "user_id": "33966163-6457-50a7-968e-836b904d7867",
    "first_name": "javascript:document.write(String.fromCharCode(88,83,83,54))",
    "last_name": "javascript:document.write(String.fromCharCode(88,83,83,54))",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "92f42805-bc0f-58fd-9de6-aab13ed0c28d",
  "role_id": TEST_ROLE_USER_ID,
  "username": "ruth@passbolt.com",
  "active": false,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "b10a6f64-668c-5947-9602-29ccbbc26ece",
    "user_id": "92f42805-bc0f-58fd-9de6-aab13ed0c28d",
    "first_name": "Ruth",
    "last_name": "Teitelbaum",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss4@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "c05c7aec-c2e4-52f6-882d-5bd460797e4f",
    "user_id": "be030f90-6fd8-57b1-b48a-a693a7684a43",
    "first_name": "javascript:document.write(\u0026quot;XSS5\u0026quot;)",
    "last_name": "javascript:document.write(\u0026quot;XSS5\u0026quot;)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
  "role_id": TEST_ROLE_USER_ID,
  "username": "marlyn@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "c1c1552b-486a-504f-a317-7efa0973384d",
    "user_id": "e1ebc592-b90d-5e22-9f40-50e52911673b",
    "first_name": "Marlyn",
    "last_name": "Wescoff",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "af5e1f70-a0ee-5b76-935b-c846f8a6a190",
  "role_id": TEST_ROLE_USER_ID,
  "username": "adele@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-03-13T09:32:49+00:00",
  "modified": "2020-04-13T09:32:49+00:00",
  "profile": {
    "id": "c219edf1-e104-55dc-ac80-cefdaffc943a",
    "user_id": "af5e1f70-a0ee-5b76-935b-c846f8a6a190",
    "first_name": "Adele",
    "last_name": "Goldstine",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
  "role_id": TEST_ROLE_USER_ID,
  "username": "irene@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "c551fc12-59b4-51ad-ae73-1659812e9ba5",
    "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
    "first_name": "Irene",
    "last_name": "Greif",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "c92a1885-1644-5bdb-8486-12d751b976ff",
  "role_id": TEST_ROLE_USER_ID,
  "username": "thelma@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "c6b23ff3-b8e3-52b8-bf76-2cd57e8c701d",
    "user_id": "c92a1885-1644-5bdb-8486-12d751b976ff",
    "first_name": "Thelma",
    "last_name": "Estrin",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "6aabffc9-f788-58f8-9bc9-f4c102ad2f53",
  "role_id": "6f02b8d2-e24c-51fe-a452-5a027c26dbef",
  "username": "anonymous@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "c94371fe-8fcc-5b77-b50e-2db38646a673",
    "user_id": "6aabffc9-f788-58f8-9bc9-f4c102ad2f53",
    "first_name": "Anonymous",
    "last_name": "User",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "620de627-8f07-5427-9149-e2c43219c5aa",
  "role_id": TEST_ROLE_USER_ID,
  "username": "grace@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "d12b4113-9368-5923-9e86-deea9fdca094",
    "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
    "first_name": "Grace",
    "last_name": "Hopper",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
  "role_id": TEST_ROLE_USER_ID,
  "username": "jean@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "d15ca284-74b3-56ef-a9f4-02816113797f",
    "user_id": "0da907bd-5c57-5acc-ba39-c6ebe091f613",
    "first_name": "Jean",
    "last_name": "Bartik",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss11@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "d1e369be-f991-5fc9-8494-01c1b3a0d1c9",
    "user_id": "2cff151f-3c67-5ca9-8af9-884fb06d96cf",
    "first_name": "jav\u0026#x0D;ascript:document.write(\u0027XSS12\u0027);",
    "last_name": "jav\u0026#x0D;ascript:document.write(\u0027XSS12\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss10@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "d39a4b0c-c08c-58a4-9ffa-c50e1741dbaf",
    "user_id": "442a3c46-df26-5f93-8c50-2b52f08e7d83",
    "first_name": "jav\u0026#x09;ascript:document.write(\u0027XSS11\u0027);",
    "last_name": "jav\u0026#x09;ascript:document.write(\u0027XSS11\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss17@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "d9bc69ce-e364-5d39-9d36-4bd9feac426c",
    "user_id": "928c44c3-fcb5-5d28-b975-a749b288ad0f",
    "first_name": "java\\0script:document.write(\u0022XSS18\u0022)",
    "last_name": "java\\0script:document.write(\u0022XSS18\u0022)",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: true
}, {
  "id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss9@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "eae6d68f-3b5e-533f-9e0d-cab3ddcf79e3",
    "user_id": "796ce5c5-964a-5f79-8212-5e88bd33e6bd",
    "first_name": "jav        ascript:document.write(\u0027XSS10\u0027);",
    "last_name": "jav        ascript:document.write(\u0027XSS10\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
  "role_id": TEST_ROLE_USER_ID,
  "username": "ursula@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "f6177e5b-ef9e-53c6-a4de-a5be4117d646",
    "user_id": "5302c3cb-5d33-53b1-82cd-57df36e13acc",
    "first_name": "Ursula",
    "last_name": "Martin",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "a0559bb5-050b-50a3-ad39-c6756a46dbb7",
  "role_id": TEST_ROLE_USER_ID,
  "username": "yvonne@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "f80586be-369b-5732-9184-8bb7db74d750",
    "user_id": "a0559bb5-050b-50a3-ad39-c6756a46dbb7",
    "first_name": "Yvonne",
    "last_name": "Choquet-Bruhat",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}, {
  "id": "81504708-c785-58e7-bd19-c1f2385dd074",
  "role_id": TEST_ROLE_ADMIN_ID,
  "username": "xss13@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-13T09:32:49+00:00",
  "modified": "2020-05-13T09:32:49+00:00",
  "profile": {
    "id": "fb9dc6c2-30b2-5e99-8c16-05c61b90d2b4",
    "user_id": "81504708-c785-58e7-bd19-c1f2385dd074",
    "first_name": "\u0026#14;  javascript:document.write(\u0027XSS14\u0027);",
    "last_name": "\u0026#14;  javascript:document.write(\u0027XSS14\u0027);",
    "created": "2020-05-13T09:32:50+00:00",
    "modified": "2020-05-13T09:32:50+00:00",
    "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": "",
  is_mfa_enabled: false
}];

export const groups = [
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
];

const roles = [
  {
    "id": TEST_ROLE_USER_ID,
    "name": "user",
    "description": "Logged in user",
    "created": "2012-07-04T13:39:25+00:00",
    "modified": "2012-07-04T13:39:25+00:00"
  }, {
    "id": TEST_ROLE_ADMIN_ID,
    "name": "admin",
    "description": "Logged in admin",
    "created": "2012-07-04T13:39:25+00:00",
    "modified": "2012-07-04T13:39:25+00:00"
  }
];
