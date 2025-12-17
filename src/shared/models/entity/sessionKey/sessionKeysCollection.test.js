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
 * @since         4.10.1
 */
import EntitySchema from "../abstract/entitySchema";
import SessionKeysCollection from "./sessionKeysCollection";
import { sharedResourcesSessionKeys } from "./sessionKeysCollection.test.data";
import { defaultSessionKeyDto } from "./sessionKeyEntity.test.data";
import { v4 as uuidv4 } from "uuid";

describe("SessionKeysCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeysCollection.name, SessionKeysCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new SessionKeysCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid DTO is provided", () => {
      expect.assertions(3);

      const dtos = sharedResourcesSessionKeys();
      const collection = new SessionKeysCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[1]);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new SessionKeysCollection({})).toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = sharedResourcesSessionKeys();
      dtos[1].foreign_id = dtos[0].foreign_id;

      expect(() => new SessionKeysCollection(dtos)).toThrowCollectionValidationError("1.foreign_id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = sharedResourcesSessionKeys();
      dtos[1].foreign_id = dtos[0].foreign_id;

      const collection = new SessionKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.foreign_id).toEqual(dtos[0].foreign_id);
    });

    // TODO enable it when session key build rule will be added
    it.skip("should throw if one of session key does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dtos = sharedResourcesSessionKeys({
        session_key: "9:901D6ED579AFF935F9F157A5198BCE48B50AD87345DEADBA06F42C5D018C78CC",
      });

      expect(() => new SessionKeysCollection(dtos)).toThrowCollectionValidationError("1.session_key.unique");
    });

    // TODO enable it when session key build rule will be added
    it.skip("should, with enabling the ignore invalid option, ignore items which do not validate session key schema", () => {
      expect.assertions(2);

      const dtos = sharedResourcesSessionKeys({
        session_key: "9:901D6ED579AFF935F9F157A5198BCE48B50AD87345DEADBA06F42C5D018C78CC",
      });

      const collection = new SessionKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
    });
  });

  describe("::filterOutMetadataEncrypted", () => {
    it("should filter out the resource which have metadata key type different than user_key.", async () => {
      expect.assertions(3);

      const foreignId1 = uuidv4();
      const foreignId2 = uuidv4();
      const foreignId3 = uuidv4();
      const dtos = [
        defaultSessionKeyDto({ foreign_id: foreignId1 }),
        defaultSessionKeyDto({ foreign_id: foreignId2 }),
        defaultSessionKeyDto({ foreign_id: foreignId3 }),
      ];
      const collection = new SessionKeysCollection(dtos);

      collection.filterOutSessionKeysNotMatchingForeignModelAndForeignIds("Resource", [foreignId1, foreignId3]);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[2]);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async () => {
      const count = 10_000;
      const dtos = sharedResourcesSessionKeys({}, { count });

      const start = performance.now();
      const collection = new SessionKeysCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });

  describe("::remove", () => {
    it("should remove a given sessionKey.", async () => {
      expect.assertions(3);

      const foreignId1 = uuidv4();
      const foreignId2 = uuidv4();
      const foreignId3 = uuidv4();
      const dtos = [
        defaultSessionKeyDto({ foreign_id: foreignId1 }),
        defaultSessionKeyDto({ foreign_id: foreignId2 }),
        defaultSessionKeyDto({ foreign_id: foreignId3 }),
      ];
      const collection = new SessionKeysCollection(dtos);

      collection.remove(collection._items[1]);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[2]);
    });
  });
});
