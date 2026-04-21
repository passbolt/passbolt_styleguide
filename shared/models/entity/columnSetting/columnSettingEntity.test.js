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
 * @since         4.3.0
 */

import EntitySchema from "../abstract/entitySchema";
import ColumnSettingEntity from "./columnSettingEntity";
import { defaultColumnSettingData } from "./columnSettingEntity.test.data";
import each from "jest-each";
import EntityValidationError from "../abstract/entityValidationError";

describe("ColumnSettingEntity", () => {
  describe("ColumnSettingEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ColumnSettingEntity.ENTITY_NAME, ColumnSettingEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(3);
      const dto = defaultColumnSettingData();
      const entity = new ColumnSettingEntity(dto);

      expect(entity).toBeInstanceOf(ColumnSettingEntity);
      expect(entity.id).toEqual(dto.id);
      expect(entity.label).toEqual(dto.label);
    });

    each([
      { scenario: "required", rule: "type" },
      { scenario: "not null", rule: "type", value: null },
    ]).describe("Should validate the id", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultColumnSettingData({
          id: test.value,
        });
        try {
          new ColumnSettingEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("id", test.rule)).toBeTruthy();
        }
      });
    });

    each([
      { scenario: "required", rule: "type" },
      { scenario: "not null", rule: "type", value: null },
    ]).describe("Should validate the label", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultColumnSettingData({
          id: "id",
          label: test.value,
        });
        try {
          new ColumnSettingEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("label", test.rule)).toBeTruthy();
        }
      });
    });
  });

  describe("ColumnSettingEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = ["id", "label"];

      const dto = defaultColumnSettingData();
      const entity = new ColumnSettingEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
