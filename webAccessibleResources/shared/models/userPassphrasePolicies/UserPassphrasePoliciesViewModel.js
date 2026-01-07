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
 * @since         4.3.0
 */

import EntityValidationError from "../entity/abstract/entityValidationError";
import EntitySchema from "../entity/abstract/entitySchema";
import UserPassphrasePoliciesEntity from "../entity/userPassphrasePolicies/userPassphrasePoliciesEntity";

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class UserPassphrasePoliciesViewModel {
  /**
   * Constructor
   * @param {UserPassphrasePoliciesDto} [settings]
   */
  constructor(settings = {}) {
    this.external_dictionary_check = settings?.external_dictionary_check;
    this.entropy_minimum = settings?.entropy_minimum;
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseEntitySchema = UserPassphrasePoliciesEntity.getSchema();
    return {
      type: "object",
      required: ["entropy_minimum", "external_dictionary_check"],
      properties: {
        entropy_minimum: baseEntitySchema.properties.entropy_minimum,
        external_dictionary_check: baseEntitySchema.properties.external_dictionary_check,
      },
    };
  }

  /**
   * Instantiate a new ViewModel based on the dto of an Entity
   * @param {object} entityDto
   * @returns {UserPassphrasePoliciesViewModel}
   */
  static fromEntityDto(entityDto) {
    const data = {
      entropy_minimum: parseInt(entityDto?.entropy_minimum, 10) || 50,
      external_dictionary_check: Boolean(entityDto?.external_dictionary_check),
    };
    return new UserPassphrasePoliciesViewModel(data);
  }

  /**
   * Returns true if both state object's internal state have a difference
   * @param {UserPassphrasePoliciesViewModel} a
   * @param {UserPassphrasePoliciesViewModel} b
   * @returns {boolean}
   */
  static isDataDifferent(a, b) {
    const keys = ["entropy_minimum", "external_dictionary_check"];
    return keys.some((key) => a[key] !== b[key]);
  }

  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    return {
      entropy_minimum: this.entropy_minimum,
      external_dictionary_check: this.external_dictionary_check,
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {UserPassphrasePoliciesViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const clone = {
      ...this,
      [field]: value,
    };
    return new UserPassphrasePoliciesViewModel(clone);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    const schema = UserPassphrasePoliciesViewModel.getSchema();

    try {
      EntitySchema.validate(this.constructor.name, this, schema);
    } catch (e) {
      return e;
    }

    return new EntityValidationError();
  }
}

export default UserPassphrasePoliciesViewModel;
