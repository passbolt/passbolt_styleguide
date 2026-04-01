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
import OAuth2SsoSettingsEntity from "../entity/ssoSettings/OAuth2SsoSettingsEntity";

/**
 * Model related to the OAuth2 SSO settings TOTP
 */
class OAuth2SsoSettingsViewModel {
  /**
   * Constructor
   * @param {OAuth2SsoSettingsDto} [settings]
   */
  constructor(settings = {}) {
    this.url = settings?.url;
    this.openid_configuration_path = settings?.openid_configuration_path;
    this.scope = settings?.scope;
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
    return OAuth2SsoSettingsEntity.PROVIDER_ID;
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseEntitySchema = OAuth2SsoSettingsEntity.getSchema();
    return {
      type: "object",
      required: ["url", "openid_configuration_path", "scope", "client_id", "client_secret"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        url: baseEntitySchema.properties.url,
        openid_configuration_path: baseEntitySchema.properties.openid_configuration_path,
        scope: baseEntitySchema.properties.scope,
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
    const keys = ["url", "openid_configuration_path", "scope", "client_id", "client_secret"];
    return keys.some((key) => a[key] !== b[key]);
  }

  /**
   * Returns true if the given object is different than the current one.
   * @param {SsoSettingsViewModel} b
   * @returns {boolean}
   */
  isDataDifferent(b) {
    if (!(b instanceof OAuth2SsoSettingsViewModel)) {
      return true;
    }

    return OAuth2SsoSettingsViewModel.isDataDifferent(this, b);
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
      openid_configuration_path: this.openid_configuration_path,
      scope: this.scope,
      client_id: this.client_id,
      client_secret: this.client_secret,
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {OAuth2SsoSettingsViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const dto = this.toDto();
    dto[field] = value;
    return new OAuth2SsoSettingsViewModel(dto);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    const schema = OAuth2SsoSettingsViewModel.getSchema();

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
      openid_configuration_path: data.openid_configuration_path,
      scope: data.scope,
      client_id: data.client_id,
      client_secret: data.client_secret,
    };
    return new OAuth2SsoSettingsViewModel(dto);
  }

  /**
   * Returns a DTO with the same data structure of the entity dto.
   * @returns {object}
   */
  toEntityDto() {
    const entityDto = {
      provider: this.provider,
      data: {
        url: this.url,
        openid_configuration_path: this.openid_configuration_path,
        scope: this.scope,
        client_id: this.client_id,
        client_secret: this.client_secret,
      },
    };

    return entityDto;
  }
}

export default OAuth2SsoSettingsViewModel;
