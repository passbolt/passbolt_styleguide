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
import GoogleSsoSettingsEntity from "../entity/ssoSettings/GoogleSsoSettingsEntity";

/**
 * Model related to the Google SSO settings TOTP
 */
class GoogleSsoSettingsViewModel {
  /**
   * Constructor
   * @param {GoogleSsoSettingsDto} [settings]
   */
  constructor(settings = {}) {
    this.client_id = settings?.client_id;
    this.client_secret = settings?.client_secret;

    if (settings?.id) {
      this.id = settings.id;
    }
  }

  /**
   * Returns the provider identifier of the current View Model.
   * @returns {string}
   */
  get provider() {
    return GoogleSsoSettingsEntity.PROVIDER_ID;
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseEntitySchema = GoogleSsoSettingsEntity.getSchema();
    return {
      type: "object",
      required: ["client_id", "client_secret"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        client_id: baseEntitySchema.properties.client_id,
        client_secret: baseEntitySchema.properties.client_secret,
      },
    };
  }

  /**
   * Returns true if both state object's internal state have a difference
   * @param {OAuth2SsoSettingsViewModel} a
   * @param {OAuth2SsoSettingsViewModel} b
   * @returns {boolean}
   */
  static isDataDifferent(a, b) {
    const keys = ["client_id", "client_secret"];
    return keys.some((key) => a[key] !== b[key]);
  }

  /**
   * Returns true if the given object is different than the current one.
   * @param {SsoSettingsViewModel} b
   * @returns {boolean}
   */
  isDataDifferent(b) {
    if (!(b instanceof GoogleSsoSettingsViewModel)) {
      return true;
    }

    return GoogleSsoSettingsViewModel.isDataDifferent(this, b);
  }

  /**
   * Returns a DTO with the same data structure as the currentView Model.
   * @returns {object}
   */
  toDto() {
    return {
      id: this.id,
      provider: this.provider,
      client_id: this.client_id,
      client_secret: this.client_secret,
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {GoogleSsoSettingsViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const dto = this.toDto();
    dto[field] = value;
    return new GoogleSsoSettingsViewModel(dto);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    const schema = GoogleSsoSettingsViewModel.getSchema();

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
      client_id: data.client_id,
      client_secret: data.client_secret,
    };
    return new GoogleSsoSettingsViewModel(dto);
  }

  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    const entityDto = {
      provider: this.provider,
      data: {
        client_id: this.client_id,
        client_secret: this.client_secret,
      },
    };

    return entityDto;
  }
}

export default GoogleSsoSettingsViewModel;
