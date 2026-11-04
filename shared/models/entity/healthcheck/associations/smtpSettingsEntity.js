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

const ENTITY_NAME = "smtpSettings";

class SmtpSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(SmtpSettingsEntity.ENTITY_NAME, dto, SmtpSettingsEntity.getSchema()), options);
  }

  static getSchema() {
    return {
      type: "object",
      required: ["isEnabled", "areEndpointsDisabled", "errorMessage", "source", "isInDb"],
      properties: {
        isEnabled: { type: "boolean" },
        areEndpointsDisabled: { type: "boolean" },
        errorMessage: {
          anyOf: [
            {
              type: "boolean",
            },
            {
              type: "string",
            },
          ],
        },
        source: { type: "string" },
        isInDb: { type: "boolean" },
      },
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get isEnabled() {
    return this._props.isEnabled;
  }

  get areEndpointsDisabled() {
    return this._props.areEndpointsDisabled;
  }

  get errorMessage() {
    return this._props.errorMessage;
  }

  get source() {
    return this._props.source;
  }

  get isInDb() {
    return this._props.isInDb;
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

export default SmtpSettingsEntity;
