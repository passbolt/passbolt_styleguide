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

import ConfirmPassphrase from "./ConfirmPassphrase";
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import {defaultProps} from "./ConfirmPassphrase.test.data";

export default {
  title: 'Components/UserSetting/ConfirmPassphase',
  component: ConfirmPassphrase
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <div className="page">
      <div className="panel">
        <Route component={routerProps => <ConfirmPassphrase {...args} {...routerProps}/>}></Route>
      </div>
    </div>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = defaultProps();

