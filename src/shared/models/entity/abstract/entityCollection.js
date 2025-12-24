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
import EntityCollectionError from "./entityCollectionError";
import EntityValidationError from "./entityValidationError";

class EntityCollection {
  /**
   * EntityCollection constructor
   * @param {array} dtos (Optional) Array of entities dto to add to the collection.
   * @param {object} options Options.
   * @param {boolean} [options.clone=true] Clone the given props to ensure original data remain unaltered.
   * Attention: altering the original dtos alters also the entities using this information, therefore bypass any
   * validation applied previously.
   */
  constructor(dtos = [], options = {}) {
    const clone = options?.clone ?? true;
    this._items = [];
    if (clone) {
      dtos = JSON.parse(JSON.stringify(dtos));
    }
    /*
     * Keep a reference of the dtos as props for historical reasons.
     * @todo _props property to remove
     */
    this._props = dtos;
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be sent to API
   *
   * @returns {*}
   */
  toDto() {
    return JSON.parse(JSON.stringify(this._items));
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {*}
   */
  toJSON() {
    return this.toDto();
  }

  /*
   * ==================================================
   * Dynamic properties getters and setters
   * ==================================================
   */
  /**
   * Get all items references
   * @returns {Array} items
   */
  get items() {
    return this._items;
  }

  /**
   * Get items size
   * @returns {number}
   */
  get length() {
    return this._items.length;
  }

  /**
   * Make collections iterable
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   *
   * @returns {Object} conforming to the iterator protocol.
   */
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this._items.length) {
          return { value: this._items[i++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }

  /**
   * Find all the items matching search string for a given prop
   *
   * @param {string} propName
   * @param {string} search
   * @throws TypeError if parameters are invalid
   * @returns {array} all the items matching search
   */
  getAll(propName, search) {
    if (typeof propName !== "string") {
      throw new TypeError("EntityCollection excludeAll expects propName to be string.");
    } else if (typeof search !== "string") {
      throw new TypeError("EntityCollection excludeAll expects search to be string.");
    }
    return this._items.filter(
      (item) => Object.prototype.hasOwnProperty.call(item._props, propName) && item._props[propName] === search,
    );
  }

  /**
   * Get all items matching a given id
   *
   * @param {string} propName
   * @param {string} search
   * @returns {Entity} first item matching search
   */
  getFirst(propName, search) {
    if (typeof propName !== "string" || typeof search !== "string") {
      throw new TypeError("EntityCollection getFirst by expect propName and search to be strings");
    }
    const found = this.getAll(propName, search);
    if (!found || !found.length) {
      return undefined;
    }
    return found[0];
  }

  /**
   * Extract the property values of all the collection items.
   * @param {string} propName The target property
   * @returns {array<*>}
   * @throws TypeError if parameters are invalid
   */
  extract(propName) {
    if (typeof propName !== "string") {
      throw new TypeError("EntityCollection extract expects propName to be a string.");
    }

    return this._items.reduce((accumulator, item) => {
      if (typeof item._props[propName] !== "undefined") {
        accumulator.push(item._props[propName]);
      }
      return accumulator;
    }, []);
  }

  /*
   * ==================================================
   * Items manipulation
   * ==================================================
   */

  /**
   * Push an item in the list
   * @param {*} item
   * @returns {int} new length of collection
   */
  push(item) {
    this._items.push(item);
    return this._items.length;
  }

  /**
   * Add an item at the beggining of the list
   * @param {*} item
   * @returns {int} new length of collection
   */
  unshift(item) {
    this._items.unshift(item);
    return this._items.length;
  }

  /*
   * ==================================================
   * Filters
   * ==================================================
   */

  /**
   * Filter all items having the given property matching one of the value of the provided needles array.
   *
   * @param {string} propName The property to filter by.
   * @param {array<string|number|boolean>} needles The array of value to match the property with.
   * @param {boolean} [excludeUndefined=true] Filter out resources not having a defined resource type.
   * @return {void} The function alters the collection itself.
   * @throws TypeError if parameters are invalid
   */
  filterByPropertyValueIn(propName, needles, excludeUndefined = true) {
    if (typeof propName !== "string") {
      throw new TypeError("EntityCollection filterByPropertyValueIn expects propName to be a string.");
    }
    if (!Array.isArray(needles)) {
      throw new TypeError("EntityCollection filterByPropertyValueIn expects needles to be an array.");
    }

    this.filterByCallback((item) => {
      const isPropertyDefined = Object.prototype.hasOwnProperty.call(item._props, propName);
      return !(
        (excludeUndefined && !isPropertyDefined) || // exclude undefined property.
        (isPropertyDefined && !needles.includes(item._props[propName]))
      ); // or exclude defined property not matching the search.
    });
  }

  /**
   * Filter all items with a callback method.
   *
   * @param {function} callback The callback execute on each collection item used to filter the collection.
   * @return {void} The function alters the collection itself.
   * @throws TypeError if parameters are invalid
   */
  filterByCallback(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("EntityCollection filterByCallback expects callback to be a function.");
    }

    for (let currentIndex = this._items.length - 1; currentIndex >= 0; currentIndex--) {
      if (!callback(this._items[currentIndex])) {
        this._items.splice(currentIndex, 1);
      }
    }
  }

  /*
   * ==================================================
   * Assertions
   * ==================================================
   */

  /**
   * Assert that each item in the collection has a unique value for the given property.
   * @param {string} propName The property name for checking value uniqueness.
   * @param {string} [message] The error message. If none given, it will fallback on a default one.
   * @throw {EntityCollectionError} If the rule is not respected and at least two items share the same value for the given property.
   */
  assertUniqueByProperty(propName, message) {
    const ruleId = `unique_${propName}`;
    const propValues = this.extract(propName);
    // Set is the preferred approach for performance reasons, it does a deduplicate in 0n.
    const uniqueElements = new Set();
    message = message || `The collection should only contain items with unique values for the property: ${propName}.`;
    propValues.forEach((propValue, index) => {
      uniqueElements.add(propValue);
      if (index !== uniqueElements.size - 1) {
        throw new EntityCollectionError(index, ruleId, message);
      }
    });
  }

  /**
   * Assert that no item in the collection already has the given value for the given property.
   * Note: The assertion ignore undefined prop value, it is the schema responsibility to ensure properties are defined.
   *
   * @param {string} propName The property name for checking value uniqueness.
   * @param {string|boolean|number} propValue The property value for checking value uniqueness.
   * @param {object} [options] Options.
   * @param {string} [options.message] The error message. If none given, it will fallback on a default one.
   * @param {Set} [options.haystackSet] A haystack set to reuse if given. Used as cache to improve performance.
   * @throw {EntityValidationError} If another item already has the given value for the given property.
   */
  assertNotExist(propName, propValue, options = {}) {
    if (typeof propValue === "undefined") {
      return;
    }

    let haystackSet = options?.haystackSet;

    // If not given initialize the haystack set with the values of the items properties.
    if (!haystackSet) {
      const propValues = this.extract(propName);
      haystackSet = new Set(propValues);
    }

    if (haystackSet.has(propValue)) {
      const error = new EntityValidationError();
      const message =
        options?.message ||
        `The collection already includes an element that has a property (${propName}) with an identical value.`;
      error.addError(propName, "unique", message);
      throw error;
    }
  }
}

export default EntityCollection;
