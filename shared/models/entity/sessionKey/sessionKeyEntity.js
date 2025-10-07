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
   * @inheritDoc
   * Marshall the session_key to support with Android & iOS format prior to v2.3.1.
   * Marshall the modified to support Android format prior to v2.3.1.
   */
  marshall() {
    /*
     * Normalize session_key: accept mobile keys without an algorithm prefix (iOS/Android). If the prefix is missing,
     * add it before validation the prefixed value.
     * Example in:  "536B8D0B..."
     * Example out: "9:536B8D0B..."
     */
    if (typeof(this._props.session_key) === "string" && /^[0-9A-F]{64}$/.test(this._props.session_key)) {
      this._props.session_key = `9:${this._props.session_key}`;
    }
    /*
     * Normalize modified timestamp, accept Android timestamps that include a zone ID suffix like "[Europe/Paris]".
     * Parse them as a strict ISO-8601 offset datetime without the zone ID.
     * Example in:  "2025-09-17T12:15:33.618450+02:00[Europe/Paris]"
     * Example out: "2025-09-17T12:15:33.618450+02:00"
     */
    if (typeof(this._props.modified) === "string") {
      this._props.modified = this._props.modified.replace(/\[.*\]$/, "");
    }

    super.marshall();
  }

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
