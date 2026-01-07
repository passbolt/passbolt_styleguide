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
   * Returns a ResourceViewModel built from a ResourceEntity dto and its secret.
   * @param {object} resourceDto
   * @returns {ResourceViewModel}
   */
  static createFromEntity() {
    throw new Error("The ViewModel class should declare how to create a ResourceViewModel from a resource entity.");
  }

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
   * Update the fields of the secret part of a resource.
   * @param {object} secretDto
   * @returns {ResourceViewModel}
   */
  updateSecret() {
    throw new Error("The ViewModel class should declare how to update its secret fields.");
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
   * @param {ResourceViewModel} resourceViewModel
   * @param {object} originalSecretDto the original secret dto to compare with
   * @param {array<object>} resourceTypes
   * @returns {boolean}
   */
  areSecretsDifferent() {
    throw new Error("The ViewModel class should declare how to compare secrets.");
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
    return new this.constructor(clone);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate(mode = ResourceViewModel.CREATE_MODE) {
    try {
      EntitySchema.validate(this.constructor.name, this, this.constructor.getSchema(mode));
    } catch (error) {
      return error;
    }

    return new EntityValidationError();
  }

  /**
   * Returns ResourceViewModel.CREATE_MODE
   * @returns {string}
   */
  static get CREATE_MODE() {
    return "CREATE_MODE";
  }

  /**
   * Returns ResourceViewModel.EDIT_MODE
   * @returns {string}
   */
  static get EDIT_MODE() {
    return "EDIT_MODE";
  }
}

export default ResourceViewModel;
