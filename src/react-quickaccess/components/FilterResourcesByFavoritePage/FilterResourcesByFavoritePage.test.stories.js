import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import PropTypes from "prop-types";
import FilterResourcesByFavoritePage from "./FilterResourcesByFavoritePage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResources} from "./FilterResourcesByFavoritePage.test.data";


export default {
  title: 'Passbolt/QuickAccess/FilterResourcesByFavorite',
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


export const InitialLoad = Template.bind({});
InitialLoad.args = {
  context: defaultAppContext()
};

const contextNoResource = {
  port: {
    request: () => []
  },
};
export const NoFavoriteResource = Template.bind({});
NoFavoriteResource.args = {
  context: defaultAppContext(contextNoResource)
};

const contextWithResources = {
  port: {
    request: () => mockResources
  },
};
export const FavoriteResources = Template.bind({});
FavoriteResources.args = {
  context: defaultAppContext(contextWithResources)
};
