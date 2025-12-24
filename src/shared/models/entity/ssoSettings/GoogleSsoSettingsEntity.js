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
 * @since         4.5.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = "GoogleSsoSettings";
const GOOGLE = "google";

const SUPPORTED_URLS = ["https://accounts.google.com"];

/**
 * Entity related to the SSO settings
 */
class GoogleSsoSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(googleSsoSettingsDto, options = {}) {
    super(
      EntitySchema.validate(
        GoogleSsoSettingsEntity.ENTITY_NAME,
        googleSsoSettingsDto,
        GoogleSsoSettingsEntity.getSchema(),
      ),
      options,
    );
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["client_id", "client_secret"],
      properties: {
        client_id: {
          type: "string",
          minLength: 1,
        },
        client_secret: {
          type: "string",
          minLength: 1,
        },
      },
    };
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * GoogleSsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * GoogleSsoSettingsEntity.PROVIDER_ID
   * @returns {string}
   */
  static get PROVIDER_ID() {
    return GOOGLE;
  }

  /**
   * GoogleSsoSettingsEntity.SUPPORTED_URLS
   * @returns {Array<string>}
   */
  static get SUPPORTED_URLS() {
    return SUPPORTED_URLS;
  }
}

export default GoogleSsoSettingsEntity;
