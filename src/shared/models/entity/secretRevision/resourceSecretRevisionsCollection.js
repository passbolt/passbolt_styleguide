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
 * @since         5.7.0
 */
import EntityV2Collection from "../abstract/entityV2Collection";
import SecretRevisionEntity from "./secretRevisionEntity";
import EntityValidationError from "../abstract/entityValidationError";

const BUILD_RULE_DIFFERENT_RESOURCE_ID = "different_resource_id";

class ResourceSecretRevisionsCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return SecretRevisionEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection have same resource_id.
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
   * Get secret revisions collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": SecretRevisionEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @throws {EntityValidationError} If a secret revision already exists with the same id.
   * @throws {EntityValidationError} If a secret revision does not have the same resource id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertSameResourceId(item);
  }

  /**
   * Assert the collection has the same resource_id.
   *
   * @param {SecretRevisionEntity} secretRevision The secret revision
   * @throws {EntityValidationError} if a resource id is not the same in the collection
   * @private
   */
  assertSameResourceId(secretRevision) {
    if (!this.items.length) {
      return;
    }

    const collectionResourceId = this.items[0].resourceId;
    if (secretRevision.resourceId !== collectionResourceId) {
      const error = new EntityValidationError();
      const message = `The collection has different resource id: ${collectionResourceId} != ${secretRevision.resourceId}.`;
      error.addError("resource_id", BUILD_RULE_DIFFERENT_RESOURCE_ID, message);
      throw error;
    }
  }

  /**
   * Order by the most recently modified secret revision in the collection if any.
   * If no secret revision is found in the collection, do nothing.
   */
  sortByModified() {
    this._items.sort((secretRevisionEntityA, secretRevisionEntityB) => secretRevisionEntityB.modified > secretRevisionEntityA.modified ? 1 : -1);
  }

  /**
   * Transform into dto.
   * @returns {array}
   */
  toDto(contains = SecretRevisionEntity.ALL_CONTAIN_OPTIONS) {
    return this._items.map(entity => entity.toDto(contains));
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));
    const onItemPushed = item => {
      uniqueIdsSetCache.add(item._props.id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Filter out the items which have encrypted secrets.
   */
  filterOutItemsHavingSecretDataEncrypted() {
    this.filterByCallback(resourceRevision => !resourceRevision.secrets?.hasSecretsDataEncrypted());
  }
}

export default ResourceSecretRevisionsCollection;
