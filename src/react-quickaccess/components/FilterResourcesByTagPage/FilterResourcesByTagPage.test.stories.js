import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByTagPage from "./FilterResourcesByTagPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResults} from "./FilterResourcesByTagPage.test.data";

export default {
  title: 'Components/QuickAccess/FilterResourcesByTag',
  component: FilterResourcesByTagPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route path={["/", "/:id"]} component={routerProps => <div className="container quickaccess"><FilterResourcesByTagPage {...args} {...routerProps}/></div>}/>
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

const contextNoTag = {
  port: {
    request: () => []
  }
};
export const NoTags = Template.bind({});
NoTags.args = {
  context: defaultAppContext(contextNoTag)
};
NoTags.parameters = parameters;

const contextResourcesTags = {
  port: {
    request: path => mockResults[path]
  }
};
export const TagsResourcesMatched = Template.bind({});
TagsResourcesMatched.args = {
  context: defaultAppContext(contextResourcesTags)
};
TagsResourcesMatched.parameters = parameters;
