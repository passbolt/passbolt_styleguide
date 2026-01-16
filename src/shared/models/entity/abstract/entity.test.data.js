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
 * @since         4.7.0
 */
import { v4 as uuid } from "uuid";
import Entity from "./entity";
import EntitySchema from "./entitySchema";

export class TestEntity extends Entity {
  constructor(dto, options = {}) {
    super(EntitySchema.validate(TestEntity.name, dto, TestEntity.getSchema()), options);
    // Association manual process
    if (this._props.associated_entity) {
      this._groups_users = new TestAssociatedEntity(this._props.associated_entity, { ...options, clone: false });
      delete this._props.associated_entity;
    }
  }

  static getSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: {
          anyOf: [
            {
              type: "string",
              format: "uuid",
            },
            {
              type: "null",
            },
          ],
        },
        name: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        associated_entity: TestAssociatedEntity.getSchema(),
      },
    };
  }

  get id() {
    return this._props.id;
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
}

export class TestAssociatedEntity extends Entity {
  constructor(dto, options = {}) {
    super(EntitySchema.validate(TestAssociatedEntity.name, dto, TestAssociatedEntity.getSchema()), options);
  }

  static getSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: {
          anyOf: [
            {
              type: "string",
              format: "uuid",
            },
            {
              type: "null",
            },
          ],
        },
      },
    };
  }

  get id() {
    return this._props.id;
  }
}

export const defaultTestEntityDto = (data) => ({
  id: uuid(),
  name: "test name",
  ...data,
});

export const defaultAssociatedTestEntityDto = (data) => ({
  id: uuid(),
  ...data,
});
