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

const ENTITY_NAME = "OAuth2SsoSettings";
const OAUTH2 = "oauth2";

const OAUTH2_SUPPORTED_URLS = /^https:\/\/.+[^/]$/;

/**
 * Entity related to the SSO settings
 */
class OAuth2SsoSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(oAuth2SsoSettingsDto, options = {}) {
    super(
      EntitySchema.validate(
        OAuth2SsoSettingsEntity.ENTITY_NAME,
        oAuth2SsoSettingsDto,
        OAuth2SsoSettingsEntity.getSchema(),
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
      required: ["url", "openid_configuration_path", "scope", "client_id", "client_secret"],
      properties: {
        url: {
          type: "string",
          pattern: OAUTH2_SUPPORTED_URLS,
        },
        openid_configuration_path: {
          type: "string",
          minLength: 1,
        },
        scope: {
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
      },
    };
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * OAuth2SsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * OAuth2SsoSettingsEntity.PROVIDER_ID
   * @returns {string}
   */
  static get PROVIDER_ID() {
    return OAUTH2;
  }
}

export default OAuth2SsoSettingsEntity;
