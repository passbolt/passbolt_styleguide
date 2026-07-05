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
 * @since         5.13.0
 */
import EntityV2Collection from "../abstract/entityV2Collection";
import PasskeyEntity from "./passkeyEntity";

export const PASSKEYS_COLLECTION_MAX_ITEMS = 64;

/**
 * Collection of passkeys stored inside a v5 resource secret (the attach model: a resource secret
 * may carry a `passkeys` array alongside its password/totp).
 */
export default class PasskeysCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return PasskeyEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   */
  constructor(dtos = [], options = {}) {
    super(dtos, options);
  }

  /**
   * Get the passkeys collection schema.
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "array",
      items: PasskeyEntity.getSchema(),
      maxItems: PASSKEYS_COLLECTION_MAX_ITEMS,
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @throws {EntityValidationError} If a passkey already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, { haystackSet: options?.uniqueIdsSetCache });
  }
}
