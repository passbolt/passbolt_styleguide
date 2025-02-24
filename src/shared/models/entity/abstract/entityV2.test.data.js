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
 * @since         4.9.0
 */
import {v4 as uuid} from "uuid";
import EntityV2 from "./entityV2";
import EntityValidationError from "./entityValidationError";

export class TestEntityV2 extends EntityV2 {
  static getSchema() {
    return {
      "type": "object",
      "required": ['name'],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "name": {
          "type": "string",
          "nullable": true,
        },
        "number": {
          "type": "number",
          "nullable": true,
        },
        "integer": {
          "type": "integer",
          "nullable": true,
        },
        "boolean": {
          "type": "boolean",
          "nullable": true,
        },
        "object": {
          "type": "object"
        },
        "array": {
          "type": "array"
        },
        "associated_entity": TestAssociatedEntityV2.getSchema()
      }
    };
  }

  static get associations() {
    return {
      "associated_entity": TestAssociatedEntityV2
    };
  }

  marshall() {
    if (this._props?.name === "K4r3n") {
      this._props.name = "Karen";
    }
    super.marshall();
  }

  // eslint-disable-next-line no-unused-vars
  validateBuildRules(options = {}) {
    if (this.name === "Karen") {
      const error = new EntityValidationError();
      error.addError("name", "karen", "I want to see the manager");
      throw error;
    }
  }

  get id() {
    return this._props.id || null;
  }
  set id(id) {
    this._props.id = id;
  }

  get name() {
    return this._props.name;
  }

  set name(name) {
    this._props.name = name;
  }

  get associatedEntity() {
    return this._associatedEntity;
  }
}

export class TestAssociatedEntityV2 extends EntityV2 {
  static getSchema() {
    return {
      "type": "object",
      "required": ["id"],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
      }
    };
  }

  get id() {
    return this._props.id || null;
  }
}

export const minimalTestEntityV2Dto = data => ({
  name: "test name",
  ...data
});

export const defaultTestEntityV2Dto = data => ({
  id: uuid(),
  name: "test name",
  number: Math.random(),
  integer: Math.floor(Math.random() * 100),
  boolean: Math.random() < 0.5,
  object: {
    foo: uuid()
  },
  array: [uuid(), uuid()],
  associated_entity: defaultAssociatedTestEntityV2Dto(),
  ...data
});

export const defaultAssociatedTestEntityV2Dto = data => ({
  id: uuid(),
  ...data
});
