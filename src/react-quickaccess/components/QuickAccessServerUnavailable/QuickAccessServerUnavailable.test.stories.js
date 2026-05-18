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
 * @since        5.13.0
 */

import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import QuickAccessServerUnavailable from "./QuickAccessServerUnavailable";
import AppContext from "../../../shared/context/AppContext/AppContext";
import { defaultProps, unauthenticatedProps } from "./QuickAccessServerUnavailable.test.data";

export default {
  title: "Components/QuickAccess/QuickAccessServerUnavailable",
  component: QuickAccessServerUnavailable,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        component={(routerProps) => (
          <div className="container quickaccess">
            <QuickAccessServerUnavailable {...args} {...routerProps} />
          </div>
        )}
      />
    </MemoryRouter>
  </AppContext.Provider>
);

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess",
};

export const SignedIn = Template.bind({});
SignedIn.args = defaultProps();
SignedIn.parameters = parameters;

export const SignedOut = Template.bind({});
SignedOut.args = unauthenticatedProps();
SignedOut.parameters = parameters;
