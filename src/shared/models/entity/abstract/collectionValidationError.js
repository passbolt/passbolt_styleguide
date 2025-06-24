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
 * @since         4.7.0
 */
import EntityValidationError from "./entityValidationError";

class CollectionValidationError extends Error {
  /**
   * CollectionValidationError constructor
   *
   * @param {string} message
   */
  constructor(message = 'Collection validation error.') {
    super(message);
    this.name = 'CollectionValidationError';
    this.errors = [];
  }

  /**
   * Add an error relative to an item and its position.
   * Note: Collection validation error is supported as long as entity are not catching and associating them to the
   * property which failed.
   *
   * @param {number} position The index of the item in the collection.
   * @param {EntityValidationError|CollectionValidationError} validationError The validation error.
   * @throws {TypeError} if the position is not an integer.
   * @throws {TypeError} if the error is EntityValidationError or a CollectionValidationError.
   */
  addItemValidationError(position, validationError) {
    if (!Number.isInteger(position)) {
      throw new TypeError('CollectionValidationError::addEntityValidationError expects "position" to be an integer.');
    }
    if (!(validationError instanceof EntityValidationError) && !(validationError instanceof CollectionValidationError)) {
      throw new TypeError('CollectionValidationError::addEntityValidationError expects "entityValidationError" to be an instance of EntityValidationError or CollectionValidationError.');
    }
    this.errors[position] = validationError;
  }

  /**
   * Add an error relative a collection rule.
   *
   * @param {string} rule The collection rule.
   * @param {error|string} error The error.
   * @throws {TypeError} if the rule is not a string.
   * @throws {TypeError} if the error is not a string.
   */
  addCollectionValidationError(rule, error) {
    if (typeof rule !== "string") {
      throw new TypeError('CollectionValidationError::addCollectionValidationError expects "rule" to be a string.');
    }
    if (typeof error !== "string") {
      throw new TypeError('CollectionValidationError::addCollectionValidationError expects "error" to be a string.');
    }
    this.errors[rule] = error;
  }

  /**
   * Return true if some error details are present
   *
   * @returns {boolean}
   */
  hasErrors() {
    return this.errors.some(error => Object.keys(error.details).length > 0);
  }

  /**
   * Return the error in the details expected format.
   * @return {object}
   */
  get details() {
    const details = {};
    for (const key in this.errors) {
      if (this.errors[key] instanceof EntityValidationError) {
        details[key] = this.errors[key].details;
      } else if (this.errors[key] instanceof CollectionValidationError) {
        details[key] = this.errors[key].details;
      } else {
        details[key] = this.errors[key];
      }
    }
    return details;
  }
}

export default CollectionValidationError;
