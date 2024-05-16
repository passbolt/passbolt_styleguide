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

import CollectionValidationError from "./collectionValidationError";
import EntityValidationError from "./entityValidationError";
import {TestEntityV2Collection} from "./entityV2Collection.test.data";
import {defaultAssociatedTestEntityDto, defaultTestEntityDto, TestEntity} from "./entity.test.data";

describe("EntityV2Collection", () => {
  describe("EntityV2Collection:push", () => {
    it("should throw an exception if the data parameter is not an object.", () => {
      const collection = new TestEntityV2Collection([]);
      expect.assertions(1);
      expect(() => collection.push(42)).toThrow(TypeError);
    });

    it("should accept dto as data parameter", () => {
      const collection = new TestEntityV2Collection([]);
      const entityDto1 = defaultTestEntityDto();
      const entityDto2 = defaultTestEntityDto();
      const entityDto3 = defaultTestEntityDto();

      expect.assertions(12);
      collection.push(entityDto1);
      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entityDto1.id);
      expect(collection.items[0].name).toEqual(entityDto1.name);
      collection.push(entityDto2);
      expect(collection).toHaveLength(2);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entityDto2.id);
      expect(collection.items[1].name).toEqual(entityDto2.name);
      collection.push(entityDto3);
      expect(collection).toHaveLength(3);
      expect(collection.items[2]).toBeInstanceOf(TestEntity);
      expect(collection.items[2].id).toEqual(entityDto3.id);
      expect(collection.items[2].name).toEqual(entityDto3.name);
    });

    it("should protect collection entities against original data alteration", () => {
      const collection = new TestEntityV2Collection([]);
      const entityDto1 = defaultTestEntityDto();

      expect.assertions(2);
      collection.push(entityDto1);
      const originalDtoValue = entityDto1.name;
      expect(collection.items[0]._props.name).toEqual(originalDtoValue);
      entityDto1.name = "name altered";
      expect(collection.items[0]._props.name).toEqual(originalDtoValue);
    });

    it("should accept entity as data parameter", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = new TestEntity(defaultTestEntityDto());
      const entity2 = new TestEntity(defaultTestEntityDto());
      const entity3 = new TestEntity(defaultTestEntityDto());

      expect.assertions(12);
      collection.push(entity1);
      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entity1.id);
      expect(collection.items[0].name).toEqual(entity1.name);
      collection.push(entity2);
      expect(collection).toHaveLength(2);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entity2.id);
      expect(collection.items[1].name).toEqual(entity2.name);
      collection.push(entity3);
      expect(collection).toHaveLength(3);
      expect(collection.items[2]).toBeInstanceOf(TestEntity);
      expect(collection.items[2].id).toEqual(entity3.id);
      expect(collection.items[2].name).toEqual(entity3.name);
    });

    it("should throw if the data does not validate the collection entity schema", () => {
      const collection = new TestEntityV2Collection([]);
      const dto = defaultTestEntityDto({id: 42});

      expect.assertions(2);
      try {
        collection.push(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error.details.id.type).toBeTruthy();
      }
    });

    it("should throw if the build rules do not validate", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = new TestEntity(defaultTestEntityDto());
      const entity2 = new TestEntity(defaultTestEntityDto());
      const entity3 = new TestEntity(defaultTestEntityDto({id: entity1.id}));

      expect.assertions(4);
      expect(() => collection.push(entity1)).not.toThrow();
      expect(() => collection.push(entity2)).not.toThrow();
      try {
        collection.push(entity3);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error.details.id.unique).toBeTruthy();
      }
    });

    /*
     * This test is expected to fail as the data is copied even though the original dto is not cloned.
     * Any change on the schema validation might change the default behavior of Entity and not protect by default
     * the entities against original data alteraiton.
     */
    it.failing("should, with disabling clone option, not protect collection entities against original data alteration", () => {
      const collection = new TestEntityV2Collection([]);
      const dto = defaultTestEntityDto();

      expect.assertions(2);
      collection.push(dto, {clone: false});
      expect(collection.items[0]._props.name).toEqual(dto.name);
      dto.name = "name altered";
      expect(collection.items[0]._props.name).toEqual(dto.name);
    });

    /*
     * Same comment as the previous test
     */
    it.failing("should, with disabling clone option, not protect collection entities against original entity alteration", () => {
      const collection = new TestEntityV2Collection([]);
      const entity = new TestEntity(defaultTestEntityDto());

      expect.assertions(2);
      collection.push(entity, {clone: false});
      expect(collection.items[0]._props.name).toEqual(entity.name);
      entity._props.name = "name altered";
      expect(collection.items[0]._props.name).toEqual(entity.name);
    });

    // @todo do we want this capability on this function?
    it.todo("should ignore invalid content");
  });

  describe("GroupsCollection:pushMany", () => {
    it("should throw an exception if the data parameter is not an array.", () => {
      const collection = new TestEntityV2Collection([]);
      expect.assertions(1);
      expect(() => collection.pushMany(42)).toThrow(TypeError);
    });

    it("should accept array of dtos as data parameter", () => {
      const collection = new TestEntityV2Collection([]);
      const entityDto1 = defaultTestEntityDto();
      const entityDto2 = defaultTestEntityDto();
      const entityDto3 = defaultTestEntityDto();

      expect.assertions(10);
      collection.pushMany([entityDto1, entityDto2, entityDto3]);
      expect(collection.items).toHaveLength(3);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entityDto1.id);
      expect(collection.items[0].name).toEqual(entityDto1.name);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entityDto2.id);
      expect(collection.items[1].name).toEqual(entityDto2.name);
      expect(collection.items[2]).toBeInstanceOf(TestEntity);
      expect(collection.items[2].id).toEqual(entityDto3.id);
      expect(collection.items[2].name).toEqual(entityDto3.name);
    });

    it("should accept array of entities as data parameter", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = new TestEntity(defaultTestEntityDto());
      const entity2 = new TestEntity(defaultTestEntityDto());
      const entity3 = new TestEntity(defaultTestEntityDto());

      expect.assertions(10);
      collection.pushMany([entity1, entity2, entity3]);
      expect(collection.items).toHaveLength(3);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entity1.id);
      expect(collection.items[0].name).toEqual(entity1.name);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entity2.id);
      expect(collection.items[1].name).toEqual(entity2.name);
      expect(collection.items[2]).toBeInstanceOf(TestEntity);
      expect(collection.items[2].id).toEqual(entity3.id);
      expect(collection.items[2].name).toEqual(entity3.name);
    });

    it("should throw if the data does not validate the collection entity schema", () => {
      const collection = new TestEntityV2Collection([]);
      const entityDto1 = defaultTestEntityDto();
      const entityDto2 = defaultTestEntityDto({id: 42});

      expect.assertions(2);
      try {
        collection.pushMany([entityDto1, entityDto2]);
      } catch (error) {
        expect(error).toBeInstanceOf(CollectionValidationError);
        expect(error.details?.[1]?.id?.type).toBeTruthy();
      }
    });

    /*
     * The validation process for checking entity associations in the collection is functional. However, the error
     * details provided is not fully detailed. While it identifies the correct data item that fails validation in
     * the collection, it fails to clearly indicate which specific property of the parent entity is problematic.
     * @todo Associated entities validation error details to review when collection will aggregate them.
     */
    it("should throw if the data does not validate the collection entity associated entity schema", () => {
      const collection = new TestEntityV2Collection([]);
      const entityDto1 = defaultTestEntityDto();
      const entityDto2 = defaultTestEntityDto({associated_entity: defaultAssociatedTestEntityDto({id: 42})});

      expect.assertions(3);
      try {
        collection.pushMany([entityDto1, entityDto2]);
      } catch (error) {
        expect(error).toBeInstanceOf(CollectionValidationError);
        // This expect should be falsy.
        expect(error.details?.[1]?.id?.type).toBeTruthy();
        // This expect should be truthy.
        expect(error.details?.[1]?.associated_entity?.id?.type).toBeFalsy();
      }
    });

    it("should throw if the build rules do not validate", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = new TestEntity(defaultTestEntityDto());
      const entity2 = new TestEntity(defaultTestEntityDto({id: entity1.id}));
      const entity3 = new TestEntity(defaultTestEntityDto());

      expect.assertions(2);
      try {
        collection.pushMany([entity1, entity2, entity3]);
      } catch (error) {
        expect(error).toBeInstanceOf(CollectionValidationError);
        expect(error.details?.[1]?.id?.unique).toBeTruthy();
      }
    });

    it("should, with enabling the ignore invalid option, ignore entities not validating their schema", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = defaultTestEntityDto();
      const entity2 = defaultTestEntityDto({id: 42});
      const entity3 = defaultTestEntityDto();

      expect.assertions(5);
      collection.pushMany([entity1, entity2, entity3], {ignoreInvalidEntity: true});
      expect(collection.items).toHaveLength(2);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entity1.id);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entity3.id);
    });

    it("should, with enabling the ignore invalid option, ignore entities not validating the collection build rules", () => {
      const collection = new TestEntityV2Collection([]);
      const entity1 = defaultTestEntityDto();
      const entity2 = defaultTestEntityDto({id: entity1.id});
      const entity3 = defaultTestEntityDto();

      expect.assertions(5);
      collection.pushMany([entity1, entity2, entity3], {ignoreInvalidEntity: true});
      expect(collection.items).toHaveLength(2);
      expect(collection.items[0]).toBeInstanceOf(TestEntity);
      expect(collection.items[0].id).toEqual(entity1.id);
      expect(collection.items[1]).toBeInstanceOf(TestEntity);
      expect(collection.items[1].id).toEqual(entity3.id);
    });
  });
});
