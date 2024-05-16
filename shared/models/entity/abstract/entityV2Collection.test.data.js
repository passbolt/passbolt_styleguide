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
import EntitySchema from "./entitySchema";
import EntityV2Collection from "./entityV2Collection";
import {TestEntity} from "./entity.test.data";

export class TestEntityV2Collection extends EntityV2Collection {
  get entityClass() {
    return TestEntity;
  }

  constructor(dto, options = {}) {
    super(EntitySchema.validate(TestEntityV2Collection.name, dto, TestEntityV2Collection.getSchema()), options);
    this.pushMany(this._props, {...options, clone: false});
    this._props = null;
  }

  /**
   * Get the collection schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "array",
      "items": TestEntity.getSchema(),
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
