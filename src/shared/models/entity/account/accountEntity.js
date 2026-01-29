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
 */

import RoleEntity from "../../../../shared/models/entity/role/roleEntity";
import EntityV2 from "../abstract/entityV2";
import { v5 as uuidv5 } from "uuid";

const ENTITY_NAME = "Account";

// Type of account.
const TYPE_ACCOUNT = "Account";

const FINGERPRINT_MIN_LENGTH = 40;
const FINGERPRINT_MAX_LENGTH = 40;

const UUID_PASSBOLT_NAMESPACE = "d5447ca1-950f-459d-8b20-86ddfdd0f922";

/**
 * Warning this entity is not complete due to a lot of dependencies on the Bext.
 * TODO: Bring back all entities from Bext to styleguide to use the real account entity.
 */
class AccountEntity extends EntityV2 {
  /**
   * @inheritdoc
   */
  marshall() {
    Object.assign(this._props, {
      type: AccountEntity.TYPE_ACCOUNT,
    });
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "type",
        "domain",
        "user_id",
        "username",
        "first_name",
        "last_name",
        "user_public_armored_key",
        "server_public_armored_key",
      ],
      properties: {
        type: {
          type: "string",
          enum: [AccountEntity.TYPE_ACCOUNT],
        },
        domain: {
          type: "string",
        },
        user_id: {
          type: "string",
          format: "uuid",
        },
        user_key_fingerprint: {
          type: "string",
          minLength: FINGERPRINT_MIN_LENGTH,
          maxLength: FINGERPRINT_MAX_LENGTH,
          pattern: /^[A-F0-9]{40}$/,
        },
        user_public_armored_key: {
          type: "string",
        },
        server_public_armored_key: {
          type: "string",
        },
        username: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        locale: {
          type: "string",
          pattern: /^[a-z]{2}-[A-Z]{2}$/,
          nullable: true,
        },
        role_name: {
          ...RoleEntity.getSchema().properties.name,
          nullable: true,
        },
      },
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the account id.
   * Generate a uuid v5 based on the account domain and account user id.
   * @return {string|null} uuid. Return null if domain or user id not defined
   */
  get id() {
    if (!this.domain || !this.userId) {
      return null;
    }

    return uuidv5(`${this.domain}${this.userId}`, UUID_PASSBOLT_NAMESPACE);
  }

  /**
   * Get the domain
   * @returns {string} ref ie. http://cloud.passbolt.com/acme
   */
  get domain() {
    return this._props.domain;
  }

  /**
   * Get the user id
   * @returns {string}
   */
  get userId() {
    return this._props.user_id;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * AccountEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * AccountEntity.TYPE_ACCOUNT
   * @returns {string}
   */
  static get TYPE_ACCOUNT() {
    return TYPE_ACCOUNT;
  }
}

export default AccountEntity;
