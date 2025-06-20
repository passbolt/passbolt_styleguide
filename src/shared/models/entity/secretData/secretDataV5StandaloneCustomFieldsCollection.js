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

import SecretDataEntity, {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import CustomFieldsCollection from "../customField/customFieldsCollection";
import assertString from "validator/es/lib/util/assertString";
import CustomFieldEntity from "../customField/customFieldEntity";

export default class SecretDataV5StandaloneCustomFieldsCollection extends SecretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.custom_fields) {
      this._customFields = new CustomFieldsCollection(this._props.custom_fields, {...options, clone: false});
      delete this._props.custom_fields;
    }
  }

  /**
   * Get the secret data default totp schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "custom_fields"
      ],
      "properties": {
        ...SecretDataEntity.getSchema().properties,
        "custom_fields": CustomFieldsCollection.getSchema(),
      }
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
   * @param {SecretDataV5StandaloneCustomFieldsCollection} a
   * @param {SecretDataV5StandaloneCustomFieldsCollection} b
   * @returns {boolean}
   * @throws {TypeError} if one of the parameters is not of type SecretDataV5StandaloneCustomFieldsCollection
   */
  static areSecretsDifferent(a, b) {
    if (!(a instanceof SecretDataV5StandaloneCustomFieldsCollection) || !(b instanceof SecretDataV5StandaloneCustomFieldsCollection)) {
      throw new TypeError("Both paramerters must be of type SecretDataV5StandaloneCustomFieldsCollection");
    }

    const length = a.customFields.length;
    if (length !== b.customFields.length) {
      return true;
    }

    for (let i = 0; i < length; i++) {
      const fieldA = a.customFields.items[i];
      const fieldB = b.customFields.items[i];

      if (CustomFieldEntity.areFieldsDifferent(fieldA, fieldB)) {
        return true;
      }
    }
    return false;
  }
}
