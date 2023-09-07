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

import ViewModelValidationError from "../viewModelValidationError/ViewModelValidationError";

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
    const keys = [
      "entropy_minimum",
      "external_dictionary_check"
    ];
    return keys.some(key => a[key] !== b[key]);
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
      [field]: value
    };
    return new UserPassphrasePoliciesViewModel(clone);
  }

  /**
   * Validates the current object state
   * @returns {ViewModelValidationError}
   */
  validate() {
    const dataValidationError = new ViewModelValidationError();
    if (typeof(this.entropy_minimum) === "undefined") {
      dataValidationError.addError("entropy_minimum", "required", "The entropy minimum is required.");
    } else if (typeof(this.entropy_minimum) !== 'number') {
      dataValidationError.addError("entropy_minimum", "type", "The entropy minimum should be an integer.");
    } else if (this.entropy_minimum < 50) {
      dataValidationError.addError("entropy_minimum", "gte", "The entropy minimum should be between {0} and {1}.");
    } else if (this.entropy_minimum > 224) {
      dataValidationError.addError("entropy_minimum", "lte", "The entropy minimum should be between {0} and {1}.");
    }

    if (typeof(this.external_dictionary_check) === "undefined") {
      dataValidationError.addError("external_dictionary_check", "required", "The external dictionary check is required.");
    } else if (typeof(this.external_dictionary_check) !== 'boolean') {
      dataValidationError.addError("external_dictionary_check", "type", "The external dictionary check should be a boolean type.");
    }

    return dataValidationError;
  }
}

export default UserPassphrasePoliciesViewModel;
