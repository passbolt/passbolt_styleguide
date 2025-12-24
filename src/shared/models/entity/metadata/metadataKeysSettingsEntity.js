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
 * @since         4.10.0
 */
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";
import ShareMetadataPrivateKeysCollection from "./shareMetadataPrivateKeysCollection";

class MetadataKeysSettingsEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["allow_usage_of_personal_keys", "zero_knowledge_key_share"],
      properties: {
        allow_usage_of_personal_keys: {
          type: "boolean",
        },
        zero_knowledge_key_share: {
          type: "boolean",
        },
        metadata_private_keys: ShareMetadataPrivateKeysCollection.getSchema(),
      },
    };
  }

  /**
   *  @inheritDoc
   * @returns {{metadata_private_keys: ShareMetadataPrivateKeysCollection}}
   */
  static get associations() {
    return {
      metadata_private_keys: ShareMetadataPrivateKeysCollection,
    };
  }

  /**
   * @inheritDoc
   */
  validateBuildRules() {
    if (this._props.zero_knowledge_key_share && this.metadataPrivateKeys?.length > 0) {
      const error = new EntityValidationError();
      const message = "If the property zero_knowledge_key_share is true, metadata_private_keys cannot be set";
      error.addError("metadata_private_keys", "not_defined_for_zero_knowledge", message);
      throw error;
    }
  }

  /**
   * Return the default metadata keys settings.
   * @param {object} data the data to override the default with
   * @returns {MetadataKeysSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      allow_usage_of_personal_keys: true,
      zero_knowledge_key_share: false,
    };

    return new MetadataKeysSettingsEntity({ ...defaultData, ...data });
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be sent to API
   *
   * @param {object} [contain] optional
   * @returns {object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this._metadataPrivateKeys && contain.metadata_private_keys) {
      result.metadata_private_keys = this._metadataPrivateKeys.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Allow usage of personal keys
   * @returns {boolean}
   */
  get allowUsageOfPersonalKeys() {
    return this._props.allow_usage_of_personal_keys;
  }

  /**
   * Zero knowledge key share
   * @returns {boolean}
   */
  get zeroKnowledgeKeyShare() {
    return this._props.zero_knowledge_key_share;
  }

  /**
   * Returns the metadataPrivateKeys collection
   * @returns {MetadataPrivateKeysCollection|null}
   */
  get metadataPrivateKeys() {
    return this._metadataPrivateKeys || null;
  }

  set metadataPrivateKeys(metadataPrivateKeysCollection) {
    if (!(metadataPrivateKeysCollection instanceof ShareMetadataPrivateKeysCollection)) {
      throw new TypeError("The metadataPrivateKeysCollection is not of MetadataPrivateKeysCollection type");
    }
    this._metadataPrivateKeys = metadataPrivateKeysCollection;
  }

  /**
   * MetadataKeysSettingsEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return { metadata_private_keys: true };
  }
}

export default MetadataKeysSettingsEntity;
