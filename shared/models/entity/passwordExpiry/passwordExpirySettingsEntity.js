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
 * @since         4.4.0
 */

import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = 'PasswordExpirySettings';

class PasswordExpirySettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(PasswordExpirySettingsDto, options = {}) {
    super(EntitySchema.validate(
      PasswordExpirySettingsEntity.ENTITY_NAME,
      PasswordExpirySettingsDto,
      PasswordExpirySettingsEntity.getSchema()
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
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
        },
        "default_expiry_period": {
          "type": "null"
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
   * Calculate the default expiry date will return null as the default expiry is not applicable for CE.
   * @returns {null}
   */
  calculateDefaultResourceExpiryDate() {
    return null;
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
   * PasswordExpirySettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * Return the default settings overriden with the given data if any.
   * @param {PasswordExpirySettingsDto} data the data to override the entity with
   * @returns {PasswordExpirySettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      default_expiry_period: null,
      policy_override: false,
      automatic_expiry: false,
      automatic_update: false,
    };

    const dto = {...defaultData, ...data};
    return new PasswordExpirySettingsEntity(dto);
  }
}

export default PasswordExpirySettingsEntity;
