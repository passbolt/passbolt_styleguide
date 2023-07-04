import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from "./HomePage";
import {
  loadingProps, noResourcesProps, searchNoResultProps, searchWithResultProps, suggestedResourcesProps
} from "./HomePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/Home',
  component: HomePage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><HomePage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const Initial = Template.bind({});
Initial.args = loadingProps();
Initial.parameters = parameters;

export const NoResource = Template.bind({});
NoResource.args = noResourcesProps();
NoResource.parameters = parameters;

export const NoFoundResource = Template.bind({});
NoFoundResource.args = searchNoResultProps();
NoFoundResource.parameters = parameters;

export const SearchResources = Template.bind({});
SearchResources.args = searchWithResultProps();
SearchResources.parameters = parameters;

export const SuggestedResources = Template.bind({});
SuggestedResources.args = suggestedResourcesProps();
SuggestedResources.parameters = parameters;
