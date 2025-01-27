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
 * @since         4.11.0
 */
import MetadataKeysSettingsEntity from "./metadataKeysSettingsEntity";
import ExternalGpgKeyPairEntity from "../gpgkey/external/externalGpgKeyPairEntity";

class MetadataKeysSettingsFormEntity extends MetadataKeysSettingsEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.generated_metadata_key) {
      this._generated_metadata_key = new ExternalGpgKeyPairEntity(this._props.generated_metadata_key, {...options, clone: false});
      delete this._props.generated_metadata_key;
    }
  }

  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "allow_usage_of_personal_keys",
        "zero_knowledge_key_share",
      ],
      properties: {
        ...MetadataKeysSettingsEntity.getSchema().properties,
        generated_metadata_key: ExternalGpgKeyPairEntity.getSchema(),
      }
    };
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    return {
      ...this._props,
      generated_metadata_key: this.generatedMetadataKey?.toDto({public_key: true, private_key: true}) || null,
    };
  }

  /**
   * Get the generated metadata key.
   * @returns {ExternalGpgKeyPairEntity|null}
   */
  get generatedMetadataKey() {
    return this._generated_metadata_key || null;
  }

  /**
   * Get the generated metadata key.
   * @param {ExternalGpgKeyPairEntity|null} generatedMetadataKey The key to set.
   * @throws {TypeError} if the parameter `generatedMetadataKey` is not of type ExternalGpgKeyPairEntity.
   */
  set generatedMetadataKey(generatedMetadataKey) {
    if (generatedMetadataKey !== null && !(generatedMetadataKey instanceof ExternalGpgKeyPairEntity)) {
      throw new TypeError("The parameter `generatedMetadataKey` should be of type ExternalGpgKeyPairEntity.");
    }
    this._generated_metadata_key = generatedMetadataKey;
  }
}

export default MetadataKeysSettingsFormEntity;
