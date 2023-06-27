import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByFavoritePage from "./FilterResourcesByFavoritePage";
import {defaultProps, noResourcesProps, withFilteredResourcesProps} from "./FilterResourcesByFavoritePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/FilterResourcesByFavorite',
  component: FilterResourcesByFavoritePage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><FilterResourcesByFavoritePage {...args} {...routerProps}/></div>}/>
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

export const NoFavoriteResource = Template.bind({});
NoFavoriteResource.args = noResourcesProps();
NoFavoriteResource.parameters = parameters;

export const FavoriteResources = Template.bind({});
FavoriteResources.args = withFilteredResourcesProps();
FavoriteResources.parameters = parameters;
