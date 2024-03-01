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

const ENTITY_NAME = "environment";

class EnvironmentEntity extends Entity {
  constructor(dto) {
    super(EntitySchema.validate(EnvironmentEntity.ENTITY_NAME, dto, EnvironmentEntity.getSchema()));
  }

  static getSchema() {
    return {
      "type": "object",
      "required": ["phpVersion", "pcre", "mbstring", "gnupg", "intl", "image", "tmpWritable", "logWritable"],
      "properties": {
        "phpVersion": {"type": "boolean"},
        "pcre": {"type": "boolean"},
        "mbstring": {"type": "boolean"},
        "gnupg": {"type": "boolean"},
        "intl": {"type": "boolean"},
        "image": {"type": "boolean"},
        "tmpWritable": {"type": "boolean"},
        "logWritable": {"type": "boolean"},
        "info": {
          "type": "object",
          "required": ["phpVersion"],
          "properties": {
            "serverPhpVersion": {
              "type:": "string"
            }
          }
        }
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get phpVersion() {
    return this._props.phpVersion;
  }

  get pcre() {
    return this._props.pcre;
  }

  get mbstring() {
    return this._props.mbstring;
  }

  get gnupg() {
    return this._props.gnupg;
  }

  get intl() {
    return this._props.intl;
  }

  get image() {
    return this._props.image;
  }

  get tmpWritable() {
    return this._props.tmpWritable;
  }

  get logWritable() {
    return this._props.logWritable;
  }

  get info() {
    return this._props.info;
  }

  get serverPhpVersion() {
    return this._props.phpVersion;
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

export default EnvironmentEntity;
