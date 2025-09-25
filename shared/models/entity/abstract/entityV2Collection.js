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
import EntityCollection from "./entityCollection";
import CollectionValidationError from "./collectionValidationError";
import EntityCollectionError from "./entityCollectionError";
import EntitySchema from "./entitySchema";

class EntityV2Collection extends EntityCollection {
  /**
   * The collection cached schemas referenced by collection class name.
   * The key will represent the collection class name while the value will be the schema definition object.
   * @type {object}
   * @private
   */
  static _cachedSchema = {};

  /**
   * Retrieve the entity class this collection is handling
   * @return {Class}
   * @abstract
   */
  get entityClass() {
    throw new Error("The collection class should declare the entity class that is handled.");
  }

  /**
   * @inheritDoc
   * @param {boolean} [options.validate=true] validate the given props against the entity schema and the build rules.
   *
   * Additionally to the EntityCollection, the EntityV2 collection will:
   * - Validate the collection schema.
   * - Push the dtos into the collection.
   *
   * @throws {EntityCollectionError} If a item does not validate its entity schema.
   * @throws {EntityCollectionError} If a item does not validate the collection validation build rules.
   */
  constructor(dtos = [], options = {}) {
    // Note: EntityCollection V1 will clone the dtos into the instance _props property. Delete it after usage.
    super(dtos, options);
    const validate = options?.validate ?? true;
    if (validate) {
      this.validateSchema();
    }
    this.pushMany(this._props, {...options, clone: false});
    this._props = null;
  }

  /**
   * Validate the collection schema.
   * Note: the collection schema will be created on first call and cached into a class static property.
   * @private
   */
  validateSchema() {
    this._props = EntitySchema.validate(
      this.constructor.name,
      this._props,
      this.cachedSchema
    );
  }

  /**
   * Get the collection cached schema
   * Note: The getter can only be accessed only from an instance context as it uses the instance scope.
   * @returns {object}
   * @private
   */
  get cachedSchema() {
    if (!this.constructor._cachedSchema[this.constructor.name]) {
      this.constructor._cachedSchema[this.constructor.name] = this.constructor.getSchema();
    }

    return this.constructor._cachedSchema[this.constructor.name];
  }

  /**
   * Return the schema representing this collection.
   * Override this method to define the collection schema.
   * @return {object}
   * @abstract
   */
  static getSchema() {
    throw new Error("The collection class should declare its schema.");
  }

