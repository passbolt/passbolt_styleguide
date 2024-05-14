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
   * Retrieve the entity class this collection is handling
   * @return {Class}
   * @abstract
   */
  get entityClass() {
    throw new Error("The collection class should declare the entity class that is handled.");
  }

  /**
   * @inheritDoc
   * The EntityV2 collection will push the dtos into the collection.
   * @throws {EntityCollectionError} If a item does not validate its entity schema.
   * @throws {EntityCollectionError} If a item does not validate the collection validation build rules.
   */
  constructor(dtos = [], options = {}) {
    // Note: EntityCollection V1 will clone the dtos into the instance _props property. Delete it after usage.
    super(dtos, options);
    this._props = EntitySchema.validate(
      this.constructor.name,
      this._props,
      this.constructor.getSchema()
    );
    this.pushMany(this._props, {...options, clone: false});
    this._props = null;
  }

  /**
   * Return the schema representing this collection.
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
   * @throws {EntityValidationError} If the item doesn't validate.
   * @param {object} [options] Options.
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function @see EntityV2Collection::validateBuildRules
   * @param {function} [options.onItemPushed] Callback to execute after the item has been pushed to the collection.
   */
  push(data, entityOptions = {}, options = {}) {
    const entity = this.buildOrCloneEntity(data, entityOptions);
    this.validateBuildRules(entity, options?.validateBuildRules);
    this._items.push(entity);
    options?.onItemPushed?.(entity);
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
