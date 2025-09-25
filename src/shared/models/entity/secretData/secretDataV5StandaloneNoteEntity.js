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
 * @since         5.6.0
 */

import SecretDataEntity, {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";

class SecretDataV5StandaloneNoteEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 standalone note schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "description",
      ],
      "properties": {
        ...SecretDataEntity.getSchema().properties,
        "description": {
          "type": "string",
          "maxLength": 50000,
        },
      }
    };
  }

  /**
   * Return the default secret data v5 standalone note.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5DefaultEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      description: "",
    };

    return new SecretDataV5StandaloneNoteEntity({...defaultData, ...data}, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | CustomFieldsCollection | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "description":
        return "";
      default:
        return;
    }
  }

  /**
   * Are secret different
   * @param secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    return this.description !== secretDto.description;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get description
   * @returns {string} description
   */
  get description() {
    return this._props.description;
  }
}

export default SecretDataV5StandaloneNoteEntity;
