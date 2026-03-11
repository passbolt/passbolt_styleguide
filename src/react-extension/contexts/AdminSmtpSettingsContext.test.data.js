/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import { v4 as uuid } from "uuid";
import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";
import SmtpSettingsFormEntity from "../../shared/models/entity/smtpSettings/smtpSettingsFormEntity";

export const defaultEmptySmtpSettingsDto = (data = {}) => ({
  ...SmtpSettingsFormEntity.createDefault().toFormDto(),
  ...data,
});

export const defaultSmtpSettingsDto = (data = {}) => ({
  username: "",
  password: "",
  host: "localhost",
  tls: false,
  port: 25,
  sender_email: "",
  sender_name: "Passbolt",
  ...data,
});

export const defaultWithoutSmtpSettingsDto = (data = {}) =>
  defaultSmtpSettingsDto({
    host: "",
    port: "",
    ...data,
  });

export const defaultExistingSmtpSettingsDto = (data = {}) =>
  defaultSmtpSettingsDto({
    host: "smtp.test.com",
    tls: false,
    port: 25,
    client: null,
    username: "test username",
    password: "test password",
    sender_email: "server@passbolt.com",
    sender_name: "Passbolt",
    ...data,
  });

export const withKnownProviderSmtpSettingsDto = (data = {}) =>
  defaultExistingSmtpSettingsDto({
    ...SmtpProviders[0].availableConfigurations[0],
    ...data,
  });

export const withAwsSesSmtpSettingsDto = (data = {}) => {
  const awsSesProvider = SmtpProviders.find((provider) => provider.id === "aws-ses");
  return defaultExistingSmtpSettingsDto({
    ...awsSesProvider.availableConfigurations[0],
    ...data,
  });
};

export const withNoAuthenticationSmtpSettingsDto = (data = {}) =>
  defaultExistingSmtpSettingsDto({
    username: null,
    password: null,
    ...data,
  });

export const withUsernameAuthenticationSmtpSettingsDto = (data = {}) =>
  defaultExistingSmtpSettingsDto({
    password: null,
    ...data,
  });

export const withExistingSmtpSettingsFormDto = (data = {}) => ({
  host: "smtp.passbolt.com",
  port: 587,
  tls: true,
  client: "passbolt.dev",
  sender_name: "Passbolt test",
  sender_email: "test@passbolt.com",
  username: "username test",
  password: "passphrase test",
  oauth_username: null,
  tenant_id: null,
  client_id: null,
  client_secret: null,
  provider: "other",
  source: "db",
  ...data,
});

export const withExistingSmtpSettingsApiDto = (data = {}) => ({
  id: uuid(),
  source: "db",
  host: "smtp.passbolt.com",
  port: 587,
  tls: true,
  client: "passbolt.dev",
  username: "username test",
  password: "passphrase test",
  sender_email: "test@passbolt.com",
  sender_name: "Passbolt test",
  created: "2022-10-11T08:09:00+00:00",
  modified: "2022-10-11T08:09:00+00:00",
  ...data,
});

export const withGmailSmtpSettingsApiDto = (data = {}) => {
  const gmailProvider = SmtpProviders.find((p) => p.id === "google-mail");
  return withExistingSmtpSettingsApiDto({
    host: gmailProvider.defaultConfiguration.host,
    port: gmailProvider.defaultConfiguration.port,
    tls: gmailProvider.defaultConfiguration.tls,
    client: null,
    username: null,
    password: null,
    ...data,
  });
};
