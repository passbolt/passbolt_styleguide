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

    const defaultExpiryPeriod = parseInt(settings?.default_expiry_period, 10);
    this.default_expiry_period = !isNaN(defaultExpiryPeriod) ? defaultExpiryPeriod : null;

    this.default_expiry_period_toggle =
      typeof settings?.default_expiry_period_toggle !== "undefined"
        ? Boolean(settings.default_expiry_period_toggle)
        : Boolean(this.default_expiry_period);

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
    const baseEntitySchema = !isAvanced
      ? PasswordExpirySettingsEntity.getSchema()
      : PasswordExpiryProSettingsEntity.getSchema();
    return this.getDefaultSchema(baseEntitySchema, isAvanced);
  }

  /**
   * Get current schema from PasswordExpirySettingsEntity depending of the version
   * @returns {Object} schema
   */
  static getDefaultSchema(baseEntitySchema, isAdvanced = false) {
    const schema = {
      type: "object",
      required: ["automatic_expiry", "automatic_update"],
      properties: {
        id: baseEntitySchema.properties.id,
        automatic_expiry: baseEntitySchema.properties.automatic_expiry,
        automatic_update: baseEntitySchema.properties.automatic_update,
        policy_override: baseEntitySchema.properties.policy_override,
        default_expiry_period: baseEntitySchema.properties.default_expiry_period,
      },
    };

    if (isAdvanced) {
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
      default_expiry_period:
        entityDto?.default_expiry_period !== null ? parseInt(entityDto?.default_expiry_period, 10) : null,
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
    const keys = ["automatic_expiry", "automatic_update", "policy_override", "default_expiry_period"];
    return keys.some((key) => a[key] !== b[key]);
  }

  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    const default_expiry_period = this.default_expiry_period_toggle ? this.default_expiry_period : null;

    return {
      automatic_expiry: this.automatic_expiry,
      automatic_update: this.automatic_update,
      policy_override: this.policy_override,
      default_expiry_period: default_expiry_period,
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
      [field]: value,
    };
    return new PasswordExpirySettingsViewModel(clone);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate(isAdvanced = false) {
    const entityValidationError = new EntityValidationError();
    const schema = PasswordExpirySettingsViewModel.getSchema(isAdvanced);
    try {
      EntitySchema.validate(this.constructor.name, this, schema);
      this.validateFormInput(entityValidationError, isAdvanced);
    } catch (e) {
      if (!(e instanceof EntityValidationError)) {
        throw e;
      }

      this.validateFormInput(e, isAdvanced);
      return e;
    }

    return entityValidationError;
  }

  /**
   * Validates the input not present in entity
   * @param entityValidationError the entity validation error
   * @param isAdvanced is advanced feature enabled
   * @returns {EntityValidationError}
   */
  validateFormInput(entityValidationError, isAdvanced) {
    //Validate only if the toggle is enable
    if (isAdvanced && this.default_expiry_period_toggle && this.default_expiry_period === null) {
      entityValidationError.addError("default_expiry_period", "required", `The default_expiry_period is required.`);
    }
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
