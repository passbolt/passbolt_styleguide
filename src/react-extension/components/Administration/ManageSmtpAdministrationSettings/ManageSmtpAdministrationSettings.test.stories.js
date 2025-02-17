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
import {defaultProps} from "./ManageSmtpAdministrationSettings.test.data";
import {withExistingSmtpSettings, withAwsSesSmtpSettings, emptySmtpSettings} from "../../../contexts/AdminSmtpSettingsContext.test.data";
import MockFetch from "../../../test/mock/MockFetch";
import AdminSmtpSettingsContextProvider from "../../../contexts/AdminSmtpSettingsContext";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";

let currentStory = null;

export default {
  title: 'Components/Administration/ManageSmtpAdministrationSettings',
  component: ManageSmtpAdministrationSettings,
  decorators: [(Story, {args}) => {
    currentStory = args.id;
    return <AdminSmtpSettingsContextProvider{...args}>
      <div id="container" className="page administration">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="main-page">
                    <Story {...args}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSmtpSettingsContextProvider>;
  }],
  parameters: {
    css: "api_main"
  }
};

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/smtp\/settings\.json/, async() => {
  switch (currentStory) {
    case 'default': {
      return mockApiResponse(emptySmtpSettings());
    }
    case 'with-smtp-settings': {
      return mockApiResponse(withExistingSmtpSettings());
    }
    case 'with-smtp-settings-from-file': {
      return mockApiResponse(withExistingSmtpSettings({source: "file"}));
    }
    case 'with-known-smtp-settings': {
      return mockApiResponse(withAwsSesSmtpSettings());
    }
    case 'with-error-from-server': {
      throw new Error("Something went wrong!");
    }
  }
  throw new Error("Unsupported story");
});



export const Default = {
  args: defaultProps({id: "default"})
};

export const WithSmtpSettings = {
  args: defaultProps({id: "with-smtp-settings"})
};

export const WithSmtpSettingsFromFile = {
  args: defaultProps({id: "with-smtp-settings-from-file"})
};

export const WithKnownSmtpSettings = {
  args: defaultProps({id: "with-known-smtp-settings"})
};

export const WithErrorFromServer = {
  args: defaultProps({id: "with-error-from-server"})
};
