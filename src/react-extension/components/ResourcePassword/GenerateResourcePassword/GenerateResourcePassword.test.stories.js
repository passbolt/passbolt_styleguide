/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */

import AppContext from "../../../../shared/context/AppContext/AppContext";
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import GenerateResourcePassword from "./GenerateResourcePassword";
import {defaultProps} from "./GenerateResourcePassword.test.data";


export default {
  title: 'Components/ResourcePassword/GenerateResourcePassword',
  component: GenerateResourcePassword
};


const Template = args =>
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <GenerateResourcePassword {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = defaultProps();
