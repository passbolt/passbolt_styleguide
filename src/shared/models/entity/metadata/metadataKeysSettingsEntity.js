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

class MetadataKeysSettingsEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "allow_usage_of_personal_keys",
        "zero_knowledge_key_share",
      ],
      "properties": {
        "allow_usage_of_personal_keys": {
          "type": "boolean",
        },
        "zero_knowledge_key_share": {
          "type": "boolean",
        }
      }
    };
  }

  /**
   * Return the default metadata keys settings.
   * @param {object} data the data to override the default with
   * @returns {MetadataKeysSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      allow_usage_of_personal_keys: true,
      zero_knowledge_key_share: false
    };

    return new MetadataKeysSettingsEntity({...defaultData, ...data});
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
}

export default MetadataKeysSettingsEntity;
