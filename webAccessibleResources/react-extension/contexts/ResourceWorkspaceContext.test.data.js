/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import MockPort from "../test/mock/MockPort";
import {ResourceWorkspaceFilterTypes} from "./ResourceWorkspaceContext";
import {defaultFolderDto, folderWithReadPermissionDto} from "../../shared/models/entity/folder/folderEntity.test.data";
import {defaultResourceDto} from "../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * @deprecated should use defaultUserAppContext.
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    siteSettings: {
      canIUse: () => true
    },
    resources,
    folders
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
 * Returns the default resource workspace context data.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function defaultResourceWorkspaceContext(data = {}) {
  return {
    details: {
      folder: null,
      resource: null,
    },
    filteredResources: [],
    selectedResources: [],
    filter: {
      type: ResourceWorkspaceFilterTypes.ALL
    },
    scrollTo: {
    },
    sorter: {
      propertyName: 'modified'
    },
    onGoToResourceUriRequested: jest.fn(),
    onResourceCopied: jest.fn(),
    onResourceSelected: {
      all: jest.fn(),
      none: jest.fn(),
      multiple: jest.fn(),
      range: jest.fn(),
      single: jest.fn()
    },
    onResourceScrolled: jest.fn(),
    onSorterChanged: jest.fn(),
    onResourcesToExport: jest.fn(),
    onResourceFileImportResult: jest.fn(),
    onResourceFileToImport: jest.fn(),
    onLockDetail: jest.fn(),
    ...data
  };
}

/**
 * Returns the resource workspace context data with a folder I own selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedFolderIOwn(data = {}) {
  return defaultResourceWorkspaceContext({
    filter: {
      type: ResourceWorkspaceFilterTypes.FOLDER,
      payload: {
        folder: defaultFolderDto()
      }
    },
    ...data
  });
}

/**
 * Returns the resource workspace context data with a folder I can read only selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedFolderICanRead(data = {}) {
  return defaultResourceWorkspaceContext({
    filter: {
      type: ResourceWorkspaceFilterTypes.FOLDER,
      payload: {
        folder: folderWithReadPermissionDto()
      }
    },
    ...data
  });
}

/**
 * Returns the resource workspace context data with a resource I own selected.
 * @param {object} data Override the default context.
 * @returns {object}
 */
export function resourceWorkspaceContextWithSelectedResourceIOwn(data = {}) {
  return defaultResourceWorkspaceContext({
    details: {
      resource: defaultResourceDto(),
    },
    ...data
  });
}

/**
 * Default resources
 */
