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

const PGP_STRING_MAX_LENGTH = 10_000;

const formProperties = [
  "allow_usage_of_personal_keys",
  "zero_knowledge_key_share",
  "armored_metadata_private_key",
  "armored_metadata_public_key",
];

class MetadataKeysSettingsFormEntity extends MetadataKeysSettingsEntity {
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
        armored_metadata_private_key: {
          "type": "string",
          "nullable": true,
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP PRIVATE KEY BLOCK-----([\r\n])([ -9;-~]{1,76}: [ -~]{1,76}([\r\n]))*\n([a-zA-Z0-9\/+=]{1,76}([\r\n]))*=[a-zA-Z0-9\/+=]{4}([\r\n])-----END PGP PRIVATE KEY BLOCK-----([\r\n]*)$/,
        },
        armored_metadata_public_key: {
          "type": "string",
          "nullable": true,
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP PUBLIC KEY BLOCK-----([\r\n])([ -9;-~]{1,76}: [ -~]{1,76}([\r\n]))*\n([a-zA-Z0-9\/+=]{1,76}([\r\n]))*=[a-zA-Z0-9\/+=]{4}([\r\n])-----END PGP PUBLIC KEY BLOCK-----([\r\n]*)$/,
        }
      }
    };
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toFormDto() {
    return formProperties.reduce((result, prop) => {
      if (typeof this._props[prop] !== "undefined") {
        result[prop] = this._props[prop];
      }
      return result;
    }, {});
  }
}

export default MetadataKeysSettingsFormEntity;
