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

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class PasswordExpirySettingsViewModel {
  /**
   * Constructor
   * @param {PasswordExpirySettingsDto} [settings]
   */
  constructor(settings = {}) {
    this.automatic_update = Boolean(settings?.automatic_update);
    this.policy_override = Boolean(settings?.policy_override);
    this.automatic_expiry = Boolean(settings?.automatic_expiry) && !this.policy_override;
    this.default_expiry_period = settings?.default_expiry_period || null;
    this.expiry_notification = settings?.expiry_notification || null;

    if (settings?.id) {
      this.id = settings?.id;
    }
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseEntitySchema = PasswordExpirySettingsEntity.getSchema();
    return {
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
      default_expiry_period: parseInt(entityDto?.default_expiry_period, 10) || null,
      expiry_notification: parseInt(entityDto?.expiry_notification, 10) || null,
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
      policy_override: false,
      default_expiry_period: null,
      expiry_notification: null
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
  validate() {
    const schema = PasswordExpirySettingsViewModel.getSchema();

    try {
      EntitySchema.validate(this.constructor.name, this, schema);
    } catch (e) {
      return e;
    }

    return new EntityValidationError();
  }

  /**
   * Returns true if the current settings are actually disabled settings
   * @returns {boolean}
   */
  get isSettingsDisabled() {
    return !this.automatic_expiry && !this.automatic_update && !this.policy_override;
  }
}

export default PasswordExpirySettingsViewModel;
