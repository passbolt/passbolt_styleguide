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
 * @since         5.13.0
 */
import EntityV2 from "../abstract/entityV2";

/**
 * List of allowed foreign models on which OfflineItem can be plugged.
 */
const ALLOWED_FOREIGN_MODELS = [
  // TODO: use the entity name later when entities will be moved
  "Resource",
  "Folder",
];

class OfflineItemEntity extends EntityV2 {
  /**
   * Get metadata private key entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["id", "foreign_model", "foreign_key", "user_id", "created", "created_by"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        foreign_model: {
          type: "string",
          enum: ALLOWED_FOREIGN_MODELS,
        },
        foreign_key: {
          type: "string",
          format: "uuid",
        },
        user_id: {
          type: "string",
          format: "uuid",
        },
        created: {
          type: "string",
          format: "date-time",
        },
        created_by: {
          type: "string",
          format: "uuid",
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
   * Returns the id
   * @returns {string}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Returns the foreign model
   * @returns {string}
   */
  get foreignModel() {
    return this._props.foreign_model;
  }

  /**
   * Returns the foreign key
   * @returns {string}
   */
  get foreignKey() {
    return this._props.foreign_key;
  }

  /**
   * Returns the user id
   * @returns {string|null}
   */
  get userId() {
    return this._props.user_id;
  }

  /**
   * Get the created date of the offline item
   * @returns {string}
   */
  get created() {
    return this._props.created;
  }

  /**
   * Returns the created by
   * @returns {string}
   */
  get createdBy() {
    return this._props.created_by;
  }
}

export default OfflineItemEntity;
