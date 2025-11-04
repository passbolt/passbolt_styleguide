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
        "canValidatePrivateMetadataKey": {"type": "boolean"},
        "isServerHasAccessToMetadataKey": {"type": "boolean"},
        "isServerMetadataKeyAccessInZeroKnowledgeMode": {"type": "boolean"},
        "noActiveMetadataKey": {"type": "boolean"},
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */

  /**
   * Returns whether the server can decrypt the metadata private key
   * @returns {boolean}
   */
  get canDecryptMetadataPrivateKey() {
    return this._props.canDecryptMetadataPrivateKey;
  }

  /**
   * Returns whether the private metadata key can be validated
   * @returns {boolean}
   */
  get canValidatePrivateMetadataKey() {
    return this._props.canValidatePrivateMetadataKey;
  }

  /**
   * Returns whether the server has access to the metadata key
   * @returns {boolean}
   */
  get isServerHasAccessToMetadataKey() {
    return this._props.isServerHasAccessToMetadataKey;
  }

  /**
   * Returns whether the server has access to the metadata private key in zero-knowledge mode
   * @returns {boolean}
   */
  get isServerMetadataKeyAccessInZeroKnowledgeMode() {
    return this._props.isServerMetadataKeyAccessInZeroKnowledgeMode;
  }

  /**
   * Returns whether there is no active metadata key
   * @returns {boolean}
   */
  get noActiveMetadataKey() {
    return this._props.noActiveMetadataKey;
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
