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
 * @since         2.13.0
 */
import Entity from "./entity";
import EntityCollection from "./entityCollection";
import EntitySchema from "./entitySchema";

/*
 * ===========================================
 *  Fixture classes
 * ===========================================
 */

class TestEntity extends Entity {
  constructor(dto) {
    super(EntitySchema.validate('TestEntity', dto, TestEntity.getSchema()));
  }
  get name() {
    return this._props.name;
  }
  static getSchema() {
    return {
      "type": "object",
      "required": ['name'],
      "properties": {
        "name": {
          "type": "string",
        }
      }
    };
  }
}

/* eslint-disable no-unused-vars */
class TestEntityCollection extends Entity {
  constructor(dto) {
    super(EntitySchema.validate('TestEntityCollection', dto, TestEntityCollection.getSchema()));
  }
  static getSchema() {
    return {
      "type": "array",
      "items": TestEntity.getSchema(),
    };
  }
}
/* eslint-enable no-unused-vars */

/*
 * ===========================================
 *  Tests
 * ===========================================
 */

describe("EntityCollection", () => {
  describe("EntityCollection::constructor", () => {
    it("constructor and getters works with empty collection", () => {
      const collection = new EntityCollection([]);
      expect.assertions(3);
      expect(collection.length).toBe(0);
      expect(collection.items).toEqual([]);
      expect(collection.items[0]).toEqual(undefined);
    });
  });

  describe("EntityCollection::push", () => {
    it("should push items to the collection", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({name: 'first'}));
      collection.push(new TestEntity({name: 'second'}));
      collection.push(new TestEntity({name: 'first'}));

      expect.assertions(4);
      expect(collection.items.length).toBe(3);
      expect(collection.items[0].name).toEqual('first');
      expect(collection.items[1].name).toEqual('second');
      expect(collection.items[2].name).toEqual('first');
    });

    it("should allow to push undefined item to the collection", () => {
      const collection = new EntityCollection();
      collection.push();
      expect.assertions(2);
      expect(collection.items.length).toBe(1);
      expect(collection.items[0]).toBeUndefined();
    });
  });

  describe("EntityCollection::toDto", () => {
    it("should return collection dto", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({name: 'first'}));
      collection.push(new TestEntity({name: 'second'}));
      collection.push(new TestEntity({name: 'first'}));

      expect(collection.items.length).toBe(3);
      const expectedDtos = [{name: 'first'}, {name: 'second'}, {name: 'first'}];

      expect.assertions(2);
      expect(collection.toDto()).toEqual(expectedDtos);
    });
  });

  describe("EntityCollection::getFirst", () => {
    it("should get the first item which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({name: 'first'}));
      collection.push(new TestEntity({name: 'second'}));
      collection.push(new TestEntity({name: 'first'}));

      expect.assertions(3);
      expect(collection.getFirst('name', 'first').toDto()).toEqual({name: 'first'});
      expect(collection.getFirst('name', 'second').toDto()).toEqual({name: 'second'});
      expect(collection.getFirst('name', 'third')).toBe(undefined);
    });
  });

  describe("EntityCollection::getAll", () => {
    it("should get all the items which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({name: 'first'}));
      collection.push(new TestEntity({name: 'second'}));
      collection.push(new TestEntity({name: 'first'}));

      expect.assertions(7);
      const firstCollection = collection.getAll('name', 'first');
      expect(firstCollection.length).toBe(2);
      expect(firstCollection[0].toDto()).toEqual({name: 'first'});
      expect(firstCollection[1].toDto()).toEqual({name: 'first'});
      expect(collection.getFirst('name', 'second').toDto()).toEqual({name: 'second'});
      const secondCollection = collection.getAll('name', 'second');
      expect(secondCollection.length).toBe(1);
      expect(secondCollection[0].toDto()).toEqual({name: 'second'});
      const thirdCollection = collection.getAll('name', 'third');
      expect(thirdCollection.length).toBe(0);
    });
  });

  describe("EntityCollection::items::iterator", () => {
    it("should get all the items which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({name: 'first'}));
      collection.push(new TestEntity({name: 'second'}));

      expect.assertions(2);
      let i = 0;
      for (const item of collection) {
        if (i === 0) {
          expect(item.name).toEqual('first');
        } else if (i === 1) {
          expect(item.name).toEqual('second');
        } else {
          expect(true).toBeFalsy();
        }
        i++;
      }
    });
  });
});
