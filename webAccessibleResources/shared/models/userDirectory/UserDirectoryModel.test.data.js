/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https=//www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */
import { v4 as uuid } from "uuid";

/**
 * User directory modal test data.
 * @returns {object}
 */
export const mockedDefaultData = (data = {}) => {
  const userId = uuid();
  const defaultData = {
    openCredentials: true,
    openDirectoryConfiguration: false,
    openSynchronizationOptions: false,
    source: "default",
    directoryType: "ad",
    connectionType: "plain",
    host: "",
    hostError: null,
    port: "389",
    portError: null,
    username: "",
    password: "",
    domain: "",
    domainError: null,
    baseDn: "",
    groupPath: "",
    userPath: "",
    groupCustomFilters: "",
    userCustomFilters: "",
    groupObjectClass: "",
    userObjectClass: "",
    useEmailPrefix: false,
    emailPrefix: "",
    emailSuffix: "",
    defaultAdmin: userId,
    defaultGroupAdmin: userId,
    groupsParentGroup: "",
    usersParentGroup: "",
    enabledUsersOnly: false,
    createUsers: true,
    deleteUsers: true,
    updateUsers: true,
    createGroups: true,
    deleteGroups: true,
    updateGroups: true,
    userDirectoryToggle: false,
    authenticationType: "basic",
    fieldsMapping: defaultFieldsMapping(data.fieldsMapping),
    fallbackFields: defaultFallbackFields(data.fallbackFields),
    deleteUserBehavior: "delete",
  };

  delete data.fieldsMapping;
  return Object.assign(defaultData, data);
};

export const mockedData = (data = {}) => {
  const defaultData = mockedDefaultData({
    baseDn: "DC=passbolt,DC=local",
    domain: "passbolt.local",
    password: "password",
    host: "127.0.0.1",
    username: "username",
    userDirectoryToggle: true,
    fieldsMapping: data.fieldsMapping,
  });

  delete data.fieldsMapping;
  return Object.assign(defaultData, data);
};

export const defaultFieldsMapping = (data = {}) => ({
  ad: {
    user: Object.assign(
      {
        id: "objectGuid",
        firstname: "givenName",
        lastname: "sn",
        username: "mail",
        created: "whenCreated",
        modified: "whenChanged",
        groups: "memberOf",
        enabled: "userAccountControl",
      },
      data?.ad?.user,
    ),
    group: Object.assign(
      {
        id: "objectGuid",
        name: "cn",
        created: "whenCreated",
        modified: "whenChanged",
        users: "member",
      },
      data?.ad?.group,
    ),
  },
  openldap: {
    user: Object.assign(
      {
        id: "entryUuid",
        firstname: "givenname",
        lastname: "sn",
        username: "mail",
        created: "createtimestamp",
        modified: "modifytimestamp",
      },
      data?.openldap?.user,
    ),
    group: Object.assign(
      {
        id: "entryUuid",
        name: "cn",
        created: "createtimestamp",
        modified: "modifytimestamp",
        users: "uniqueMember",
      },
      data?.openldap?.group,
    ),
  },
});

export const defaultFallbackFields = (data = {}) => ({
  ad: Object.assign(
    {
      username: "",
    },
    data?.ad,
  ),
});
