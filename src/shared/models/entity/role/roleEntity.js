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
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";

const ENTITY_NAME = 'Role';
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';
const ROLE_GUEST = 'guest';
const ROLE_NAME_MAX_LENGTH = 255;
const ROLE_DESCRIPTION_MAX_LENGTH = 255;

export default class RoleEntity extends EntityV2 {
  /**
   * Get role entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "name",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": ROLE_NAME_MAX_LENGTH
        },
        "description": {
          "type": "string",
          "maxLength": ROLE_DESCRIPTION_MAX_LENGTH
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get role id
   * @returns {string|null} uuid
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get role name
   * @returns {string} admin or user
   */
  get name() {
    return this._props.name;
  }

  /*
   * ==================================================
   * Dynamic helper
   * ==================================================
   */
  /**
   * Check if the role correspond to the admin role.
   * @returns {boolean}
   */
  isAdmin() {
    return this.name.toLowerCase() === RoleEntity.ROLE_ADMIN;
  }

  /**
   * Check if the role correspond to the user role.
   * @returns {boolean}
   */
  isUser() {
    return this.name.toLowerCase() === RoleEntity.ROLE_USER;
  }

  /**
   * Check if the role correspond to the guest role.
   * @returns {boolean}
   */
  isGuest() {
    return this.name.toLowerCase() === RoleEntity.ROLE_GUEST;
  }

  /**
   * Returns true if the role is not a custom role.
   * Reserved roles are: admin, user ang guest
   * @returns {boolean}
   */
  isAReservedRole() {
    return this.isAdmin()
      || this.isUser()
      || this.isGuest();
  }

  /**
   * Get warnings of the entity property fields
   * @return {null|EntityValidationError}
   */
  verifyHealth() {
    let error = null;
    if (this.name.length === ROLE_NAME_MAX_LENGTH) {
      error = new EntityValidationError();
      error.addError(
        `name`,
        "maxLength",
        `name reached maximum length limit`
      );
    }
    return error;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * RoleEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * RoleEntity.ROLE_ADMIN
   * @returns {string} admin
   */
  static get ROLE_ADMIN() {
    return ROLE_ADMIN;
  }

  /**
   * RoleEntity.ROLE_USER
   * @returns {string} user
   */
  static get ROLE_USER() {
    return ROLE_USER;
  }

  /**
   * RoleEntity.ROLE_GUEST
   * @returns {string} user
   */
  static get ROLE_GUEST() {
    return ROLE_GUEST;
  }
}
