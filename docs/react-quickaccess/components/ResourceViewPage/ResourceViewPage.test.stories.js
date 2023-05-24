import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import ResourceViewPage from "./ResourceViewPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext} from "./ResourceViewPage.test.data";

export default {
  title: 'Components/QuickAccess/ResourceView',
  component: ResourceViewPage
};

const Template = ({context, initialEntries, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={initialEntries}>
      <Route path="/:id" component={routerProps => <div className="container quickaccess"><ResourceViewPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
  initialEntries: PropTypes.array
};

export const ResourceView = Template.bind({});
ResourceView.args = {
  context: defaultAppContext(),
  initialEntries: ['/8e3874ae-4b40-590b-968a-418f704b9d9a']
};
ResourceView.parameters = {
  css: "ext_quickaccess"
};
