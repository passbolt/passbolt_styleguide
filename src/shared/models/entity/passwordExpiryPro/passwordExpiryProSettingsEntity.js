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
 * @since         4.5.0
 */

import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = 'passwordExpiryProSettingsEntity';

class PasswordExpiryProSettingsEntity extends Entity {
  /**
   * Password Expiry entity constructor
   *
   * @param {Object} PasswordExpirySettingsDto password expiry pro settings dto
   * @throws {EntityValidationError} if the dto cannot be converted into an entity
   */
  constructor(PasswordExpirySettingsDto) {
    super(EntitySchema.validate(
      PasswordExpiryProSettingsEntity.ENTITY_NAME,
      PasswordExpirySettingsDto,
      PasswordExpiryProSettingsEntity.getSchema()
    ));
  }

  /**
   * Get user passphrase policies entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "automatic_expiry",
        "automatic_update",
        "policy_override",
        "expiry_notification",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
        },
        "default_expiry_period": {
          "anyOf": [{
            "type": "integer",
            "gte": 0,
          }, {
            "type": "null"
          }]
        },
        "policy_override": {
          "type": "boolean",
        },
        "automatic_expiry": {
          "type": "boolean",
        },
        "automatic_update": {
          "type": "boolean",
        },
        "expiry_notification": {
          "type": "integer",
          "gte": 1,
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "created_by": {
          "type": "string",
          "format": "uuid"
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
        "modified_by": {
          "type": "string",
          "format": "uuid"
        },
      }
    };
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * PasswordExpiryProSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * Return the default settings overriden with the given data if any.
   * @param {PasswordExpirySettingsDto} data the data to override the entity with
   * @returns {PasswordExpiryProSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      // Default value depends on the db value saved
      default_expiry_period: data.id ? data.default_expiry_period : 90,
      policy_override: false,
      automatic_expiry: true,
      automatic_update: true,
      expiry_notification: 2,
    };

    const dto = {...defaultData, ...data};
    for (const key in dto) {
      dto[key] ??= defaultData[key];
    }

    return new PasswordExpiryProSettingsEntity(dto);
  }
}

export default PasswordExpiryProSettingsEntity;
