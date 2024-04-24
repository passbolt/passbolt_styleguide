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

class EntityV2Collection extends EntityCollection {
  /**
   * Retrieve the entity class this collection is handling
   * @return {Class}
   */
  get entityClass() {
    throw new Error("The collection class should declare the entity class that is handled.");
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */
  /**
   * Validate the collection build rules.
   * @param {Entity} item The entity to validate the build rules for.
   */
  // eslint-disable-next-line no-unused-vars
  validateBuildRules(item) {
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
   */
  push(data, entityOptions = {}) {
    if (!data || typeof data !== 'object') {
      throw new TypeError(`Collection push expects "data" to be an object.`);
    }

    if (data instanceof this.entityClass) {
      data = data.toDto(this.entityClass?.ALL_CONTAIN_OPTIONS); // deep clone
    }

    const entity = new this.entityClass(data, entityOptions);
    this.validateBuildRules(entity);
    this._items.push(entity);
  }

  /**
   * Push multiple items to the list.
   * @param {object|Entity|array} data The item(s) to add to the collection should be in the form of a DTO, an entity,
   *   or an array comprising any of the aforementioned.
   * @param {object} [entityOptions] Options for constructing the entity, identical to those accepted by the Entity
   *   constructor that will be utilized for its creation.
   * @throws {CollectionValidationError} If one item doesn't validate.
   */
  pushMany(data, entityOptions = {}) {
    if (!Array.isArray(data)) {
      throw new TypeError(`${this.constructor.name} pushMany expects "data" to be an array.`);
    }

    data.forEach((itemDto, index) => {
      try {
        this.push(itemDto, entityOptions);
      } catch (error) {
        if (error instanceof EntityValidationError || error instanceof CollectionValidationError || error instanceof EntityCollectionError) {
          if (!entityOptions?.ignoreInvalidEntity) {
            /*
             * The validation process for checking entity associations in the collection is functional. However, the error
             * details provided is not fully detailed. While it identifies the correct data item that fails validation in
             * the collection, it fails to clearly indicate which specific property of the parent entity is problematic.
             */
            const collectionValidationError = new CollectionValidationError();
            collectionValidationError.addEntityValidationError(index, error);
            throw collectionValidationError;
          } else {
            console.debug(`${this.entityClass.name}::pushMany ignore item (${index}) due to validation error ${JSON.stringify(error?.details)}`);
          }
        } else {
          throw error;
        }
      }
    });
  }
}

export default EntityV2Collection;
