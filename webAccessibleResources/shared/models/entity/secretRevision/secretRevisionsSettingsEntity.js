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
 * @since         5.7.0
 */
import EntityV2 from "../abstract/entityV2";

class SecretRevisionsSettingsEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "max_revisions",
        "allow_sharing_revisions",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "max_revisions": {
          "type": "integer",
          "minimum": 1,
        },
        "allow_sharing_revisions": {
          "type": "boolean",
        },
      }
    };
  }

  /**
   * Return the default secret revision settings.
   * @param {object} data the data to override the default with
   * @returns {SecretRevisionsSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      max_revisions: 1,
      allow_sharing_revisions: false
    };

    return new SecretRevisionsSettingsEntity({...defaultData, ...data});
  }
  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the secret revision settings id
   * @returns {string}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get the secret revision settings max revision
   * @returns {number}
   */
  get maxRevisions() {
    return this._props.max_revisions;
  }

  /**
   * Get the secret revision settings allow sharing revisions
   * @returns {boolean}
   */
  get allowSharingRevisions() {
    return this._props.allow_sharing_revisions;
  }
}

export default SecretRevisionsSettingsEntity;
