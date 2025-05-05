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
 * @since         4.10.1
 */
import EntityV2 from "../abstract/entityV2";

/**
 * List of allowed foreign models on which SessionKey can be plugged.
 */
const ALLOWED_FOREIGN_MODELS = [
  // TODO: use the entity name later when entities will be moved
  "Resource",
  "Folder",
  "Tag"
];

class SessionKeyEntity extends EntityV2 {
  /**
   * Get session private key entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "foreign_model",
        "foreign_id",
        "session_key",
      ],
      "properties": {
        "foreign_model": {
          "type": "string",
          "enum": ALLOWED_FOREIGN_MODELS
        },
        "foreign_id": {
          "type": "string",
          "format": "uuid",
        },
        "session_key": {
          "type": "string",
          "pattern": /^9:[0-9A-F]{64}$/i,
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Returns the foreign model
   * @returns {string}
   */
  get foreignModel() {
    return this._props.foreign_model;
  }

  /**
   * Returns the foreign id
   * @returns {string}
   */
  get foreignId() {
    return this._props.foreign_id;
  }

  /**
   * Returns the sessionPrivateKeys collection
   * @returns {string}
   */
  get sessionKey() {
    return this._props.session_key;
  }
}

export default SessionKeyEntity;
