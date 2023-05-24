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
  base_dn: "DC=passbolt,DC=local",
  connection_type: "plain",
  default_group_admin_user: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  default_user: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  directory_type: "ad",
  domain_name: "passbolt.local",
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
  password: "password",
  port: 389,
  hosts: ["127.0.0.1"],
  sync_groups_create: true,
  sync_groups_delete: true,
  sync_groups_update: true,
  sync_users_create: true,
  sync_users_delete: true,
  sync_users_update: true,
  user_path: undefined,
  user_custom_filters: undefined,
  username: "username",
  users_parent_group: undefined,
  authentication_type: "basic",
};
