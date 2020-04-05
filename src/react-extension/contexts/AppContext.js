import React from "react";

export default React.createContext({
  user: {
    "user.settings.securityToken.color": '#FFCC00',
    "user.settings.securityToken.textColor": '#000',
    "user.settings.securityToken.code": 'CKR',
  },
  folders: [
    {
      "id": "0d0a4b82-4757-4389-88bf-3dd18c1b8d75",
      "name": "folder1",
      "created": "2020-03-23T14:07:09+00:00",
      "modified": "2020-03-23T14:07:09+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "folder_parent_id": null
    },
    {
      "id": "3c3f0cbb-d4e9-4133-9743-e3876001114e",
      "name": "folder2",
      "created": "2020-03-23T14:08:04+00:00",
      "modified": "2020-03-23T14:08:04+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "folder_parent_id": "0d0a4b82-4757-4389-88bf-3dd18c1b8d75"
    }
  ],
  users: null,
  roles: [
    {
      "id": "0d51c3a8-5e67-5e3d-882f-e1868966d817",
      "name": "admin",
      "description": "Organization administrator",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    },
    {
      "id": "6f02b8d2-e24c-51fe-a452-5a027c26dbef",
      "name": "guest",
      "description": "Non logged in user",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    },
    {
      "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "name": "user",
      "description": "Logged in user",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    },
    {
      "id": "eeda6af2-38dc-5e34-b86d-7687878bc38a",
      "name": "root",
      "description": "Super Administrator",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    }
  ],
  rememberMeOptions: {
    "300":"5 minutes",
    "900":"15 minutes",
    "1800":"30 minutes",
    "3600":"1 hour",
    "-1":"until I log out"
  },
  resources: [
    {
      "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
      "name": "apache",
      "username": "www-data",
      "uri": "http:\/\/www.apache.org\/",
      "description": "Apache is the world\u0027s most used web server software.",
      "deleted": false,
      "created": "2020-03-17T14:38:12+00:00",
      "modified": "2020-03-18T14:38:12+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "permission": {
        "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "09c790c0-c003-53c8-a640-25d33cfebc22",
      "name": "bower",
      "username": "bower",
      "uri": "bower.io",
      "description": "A package manager for the web!",
      "deleted": false,
      "created": "2018-03-19T14:38:12+00:00",
      "modified": "2019-03-19T14:38:12+00:00",
      "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "permission": {
        "id": "672728ac-c3f2-52a5-a21c-07dfe84b7ad9",
        "aco": "Resource",
        "aco_foreign_key": "09c790c0-c003-53c8-a640-25d33cfebc22",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "daaf057e-7fc3-5537-a8a9-e8c151890878",
      "name": "cakephp",
      "username": "cake",
      "uri": "cakephp.org",
      "description": "The rapid and tasty php development framework",
      "deleted": false,
      "created": "2020-03-19T12:38:12+00:00",
      "modified": "2020-03-19T13:38:12+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "permission": {
        "id": "972bf3fc-0d5b-579c-9097-56d86394c255",
        "aco": "Resource",
        "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "c8b93000-56b3-5a16-8048-c579d1babbd7",
      "name": "Canjs",
      "username": "yeswecan",
      "uri": "canjs.com",
      "description": "CanJS is a JavaScript library that makes developing complex applications simple and fast.",
      "deleted": false,
      "created": "2020-03-05T14:38:12+00:00",
      "modified": "2020-03-12T14:38:12+00:00",
      "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "permission": {
        "id": "4283465f-2ef8-5821-8f13-441de586c7cb",
        "aco": "Resource",
        "aco_foreign_key": "c8b93000-56b3-5a16-8048-c579d1babbd7",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 7,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "6e66e10e-36d7-5d4e-8fa2-8474e4510819",
      "name": "centos",
      "username": "root",
      "uri": "centos.org",
      "description": "The CentOS Linux distribution is a platform derived from Red Hat Enterprise Linux (RHEL).",
      "deleted": false,
      "created": "2020-01-19T14:38:12+00:00",
      "modified": "2020-02-19T14:38:12+00:00",
      "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "permission": {
        "id": "b83d3700-6b9c-51a1-8cf7-007fad9423d0",
        "aco": "Resource",
        "aco_foreign_key": "6e66e10e-36d7-5d4e-8fa2-8474e4510819",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "f7cef480-fcc3-5c20-a043-340c62e89cd8",
      "name": "composer",
      "username": "getcomposer",
      "uri": "getcomposer.org",
      "description": "Dependency Manager for PHP",
      "deleted": false,
      "created": "2020-03-19T14:36:12+00:00",
      "modified": "2020-03-19T14:37:12+00:00",
      "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "permission": {
        "id": "69e1efd1-fcb5-5555-8fb4-514af8b3220c",
        "aco": "Resource",
        "aco_foreign_key": "f7cef480-fcc3-5c20-a043-340c62e89cd8",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "2a08d0ad-cd50-5f06-a1b1-a2fa46e44d3f",
      "name": "Debian",
      "username": "jessy",
      "uri": "passbolt.dev",
      "description": "The universal operating system",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "permission": {
        "id": "d6d138e6-18f7-5411-b560-b26d589ef6ab",
        "aco": "Resource",
        "aco_foreign_key": "2a08d0ad-cd50-5f06-a1b1-a2fa46e44d3f",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "9e2d7f42-4164-5882-9445-92e42a8cf067",
      "name": "Docker",
      "username": "docker",
      "uri": "https:\/\/www.docker.com\/",
      "description": "An open platform for distributed applications for developers and sysadmins",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "permission": {
        "id": "91940345-7e5f-5465-b2b1-93d440207097",
        "aco": "Resource",
        "aco_foreign_key": "9e2d7f42-4164-5882-9445-92e42a8cf067",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 7,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "690b6e40-f371-579c-b0c6-86e8ef383adc",
      "name": "Enlightenment",
      "username": "efl",
      "uri": "https:\/\/www.enlightenment.org\/",
      "description": "Party like it\u0027s 1996.",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-24T19:04:27+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "permission": {
        "id": "e32b034c-d780-51f4-a89a-44042a5f69e0",
        "aco": "Resource",
        "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "4d7adb92-0d85-56d7-8b92-e2b919ef8eb8",
      "name": "framasoft",
      "username": "framasoft",
      "uri": "https:\/\/soutenir.framasoft.org\/",
      "description": "Parce que libre ne veut pas dire gratuit!",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "permission": {
        "id": "0718ec88-a867-57b8-ad9f-671237554469",
        "aco": "Resource",
        "aco_foreign_key": "4d7adb92-0d85-56d7-8b92-e2b919ef8eb8",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "662497d8-7f1d-550a-9133-0fedd7250867",
      "name": "free software foundation europe",
      "username": "fsfe",
      "uri": "https:\/\/fsfe.org\/index.en.html",
      "description": "Free Software Foundation Europe is a charity that empowers users to control technology.",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "permission": {
        "id": "6fc269ec-2b6f-5d42-ad25-c10f7f3bb731",
        "aco": "Resource",
        "aco_foreign_key": "662497d8-7f1d-550a-9133-0fedd7250867",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "90da24d8-9862-59e4-8748-33cd4563bd81",
      "name": "ftp",
      "username": "user",
      "uri": "ftp:\/\/192.168.1.1",
      "description": "ftp test",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "permission": {
        "id": "f423c773-9138-5a33-a269-195233a41fad",
        "aco": "Resource",
        "aco_foreign_key": "90da24d8-9862-59e4-8748-33cd4563bd81",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 7,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "d2ab45e9-0d70-5ae3-a373-d2f381bccd99",
      "name": "Git",
      "username": "git",
      "uri": "git-scm.com",
      "description": "Git is a free and open source distributed version control system.",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "modified_by": "54c6278e-f824-5fda-91ff-3e946b18d994",
      "permission": {
        "id": "66073597-5323-5413-a6bd-b288b724b2c3",
        "aco": "Resource",
        "aco_foreign_key": "d2ab45e9-0d70-5ae3-a373-d2f381bccd99",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "73e3309f-1121-5eca-8777-37a7451ee386",
      "name": "Gnupg",
      "username": "gpg",
      "uri": "gnupg.org",
      "description": "GnuPG is a complete and free implementation of the OpenPGP standard as defined by RFC4880",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "permission": {
        "id": "a79f4026-0162-588a-90f8-9b83f62ad71b",
        "aco": "Resource",
        "aco_foreign_key": "73e3309f-1121-5eca-8777-37a7451ee386",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 1,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
      "name": "Grogle",
      "username": "grd",
      "uri": "http:\/\/fr.groland.wikia.com\/wiki\/Grogle",
      "description": "",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "permission": {
        "id": "36366a82-3d75-5e0e-97d3-0437ad4ee2cf",
        "aco": "Resource",
        "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    },
    {
      "id": "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
      "name": "Inkscape",
      "username": "vector",
      "uri": "https:\/\/inkscape.org\/",
      "description": "Inkscape is a professional vector graphics editor. It is free and open source.",
      "deleted": false,
      "created": "2020-03-19T14:38:12+00:00",
      "modified": "2020-03-19T14:38:12+00:00",
      "created_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "modified_by": "1ebc0060-9274-5451-aa12-ad0f31bc29dd",
      "permission": {
        "id": "9ea3efed-b358-541c-8379-7b7162a8f562",
        "aco": "Resource",
        "aco_foreign_key": "76d75fef-d7ed-5a0d-8df0-0a0ffb7c44c8",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 7,
        "created": "2020-03-19T14:38:12+00:00",
        "modified": "2020-03-19T14:38:12+00:00"
      },
      "folder_parent_id": null
    }
  ],
  resource: null,
  settings: {},
  shareResources: null,
  selectedResources: null,
  selectedUser: null
});
