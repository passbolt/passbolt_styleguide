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

import React from "react";
import ManageSmtpAdministrationSettings from "../ManageSmtpAdministrationSettings/ManageSmtpAdministrationSettings";
import DialogContextProvider from "../../../contexts/DialogContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import {defaultProps} from "./ManageSmtpAdministrationSettings.test.data";
import {defaultSmtpSettings, withExistingSmtpSettings, withAwsSesSmtpSettings} from "../../../contexts/AdminSmtpSettingsContext.test.data";
import MockFetch from "../../../test/mock/MockFetch";
import AdminSmtpSettingsContextProvider from "../../../contexts/AdminSmtpSettingsContext";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";

export default {
  title: 'Components/Administration/ManageSmtpAdministrationSettings',
  component: ManageSmtpAdministrationSettings
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/smtp\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-managesmtpadministrationsettings--default': {
      return mockApiResponse(defaultSmtpSettings());
    }
    case 'components-administration-managesmtpadministrationsettings--with-smtp-settings': {
      return mockApiResponse(withExistingSmtpSettings());
    }
    case 'components-administration-managesmtpadministrationsettings--with-smtp-settings-from-file': {
      return mockApiResponse(withExistingSmtpSettings({source: "file"}));
    }
    case 'components-administration-managesmtpadministrationsettings--with-known-smtp-settings': {
      return mockApiResponse(withAwsSesSmtpSettings());
    }
    case 'components-administration-managesmtpadministrationsettings--with-error-from-server': {
      throw new Error("Something went wrong!");
    }
  }
  throw new Error("Unsupported story");
});

const decorators = [
  (Story, context) => {
    currentStory = context.id;
    return <>
      <Story/>
    </>;
  }
];


const Template = args =>
  <DialogContextProvider>
    <ManageDialogs/>
    <AdminSmtpSettingsContextProvider {...args}>
      <div className="panel main">
        <div className="panel middle">
          <div className="grid grid-responsive-12">
            <ManageSmtpAdministrationSettings {...args}/>
          </div>
        </div>
      </div>
    </AdminSmtpSettingsContextProvider>
  </DialogContextProvider>;

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
Default.parameters = {
  css: "api_main"
};

export const WithSmtpSettings = Template.bind({});
WithSmtpSettings.args = defaultProps();
WithSmtpSettings.decorators = decorators;
WithSmtpSettings.parameters = {
  css: "api_main"
};

export const WithSmtpSettingsFromFile = Template.bind({});
WithSmtpSettingsFromFile.args = defaultProps();
WithSmtpSettingsFromFile.decorators = decorators;
WithSmtpSettingsFromFile.parameters = {
  css: "api_main"
};

export const WithKnownSmtpSettings = Template.bind({});
WithKnownSmtpSettings.args = defaultProps();
WithKnownSmtpSettings.decorators = decorators;
WithKnownSmtpSettings.parameters = {
  css: "api_main"
};

export const WithErrorFromServer = Template.bind({});
WithErrorFromServer.args = defaultProps();
WithErrorFromServer.decorators = decorators;
WithErrorFromServer.parameters = {
  css: "api_main"
};