const resources = [
  {
    "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "name": "apache",
    "username": "www-data",
    "uri": "http:\/\/www.apache.org\/",
    "description": "Apache is the world\u0027s most used web server software.",
    "deleted": false,
    "created": "2020-08-25T08:35:19+00:00",
    "modified": "2020-08-26T08:35:19+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "favorite": {
      "id": "56216dba-b6da-592b-87cb-fb5cbbd0a424",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
      "foreign_model": "Resource",
      "created": "2020-08-27T08:35:21+00:00",
      "modified": "2020-08-27T08:35:21+00:00"
    },
    "permission": {
      "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
      "aco": "Resource",
      "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 15,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "1c8afebc-7e23-51bd-a0b6-2e695afeb32f",
        "slug": "#charlie",
        "is_shared": true
      },
      {
        "id": "ecd059e8-4cb3-574b-a063-6083e272ef27",
        "slug": "#golf",
        "is_shared": true
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "09c790c0-c003-53c8-a640-25d33cfebc22",
    "name": "bower",
    "username": "bower",
    "uri": "bower.io",
    "description": "A package manager for the web!",
    "deleted": false,
    "created": "2018-08-27T08:35:19+00:00",
    "modified": "2019-08-27T08:35:19+00:00",
    "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "favorite": null,
    "permission": {
      "id": "672728ac-c3f2-52a5-a21c-07dfe84b7ad9",
      "aco": "Resource",
      "aco_foreign_key": "09c790c0-c003-53c8-a640-25d33cfebc22",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "name": "cakephp",
    "username": "cake",
    "uri": "cakephp.org",
    "description": "The rapid and tasty php development framework",
    "deleted": false,
    "created": "2020-08-27T06:35:19+00:00",
    "modified": "2020-08-27T07:35:19+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "favorite": null,
    "permission": {
      "id": "972bf3fc-0d5b-579c-9097-56d86394c255",
      "aco": "Resource",
      "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 14,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "094e27f0-637c-5397-b16c-f3eee5f7dd6c",
        "slug": "hotel",
        "is_shared": false
      },
      {
        "id": "0507cbbb-eb14-5121-9105-05380dbe64ff",
        "slug": "\u092a\u0930\u0926\u0947\u0936\u0940-\u092a\u0930\u0926\u0947\u0936\u0940",
        "is_shared": false
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "c8b93000-56b3-5a16-8048-c579d1babbd7",
    "name": "Canjs",
    "username": "yeswecan",
    "uri": "canjs.com",
    "description": "CanJS is a JavaScript library that makes developing complex applications simple and fast.",
    "deleted": false,
    "created": "2020-08-13T08:35:19+00:00",
    "modified": "2020-08-20T08:35:19+00:00",
    "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "favorite": null,
    "permission": {
      "id": "4283465f-2ef8-5821-8f13-441de586c7cb",
      "aco": "Resource",
      "aco_foreign_key": "c8b93000-56b3-5a16-8048-c579d1babbd7",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "6e66e10e-36d7-5d4e-8fa2-8474e4510819",
    "name": "centos",
    "username": "root",
    "uri": "centos.org",
    "description": "The CentOS Linux distribution is a platform derived from Red Hat Enterprise Linux (RHEL).",
    "deleted": false,
    "created": "2020-06-27T08:35:19+00:00",
    "modified": "2020-07-27T08:35:19+00:00",
    "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "favorite": null,
    "permission": {
      "id": "b83d3700-6b9c-51a1-8cf7-007fad9423d0",
      "aco": "Resource",
      "aco_foreign_key": "6e66e10e-36d7-5d4e-8fa2-8474e4510819",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "f7cef480-fcc3-5c20-a043-340c62e89cd8",
    "name": "composer",
    "username": "getcomposer",
    "uri": "getcomposer.org",
    "description": "Dependency Manager for PHP",
    "deleted": false,
    "created": "2020-08-27T08:33:19+00:00",
    "modified": "2020-08-27T08:34:19+00:00",
    "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "favorite": null,
    "permission": {
      "id": "69e1efd1-fcb5-5555-8fb4-514af8b3220c",
      "aco": "Resource",
      "aco_foreign_key": "f7cef480-fcc3-5c20-a043-340c62e89cd8",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "2a08d0ad-cd50-5f06-a1b1-a2fa46e44d3f",
    "name": "Debian",
    "username": "jessy",
    "uri": "passbolt.dev",
    "description": "The universal operating system",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "favorite": null,
    "permission": {
      "id": "d6d138e6-18f7-5411-b560-b26d589ef6ab",
      "aco": "Resource",
      "aco_foreign_key": "2a08d0ad-cd50-5f06-a1b1-a2fa46e44d3f",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "9e2d7f42-4164-5882-9445-92e42a8cf067",
    "name": "Docker",
    "username": "docker",
    "uri": "https:\/\/www.docker.com\/",
    "description": "An open platform for distributed applications for developers and sysadmins",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "favorite": null,
    "permission": {
      "id": "91940345-7e5f-5465-b2b1-93d440207097",
      "aco": "Resource",
      "aco_foreign_key": "9e2d7f42-4164-5882-9445-92e42a8cf067",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "690b6e40-f371-579c-b0c6-86e8ef383adc",
    "name": "Enlightenment",
    "username": "efl",
    "uri": "https:\/\/www.enlightenment.org\/",
    "description": "Party like it\u0027s 1996.",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "favorite": null,
    "permission": {
      "id": "e32b034c-d780-51f4-a89a-44042a5f69e0",
      "aco": "Resource",
      "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 14,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "4d7adb92-0d85-56d7-8b92-e2b919ef8eb8",
    "name": "framasoft",
    "username": "framasoft",
    "uri": "https:\/\/soutenir.framasoft.org\/",
    "description": "Parce que libre ne veut pas dire gratuit!",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "favorite": null,
    "permission": {
      "id": "0718ec88-a867-57b8-ad9f-671237554469",
      "aco": "Resource",
      "aco_foreign_key": "4d7adb92-0d85-56d7-8b92-e2b919ef8eb8",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "662497d8-7f1d-550a-9133-0fedd7250867",
    "name": "free software foundation europe",
    "username": "fsfe",
    "uri": "https:\/\/fsfe.org\/index.en.html",
    "description": "Free Software Foundation Europe is a charity that empowers users to control technology.",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "favorite": null,
    "permission": {
      "id": "6fc269ec-2b6f-5d42-ad25-c10f7f3bb731",
      "aco": "Resource",
      "aco_foreign_key": "662497d8-7f1d-550a-9133-0fedd7250867",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "90da24d8-9862-59e4-8748-33cd4563bd81",
    "name": "ftp",
    "username": "user",
    "uri": "ftp:\/\/192.168.1.1",
    "description": "ftp test",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "favorite": null,
    "permission": {
      "id": "f423c773-9138-5a33-a269-195233a41fad",
      "aco": "Resource",
      "aco_foreign_key": "90da24d8-9862-59e4-8748-33cd4563bd81",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "c03f9013-b8bd-59fd-8076-d66292180550",
        "slug": "alpha",
        "is_shared": false
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "d2ab45e9-0d70-5ae3-a373-d2f381bccd99",
    "name": "Git",
    "username": "git",
    "uri": "git-scm.com",
    "description": "Git is a free and open source distributed version control system.",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
    "favorite": null,
    "permission": {
      "id": "66073597-5323-5413-a6bd-b288b724b2c3",
      "aco": "Resource",
      "aco_foreign_key": "d2ab45e9-0d70-5ae3-a373-d2f381bccd99",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "c03f9013-b8bd-59fd-8076-d66292180550",
        "slug": "alpha",
        "is_shared": false
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "73e3309f-1121-5eca-8777-37a7451ee386",
    "name": "Gnupg",
    "username": "gpg",
    "uri": "gnupg.org",
    "description": "GnuPG is a complete and free implementation of the OpenPGP standard as defined by RFC4880",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "favorite": null,
    "permission": {
      "id": "a79f4026-0162-588a-90f8-9b83f62ad71b",
      "aco": "Resource",
      "aco_foreign_key": "73e3309f-1121-5eca-8777-37a7451ee386",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "5759feb8-6f6c-5fee-9d3a-c5e90ca0c937",
        "slug": "#echo",
        "is_shared": true
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
    "name": "Grogle",
    "username": "grd",
    "uri": "http:\/\/fr.groland.wikia.com\/wiki\/Grogle",
    "description": "",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "favorite": null,
    "permission": {
      "id": "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
      "aco": "Resource",
      "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 14,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "c03f9013-b8bd-59fd-8076-d66292180550",
        "slug": "alpha",
        "is_shared": false
      },
      {
        "id": "54d4d6e4-982e-5b50-a739-313104c800df",
        "slug": "firefox",
        "is_shared": false
      },
      {
        "id": "14ae2fc4-a235-588f-8f19-98cce08808aa",
        "slug": "fox-trot",
        "is_shared": false
      },
      {
        "id": "094e27f0-637c-5397-b16c-f3eee5f7dd6c",
        "slug": "hotel",
        "is_shared": false
      }
    ],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
    "name": "Inkscape",
    "username": "vector",
    "uri": "https:\/\/inkscape.org\/",
    "description": "Inkscape is a professional vector graphics editor. It is free and open source.",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "favorite": null,
    "permission": {
      "id": "9ea3efed-b358-541c-8379-7b7162a8f562",
      "aco": "Resource",
      "aco_foreign_key": "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": null,
    "personal": false
  },
  {
    "id": "77d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
    "name": "Inside Private Passwor",
    "username": "vector",
    "uri": "https:\/\/private.org\/",
    "description": "Private is a professional private editor.",
    "deleted": false,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00",
    "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
    "favorite": null,
    "permission": {
      "id": "9ea3efed-b358-541c-8379-7b7162a8f562",
      "aco": "Resource",
      "aco_foreign_key": "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [],
    "folder_parent_id": "907c3f61-f416-5834-86d2-e721501ee493",
    "personal": true
  }
];

const folders = [{
  "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "name": "Accounting",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
  "name": "Bank",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "c5355878-fb96-5c21-8bb5-e8de4b24db8b",
    "aco": "Folder",
    "aco_foreign_key": "6592f71b-8874-5e91-bf6d-829b8ad188f5",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}, {
  "id": "7ecd7376-8540-58c1-88d9-678c027d464a",
  "name": "Blogs",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "e8ffb030-09f5-54cd-ad64-68e3e983a3d4",
    "aco": "Folder",
    "aco_foreign_key": "7ecd7376-8540-58c1-88d9-678c027d464a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "personal": false
}, {
  "id": "3ed65efd-7c41-5906-9c02-71e2d95951da",
  "name": "Certificates",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3a2611ed-cbcb-523f-b095-a130187173ae",
    "aco": "Folder",
    "aco_foreign_key": "3ed65efd-7c41-5906-9c02-71e2d95951da",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "name": "Communication",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "35ac3960-fe92-5a8d-ba40-3628445679a5",
    "aco": "Folder",
    "aco_foreign_key": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
  "name": "Continous Integration",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "00e7e1df-b1f6-5fb1-b6d0-cbcb15fa80d8",
    "aco": "Folder",
    "aco_foreign_key": "e16af4fd-94a4-5816-b73b-5f1bb8e88384",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
  "name": "Credit Cards",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "9e458b44-62bf-54fb-a4bc-dd83e71a1123",
    "aco": "Folder",
    "aco_foreign_key": "a5f0d94d-0fa3-5d82-9800-dda68820ec7c",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 7,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}, {
  "id": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
  "name": "Human Resources",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "480c325f-ce9c-5086-8400-339877e06bd6",
    "aco": "Folder",
    "aco_foreign_key": "5452ecb2-0625-50d1-b1ef-d2038f5830b6",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "299f613b-0706-570a-8636-956186384e0a",
  "name": "IT",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "8e1cb9e9-363b-57d0-b8b7-c85f5b84c57a",
    "aco": "Folder",
    "aco_foreign_key": "299f613b-0706-570a-8636-956186384e0a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "25acb455-5368-5055-8d56-36a4f30a81b3",
  "name": "Licenses",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "240ac5c6-de8a-5220-9d32-fb68d75675c2",
    "aco": "Folder",
    "aco_foreign_key": "25acb455-5368-5055-8d56-36a4f30a81b3",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
  "name": "Marketing",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "b72b5766-3de3-5209-a553-fd0a016dc151",
    "aco": "Folder",
    "aco_foreign_key": "0d2912f7-98c7-59f3-8e93-6e27cc5d68f4",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "907c3f61-f416-5834-86d2-e721501ee493",
  "name": "Private",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "9879c5c6-bf14-5ea2-bd72-252eaeaeff08",
    "aco": "Folder",
    "aco_foreign_key": "907c3f61-f416-5834-86d2-e721501ee493",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": true
}, {
  "id": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
  "name": "Production",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "f0b404d0-ad8f-5094-81f4-5a83e7e40465",
    "aco": "Folder",
    "aco_foreign_key": "f77ec67f-36a0-5d7e-ab94-8748b051e02a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
  "name": "Sales",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3bb8d63d-ab7c-5e76-b213-421891676ecd",
    "aco": "Folder",
    "aco_foreign_key": "f50a1189-70cb-5a89-b8be-8d87ce18f646",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
  "name": "Social Networks",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "3726325c-bf8e-50ee-92ad-78f0ecda9f99",
    "aco": "Folder",
    "aco_foreign_key": "9863226e-56fa-52a3-8aa0-f9bc47fc0b75",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "f1c1c6c0-90be-56c5-849f-ee099b1a27f4",
  "personal": false
}, {
  "id": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
  "name": "Staging",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "0f41e5c0-59d5-5dc7-ac39-96ba53f45224",
    "aco": "Folder",
    "aco_foreign_key": "edac6b0c-7acd-5f9f-8b1e-cc06a13c975e",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "299f613b-0706-570a-8636-956186384e0a",
  "personal": false
}, {
  "id": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
  "name": "Travel",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "14eb12bc-56be-594f-aa44-c088ecd67207",
    "aco": "Folder",
    "aco_foreign_key": "2c9e086b-6cf9-560e-a6e3-45ca31984ca3",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
}, {
  "id": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
  "name": "VAT",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "7741b2dd-5f5e-5e14-9a0f-4c04eb0f031f",
    "aco": "Folder",
    "aco_foreign_key": "1ccd70c8-14dc-59ec-9c06-60ce613c6f1d",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "personal": false
}];

