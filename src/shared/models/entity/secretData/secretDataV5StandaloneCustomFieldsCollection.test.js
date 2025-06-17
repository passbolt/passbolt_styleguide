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
      expect(entity._custom_fields).toHaveLength(0);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(6);

      const dto = defaultSecretDataV5StandaloneCustomFieldsCollectionDtos();
      const entity = new SecretDataV5StandaloneCustomFieldsCollection(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity._custom_fields).toHaveLength(2);
      expect(entity._custom_fields._items[0]._props.metadata_key).toStrictEqual("Key 0");
      expect(entity._custom_fields._items[0].value).toStrictEqual("Value 0");
      expect(entity._custom_fields._items[1]._props.metadata_key).toStrictEqual("Key 1");
      expect(entity._custom_fields._items[1].value).toStrictEqual("Value 1");
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
});
