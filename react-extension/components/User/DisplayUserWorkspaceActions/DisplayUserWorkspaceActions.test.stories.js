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
import DisplayUserWorkspaceActions from "./DisplayUserWorkspaceActions";
import {
  propsGroupSelected,
  propsUserRole,
  propsWithMyselfAsSelectedUser,
  propsWithSelectedUser,
} from "./DisplayUserWorkspaceActions.test.data";

export default {
  title: "Components/User/DisplayUserWorkspaceActions",
  decorators: [
    (Story) => (
      <div className="panel main">
        <div className="panel middle">
          <div className="middle-right">
            <div className="breadcrumbs-and-grid">
              <div className="top-bar">
                <div className="action-bar">
                  <Story />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  component: DisplayUserWorkspaceActions,
};

export const Admin = {
  args: propsWithSelectedUser(),
};

export const AdminSelected = {
  args: propsWithMyselfAsSelectedUser(),
};

export const User = {
  args: propsUserRole(),
};

export const GroupSelected = {
  args: propsGroupSelected(),
};
