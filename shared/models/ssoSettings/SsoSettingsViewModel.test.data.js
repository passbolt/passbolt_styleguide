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

import { v4 as uuid } from "uuid";
import AzureSsoSettingsEntity from "../entity/ssoSettings/AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "../entity/ssoSettings/GoogleSsoSettingsEntity";
import OAuth2SsoSettingsEntity from "../entity/ssoSettings/OAuth2SsoSettingsEntity";
import ADFSSsoSettingsEntity from "../entity/ssoSettings/AdfsSsoSettingsEntity";

/**
 * The default azure SSO settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultSsoSettingsViewModelDto = (data = {}) => {
  const defaultData = {
    provider: "azure",
    providers: [
      AzureSsoSettingsEntity.PROVIDER_ID,
      GoogleSsoSettingsEntity.PROVIDER_ID,
      OAuth2SsoSettingsEntity.PROVIDER_ID,
      ADFSSsoSettingsEntity.PROVIDER_ID,
    ],
    data: defaultAzureSsoSettingsViewModelDto(),
  };

  return Object.assign(defaultData, data);
};

/**
 * The default azure SSO settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultAzureSsoSettingsViewModelDto = (data = {}) => {
  const defaultData = {
    url: "https://login.microsoftonline.com/",
    client_id: uuid(),
    tenant_id: uuid(),
    client_secret: "This is a secret",
    client_secret_expiry: "2033-11-15 00:00:00",
    email_claim: "email",
    prompt: "login",
    login_hint: true,
  };

  return Object.assign(defaultData, data);
};

/**
 * The default Google SSO settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultGoogleSsoSettingsViewModelDto = (data = {}) => {
  const defaultData = {
    client_id: uuid(),
    client_secret: "This is a secret",
  };

  return Object.assign(defaultData, data);
};

/**
 * The default OAuth2 SSO settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultOAuth2SsoSettingsViewModelDto = (data = {}) => {
  const defaultData = {
    url: "https://openid.passbolt.com",
    openid_configuration_path: "/.well-known/openid-configuration",
    scope: "openid email profile",
    client_id: "Passbolt",
    client_secret: uuid(),
  };

  return Object.assign(defaultData, data);
};

/**
 * The default AD FS SSO settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultAdfsSsoSettingsViewModelDto = (data = {}) => {
  const defaultData = {
    url: "https://adfs.passbolt.com",
    openid_configuration_path: "/.well-known/openid-configuration",
    scope: "openid email profile",
    client_id: "Passbolt",
    client_secret: uuid(),
  };

  return Object.assign(defaultData, data);
};

/**
 * An Azure SSO Settings Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const azureSsoSettingsEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultSsoSettingsViewModelDto({
    id: uuid(),
    provider: AzureSsoSettingsEntity.PROVIDER_ID,
    data: defaultAzureSsoSettingsViewModelDto(data.data),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  delete data?.data;

  return Object.assign(defaultData, data);
};

/**
 * A Google SSO Settings Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const googleSsoSettingsEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultSsoSettingsViewModelDto({
    id: uuid(),
    provider: GoogleSsoSettingsEntity.PROVIDER_ID,
    data: defaultGoogleSsoSettingsViewModelDto(data.data),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  delete data?.data;

  return Object.assign(defaultData, data);
};

/**
 * An OAuth2 SSO Settings Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const oAuth2SsoSettingsEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultSsoSettingsViewModelDto({
    id: uuid(),
    provider: OAuth2SsoSettingsEntity.PROVIDER_ID,
    data: defaultOAuth2SsoSettingsViewModelDto(data.data),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  delete data?.data;

  return Object.assign(defaultData, data);
};

/**
 * An ADFS SSO Settings Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const adfsSsoSettingsEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultSsoSettingsViewModelDto({
    id: uuid(),
    provider: ADFSSsoSettingsEntity.PROVIDER_ID,
    data: defaultAdfsSsoSettingsViewModelDto(data.data),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  delete data?.data;

  return Object.assign(defaultData, data);
};
