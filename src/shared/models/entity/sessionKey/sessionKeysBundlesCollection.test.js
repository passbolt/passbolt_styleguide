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
import SessionKeysBundlesCollection from "./sessionKeysBundlesCollection";
import {defaultSessionKeysBundlesDtos} from "./sessionKeysBundlesCollection.test.data";
import {v4 as uuidv4} from "uuid";
import {decryptedSessionKeysBundleDto} from "./sessionKeysBundleEntity.test.data";

describe("SessionKeysBundlesCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeysBundlesCollection.name, SessionKeysBundlesCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new SessionKeysBundlesCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid DTO is provided", () => {
      expect.assertions(3);

      const dtos = defaultSessionKeysBundlesDtos({}, {count: 2});
      const collection = new SessionKeysBundlesCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[1]);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new SessionKeysBundlesCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = defaultSessionKeysBundlesDtos({}, {count: 2});
      dtos[1].id = dtos[0].id;

      expect(() => new SessionKeysBundlesCollection(dtos))
        .toThrowCollectionValidationError("1.id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = defaultSessionKeysBundlesDtos({}, {count: 2});
      dtos[1].id = dtos[0].id;

      const collection = new SessionKeysBundlesCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of user_id does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dtos = defaultSessionKeysBundlesDtos({user_id: uuidv4()}, {count: 2});

      expect(() => new SessionKeysBundlesCollection(dtos))
        .toThrowCollectionValidationError("1.user_id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate user id schema", () => {
      expect.assertions(2);

      const dtos = defaultSessionKeysBundlesDtos({user_id: uuidv4()}, {count: 2});

      const collection = new SessionKeysBundlesCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
    });
  });

  describe("::hasSomeDecryptedSessionKeysBundles", () => {
    it("should have some decrypted session keys bundles", async() => {
      const dtos = defaultSessionKeysBundlesDtos();
      // Add a decrypted session keys bundle dto
      dtos.push(decryptedSessionKeysBundleDto());
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeDecryptedSessionKeysBundles()).toBeTruthy();
    });

    it("should not have some decrypted session keys bundles", async() => {
      const dtos = defaultSessionKeysBundlesDtos();
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeDecryptedSessionKeysBundles()).toBeFalsy();
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      /*
       * Force 1000 for test
       * TODO Improve performance for 10_000 is very slow (build rules takes time to verify duplicate uuid)
       */
      const count = 1_000;
      const dtos = defaultSessionKeysBundlesDtos({}, {count});

      const start = performance.now();
      const collection = new SessionKeysBundlesCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });
});
