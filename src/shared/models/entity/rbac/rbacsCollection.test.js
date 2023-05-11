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
import RbacsCollection from "./rbacsCollection";
import EntitySchema from "../abstract/entitySchema";
import {defaultRbacData} from "./rbacEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";

describe("Rbacs Collection", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(RbacsCollection.ENTITY_NAME, RbacsCollection.getSchema());
  });

  it("constructor works with collection DTO", () => {
    expect.assertions(4);
    const collectionDto = [defaultRbacData(), defaultRbacData()];
    const collection = new RbacsCollection(collectionDto);
    expect(collection.toDto()).toEqual(collectionDto);
    expect(JSON.stringify(collection)).toEqual(JSON.stringify(collectionDto));
    expect(collection.items[0].id).toEqual(collectionDto[0].id);
    expect(collection.items[1].id).toEqual(collectionDto[1].id);
  });

  it("constructor works with empty collection", () => {
    const collection = new RbacsCollection([]);
    expect(collection.length).toEqual(0);
  });

  it("constructor throw exception if invalid DTO provided", () => {
    expect.assertions(2);
    try {
      const collectionDto = [defaultRbacData(), defaultRbacData({id: 'invalid-data'})];
      new RbacsCollection(collectionDto);
    } catch (error) {
      expect(error).toBeInstanceOf(EntityValidationError);
      expect(error.hasError('id', 'format')).toBeTruthy();
    }
  });
});
