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
 * @since         5.3.0
 */
import EntityV2Collection from "../abstract/entityV2Collection";
import EntityValidationError from "../abstract/entityValidationError";
import CustomFieldEntity from "./customFieldEntity";

export const CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE = 50_000;

export default class CustomFieldsCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return CustomFieldEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure the total content do not exceed the maximum allowed.
   */
  constructor(dtos = [], options = {}) {
    super(dtos, options);
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Get metadata private keys collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": CustomFieldEntity.getSchema(),
      "maxItems": 128,
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @param {Set} [options.uniqueUserIdsSetCache] A set of unique user ids.
   * @throws {EntityValidationError} If a permission already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertContentDoNotExceedMaxSize(item, options);
  }

  /**
   * Assert that no item in the collection already has the given value for the given property.
   * Note: The assertion ignore undefined prop value, it is the schema responsibility to ensure properties are defined.
   *
   * @param {CustomFieldEntity} item
   * @param {object} options Options.
   * @param {number} options.contentInformation.currentSize The current content size for excess checking
   * @throw {EntityValidationError} If the maximum content size allowed has been exceeded
   * @private
   */
  assertContentDoNotExceedMaxSize(item, options) {
    if (options.contentInformation.currentSize + item.value.toString().length <= CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE) {
      return;
    }

    const error = new EntityValidationError();
    error.addError("items", "maxContentSize", `The collection items should not cumulate more than ${CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE} characters in total.`);
    throw error;
  }

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));

    const contentInformation = {currentSize: 0};
    const onItemPushed = item => {
      uniqueIdsSetCache.add(item._props.id);
      contentInformation.currentSize += item.value.toString().length;
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache, contentInformation},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Returns true if the collection is considered empty.
   * Even if an element is present in the collection, as long as this element is considered empty, the collection will be.
   */
  isEmpty() {
    return this.length === 0
      || !(this.items.find(i => !i.isEmpty()));
  }

  /**
   * Returns true if both collection are different
   * @param {CustomFieldsCollection} collectionA
   * @param {CustomFieldsCollection} collectionB
   * @returns {boolean}
   * @throws {TypeError} if any of the parameters are not of type CustomFieldsCollection
   */
  static areCollectionsDifferent(collectionA, collectionB) {
    if (!(collectionA instanceof CustomFieldsCollection) || !(collectionB instanceof CustomFieldsCollection)) {
      throw new TypeError("Both paramerters must be of type CustomFieldsCollection");
    }

    const length = collectionA.length;
    if (length !== collectionB.length) {
      return true;
    }

    for (let i = 0; i < length; i++) {
      const areFieldsDifferent = CustomFieldEntity.areFieldsDifferent(collectionA.items[i], collectionB.items[i]);
      if (areFieldsDifferent) {
        return true;
      }
    }

    return false;
  }

  /**
   * Merge collection metadata in secret
   * Alter the secret collection to add metadata key
   * @param collectionMetadata
   * @param collectionSecret
   * @throws {TypeError} if any of the parameters are not of type CustomFieldsCollection
   * @throws {TypeError} if any of the parameters have not the same length
   */
  static mergeCollectionsMetadataInSecret(collectionMetadata, collectionSecret) {
    if (!(collectionMetadata instanceof CustomFieldsCollection) || !(collectionSecret instanceof CustomFieldsCollection)) {
      throw new TypeError("Both paramerters must be of type CustomFieldsCollection");
    }

    const length = collectionMetadata.length;
    if (length !== collectionSecret.length) {
      throw new TypeError("Collections are corrupted");
    }

    if (collectionMetadata.isEmpty()) {
      return;
    }

    const customFieldsMetadataMapById = collectionMetadata.items.reduce((result, customField) => {
      result[customField.id] = customField;
      return result;
    }, {});

    for (const customFieldEntity of collectionSecret) {
      const customFieldMetadataEntity = customFieldsMetadataMapById[customFieldEntity.id];
      customFieldEntity.metadata_key = customFieldMetadataEntity.metadata_key;
    }
  }
}
