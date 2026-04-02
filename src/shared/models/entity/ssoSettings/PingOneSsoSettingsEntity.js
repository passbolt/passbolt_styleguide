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
 * @since         5.11.0
 */
import EntityV2 from "../abstract/entityV2";

const ENTITY_NAME = "PingOneSsoSettings";
const PINGONE = "pingone";

const SUPPORTED_URLS = [
  "https://auth.pingone.com",
  "https://auth.pingone.eu",
  "https://auth.pingone.ca",
  "https://auth.pingone.asia",
  "https://auth.pingone.com.au",
  "https://auth.pingone.sg",
];

/**
 * Entity related to the PingOne SSO settings
 */
class PingOneSsoSettingsEntity extends EntityV2 {
  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["url", "environment_id", "client_id", "client_secret", "email_claim"],
      properties: {
        url: {
          type: "string",
          enum: SUPPORTED_URLS,
        },
        environment_id: {
          type: "string",
          minLength: 1,
        },
        client_id: {
          type: "string",
          minLength: 1,
        },
        client_secret: {
          type: "string",
          minLength: 1,
        },
        email_claim: {
          type: "string",
          minLength: 1,
        },
      },
    };
  }

  /**
   * PingOneSsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * PingOneSsoSettingsEntity.PROVIDER_ID
   * @returns {string}
   */
  static get PROVIDER_ID() {
    return PINGONE;
  }

  /**
   * PingOneSsoSettingsEntity.SUPPORTED_URLS
   * @returns {Array<string>}
   */
  static get SUPPORTED_URLS() {
    return SUPPORTED_URLS;
  }
}

export default PingOneSsoSettingsEntity;
