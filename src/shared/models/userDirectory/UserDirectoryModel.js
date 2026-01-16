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

const DEFAULT_AD_FIELDS_MAPPING_USER_USERNAME_VALUE = "mail";
const DEFAULT_OPENLDAP_FIELDS_MAPPING_GROUP_USERS_VALUE = "uniqueMember";

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
    this.username = defaultDomain?.username || "";
    this.password = defaultDomain?.password || "";
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
    this.fieldsMapping = UserDirectoryModel.defaultFieldsMapping(userDirectoryDTO.fields_mapping);
    this.fallbackFields = UserDirectoryModel.defaultFallbackFields(userDirectoryDTO.field_fallbacks);
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
    this.deleteUserBehavior = userDirectoryDTO.delete_user_behavior || "delete";
    //Form field option
    this.userDirectoryToggle = Boolean(this.port) && Boolean(this.host) && userDirectoryDTO?.enabled;
  }

  setDefaut(userId) {
    //Sections opened
    this.openCredentials = true;
    this.openDirectoryConfiguration = false;
    this.openSynchronizationOptions = false;
    // Source
    this.source = "default";
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
    this.fieldsMapping = UserDirectoryModel.defaultFieldsMapping();
    this.fallbackFields = UserDirectoryModel.defaultFallbackFields();
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
    this.deleteUserBehavior = "delete";
    //Form field option
    this.userDirectoryToggle = false;
  }

  /**
   * Returns a default empty field mapping object
   * @param {object} [data = {}] data to override the default values
   * @returns {object}
   * @private
   */
  static defaultFieldsMapping(data = {}) {
    return {
      ad: {
        user: Object.assign(
          {
            id: "objectGuid",
            firstname: "givenName",
            lastname: "sn",
            username: DEFAULT_AD_FIELDS_MAPPING_USER_USERNAME_VALUE,
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
            users: DEFAULT_OPENLDAP_FIELDS_MAPPING_GROUP_USERS_VALUE,
          },
          data?.openldap?.group,
        ),
      },
    };
  }

  /**
   * Returns a default empty fallback fields mappin object
   * @param {object} [data = {}] data to override the default values
   * @returns {object}
   * @private
   */
  static defaultFallbackFields(data = {}) {
    return {
      ad: Object.assign(
        {
          username: "",
        },
        data?.ad,
      ),
    };
  }

  /**
   * Returns the default value for the Active Directory fields mapping user username
   * @returns {string}
   */
  static get DEFAULT_AD_FIELDS_MAPPING_USER_USERNAME_VALUE() {
    return DEFAULT_AD_FIELDS_MAPPING_USER_USERNAME_VALUE;
  }

  /**
   * Returns the default value for the Open Ldap fields mapping group users
   * @param {string}
   */
  static get DEFAULT_OPENLDAP_FIELDS_MAPPING_GROUP_USERS_VALUE() {
    return DEFAULT_OPENLDAP_FIELDS_MAPPING_GROUP_USERS_VALUE;
  }
}

export default UserDirectoryModel;
