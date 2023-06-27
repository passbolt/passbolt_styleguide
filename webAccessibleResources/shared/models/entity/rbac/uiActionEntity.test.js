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
 * @since         4.1.0
 */

import EntitySchema from "../abstract/entitySchema";
import UiActionEntity from "./uiActionEntity";
import {defaultUiActionData} from "./uiActionEntity.test.data";
import each from "jest-each";
import EntityValidationError from "../abstract/entityValidationError";

describe("UiActionEntity", () => {
  describe("UiActionEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(UiActionEntity.ENTITY_NAME, UiActionEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(3);
      const dto = defaultUiActionData();
      const entity = new UiActionEntity(dto);

      expect(entity).toBeInstanceOf(UiActionEntity);
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
        const dto = defaultUiActionData({
          id: test.value
        });
        try {
          new UiActionEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('id', test.rule)).toBeTruthy();
        }
      });
    });

    each([
      {scenario: 'required', rule: 'type'},
      {scenario: 'not null', rule: 'type', value: null},
      {scenario: 'max length', rule: 'format', value: "a".repeat(256)},
    ]).describe("Should validate the name", test => {
      it(`Should not accept: ${test.scenario}`, async() => {
        expect.assertions(2);
        const dto = defaultUiActionData({
          id: test.value
        });
        try {
          new UiActionEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError('id', test.rule)).toBeTruthy();
        }
      });
    });
  });

  describe("UiActionEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = [
        'id',
        'name'
      ];

      const dto = defaultUiActionData();
      const entity = new UiActionEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
