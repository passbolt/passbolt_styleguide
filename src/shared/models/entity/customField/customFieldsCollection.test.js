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
import CutsomFieldsCollection from "./customFieldsCollection";
import {customFieldsCollectionDtos, defaultCustomFieldsCollection} from "./customFieldsCollection.test.data";

describe("CustomFieldsCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(CutsomFieldsCollection.name, CutsomFieldsCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new CutsomFieldsCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTO is provided", () => {
      expect.assertions(7);

      const dtos = defaultCustomFieldsCollection();
      const collection = new CutsomFieldsCollection(dtos);

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

      expect(() => new CutsomFieldsCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      expect.assertions(2);

      const dtos = defaultCustomFieldsCollection();
      delete dtos[0].id;

      const collection = new CutsomFieldsCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[1].id);
    });

    it("should throw if one there are too many elements in the collection", () => {
      expect.assertions(1);

      const maxItems = CutsomFieldsCollection.getSchema().maxItems;
      const collectionDto = customFieldsCollectionDtos(maxItems + 1);

      expect(() => new CutsomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("maxItems");
    });

    it("should throw if the content total size exceed the maximum allowed: with many elements", () => {
      expect.assertions(1);

      const data = {secret_value: "a".repeat(5_000)};
      const collectionDto = customFieldsCollectionDtos(11, data);

      expect(() => new CutsomFieldsCollection(collectionDto))
        .toThrowCollectionValidationError("10.items.maxContentSize");
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      const count = CutsomFieldsCollection.getSchema().maxItems;
      const dtos = customFieldsCollectionDtos(count);

      const start = performance.now();
      const collection = new CutsomFieldsCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(5);
    });
  });
});
