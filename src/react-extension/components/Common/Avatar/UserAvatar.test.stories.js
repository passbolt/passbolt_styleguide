/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 */

/**
 * Storybook tests on UserAvatar in regard of specifications
 */
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import UserAvatar from "./UserAvatar";
import {defaultProps} from "./UserAvatar.test.data";

export default {
  title: 'Passbolt/Common/UserAvatar',
  component: UserAvatar
};



const Template = args =>
  <div className="panel aside ready">
    <div className="sidebar user">
      <div className="sidebar-header">
        <div className={`teaser-image  ${args.pendingRecover ? "attention-required" : ""}`}>
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <UserAvatar {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </div>;

export const Initial = Template.bind({});
Initial.args = defaultProps();

export const AttentionRequired = Template.bind({});
AttentionRequired.args = Object.assign(defaultProps(), {attentionRequired: true});
