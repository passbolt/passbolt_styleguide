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
import DisplayActionFeedbacks from "../../Common/ActionFeedback/DisplayActionFeedbacks";
import ActionFeedbackContextProvider from "../../../contexts/ActionFeedbackContext";

export default {
  title: 'Components/Administration/ManageSsoSettings',
  component: ManageSsoSettings
};

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
Default.args.context.port.addRequestListener("passbolt.sso.get-current", disabledSso);

export const Azure = Template.bind({});
Azure.args = defaultProps();
Azure.args.context.port.addRequestListener("passbolt.sso.get-current", azureConfiguredSso);

export const ErrorFromTheServer = Template.bind({});
ErrorFromTheServer.args = defaultProps();
ErrorFromTheServer.args.context.port.addRequestListener("passbolt.sso.get-current", () => { throw new Error("Something went wrong"); });
