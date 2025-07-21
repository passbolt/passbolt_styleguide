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
 * @since         4.5.0
 */

import EntitySchema from "../entity/abstract/entitySchema";
import EntityValidationError from "../entity/abstract/entityValidationError";
import AzureSsoSettingsEntity from "../entity/ssoSettings/AzureSsoSettingsEntity";

/**
 * Model related to the Azure SSO settings TOTP
 */
class AzureSsoSettingsViewModel {
  /**
   * Constructor
   * @param {AzureSsoSettingsDto} [settings]
   */
  constructor(settings = {}) {
    this.url = settings?.url;
    this.client_id = settings?.client_id;
    this.tenant_id = settings?.tenant_id;
    this.client_secret = settings?.client_secret;
    this.email_claim = settings?.email_claim;
    this.prompt = settings?.prompt;
    this.login_hint = settings?.login_hint ?? true;

    if (settings?.client_secret_expiry) {
      /*
       * Format of the date could be something like 2023-11-11T00:00:00.000Z.
       * But the input requires only the date part.
       */
      this.client_secret_expiry = settings.client_secret_expiry.toString().substring(0, 10);
    }

    if (settings?.id) {
      this.id = settings.id;
    }
  }

  /**
   * Returns the provider identifier of the current View Model.
   * @returns {string}
   */
  get provider() {
    return AzureSsoSettingsEntity.PROVIDER_ID;
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseEntitySchema = AzureSsoSettingsEntity.getSchema();
    return {
      type: "object",
      required: [
        "url",
        "client_id",
        "tenant_id",
        "client_secret",
        "client_secret_expiry",
        "email_claim",
        "prompt",
        "login_hint"
      ],
      properties: {
        id: {
          "type": "string",
          "format": "uuid",
        },
        url: baseEntitySchema.properties.url,
        client_id: baseEntitySchema.properties.client_id,
        tenant_id: baseEntitySchema.properties.tenant_id,
        client_secret: baseEntitySchema.properties.client_secret,
        client_secret_expiry: baseEntitySchema.properties.client_secret_expiry,
        email_claim: baseEntitySchema.properties.email_claim,
        prompt: baseEntitySchema.properties.prompt,
        login_hint: baseEntitySchema.properties.login_hint,
      }
    };
  }

  /**
   * Returns true if both state object's internal state have a difference
   * @param {AzureSsoSettingsViewModel} a
   * @param {AzureSsoSettingsViewModel} b
   * @returns {boolean}
   */
  static isDataDifferent(a, b) {
    const keys = [
      "url",
      "client_id",
      "tenant_id",
      "client_secret",
      "client_secret_expiry",
      "email_claim",
      "prompt",
      "login_hint",
    ];
    return keys.some(key => a[key] !== b[key]);
  }

  /**
   * Returns true if the given object is different than the current one.
   * @param {SsoSettingsViewModel} b
   * @returns {boolean}
   */
  isDataDifferent(b) {
    if (!(b instanceof AzureSsoSettingsViewModel)) {
      return true;
    }

    return AzureSsoSettingsViewModel.isDataDifferent(this, b);
  }

  /**
   * Returns a DTO with the same data structure as the currentView Model.
   * @returns {object}
   */
  toDto() {
    return {
      id: this.id,
      provider: this.provider,
      url: this.url,
      client_id: this.client_id,
      tenant_id: this.tenant_id,
      client_secret: this.client_secret,
      client_secret_expiry: this.client_secret_expiry,
      email_claim: this.email_claim,
      prompt: this.prompt,
      login_hint: this.login_hint,
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {AzureSsoSettingsViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const dto = this.toDto();
    dto[field] = value;
    return new AzureSsoSettingsViewModel(dto);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    const schema = AzureSsoSettingsViewModel.getSchema();

    try {
      EntitySchema.validate(this.constructor.name, this, schema);
    } catch (e) {
      if (!(e instanceof EntityValidationError)) {
        throw e;
      }
      return e;
    }

    return new EntityValidationError();
  }

  /**
   * Returns a ViewModel instance based on a DTO using the data structure of the API.
   * @returns {object}
   */
  static fromEntityDto(settings) {
    const data = settings.data;
    const dto = {
      id: settings?.id,
      url: data.url,
      client_id: data.client_id,
      tenant_id: data.tenant_id,
      client_secret: data.client_secret,
      client_secret_expiry: data.client_secret_expiry,
      email_claim: data.email_claim,
      prompt: data.prompt,
      login_hint: data.login_hint,
    };
    return new AzureSsoSettingsViewModel(dto);
  }
  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    let clientSecretExpiry = this.client_secret_expiry;
    if (this.client_secret_expiry) {
      // put back the format in date time instead of date
      clientSecretExpiry += " 00:00:00";
    }

    const entityDto = {
      provider: this.provider,
      data: {
        url: this.url,
        client_id: this.client_id,
        tenant_id: this.tenant_id,
        client_secret: this.client_secret,
        client_secret_expiry: clientSecretExpiry,
        email_claim: this.email_claim,
        prompt: this.prompt,
        login_hint: this.login_hint,
      }
    };

    return entityDto;
  }
}

export default AzureSsoSettingsViewModel;
