/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */
import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "application";

class ApplicationEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(ApplicationEntity.ENTITY_NAME, dto, ApplicationEntity.getSchema()), options);
  }

  /**
   * Get application entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "info",
        "latestVersion",
        "schema",
        "robotsIndexDisabled",
        "sslForce",
        "sslFullBaseUrl",
        "seleniumDisabled",
        "registrationClosed",
        "configPath",
        "hostAvailabilityCheckEnabled",
        "jsProd",
        "emailNotificationEnabled",
      ],
      properties: {
        info: {
          type: "object",
          required: ["remoteVersion", "currentVersion"],
          properties: {
            remoteVersion: {
              type: "string",
              nullable: true,
            },
            currentVersion: {
              type: "string",
            },
          },
        },
        latestVersion: {
          type: "boolean",
          nullable: true,
        },
        schema: {
          type: "boolean",
        },
        robotsIndexDisabled: {
          type: "boolean",
        },
        sslForce: {
          type: "boolean",
        },
        sslFullBaseUrl: {
          type: "boolean",
        },
        seleniumDisabled: {
          type: "boolean",
        },
        configPath: {
          type: "string",
        },
        registrationClosed: {
          type: "object",
          required: [
            "isSelfRegistrationPluginEnabled",
            "selfRegistrationProvider",
            "isRegistrationPublicRemovedFromPassbolt",
          ],
          properties: {
            isSelfRegistrationPluginEnabled: {
              type: "boolean",
            },
            selfRegistrationProvider: {
              type: "string",
              nullable: true,
            },
            isRegistrationPublicRemovedFromPassbolt: {
              type: "boolean",
            },
          },
        },
        hostAvailabilityCheckEnabled: {
          type: "boolean",
        },
        jsProd: {
          type: "boolean",
        },
        emailNotificationEnabled: {
          type: "boolean",
        },
      },
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get info() {
    return this._props.info;
  }

  get latestVersion() {
    return this._props.latestVersion;
  }

  getSchema() {
    return this._props.getSchema;
  }

  get robotsIndexDisabled() {
    return this._props.robotsIndexDisabled;
  }

  get sslForce() {
    return this._props.sslForce;
  }

  get sslFullBaseUrl() {
    return this._props.sslFullBaseUrl;
  }

  get schema() {
    return this._props.schema;
  }

  get currentVersion() {
    return this._props.currentVersion;
  }

  get configPath() {
    return this._props.configPath;
  }

  get seleniumDisabled() {
    return this._props.seleniumDisabled;
  }

  get registrationClosed() {
    return this._props.registrationClosed;
  }

  get hostAvailabilityCheckEnabled() {
    return this._props.hostAvailabilityCheckEnabled;
  }

  get jsProd() {
    return this._props.jsProd;
  }

  get emailNotificationEnabled() {
    return this._props.emailNotificationEnabled;
  }

  /*
   *==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default ApplicationEntity;
