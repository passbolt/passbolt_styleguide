import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import FilterResourcesByItemsIOwnPage from "./FilterResourcesByItemsIOwnPage";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext, mockResources} from "./FilterResourcesByItemsIOwnPage.test.data";


export default {
  title: 'Components/QuickAccess/FilterResourcesByItemsIOwn',
  component: FilterResourcesByItemsIOwnPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><FilterResourcesByItemsIOwnPage {...args} {...routerProps}/></div>}/>
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

const contextNoItem = {
  port: {
    request: () => []
  }
};
export const NoItemsIOwnResource = Template.bind({});
NoItemsIOwnResource.args = {
  context: defaultAppContext(contextNoItem)
};
NoItemsIOwnResource.parameters = parameters;

const contextResources = {
  port: {
    request: () => mockResources
  }
};
export const ItemsIOwnResources = Template.bind({});
ItemsIOwnResources.args = {
  context: defaultAppContext(contextResources)
};
ItemsIOwnResources.parameters = parameters;
