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

import SecretDataEntity, { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import CustomFieldsCollection from "../customField/customFieldsCollection";
import assertString from "validator/es/lib/util/assertString";
import CustomFieldEntity from "../customField/customFieldEntity";

export default class SecretDataV5StandaloneCustomFieldsCollection extends SecretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);
  }

  /**
   * Get the secret data default totp schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "custom_fields"],
      properties: {
        ...SecretDataEntity.getSchema().properties,
        custom_fields: CustomFieldsCollection.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      custom_fields: CustomFieldsCollection,
    };
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);

    const customFields = this.customFields;
    if (customFields) {
      result.custom_fields = customFields.toDto();
    }

    return result;
  }

  /**
   * Get the totp association.
   * @returns {CustomFieldsCollection}
   */
  get customFields() {
    return this._customFields;
  }

  /**
   * Return the default custom fields.
   * @param {Array} items the items to add to the initial collection
   * @returns {SecretDataV5StandaloneCustomFieldsCollection}
   */
  static createFromDefault(items = []) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      custom_fields: items,
    };

    if (items.length === 0) {
      defaultData.custom_fields.push(CustomFieldEntity.createFromDefault());
    }

    return new SecretDataV5StandaloneCustomFieldsCollection(defaultData);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {CustomFieldsCollection | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "custom_fields":
        return new CustomFieldsCollection([CustomFieldEntity.createFromDefault()]).toDto();
      default:
        return;
    }
  }

  /**
   * Returns true if the given 2 secrets are different
   * @param {object} secretDto
   * @returns {boolean}
   * @throws {TypeError} if one of the parameters is not of type SecretDataV5StandaloneCustomFieldsCollection
   */
  areSecretsDifferent(secretDto) {
    const otherCollection = new CustomFieldsCollection(secretDto.custom_fields, { validate: false });
    return CustomFieldsCollection.areCollectionsDifferent(this.customFields, otherCollection);
  }
}
