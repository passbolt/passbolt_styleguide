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
 * @since         5.4.0
 */
import EntityV2 from "../abstract/entityV2";

export default class MetadataGettingStartedSettingsEntity extends EntityV2 {
  /**
   * Get metadata getting stareted settings entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "enable_encrypted_metadata_with_getting_started",
      ],
      "properties": {
        "enable_encrypted_metadata_with_getting_started": {
          "type": "boolean",
        },
      }
    };
  }

  /**
   * Create a default entity patched with the given data
   * @param {object} the data to override the default dto with
   * @returns {MetadataGettingStartedSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const dto = {
      enable_encrypted_metadata_with_getting_started: false,
      ...data,
    };
    return new MetadataGettingStartedSettingsEntity(dto);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Should the metadata encrypted be enabled with getting started interface.
   * @returns {boolean}
   */
  get enableEncryptedMetadataWithGettingStarted() {
    return this._props.enable_encrypted_metadata_with_getting_started;
  }
}
