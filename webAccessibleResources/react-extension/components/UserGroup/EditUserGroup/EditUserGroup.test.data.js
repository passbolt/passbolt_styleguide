import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    users: mockUsers,
    userSettings: new UserSettings(userSettingsFixture),
    loggedInUser: mockUsers[0],
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps() {
  return {
    onClose: () => {},
    dialogContext: {
      open: () => {}
    },
    userWorkspaceContext: {
      groupToEdit: {
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
            "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
            "is_admin": true,
            "created": "2020-08-17T16:37:15+00:00"
          },
        ],
      },
    }
  };
}

/**
 * Mocked a user
 */
export const mockUsers = [{
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "role_id": TEST_ROLE_USER_ID,
  "role": {
    "created": "2012-07-04T13:39:25+00:00",
    "description": "Logged in user",
    "id": TEST_ROLE_USER_ID,
    "modified": "2012-07-04T13:39:25+00:00",
    "name": "admin"
  },
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
  "last_logged_in": ""
}, {
  "id": "f848277c-5398-58f8-a82a-72397af2d450",
  "role_id": TEST_ROLE_USER_ID,
  "role": {
    "created": "2012-07-04T13:39:25+00:00",
    "description": "Logged in user",
    "id": TEST_ROLE_USER_ID,
    "modified": "2012-07-04T13:39:25+00:00",
    "name": "user"
  },
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
  "id": "54c6278e-f824-5fda-91ff-3e946b18d994",
  "role_id": TEST_ROLE_USER_ID,
  "role": {
    "created": "2012-07-04T13:39:25+00:00",
    "description": "Logged in user",
    "id": TEST_ROLE_USER_ID,
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
}];

/**
 * Mocked a gpg key
 */
export const mockGpgKey = {
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
  "created": "2020-08-19T14:56:54+00:00",
  "modified": "2020-08-19T14:56:54+00:00"
};
