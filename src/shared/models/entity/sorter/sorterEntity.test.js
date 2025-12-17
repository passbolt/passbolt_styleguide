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
import SorterEntity from "./sorterEntity";
import { defaultSorterData } from "./sorterEntity.test.data";
import each from "jest-each";
import EntityValidationError from "../abstract/entityValidationError";

describe("SorterEntity", () => {
  describe("SorterEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SorterEntity.ENTITY_NAME, SorterEntity.getSchema());
    });

    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(3);
      const dto = defaultSorterData();
      const entity = new SorterEntity(dto);

      expect(entity).toBeInstanceOf(SorterEntity);
      expect(entity.propertyName).toEqual(dto.propertyName);
      expect(entity.asc).toEqual(dto.asc);
    });

    each([
      { scenario: "required", rule: "type" },
      { scenario: "not null", rule: "type", value: null },
    ]).describe("Should validate the propertyName", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultSorterData({
          propertyName: test.value,
        });
        try {
          new SorterEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("propertyName", test.rule)).toBeTruthy();
        }
      });
    });

    each([
      { scenario: "required", rule: "type" },
      { scenario: "not null", rule: "type", value: null },
    ]).describe("Should validate the asc", (test) => {
      it(`Should not accept: ${test.scenario}`, async () => {
        expect.assertions(2);
        const dto = defaultSorterData({
          propertyName: "name",
          asc: test.value,
        });
        try {
          new SorterEntity(dto);
        } catch (error) {
          expect(error).toBeInstanceOf(EntityValidationError);
          expect(error.hasError("asc", test.rule)).toBeTruthy();
        }
      });
    });
  });

  describe("SorterEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = ["propertyName", "asc"];

      const dto = defaultSorterData();
      const entity = new SorterEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(expectedKeys.length);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
