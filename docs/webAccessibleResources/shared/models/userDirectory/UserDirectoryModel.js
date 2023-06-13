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
 * Model related to the user model for UI
 */
class UserDirectoryModel {
  /**
   * Constructor
   * @param {UserDirectoryDTO} userDirectoryDTO
   * @param {string} userId
   */
  constructor(userDirectoryDTO = [], userId = "") {
    if (!userDirectoryDTO || userDirectoryDTO?.length === 0) {
      this.setDefaut(userId);
      return;
    }

    const defaultDomain = userDirectoryDTO.domains?.org_domain;

    //Sections opened
    this.openCredentials = true;
    this.openDirectoryConfiguration = false;
    this.openSynchronizationOptions = false;
    // Source
    this.source = userDirectoryDTO.source;
    // CREDENTIALS FIELDS
    this.authenticationType = defaultDomain?.authentication_type || "basic";
    this.directoryType = defaultDomain?.directory_type || "ad";
    this.connectionType = defaultDomain?.connection_type || "plain";
    this.host = defaultDomain?.hosts?.length > 0 ? defaultDomain?.hosts[0] : "";
    this.hostError = null;
    this.port = defaultDomain?.port?.toString() || "389";
    this.portError = null;
    this.username =  defaultDomain?.username || "";
    this.password =  defaultDomain?.password || "";
    this.domain = defaultDomain?.domain_name || "";
    this.domainError = null;
    this.baseDn = defaultDomain?.base_dn || "";
    // DIRECTORY CONFIGURATION FIELDS
    this.groupPath = userDirectoryDTO.group_path || "";
    this.userPath = userDirectoryDTO.user_path || "";
    this.groupCustomFilters = userDirectoryDTO.group_custom_filters || "";
    this.userCustomFilters = userDirectoryDTO.user_custom_filters || "";
    this.groupObjectClass = userDirectoryDTO.group_object_class || "";
    this.userObjectClass = userDirectoryDTO.user_object_class || "";
    this.useEmailPrefix = userDirectoryDTO.use_email_prefix_suffix || false;
    this.emailPrefix = userDirectoryDTO.email_prefix || "";
    this.emailSuffix = userDirectoryDTO.email_suffix || "";
    this.fieldsMapping = userDirectoryDTO.fields_mapping || undefined;
    // SYNCHRONIZATION OPTIONS
    this.defaultAdmin = userDirectoryDTO.default_user || userId;
    this.defaultGroupAdmin = userDirectoryDTO.default_group_admin_user || userId;
    this.groupsParentGroup = userDirectoryDTO.groups_parent_group || "";
    this.usersParentGroup = userDirectoryDTO.users_parent_group || "";
    this.enabledUsersOnly = Boolean(userDirectoryDTO.enabled_users_only);
    this.createUsers = Boolean(userDirectoryDTO.sync_users_create);
    this.deleteUsers = Boolean(userDirectoryDTO.sync_users_delete);
    this.updateUsers = Boolean(userDirectoryDTO.sync_users_update);
    this.createGroups = Boolean(userDirectoryDTO.sync_groups_create);
    this.deleteGroups = Boolean(userDirectoryDTO.sync_groups_delete);
    this.updateGroups = Boolean(userDirectoryDTO.sync_groups_update);
    //Form field option
    this.userDirectoryToggle = Boolean(this.port) && Boolean(this.host) && userDirectoryDTO?.enabled;
  }

  setDefaut(userId) {
    //Sections opened
    this.openCredentials = true;
    this.openDirectoryConfiguration = false;
    this.openSynchronizationOptions = false;
    // Source
    this.source = "db";
    // CREDENTIALS FIELDS
    this.authenticationType = "basic";
    this.directoryType = "ad";
    this.connectionType = "plain";
    this.host = "";
    this.hostError = null;
    this.port = "389";
    this.portError = null;
    this.username = "";
    this.password = "";
    this.domain = "";
    this.domainError = null;
    this.baseDn = "";
    // DIRECTORY CONFIGURATION FIELDS
    this.groupPath = "";
    this.userPath = "";
    this.groupCustomFilters = "";
    this.userCustomFilters = "";
    this.groupObjectClass = "";
    this.userObjectClass = "";
    this.useEmailPrefix = false;
    this.emailPrefix = "";
    this.emailSuffix = "";
    this.fieldsMapping = undefined;
    // SYNCHRONIZATION OPTIONS
    this.defaultAdmin = userId;
    this.defaultGroupAdmin = userId;
    this.groupsParentGroup = "";
    this.usersParentGroup = "";
    this.enabledUsersOnly = false;
    this.createUsers = true;
    this.deleteUsers = true;
    this.updateUsers = true;
    this.createGroups = true;
    this.deleteGroups = true;
    this.updateGroups = true;
    //Form field option
    this.userDirectoryToggle = false;
  }
}

export default UserDirectoryModel;
