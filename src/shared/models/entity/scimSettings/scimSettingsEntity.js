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
 * @since         5.5.0
 */

import EntityV2 from "../abstract/entityV2";

const SECRET_TOKEN_LENGTH = 39;
const SECRET_TOKEN_PATTERN = "^pb_[A-Za-z0-9]{36}$";

class ScimSettingsEntity extends EntityV2 {
  /**
   * Get SCIM settings entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "scim_user_id",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
          nullable: true
        },
        scim_user_id: {
          type: "string",
          format: "uuid"
        },
        setting_id: {
          type: "string",
          format: "uuid",
          nullable: true
        },
        secret_token: {
          type: "string",
          length: SECRET_TOKEN_LENGTH,
          pattern: SECRET_TOKEN_PATTERN,
          nullable: true
        }
      }
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */

  /**
   * Return a DTO ready to be sent to API or content code
   *
   * @returns {object}
   */
  toDto() {
    return Object.assign({}, this._props);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the SCIM settings id
   * @returns {string|null} uuid or null
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get the SCIM user id
   * @returns {string} uuid
   */
  get scimUserId() {
    return this._props.scim_user_id;
  }

  /**
   * Get the setting id
   * @returns {string} uuid
   */
  get settingId() {
    return this._props.setting_id;
  }

  /**
   * Get the secret token
   * @returns {string|null} secret token or null
   */
  get secretToken() {
    return this._props.secret_token || null;
  }


  /**
   * ScimSettingsEntity.SECRET_TOKEN_LENGTH
   * @returns {string}
   */
  static get SECRET_TOKEN_LENGTH() {
    return SECRET_TOKEN_LENGTH;
  }
}

export default ScimSettingsEntity;
