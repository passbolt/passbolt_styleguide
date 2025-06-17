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

import SecretDataEntity from "./secretDataEntity";
import CustomFieldsCollection from "../customField/customFieldsCollection";

export default class SecretDataV5StandaloneCustomFieldsCollection extends SecretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.custom_fields) {
      this._custom_fields = new CustomFieldsCollection(this._props.custom_fields, {...options, clone: false});
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
   * @returns {TotpEntity}
   */
  get customFields() {
    return this._custom_fields;
  }
}
