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
   * @param {UserDirectoryDTO} userDirectoryDTO
   */
  constructor(userDirectoryDTO, userId = "") {
    //Sections opened
    this.openCredentiaks = false;
    this.openDirectoryConfiguration = false;
    this.openSynchronizationOptions = false;
    //Form field option
    this.userDirectoryToggle = userDirectoryDTO.length !== 0;
    // CREDENTIALS FIELDS
    this.directoryType = userDirectoryDTO.length !== 0 ? userDirectoryDTO.directory_type : "ad";
    this.connectionType =  userDirectoryDTO.length !== 0 ?  userDirectoryDTO.connection_type : "plain";
    this.host = userDirectoryDTO.length !== 0 ? userDirectoryDTO.server : "";
    this.hostError = null;
    this.port = userDirectoryDTO.length !== 0 ? userDirectoryDTO.port.toString() : "389";
    this.portError = null;
    this.username =  userDirectoryDTO.length !== 0 ? userDirectoryDTO.username : "";
    this.password =  userDirectoryDTO.length !== 0 ? userDirectoryDTO.password : "";
    this.domain = userDirectoryDTO.length !== 0 ? userDirectoryDTO.domain_name : "";
    this.domainError = null;
    this.baseDn = userDirectoryDTO.length !== 0 ? userDirectoryDTO.base_dn : "";
    // DIRECTORY CONFIGURATION FIELDS
    this.groupPath = userDirectoryDTO.length !== 0 ? userDirectoryDTO.group_path : "";
    this.userPath = userDirectoryDTO.length !== 0 ? userDirectoryDTO.user_path : "";
    this.groupObjectClass = userDirectoryDTO.length !== 0 ? userDirectoryDTO.group_object_class : "";
    this.userObjectClass = userDirectoryDTO.length !== 0 ? userDirectoryDTO.user_object_class : "";
    this.useEmailPrefix = userDirectoryDTO.length !== 0 ? userDirectoryDTO.use_email_prefix_suffix : false;
    this.emailPrefix = userDirectoryDTO.length !== 0 ? userDirectoryDTO.email_prefix : "";
    this.emailSuffix = userDirectoryDTO.length !== 0 ? userDirectoryDTO.email_suffix : "";
    // SYNCHRONIZATION OPTIONS
    this.defaultAdmin = userDirectoryDTO.length !== 0 ? userDirectoryDTO.default_user : userId;
    this.defaultGroupAdmin = userDirectoryDTO.length !== 0 ? userDirectoryDTO.default_group_admin_user : userId;
    this.groupsParentGroup = userDirectoryDTO.length !== 0 ? userDirectoryDTO.groups_parent_group : "";
    this.usersParentGroup = userDirectoryDTO.length !== 0 ? userDirectoryDTO.users_parent_group : "";
    this.enabledUsersOnly = userDirectoryDTO.length !== 0 ? userDirectoryDTO.enabled_users_only : false;
    this.createUsers = userDirectoryDTO.length !== 0 ? userDirectoryDTO.sync_users_create : true;
    this.deleteUsers = userDirectoryDTO.length !== 0 ? userDirectoryDTO.sync_users_delete : true;
    this.createGroups = userDirectoryDTO.length !== 0 ? userDirectoryDTO.sync_groups_create : true;
    this.deleteGroups = userDirectoryDTO.length !== 0 ? userDirectoryDTO.sync_groups_delete : true;
    this.updateGroups = userDirectoryDTO.length !== 0 ? userDirectoryDTO.sync_groups_update : true;
  }
}

export default UserDirectoryModel;
