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
    const isBasicAuthType = !userDirectoryModel.authenticationType || userDirectoryModel.authenticationType === "basic";
    this.enabled =  userDirectoryModel.userDirectoryToggle;
    // CREDENTIALS FIELDS
    this.authentication_type = userDirectoryModel.authenticationType;
    this.directory_type = userDirectoryModel.directoryType;
    this.connection_type =  userDirectoryModel.connectionType;
    this.hosts = [userDirectoryModel.host];
    this.port = parseInt(userDirectoryModel.port);
    this.username = isBasicAuthType ? userDirectoryModel.username : undefined;
    this.password = isBasicAuthType ? userDirectoryModel.password : undefined;
    this.domain_name =  userDirectoryModel.domain;
    this.base_dn = userDirectoryModel.baseDn;
    // DIRECTORY CONFIGURATION FIELDS
    this.group_path = userDirectoryModel.groupPath;
    this.user_path = userDirectoryModel.userPath;
    this.group_custom_filters = userDirectoryModel.groupCustomFilters;
    this.user_custom_filters = userDirectoryModel.userCustomFilters;
    this.group_object_class = this.directory_type === "openldap" ? userDirectoryModel.groupObjectClass : "";
    this.user_object_class = this.directory_type === "openldap"  ? userDirectoryModel.userObjectClass : "";
    this.use_email_prefix_suffix = this.directory_type === "openldap" ? userDirectoryModel.useEmailPrefix : false;
    this.email_prefix = this.directory_type === "openldap" && this.useEmailPrefix ? userDirectoryModel.emailPrefix : "";
    this.email_suffix = this.directory_type === "openldap" && this.useEmailPrefix ? userDirectoryModel.emailSuffix : "";
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
  }
}

export default UserDirectoryDTO;

