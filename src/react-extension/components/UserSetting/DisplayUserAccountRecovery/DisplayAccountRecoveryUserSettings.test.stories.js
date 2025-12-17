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
 * @since         3.6.0
 */

import React from "react";
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
import { users } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultAccountRecoveryPolicyDto } from "./DisplayAccountRecoveryUserSettings.test.data";
import DisplayAccountRecoveryUserSettingsHelp from "./DisplayAccountRecoveryUserSettingsHelp";
import { MemoryRouter } from "react-router-dom";
import { defaultRoleContext } from "../../../contexts/RoleContext.test.data";

export default {
  title: "Components/UserSetting/DisplayAccountRecoveryUserSettings",
  component: DisplayAccountRecoveryUserSettings,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/app/settings/account-recovery"]}>
        <div id="container" className="page settings">
          <div id="app" className="app" tabIndex="1000" style={{ margin: "-1rem" }}>
            <div className="panel main">
              <div className="panel left">
                <div className="sidebar-content"></div>
              </div>
              <div className="panel middle">
                <div className="header"></div>
                <div className="middle-right">
                  <div className="breadcrumbs-and-grid">
                    <div className="top-bar"></div>
                    <div className="main-page">
                      <Story {...args} />
                    </div>
                  </div>
                  <div className="help-panel">
                    <div className="sidebar-help">
                      <DisplayAccountRecoveryUserSettingsHelp {...args} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

const accountRecoveryContext = (props) => ({
  status: "approved",
  isReady: () => true,
  loadAccountRecoveryPolicy: () => {},
  getPolicy: () => ({
    policy: "opt-out",
  }),
  getRequestor: () => ({
    ...users.ada,
    gpgkey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
    },
  }),
  getRequestedDate: () => "2021-05-25T09:08:34.123",
  getOrganizationPolicy: () => defaultAccountRecoveryPolicyDto(),
  ...props,
});

const roleContext = defaultRoleContext();
const roles = roleContext.getAllRoles();

export const Enabled = {
  args: {
    context: defaultAppContext(),
    accountRecoveryContext: accountRecoveryContext(),
    roleContext: roleContext,
    roles: roles,
  },
};

export const Pending = {
  args: {
    context: defaultAppContext(),
    accountRecoveryContext: accountRecoveryContext({ status: "pending" }),
    roleContext: roleContext,
    roles: roles,
  },
};

export const Disabled = {
  args: {
    context: defaultAppContext(),
    accountRecoveryContext: accountRecoveryContext({ status: "rejected" }),
    roleContext: roleContext,
    roles: roles,
  },
};
