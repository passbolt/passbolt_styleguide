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
 * @since         3.8.0
 */

/**
 * Model related to the user dto
 */
class UserDirectoryDTO {
  /**
   * Constructor
   * @param {UserDirectoryModel} userDirectoryModel
   */
  constructor(userDirectoryModel) {
    const directoryType = userDirectoryModel.directoryType;
    const isBasicAuthType = !userDirectoryModel.authenticationType || userDirectoryModel.authenticationType === "basic";
    this.enabled =  userDirectoryModel.userDirectoryToggle;
    // DIRECTORY CONFIGURATION FIELDS
    this.group_path = userDirectoryModel.groupPath;
    this.user_path = userDirectoryModel.userPath;
    this.group_custom_filters = userDirectoryModel.groupCustomFilters;
    this.user_custom_filters = userDirectoryModel.userCustomFilters;
    this.group_object_class = directoryType === "openldap" ? userDirectoryModel.groupObjectClass : "";
    this.user_object_class = directoryType === "openldap"  ? userDirectoryModel.userObjectClass : "";
    this.use_email_prefix_suffix = directoryType === "openldap" ? userDirectoryModel.useEmailPrefix : false;
    this.email_prefix = directoryType === "openldap" && this.useEmailPrefix ? userDirectoryModel.emailPrefix : "";
    this.email_suffix = directoryType === "openldap" && this.useEmailPrefix ? userDirectoryModel.emailSuffix : "";
    // SYNCHRONIZATION OPTIONS
    this.default_user = userDirectoryModel.defaultAdmin;
    this.default_group_admin_user = userDirectoryModel.defaultGroupAdmin;
    this.groups_parent_group = userDirectoryModel.groupsParentGroup;
    this.users_parent_group = userDirectoryModel.usersParentGroup;
    this.enabled_users_only = userDirectoryModel.enabledUsersOnly;
    this.sync_users_create =  userDirectoryModel.createUsers;
    this.sync_users_delete = userDirectoryModel.deleteUsers;
    this.sync_users_update = userDirectoryModel.updateUsers;
    this.sync_groups_create = userDirectoryModel.createGroups;
    this.sync_groups_delete = userDirectoryModel.deleteGroups;
    this.sync_groups_update = userDirectoryModel.updateGroups;
    this.fields_mapping = userDirectoryModel.fieldsMapping;

    this.domains = {
      // DEFAULT DOMAIN
      org_domain: {
        // CREDENTIALS FIELDS
        connection_type: userDirectoryModel.connectionType,
        authentication_type: userDirectoryModel.authenticationType,
        directory_type: directoryType,
        domain_name: userDirectoryModel.domain,
        username: isBasicAuthType ? userDirectoryModel.username : undefined,
        password: isBasicAuthType ? userDirectoryModel.password : undefined,
        base_dn: userDirectoryModel.baseDn,
        hosts: [userDirectoryModel.host],
        port: parseInt(userDirectoryModel.port, 10),
      }
    };
  }
}

export default UserDirectoryDTO;

