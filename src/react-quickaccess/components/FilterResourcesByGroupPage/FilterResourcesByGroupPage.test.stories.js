import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
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


export const InitialLoad = Template.bind({});
InitialLoad.args = {
  context: defaultAppContext(),
  initialEntries: ['/']
};

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
