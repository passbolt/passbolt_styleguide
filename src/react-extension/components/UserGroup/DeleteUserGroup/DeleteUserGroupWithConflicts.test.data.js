import MockPort from "../../../test/mock/MockPort";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceMetadataDto} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {ownerFolderPermissionDto, ownerPermissionDto, readFolderPermissionDto, readGroupPermissionDto, readPermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {defaultFolderDto} from "../../../../shared/models/entity/folder/folderEntity.test.data";
import {defaultGroupDto} from "../../../../shared/models/entity/group/groupEntity.test.data";
import {defaultGroupUser} from "../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import {defaultProfileDto} from "../../../../shared/models/entity/profile/ProfileEntity.test.data";
import {defaultFullAvatarDto} from "../../../../shared/models/entity/avatar/avatarEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    users: mockUsers,
    groups: mockGroups,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn()
  };
}

/**
 * Mocked a user
 */
export const mockUsers = [
  defaultUserDto({
    id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    role_id: TEST_ROLE_USER_ID,
    username: "carol@passbolt.com",
    profile: defaultProfileDto({
      id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
      user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      first_name: "Carol",
      last_name: "Shaw",
      avatar: defaultFullAvatarDto({
        id: "0f769127-3053-45e4-bd8e-75e766bb4d52",
        user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
        foreign_key: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
      })
    }),
    __placeholder_last_logged_in__: "",
    last_logged_in: ""
  }),
  defaultUserDto({
    id: "f848277c-5398-58f8-a82a-72397af2d450",
    role_id: TEST_ROLE_USER_ID,
    role: {
      id: TEST_ROLE_USER_ID,
      created: "2012-07-04T13:39:25+00:00",
      description: "Logged in user",
      modified: "2012-07-04T13:39:25+00:00",
      name: "user"
    },
    username: "ada@passbolt.com",
    profile: defaultProfileDto({
      id: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      user_id: "f848277c-5398-58f8-a82a-72397af2d450",
      first_name: "Ada",
      last_name: "Lovelace",
      avatar: defaultFullAvatarDto({
        id: "b5e7a332-595f-4e52-9591-79df27f8a978",
        user_id: "f848277c-5398-58f8-a82a-72397af2d450",
        foreign_key: "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        filename: "ada.png",
        filesize: 170049,
        hash: "97e36ab6528e26e3b9f988444ef490f125f49a39",
        path: "Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.png",
        url: {
          medium: "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.a99472d5.png",
          small: "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.65a0ba70.png"
        }
      }),
    }),
    __placeholder_last_logged_in__: "2020-05-12T15:56:49+00:00",
    last_logged_in: "2020-08-12T15:56:49+00:00"
  })
];

/**
 * Mocked a group
 */
export const mockGroups = [
  defaultGroupDto({
    id: "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
    name: "Test",
    my_group_user: defaultGroupUser({
      id: "2510a118-c838-5470-a0dd-aff268d4a2b6",
      group_id: "516c2db6-0aed-52d8-854f-b3f3499995e7",
      user_id: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      is_admin: true,
    }),
    groups_users: [
      defaultGroupUser({
        id: "16714bc3-f96d-5a36-a10a-088094b5bcbc",
        group_id: "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
        user_id: "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
        is_admin: true,
      }),
      defaultGroupUser({
        id: "285dc1c5-c358-507e-af2a-9201d9fed9f5",
        group_id: "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
        user_id: "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
        is_admin: true,
      }),
    ],
  })
];

/**
 * Mocked a group
 */
export const mockGroup = defaultGroupDto({
  id: "516c2db6-0aed-52d8-854f-b3f3499995e7",
  name: "Leadership team",
  my_group_user: defaultGroupUser({
    id: "2510a118-c838-5470-a0dd-aff268d4a2b6",
    group_id: "516c2db6-0aed-52d8-854f-b3f3499995e7",
    user_id: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    is_admin: true,
  }),
  groups_users: [
    defaultGroupUser({
      id: "16714bc3-f96d-5a36-a10a-088094b5bcbc",
      group_id: "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
      user_id: "1e73e104-d53e-579d-a0c4-e9aeaca76c56",
      is_admin: true,
    }),
    defaultGroupUser({
      id: "285dc1c5-c358-507e-af2a-9201d9fed9f5",
      group_id: "00ddc3e6-17d6-5a18-b793-05a4484a71a7",
      user_id: "86b3eb2f-2dd0-56b3-8978-920615cf7c17",
      is_admin: true,
    }),
  ],
});

/**
 * Mocked folders conflict
 */
export const mockFolders = [
  defaultFolderDto({
    id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    name: "Accounting",
    permissions: [
      readFolderPermissionDto({
        id: "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
        aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      }),
      ownerFolderPermissionDto({
        id: "17336097-cd30-57ab-bc40-89b31bcc513f",
        aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      }),
    ],
  }),
  defaultFolderDto({
    id: "6592f71b-8874-5e91-bf6d-829b8ad188f5",
    name: "Bank",
    folder_parent_id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    permissions: [
      readFolderPermissionDto({
        id: "c5355878-fb96-5c21-8bb5-e8de4b24db8b",
        aco_foreign_key: "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      }),
      ownerFolderPermissionDto({
        id: "875cb5d4-fa9a-57cb-908d-3721264e98b1",
        aco_foreign_key: "6592f71b-8874-5e91-bf6d-829b8ad188f5",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      })
    ],
  }),
  defaultFolderDto({
    id: "7ecd7376-8540-58c1-88d9-678c027d464a",
    name: "Blogs",
    folder_parent_id: "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    permissions: [
      readFolderPermissionDto({
        id: "e8ffb030-09f5-54cd-ad64-68e3e983a3d4",
        aco_foreign_key: "7ecd7376-8540-58c1-88d9-678c027d464a",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      }),
      ownerFolderPermissionDto({
        id: "64e2a52c-2a3b-5a0d-88f9-4b6776fae07c",
        aco_foreign_key: "7ecd7376-8540-58c1-88d9-678c027d464a",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      }),
    ],
  })
];

/**
 * Mocked resources conflict
 */
export const mockResources = [
  defaultResourceDto({
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    metadata: defaultResourceMetadataDto({
      name: "apache",
      username: "www-data",
      uris: ["http://www.apache.org/"],
      description: "Apache is the world\u0027s most used web server software.",
    }),
    "permissions": [
      ownerPermissionDto({
        id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      }),
      readPermissionDto({
        id: "898ce1d0-601f-5194-976b-147a680dd472",
        aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      }),
    ]
  }),
  defaultResourceDto({
    id: "f9f79749-4bce-4e61-8016-68c942a8f2d9",
    folder_parent_id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    personal: false,
    metadata: defaultResourceMetadataDto({
      name: "test_autocomplete_tag",
      username: "",
      uri: "fuzdo",
      description: "",
    }),
    permissions: [
      ownerPermissionDto({
        id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a77",
        aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      }),
      readPermissionDto({
        id: "fa5f5d7a-32cc-4c5b-9478-f58584ca4222",
        aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        aro_foreign_key: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      }),
      readGroupPermissionDto({
        id: "za5f5d7a-32cc-4c5b-9478-f58584ca4222",
        aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9",
        aro_foreign_key: "d57c10f5-639d-5160-9c81-8a0c6c4ec857",
      }),
    ],
  }),
];
