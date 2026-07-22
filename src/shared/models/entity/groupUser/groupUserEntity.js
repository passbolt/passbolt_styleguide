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
 * @since         2.13.0
 */
import Validator from "validator";
import EntityV2 from "../abstract/entityV2";
import UserEntity from "../user/userEntity";

const ENTITY_NAME = "GroupUser";

class GroupUserEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Association
    if (this._props.user) {
      this._user = new UserEntity(this._props.user, { ...options, clone: false });
      delete this._props.user;
    }
  }

  /**
   * Get groupUser entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["user_id", "is_admin"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        user_id: {
          type: "string",
          format: "uuid",
        },
        group_id: {
          type: "string",
          format: "uuid",
        },
        is_admin: {
          type: "boolean",
        },
        created: {
          type: "string",
          format: "date-time",
        },
        /*
         * Associated models
         * The user schema is declared as a generic object to break the infinite schema recursion
         * UserEntity -> GroupsUsersCollection -> GroupUserEntity -> UserEntity. The user is fully
         * validated by the UserEntity constructor when the association is built.
         */
        user: {
          type: "object",
        },
      },
    };
  }

  /**
   * Return a DTO ready to be sent to API
   * @param {object} [contain] optional for example {user: {profile: true}}
   * @returns {Object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this._user && contain.user) {
      if (contain.user === true) {
        result.user = this._user.toDto();
      } else {
        result.user = this._user.toDto(contain.user);
      }
    }
    return result;
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {*}
   */
  toJSON() {
    return this.toDto(GroupUserEntity.ALL_CONTAIN_OPTIONS);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get groupUser id
   * @returns {(string|null)} uuid
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get groupUser user id
   * @returns {string} uuid
   */
  get userId() {
    return this._props.user_id;
  }

  /**
   * Get groupUser group id
   * @returns {(string|null)} uuid
   */
  get groupId() {
    return this._props.group_id || null;
  }

  /**
   * Get group role
   * @returns {boolean} true if group manager
   */
  get isAdmin() {
    return this._props.is_admin;
  }

  /**
   * Get created date
   * @returns {(string|null)} date
   */
  get created() {
    return this._props.created || null;
  }

  /**
   * Get the group user associated user
   * @returns {(UserEntity|null)} user
   */
  get user() {
    return this._user || null;
  }

  /*
   * ==================================================
   * Dynamic properties setters
   * ==================================================
   */

  /**
   * Set the group user id
   *
   * @param {string} id
   * @throws {TypeError} if id is not UUID
   */
  set id(id) {
    if (!Validator.isUUID(id)) {
      throw new TypeError("The group user id should be a valid UUID.");
    }
    this._props.id = id;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * GroupUserEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * GroupUserEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return { user: UserEntity.ALL_CONTAIN_OPTIONS };
  }
}

export default GroupUserEntity;
