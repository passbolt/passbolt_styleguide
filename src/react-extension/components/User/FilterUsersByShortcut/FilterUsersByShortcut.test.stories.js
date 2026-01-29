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
 * @since         2.13.0
 */

import React from "react";
import PropTypes from "prop-types";
import { MemoryRouter, Route } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import FilterUsersByShortcut from "./FilterUsersByShortcut";
import { defaultAdministratorAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultProps } from "./FilterUsersByShortcut.test.data";

export default {
  title: "Components/User/FilterUsersByShortcut",
  component: FilterUsersByShortcut,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <div className="panel">
        <Route component={(routerProps) => <FilterUsersByShortcut {...args} {...routerProps} />}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAdministratorAppContext(),
  ...defaultProps(),
};
