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
 * @since         2.14.0
 */

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import DeleteUserWithConflicts from "./DeleteUserWithConflicts";
import {defaultContext} from "./DeleteUserWithConflicts.test.data";


export default {
  title: 'Components/User/DeleteUserWithConflicts',
  component: DeleteUserWithConflicts
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <DeleteUserWithConflicts {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  onClose: () => {},
  context: defaultContext()
};
