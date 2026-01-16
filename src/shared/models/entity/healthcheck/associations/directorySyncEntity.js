/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.7.0
 */

import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "directorySync";

class DirectorySyncEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(DirectorySyncEntity.ENTITY_NAME, dto, DirectorySyncEntity.getSchema()), options);
  }

  /**
   * Get database entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["endpointsDisabled"],
      properties: {
        endpointsDisabled: { type: "boolean" },
      },
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get endpointsDisabled() {
    return this._props.endpointsDisabled;
  }

  /*
   *==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default DirectorySyncEntity;
