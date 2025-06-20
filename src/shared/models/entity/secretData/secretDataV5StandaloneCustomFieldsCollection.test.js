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
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import SecretDataV5StandaloneCustomFieldsCollection from "./secretDataV5StandaloneCustomFieldsCollection";
import {defaultCustomFieldsCollection} from "../customField/customFieldsCollection.test.data";
import {defaultSecretDataV5StandaloneCustomFieldsCollectionDtos, minimalSecretDataV5StandaloneCustomFieldsCollectionDtos} from "./secretDataV5StandaloneCustomFieldsCollection.test.data";
import {defaultCustomField} from "../customField/customFieldEntity.test.data";
import {v4 as uuidv4} from "uuid";
import CustomFieldEntity from "../customField/customFieldEntity";

describe("SecretDataV5StandaloneCustomFieldsCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5StandaloneCustomFieldsCollection.name, SecretDataV5StandaloneCustomFieldsCollection.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.enumeration(SecretDataV5StandaloneCustomFieldsCollection, "object_type", [SECRET_DATA_OBJECT_TYPE], ["any other values"]);
    });

    it("validates custom_fields property", () => {
      const dto = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const successScenarios = [
        {scenario: "valid custom fields", value: defaultCustomFieldsCollection()},
      ];
      const failScenarios = [
        {scenario: "invalid header type: integer", value: 42},
      ];
      assertEntityProperty.required(SecretDataV5StandaloneCustomFieldsCollection, "custom_fields");
      assertEntityProperty.assertAssociation(SecretDataV5StandaloneCustomFieldsCollection, "custom_fields", dto, successScenarios, failScenarios);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(2);
      const dto = minimalSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const entity = new SecretDataV5StandaloneCustomFieldsCollection(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity._customFields).toHaveLength(0);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(6);

      const dto = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const entity = new SecretDataV5StandaloneCustomFieldsCollection(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity._customFields).toHaveLength(2);
      expect(entity._customFields._items[0]._props.metadata_key).toStrictEqual("Key 0");
      expect(entity._customFields._items[0].value).toStrictEqual("Value 0");
      expect(entity._customFields._items[1]._props.metadata_key).toStrictEqual("Key 1");
      expect(entity._customFields._items[1].value).toStrictEqual("Value 1");
    });
  });

  describe("::getters", () => {
    it("should return thethe customFields", () => {
      expect.assertions(1);

      const dto = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const entity = new SecretDataV5StandaloneCustomFieldsCollection(dto);

      expect(entity.customFields.toDto()).toStrictEqual(dto.custom_fields);
    });
  });

  describe("::toDto", () => {
    it("should return the content of the customFields if any", () => {
      expect.assertions(2);

      const dto = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const entity = new SecretDataV5StandaloneCustomFieldsCollection(dto);

      const entityDto = entity.toDto();
      expect(entityDto.object_type).toStrictEqual(SECRET_DATA_OBJECT_TYPE);
      expect(entityDto.custom_fields).toStrictEqual(dto.custom_fields);
    });
  });

  describe("::createFromDefault", () => {
    it("should return default data with 1 default element in the collection", () => {
      expect.assertions(8);

      const secret = SecretDataV5StandaloneCustomFieldsCollection.createFromDefault();
      expect(secret.objectType).toStrictEqual(SECRET_DATA_OBJECT_TYPE);
      expect(secret.customFields).toHaveLength(1);
      expect(secret.customFields.items[0]).toBeInstanceOf(CustomFieldEntity);

      const customFieldEntity = secret.customFields.items[0];
      expect(customFieldEntity._props.type).toStrictEqual("text");
      expect(customFieldEntity._props.metadata_key).toStrictEqual("");
      expect(customFieldEntity._props.secret_value).toStrictEqual("");
      expect(customFieldEntity._props.secret_key).toBeUndefined();
      expect(customFieldEntity._props.metadata_value).toBeUndefined();
    });

    it("should return default data with the collection of the given element", () => {
      expect.assertions(3);

      const customFieldsCollectionDto = defaultCustomFieldsCollection();
      const secret = SecretDataV5StandaloneCustomFieldsCollection.createFromDefault(customFieldsCollectionDto);

      expect(secret.objectType).toStrictEqual(SECRET_DATA_OBJECT_TYPE);
      expect(secret.customFields).toHaveLength(customFieldsCollectionDto.length);
      expect(secret.customFields.items[0]).toBeInstanceOf(CustomFieldEntity);
    });
  });

  describe("::getDefaultProp", () => {
    it("should return nothing if the props is unknown", () => {
      expect.assertions(1);

      const prop = SecretDataV5StandaloneCustomFieldsCollection.getDefaultProp("test");
      expect(prop).toBeUndefined();
    });

    it("should return an array with a single empty item", () => {
      expect.assertions(7);

      const customFieldsCollectionDto = SecretDataV5StandaloneCustomFieldsCollection.getDefaultProp("custom_fields");
      expect(customFieldsCollectionDto).toBeInstanceOf(Array);
      expect(customFieldsCollectionDto).toHaveLength(1);

      const customFieldEntity = customFieldsCollectionDto[0];
      expect(customFieldEntity.type).toStrictEqual("text");
      expect(customFieldEntity.metadata_key).toStrictEqual("");
      expect(customFieldEntity.secret_value).toStrictEqual("");
      expect(customFieldEntity.secret_key).toBeUndefined();
      expect(customFieldEntity.metadata_value).toBeUndefined();
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should assert its parameters", () => {
      expect.assertions(2);

      const collection = new SecretDataV5StandaloneCustomFieldsCollection(defaultSecretDataV5StandaloneCustomFieldsCollectionDtos());
      expect(() => SecretDataV5StandaloneCustomFieldsCollection.areSecretsDifferent(null, collection)).toThrowError();
      expect(() => SecretDataV5StandaloneCustomFieldsCollection.areSecretsDifferent(collection, null)).toThrowError();
    });

    it("returns true if both collections have different size", () => {
      expect.assertions(1);
      const dtoA = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const dtoB = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      dtoB.custom_fields.push(defaultCustomField());

      const collectionA = new SecretDataV5StandaloneCustomFieldsCollection(dtoA);
      const collectionB = new SecretDataV5StandaloneCustomFieldsCollection(dtoB);

      expect(SecretDataV5StandaloneCustomFieldsCollection.areSecretsDifferent(collectionA, collectionB)).toStrictEqual(true);
    });

    it("returns true if one item in the collection is different", () => {
      expect.assertions(1);
      const dtoA = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const dtoB = {...dtoA};
      dtoB.custom_fields = [...dtoA.custom_fields];
      dtoB.custom_fields[1] = {...dtoB.custom_fields[1], id: uuidv4()};

      const collectionA = new SecretDataV5StandaloneCustomFieldsCollection(dtoA);
      const collectionB = new SecretDataV5StandaloneCustomFieldsCollection(dtoB);

      expect(SecretDataV5StandaloneCustomFieldsCollection.areSecretsDifferent(collectionA, collectionB)).toStrictEqual(true);
    });

    it("returns false if collections are identical", () => {
      expect.assertions(1);
      const dtoA = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();

      const collectionA = new SecretDataV5StandaloneCustomFieldsCollection(dtoA);
      const collectionB = new SecretDataV5StandaloneCustomFieldsCollection(dtoA);

      expect(SecretDataV5StandaloneCustomFieldsCollection.areSecretsDifferent(collectionA, collectionB)).toStrictEqual(false);
    });
  });
});
