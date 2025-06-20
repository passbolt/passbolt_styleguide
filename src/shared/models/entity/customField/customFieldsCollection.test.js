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
 * @since         5.3.0
 */
import EntitySchema from "../abstract/entitySchema";
import {defaultCustomField, emptyCustomFieldDto} from "./customFieldEntity.test.data";
import CustomFieldEntity from "./customFieldEntity";
import CustomFieldsCollection from "./customFieldsCollection";
import {customFieldsCollectionDtos, defaultCustomFieldsCollection} from "./customFieldsCollection.test.data";
import {v4 as uuidv4} from "uuid";

describe("CustomFieldsCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(CustomFieldsCollection.name, CustomFieldsCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTO is provided", () => {
      expect.assertions(7);

      const dtos = defaultCustomFieldsCollection();
      const collection = new CustomFieldsCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
      expect(collection.items[0]._props.metadata_key).toEqual(dtos[0].metadata_key);
      expect(collection.items[0]._props.secret_value).toEqual(dtos[0].secret_value);
      expect(collection.items[1]._props.id).toEqual(dtos[1].id);
      expect(collection.items[1]._props.metadata_key).toEqual(dtos[1].metadata_key);
      expect(collection.items[1]._props.secret_value).toEqual(dtos[1].secret_value);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new CustomFieldsCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      expect.assertions(2);

      const dtos = defaultCustomFieldsCollection();
      delete dtos[0].id;

      const collection = new CustomFieldsCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[1].id);
    });

    it("should throw if one there are too many elements in the collection", () => {
      expect.assertions(1);

      const maxItems = CustomFieldsCollection.getSchema().maxItems;
      const collectionDto = customFieldsCollectionDtos(maxItems + 1);

      expect(() => new CustomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("maxItems");
    });

    it("should not throw if the content total size reach the exact maximum allowed", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(10, data);

      expect(() => new CustomFieldsCollection(collectionDto)).not.toThrowError();
    });

    it("should throw if the content total size exceed the maximum allowed: with strings", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(11, data);

      expect(() => new CustomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("10.items.maxContentSize");
    });

    it("should throw if the content total size exceed the maximum allowed: with a number", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(10, data);
      const extraCustomField = defaultCustomField({
        type: "number",
        secret_value: 42
      });
      collectionDto.push(extraCustomField);

      expect(() => new CustomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("10.items.maxContentSize");
    });

    it("should throw if the content total size exceed the maximum allowed: with a boolean (true)", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(10, data);
      const extraCustomField = defaultCustomField({
        type: "boolean",
        secret_value: true,
      });
      collectionDto.push(extraCustomField);

      expect(() => new CustomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("10.items.maxContentSize");
    });

    it("should throw if the content total size exceed the maximum allowed: with a boolean (false)", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(10, data);
      const extraCustomField = defaultCustomField({
        type: "boolean",
        secret_value: false
      });
      collectionDto.push(extraCustomField);

      expect(() => new CustomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("10.items.maxContentSize");
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      const count = CustomFieldsCollection.getSchema().maxItems;
      const dtos = customFieldsCollectionDtos(count);

      const start = performance.now();
      const collection = new CustomFieldsCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(5);
    });
  });

  describe("::currentSize", () => {
    it("should return the size of the collection values", async() => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(1_000)};
      const collectionDto = customFieldsCollectionDtos(10, data);
      const customFieldsCollection = new CustomFieldsCollection(collectionDto);

      expect(customFieldsCollection.currentSize).toStrictEqual(10_000);
    });

    it("should return 0 if all element in the collection is empty", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
      ]);

      expect(collection.currentSize).toStrictEqual(0);
    });
  });

  describe("::isEmpty", () => {
    it("should return true if the collection is empty", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([]);

      expect(collection.isEmpty()).toStrictEqual(true);
    });

    it("should return true if the collection is full of empty key/value", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
      ]);

      expect(collection.isEmpty()).toStrictEqual(true);
    });

    it("should return false if at least 1 element in the collection is not empty", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        emptyCustomFieldDto(),
        defaultCustomField(),
      ]);

      expect(collection.isEmpty()).toStrictEqual(false);
    });

    it("should return false if all element are not empty", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection([
        defaultCustomField(),
      ]);

      expect(collection.isEmpty()).toStrictEqual(false);
    });
  });

  describe("::areCollectionsDifferent", () => {
    it("should throw an error if the parameters are not of the right type.", async() => {
      expect.assertions(2);

      const collection = new CustomFieldsCollection(defaultCustomFieldsCollection());

      expect(() => CustomFieldsCollection.areCollectionsDifferent(null, collection)).toThrowError();
      expect(() => CustomFieldsCollection.areCollectionsDifferent(collection, null)).toThrowError();
    });

    it("should return false if both collection are identical.", async() => {
      expect.assertions(1);

      const collection = new CustomFieldsCollection(defaultCustomFieldsCollection());
      expect(CustomFieldsCollection.areCollectionsDifferent(collection, collection)).toStrictEqual(false);
    });

    it("should return true if collections have different size.", async() => {
      expect.assertions(1);

      const dtoA = defaultCustomFieldsCollection();
      const dtoB = [...dtoA];
      dtoB.push(new CustomFieldEntity(defaultCustomField()));

      const collectionA = new CustomFieldsCollection(dtoA);
      const collectionB = new CustomFieldsCollection(dtoB);
      expect(CustomFieldsCollection.areCollectionsDifferent(collectionA, collectionB)).toStrictEqual(true);
    });

    it("should return true if collections have different items.", async() => {
      expect.assertions(1);

      const dtoA = defaultCustomFieldsCollection();
      const dtoB = [...dtoA];
      dtoB[1] = {...dtoA[1], id: uuidv4()};

      const collectionA = new CustomFieldsCollection(dtoA);
      const collectionB = new CustomFieldsCollection(dtoB);
      expect(CustomFieldsCollection.areCollectionsDifferent(collectionA, collectionB)).toStrictEqual(true);
    });
  });
});
