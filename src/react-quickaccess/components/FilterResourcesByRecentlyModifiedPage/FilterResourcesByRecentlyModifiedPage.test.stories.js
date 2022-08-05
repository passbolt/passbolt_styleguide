import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByRecentlyModifiedPage from "./FilterResourcesByRecentlyModifiedPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockNoResource, mockResources} from "./FilterResourcesByRecentlyModifiedPage.test.data";


export default {
  title: 'Components/QuickAccess/FilterResourcesByRecentlyModified',
  component: FilterResourcesByRecentlyModifiedPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><FilterResourcesByRecentlyModifiedPage {...args} {...routerProps}/></div>}/>
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
  storage: {
    local: {
      get: () => mockNoResource
    }
  }
};
export const NoRecentlyModifiedResource = Template.bind({});
NoRecentlyModifiedResource.args = {
  context: defaultAppContext(contextNoResource)
};
NoRecentlyModifiedResource.parameters = parameters;

const contextResources = {
  storage: {
    local: {
      get: () => mockResources
    }
  }
};
export const RecentlyModifiedResources = Template.bind({});
RecentlyModifiedResources.args = {
  context: defaultAppContext(contextResources)
};
RecentlyModifiedResources.parameters = parameters;
