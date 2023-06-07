/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import EntitySchema from "../abstract/entitySchema";
import ActionEntity from "./actionEntity";
import {defaultActionData} from "./actionEntity.test.data";
import each from "jest-each";
import EntityValidationError from "../abstract/entityValidationError";
import {v4 as uuid} from "uuid";

describe("ActionEntity", () => {
  describe("ActionEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ActionEntity.ENTITY_NAME, ActionEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(3);
      const dto = defaultActionData();
      const entity = new ActionEntity(dto);

      expect(entity).toBeInstanceOf(ActionEntity);
      expect(entity.id).toEqual(dto.id);
      expect(entity.name).toEqual(dto.name);
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'valid uuid', rule: 'format', value: 'invalid-id'},
    ]).describe("Should validate the id", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultActionData({
          id: test.value
        });
        try {
          new ActionEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('id', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'max length', rule: 'maxLength', value: "a".repeat(256)},
    ]).describe("Should validate the name", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultActionData({
          id: uuid(),
          name: test.value
        });
        try {
          new ActionEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('name', test.rule)).toBeTruthy();
        }
      });
    });
  });

  describe("ActionEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = [
        'id',
        'name'
      ];

      const dto = defaultActionData();
      const entity = new ActionEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
