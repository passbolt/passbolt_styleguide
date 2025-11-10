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
import {DateTime} from "luxon";

const ENTITY_NAME = 'passwordExpiryProSettingsEntity';

class PasswordExpiryProSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(PasswordExpirySettingsDto, options = {}) {
    super(EntitySchema.validate(
      PasswordExpiryProSettingsEntity.ENTITY_NAME,
      PasswordExpirySettingsDto,
      PasswordExpiryProSettingsEntity.getSchema()
    ), options);
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
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
        },
        "default_expiry_period": {
          "type": "integer",
          "minimum": 1,
          "maximum": 999,
          "nullable": true,
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

  /**
   * Calculate the default expiry date for new resources based on the configured expiry period.
   * @returns {string} ISO formatted expiry date, or undefined if not applicable
   */
  calculateDefaultResourceExpiryDate() {
    if (!this.isFeatureEnabled || !this._props.default_expiry_period) {
      return null;
    }

    return DateTime.utc().plus({days: this._props.default_expiry_period}).toISO();
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  get isFeatureEnabled() {
    return Boolean(this._props.id);
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
      default_expiry_period: null,
      policy_override: false,
      automatic_expiry: true,
      automatic_update: true,
    };

    const dto = {...defaultData, ...data};
    return new PasswordExpiryProSettingsEntity(dto);
  }
}

export default PasswordExpiryProSettingsEntity;
