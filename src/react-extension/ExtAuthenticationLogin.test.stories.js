/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import React from "react";
import ExtAuthenticationLogin from "./ExtAuthenticationLogin";
import MockPort from "./test/mock/MockPort";
import siteSettingsFixture from "./test/fixture/Settings/siteSettings";
import mockStorage from "../../demo/ext-app/mock/mockStorage";

export default {
  title: 'Components/ExtAuthenticationLogin/ExtAuthenticationLogin',
  component: ExtAuthenticationLogin
};

function getMockedPort() {
  const mockedPort = new MockPort();
  mockedPort.addRequestListener("passbolt.organization-settings.get", () => siteSettingsFixture);
  mockedPort.addRequestListener("passbolt.locale.get", () => ({
    locale: 'en-UK',
    label: 'English'
  }));
  return mockedPort;
}

const mockedStorage = new mockStorage();

const Template = args => <ExtAuthenticationLogin {...args}/>;

const defaultParameters = {
  css: "ext_authentication"
};

export const Initial = Template.bind({});
Initial.args = {
  port: getMockedPort(),
  storage: mockedStorage
};
Initial.parameters = defaultParameters;

const mockedPortWithSso = getMockedPort();
const ssoLocalConfiguredProvider = "azure";
mockedPortWithSso.addRequestListener("passbolt.sso.get-local-configured-provider", () => ssoLocalConfiguredProvider);

export const WithSsoKitAvailable = Template.bind({});
WithSsoKitAvailable.args = {
  port: mockedPortWithSso,
  storage: mockedStorage
};
WithSsoKitAvailable.parameters = defaultParameters;
