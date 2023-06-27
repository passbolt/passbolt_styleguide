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

import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";

export function defaultSmtpSettings(data = {}) {
  const defaultData = {
    username: "",
    password: "",
    host: "localhost",
    tls: false,
    port: 25,
    sender_email: "",
    sender_name: "Passbolt",
  };

  return {
    ...defaultData,
    ...data
  };
}

export function withoutSmtpSettings(data = {}) {
  const defaultData = defaultSmtpSettings({
    host: "",
    port: "",
  });

  return {
    ...defaultData,
    ...data
  };
}

export function withExistingSmtpSettings(data = {}) {
  const defaultData = {
    host: "smtp.test.com",
    tls: false,
    port: 25,
    client: null,
    username: "test username",
    password: "test password",
    sender_email: "server@passbolt.com",
    sender_name: "Passbolt"
  };
  return defaultSmtpSettings({
    ...defaultData,
    ...data
  });
}


export function withKnownProviderSmtpSettings(data = {}) {
  return withExistingSmtpSettings({
    ...SmtpProviders[0].availableConfigurations[0],
    ...data
  });
}

export function withAwsSesSmtpSettings(data = {}) {
  const awsSesProvider = SmtpProviders.find(provider => provider.id === "aws-ses");
  return withExistingSmtpSettings({
    ...awsSesProvider.availableConfigurations[0],
    ...data
  });
}

export function withNoAuthenticationMethod(data = {}) {
  const settings = withExistingSmtpSettings(data);
  settings.username = null;
  settings.password = null;
  return settings;
}

export function withUsernameAuthenticationMethod(data = {}) {
  const settings = withExistingSmtpSettings(data);
  settings.password = null;
  return settings;
}
