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
 * @since         4.9.4
 */

import EntitySchema from "../entity/abstract/entitySchema";
import EntityValidationError from "../entity/abstract/entityValidationError";

/**
 * Abstract ViewModel related resource
 * @abstract
 */
class ResourceViewModel {
  /**
   * Get current view model schema
   * @returns {Object} schema
   * @abstract
   */
  static getSchema() {
    throw new Error("The ViewModel class should declare its schema.");
  }

  /**
   * Returns the slug of the current resource type
   * @returns {string}
   * @abstract
   */
  static get resourceTypeSlug() {
    throw new Error("The ViewModel class should declare its resource type slug.");
  }

  /**
   * Returns true if the encryption state of the field description can be toggled.
   * @returns {boolean}
   * @abstract
   */
  canToggleDescription() {
    throw new Error("The ViewModel class should declare if description can be toggled.");
  }

  /**
   * Returns true if the description field of the current resource type is not encrypted
   * @returns {boolean}
   * @abstract
   */
  isDescriptionUnencrypted() {
    throw new Error("The ViewModel class should declare if description is unencrypted.");
  }

  /**
   * Returns a DTO object following the resource type resource definition
   * @returns {object}
   * @abstract
   */
  toResourceDto() {
    throw new Error("The ViewModel class should declare how to export to a resource dto.");
  }

  /**
   * Returns a DTO object following the resource type secret definition
   * @returns {object}
   * @abstract
   */
  toSecretDto() {
    throw new Error("The ViewModel class should declare how to export to a secret dto.");
  }

  /**
   * Returns true if both secrets are different or if the resource type is different
   * @param {ResourceViewModel} a
   * @param {ResourceViewModel} b
   * @param {array<object>} resourceTypes
   * @returns {boolean}
   */
  static areSecretsDifferent(a, b) {
    if (a.constructor.resourceTypeSlug !== b.constructor.resourceTypeSlug) {
      return true;
    }

    if (a.constructor.resourceTypeSlug === "password-string") {
      return a.password !== b.password;
    }

    const secretA = a.toSecretDto();
    const secretB = b.toSecretDto();

    return Object.keys(secretA).some(key => secretA[key] !== secretB[key]);
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
    return new this.constructor(clone);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    try {
      EntitySchema.validate(this.constructor.name, this, this.constructor.getSchema());
    } catch (error) {
      return error;
    }

    return new EntityValidationError();
  }

  /**
   * Validate field
   * @param field
   * @return {EntityValidationError}
   */
  validateField(field) {
    try {
      EntitySchema.validateProp(field, this[field], this.constructor.getSchema().properties[field]);
    } catch (error) {
      return error;
    }

    return new EntityValidationError();
  }
}

export default ResourceViewModel;
