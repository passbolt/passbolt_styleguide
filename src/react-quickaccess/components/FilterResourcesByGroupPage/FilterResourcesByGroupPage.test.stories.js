import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByGroupPage from "./FilterResourcesByGroupPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResults} from "./FilterResourcesByGroupPage.test.data";

export default {
  title: 'Components/QuickAccess/FilterResourcesByGroup',
  component: FilterResourcesByGroupPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route path={["/", "/:id"]} component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
  initialEntries: PropTypes.array
};

const parameters = {
  css: "ext_quickaccess"
};

export const InitialLoad = Template.bind({});
InitialLoad.args = {
  context: defaultAppContext()
};
InitialLoad.parameters = parameters;

const contextNoGroup = {
  port: {
    request: () => []
  }
};
export const NoGroups = Template.bind({});
NoGroups.args = {
  context: defaultAppContext(contextNoGroup)
};
NoGroups.parameters = parameters;

const contextGroupsAndResources = {
  port: {
    request: path => mockResults[path]
  }
};
export const GroupsResourcesMatched = Template.bind({});
GroupsResourcesMatched.args = {
  context: defaultAppContext(contextGroupsAndResources)
};
GroupsResourcesMatched.parameters = parameters;
