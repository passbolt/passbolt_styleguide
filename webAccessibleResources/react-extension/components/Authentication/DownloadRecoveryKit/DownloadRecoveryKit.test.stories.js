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
import DownloadRecoveryKit from "./DownloadRecoveryKit";
import {defaultProps} from "./DownloadRecoveryKit.test.data";

export default {
  title: 'Components/Authentication/DownloadRecoveryKit',
  component: DownloadRecoveryKit
};

const Template = args =>
  <div id="container" className="container page login">
    <div className="content">
      <div className="login-form">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <DownloadRecoveryKit {...args} {...routerProps}/>}/>
        </MemoryRouter>
      </div>
    </div>
  </div>;


export const Initial = Template.bind({});
Initial.args = defaultProps();
Initial.parameters = {
  css: "ext_authentication"
};
