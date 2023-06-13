import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../test/fixture/Settings/userSettings";
import {users, groups} from "../../contexts/UserWorkspaceContext.test.data";
import MockPort from "../../test/mock/MockPort";
/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const port = new MockPort();
  const userSettings = new UserSettings(userSettingsFixture);

  const defaultAppContext = {
    userSettings,
    port,
    users,
    groups,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn()
    }
  };
}

const gpgKey = {
  "fingerprint": "0C1D1761110D1E33C9006D1A5B1B332ED06426D3"
};

/**
 * Default resources
 */
export const resources = [{
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http:\/\/www.apache.org\/",
  "description": "Apache is the world\u0027s most used web server software.",
  "deleted": false,
  "created": "2020-02-19T10:39:29+00:00",
  "modified": "2020-02-20T10:39:29+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permissions": [{
    "id": "898ce1d0-601f-5194-976b-147a680dd472",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-19T10:39:26+00:00",
      "modified": "2020-02-20T10:39:26+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "0519d40b-29b9-4c79-a68c-8f933896c80d",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.a99472d5.png",
            "small": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2019-12-21T10:39:26+00:00",
      "modified": "2020-01-21T10:39:26+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
            "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "c953dc56-86ee-5932-ae24-a2df7003c906",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "dame@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T08:39:26+00:00",
      "modified": "2020-02-21T09:39:26+00:00",
      "profile": {
        "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "8a5b82b4-6967-487f-9bb1-cdc4da78aa06",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "model": "Avatar",
          "filename": "dame steve.png",
          "filesize": 20676,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "f2695972b9009970ac85aae95f907693268cd249",
          "path": "Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.a99472d5.png",
            "small": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "6f65173d-a5e8-5014-9659-e1bb4f19707d",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-07T10:39:26+00:00",
      "modified": "2020-02-14T10:39:26+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "b4926859-7de7-4c80-85c1-552a2ed47e52",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
            "small": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }],
  "secrets": [{
    "id": "eede75ff-316a-511c-8317-51e8339b6dcc",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "resource_id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "data": "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/\/QyHX2Ua8jvIna\/QX3fB\/TD\/cvxNNH2RJPxZ5VwKbviBZ\nzhd6pWpsX48C2bmB+Y+SQrHB\/xXX+vAvGNzwoVa4+hYG7GAoSruXpi7sYjMUanjW\nEfQ0HX5GEEv9fcFb27zcxi61ZD+3lQnhW+5cOnDZwqnL68dQZ+fPpDLBDLGNZuBA\n8t98lAV5ku3THiTctlso9Erfk4lo+Er1onFGIY4DWhSn1QcdlUb10iDLEXRuQdtk\nXrtQGCWKaI\/QLqJirtIy4DTRoq1mTN27xxScWnA+Z35pPOKaqh5vHGRvYf8xngdS\nE3f2qx4r8wlUHG3Y+\/+qU6f9dnA4DgBXMzEueQhorkdUrFalWuWg8aKmBFA5kEtc\n2GwIPQZQadg\/pFcGMCRwpSViWFlJSe2Jxy0KXVpSgRXizCFeFejDzxAcMwYm3UbD\n6uV+edvrj\/1xHxtonX\/\/QkrAjHQr7hgNZtxed23EamoajvuI6xSMH4U8LYNuK37J\nxql3e89J9d5A29ldXyhq95xGS4F+258t6oHlM4mGWZiJ97aEafgqlKjyl+kzpNo6\nWiemxUjiyjA8dyLWtyWk5RCyd\/rP0YmrsYcJpR1v8UMzWIbHr28pgQVHW56e\/gd8\nsBk0Yt33hPnT0ji28PT17TkaK61NLWLIKd29O34CMSV5kQD8rXBLhuAfZIg8RvvS\nUgEjbB3Xfh5Uo2J5gew2Zy823u98xTnsOpOkPYVGBXpW6ZKMNNq\/6rBt6TEULBrX\n1OUTkSbLwZs04S5SXGbBqXXYrnTOOPrrdKye4gANC\/0cvbE=\n=85Ee\n-----END PGP MESSAGE-----",
    "created": "2020-02-21T10:39:42+00:00",
    "modified": "2020-02-21T10:39:42+00:00"
  }],
  "permission": {
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00"
  }
}, {
  "id": "daaf057e-7fc3-5537-a8a9-e8c151890878",
  "name": "cakephp",
  "username": "cake",
  "uri": "cakephp.org",
  "description": "The rapid and tasty php development framework",
  "deleted": false,
  "created": "2020-02-21T08:39:29+00:00",
  "modified": "2020-02-21T09:39:29+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permissions": [{
    "id": "1e11af8d-08a5-509f-b8ed-1ddeede93ccc",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-19T10:39:26+00:00",
      "modified": "2020-02-20T10:39:26+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "0519d40b-29b9-4c79-a68c-8f933896c80d",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.a99472d5.png",
            "small": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "972bf3fc-0d5b-579c-9097-56d86394c255",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2019-12-21T10:39:26+00:00",
      "modified": "2020-01-21T10:39:26+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
            "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "078ad063-fc87-5ecd-8388-57e434bd62e4",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "dame@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T08:39:26+00:00",
      "modified": "2020-02-21T09:39:26+00:00",
      "profile": {
        "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "8a5b82b4-6967-487f-9bb1-cdc4da78aa06",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "model": "Avatar",
          "filename": "dame steve.png",
          "filesize": 20676,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "f2695972b9009970ac85aae95f907693268cd249",
          "path": "Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.a99472d5.png",
            "small": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "db1641db-b058-533d-917b-2145366536d2",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-07T10:39:26+00:00",
      "modified": "2020-02-14T10:39:26+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "b4926859-7de7-4c80-85c1-552a2ed47e52",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
            "small": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "82c38b87-b9aa-5b44-a8e3-50a8b64a2fbd",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "hedy@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "403c7bdf-068d-585a-8fc0-2049a131f8e6",
        "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        "first_name": "Hedy",
        "last_name": "Lamarr",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "cb03409b-9cd6-5d64-8df5-ff60a8a38a41",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "irene@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "c551fc12-59b4-51ad-ae73-1659812e9ba5",
        "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        "first_name": "Irene",
        "last_name": "Greif",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "39b95688-1652-5165-89b4-bd852022de11",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "620de627-8f07-5427-9149-e2c43219c5aa",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "620de627-8f07-5427-9149-e2c43219c5aa",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "grace@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "d12b4113-9368-5923-9e86-deea9fdca094",
        "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
        "first_name": "Grace",
        "last_name": "Hopper",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "27abc1c6-c0a5-5361-a41c-0c8426d7af39",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "Group",
    "aro_foreign_key": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
      "name": "Developer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "ae2ea2b0-a825-5543-9c28-4f0ee6b91918",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "Group",
    "aro_foreign_key": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
      "name": "Freelancer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "b3ec81f7-1039-592a-afae-644b952717bc",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "Group",
    "aro_foreign_key": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
      "name": "Ergonom",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "d06a8538-3883-5b0f-9ed7-812a75f3b9e3",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "Group",
    "aro_foreign_key": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
      "name": "Board",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }],
  "secrets": [{
    "id": "9f050f91-f664-56bd-9cd6-0a81125949ea",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "resource_id": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "data": "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+ARAAkfh1yYX022Jv0ZcUK2nSwzX2wSp9fTYZje9CEG9jCKZM\n6WNsSaZJ33dsVKlIjyVVZnMDNl3i3GT3dzKZK4oACg3qh3t0nAKqzw9iO8jY506q\nUn4XDhuW4zrvURtqjX9VdPzjUBRv4heK+0EApBzgh+QgxXYtDYgPN27mAAaRBgqp\nsVP92rogonYb04kJqwmwwDLPLdOOqg1YmtlICkQGivcatnmTb5zJtPKPlc8DalPg\nB6XgnunrNKbFzw6Fg9Pr5RtY9YhGdbomdkZ0zPoAX+YO9640lY2ORqCUTHb3UqMx\n5dsNyJuTP+XEN+0CDL0ZEbOPDg5VRCZ\/vhi+hwNlfTmns1zycrf+LjV6uM+FLAQ0\nHPWVqRejNa7qqToXETWRMA+TT3L651LyMZxoofDXn0xoNRKwgQZZAut2RNQSCaL7\nwIo7KfcqHML\/\/G7\/8xBcz2qmDnFtdPrzv26avL8qpuAXF3KFZe7hPmVq2veDTqL9\ndHh9ljeaUjaKipJURr3jF0NcHW1CozXm2gvmk7pHPPT3c2bL9yyrEFH5NbW2Yeub\n2rHZ5WxDui0rYm1\/kJOuLRvVfTV5dTRMjE4JQZm0P\/tpLGNmAdtjTjWC8P3jK92t\n8GdGwkL8o2jr1DcF5eh\/kjOiJgBAj0vX2YqHO2kunFkbFciTtNL3SLeb6IExdHzS\nPQHlpwigKIg3+ppagIfZdERWgu6Z9TpFFM+D5\/8BOQawj0Pmhx2MMg69HuKKm3vT\nEzAB2sOfvHjSmLEOPMc=\n=cDnP\n-----END PGP MESSAGE-----",
    "created": "2020-02-21T10:39:42+00:00",
    "modified": "2020-02-21T10:39:42+00:00"
  }],
  "permission": {
    "id": "972bf3fc-0d5b-579c-9097-56d86394c255",
    "aco": "Resource",
    "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00"
  }
}, {
  "id": "690b6e40-f371-579c-b0c6-86e8ef383adc",
  "name": "Enlightenment",
  "username": "efl",
  "uri": "https:\/\/www.enlightenment.org\/",
  "description": "Party like it\u0027s 1996.",
  "deleted": false,
  "created": "2020-02-21T10:39:29+00:00",
  "modified": "2020-02-21T10:39:29+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permissions": [{
    "id": "2169588b-cf80-51f4-82a2-4b5e914d0d47",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-19T10:39:26+00:00",
      "modified": "2020-02-20T10:39:26+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "0519d40b-29b9-4c79-a68c-8f933896c80d",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.a99472d5.png",
            "small": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "e32b034c-d780-51f4-a89a-44042a5f69e0",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2019-12-21T10:39:26+00:00",
      "modified": "2020-01-21T10:39:26+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
            "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "849b1743-e145-53a8-85ca-edf78823c801",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "dame@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T08:39:26+00:00",
      "modified": "2020-02-21T09:39:26+00:00",
      "profile": {
        "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "8a5b82b4-6967-487f-9bb1-cdc4da78aa06",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "model": "Avatar",
          "filename": "dame steve.png",
          "filesize": 20676,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "f2695972b9009970ac85aae95f907693268cd249",
          "path": "Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.a99472d5.png",
            "small": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "40e26b09-8ed0-5d15-9b0c-d595bbb3cfe4",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-07T10:39:26+00:00",
      "modified": "2020-02-14T10:39:26+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "b4926859-7de7-4c80-85c1-552a2ed47e52",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
            "small": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "adc451c8-d721-50f1-978f-dfb01a270ca8",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "hedy@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "403c7bdf-068d-585a-8fc0-2049a131f8e6",
        "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        "first_name": "Hedy",
        "last_name": "Lamarr",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "98ac06ff-d605-52c6-9d38-c6d1d950439d",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "irene@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "c551fc12-59b4-51ad-ae73-1659812e9ba5",
        "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        "first_name": "Irene",
        "last_name": "Greif",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "d33d5e15-7b43-516a-acd1-dbb4049c03ee",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "620de627-8f07-5427-9149-e2c43219c5aa",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "620de627-8f07-5427-9149-e2c43219c5aa",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "grace@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "d12b4113-9368-5923-9e86-deea9fdca094",
        "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
        "first_name": "Grace",
        "last_name": "Hopper",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "521b4284-e8fc-55a8-8d32-03a82d3eebf3",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "Group",
    "aro_foreign_key": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
      "name": "Ergonom",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "96cbcf82-e852-5232-ade2-9b648380e59f",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "Group",
    "aro_foreign_key": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
      "name": "Board",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "cee750b6-60c8-55c5-bd2c-f69544b31810",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "Group",
    "aro_foreign_key": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
      "name": "Developer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "d48886d8-0025-558f-b9b2-041bd6322053",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "Group",
    "aro_foreign_key": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
      "name": "Freelancer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }],
  "secrets": [{
    "id": "ab0712d2-3e91-5261-8c34-d420cf54fd28",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "resource_id": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "data": "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/8C7BXVGXAzxWMWuYLvW2aPBrJKFy7wiUueu2dpWuDNYYA\nJ0R9UM8nERhr0SXnXGtRO24WTkmnhOpvPhWAm4lUi3YB8YYof17VGh+Gp4aP6oV9\nCNqj7OTZjk686lYqScozlMkiH5oYjTql51nYzwJ4r7\/kakQiV6tbUii6P1p6FNmQ\n8bICUWRpOo+eR8eLwGfwaHRs8RgpX5MyawWuue282W3C0tAzhiu7m4qAViCk4l87\nq0gtob2EBjbFUK3VBMwbhA9Ouz9HF2gXv1iWqoNrcbikYs4xpUeZmZUs4kq6RXhT\nzNo+XoN6No77IHj4OTaSs6LEoKpxEImUGy6dYn1F2xuxd9kfTgTRMTI38ncosJ0C\nTnoxSy85TXu\/RtoVgdGKau54PFO9tzZDBRy\/mlMQ+MTpPEiETu5A4im8dVhn4z1l\nHlWEpV1d8uU\/DBmBPcpeFH47Ddrnr7osa4Di2KbBKZG10aXNd54AdISKnRuYNFJG\nTxap9iXWXjJ4gdgmwbiC2\/a6UGTWZ64gR8rju86x89OrNNh5WLsgckAbDVsUGfKC\nsGSr7O2up91Nd9yz14hYMwG1zKlCdnTRJSrixg8TLMN7BajqhRRgM71q8UrLSoRu\nDv38dkioVmAv+OpdjatqGBd8JJQ9hU9taJNq5wSBslUMpdEakHlo5GwH7G+lq7LS\nRQEJNFM0R68+k5cYP1pyWhVHjZA67MqmmqfRWLYD9sKj+3xnpMPfhyVPLfUywxJz\nTmMSP2l5rS5aDyNOrJBbxH6CREcCUQ==\n=2eQk\n-----END PGP MESSAGE-----",
    "created": "2020-02-21T10:39:42+00:00",
    "modified": "2020-02-21T10:39:42+00:00"
  }],
  "permission": {
    "id": "e32b034c-d780-51f4-a89a-44042a5f69e0",
    "aco": "Resource",
    "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00"
  }
}, {
  "id": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
  "name": "Grogle",
  "username": "grd",
  "uri": "http:\/\/fr.groland.wikia.com\/wiki\/Grogle",
  "description": "",
  "deleted": false,
  "created": "2020-02-21T10:39:29+00:00",
  "modified": "2020-02-21T10:39:29+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permissions": [{
    "id": "39acc708-f643-548f-b305-14236220327d",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "carol@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-19T10:39:26+00:00",
      "modified": "2020-02-20T10:39:26+00:00",
      "profile": {
        "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
        "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        "first_name": "Carol",
        "last_name": "Shaw",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "0519d40b-29b9-4c79-a68c-8f933896c80d",
          "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
          "model": "Avatar",
          "filename": "carol.png",
          "filesize": 733439,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
          "path": "Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.a99472d5.png",
            "small": "img\/public\/Avatar\/60\/6d\/93\/0519d40b29b94c79a68c8f933896c80d\/0519d40b29b94c79a68c8f933896c80d.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2019-12-21T10:39:26+00:00",
      "modified": "2020-01-21T10:39:26+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
            "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "81b479f4-5661-5050-834e-aa9d79a90a45",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "dame@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T08:39:26+00:00",
      "modified": "2020-02-21T09:39:26+00:00",
      "profile": {
        "id": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
        "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
        "first_name": "Dame Steve",
        "last_name": "Shirley",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "8a5b82b4-6967-487f-9bb1-cdc4da78aa06",
          "user_id": "54c6278e-f824-5fda-91ff-3e946b18d994",
          "foreign_key": "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
          "model": "Avatar",
          "filename": "dame steve.png",
          "filesize": 20676,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "f2695972b9009970ac85aae95f907693268cd249",
          "path": "Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:27+00:00",
          "modified": "2020-02-21T10:39:27+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.a99472d5.png",
            "small": "img\/public\/Avatar\/28\/7d\/93\/8a5b82b46967487f9bb1cdc4da78aa06\/8a5b82b46967487f9bb1cdc4da78aa06.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "ec3a3692-6451-5417-a9e7-243dda8acbae",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-07T10:39:26+00:00",
      "modified": "2020-02-14T10:39:26+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "b4926859-7de7-4c80-85c1-552a2ed47e52",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
            "small": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "b8e7077e-460c-52bc-a5b5-05b5add5ef8e",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "hedy@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "403c7bdf-068d-585a-8fc0-2049a131f8e6",
        "user_id": "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        "first_name": "Hedy",
        "last_name": "Lamarr",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "5b1d78a2-15f2-5be3-9a1a-412ddf83e6f6",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "irene@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "c551fc12-59b4-51ad-ae73-1659812e9ba5",
        "user_id": "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        "first_name": "Irene",
        "last_name": "Greif",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "557496ad-e177-529a-a91e-3cdcd15df167",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "620de627-8f07-5427-9149-e2c43219c5aa",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "620de627-8f07-5427-9149-e2c43219c5aa",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "grace@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "profile": {
        "id": "d12b4113-9368-5923-9e86-deea9fdca094",
        "user_id": "620de627-8f07-5427-9149-e2c43219c5aa",
        "first_name": "Grace",
        "last_name": "Hopper",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "3068c70f-cbe4-5c32-8921-eec07777166b",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "Group",
    "aro_foreign_key": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
      "name": "Developer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "3bb4592e-7788-538f-bb7b-e3136e8ce28e",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "Group",
    "aro_foreign_key": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "36563004-3f25-50c0-b22e-6554c3ccc4e7",
      "name": "Board",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "a6bdc2d9-3c37-5fc4-a383-ec1249ff5611",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "Group",
    "aro_foreign_key": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
      "name": "Ergonom",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }, {
    "id": "fc64507b-6a84-5454-a1c7-e0fac3513abd",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "Group",
    "aro_foreign_key": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
    "type": 1,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": {
      "id": "15cec625-8417-5533-bdb1-a17aec0bfcf4",
      "name": "Freelancer",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }],
  "secrets": [{
    "id": "95031fd8-c742-5074-a0b6-4b63133943e1",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "resource_id": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "data": "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/+IFdDbauO7X3uIxB\/4P8PND7F5BunfuPWwNLXHMG8pvEP\nJOp1D+MksVySCbpuliX\/qoOtoaiafSqVoqAzLW7tbc7e8ojuE+gZrvNpUP8Ng80I\nnGKnx74Nnx5C2Pyg6c4MUyk8rsOoQrPENm72u1J8VzmD8rYe6m1bgF\/arx\/zOwMv\nLUMy+QmbgXNmi0HMk9ZAWNS+OlZDYN2dcSqb13aztOewqmDPgQPO+dK6BM2MZEIo\nrrUBFmqV8kaWYrMuRBkCjzztOt9\/IjindOdirCa9C4mL5ST4wpclYrGDTzpoyojV\nP018\/pGWzDDBgI+SOvlkqcJI4or\/fPlWyjVd38tgJ0fAQT\/9ZQ3lAsPeIXKmGJ4S\nbwABTMQdMkl257LprdWnBO1j3eXUahmkpzSVAxOX9E5Cxmg7syYnKjCa2DKauXOW\nSirqkt\/\/e0nxEcDVx3czhveVNJ44PYBP4bgCuG9ddD5OB2zmJS\/i7t6DvZMCzPET\nYx\/TZuKJMbPkpZ3j89U0KHitjCgTCJUJMGxT6opsL0yG7B5SNjIvSnaQYy4n5BhQ\nxZLJRYAAeEwkChGsg08o3+E9Rqscno5dtpTTxLtqnesQc90yOS7nMgj03TRjd6Qu\nDFyPw05m34vKkDIRYk8AnIWKamQmVUU1IK6McZXxD1swCieTNilA92oi6KmsB3DS\nQwFXCjUoKE1\/QRVOpDMdzCE1CbRaVCB5IB\/tGYNXdXrfxj33TAhOxZ7P6FwS6Mr4\ngIvN9K85D9DSdc6zB1K\/J8iqYQs=\n=sbNr\n-----END PGP MESSAGE-----",
    "created": "2020-02-21T10:39:42+00:00",
    "modified": "2020-02-21T10:39:42+00:00"
  }],
  "permission": {
    "id": "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
    "aco": "Resource",
    "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00"
  }
}];

export const folders = [{
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http:\/\/www.apache.org\/",
  "description": "Apache is the world\u0027s most used web server software.",
  "deleted": false,
  "created": "2020-02-19T10:39:29+00:00",
  "modified": "2020-02-20T10:39:29+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permissions": [{
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Folder",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2019-12-21T10:39:26+00:00",
      "modified": "2020-01-21T10:39:26+00:00",
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "model": "Avatar",
          "filename": "ada.png",
          "filesize": 170049,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
          "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
            "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }, {
    "id": "6f65173d-a5e8-5014-9659-e1bb4f19707d",
    "aco": "Folder",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    "type": 7,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00",
    "group": null,
    "user": {
      "id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "betty@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-02-07T10:39:26+00:00",
      "modified": "2020-02-14T10:39:26+00:00",
      "profile": {
        "id": "cbce5d22-46c1-51d1-b851-36b174e40611",
        "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        "first_name": "Betty",
        "last_name": "Holberton",
        "created": "2020-02-21T10:39:26+00:00",
        "modified": "2020-02-21T10:39:26+00:00",
        "avatar": {
          "id": "b4926859-7de7-4c80-85c1-552a2ed47e52",
          "user_id": "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          "foreign_key": "cbce5d22-46c1-51d1-b851-36b174e40611",
          "model": "Avatar",
          "filename": "betty.png",
          "filesize": 115942,
          "mime_type": "image\/png",
          "extension": "png",
          "hash": "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
          "path": "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
          "adapter": "Local",
          "created": "2020-02-21T10:39:28+00:00",
          "modified": "2020-02-21T10:39:28+00:00",
          "url": {
            "medium": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
            "small": "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png"
          }
        }
      },
      "last_logged_in": ""
    }
  }],
  "secrets": [{
    "id": "eede75ff-316a-511c-8317-51e8339b6dcc",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "resource_id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "data": "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/\/QyHX2Ua8jvIna\/QX3fB\/TD\/cvxNNH2RJPxZ5VwKbviBZ\nzhd6pWpsX48C2bmB+Y+SQrHB\/xXX+vAvGNzwoVa4+hYG7GAoSruXpi7sYjMUanjW\nEfQ0HX5GEEv9fcFb27zcxi61ZD+3lQnhW+5cOnDZwqnL68dQZ+fPpDLBDLGNZuBA\n8t98lAV5ku3THiTctlso9Erfk4lo+Er1onFGIY4DWhSn1QcdlUb10iDLEXRuQdtk\nXrtQGCWKaI\/QLqJirtIy4DTRoq1mTN27xxScWnA+Z35pPOKaqh5vHGRvYf8xngdS\nE3f2qx4r8wlUHG3Y+\/+qU6f9dnA4DgBXMzEueQhorkdUrFalWuWg8aKmBFA5kEtc\n2GwIPQZQadg\/pFcGMCRwpSViWFlJSe2Jxy0KXVpSgRXizCFeFejDzxAcMwYm3UbD\n6uV+edvrj\/1xHxtonX\/\/QkrAjHQr7hgNZtxed23EamoajvuI6xSMH4U8LYNuK37J\nxql3e89J9d5A29ldXyhq95xGS4F+258t6oHlM4mGWZiJ97aEafgqlKjyl+kzpNo6\nWiemxUjiyjA8dyLWtyWk5RCyd\/rP0YmrsYcJpR1v8UMzWIbHr28pgQVHW56e\/gd8\nsBk0Yt33hPnT0ji28PT17TkaK61NLWLIKd29O34CMSV5kQD8rXBLhuAfZIg8RvvS\nUgEjbB3Xfh5Uo2J5gew2Zy823u98xTnsOpOkPYVGBXpW6ZKMNNq\/6rBt6TEULBrX\n1OUTkSbLwZs04S5SXGbBqXXYrnTOOPrrdKye4gANC\/0cvbE=\n=85Ee\n-----END PGP MESSAGE-----",
    "created": "2020-02-21T10:39:42+00:00",
    "modified": "2020-02-21T10:39:42+00:00"
  }],
  "permission": {
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Folder",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-02-21T10:39:30+00:00",
    "modified": "2020-02-21T10:39:30+00:00"
  }
},
];

export const autocompleteResult = [
  {
    "user_count": "2",
    "id": "469edf9d-ca1e-5003-91d6-3a46755d5a50",
    "name": "Administrator",
    "deleted": false,
    "created": "2016-01-29T13:39:25+00:00",
    "modified": "2016-01-29T13:39:25+00:00",
    "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
  }, {
    "id": "f848277c-5398-58f8-a82a-72397af2d450",
    "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
    "username": "ada@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2019-12-21T10:39:26+00:00",
    "modified": "2020-01-21T10:39:26+00:00",
    "profile": {
      "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "first_name": "Ada",
      "last_name": "Lovelace",
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "avatar": {
        "id": "88eebbef-d7bc-4471-8577-2ec9e55769f6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "model": "Avatar",
        "filename": "ada.png",
        "filesize": 170049,
        "mime_type": "image\/png",
        "extension": "png",
        "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
        "path": "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
        "adapter": "Local",
        "created": "2020-02-21T10:39:28+00:00",
        "modified": "2020-02-21T10:39:28+00:00",
        "url": {
          "medium": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
          "small": "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png"
        }
      }
    },
    "groups_users": [],
    "role": {
      "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "name": "user",
      "description": "Logged in user",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    },
    "gpgkey": {
      "id": "04481719-5d9d-5e22-880a-a6b9270601d2",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFXHTB8BEADAaRMUn++WVatrw3kQK7\/6S6DvBauIYcBateuFjczhwEKXUD6T\nhLm7nOv5\/TKzCpnB5WkP+UZyfT\/+jCC2x4+pSgog46jIOuigWBL6Y9F6KkedApFK\nxnF6cydxsKxNf\/V70Nwagh9ZD4W5ujy+RCB6wYVARDKOlYJnHKWqco7anGhWYj8K\nKaDT+7yM7LGy+tCZ96HCw4AvcTb2nXF197Btu2RDWZ\/0MhO+DFuLMITXbhxgQC\/e\naA1CS6BNS7F91pty7s2hPQgYg3HUaDogTiIyth8R5Inn9DxlMs6WDXGc6IElSfhC\nnfcICao22AlM6X3vTxzdBJ0hm0RV3iU1df0J9GoM7Y7y8OieOJeTI22yFkZpCM8i\ntL+cMjWyiID06dINTRAvN2cHhaLQTfyD1S60GXTrpTMkJzJHlvjMk0wapNdDM1q3\njKZC+9HAFvyVf0UsU156JWtQBfkE1lqAYxFvMR\/ne+kI8+6ueIJNcAtScqh0LpA5\nuvPjiIjvlZygqPwQ\/LUMgxS0P7sPNzaKiWc9OpUNl4\/P3XTboMQ6wwrZ3wOmSYuh\nFN8ez51U8UpHPSsI8tcHWx66WsiiAWdAFctpeR\/ZuQcXMvgEad57pz\/jNN2JHycA\n+awesPIJieX5QmG44sfxkOvHqkB3l193yzxu\/awYRnWinH71ySW4GJepPQARAQAB\ntB9BZGEgTG92ZWxhY2UgPGFkYUBwYXNzYm9sdC5jb20+iQJOBBMBCgA4AhsDBQsJ\nCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEA\/YOlY9MspcjrN92E1O1sV2bBU8FAl0b\nmi8ACgkQE1O1sV2bBU+Okw\/\/b\/PRVTz0\/hgdagcVNYPn\/lclDFuwwqanyvYu6y6M\nAiLVn6CUtxfU7GH2aSwZSr7D\/46TSlBHvxVvNlYROMx7odbLgq47OJxfUDG5OPi7\nLZgsuE8zijCPURZTZu20m+ratsieV0ziri+xJV09xJrjdkXHdX2PrkU0YeJxhE50\nJuMR1rf7EHfCp45nWbXoM4H+LnadGC1zSHa1WhSJkeaYw9jp1gh93BKD8+kmUrm6\ncKEjxN54YpgjFwSdA60b+BZgXbMgA37gNQCnZYjk7toaQClUbqLMaQxHPIjETB+Z\njJNKOYn740N2LTRtCi3ioraQNgXQEU7tWsXGS0tuMMN7w4ya1I6sYV3fCtfiyXFw\nfuYnjjGzn5hXtTjiOLJ+2kdy5OmNZc9wpf6IpKv7\/F2RUwLsBUfH4ondNNXscdkB\n6Zoj1Hxt16TpkHnYrKsSWtoOs90JnlwYbHnki6R\/gekYRSRSpD\/ybScQDRASQ0aO\nhbi71WuyFbLZF92P1mEK5GInJeiFjKaifvJ8F+oagI9hiYcHgX6ghktaPrANa2De\nOjmesQ0WjIHirzFKx3avYIkOFwKp8v6KTzynAEQ8XUqZmqEhNjEgVKHH0g3sC+EC\nZ\/HGLHsRRIN1siYnJGahrrkNs7lFI5LTqByHh52bismY3ADLemxH6Voq+DokvQn4\nHxS5Ag0EVcdMHwEQAMFWZvlswoC+dEFISBhJLz0XpTR5M84MCn19s\/ILjp6dGPbC\nvlGcT5Ol\/wL43T3hML8bzq18MRGgkzhwsBkUXO+E7jVePjuGFvRwS5W+QYwCuAmw\nDijDdMhrev1mrdVK61v\/2U9kt5faETW8ZIYIvAWLaw\/lMHbVmKOa35ZCIJWcNsrv\noro2kGUklM6Nq1JQyU+puGPHuvm+1ywZzpAH5q55pMgfO+9JjMU3XFs+eqv6LVyA\n\/Y6T7ZK1H8inbUPm\/26sSvmYsT\/4xNVosC\/ha9lFEAasz\/rbVg7thffje4LWOXJB\no40iBTlHsNbCGs5BfNC0wl719JDA4V8mwhGInNtETCrGwg3mBlDrk5jYrDq5IMVk\nyX4Z6T8Fd2fLHmUr2kFc4vC96tGQGhNrbAa\/EeaAkWMeFyp\/YOW0Z3X2tz5A+lm+\nqevJZ3HcQd+7ca6mPTrYSVVXhclwSkyCLlhRJwEwSxrn+a2ZToYNotLs1uEy6tOL\nbIyhFBQNsR6mTa2ttkd\/89wJ+r9s7XYDOyibTQyUGgOXu\/0l1K0jTREKlC91wKkm\ndw\/lJkjZCIMc\/KTHiB1e7f5NdFtxwErToEZOLVumop0FjRqzHoXZIR9OCSMUzUmM\nspGHalE71GfwB9DkAlgvoJPohyiipJ\/Paw3pOytZnb\/7A\/PoRSjELgDNPJhxABEB\nAAGJAjYEGAEKACACGwwWIQQD9g6Vj0yylyOs33YTU7WxXZsFTwUCXRuaPgAKCRAT\nU7WxXZsFTxX0EADAN9lreHgEvsl4JK89JqwBLjvGeXGTNmHsfczCTLAutVde+Lf0\nqACAhKhG0J8Omru2jVkUqPhkRcaTfaPKopT2KU8GfjKuuAlJ+BzH7oUq\/wy70t2h\nsglAYByv4y0emwnGyFC8VNw2Fe+Wil2y5d8DI8XHGp0bAXehjT2S7\/v1lEypeiiE\nNbhAnGG94Zywwwim0RltyNKXOgGeT4mroYxAL0zeTaX99Lch+DqyaeDq94g4sfhA\nVvGT2KJDT85vR3oNbB0U5wlbKPa+bUl8CokEDjqrDmdZOOs\/UO2mc45V3X5RNRtp\nNZMBGPJsxOKQExEOZncOVsY7ZqLrecuR8UJBQnhPd1aoz3HCJppaPI02uINWyQLs\nCogTf+nQWnLyN9qLrToriahNcZlDfuJCRVKTQ1gw1lkSN3IZRSkBuRYRe05US+C6\n8JMKHP+1XMKMgQM2XR7r4noMJKLaVUzfLXuPIWH2xNdgYXcIOSRjiANkIv4O7lWM\nxX9vD6LklijrepMl55Omu0bhF5rRn2VAubfxKhJs0eQn69+NWaVUrNMQ078nF+8G\nKT6vH32q9i9fpV38XYlwM9qEa0il5wfrSwPuDd5vmGgk9AOlSEzY2vE1kvp7lEt1\nTdb3ZfAajPMO3Iov5dwvm0zhJDQHFo7SFi5jH0Pgk4bAd9HBmB8sioxL4Q==\n=Kwft\n-----END PGP PUBLIC KEY BLOCK-----",
      "bits": 4096,
      "uid": "Ada Lovelace \u003Cada@passbolt.com\u003E",
      "key_id": "5D9B054F",
      "fingerprint": "03F60E958F4CB29723ACDF761353B5B15D9B054F",
      "type": "RSA",
      "expires": null,
      "key_created": "2015-08-09T12:48:31+00:00",
      "deleted": false,
      "created": "2020-02-21T10:39:28+00:00",
      "modified": "2020-02-21T10:39:28+00:00"
    },
    "is_mfa_enabled": false,
    "last_logged_in": ""
  }, {
    "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "role_id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
    "username": "admin@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2020-02-21T10:39:26+00:00",
    "modified": "2020-02-21T10:39:26+00:00",
    "profile": {
      "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "first_name": "Admin",
      "last_name": "User",
      "created": "2020-02-21T10:39:26+00:00",
      "modified": "2020-02-21T10:39:26+00:00",
      "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
    },
    "groups_users": [{
      "id": "03e26ff8-81d2-5b7f-87e4-99bbc40e1f95",
      "group_id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "15b5e2c6-164a-50e9-a46f-2b4a9ab9345a",
      "group_id": "c9c8fd8e-a0fa-53f0-967b-42edca3d91e4",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "15f486f6-4f5a-53f7-82ca-974e0be74e95",
      "group_id": "4ff007f6-80ec-5bf7-8f0a-46a17178db6f",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "2510a118-c838-5470-a0dd-aff268d4a2b6",
      "group_id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "8e42567e-6e6e-54bc-b17b-0f5afde5b01c",
      "group_id": "3feba74f-47da-5146-9d8f-76c7266c60ea",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "99fabba9-e069-59e6-a3b6-775436322b21",
      "group_id": "a89b771e-62ab-5434-b2fa-950827439ac7",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "9c937007-8d53-532d-b02f-80f100139990",
      "group_id": "faa73142-fb5e-5891-8b9f-4a00b3836fad",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "ad80b164-c30f-53e0-aac1-3040fa2f136d",
      "group_id": "f16c507f-9105-502e-aa8a-ba24c36dbdcf",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "c8f4bc84-2ea2-5509-8d6a-6b7378b7fffa",
      "group_id": "5fe7a6af-d97e-54f1-a4fc-b4b8bdb6e2ac",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }, {
      "id": "d100fc5d-6685-50aa-897b-87ac816e28c8",
      "group_id": "b7cbce9f-6a20-545b-b20a-fcf4092307df",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "is_admin": true,
      "created": "2020-02-21T10:39:29+00:00"
    }],
    "role": {
      "id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
      "name": "admin",
      "description": "Organization administrator",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    },
    "gpgkey": {
      "id": "91d8a7fd-3ab3-5e98-a4a5-0d8694ff23b9",
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINBFY06pcBEADjYRuq05Zatu4qYtXmexbrwtUdakNJJHPlWxcusohdTLUmSXrt\n7LegXBE3OjvV9HbdBQfbpjitFp8eJw5krYQmh1+w\/UYjb5Jy\/A7ma3oawzbVwNpL\nwuAafYma5LLLloZD\/OpYKprhWfW9FHKyq6t+AcH5CFs\/HvixdrdbAO7K1\/z6mgWc\nT6HBP5\/dGTseAlrvUDTsW1kzo6qsrOWoUunrqm31umsvcfNROtDKM16zgZl+GlYY\n1BxNcRKr1\/AcZUrp4zdSSc6IXrYjJ+1kgHz\/ZoSrKn5QiqEn7wQEveJu+jNGSv8j\nMvQgjq+AmzveJ\/4f+RQirbe9JOeDgzX7NqloRil3I0FPFoivbRU0PHi4N2q7sN8e\nYpXxXzuL+OEq1GQe5fTsSotQTRZUJxbdUS8DfPckQaK79HoybTQAgA6mgQf\/C+U0\nX2TiBUzgBuhayiW12kHmKyK02htDeRNOYs4bBMdeZhAFm+5C74LJ3FGQOHe+\/o2o\nBktk0rAZScjizijzNzJviRB\/3nAJSBW6NSNYcbnosk0ET2osg2tLvzegRI6+NQJE\nb0EpByTMypUDhCNKgg5aEDUVWcq4iucps\/1e6\/2vg2XVB7xdphT4\/K44ZeBHdFuf\nhGQvs8rkAPzpkpsEWKgpTR+hdhbMmNiL984Ywk98nNuzgfkgpcP57xawNwARAQAB\ntCtQYXNzYm9sdCBEZWZhdWx0IEFkbWluIDxhZG1pbkBwYXNzYm9sdC5jb20+iQJO\nBBMBCgA4AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAFiEEDB0XYRENHjPJAG0a\nWxszLtBkJtMFAl0bmoYACgkQWxszLtBkJtPnxg\/\/Q9WOWUGf7VOnfbaIix3NGAON\nI7rgXuLFc1E0vG20XWT2+C6xGskFwjoJbiyDrbMYnILGn7vDIn3MSoITemLjtt97\n\/lEXK7AgbJEWQWF1lxpXm0nCvjJ6h+qatGK96ncjcua6ecUut10A\/CACpuqxfKOh\nD6CaM5l\/ksEDtwvrv2MIaVajuCvwg+yUx0I0rfAQv0YTXbJ5MRn1pvOo3c6n5Q0z\n5eu\/iiG0UNNIE3Tk5KpT02MTMv5ullpt3mtNjMHH0\/TdPxCtUKVh4q34x3syiYLe\npaddf5Ctv9CL52VWfsG3qFPHp7euOFY8lfzuemoqD9jcE7QIJnkCmwtLXLQrE0O2\nRW\/y\/oXqrETXu2sFyHMr1Xw\/\/QeJgIv63LBGmcPOj93VyHIlcUDarM2oq2+DXKxr\nDs2xfnFKVCZwpSvecIfKXUKsnX3AGrpetoZdfw0jAUVI3nt6YCu8KvczXxetfjOV\n3HHXa40gtOZk5OoKbfuTjzQlpc1oaDyLH8PT1GYsN3wWoDs4zulh6uKDpSt+4z58\nH1BfPFlrO2uhZSfk3E83uBQXZcABeXNxCdrTCJm8P90sbjLu1TlaeOnrWwVT7Yq8\ni8LE7lbAXnT1HjQlDi8GB2+2EnZZmOX+Z84a16jDElZazUNsE8zT7OmyjuB7GGDb\nQEFYzkb9dr1j1sukzty5Ag0EVjTqlwEQAJ37C9s4pq4jvcEF3bJgL+q3SBolgBIp\nN1g1\/woi9vEiOh+7e08Kr8mEhF04cpRDbhY6dcZ8OIXIQ99fgdNXfehlAWnI56NE\n\/FOIyif8TvGBfO6yE35fKSskwGNdUZWIZ0U0pxSXQvB+KEGWlq2c3Uf\/jhTZDnLN\nvfDjnYmn5ycp5sVWhtAmKFha9NJ6LGA0D1MC+jcCJCKtQRGgVvlqOESFDmQ7Pu8\/\nayr2BO0URHJ0Ob30lHluCnoKIv50qGpL9BYuGAdCfLBHXzRQhHIbfc\/cTPkK1kTX\nX5x\/MkiEl88TeGN+yjNVS7qqdxYgs+QYnDDZqevhWEvVyXVQjcCWSIHfjL1x5Ndq\nYL6+ci\/OxyIFoPs4K2umN3JPmpFi+fIPh2CexKy6BnyE8oAgNvgdDb6ZOfAtvShZ\nPM7QG4LZal2+nYp4n7gJRh6kepTQT\/4Bua0xOtRQhgcI4nGtcCxEDRMMzjqbGYlc\nnciMjsiMg9LPpWPDA+xKrRZKYwVFy8vLx\/alOz\/h1BZjx2u7YmuaGENxE62Lfyh0\nxeoCBDTdnWEOQTH6LVsomVtUO1FVap1t5jkYSdpxBuHf8\/2Ye7N3FTMRKe9n4e75\nsAJ00utnMl6P2Zca9mM4T29PK+LPFx2G2h35DQ7MbEid1cAZ8QVR3UyoiR8+u9jM\nek+9uFCm+nAxABEBAAGJAjYEGAEKACACGwwWIQQMHRdhEQ0eM8kAbRpbGzMu0GQm\n0wUCXRuamQAKCRBbGzMu0GQm004PD\/9sFmFkdoSqwU\/En77+h0gt4knlgZbgj0iR\nromnknIwLKBbJJXksHmMPXJB9b3WZ\/gGV3pPVtDWDKg3NZW4HLK13w3s3wQ2ViVV\nA6FzABDSkI3YBqkkasLRZU7oN9XajdFfph5wLhDSgTCjSncGfcjVzPugWKLqPPih\nZO6mpqxSFYEhx+p\/O80Tlj90UsOFRdot7cqn5wOhXZtKsQ0RwaA\/uq\/sFe6UNKHG\n2RBgQfoj5JbazJbvlgMiWxhBalwZKQWs8IBh\/4ag8AFwwoJN+gOtNM9C4UCHu+yt\n0Tv2\/Tu+Apcj0oyFaKJD4uQUmChQ2fDRysqJEIhee+yL29mrdcB4jG7Q2rt8HbhY\nwlsHKgas0YIHdR6dUOCiyw72i0khwrd2PDgxKRu5+cob6wMSqXbIIxFLLLACHy2s\nKd6fQcg8FxoivEiF0lRfMi32A\/YWGJ\/k1OoFCzW55KFXqqBMptYZWh2Jezhttmid\nYHPc7jas7HEPnw3SvVM0gYAcmEVWWvjKfUpOhSYYkk\/B71w9RuIpPyyI7G2XI8Db\nG2ttngDIOL8njS6ybU9Og6yTNUoHL1wWEZN1b3fznKHcC9lyr8MIg00QNeDItt9i\nILCOkjoEdUdauqlRIa+EmUu+AL+JobrlQTzyrCIm7aaT3Hp9EyaEx5xvJDWtmjgf\nFYNCFtV1fw==\n=amwR\n-----END PGP PUBLIC KEY BLOCK-----",
      "bits": 4096,
      "uid": "Passbolt Default Admin \u003Cadmin@passbolt.com\u003E",
      "key_id": "D06426D3",
      "fingerprint": "0C1D1761110D1E33C9006D1A5B1B332ED06426D3",
      "type": "RSA",
      "expires": null,
      "key_created": "2015-10-31T16:21:43+00:00",
      "deleted": false,
      "created": "2020-02-21T10:39:28+00:00",
      "modified": "2020-02-21T10:39:28+00:00"
    },
    "is_mfa_enabled": false,
    "last_logged_in": ""
  }
];

export const mockResultsResources = {
  'passbolt.share.get-resources': resources,
  'passbolt.keyring.get-public-key-info-by-user': gpgKey,
  "passbolt.share.resources.save": true,
};

export const mockResultsFolders = {
  'passbolt.share.get-folders': folders,
  'passbolt.keyring.get-public-key-info-by-user': gpgKey,
  "passbolt.share.folders.save": true,
};

export const mockResultsResourcesAndFolders = {
  'passbolt.share.get-resources': resources,
  'passbolt.share.get-folders': folders,
  'passbolt.keyring.get-public-key-info-by-user': gpgKey,
};
