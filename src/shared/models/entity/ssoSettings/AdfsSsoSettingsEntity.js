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
 * @since         4.6.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = "ADFSSsoSettings";
const ADFS = "adfs";

const ADFS_SUPPORTED_URLS = /^https:\/\/.+[^/]$/;

/**
 * Entity related to the SSO settings
 */
class AdfsSsoSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(adfsSsoSettingsDto, options = {}) {
    super(
      EntitySchema.validate(AdfsSsoSettingsEntity.ENTITY_NAME, adfsSsoSettingsDto, AdfsSsoSettingsEntity.getSchema()),
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
          pattern: ADFS_SUPPORTED_URLS,
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
   * Custom validators
   * ==================================================
   */

  static validateUrl(value) {
    if (typeof value !== "string") {
      throw new TypeError("The url should be a string.");
    }

    let url;

    try {
      url = new URL(value);
    } catch (error) {
      throw new Error("The url should be a valid url.", { cause: error });
    }

    if (url.protocol !== "https:") {
      throw new Error("The url protocol should be HTTPS.");
    }
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * AdfsSsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * AdfsSsoSettingsEntity.PROVIDER_ID
   * @returns {string}
   */
  static get PROVIDER_ID() {
    return ADFS;
  }
}

export default AdfsSsoSettingsEntity;
