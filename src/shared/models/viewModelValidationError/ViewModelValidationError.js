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

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class ViewModelValidationError {
  constructor() {
    this.errors = {};
  }

  /**
   * Adds a validation error
   * @param {string} fieldName the field name that is invalid
   * @param {string} errorType the validation type error name
   * @param {string} errorMessage the associated error message
   */
  addError(fieldName, errorType, errorMessage) {
    if (!this.errors[fieldName]) {
      this.errors[fieldName] = {};
    }

    this.errors[fieldName][errorType] = errorMessage;
  }

  /**
   * Get the error associated to the given field
   * @param {string} fieldName the field name to get the error from
   * @returns {object|null}
   */
  getFieldErrors(fieldName) {
    return this.errors[fieldName] || null;
  }

  /**
   * Returns true if there is at least one error registered
   * @returns {boolean}
   */
  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Returns true if the given field has at 1 associated error
   * @returns {boolean}
   */
  hasFieldErrors(fieldName) {
    const fieldErrors = this.errors[fieldName];
    if (!fieldErrors) {
      return false;
    }

    return Object.keys(fieldErrors).length > 0;
  }
}

export default ViewModelValidationError;
