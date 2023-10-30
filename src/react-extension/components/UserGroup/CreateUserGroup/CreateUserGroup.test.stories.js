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
 * @since         2.11.0
 */

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import CreateUserGroup from "./CreateUserGroup";
import {defaultAppContext, defaultProps, mockGpgKey} from "./CreateUserGroup.test.data";

export default {
  title: 'Components/UserGroup/CreateUserGroup',
  component: CreateUserGroup
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateUserGroup {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const context = defaultAppContext();
context.port.addRequestListener('passbolt.keyring.get-public-key-info-by-user', async() => mockGpgKey);

export const Initial = Template.bind({});
Initial.args = {
  context,
  ...defaultProps(),
};
