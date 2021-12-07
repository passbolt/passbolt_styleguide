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
import {defaultAppContext, defaultProps, propsWithFirstUserAttentionRequired} from "./DisplayUsers.test.data";


export default {
  title: 'Passbolt/User/DisplayUsers',
  component: DisplayUsers
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <DisplayUsers {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = Object.assign(defaultProps(), {context: defaultAppContext()});

export const AccountRecoveryPending = Template.bind({});
AccountRecoveryPending.args = Object.assign(propsWithFirstUserAttentionRequired(), {context: defaultAppContext()});
