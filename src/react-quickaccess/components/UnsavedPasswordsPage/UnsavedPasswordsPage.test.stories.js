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
 * @since         5.19.0
 */

import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import UnsavedPasswordsPage from "./UnsavedPasswordsPage";
import { defaultProps } from "./UnsavedPasswordsPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/UnsavedPasswords",
  component: UnsavedPasswordsPage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        component={(routerProps) => (
          <div className="container quickaccess">
            <UnsavedPasswordsPage {...args} {...routerProps} />
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

export const Default = {
  render: Template,
  args: defaultProps(),
  parameters: parameters,
};

export const NoPasswordDraft = {
  render: Template,
  args: defaultProps([]),
  parameters: parameters,
};
