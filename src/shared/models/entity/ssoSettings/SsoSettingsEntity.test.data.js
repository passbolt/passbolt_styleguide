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
import {v4 as uuid} from 'uuid';
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";
import SsoSettingsEntity from "./SsoSettingsEntity";
import AdfsSsoSettingsEntity from './AdfsSsoSettingsEntity';

export function defaultSsoSettings(data = {}) {
  const defaultData = {
    providers: SsoSettingsEntity.AVAILABLE_PROVIDERS,
    provider: null,
  };
  return Object.assign(defaultData, data);
}

export function defaultSsoSettingsWithAzure(data = {}) {
  const defaultData = defaultSsoSettings({
    provider: AzureSsoSettingsEntity.PROVIDER_ID,
    data: defaultAzureSsoSettingsDto(),
  });
  return Object.assign(defaultData, data);
}

export function defaultSsoSettingsWithGoogle(data = {}) {
  const defaultData = defaultSsoSettings({
    provider: GoogleSsoSettingsEntity.PROVIDER_ID,
    data: defaultGoogleSsoSettingsDto(),
  });
  return Object.assign(defaultData, data);
}

export function defaultSsoSettingsWithOAuth2(data = {}) {
  const defaultData = defaultSsoSettings({
    provider: OAuth2SsoSettingsEntity.PROVIDER_ID,
    data: defaultOAuth2SsoSettingsDto(),
  });
  return Object.assign(defaultData, data);
}

export function defaultSsoSettingsWithAdfs(data = {}) {
  const defaultData = defaultSsoSettings({
    provider: AdfsSsoSettingsEntity.PROVIDER_ID,
    data: defaultAdfsSsoSettingsDto(),
  });
  return Object.assign(defaultData, data);
}

export const defaultAzureSsoSettingsDto = (data = {}) => {
  const defaultData = {
    url: "https://login.microsoftonline.com",
    client_id: uuid(),
    tenant_id: uuid(),
    client_secret: "This is a secret",
    client_secret_expiry: new Date().toISOString().substring(0, 10),
    email_claim: "email",
    prompt: "login",
    login_hint: true,
  };

  return Object.assign(defaultData, data);
};

export const defaultGoogleSsoSettingsDto = (data = {}) => {
  const defaultData = {
    client_id: uuid(),
    client_secret: "This is a secret",
  };

  return Object.assign(defaultData, data);
};

export const defaultOAuth2SsoSettingsDto = (data = {}) => {
  const defaultData = {
    url: "https://openid.passbolt.com",
    openid_configuration_path: "/.well-known/openid-configuration",
    scope: "openid email profile",
    client_id: "Passbolt",
    client_secret: uuid(),
  };

  return Object.assign(defaultData, data);
};

export const defaultAdfsSsoSettingsDto = (data = {}) => {
  const defaultData = {
    url: "https://adfs.passbolt.com",
    openid_configuration_path: "/.well-known/openid-configuration",
    scope: "openid email profile",
    client_id: "Passbolt",
    client_secret: uuid(),
  };

  return Object.assign(defaultData, data);
};
