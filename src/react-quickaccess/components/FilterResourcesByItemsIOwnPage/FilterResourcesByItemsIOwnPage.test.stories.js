/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.4
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByItemsIOwnPage from "./FilterResourcesByItemsIOwnPage";
import {defaultProps, noFilteredResourcesProps, withFilteredResourcesProps} from "./FilterResourcesByItemsIOwnPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/FilterResourcesByItemsIOwn',
  component: FilterResourcesByItemsIOwnPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><FilterResourcesByItemsIOwnPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const InitialLoad = Template.bind({});
InitialLoad.args = defaultProps();
InitialLoad.parameters = parameters;

export const NoOwnedResources = Template.bind({});
NoOwnedResources.args = noFilteredResourcesProps();
NoOwnedResources.parameters = parameters;

export const OwnedResources = Template.bind({});
OwnedResources.args = withFilteredResourcesProps();
OwnedResources.parameters = parameters;
