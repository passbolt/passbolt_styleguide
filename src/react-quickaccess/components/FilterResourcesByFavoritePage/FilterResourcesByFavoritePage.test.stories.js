import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByFavoritePage from "./FilterResourcesByFavoritePage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResources} from "./FilterResourcesByFavoritePage.test.data";


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
InitialLoad.args = {
  context: defaultAppContext()
};
InitialLoad.parameters = parameters;

const contextNoResource = {
  port: {
    request: () => []
  },
};
export const NoFavoriteResource = Template.bind({});
NoFavoriteResource.args = {
  context: defaultAppContext(contextNoResource)
};
NoFavoriteResource.parameters = parameters;

const contextWithResources = {
  port: {
    request: () => mockResources
  },
};
export const FavoriteResources = Template.bind({});
FavoriteResources.args = {
  context: defaultAppContext(contextWithResources)
};
FavoriteResources.parameters = parameters;
