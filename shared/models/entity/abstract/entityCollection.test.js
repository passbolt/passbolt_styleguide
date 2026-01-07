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
import EntityCollection from "./entityCollection";
import EntityCollectionError from "./entityCollectionError";
import { TestEntity } from "./entity.test.data";
import EntityValidationError from "./entityValidationError";

describe("EntityCollection", () => {
  describe("EntityCollection::constructor", () => {
    it("constructor and getters works with empty collection", () => {
      const collection = new EntityCollection([]);
      expect.assertions(3);
      expect(collection.length).toBe(0);
      expect(collection.items).toEqual([]);
      expect(collection.items[0]).toEqual(undefined);
    });

    it("clones & stores provided dtos in local _props but do nothing else with it", () => {
      const dtos = [{ name: "first" }, { name: "second" }, { name: "first" }];
      const collection = new EntityCollection(dtos);
      expect.assertions(8);
      expect(collection.length).toBe(0);
      expect(collection.items).toEqual([]);
      expect(collection.items[0]).toEqual(undefined);
      expect(collection._props).toEqual(dtos);
      // Assert the data are cloned
      dtos[0].name = "first altered";
      delete dtos[2];
      expect(collection._props).not.toEqual(dtos);
      expect(collection._props[0].name).toEqual("first");
      expect(dtos[2]).toBeUndefined();
      expect(dtos[0].name).toEqual("first altered");
    });

    it("should work on the reference of the provided dtos, not a copy", () => {
      const dtos = [{ name: "first" }, { name: "second" }, { name: "first" }];
      const collection = new EntityCollection(dtos, { clone: false });
      expect.assertions(9);
      expect(collection.length).toBe(0);
      expect(collection.items).toEqual([]);
      expect(collection.items[0]).toEqual(undefined);
      expect(collection._props).toEqual(dtos);
      // Assert the data are cloned
      dtos[0].name = "first altered";
      delete dtos[2];
      expect(collection._props).toEqual(dtos);
      expect(collection._props.length).toEqual(3); // the array size didn't change
      expect(collection._props[0].name).toEqual("first altered");
      expect(collection._props[1].name).toEqual("second");
      expect(collection._props[2]).toBeUndefined();
    });
  });

  describe("EntityCollection::push", () => {
    it("should push items to the collection", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));

      expect.assertions(4);
      expect(collection.items.length).toBe(3);
      expect(collection.items[0].name).toEqual("first");
      expect(collection.items[1].name).toEqual("second");
      expect(collection.items[2].name).toEqual("first");
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
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));

      expect(collection.items.length).toBe(3);
      const expectedDtos = [{ name: "first" }, { name: "second" }, { name: "first" }];

      expect.assertions(2);
      expect(collection.toDto()).toEqual(expectedDtos);
    });
  });

  describe("EntityCollection::getFirst", () => {
    it("should get the first item which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));

      expect.assertions(3);
      expect(collection.getFirst("name", "first").toDto()).toEqual({ name: "first" });
      expect(collection.getFirst("name", "second").toDto()).toEqual({ name: "second" });
      expect(collection.getFirst("name", "third")).toBe(undefined);
    });
  });

  describe("EntityCollection::getAll", () => {
    it("should get all the items which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));

      expect.assertions(7);
      const firstCollection = collection.getAll("name", "first");
      expect(firstCollection.length).toBe(2);
      expect(firstCollection[0].toDto()).toEqual({ name: "first" });
      expect(firstCollection[1].toDto()).toEqual({ name: "first" });
      expect(collection.getFirst("name", "second").toDto()).toEqual({ name: "second" });
      const secondCollection = collection.getAll("name", "second");
      expect(secondCollection.length).toBe(1);
      expect(secondCollection[0].toDto()).toEqual({ name: "second" });
      const thirdCollection = collection.getAll("name", "third");
      expect(thirdCollection.length).toBe(0);
    });
  });

  describe("EntityCollection::extract", () => {
    it("should extract the property values of all the collection items.", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(3);
      const result = collection.extract("name");
      expect(result).toHaveLength(4);
      expect(result).toEqual(["first", "second", "first", null]);

      const resultUndefinedProps = collection.extract("notExisting");
      expect(resultUndefinedProps).toHaveLength(0);
    });

    it("should throw an exception if the propName parameter is not a string.", () => {
      const collection = new EntityCollection();
      expect.assertions(1);
      expect(() => collection.extract(42)).toThrow(TypeError);
    });
  });

  describe("EntityCollection::items::iterator", () => {
    it("should get all the items which the given property is matching the given value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));

      expect.assertions(2);
      let i = 0;
      for (const item of collection) {
        if (i === 0) {
          expect(item.name).toEqual("first");
        } else if (i === 1) {
          expect(item.name).toEqual("second");
        } else {
          expect(true).toBeFalsy();
        }
        i++;
      }
    });
  });

  describe("EntityCollection::filterByPropertyValueIn", () => {
    it("should filter all items having the given property matching one of the value of the provided needles array.", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(5);
      collection.filterByPropertyValueIn("name", ["first", "second", null]);
      expect(collection).toHaveLength(4);
      collection.filterByPropertyValueIn("name", ["first", "second"]);
      expect(collection).toHaveLength(3);
      collection.filterByPropertyValueIn("name", ["first"]);
      expect(collection).toHaveLength(2);
      collection.filterByPropertyValueIn("name", ["second"]);
      expect(collection).toHaveLength(0);
      collection.filterByPropertyValueIn("name", [null]);
      expect(collection).toHaveLength(0);
    });

    it("should keep items not having the property defined if requested by option.", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(5);
      collection.filterByPropertyValueIn("name", ["first", "second", null], false);
      expect(collection).toHaveLength(5);
      collection.filterByPropertyValueIn("name", ["first", "second"], false);
      expect(collection).toHaveLength(4);
      collection.filterByPropertyValueIn("name", ["first"], false);
      expect(collection).toHaveLength(3);
      collection.filterByPropertyValueIn("name", ["second"], false);
      expect(collection).toHaveLength(1);
      collection.filterByPropertyValueIn("name", [null], false);
      expect(collection).toHaveLength(1);
    });

    it("should throw an exception if the propName parameter is not a string.", () => {
      const collection = new EntityCollection();
      expect.assertions(1);
      expect(() => collection.filterByPropertyValueIn(42)).toThrow(TypeError);
    });
  });

  describe("EntityCollection::filterByCallback", () => {
    it("should filter out all items the callback function will return false for.", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      collection.filterByCallback(() => false);
      expect(collection).toHaveLength(0);
    });

    it("should filter in all items the callback function will return false for.", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      collection.filterByCallback(() => true);
      expect(collection).toHaveLength(5);
    });

    it("should throw an exception if the callback parameter is not a function.", () => {
      const collection = new EntityCollection();
      expect.assertions(1);
      expect(() => collection.filterByCallback(42)).toThrow(TypeError);
    });
  });

  describe("EntityCollection::assertUniqueByProperty", () => {
    it("should not throw if no duplicate found", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "third" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      expect(() => collection.assertUniqueByProperty("name")).not.toThrow();
    });

    it("should not throw if duplicates found on undefined value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({}));

      expect.assertions(1);
      expect(() => collection.assertUniqueByProperty("name")).not.toThrow();
    });

    it("should throw if duplicates found", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "first" }));

      expect.assertions(1);
      expect(() => collection.assertUniqueByProperty("name")).toThrow(EntityCollectionError);
    });

    it("should throw the index and rule id", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "third" }));
      collection.push(new TestEntity({ name: "second" }));

      expect.assertions(2);
      try {
        collection.assertUniqueByProperty("name");
      } catch (error) {
        expect(error.position).toEqual(3);
        expect(error.rule).toEqual("unique_name");
      }
    });

    it("should throw if duplicates found on null value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: null }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      expect(() => collection.assertUniqueByProperty("name")).toThrow(EntityCollectionError);
    });
  });

  describe("EntityCollection::assertNotExist", () => {
    it("should not throw if no item exists for the given property and value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "third" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      expect(() => collection.assertNotExist("name", "zero")).not.toThrow();
    });

    it("should not throw if the given property value is not defined", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "third" }));
      collection.push(new TestEntity({}));
      collection.push(new TestEntity({ name: null }));

      expect.assertions(1);
      expect(() => collection.assertNotExist("name", undefined)).not.toThrow();
    });

    it("should throw if an item exists for the given property and value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));

      expect.assertions(2);
      try {
        collection.assertNotExist("name", "second");
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error?.details?.name?.unique).toBeTruthy();
      }
    });

    it("should not throw if an item exists for the same property but another value", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "second" }));

      expect.assertions(1);
      expect(() => collection.assertNotExist("name", "zero")).not.toThrow();
    });

    it("should use a given haystack if given", () => {
      const collection = new EntityCollection();
      collection.push(new TestEntity({ name: "first" }));
      collection.push(new TestEntity({ name: "second" }));
      collection.push(new TestEntity({ name: "second" }));

      expect.assertions(2);
      expect(() => collection.assertNotExist("name", "first", { haystackSet: new Set() })).not.toThrow();
      expect(() =>
        collection.assertNotExist("name", "first", { haystackSet: new Set(collection.extract("name")) }),
      ).toThrow();
    });
  });
});
