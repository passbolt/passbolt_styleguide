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
   * Add a given an error for a given property and rule
   *
   * @param {number} position The index of the collection the error occurred.
   * @param {EntityValidationError|CollectionValidationError} validationError The entity or collection validation error.
   */
  addEntityValidationError(position, validationError) {
    if (!Number.isInteger(position)) {
      throw new TypeError('CollectionValidationError addEntityValidationError expects "position" to be an integer.');
    }
    if (!(validationError instanceof EntityValidationError) && !(validationError instanceof CollectionValidationError)) {
      throw new TypeError('CollectionValidationError addEntityValidationError expects "entityValidationError" to be an instance of EntityValidationError or CollectionValidationError.');
    }
    this.errors[position] = validationError;
  }

  /**
   * Add a collection validation error.
   * @param {string} rule The collection rule.
   * @param {string} message The error message.
   */
  addCollectionValidationError(rule, message) {
    this.errors[rule] = message;
  }

  /**
   * Return the error in the details expected format.
   * @return {array}
   */
  get details() {
    const details = [];
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
