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
import GridUserSettingEntity from "./gridUserSettingEntity";
import { defaultGridUserSettingData } from "./gridUserSettingEntity.test.data";
import each from "jest-each";
import EntityValidationError from "../abstract/entityValidationError";

describe("GridUserSettingEntity", () => {
  describe("GridUserSettingEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(GridUserSettingEntity.ENTITY_NAME, GridUserSettingEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(3);
      const dto = defaultGridUserSettingData();
      const entity = new GridUserSettingEntity(dto);

      expect(entity).toBeInstanceOf(GridUserSettingEntity);
      expect(entity.columnsSetting.toDto()).toEqual(dto.columns_setting);
      expect(entity.sorter.toDto()).toEqual(dto.sorter);
    });

    each([
      { scenario: "required", rule: "type" },
      { scenario: "not null", rule: "type", value: null },
    ]).describe("Should validate the columns_setting", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultGridUserSettingData({
          columns_setting: test.value,
        });
        try {
          new GridUserSettingEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("columns_setting", test.rule)).toBeTruthy();
        }
      });
    });

    each([{ scenario: "required", rule: "type" }]).describe("Should validate the sorter", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultGridUserSettingData({
          sorter: test.value,
        });
        try {
          new GridUserSettingEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("sorter", test.rule)).toBeTruthy();
        }
      });
    });
  });

  describe("GridUserSettingEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = ["columns_setting", "sorter"];

      const dto = defaultGridUserSettingData();
      const entity = new GridUserSettingEntity(dto);
      const resultDto = entity.toJSON();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
