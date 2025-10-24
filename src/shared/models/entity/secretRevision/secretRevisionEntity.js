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
 * @since         5.7.0
 */
import EntityV2 from "../abstract/entityV2";
import SecretsCollection from "../secret/secretsCollection";
import UserEntity from "../user/userEntity";

class SecretRevisionEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "id",
        "resource_id",
        "resource_type_id",
        "created",
        "created_by",
        "modified",
        "modified_by",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "resource_id": {
          "type": "string",
          "format": "uuid"
        },
        "resource_type_id": {
          "type": "string",
          "format": "uuid"
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "created_by": {
          "type": "string",
          "format": "uuid",
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
        "modified_by": {
          "type": "string",
          "format": "uuid",
        },
        "deleted": {
          "type": "string",
          "format": "date-time",
          "nullable": true
        },
        "secrets": SecretsCollection.getSchema(),
        "creator": UserEntity.getSchema(),
      }
    };
  }

  /**
   * @inheritDoc
   * @returns {{creator: UserEntity, secrets: SecretsCollection}}
   */
  static get associations() {
    return {
      creator: UserEntity,
      secrets: SecretsCollection,
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the secret revision id
   * @returns {string}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get the secret revision resource id
   * @returns {string}
   */
  get resourceId() {
    return this._props.resource_id;
  }

  /**
   * Get the secret revision resource type id
   * @returns {string}
   */
  get resourceTypeId() {
    return this._props.resource_type_id;
  }

  /**
   * Get the secret revision created date
   * @returns {string}
   */
  get created() {
    return this._props.created;
  }

  /**
   * Get the secret revision created by user id
   * @returns {string} uuid
   */
  get createdBy() {
    return this._props.created_by;
  }

  /**
   * Get the secret revision modified date
   * @returns {string}
   */
  get modified() {
    return this._props.modified;
  }

  /**
   * Get the secret revision modified by user id
   * @returns {string} uuid
   */
  get modifiedBy() {
    return this._props.modified_by;
  }

  /**
   * Get the secret revision modified date
   * @returns {string | null}
   */
  get deleted() {
    return this._props.deleted || null;
  }

  /**
   * Get the secret revision creator if any.
   * @returns {UserEntity|null}
   */
  get creator() {
    return this._creator || null;
  }

  /**
   * Get the secret revision secrets if any
   * @returns {SecretsCollection|null} the secrets collection
   */
  get secrets() {
    return this._secrets || null;
  }

  /**
   * Return a DTO ready to be sent to API
   *
   * @param {object} [contain] optional
   * @returns {object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this._creator && contain.creator) {
      result.creator = this._creator.toDto(UserEntity.ALL_CONTAIN_OPTIONS);
    }
    if (this._secrets && contain.secrets) {
      result.secrets = this._secrets.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * SecretRevisionEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return {creator: true, secrets: true};
  }
}

export default SecretRevisionEntity;
