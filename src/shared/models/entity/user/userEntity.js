/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.1.0
 */
import EntityV2 from "../abstract/entityV2";
import RoleEntity from "../role/roleEntity";
import GpgkeyEntity from "../gpgkey/gpgkeyEntity";
import ProfileEntity from "../profile/profileEntity";

const ENTITY_NAME = "User";

/**
 * An enum to gather the different possible user statuses.
 * These are use in the UI directly and needs to be translated.
 *
 */
export const USER_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  DELETED: "deleted",
};

/**
 * class UserEntity
 *
 * This is a duplicate of the UserEntity coming from the browser extension and it has been adapted to make it work.
 * TODO: migrate fully the UserEntity from the Bext to here. However, the email validation needs to be solved first before fiinishing the migration.
 * At the moment, the email validation is dependent on an external service that fetches site settings data from the API which implied that we don't
 * fully validated email right now here.
 * Also, as this entity usage is limited to display user information, only the required associated entity are kepts, the others are removed.
 * As a consequence, migrating from the bext to here will also bring other data to this entity and may have an impact later.
 */
class UserEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.profile) {
      this._profile = new ProfileEntity(this._props.profile, { ...options, clone: false });
      delete this._props.profile;
    }
    if (this._props.role) {
      this._role = new RoleEntity(this._props.role, { ...options, clone: false });
      delete this._props.role;
    }
    if (this._props.gpgkey) {
      this._gpgkey = new GpgkeyEntity(this._props.gpgkey, { ...options, clone: false });
      delete this._props.gpgkey;
    }
  }

  /**
   * @inheritDoc
   * Marshall the last_logged_in to null if empty string given
   */
  marshall() {
    if (this._props.last_logged_in === "") {
      this._props.last_logged_in = null;
    }
    super.marshall();
  }

  /**
   * Get user entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "username",
        // "role_id",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        role_id: {
          type: "string",
          format: "uuid",
        },
        username: {
          type: "string",
        },
        active: {
          type: "boolean",
        },
        deleted: {
          type: "boolean",
        },
        disabled: {
          type: "string",
          format: "date-time",
          nullable: true,
        },
        missing_metadata_key_ids: {
          type: "array",
          items: {
            type: "string",
            format: "uuid",
          },
        },
        created: {
          type: "string",
          format: "date-time",
        },
        modified: {
          type: "string",
          format: "date-time",
        },
        // Associated models
        role: RoleEntity.getSchema(),
        profile: ProfileEntity.getSchema(),
        gpgkey: GpgkeyEntity.getSchema(),
      },
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be sent to API
   * @param {object} [contain] optional for example {profile: {avatar:true}}
   * @returns {*}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this.role && contain.role) {
      result.role = this.role.toDto();
    }
    if (this.profile && contain.profile) {
      if (contain.profile === true) {
        result.profile = this.profile.toDto();
      } else {
        result.profile = this.profile.toDto(contain.profile);
      }
    }
    if (this.gpgkey && contain.gpgkey) {
      result.gpgkey = this.gpgkey.toDto();
    }
    return result;
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {*}
   */
  toJSON() {
    return this.toDto(UserEntity.ALL_CONTAIN_OPTIONS);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get user id
   * @returns {(string|null)} uuid
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get user role id
   * @returns {(string|null)} uuid
   */
  get roleId() {
    return this._props.role_id || null;
  }

  /**
   * Get user username
   * @returns {string} email
   */
  get username() {
    return this._props.username;
  }

  /**
   * Get user activation status
   * @returns {(boolean|null)} true if user completed the setup
   */
  get isActive() {
    if (typeof this._props.active === "undefined") {
      return null;
    }
    return this._props.active;
  }

  /**
   * Get user deleted status
   * @returns {(boolean|null)} true if user is deleted
   */
  get isDeleted() {
    if (typeof this._props.deleted === "undefined") {
      return null;
    }
    return this._props.deleted;
  }

  /**
   * Get missing metadata keys ids for a user
   * @returns {(array)} the list of missing metadata keys
   */
  get missingMetadataKeysIds() {
    return this._props.missing_metadata_key_ids || [];
  }

  /**
   * Get user creation date
   * @returns {(string|null)} date
   */
  get created() {
    return this._props.created || null;
  }

  /**
   * Get user modification date
   * @returns {(string|null)} date
   */
  get modified() {
    return this._props.modified || null;
  }

  /**
   * Get the user formatted name
   * @param {function} translate The translate function
   * @param {object} [options] The options
   * @param {boolean} [options.withUsername = false] The with username option to display the username with the first name and last name
   * @return {string}
   */
  getUserFormattedName(translate = (text) => text, options = { withUsername: false }) {
    const profile = this.profile;
    if (!profile) {
      return translate("Unknown user");
    }

    const hasName = Boolean(profile.firstName) || Boolean(profile.lastName);
    if (!hasName) {
      return translate("Unknown user");
    }

    return options.withUsername
      ? `${profile.firstName} ${profile.lastName} (${this.username})`
      : `${profile.firstName} ${profile.lastName}`;
  }

  /**
   * Returns the given user's status
   * @returns {string<USER_STATUS>}
   */
  get status() {
    if (this.isDeleted) {
      return USER_STATUS.DELETED;
    }

    const isSuspended = Boolean(this._props.disabled && new Date(this._props.disabled) <= new Date());
    if (isSuspended) {
      return USER_STATUS.SUSPENDED;
    }

    return USER_STATUS.ACTIVE;
  }

  /**
   * Set the user missing metadata keys ids
   * @params {array} the missing metadata keys ids
   */
  set missingMetadataKeysIds(missingMetadataKeysIds) {
    this._props.missing_metadata_key_ids = missingMetadataKeysIds;
  }

  /**
   * UserEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return {
      profile: ProfileEntity.ALL_CONTAIN_OPTIONS,
      role: true,
      gpgkey: true,
    };
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * ProfileEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /*
   * ==================================================
   * Associated properties getters
   * ==================================================
   */
  /**
   * Get user profile
   * @returns {(ProfileEntity|null)} profile
   */
  get profile() {
    return this._profile || null;
  }

  /**
   * Get user role
   * @returns {(RoleEntity|null)} role
   */
  get role() {
    return this._role || null;
  }

  /**
   * Get user gpgkey
   * @returns {(GpgkeyEntity|null)} key
   */
  get gpgkey() {
    return this._gpgkey || null;
  }
}

export default UserEntity;
