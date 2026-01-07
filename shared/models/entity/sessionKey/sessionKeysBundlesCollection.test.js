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
import { defaultSessionKeysBundlesDtos } from "./sessionKeysBundlesCollection.test.data";
import { v4 as uuidv4 } from "uuid";
import { decryptedSessionKeysBundleDto, defaultSessionKeysBundleDto } from "./sessionKeysBundleEntity.test.data";

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

      const dtos = defaultSessionKeysBundlesDtos({}, { count: 2 });
      const collection = new SessionKeysBundlesCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[1]);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new SessionKeysBundlesCollection({})).toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = defaultSessionKeysBundlesDtos({}, { count: 2 });
      dtos[1].id = dtos[0].id;

      expect(() => new SessionKeysBundlesCollection(dtos)).toThrowCollectionValidationError("1.id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = defaultSessionKeysBundlesDtos({}, { count: 2 });
      dtos[1].id = dtos[0].id;

      const collection = new SessionKeysBundlesCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of user_id does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dtos = defaultSessionKeysBundlesDtos({}, { count: 2 });
      dtos[1].user_id = uuidv4();

      expect(() => new SessionKeysBundlesCollection(dtos)).toThrowCollectionValidationError(
        "1.user_id.different_user_id",
      );
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate user id schema", () => {
      expect.assertions(2);

      const dtos = defaultSessionKeysBundlesDtos({}, { count: 2 });
      dtos[1].id = dtos[0].id;

      const collection = new SessionKeysBundlesCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
    });
  });

  describe("::hasSomeDecryptedSessionKeysBundles", () => {
    it("should have some decrypted session keys bundles", async () => {
      const user_id = uuidv4();
      const dtos = defaultSessionKeysBundlesDtos({ user_id });
      // Add a decrypted session keys bundle dto
      dtos.push(decryptedSessionKeysBundleDto({ user_id }));
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeDecryptedSessionKeysBundles()).toBeTruthy();
    });

    it("should not have some decrypted session keys bundles", async () => {
      const dtos = defaultSessionKeysBundlesDtos();
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeDecryptedSessionKeysBundles()).toBeFalsy();
    });
  });

  describe("::hasSomeEncryptedSessionKeysBundles", () => {
    it("should have some encrypted session keys bundles", async () => {
      const dtos = [];
      // Add a decrypted session keys bundle dto
      dtos.push(decryptedSessionKeysBundleDto());
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeEncryptedSessionKeysBundles()).toBeFalsy();
    });

    it("should not have some encrypted session keys bundles", async () => {
      const dtos = defaultSessionKeysBundlesDtos();
      const collection = new SessionKeysBundlesCollection(dtos);
      expect(collection.hasSomeEncryptedSessionKeysBundles()).toBeTruthy();
    });
  });

  describe("::sortByMostRecent", () => {
    it("should sort by most recent by modified if property is defined", async () => {
      const user_id = uuidv4();
      const recentSessionKeysBundleRecent = defaultSessionKeysBundleDto({
        user_id: user_id,
        modified: "2024-10-11T08:09:00+00:00",
      });
      const oldSessionKeysBundle = defaultSessionKeysBundleDto({ user_id });
      const dtos = [oldSessionKeysBundle, recentSessionKeysBundleRecent];
      const collection = new SessionKeysBundlesCollection(dtos);
      collection.sortByModified();
      expect(collection.toDto()).toEqual([recentSessionKeysBundleRecent, oldSessionKeysBundle]);
    });

    it("should sort by most recent by modified and let at the last position if property is not defined", async () => {
      const user_id = uuidv4();
      const noModifiedSessionKeysBundleRecent = defaultSessionKeysBundleDto({ user_id: user_id, modified: undefined });
      const sessionKeysBundle = defaultSessionKeysBundleDto({ user_id });
      const dtos = [sessionKeysBundle, noModifiedSessionKeysBundleRecent];
      const collection = new SessionKeysBundlesCollection(dtos);
      collection.sortByModified();
      expect(collection.toDto()).toEqual([sessionKeysBundle, noModifiedSessionKeysBundleRecent]);
    });

    it("should sort by most recent by modified and put the first one at the last position cause modified property is not defined", async () => {
      const user_id = uuidv4();
      const recentSessionKeysBundleRecent = defaultSessionKeysBundleDto({ user_id: user_id });
      const oldSessionKeysBundle = defaultSessionKeysBundleDto({ user_id: user_id, modified: undefined });
      const dtos = [oldSessionKeysBundle, recentSessionKeysBundleRecent];
      const collection = new SessionKeysBundlesCollection(dtos);
      collection.sortByModified();
      expect(collection.toDto()).toEqual([recentSessionKeysBundleRecent, oldSessionKeysBundle]);
    });
  });

  describe("::getByLatestModified", () => {
    it("returns nothing if the collection is empty", async () => {
      const collection = new SessionKeysBundlesCollection();
      expect(collection.getByLatestModified()).toBeUndefined();
    });

    it("returns the only entity contained in the collection", async () => {
      const sessionKeysBundleDto = defaultSessionKeysBundleDto();
      const collection = new SessionKeysBundlesCollection([sessionKeysBundleDto]);
      const entity = collection.getByLatestModified();
      expect(entity.toDto()).toEqual(sessionKeysBundleDto);
    });

    it("returns the only entity contained in the collection, even if the modified property is not defined", async () => {
      const sessionKeysBundleDto = defaultSessionKeysBundleDto({ modified: undefined });
      const collection = new SessionKeysBundlesCollection([sessionKeysBundleDto]);
      const entity = collection.getByLatestModified();
      expect(entity.toDto()).toEqual(sessionKeysBundleDto);
    });

    it("returns the entity with the most recent modified date", async () => {
      const userId = uuidv4();
      const sessionKeysBundleDto1 = defaultSessionKeysBundleDto({
        user_id: userId,
        modified: "2023-11-17T18:55:00+00:00",
      });
      const sessionKeysBundleDto2 = defaultSessionKeysBundleDto({
        user_id: userId,
        modified: "2024-11-17T18:56:00+00:00",
      });
      const sessionKeysBundleDto3 = defaultSessionKeysBundleDto({
        user_id: userId,
        modified: "2024-11-17T18:53:00+00:00",
      });
      const sessionKeysBundleDto4 = defaultSessionKeysBundleDto({ user_id: userId, modified: undefined });
      const collection = new SessionKeysBundlesCollection([
        sessionKeysBundleDto1,
        sessionKeysBundleDto2,
        sessionKeysBundleDto3,
        sessionKeysBundleDto4,
      ]);
      const entity = collection.getByLatestModified();
      expect(entity.toDto()).toEqual(sessionKeysBundleDto2);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async () => {
      const count = 10_000;
      const dtos = defaultSessionKeysBundlesDtos({}, { count });

      const start = performance.now();
      const collection = new SessionKeysBundlesCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });
});
