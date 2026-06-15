import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../test/fixture/Settings/userSettings";
import { users, groups } from "../../contexts/UserWorkspaceContext.test.data";
import MockPort from "../../test/mock/MockPort";
import { TEST_ROLE_USER_ID } from "../../../shared/models/entity/role/roleEntity.test.data";
import SiteSettings from "../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../test/fixture/Settings/siteSettings";
import {
  ownerGroupPermissionDto,
  ownerPermissionDto,
  readGroupPermissionDto,
  readPermissionDto,
  updateGroupPermissionDto,
  updatePermissionDto,
} from "../../../shared/models/entity/permission/permissionEntity.test.data";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultFullAvatarDto } from "../../../shared/models/entity/avatar/avatarEntity.test.data";
import { defaultProfileDto } from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import { defaultGroupDto } from "../../../shared/models/entity/group/groupEntity.test.data";

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
    setContext: function (newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
    siteSettings: new SiteSettings(siteSettingsFixture),
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
      open: jest.fn(),
    },
  };
}

const gpgKey = {
  fingerprint: "0C1D1761110D1E33C9006D1A5B1B332ED06426D3",
};

/**
 * Default resources
 */
export const resources = [
  defaultResourceDto({
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    metadata: {
      name: "apache",
      username: "www-data",
      uris: ["http://www.apache.org/"],
      description: "Apache is the world\u0027s most used web server software.",
    },
    permissions: [
      readPermissionDto({
        id: "898ce1d0-601f-5194-976b-147a680dd472",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        user: defaultUserDto({
          id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          username: "carol@passbolt.com",
          profile: defaultProfileDto({
            id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            first_name: "Carol",
            last_name: "Shaw",
            avatar: defaultFullAvatarDto({
              user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              foreign_key: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            }),
          }),
        }),
      }),
      ownerPermissionDto({
        id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
        user: defaultUserDto({
          id: "f848277c-5398-58f8-a82a-72397af2d450",
          username: "ada@passbolt.com",
          profile: defaultProfileDto({
            id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            user_id: "f848277c-5398-58f8-a82a-72397af2d450",
            first_name: "Ada",
            last_name: "Lovelace",
            avatar: defaultFullAvatarDto({
              user_id: "f848277c-5398-58f8-a82a-72397af2d450",
              foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            }),
          }),
        }),
      }),
      readPermissionDto({
        id: "c953dc56-86ee-5932-ae24-a2df7003c906",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "54c6278e-f824-5fda-91ff-3e946b18d994",
        type: 1,
        user: defaultUserDto({
          id: "54c6278e-f824-5fda-91ff-3e946b18d994",
          username: "dame@passbolt.com",
          profile: defaultProfileDto({
            id: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
            first_name: "Dame Steve",
            last_name: "Shirley",
            avatar: defaultFullAvatarDto({
              user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
              foreign_key: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "6f65173d-a5e8-5014-9659-e1bb4f19707d",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        user: defaultUserDto({
          id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          username: "betty@passbolt.com",
          profile: defaultProfileDto({
            id: "cbce5d22-46c1-51d1-b851-36b174e40611",
            user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            first_name: "Betty",
            last_name: "Holberton",
            avatar: defaultFullAvatarDto({
              user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              foreign_key: "cbce5d22-46c1-51d1-b851-36b174e40611",
            }),
          }),
        }),
      }),
    ],
    secrets: [
      {
        id: "eede75ff-316a-511c-8317-51e8339b6dcc",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        resource_id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        data: "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/\/QyHX2Ua8jvIna\/QX3fB\/TD\/cvxNNH2RJPxZ5VwKbviBZ\nzhd6pWpsX48C2bmB+Y+SQrHB\/xXX+vAvGNzwoVa4+hYG7GAoSruXpi7sYjMUanjW\nEfQ0HX5GEEv9fcFb27zcxi61ZD+3lQnhW+5cOnDZwqnL68dQZ+fPpDLBDLGNZuBA\n8t98lAV5ku3THiTctlso9Erfk4lo+Er1onFGIY4DWhSn1QcdlUb10iDLEXRuQdtk\nXrtQGCWKaI\/QLqJirtIy4DTRoq1mTN27xxScWnA+Z35pPOKaqh5vHGRvYf8xngdS\nE3f2qx4r8wlUHG3Y+\/+qU6f9dnA4DgBXMzEueQhorkdUrFalWuWg8aKmBFA5kEtc\n2GwIPQZQadg\/pFcGMCRwpSViWFlJSe2Jxy0KXVpSgRXizCFeFejDzxAcMwYm3UbD\n6uV+edvrj\/1xHxtonX\/\/QkrAjHQr7hgNZtxed23EamoajvuI6xSMH4U8LYNuK37J\nxql3e89J9d5A29ldXyhq95xGS4F+258t6oHlM4mGWZiJ97aEafgqlKjyl+kzpNo6\nWiemxUjiyjA8dyLWtyWk5RCyd\/rP0YmrsYcJpR1v8UMzWIbHr28pgQVHW56e\/gd8\nsBk0Yt33hPnT0ji28PT17TkaK61NLWLIKd29O34CMSV5kQD8rXBLhuAfZIg8RvvS\nUgEjbB3Xfh5Uo2J5gew2Zy823u98xTnsOpOkPYVGBXpW6ZKMNNq\/6rBt6TEULBrX\n1OUTkSbLwZs04S5SXGbBqXXYrnTOOPrrdKye4gANC\/0cvbE=\n=85Ee\n-----END PGP MESSAGE-----",
        created: "2020-02-21T10:39:42+00:00",
        modified: "2020-02-21T10:39:42+00:00",
      },
    ],
    permission: ownerPermissionDto({
      id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
      aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
  defaultResourceDto({
    id: "daaf057e-7fc3-5537-a8a9-e8c151890878",
    metadata: {
      name: "cakephp",
      username: "cake",
      uris: ["cakephp.org"],
      description: "The rapid and tasty php development framework",
    },
    permissions: [
      readPermissionDto({
        id: "1e11af8d-08a5-509f-b8ed-1ddeede93ccc",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        user: defaultUserDto({
          id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          username: "carol@passbolt.com",
          profile: defaultProfileDto({
            id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            first_name: "Carol",
            last_name: "Shaw",
            avatar: defaultFullAvatarDto({
              user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              foreign_key: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            }),
          }),
        }),
      }),
      ownerPermissionDto({
        id: "972bf3fc-0d5b-579c-9097-56d86394c255",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
        user: defaultUserDto({
          id: "f848277c-5398-58f8-a82a-72397af2d450",
          username: "ada@passbolt.com",
          profile: defaultProfileDto({
            id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            user_id: "f848277c-5398-58f8-a82a-72397af2d450",
            first_name: "Ada",
            last_name: "Lovelace",
            avatar: defaultFullAvatarDto({
              user_id: "f848277c-5398-58f8-a82a-72397af2d450",
              foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            }),
          }),
        }),
      }),
      readPermissionDto({
        id: "078ad063-fc87-5ecd-8388-57e434bd62e4",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "54c6278e-f824-5fda-91ff-3e946b18d994",
        type: 1,
        user: defaultUserDto({
          id: "54c6278e-f824-5fda-91ff-3e946b18d994",
          username: "dame@passbolt.com",
          profile: defaultProfileDto({
            id: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
            first_name: "Dame Steve",
            last_name: "Shirley",
            avatar: defaultFullAvatarDto({
              user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
              foreign_key: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "db1641db-b058-533d-917b-2145366536d2",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        user: defaultUserDto({
          id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          username: "betty@passbolt.com",
          profile: defaultProfileDto({
            id: "cbce5d22-46c1-51d1-b851-36b174e40611",
            user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            first_name: "Betty",
            last_name: "Holberton",
            avatar: defaultFullAvatarDto({
              user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              foreign_key: "cbce5d22-46c1-51d1-b851-36b174e40611",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "82c38b87-b9aa-5b44-a8e3-50a8b64a2fbd",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        user: defaultUserDto({
          id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
          username: "hedy@passbolt.com",
          profile: defaultProfileDto({
            id: "403c7bdf-068d-585a-8fc0-2049a131f8e6",
            user_id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
            first_name: "Hedy",
            last_name: "Lamarr",
          }),
        }),
      }),
      readPermissionDto({
        id: "cb03409b-9cd6-5d64-8df5-ff60a8a38a41",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        user: defaultUserDto({
          id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
          username: "irene@passbolt.com",
          profile: defaultProfileDto({
            id: "c551fc12-59b4-51ad-ae73-1659812e9ba5",
            user_id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            first_name: "Irene",
            last_name: "Greif",
          }),
        }),
      }),
      ownerPermissionDto({
        id: "39b95688-1652-5165-89b4-bd852022de11",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro: "User",
        type: 15,
        user: defaultUserDto({
          id: "620de627-8f07-5427-9149-e2c43219c5aa",
          username: "grace@passbolt.com",
          profile: defaultProfileDto({
            id: "d12b4113-9368-5923-9e86-deea9fdca094",
            user_id: "620de627-8f07-5427-9149-e2c43219c5aa",
            first_name: "Grace",
            last_name: "Hopper",
          }),
        }),
      }),
      ownerGroupPermissionDto({
        id: "27abc1c6-c0a5-5361-a41c-0c8426d7af39",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
        group: defaultGroupDto({
          id: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
          name: "Developer",
        }),
      }),
      readGroupPermissionDto({
        id: "ae2ea2b0-a825-5543-9c28-4f0ee6b91918",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
        group: defaultGroupDto({
          id: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
          name: "Freelancer",
        }),
      }),
      updateGroupPermissionDto({
        id: "b3ec81f7-1039-592a-afae-644b952717bc",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
        group: defaultGroupDto({
          id: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
          name: "Ergonom",
        }),
      }),
      updateGroupPermissionDto({
        id: "d06a8538-3883-5b0f-9ed7-812a75f3b9e3",
        aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        aro_foreign_key: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
        group: defaultGroupDto({
          id: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
          name: "Board",
        }),
      }),
    ],
    secrets: [
      {
        id: "eede75ff-316a-511c-8317-51e8339b6dcc",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        resource_id: "daaf057e-7fc3-5537-a8a9-e8c151890878",
        data: "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/\/QyHX2Ua8jvIna\/QX3fB\/TD\/cvxNNH2RJPxZ5VwKbviBZ\nzhd6pWpsX48C2bmB+Y+SQrHB\/xXX+vAvGNzwoVa4+hYG7GAoSruXpi7sYjMUanjW\nEfQ0HX5GEEv9fcFb27zcxi61ZD+3lQnhW+5cOnDZwqnL68dQZ+fPpDLBDLGNZuBA\n8t98lAV5ku3THiTctlso9Erfk4lo+Er1onFGIY4DWhSn1QcdlUb10iDLEXRuQdtk\nXrtQGCWKaI\/QLqJirtIy4DTRoq1mTN27xxScWnA+Z35pPOKaqh5vHGRvYf8xngdS\nE3f2qx4r8wlUHG3Y+\/+qU6f9dnA4DgBXMzEueQhorkdUrFalWuWg8aKmBFA5kEtc\n2GwIPQZQadg\/pFcGMCRwpSViWFlJSe2Jxy0KXVpSgRXizCFeFejDzxAcMwYm3UbD\n6uV+edvrj\/1xHxtonX\/\/QkrAjHQr7hgNZtxed23EamoajvuI6xSMH4U8LYNuK37J\nxql3e89J9d5A29ldXyhq95xGS4F+258t6oHlM4mGWZiJ97aEafgqlKjyl+kzpNo6\nWiemxUjiyjA8dyLWtyWk5RCyd\/rP0YmrsYcJpR1v8UMzWIbHr28pgQVHW56e\/gd8\nsBk0Yt33hPnT0ji28PT17TkaK61NLWLIKd29O34CMSV5kQD8rXBLhuAfZIg8RvvS\nUgEjbB3Xfh5Uo2J5gew2Zy823u98xTnsOpOkPYVGBXpW6ZKMNNq\/6rBt6TEULBrX\n1OUTkSbLwZs04S5SXGbBqXXYrnTOOPrrdKye4gANC\/0cvbE=\n=85Ee\n-----END PGP MESSAGE-----",
        created: "2020-02-21T10:39:42+00:00",
        modified: "2020-02-21T10:39:42+00:00",
      },
    ],
    permission: ownerPermissionDto({
      id: "972bf3fc-0d5b-579c-9097-56d86394c255",
      aco_foreign_key: "daaf057e-7fc3-5537-a8a9-e8c151890878",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
  defaultResourceDto({
    id: "690b6e40-f371-579c-b0c6-86e8ef383adc",
    metadata: {
      name: "Enlightenment",
      username: "efl",
      uris: ["https:\/\/www.enlightenment.org\/"],
      description: "Party like it\u0027s 1996.",
    },
    permissions: [
      readPermissionDto({
        id: "2169588b-cf80-51f4-82a2-4b5e914d0d47",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        user: defaultUserDto({
          id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          username: "carol@passbolt.com",
          profile: defaultProfileDto({
            id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            first_name: "Carol",
            last_name: "Shaw",
            avatar: defaultFullAvatarDto({
              user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              foreign_key: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            }),
          }),
        }),
      }),
      ownerPermissionDto({
        id: "e32b034c-d780-51f4-a89a-44042a5f69e0",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
        user: defaultUserDto({
          id: "f848277c-5398-58f8-a82a-72397af2d450",
          username: "ada@passbolt.com",
          profile: defaultProfileDto({
            id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            user_id: "f848277c-5398-58f8-a82a-72397af2d450",
            first_name: "Ada",
            last_name: "Lovelace",
            avatar: defaultFullAvatarDto({
              id: "88eebbef-d7bc-4471-8577-2ec9e55769f6",
              user_id: "f848277c-5398-58f8-a82a-72397af2d450",
              foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            }),
          }),
        }),
      }),
      readPermissionDto({
        id: "849b1743-e145-53a8-85ca-edf78823c801",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "54c6278e-f824-5fda-91ff-3e946b18d994",
        user: defaultUserDto({
          id: "54c6278e-f824-5fda-91ff-3e946b18d994",
          username: "dame@passbolt.com",
          profile: defaultProfileDto({
            id: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
            first_name: "Dame Steve",
            last_name: "Shirley",
            avatar: defaultFullAvatarDto({
              id: "8a5b82b4-6967-487f-9bb1-cdc4da78aa06",
              user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
              foreign_key: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "40e26b09-8ed0-5d15-9b0c-d595bbb3cfe4",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        user: defaultUserDto({
          id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          username: "betty@passbolt.com",
          profile: defaultProfileDto({
            id: "cbce5d22-46c1-51d1-b851-36b174e40611",
            user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            first_name: "Betty",
            last_name: "Holberton",
            avatar: defaultFullAvatarDto({
              id: "b4926859-7de7-4c80-85c1-552a2ed47e52",
              user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              foreign_key: "cbce5d22-46c1-51d1-b851-36b174e40611",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "adc451c8-d721-50f1-978f-dfb01a270ca8",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        user: defaultUserDto({
          id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
          username: "hedy@passbolt.com",
          profile: defaultProfileDto({
            id: "403c7bdf-068d-585a-8fc0-2049a131f8e6",
            user_id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
            first_name: "Hedy",
            last_name: "Lamarr",
          }),
        }),
      }),
      readPermissionDto({
        id: "98ac06ff-d605-52c6-9d38-c6d1d950439d",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        user: defaultUserDto({
          id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
          username: "irene@passbolt.com",
          profile: defaultProfileDto({
            id: "c551fc12-59b4-51ad-ae73-1659812e9ba5",
            user_id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            first_name: "Irene",
            last_name: "Greif",
          }),
        }),
      }),
      ownerPermissionDto({
        id: "d33d5e15-7b43-516a-acd1-dbb4049c03ee",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "620de627-8f07-5427-9149-e2c43219c5aa",
        user: defaultUserDto({
          id: "620de627-8f07-5427-9149-e2c43219c5aa",
          username: "grace@passbolt.com",
          profile: defaultProfileDto({
            id: "d12b4113-9368-5923-9e86-deea9fdca094",
            user_id: "620de627-8f07-5427-9149-e2c43219c5aa",
            first_name: "Grace",
            last_name: "Hopper",
          }),
        }),
      }),
      updateGroupPermissionDto({
        id: "521b4284-e8fc-55a8-8d32-03a82d3eebf3",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
        group: defaultGroupDto({
          id: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
          name: "Ergonom",
        }),
      }),
      readGroupPermissionDto({
        id: "96cbcf82-e852-5232-ade2-9b648380e59f",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
        group: defaultGroupDto({
          id: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
          name: "Board",
        }),
      }),
      ownerGroupPermissionDto({
        id: "cee750b6-60c8-55c5-bd2c-f69544b31810",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
        group: defaultGroupDto({
          id: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
          name: "Developer",
        }),
      }),
      readGroupPermissionDto({
        id: "d48886d8-0025-558f-b9b2-041bd6322053",
        aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        aro_foreign_key: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
        group: defaultGroupDto({
          id: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
          name: "Freelancer",
        }),
      }),
    ],
    secrets: [
      {
        id: "ab0712d2-3e91-5261-8c34-d420cf54fd28",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        resource_id: "690b6e40-f371-579c-b0c6-86e8ef383adc",
        data: "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/8C7BXVGXAzxWMWuYLvW2aPBrJKFy7wiUueu2dpWuDNYYA\nJ0R9UM8nERhr0SXnXGtRO24WTkmnhOpvPhWAm4lUi3YB8YYof17VGh+Gp4aP6oV9\nCNqj7OTZjk686lYqScozlMkiH5oYjTql51nYzwJ4r7\/kakQiV6tbUii6P1p6FNmQ\n8bICUWRpOo+eR8eLwGfwaHRs8RgpX5MyawWuue282W3C0tAzhiu7m4qAViCk4l87\nq0gtob2EBjbFUK3VBMwbhA9Ouz9HF2gXv1iWqoNrcbikYs4xpUeZmZUs4kq6RXhT\nzNo+XoN6No77IHj4OTaSs6LEoKpxEImUGy6dYn1F2xuxd9kfTgTRMTI38ncosJ0C\nTnoxSy85TXu\/RtoVgdGKau54PFO9tzZDBRy\/mlMQ+MTpPEiETu5A4im8dVhn4z1l\nHlWEpV1d8uU\/DBmBPcpeFH47Ddrnr7osa4Di2KbBKZG10aXNd54AdISKnRuYNFJG\nTxap9iXWXjJ4gdgmwbiC2\/a6UGTWZ64gR8rju86x89OrNNh5WLsgckAbDVsUGfKC\nsGSr7O2up91Nd9yz14hYMwG1zKlCdnTRJSrixg8TLMN7BajqhRRgM71q8UrLSoRu\nDv38dkioVmAv+OpdjatqGBd8JJQ9hU9taJNq5wSBslUMpdEakHlo5GwH7G+lq7LS\nRQEJNFM0R68+k5cYP1pyWhVHjZA67MqmmqfRWLYD9sKj+3xnpMPfhyVPLfUywxJz\nTmMSP2l5rS5aDyNOrJBbxH6CREcCUQ==\n=2eQk\n-----END PGP MESSAGE-----",
        created: "2020-02-21T10:39:42+00:00",
        modified: "2020-02-21T10:39:42+00:00",
      },
    ],
    permission: ownerPermissionDto({
      id: "e32b034c-d780-51f4-a89a-44042a5f69e0",
      aco_foreign_key: "690b6e40-f371-579c-b0c6-86e8ef383adc",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
  defaultResourceDto({
    id: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    metadata: {
      name: "Grogle",
      username: "grd",
      uris: ["http://fr.groland.wikia.com/wiki/Grogle"],
      description: "",
    },
    permissions: [
      readPermissionDto({
        id: "39acc708-f643-548f-b305-14236220327d",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        user: defaultUserDto({
          id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
          username: "carol@passbolt.com",
          profile: defaultProfileDto({
            id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
            first_name: "Carol",
            last_name: "Shaw",
            avatar: defaultFullAvatarDto({
              user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
              foreign_key: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
            }),
          }),
        }),
      }),
      ownerGroupPermissionDto({
        id: "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
        group: null,
        user: defaultUserDto({
          id: "f848277c-5398-58f8-a82a-72397af2d450",
          username: "ada@passbolt.com",
          profile: defaultProfileDto({
            id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            user_id: "f848277c-5398-58f8-a82a-72397af2d450",
            first_name: "Ada",
            last_name: "Lovelace",
            avatar: defaultFullAvatarDto({
              user_id: "f848277c-5398-58f8-a82a-72397af2d450",
              foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            }),
          }),
        }),
      }),
      readPermissionDto({
        id: "81b479f4-5661-5050-834e-aa9d79a90a45",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "54c6278e-f824-5fda-91ff-3e946b18d994",
        user: defaultUserDto({
          id: "54c6278e-f824-5fda-91ff-3e946b18d994",
          username: "dame@passbolt.com",
          profile: defaultProfileDto({
            id: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
            first_name: "Dame Steve",
            last_name: "Shirley",
            avatar: defaultFullAvatarDto({
              user_id: "54c6278e-f824-5fda-91ff-3e946b18d994",
              foreign_key: "2766ff6b-87f1-53a9-98fd-72cd32a3df69",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "ec3a3692-6451-5417-a9e7-243dda8acbae",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        user: defaultUserDto({
          id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          username: "betty@passbolt.com",
          profile: defaultProfileDto({
            id: "cbce5d22-46c1-51d1-b851-36b174e40611",
            user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            first_name: "Betty",
            last_name: "Holberton",
            avatar: defaultFullAvatarDto({
              user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              foreign_key: "cbce5d22-46c1-51d1-b851-36b174e40611",
            }),
          }),
        }),
      }),
      updatePermissionDto({
        id: "b8e7077e-460c-52bc-a5b5-05b5add5ef8e",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
        user: defaultUserDto({
          id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
          username: "hedy@passbolt.com",
          profile: defaultProfileDto({
            id: "403c7bdf-068d-585a-8fc0-2049a131f8e6",
            user_id: "8d04cf98-716b-5f6d-9fe8-c130f8992646",
            first_name: "Hedy",
            last_name: "Lamarr",
          }),
        }),
      }),
      readPermissionDto({
        id: "5b1d78a2-15f2-5be3-9a1a-412ddf83e6f6",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
        user: defaultUserDto({
          id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
          username: "irene@passbolt.com",
          profile: defaultProfileDto({
            id: "c551fc12-59b4-51ad-ae73-1659812e9ba5",
            user_id: "904bcd9f-ff51-5cfd-9de8-d2c876ade498",
            first_name: "Irene",
            last_name: "Greif",
          }),
        }),
      }),
      ownerPermissionDto({
        id: "557496ad-e177-529a-a91e-3cdcd15df167",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "620de627-8f07-5427-9149-e2c43219c5aa",
        user: defaultUserDto({
          id: "620de627-8f07-5427-9149-e2c43219c5aa",
          username: "grace@passbolt.com",
          profile: defaultProfileDto({
            id: "d12b4113-9368-5923-9e86-deea9fdca094",
            user_id: "620de627-8f07-5427-9149-e2c43219c5aa",
            first_name: "Grace",
            last_name: "Hopper",
          }),
        }),
      }),
      ownerGroupPermissionDto({
        id: "3068c70f-cbe4-5c32-8921-eec07777166b",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
        group: defaultGroupDto({
          id: "fc299a60-3ed9-5e54-8ba7-3de125660ae2",
          name: "Developer",
        }),
      }),
      readGroupPermissionDto({
        id: "3bb4592e-7788-538f-bb7b-e3136e8ce28e",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
        group: defaultGroupDto({
          id: "36563004-3f25-50c0-b22e-6554c3ccc4e7",
          name: "Board",
        }),
      }),
      updateGroupPermissionDto({
        id: "a6bdc2d9-3c37-5fc4-a383-ec1249ff5611",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
        group: defaultGroupDto({
          id: "eabe3a36-9bfb-5eba-b1aa-56eff5530006",
          name: "Ergonom",
        }),
      }),
      readGroupPermissionDto({
        id: "fc64507b-6a84-5454-a1c7-e0fac3513abd",
        aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        aro_foreign_key: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
        group: defaultGroupDto({
          id: "15cec625-8417-5533-bdb1-a17aec0bfcf4",
          name: "Freelancer",
        }),
      }),
    ],
    secrets: [
      {
        id: "95031fd8-c742-5074-a0b6-4b63133943e1",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        resource_id: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        data: "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/+IFdDbauO7X3uIxB\/4P8PND7F5BunfuPWwNLXHMG8pvEP\nJOp1D+MksVySCbpuliX\/qoOtoaiafSqVoqAzLW7tbc7e8ojuE+gZrvNpUP8Ng80I\nnGKnx74Nnx5C2Pyg6c4MUyk8rsOoQrPENm72u1J8VzmD8rYe6m1bgF\/arx\/zOwMv\nLUMy+QmbgXNmi0HMk9ZAWNS+OlZDYN2dcSqb13aztOewqmDPgQPO+dK6BM2MZEIo\nrrUBFmqV8kaWYrMuRBkCjzztOt9\/IjindOdirCa9C4mL5ST4wpclYrGDTzpoyojV\nP018\/pGWzDDBgI+SOvlkqcJI4or\/fPlWyjVd38tgJ0fAQT\/9ZQ3lAsPeIXKmGJ4S\nbwABTMQdMkl257LprdWnBO1j3eXUahmkpzSVAxOX9E5Cxmg7syYnKjCa2DKauXOW\nSirqkt\/\/e0nxEcDVx3czhveVNJ44PYBP4bgCuG9ddD5OB2zmJS\/i7t6DvZMCzPET\nYx\/TZuKJMbPkpZ3j89U0KHitjCgTCJUJMGxT6opsL0yG7B5SNjIvSnaQYy4n5BhQ\nxZLJRYAAeEwkChGsg08o3+E9Rqscno5dtpTTxLtqnesQc90yOS7nMgj03TRjd6Qu\nDFyPw05m34vKkDIRYk8AnIWKamQmVUU1IK6McZXxD1swCieTNilA92oi6KmsB3DS\nQwFXCjUoKE1\/QRVOpDMdzCE1CbRaVCB5IB\/tGYNXdXrfxj33TAhOxZ7P6FwS6Mr4\ngIvN9K85D9DSdc6zB1K\/J8iqYQs=\n=sbNr\n-----END PGP MESSAGE-----",
        created: "2020-02-21T10:39:42+00:00",
        modified: "2020-02-21T10:39:42+00:00",
      },
    ],
    permission: ownerPermissionDto({
      id: "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
      aco_foreign_key: "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
];

export const folders = [
  {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    name: "apache",
    username: "www-data",
    uri: "http:\/\/www.apache.org\/",
    description: "Apache is the world\u0027s most used web server software.",
    deleted: false,
    created: "2020-02-19T10:39:29+00:00",
    modified: "2020-02-20T10:39:29+00:00",
    created_by: "f848277c-5398-58f8-a82a-72397af2d450",
    modified_by: "f848277c-5398-58f8-a82a-72397af2d450",
    permissions: [
      {
        id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        aco: "Folder",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro: "User",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
        type: 15,
        created: "2020-02-21T10:39:30+00:00",
        modified: "2020-02-21T10:39:30+00:00",
        group: null,
        user: {
          id: "f848277c-5398-58f8-a82a-72397af2d450",
          role_id: TEST_ROLE_USER_ID,
          username: "ada@passbolt.com",
          active: true,
          deleted: false,
          created: "2019-12-21T10:39:26+00:00",
          modified: "2020-01-21T10:39:26+00:00",
          profile: {
            id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            user_id: "f848277c-5398-58f8-a82a-72397af2d450",
            first_name: "Ada",
            last_name: "Lovelace",
            created: "2020-02-21T10:39:26+00:00",
            modified: "2020-02-21T10:39:26+00:00",
            avatar: {
              id: "88eebbef-d7bc-4471-8577-2ec9e55769f6",
              user_id: "f848277c-5398-58f8-a82a-72397af2d450",
              foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
              model: "Avatar",
              filename: "ada.png",
              filesize: 170049,
              mime_type: "image\/png",
              extension: "png",
              hash: "97e36ab6528e26e3b9f988444ef490f125f49a39",
              path: "Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.png",
              adapter: "Local",
              created: "2020-02-21T10:39:28+00:00",
              modified: "2020-02-21T10:39:28+00:00",
              url: {
                medium:
                  "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.a99472d5.png",
                small:
                  "img\/public\/Avatar\/a7\/32\/96\/88eebbefd7bc447185772ec9e55769f6\/88eebbefd7bc447185772ec9e55769f6.65a0ba70.png",
              },
            },
          },
          last_logged_in: "",
        },
      },
      {
        id: "6f65173d-a5e8-5014-9659-e1bb4f19707d",
        aco: "Folder",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro: "User",
        aro_foreign_key: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
        type: 7,
        created: "2020-02-21T10:39:30+00:00",
        modified: "2020-02-21T10:39:30+00:00",
        group: null,
        user: {
          id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
          role_id: TEST_ROLE_USER_ID,
          username: "betty@passbolt.com",
          active: true,
          deleted: false,
          created: "2020-02-07T10:39:26+00:00",
          modified: "2020-02-14T10:39:26+00:00",
          profile: {
            id: "cbce5d22-46c1-51d1-b851-36b174e40611",
            user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
            first_name: "Betty",
            last_name: "Holberton",
            created: "2020-02-21T10:39:26+00:00",
            modified: "2020-02-21T10:39:26+00:00",
            avatar: {
              id: "b4926859-7de7-4c80-85c1-552a2ed47e52",
              user_id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
              foreign_key: "cbce5d22-46c1-51d1-b851-36b174e40611",
              model: "Avatar",
              filename: "betty.png",
              filesize: 115942,
              mime_type: "image\/png",
              extension: "png",
              hash: "820a0cb765217a0e765f3a0abbb2e98b62ddecc1",
              path: "Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.png",
              adapter: "Local",
              created: "2020-02-21T10:39:28+00:00",
              modified: "2020-02-21T10:39:28+00:00",
              url: {
                medium:
                  "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.a99472d5.png",
                small:
                  "img\/public\/Avatar\/01\/7a\/e3\/b49268597de74c8085c1552a2ed47e52\/b49268597de74c8085c1552a2ed47e52.65a0ba70.png",
              },
            },
          },
          last_logged_in: "",
        },
      },
    ],
    secrets: [
      {
        id: "eede75ff-316a-511c-8317-51e8339b6dcc",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        resource_id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        data: "-----BEGIN PGP MESSAGE-----\n\nhQIMA1P90Qk1JHA+AQ\/\/QyHX2Ua8jvIna\/QX3fB\/TD\/cvxNNH2RJPxZ5VwKbviBZ\nzhd6pWpsX48C2bmB+Y+SQrHB\/xXX+vAvGNzwoVa4+hYG7GAoSruXpi7sYjMUanjW\nEfQ0HX5GEEv9fcFb27zcxi61ZD+3lQnhW+5cOnDZwqnL68dQZ+fPpDLBDLGNZuBA\n8t98lAV5ku3THiTctlso9Erfk4lo+Er1onFGIY4DWhSn1QcdlUb10iDLEXRuQdtk\nXrtQGCWKaI\/QLqJirtIy4DTRoq1mTN27xxScWnA+Z35pPOKaqh5vHGRvYf8xngdS\nE3f2qx4r8wlUHG3Y+\/+qU6f9dnA4DgBXMzEueQhorkdUrFalWuWg8aKmBFA5kEtc\n2GwIPQZQadg\/pFcGMCRwpSViWFlJSe2Jxy0KXVpSgRXizCFeFejDzxAcMwYm3UbD\n6uV+edvrj\/1xHxtonX\/\/QkrAjHQr7hgNZtxed23EamoajvuI6xSMH4U8LYNuK37J\nxql3e89J9d5A29ldXyhq95xGS4F+258t6oHlM4mGWZiJ97aEafgqlKjyl+kzpNo6\nWiemxUjiyjA8dyLWtyWk5RCyd\/rP0YmrsYcJpR1v8UMzWIbHr28pgQVHW56e\/gd8\nsBk0Yt33hPnT0ji28PT17TkaK61NLWLIKd29O34CMSV5kQD8rXBLhuAfZIg8RvvS\nUgEjbB3Xfh5Uo2J5gew2Zy823u98xTnsOpOkPYVGBXpW6ZKMNNq\/6rBt6TEULBrX\n1OUTkSbLwZs04S5SXGbBqXXYrnTOOPrrdKye4gANC\/0cvbE=\n=85Ee\n-----END PGP MESSAGE-----",
        created: "2020-02-21T10:39:42+00:00",
        modified: "2020-02-21T10:39:42+00:00",
      },
    ],
    permission: {
      id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
      aco: "Folder",
      aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
      aro: "User",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      type: 15,
      created: "2020-02-21T10:39:30+00:00",
      modified: "2020-02-21T10:39:30+00:00",
    },
  },
];

export const mockResultsResources = {
  "passbolt.resources.find-all-by-ids-for-display-permissions": resources,
  "passbolt.keyring.get-public-key-info-by-user": gpgKey,
  "passbolt.share.resources.save": true,
};

export const mockResultsFolders = {
  "passbolt.share.get-folders": folders,
  "passbolt.keyring.get-public-key-info-by-user": gpgKey,
  "passbolt.share.folders.save": true,
};

export const mockResultsResourcesAndFolders = {
  "passbolt.share.find-resources-for-share": resources,
  "passbolt.share.get-folders": folders,
  "passbolt.keyring.get-public-key-info-by-user": gpgKey,
};
