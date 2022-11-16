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
 * @since         3.9.0
 */
import DialogContextProvider from "../../../contexts/DialogContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import React from "react";
import ManageSsoSettings from "./ManageSsoSettings";
import AdminSsoSettingsContextProvider from "../../../contexts/AdminSsoContext";
import {defaultProps, disabledSso, azureConfiguredSso} from "./ManageSsoSettings.test.data";
import MockFetch from "../../../test/mock/MockFetch";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import DisplayActionFeedbacks from "../../Common/ActionFeedback/DisplayActionFeedbacks";
import ActionFeedbackContextProvider from "../../../contexts/ActionFeedbackContext";

export default {
  title: 'Components/Administration/ManageSsoSettings',
  component: ManageSsoSettings
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/sso\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-managessosettings--default': {
      return mockApiResponse(disabledSso());
    }
    case 'components-administration-managessosettings--azure': {
      return mockApiResponse(azureConfiguredSso());
    }
    case 'components-administration-managessosettings--error-from-the-server': {
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
    <ActionFeedbackContextProvider>
      <DisplayActionFeedbacks/>
      <AdminSsoSettingsContextProvider {...args}>
        <div className="panel main">
          <div className="panel middle">
            <div className="grid grid-responsive-12">
              <ManageSsoSettings {...args}/>
            </div>
          </div>
        </div>
      </AdminSsoSettingsContextProvider>
    </ActionFeedbackContextProvider>
  </DialogContextProvider>;

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
Default.parameters = {
  css: "api_main"
};

export const Azure = Template.bind({});
Azure.args = defaultProps();
Azure.decorators = decorators;
Azure.parameters = {
  css: "api_main"
};

export const ErrorFromTheServer = Template.bind({});
ErrorFromTheServer.args = defaultProps();
ErrorFromTheServer.decorators = decorators;
ErrorFromTheServer.parameters = {
  css: "api_main"
};
