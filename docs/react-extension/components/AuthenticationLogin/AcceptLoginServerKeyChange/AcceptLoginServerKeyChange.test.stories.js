/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AcceptLoginServerKeyChange from "./AcceptLoginServerKeyChange";
import {defaultProps} from "./AcceptLoginServerKeyChange.test.data";

export default {
  title: 'Components/AuthenticationLogin/AcceptLoginServerKeyChange',
  component: AcceptLoginServerKeyChange
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <Route component={routerProps => <AcceptLoginServerKeyChange {...args} {...routerProps}/>}/>
        </div>
      </div>
    </div>
  </MemoryRouter>;


export const Initial = Template.bind({});
Initial.args = defaultProps();
Initial.parameters = {
  css: "ext_authentication"
};
