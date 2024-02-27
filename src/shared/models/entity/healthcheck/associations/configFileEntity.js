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

const ENTITY_NAME = "configFile";

class ConfigFileEntity extends Entity {
  constructor(dto) {
    super(EntitySchema.validate(ConfigFileEntity.ENTITY_NAME, dto, ConfigFileEntity.getSchema()));
  }

  static getSchema() {
    return {
      "type": "object",
      "required": ["app", "passbolt"],
      "properties": {
        "app": {"type": "boolean"},
        "passbolt": {"type": "boolean"}
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get app() {
    return this._props.app;
  }

  get passbolt() {
    return this._props.passbolt;
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

export default ConfigFileEntity;
