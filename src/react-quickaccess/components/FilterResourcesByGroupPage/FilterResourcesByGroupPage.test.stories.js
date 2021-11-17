import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByGroupPage from "./FilterResourcesByGroupPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResults} from "./FilterResourcesByGroupPage.test.data";

export default {
  title: 'Passbolt/QuickAccess/FilterResourcesByGroup',
  component: FilterResourcesByGroupPage
};

const Template = ({context, initialEntries, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={initialEntries}>
      <Route exact path="/" component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps}/></div>}/>
      <Route path="/:id" component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps}/></div>}/>
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
  context: defaultAppContext(),
  initialEntries: ['/']
};
InitialLoad.parameters = parameters;

const contextNoGroup = {
  port: {
    request: () => []
  }
};
export const NoGroups = Template.bind({});
NoGroups.args = {
  context: defaultAppContext(contextNoGroup),
  initialEntries: ['/']
};
NoGroups.parameters = parameters;

const contextGroupsAndResources = {
  port: {
    request: path => mockResults[path]
  }
};
export const GroupsResourcesMatched = Template.bind({});
GroupsResourcesMatched.args = {
  context: defaultAppContext(contextGroupsAndResources),
  initialEntries: ['/']
};
GroupsResourcesMatched.parameters = parameters;
