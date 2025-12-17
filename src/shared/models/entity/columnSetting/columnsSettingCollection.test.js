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
 * @since         4.1.0
 */
import EntitySchema from "../abstract/entitySchema";
import ColumnsSettingCollection from "./columnsSettingCollection";
import { defaultColumnSettingData } from "./columnSettingEntity.test.data";
import EntityCollectionError from "../abstract/entityCollectionError";

describe("ColumnsSetting Collection", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(ColumnsSettingCollection.ENTITY_NAME, ColumnsSettingCollection.getSchema());
  });

  it("constructor works with collection DTO", () => {
    expect.assertions(4);
    const collectionDto = [defaultColumnSettingData(), defaultColumnSettingData({ id: "idB" })];
    const collection = new ColumnsSettingCollection(collectionDto);
    expect(collection.toDto()).toEqual(collectionDto);
    expect(JSON.stringify(collection)).toEqual(JSON.stringify(collectionDto));
    expect(collection.items[0].id).toEqual(collectionDto[0].id);
    expect(collection.items[1].id).toEqual(collectionDto[1].id);
  });

  it("constructor works with empty collection", () => {
    const collection = new ColumnsSettingCollection([]);
    expect(collection.length).toEqual(0);
  });

  it("constructor throw exception if invalid DTO provided", () => {
    expect.assertions(2);
    try {
      const collectionDto = [defaultColumnSettingData(), defaultColumnSettingData()];
      new ColumnsSettingCollection(collectionDto);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityCollectionError);
      expect(error.rule).toEqual("unique_id");
    }
  });

  describe("ColumnsSetting:removeById", () => {
    it("should remove a column by its identifier", () => {
      expect.assertions(2);
      const collectionDto = [defaultColumnSettingData(), defaultColumnSettingData({ id: "idB" })];
      const collection = new ColumnsSettingCollection(collectionDto);
      collection.removeById("id");
      expect(collection.length).toEqual(1);
      expect(collection.items[0].id).toEqual("idB");
    });
  });

  describe("ColumnsSetting:deepMerge", () => {
    it("should merge and add unique column", () => {
      expect.assertions(2);
      const collectionDtoDefault = [defaultColumnSettingData(), defaultColumnSettingData({ id: "idB" })];
      const collectionDto = [defaultColumnSettingData({ label: "labelD" }), defaultColumnSettingData({ id: "idC" })];
      const collection = new ColumnsSettingCollection(collectionDtoDefault);
      const collectionResult = collection.deepMerge(new ColumnsSettingCollection(collectionDto));
      collection.removeById("id");
      expect(collectionResult.length).toEqual(3);
      expect(collectionResult.items[0].label).toEqual("labelD");
    });

    it("should merge and ignore unique column", () => {
      expect.assertions(2);
      const collectionDtoDefault = [defaultColumnSettingData(), defaultColumnSettingData({ id: "idB" })];
      const collectionDto = [defaultColumnSettingData({ label: "labelD" }), defaultColumnSettingData({ id: "idC" })];
      const collection = new ColumnsSettingCollection(collectionDtoDefault);
      const collectionResult = collection.deepMerge(new ColumnsSettingCollection(collectionDto), {
        keepUnknownValue: false,
      });
      collection.removeById("id");
      expect(collectionResult.length).toEqual(2);
      expect(collectionResult.items[0].label).toEqual("labelD");
    });
  });
});
