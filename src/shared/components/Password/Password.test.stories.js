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
import Password from "./Password";
import {defaultProps} from "./Password.test.data";

export default {
  title: 'Foundations/Password',
  component: "Password"
};


const Template = args =>
  <div style={{display: "flex", flexWrap: "wrap"}}>
    <div style={{width: "49%", marginRight: "1%"}}>
      <Password {...args} id="password1"/>
    </div>
    <div style={{width: "49%", marginRight: "1%"}}>
      <Password {...args} id="password2" disabled={true}/>
    </div>
  </div>;

export const InputPassphrase = Template.bind({});
InputPassphrase.args = defaultProps();

export const InputPassword = Template.bind({});
InputPassword.args = defaultProps({placeholder: "Password", securityToken: false});
