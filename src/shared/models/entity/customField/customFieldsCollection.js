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

const CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE = 50_000;

class CutsomFieldsCollection extends EntityV2Collection {
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
    if (options.contentInformation.currentSize + item.value.length <= CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE) {
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
      contentInformation.currentSize += item.value.length;
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache, contentInformation},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }
}

export default CutsomFieldsCollection;
