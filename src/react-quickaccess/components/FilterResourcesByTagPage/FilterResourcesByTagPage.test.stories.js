import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import PropTypes from "prop-types";
import FilterResourcesByTagPage from "./FilterResourcesByTagPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResults} from "./FilterResourcesByTagPage.test.data";

export default {
  title: 'Passbolt/QuickAccess/FilterResourcesByTag',
  component: FilterResourcesByTagPage
};

const Template = ({context, initialEntries, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={initialEntries}>
      <Route exact path="/" component={routerProps => <div className="container quickaccess"><FilterResourcesByTagPage {...args} {...routerProps}/></div>}/>
      <Route path="/:id" component={routerProps => <div className="container quickaccess"><FilterResourcesByTagPage {...args} {...routerProps}/></div>}/>
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

const contextNoTag = {
  port: {
    request: () => []
  }
};
export const NoTags = Template.bind({});
NoTags.args = {
  context: defaultAppContext(contextNoTag),
  initialEntries: ['/']
};

const contextResourcesTags = {
  port: {
    request: path => mockResults[path]
  }
};
export const TagsResourcesMatched = Template.bind({});
TagsResourcesMatched.args = {
  context: defaultAppContext(contextResourcesTags),
  initialEntries: ['/']
};
