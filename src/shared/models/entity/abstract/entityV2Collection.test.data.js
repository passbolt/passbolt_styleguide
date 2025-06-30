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
import EntityV2Collection from "./entityV2Collection";
import {TestEntityV2} from "./entityV2.test.data";

export class TestEntityV2Collection extends EntityV2Collection {
  get entityClass() {
    return TestEntityV2;
  }

  /**
   * Get the collection schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "array",
      "items": TestEntityV2.getSchema(),
    };
  }

  /**
   * Validate the collection build rules.
   * @param {Entity} item The entity to validate the build rules for.
   * @throws {EntityValidationError} If an item already exists with the same id.
   */
  validateBuildRules(item) {
    this.assertNotExist("id", item._props.id);
  }
}
