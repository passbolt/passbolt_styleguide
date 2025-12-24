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
 * @since         5.0.0
 */

import TotpEntity from "../totp/totpEntity";
import SecretDataV5DefaultEntity from "./secretDataV5DefaultEntity";
import { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";
import CustomFieldsCollection from "../customField/customFieldsCollection";
import CustomFieldEntity from "../customField/customFieldEntity";

class SecretDataV5DefaultTotpEntity extends SecretDataV5DefaultEntity {
  /**
   * Get the secret data default totp schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "password", "totp"],
      properties: {
        ...SecretDataV5DefaultEntity.getSchema().properties,
        totp: TotpEntity.getSchema(),
        custom_fields: CustomFieldsCollection.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      totp: TotpEntity,
      custom_fields: CustomFieldsCollection,
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    // Set object type in case of secret has not object_type (example: after a migration v4 to v5)
    if (!this._props.object_type) {
      this._props.object_type = SECRET_DATA_OBJECT_TYPE;
    }
  }

  /**
   * Return the default secret data v5 default totp.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5DefaultTotpEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      password: "",
      totp: TotpEntity.createFromDefault({}, { validate: false }).toDto(),
    };

    return new SecretDataV5DefaultTotpEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | CustomFieldsCollection | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "password":
        return "";
      case "description":
        return "";
      case "totp":
        return TotpEntity.createFromDefault({}, { validate: false }).toDto();
      case "custom_fields":
        return new CustomFieldsCollection([CustomFieldEntity.createFromDefault()]).toDto();
      default:
        return;
    }
  }

  /**
   * Are secret different
   * @param secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    if (this.password !== secretDto.password) {
      return true;
    }

    if (this.description !== secretDto.description) {
      return true;
    }

    const totp = this.totp.toDto();
    const isTotpDifferent = Object.keys(totp).some((key) => totp[key] !== secretDto.totp?.[key]);
    if (isTotpDifferent) {
      return true;
    }

    const isCustomFieldDefined = typeof this.customFields !== "undefined" && this.customFields !== null;
    const isOtherCustomFieldDefined =
      typeof secretDto.custom_fields !== "undefined" && secretDto.custom_fields !== null;
    if (!isCustomFieldDefined && !isOtherCustomFieldDefined) {
      return false;
    } else if (
      (!isCustomFieldDefined && isOtherCustomFieldDefined) ||
      (isCustomFieldDefined && !isOtherCustomFieldDefined)
    ) {
      return true;
    }

    const otherCollection = new CustomFieldsCollection(secretDto.custom_fields, { validate: false });
    return CustomFieldsCollection.areCollectionsDifferent(this.customFields, otherCollection);
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);

    if (this.totp) {
      result.totp = this.totp.toDto();
    }

    if (this.customFields) {
      result.custom_fields = this.customFields.toDto();
    }

    return result;
  }

  /**
   * Get the totp association.
   * @returns {TotpEntity}
   */
  get totp() {
    return this._totp;
  }

  /**
   * Get the associated custom fields collection
   * @returns {CustomFieldsCollection | null}
   */
  get customFields() {
    return this._customFields || null;
  }
}

export default SecretDataV5DefaultTotpEntity;
