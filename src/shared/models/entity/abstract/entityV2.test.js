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

import EntityV2 from "./entityV2";
import {
  defaultTestEntityV2Dto,
  minimalTestEntityV2Dto,
  TestAssociatedEntityV2,
  TestEntityV2
} from "./entityV2.test.data";

beforeEach(() => {
  TestEntityV2._cachedSchema = {};
  TestAssociatedEntityV2._cachedSchema = {};
});

describe("EntityV2", () => {
  describe("::constructor", () => {
    it("should accept minimal dto.", () => {
      expect.assertions(2);
      const dto = minimalTestEntityV2Dto();
      const entity = new TestEntityV2(dto);
      expect(entity.id).toBeNull();
      expect(entity.name).toEqual(dto.name);
    });

    it("should accept complete dto including asscoiated entities.", () => {
      expect.assertions(4);
      const dto = defaultTestEntityV2Dto();
      const entity = new TestEntityV2(dto);
      expect(entity.id).toEqual(dto.id);
      expect(entity.name).toEqual(dto.name);
      expect(entity.associatedEntity).toBeInstanceOf(TestAssociatedEntityV2);
      expect(entity.associatedEntity.id).toEqual(dto.associated_entity.id);
    });

    it("should throw if the dto does not validate against the entity schema.", () => {
      expect.assertions(1);
      const dto = minimalTestEntityV2Dto({name: 42});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "type");
    });

    it("should throw if a dto associated entity dto does not validate against the associated entity schema.", () => {
      expect.assertions(2);
      const associatedEntityDto = {id: 42};
      const dto = minimalTestEntityV2Dto({associated_entity: associatedEntityDto});
      // Ideally the thrown error should indicate the path of the error.
      expect(() => new TestEntityV2(dto))
        .not.toThrowEntityValidationError("associated_entity", "id.type");
      expect(() => new TestEntityV2(dto))
        .toThrowEntityValidationError("id", "type");
    });

    it("should throw if the dto does not validate against the entity build rules.", () => {
      expect.assertions(1);
      const dto = minimalTestEntityV2Dto({name: "Karen"});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "karen");
    });

    it("should marshall props prior to validate.", () => {
      expect.assertions(1);
      const dto = minimalTestEntityV2Dto({name: "K4r3n"});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "karen");
    });

    it("should throw an error if getSchema is not overriden.", () => {
      expect.assertions(1);
      const expectedError = new Error("The entity class should declare its schema.");
      const dto = minimalTestEntityV2Dto({name: "K4r3n"});
      expect(() => new EntityV2(dto)).toThrow(expectedError);
    });
  });

  describe("::validateSchema", () => {
    it("should retrieve the schema on first validation and cache for later usage.", () => {
      expect.assertions(6);
      jest.spyOn(TestEntityV2, "getSchema");
      jest.spyOn(TestAssociatedEntityV2, "getSchema");
      expect(TestEntityV2._cachedSchema.TestEntityV2).toBeUndefined();
      expect(TestAssociatedEntityV2._cachedSchema.TestAssociatedEntityV2).toBeUndefined();
      new TestEntityV2(defaultTestEntityV2Dto());
      expect(TestEntityV2._cachedSchema.TestEntityV2).toEqual(TestEntityV2.getSchema());
      expect(TestAssociatedEntityV2._cachedSchema.TestAssociatedEntityV2).toEqual(TestAssociatedEntityV2.getSchema());
      new TestEntityV2(defaultTestEntityV2Dto());
      new TestEntityV2(defaultTestEntityV2Dto());
      expect(TestEntityV2.getSchema).toHaveBeenCalledTimes(2);
      expect(TestAssociatedEntityV2.getSchema).toHaveBeenCalledTimes(4);
    });

    it("should not validate the schema if `validate: false` is passed as an option.", () => {
      expect.assertions(4);

      jest.spyOn(TestEntityV2.prototype, "validateSchema");
      jest.spyOn(TestAssociatedEntityV2.prototype, "validateSchema");
      jest.spyOn(TestEntityV2.prototype, "validateBuildRules");
      jest.spyOn(TestAssociatedEntityV2.prototype, "validateBuildRules");

      new TestEntityV2(defaultTestEntityV2Dto(), {validate: false});

      expect(TestEntityV2.prototype.validateSchema).not.toHaveBeenCalled();
      expect(TestAssociatedEntityV2.prototype.validateSchema).not.toHaveBeenCalled();
      expect(TestEntityV2.prototype.validateBuildRules).not.toHaveBeenCalled();
      expect(TestAssociatedEntityV2.prototype.validateBuildRules).not.toHaveBeenCalled();
    });
  });
});
