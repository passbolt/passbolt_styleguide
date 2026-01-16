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
import SessionKeysCollection from "./sessionKeysCollection";

class SessionKeysBundleDataEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.session_keys) {
      this._session_keys = new SessionKeysCollection(this._props.session_keys, { ...options, clone: false });
      delete this._props.session_keys;
    }
  }

  /**
   * Get session keys bundle data entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "session_keys"],
      properties: {
        object_type: {
          type: "string",
          enum: ["PASSBOLT_SESSION_KEYS"],
        },
        session_keys: SessionKeysCollection.getSchema(),
      },
    };
  }

  /**
   * Create new bundle from session keys.
   * @param {SessionKeysCollection} sessionKeys The session keys
   * @return {SessionKeysBundleDataEntity}
   */
  static createFromSessionKeys(sessionKeys) {
    if (!(sessionKeys instanceof SessionKeysCollection)) {
      throw new TypeError('The parameter "sessionKey" should be a SessionKeysCollection.');
    }
    const dto = {
      object_type: "PASSBOLT_SESSION_KEYS",
      session_keys: sessionKeys,
    };

    return new SessionKeysBundleDataEntity(dto);
  }

  /**
   * Returns the session keys field of the entity
   * @returns {SessionKeysCollection}
   */
  get sessionKeys() {
    return this._session_keys;
  }

  /**
   * Return a DTO ready to be sent to API
   *
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);
    result.session_keys = this.sessionKeys.toDto();
    return result;
  }
}

export default SessionKeysBundleDataEntity;
