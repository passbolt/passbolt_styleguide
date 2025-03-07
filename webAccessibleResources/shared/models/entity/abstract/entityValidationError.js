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
 * @since         2.13.0
 */
class EntityValidationError extends Error {
  /**
   * EntityValidationError constructor
   *
   * @param {string} message
   */
  constructor(message = 'Entity validation error.') {
    super(message);
    this.name = 'EntityValidationError';
    this.details = {};
  }

  /**
   * Add a given an error for a given property and rule
   *
   * @param {string} property example: name
   * @param {string} rule example: required
   * @param {string} message example: the name is required
   */
  addError(property, rule, message) {
    if (typeof property !== 'string') {
      throw new TypeError('EntityValidationError addError property should be a string.');
    }
    if (typeof rule !== 'string') {
      throw new TypeError('EntityValidationError addError rule should be a string.');
    }
    if (typeof message !== 'string') {
      throw new TypeError('EntityValidationError addError message should be a string.');
    }
    if (!Object.prototype.hasOwnProperty.call(this.details, property)) {
      this.details[property] = {};
    }
    this.details[property][rule] = message;
  }

  /**
   * Add an association error for a given error details
   *
   * @param {string} associationName example: name
   * @param {EntityValidationError} error
   */
  addAssociationError(associationName, error) {
    if (typeof associationName !== 'string') {
      throw new TypeError('EntityValidationError addAssociationError associationName should be a string.');
    }
    if (!(error instanceof EntityValidationError)) {
      throw new TypeError('EntityValidationError addAssociationError errorDetails should be an object.');
    }
    this.details[associationName] = error;
  }

  /**
   * Get the errors associated to the given field if any
   * @param {string} property the field name to get the error from
   * @param {string} [rule] optional example: required
   * @returns {object|null}
   */
  getError(property, rule) {
    if (!this.hasError(property, rule)) {
      return null;
    }

    const errors = this.details[property];
    return rule
      ? errors[rule]
      : errors;
  }

  /**
   * Return true if a property has any error or error for the provided rule
   *
   * @param {string} property
   * @param {string} [rule] optional example: required
   * @returns {boolean} true if a given property as an error
   */
  hasError(property, rule) {
    if (typeof property !== 'string') {
      throw new TypeError('EntityValidationError hasError property should be a string.');
    }

    const hasError = (this.details && Object.prototype.hasOwnProperty.call(this.details, property));
    if (!hasError) {
      return false;
    }

    if (!rule) {
      return hasError;
    }
    if (typeof rule !== 'string') {
      throw new TypeError('EntityValidationError hasError rule should be a string.');
    }
    return Object.prototype.hasOwnProperty.call(this.details[property], rule);
  }

  /**
   * Return true if some error details are present
   *
   * @returns {boolean}
   */
  hasErrors() {
    return (Object.keys(this.details).length > 0);
  }

  /**
   * Returns the first error available on the given field if any.
   * @param {string} property
   * @returns {string|null}
   */
  getFirstRuleErrorByField(property) {
    if (!this.hasError(property)) {
      return null;
    }

    const errors = this.details[property];
    const rules = Object.keys(errors);

    return errors[rules[0]];
  }
}

export default EntityValidationError;
