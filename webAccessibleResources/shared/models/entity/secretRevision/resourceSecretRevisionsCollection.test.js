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
 * @since         5.7.0
 */
import EntitySchema from "../abstract/entitySchema";
import ResourceSecretRevisionsCollection from "./resourceSecretRevisionsCollection";
import {defaultResourceSecretRevisionsDtos} from "./resourceSecretRevisionsCollection.test.data";
import {v4 as uuidv4} from "uuid";
import {defaultSecretRevisionDto} from "./secretRevisionEntity.test.data";
import SecretRevisionEntity from "./secretRevisionEntity";
import {defaultSecretDataV5DefaultDto} from "../secretData/secretDataV5DefaultEntity.test.data";
import SecretDataV5DefaultEntity from "../secretData/secretDataV5DefaultEntity";

describe("ResourceSecretRevisionsCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceSecretRevisionsCollection.name, ResourceSecretRevisionsCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new ResourceSecretRevisionsCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if minimal DTO is provided", () => {
      expect.assertions(3);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2});
      const collection = new ResourceSecretRevisionsCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
      expect(collection.items[1].toDto()).toEqual(dtos[1]);
    });

    it("works if valid DTO is provided", () => {
      expect.assertions(3);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2, withCreator: true, withSecrets: true});
      const collection = new ResourceSecretRevisionsCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0].toDto(SecretRevisionEntity.ALL_CONTAIN_OPTIONS)).toEqual(dtos[0]);
      expect(collection.items[1].toDto(SecretRevisionEntity.ALL_CONTAIN_OPTIONS)).toEqual(dtos[1]);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new ResourceSecretRevisionsCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2});
      dtos[1].id = dtos[0].id;

      expect(() => new ResourceSecretRevisionsCollection(dtos))
        .toThrowCollectionValidationError("1.id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2});
      dtos[1].id = dtos[0].id;

      const collection = new ResourceSecretRevisionsCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of resource_id does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2});
      dtos[1].resource_id = uuidv4();

      expect(() => new ResourceSecretRevisionsCollection(dtos))
        .toThrowCollectionValidationError("1.resource_id.different_resource_id");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate user id schema", () => {
      expect.assertions(2);

      const dtos = defaultResourceSecretRevisionsDtos({}, {count: 2});
      dtos[1].resource_id = uuidv4();

      const collection = new ResourceSecretRevisionsCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0].toDto()).toEqual(dtos[0]);
    });
  });

  describe("::sortByMostRecent", () => {
    it("should sort by most recent by modified if property is defined", async() => {
      const resource_id = uuidv4();
      const recentSecretRevisionRecent = defaultSecretRevisionDto({resource_id: resource_id, modified: "2025-10-11T08:09:00+00:00"});
      const oldSecretRevision = defaultSecretRevisionDto({resource_id: resource_id});
      const dtos =  [oldSecretRevision, recentSecretRevisionRecent];
      const collection = new ResourceSecretRevisionsCollection(dtos);
      collection.sortByModified();
      expect(collection.toDto(SecretRevisionEntity.ALL_CONTAIN_OPTIONS)).toEqual([recentSecretRevisionRecent, oldSecretRevision]);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      const count = 10_000;
      const dtos = defaultResourceSecretRevisionsDtos({}, {count, withCreator: true, withSecrets: true});

      const start = performance.now();
      const collection = new ResourceSecretRevisionsCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });

  describe("::filterOutItemsHavingSecretDataEncrypted", () => {
    it("should filter out all secret revision that still has an encrypted secret.", async() => {
      expect.assertions(5);

      const resource_id = uuidv4();
      const dtos = defaultResourceSecretRevisionsDtos({resource_id}, {count: 4, withSecrets: true});

      const collection = new ResourceSecretRevisionsCollection(dtos);
      collection.items[0].secrets.items[0].data = new SecretDataV5DefaultEntity(defaultSecretDataV5DefaultDto());
      collection.items[2].secrets.items[0].data = new SecretDataV5DefaultEntity(defaultSecretDataV5DefaultDto());

      collection.filterOutItemsHavingSecretDataEncrypted();

      expect(collection).toHaveLength(2);
      expect(collection.items[0].secrets.hasSecretsDataEncrypted()).toStrictEqual(false);
      expect(collection.items[0].secrets.hasSecretsDataDecrypted()).toStrictEqual(true);
      expect(collection.items[1].secrets.hasSecretsDataEncrypted()).toStrictEqual(false);
      expect(collection.items[1].secrets.hasSecretsDataDecrypted()).toStrictEqual(true);
    });
  });
});
