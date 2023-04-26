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

/**
 * User directory dto test data.
 * @returns {object}
 */
export const mockedData = {
  default_group_admin_user: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  default_user: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  email_prefix: "",
  email_suffix: "",
  group_object_class: "",
  use_email_prefix_suffix: false,
  user_object_class: "",
  enabled: true,
  enabled_users_only: false,
  group_path: undefined,
  groups_parent_group: undefined,
  group_custom_filters: undefined,
  sync_groups_create: true,
  sync_groups_delete: true,
  sync_groups_update: true,
  sync_users_create: true,
  sync_users_delete: true,
  sync_users_update: true,
  user_path: undefined,
  user_custom_filters: undefined,
  users_parent_group: undefined,
  domains: {
    org_domain: {
      base_dn: "DC=passbolt,DC=local",
      connection_type: "plain",
      directory_type: "ad",
      domain_name: "passbolt.local",
      password: "password",
      port: 389,
      hosts: ["127.0.0.1"],
      username: "username",
      authentication_type: "basic",
    }
  },
  fields_mapping: {
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
};
