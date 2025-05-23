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
  defaultAssociatedTestEntityV2Dto,
  defaultTestEntityV2Dto,
  minimalTestEntityV2Dto,
  TestAssociatedEntityV2,
  TestEntityV2,
  TestWithAssociationEntityV2
} from "./entityV2.test.data";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {v4 as uuid} from "uuid";
import EntitySchema from "./entitySchema";
import EntityValidationError from "./entityValidationError";

beforeEach(() => {
  TestEntityV2._cachedSchema = {};
  TestAssociatedEntityV2._cachedSchema = {};
  jest.clearAllMocks();
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

    it("should accept complete dto including associated entities.", () => {
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
        .toThrowEntityValidationError("associated_entity.details.id", "type");
      expect(() => new TestEntityV2(dto))
        .not.toThrowEntityValidationError("id", "type");
    });

    it("should throw if the dto does not validate against the entity build rules.", () => {
      expect.assertions(1);
      const dto = minimalTestEntityV2Dto({name: "Karen"});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "karen");
    });

    it("call the marshall function prior to validate.", () => {
      expect.assertions(1);
      const dto = minimalTestEntityV2Dto({name: "K4r3n"});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "karen");
    });

    it("validates the entity schema.", () => {
      jest.spyOn(TestEntityV2.prototype, "validateSchema");
      assertEntityProperty.string(TestEntityV2, "id");
      assertEntityProperty.uuid(TestEntityV2, "id");
      assertEntityProperty.nullable(TestEntityV2, "id");
      assertEntityProperty.string(TestEntityV2, "name");
      assertEntityProperty.nullable(TestEntityV2, "name");
      expect(TestEntityV2.prototype.validateSchema).toHaveBeenCalled();
    });

    it("does not validate the entity schema or its associations if disabled by option.", () => {
      expect.assertions(2);

      jest.spyOn(TestEntityV2.prototype, "validateSchema");
      jest.spyOn(TestAssociatedEntityV2.prototype, "validateSchema");

      new TestEntityV2(defaultTestEntityV2Dto(), {validate: false});

      expect(TestEntityV2.prototype.validateSchema).not.toHaveBeenCalled();

      // For now instantiation of associations is implemented manually in entity constructor.
      expect(TestAssociatedEntityV2.prototype.validateSchema).not.toHaveBeenCalled();
    });

    it("validates the entity build rules.", () => {
      expect.assertions(2);
      jest.spyOn(TestEntityV2.prototype, "validateBuildRules");
      const dto = defaultTestEntityV2Dto({name: "Karen"});
      expect(() => new TestEntityV2(dto)).toThrowEntityValidationError("name", "karen");
      expect(TestEntityV2.prototype.validateBuildRules).toHaveBeenCalled();
    });

    it("does not validate the entity build rules or its associations if disabled by option.", () => {
      expect.assertions(2);

      jest.spyOn(TestEntityV2.prototype, "validateBuildRules");
      jest.spyOn(TestAssociatedEntityV2.prototype, "validateBuildRules");

      new TestEntityV2(defaultTestEntityV2Dto(), {validate: false});

      expect(TestEntityV2.prototype.validateBuildRules).not.toHaveBeenCalled();

      // For now instantiation of associations is implemented manually in entity constructor.
      expect(TestAssociatedEntityV2.prototype.validateBuildRules).not.toHaveBeenCalled();
    });
  });

  describe("::validateSchema", () => {
    it("throws an error if the getSchema function is not overridden.", () => {
      expect.assertions(1);
      const expectedError = new Error("The entity class should declare its schema.");
      const dto = minimalTestEntityV2Dto({name: "K4r3n"});
      const entity = new EntityV2(dto, {validate: false});
      expect(() => entity.validateSchema()).toThrow(expectedError);
    });

    it("validates the entity schema.", () => {
      expect.assertions(1);
      // Schema is better covered on the constructor as unit tests tools were implemented originally for it.
      const entity = new TestEntityV2({id: 42}, {validate: false});
      expect(() => entity.validateSchema()).toThrowEntityValidationError("id", "type");
    });

    it("retrieves and caches the schema on first validation.", () => {
      expect.assertions(5);
      jest.spyOn(TestEntityV2, "getSchema");
      jest.spyOn(TestAssociatedEntityV2, "getSchema");
      expect(TestEntityV2._cachedSchema.TestEntityV2).toBeUndefined();
      expect(TestAssociatedEntityV2._cachedSchema.TestAssociatedEntityV2).toBeUndefined();
      const entity = new TestEntityV2(defaultTestEntityV2Dto(), {validate: false});
      entity.validateSchema();
      expect(TestEntityV2._cachedSchema.TestEntityV2).toEqual(TestEntityV2.getSchema());
      entity.validateSchema();
      new TestEntityV2(defaultTestEntityV2Dto()); // ensure the cache is used even when validating entity from constructor.
      expect(TestEntityV2.getSchema).toHaveBeenCalledTimes(2);
      expect(TestAssociatedEntityV2.getSchema).toHaveBeenCalledTimes(3);
    });

    it("validates should remove association required if skipSchemaAssociationValidation option.", () => {
      expect.assertions(1);

      jest.spyOn(EntitySchema, "validate");

      const entity = new TestWithAssociationEntityV2({
        "name": "test name",
        associated_entity: defaultAssociatedTestEntityV2Dto(),
      }, {
        validate: false
      }); // ensure the cache is used even when validating entity from constructor.

      entity.validate({
        skipSchemaAssociationValidation: true
      });

      const expectedSchema = TestWithAssociationEntityV2.getSchema();
      expectedSchema.required = ["name"];

      expect(EntitySchema.validate).toHaveBeenCalledWith(
        entity.constructor.name,
        entity._props,
        expectedSchema
      );
    });


    it("validates should not association required if skipSchemaAssociationValidation option not exist.", () => {
      expect.assertions(1);

      jest.spyOn(EntitySchema, "validate");

      const entity = new TestWithAssociationEntityV2({
        "name": "test name",
        associated_entity: defaultAssociatedTestEntityV2Dto(),
      }, {
        validate: false
      }); // ensure the cache is used even when validating entity from constructor.

      entity.validate({
        skipSchemaAssociationValidation: false
      });


      expect(EntitySchema.validate).toHaveBeenCalledWith(
        entity.constructor.name,
        entity._props,
        TestWithAssociationEntityV2.getSchema()
      );
    });
  });

  describe("::validate", () => {
    it("does not return error if there is no issue.", () => {
      expect.assertions(1);
      jest.spyOn(TestEntityV2.prototype, "validateSchema");
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      const result = entity.validate();
      expect(result).toBeNull();
    });

    it("validates the entity schema.", () => {
      expect.assertions(3);
      jest.spyOn(TestEntityV2.prototype, "validateSchema");
      const entity = new TestEntityV2({id: 42}, {validate: false});
      const result = entity.validate();
      expect(result.hasErrors()).toBeTruthy();
      expect(result.hasError("id", "type")).toBeTruthy();
      expect(TestEntityV2.prototype.validateSchema).toHaveBeenCalled();
    });

    it("validates the build rules.", () => {
      expect.assertions(3);
      jest.spyOn(TestEntityV2.prototype, "validateBuildRules");
      const entity = new TestEntityV2({name: "Karen"}, {validate: false});
      const result = entity.validate();
      expect(result.hasErrors()).toBeTruthy();
      expect(result.hasError("name", "karen")).toBeTruthy();
      expect(TestEntityV2.prototype.validateSchema).toHaveBeenCalled();
    });

    it("should skip required association from schema when option skipSchemaAssociationValidation exist.", () => {
      expect.assertions(1);
      const entity = new TestWithAssociationEntityV2(defaultTestEntityV2Dto(), {
        validate: false
      });
      const result = entity.validate({
        skipSchemaAssociationValidation: true,
      });

      expect(result).toBeNull();
    });

    it("should not validate required association from schema when option skipSchemaAssociationValidation is false.", () => {
      expect.assertions(2);
      const entity = new TestWithAssociationEntityV2(defaultTestEntityV2Dto(), {
        skipSchemaAssociationValidation: true,
        validate: false
      });
      const result = entity.validate();

      expect(result.hasErrors()).toBeTruthy();
      expect(result.hasError("associated_entity", "required")).toBeTruthy();
    });

    it("throws an error if the getSchema function is not overridden.", () => {
      expect.assertions(1);
      const expectedError = new Error("The entity class should declare its schema.");
      const dto = minimalTestEntityV2Dto({name: "K4r3n"});
      const entity = new EntityV2(dto, {validate: false});
      expect(() => entity.validate()).toThrow(expectedError);
    });
  });

  describe("::validateAssociations", () => {
    it("does not return error if validation association respect schema.", () => {
      expect.assertions(1);

      const entity = new TestWithAssociationEntityV2(defaultTestEntityV2Dto());

      expect(() => entity.validateAssociations()).not.toThrowEntityValidationError();
    });

    it("throws a validation error if the association validation failed.", () => {
      expect.assertions(1);

      const entity = new TestWithAssociationEntityV2(defaultTestEntityV2Dto({
        associated_entity: {},
      }), {
        validate: false
      });

      const validationErrors = new EntityValidationError();
      validationErrors.addAssociationError("associated_entity", new EntityValidationError("id", "required", "Could not validate entity TestAssociatedEntityV2."));
      expect(() => entity.validateAssociations()).toThrow(validationErrors);
    });
  });
  describe("::associations", () => {
    it("retrieves empty associations.", () => {
      expect.assertions(1);
      expect(EntityV2.associations).toStrictEqual({});
    });

    it("retrieves associations of an entity.", () => {
      expect.assertions(1);
      expect(TestEntityV2.associations).toStrictEqual({"associated_entity": TestAssociatedEntityV2});
    });
  });

  describe("::get", () => {
    it("returns a property value.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      expect(entity.get("name")).toEqual("test name");
    });

    it("returns undefined if a property value was not defined.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      expect(entity.get("id")).toBeUndefined();
    });

    it("throws if property name is not a string.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.get(42)).toThrow(TypeError);
    });

    it("throws if property not defined in entity schema.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.get("undefined_prop")).toThrow(new Error("The property \"undefined_prop\" has no schema definition."));
    });

    it("throws if property is relative to an object.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.get("object")).toThrow(new Error("The property \"associated_entity\" should reference scalar properties only."));
    });

    it("throws if property is relative to an array.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.get("array")).toThrow(new Error("The property \"associated_entity\" should reference scalar properties only."));
    });

    it("throws if property is relative to an association.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.get("associated_entity")).toThrow(new Error("The property \"associated_entity\" should reference scalar properties only."));
    });
  });

  describe("::set", () => {
    it("set a property value.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      entity.set("name", "Updated name");
      expect(entity.name).toEqual("Updated name");
    });

    it("throws if the value does not validate the schema.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("name", 42)).toThrowEntityValidationError("name", "type");
    });

    it("does not validate and set the property with a wrong value if the validation is disabled by option.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      entity.set("name", 42, {validate: false});
      expect(entity.name).toBe(42);
    });

    it("throws if property name is not a string.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set(42)).toThrow(TypeError);
    });

    it("throws if property not defined in entity schema.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("undefined_prop")).toThrow(new Error("The property \"undefined_prop\" has no schema definition."));
    });

    it("throws if property is relative to an object.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("object")).toThrow(new Error("The property \"associated_entity\" should reference scalar properties only."));
    });

    it("set an association property value with dto.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      const associatedTestEntityV2Dto = defaultAssociatedTestEntityV2Dto();
      entity.set("associated_entity", associatedTestEntityV2Dto);
      expect(entity.associatedEntity.toDto()).toStrictEqual(associatedTestEntityV2Dto);
    });

    it("set an association property value with entity.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      const associatedTestEntityV2 = new TestAssociatedEntityV2(defaultAssociatedTestEntityV2Dto());
      entity.set("associated_entity", associatedTestEntityV2);
      expect(entity.associatedEntity).toStrictEqual(associatedTestEntityV2);
    });

    it("set an association property value with property in the association.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      const id = uuid();
      entity.set("associated_entity.id", id);
      expect(entity.associatedEntity.id).toStrictEqual(id);
    });

    it("create and set an association property value with property in the association.", () => {
      expect.assertions(2);
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      const id = uuid();
      expect(entity.associatedEntity).toBeUndefined();
      entity.set("associated_entity.id", id);
      expect(entity.associatedEntity.id).toStrictEqual(id);
    });

    it("throws if association property value is not valid object.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("associated_entity", {id: "no uuid"})).toThrow(new Error("Could not validate entity TestAssociatedEntityV2."));
    });

    it("throws if association property value is not valid entity.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("associated_entity", new EntityV2({id: "no uuid"}, {validate: false}))).toThrow(new Error("Could not validate entity TestAssociatedEntityV2."));
    });

    it("throws if association property value with property in the association is not valid.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("associated_entity.id", "no uuid")).toThrow(new Error("Could not validate property id."));
    });

    it("throws if association property value with property in an new association is not valid.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(minimalTestEntityV2Dto());
      expect(() => entity.set("associated_entity.id", "no uuid")).toThrow(new Error("Could not validate property id."));
    });

    it("throws if array prop index is not defined.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("array")).toThrow(new Error("The property \"array\" has no index passed."));
    });

    it("throws if array prop index has an incorrect format.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("array.[0]")).toThrow(new Error("The property \"array\" has an invalid index format. Expected format: digits."));
    });
    it("throws if array prop items does not respect items type.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.set("array.0", [])).toThrow(new Error("Could not validate property array."));
    });

    it("should set the array properties.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      entity.set("array.0", "test");
      expect(entity.toDto().array[0]).toEqual("test");
    });
  });

  describe("::diffProps", () => {
    it("returns no differences between two similar entities.", () => {
      expect.assertions(1);
      const entity1 = new TestEntityV2(minimalTestEntityV2Dto());
      const entity2 = new TestEntityV2(minimalTestEntityV2Dto());
      const diff = entity1.diffProps(entity2);
      expect(Object.keys(diff).length).toEqual(0);
    });

    it("returns differences when the property defined in entity 1 are similar to the property defined in a second entity having more property defined.", () => {
      expect.assertions(5);
      const entity1 = new TestEntityV2(minimalTestEntityV2Dto());
      const entity2 = new TestEntityV2(defaultTestEntityV2Dto());
      const diff = entity1.diffProps(entity2);
      expect(Object.keys(diff).length).toEqual(4);
      expect(diff.id).toEqual(entity2.id);
      expect(diff.number).toEqual(entity2.get("number"));
      expect(diff.integer).toEqual(entity2.get("integer"));
      expect(diff.boolean).toEqual(entity2.get("boolean"));
    });

    it("returns differences when the property defined in entity 1 are not equal to the property defined in a second entity.", () => {
      expect.assertions(2);
      const entity1 = new TestEntityV2(defaultTestEntityV2Dto());
      const entity2 = new TestEntityV2(minimalTestEntityV2Dto());
      const diff = entity1.diffProps(entity2);
      expect(Object.keys(diff).length).toEqual(4);
      expect(diff).toEqual({id: undefined, number: undefined, integer: undefined, boolean: undefined});
    });

    it("does not return difference on non scalar properties.", () => {
      expect.assertions(5);
      const entity1 = new TestEntityV2(defaultTestEntityV2Dto());
      const entity2 = new TestEntityV2(defaultTestEntityV2Dto({boolean: !entity1.get("boolean")}));
      const diff = entity1.diffProps(entity2);
      expect(Object.keys(diff).length).toEqual(4);
      expect(diff.id).toEqual(entity2.id);
      expect(diff.number).toEqual(entity2.get("number"));
      expect(diff.integer).toEqual(entity2.get("integer"));
      expect(diff.boolean).toEqual(entity2.get("boolean"));
    });

    it("throws if the compared entity is not of entity v2 type.", () => {
      expect.assertions(1);
      const entity = new TestEntityV2(defaultTestEntityV2Dto());
      expect(() => entity.diffProps(42)).toThrow(TypeError);
    });
  });

  describe("::hasDiffProps", () => {
    it("returns false when the two entities have no differences.", () => {
      expect.assertions(1);
      const entity1 = new TestEntityV2(minimalTestEntityV2Dto());
      const entity2 = new TestEntityV2(minimalTestEntityV2Dto());
      expect(entity1.hasDiffProps(entity2)).toBeFalsy();
    });

    it("returns true when the two entities have no differences.", () => {
      expect.assertions(1); const entity1 = new TestEntityV2(defaultTestEntityV2Dto());
      const entity2 = new TestEntityV2(minimalTestEntityV2Dto());
      expect(entity1.hasDiffProps(entity2)).toBeTruthy();
    });
  });
});