  /**
   * Build or clone entity.
   * @param {object|Entity} data The data of the item to push
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation.
   * @throws {EntityValidationError} If the item doesn't validate.
   * @returns {this.entityClass}
   */
  buildOrCloneEntity(data, entityOptions = {}) {
    if (!data || typeof data !== 'object') {
      throw new TypeError(`${this.entityClass.name}::buildOrCloneEntity expects "data" to be an object.`);
    }

    if (data instanceof this.entityClass) {
      data = data.toDto(this.entityClass?.ALL_CONTAIN_OPTIONS); // deep clone
    }

    return new this.entityClass(data, entityOptions);
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Validate the item build rules. It is used to verify the integrity of the collection before adding an item to it.
   * @param {Entity} item The entity to validate the build rules for.
   * @param {object} [options] Options.
   */
  // eslint-disable-next-line no-unused-vars
  validateBuildRules(item, options = {}) {
    // Override this method to add entity validation build rules.
  }

  /**
   * Validate the items only.
   * Note: the collection schema and the build rules are not validated.
   * @param {object} [options] Options
   */
  validate(options = {}) {
    try {
      /*
       * Validate schema is not supported on collection already created. The schema validation works only on DTO
       * this.validateSchema();
       * Validate build rules is not supported on collection already created. The build rules validation works only on DTO
       * this.validateBuildRules(options?.validateBuildRules);
       */
      this.validateItems(options);
    } catch (error) {
      if (!(error instanceof CollectionValidationError)) {
        throw error;
      }
      return error;
    }

    return null;
  }

  /**
   * Validate the entity items
   * @param {object} [options] Options
   */
  validateItems(options = {}) {
    if (this.length === 0) {
      return null;
    }

    const collectionValidationError = new CollectionValidationError();
    this.items.forEach(((entity, index) => {
      const errors = entity.validate(options);
      if (errors) {
        collectionValidationError.addItemValidationError(index, errors);
      }
    }));

    // Throw error if some issues were gathered
    if (collectionValidationError.hasErrors()) {
      throw collectionValidationError;
    }
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */
  /**
   * Push an item to the list.
   * Note: This method overrides the parent method and does not call the inherited version.
   *
   * @param {object|Entity} data The data of the item to push
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation.
   * @param {object} [options] Options.
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function @see EntityV2Collection::validateBuildRules
   * @param {function} [options.onItemPushed] Callback to execute after the item has been pushed to the collection.
   * @throws {EntityValidationError} If the item doesn't validate.
   */
  push(data, entityOptions = {}, options = {}) {
    const entity = this.buildOrCloneEntity(data, entityOptions);
    // The validation should be controlled by the entityOptions.validate however the impact might needs to be measured prior conditionally validate build rules
    this.validateBuildRules(entity, options?.validateBuildRules);
    this._items.push(entity);
    options?.onItemPushed?.(entity);
  }

  /**
   * Push or replace an element from the collection.
   * @param {object|Entity} data The data of the item to push
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation.
   * @param {object} [options] Options.
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function @see EntityV2Collection::validateBuildRules
   * @param {string} [options.replacePropertyName = "id"] Property name to find the element to replace.
   * @throws {EntityValidationError} If the item doesn't validate.
   */
  pushOrReplace(data, entityOptions = {}, options = {}) {
    const replacePropertyName = options?.replacePropertyName || "id";
    const foundIndex = this.items.findIndex(entity => entity[replacePropertyName] === data[replacePropertyName]);

    if (foundIndex !== -1) {
      this.items.splice(foundIndex, 1);
      const entity = this.buildOrCloneEntity(data, entityOptions);
      this.validateBuildRules(entity, options?.validateBuildRules);
      this.items.splice(foundIndex, 0, entity);
    } else {
      this.push(data, entityOptions, options);
    }
  }

  /**
   * Push multiple items to the list.
   * @param {object|Entity|array} data The item(s) to add to the collection should be in the form of a DTO, an entity,
   *   or an array comprising any of the aforementioned.
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation. Note, this entity options will be passed to the associated
   *   collections and entities.
   * @param {object} [options] Options.
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function @see EntityV2Collection::validateBuildRules
   * @param {function} [options.onItemPushed] Callback to execute after the item has been pushed to the collection.
   * @throws {CollectionValidationError} If one item doesn't validate.
   */
  pushMany(data, entityOptions = {}, options = {}) {
    if (!Array.isArray(data)) {
      throw new TypeError(`${this.constructor.name} pushMany expects "data" to be an array.`);
    }

    data.forEach((itemDto, index) => {
      try {
        this.push(itemDto, entityOptions, options);
      } catch (error) {
        this.handlePushItemError(index, error, entityOptions);
      }
    });
  }

  /**
   * Handle error occurring while adding an item to the collection.
   * @param {number} index The index the error occurred on.
   * @param {Error} error The error.
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation. Note, this entity options will be passed to the associated
   *   collections and entities.
   * @protected
   */
  handlePushItemError(index, error, entityOptions) {
    if (error instanceof EntityValidationError || error instanceof CollectionValidationError || error instanceof EntityCollectionError) {
      if (!entityOptions?.ignoreInvalidEntity) {
        /*
         * The validation process for checking entity associations in the collection is functional. However, the error
         * details provided is not fully detailed. While it identifies the correct data item that fails validation in
         * the collection, it fails to clearly indicate which specific property of the parent entity is problematic.
         */
        const collectionValidationError = new CollectionValidationError();
        collectionValidationError.addItemValidationError(index, error);
        throw collectionValidationError;
      } else {
        console.debug(`${this.entityClass.name}::pushMany ignore item (${index}) due to validation error ${JSON.stringify(error?.details)}`);
      }
    } else {
      throw error;
    }
  }
}

export default EntityV2Collection;
