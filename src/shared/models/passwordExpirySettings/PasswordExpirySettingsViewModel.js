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

import EntityValidationError from "../entity/abstract/entityValidationError";
import EntitySchema from "../entity/abstract/entitySchema";
import PasswordExpirySettingsEntity from "../entity/passwordExpiry/passwordExpirySettingsEntity";
import PasswordExpiryProSettingsEntity from "../entity/passwordExpiryPro/passwordExpiryProSettingsEntity";

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class PasswordExpirySettingsViewModel {
  /**
   * Constructor
   * @param {PasswordExpirySettingsDto} [settings]
   * @param {Boolean} [isPro]
   */
  constructor(settings = {}) {
    this.automatic_update = Boolean(settings?.automatic_update);
    this.policy_override = Boolean(settings?.policy_override);
    this.automatic_expiry = Boolean(settings?.automatic_expiry);
    this.default_expiry_period = !isNaN(parseInt(settings?.default_expiry_period, 10)) ? parseInt(settings?.default_expiry_period, 10) : null;
    this.expiry_notification = !isNaN(parseInt(settings?.expiry_notification, 10)) ? parseInt(settings?.expiry_notification, 10) : null;

    if (settings?.id) {
      this.id = settings?.id;
    }
  }

  /**
   * Get current view model getSchema
   * @param {boolean} isAvanced to adapt schema with the pro version
   * @returns {Object} schema
   */
  static getSchema(isAvanced = false) {
    const baseEntitySchema = !isAvanced ? PasswordExpirySettingsEntity.getSchema() : PasswordExpiryProSettingsEntity.getSchema();
    return this.getDefaultSchema(baseEntitySchema, isAvanced);
  }

  /**
   * Get current schema from PasswordExpirySettingsEntity depending of the version
   * @returns {Object} schema
   */
  static getDefaultSchema(baseEntitySchema, isAdvanced = false) {
    const schema =  {
      type: "object",
      required: [
        "automatic_expiry",
        "automatic_update",
      ],
      properties: {
        id: baseEntitySchema.properties.id,
        automatic_expiry: baseEntitySchema.properties.automatic_expiry,
        automatic_update: baseEntitySchema.properties.automatic_update,
        policy_override: baseEntitySchema.properties.policy_override,
        default_expiry_period: baseEntitySchema.properties.default_expiry_period,
        expiry_notification: baseEntitySchema.properties.expiry_notification,
      }
    };

    if (isAdvanced) {
      schema.required.push("expiry_notification");
      schema.required.push("policy_override");
    }

    return schema;
  }

  /**
   * Instantiate a new ViewModel based on the dto of an Entity
   * @param {object} entityDto
   * @returns {PasswordExpirySettingsViewModel}
   */
  static fromEntityDto(entityDto) {
    const data = {
      automatic_expiry: Boolean(entityDto?.automatic_expiry),
      automatic_update: Boolean(entityDto?.automatic_update),
      policy_override: Boolean(entityDto?.policy_override),
      default_expiry_period: !isNaN(parseInt(entityDto?.default_expiry_period, 10)) ? parseInt(entityDto?.default_expiry_period, 10) : null,
      expiry_notification: !isNaN(parseInt(entityDto?.expiry_notification, 10)) ? parseInt(entityDto?.expiry_notification, 10) : null,
    };
    if (entityDto?.id) {
      data.id = entityDto.id;
    }
    return new PasswordExpirySettingsViewModel(data);
  }

  /**
   * Returns true if both state object's internal state have a difference
   * @param {PasswordExpirySettingsViewModel} a
   * @param {PasswordExpirySettingsViewModel} b
   * @returns {boolean}
   */
  static isDataDifferent(a, b) {
    const keys = [
      "automatic_expiry",
      "automatic_update",
      "policy_override",
      "default_expiry_period",
      "expiry_notification",
    ];
    return keys.some(key => a[key] !== b[key]);
  }

  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    return {
      automatic_expiry: this.automatic_expiry,
      automatic_update: this.automatic_update,
      policy_override: this.policy_override,
      default_expiry_period: this.default_expiry_period,
      expiry_notification: this.expiry_notification
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {PasswordExpirySettingsViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const clone = {
      ...this,
      [field]: value
    };
    return new PasswordExpirySettingsViewModel(clone);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate(isAdvanced) {
    const schema = PasswordExpirySettingsViewModel.getSchema(isAdvanced);
    //We set the to expiry_notification in case the user missed it
    if (isAdvanced && !this.expiry_notification) {
      this.expiry_notification = 2;
    }
    try {
      EntitySchema.validate(this.constructor.name, this, schema);
    } catch (e) {
      console.log(e);
      return e;
    }

    return new EntityValidationError();
  }

  /**
   * Returns true if the current settings are actually disabled settings
   * @returns {boolean}
   */
  get isSettingsDisabled() {
    return !this.id;
  }
}

export default PasswordExpirySettingsViewModel;
