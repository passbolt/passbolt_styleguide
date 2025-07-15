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
 * @since         5.3.2
 */

import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "metadata";

class MetadataEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(
      MetadataEntity.ENTITY_NAME,
      dto,
      MetadataEntity.getSchema()
    ), options);
  }

  /**
   * Get database entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": ["canDecryptMetadataPrivateKey"],
      "properties": {
        "canDecryptMetadataPrivateKey": {"type": "boolean"},
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get canDecryptMetadataPrivateKey() {
    return this._props.canDecryptMetadataPrivateKey;
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

export default MetadataEntity;
