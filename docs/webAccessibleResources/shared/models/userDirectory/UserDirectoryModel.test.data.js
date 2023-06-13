/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https=//www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */
import {v4 as uuid} from 'uuid';

/**
 * User directory modal test data.
 * @returns {object}
 */
export const mockedDefaultData = (data = {}) => {
  const userId = uuid();
  return Object.assign({
    openCredentials: true,
    openDirectoryConfiguration: false,
    openSynchronizationOptions: false,
    source: "db",
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
    fieldsMapping: undefined,
  }, data);
};

export const mockedData = (data = {}) => {
  const userId = uuid();
  const defaultData = Object.assign({
    baseDn: "DC=passbolt,DC=local",
    connectionType: "plain",
    defaultGroupAdmin: userId,
    defaultAdmin: userId,
    directoryType: "ad",
    domain: "passbolt.local",
    emailPrefix: "",
    emailSuffix: "",
    groupObjectClass: "",
    useEmailPrefix: false,
    userObjectClass: "",
    enabledUsersOnly: false,
    groupPath: "",
    groupsParentGroup: "",
    groupCustomFilters: "",
    password: "password",
    port: "389",
    host: "127.0.0.1",
    createUsers: true,
    deleteUsers: true,
    updateUsers: true,
    createGroups: true,
    deleteGroups: true,
    updateGroups: true,
    userPath: "",
    userCustomFilters: "",
    username: "username",
    usersParentGroup: "",
    userDirectoryToggle: true,
    source: "db",
    authenticationType: "basic",
    fieldsMapping: {
      ad: {
        user: {
          id: "objectGuid",
          firstname: "givenName",
          lastname: "sn",
          username: "mail",
          created: "whenCreated",
          modified: "whenChanged",
          groups: "memberOf",
          enabled: "userAccountControl"
        },
        group: {
          id: "objectGuid",
          name: "cn",
          created: "whenCreated",
          modified: "whenChanged",
          users: "member"
        }
      },
      openldap: {
        user: {
          id: "entryUuid",
          firstname: "givenname",
          lastname: "sn",
          username: "mail",
          created: "createtimestamp",
          modified: "modifytimestamp"
        },
        group: {
          id: "entryUuid",
          name: "cn",
          created: "createtimestamp",
          modified: "modifytimestamp",
          users: "member"
        }
      }
    },
  }, data);
  return mockedDefaultData(defaultData);
};
