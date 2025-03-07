/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 */
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import DisplayUsers from "./DisplayUsers";
import {defaultProps, propsWithFirstUserAttentionRequired} from "./DisplayUsers.test.data";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";

export default {
  title: 'Components/User/DisplayUsers',
  component: DisplayUsers,
  decorators: [
    (Story, {args}) => (
      <AppContext.Provider value={args.context}>
        <UserWorkspaceContext.Provider value={args.userWorkspaceContext}>
          <MemoryRouter initialEntries={['/']}>
            <div id="container" className="page user">
              <div id="app" className="app ready" tabIndex="1000" style={{margin: "-1rem"}}>
                <div className="panel main">
                  <div className="panel middle">
                    <div className="middle-right">
                      <div className="breadcrumbs-and-grid">
                        <Route component={routerProps =>
                          <Story {...args} {...routerProps}/>}>
                        </Route>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MemoryRouter>
        </UserWorkspaceContext.Provider>
      </AppContext.Provider>
    ),
  ]
};

export const Default = {
  args: defaultProps(),
};

export const AccountRecoveryPending = {
  args: propsWithFirstUserAttentionRequired(),
};
