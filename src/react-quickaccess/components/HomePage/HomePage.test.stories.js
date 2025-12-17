/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.10.0
 */

import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from "./HomePage";
import {
  loadingProps,
  noResourcesProps,
  searchNoResultProps,
  searchWithResultProps,
  suggestedResourcesProps,
} from "./HomePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: "Components/QuickAccess/Home",
  component: HomePage,
};

const Template = ({ context, ...args }) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <Route
        component={(routerProps) => (
          <div className="container quickaccess">
            <HomePage {...args} {...routerProps} />
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

export const Initial = Template.bind({});
Initial.args = loadingProps();
Initial.parameters = parameters;

export const NoResource = Template.bind({});
NoResource.args = noResourcesProps();
NoResource.parameters = parameters;

export const NoFoundResource = Template.bind({});
NoFoundResource.args = searchNoResultProps();
NoFoundResource.parameters = parameters;

export const SearchResources = Template.bind({});
SearchResources.args = searchWithResultProps();
SearchResources.parameters = parameters;

export const SuggestedResources = Template.bind({});
SuggestedResources.args = suggestedResourcesProps();
SuggestedResources.parameters = parameters;
