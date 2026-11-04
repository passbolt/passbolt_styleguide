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

const ENTITY_NAME = "core";

class CoreEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(CoreEntity.ENTITY_NAME, dto, CoreEntity.getSchema()), options);
  }

  static getSchema() {
    return {
      type: "object",
      required: ["cache", "debugDisabled", "salt", "fullBaseUrl", "validFullBaseUrl", "info", "fullBaseUrlReachable"],
      properties: {
        cache: { type: "boolean" },
        debugDisabled: { type: "boolean" },
        salt: { type: "boolean" },
        fullBaseUrl: { type: "boolean" },
        validFullBaseUrl: { type: "boolean" },
        info: {
          type: "object",
          required: ["fullBaseUrl"],
          properties: {
            fullBaseUrl: { type: "string", format: "uri" },
          },
        },
        fullBaseUrlReachable: { type: "boolean" },
      },
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get cache() {
    return this._props.cache;
  }

  get debugDisabled() {
    return this._props.debugDisabled;
  }

  get salt() {
    return this._props.salt;
  }

  get fullBaseUrl() {
    return this._props.fullBaseUrl;
  }

  get validFullBaseUrl() {
    return this._props.validFullBaseUrl;
  }

  get info() {
    return this._props.info;
  }

  get fullBaseUrlReachable() {
    return this._props.fullBaseUrlReachable;
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

export default CoreEntity;
