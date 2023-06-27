import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import SaveResource from "./SaveResource";
import {defaultAppContext, mockResults} from "./SaveResource.test.data";
import Header from "../Header/Header";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/SaveResource',
  component: SaveResource
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><Header/><SaveResource {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
};
Initial.parameters = parameters;

const contextMock = {
  port: {
    request: path => mockResults[path]
  },
};
export const SaveResourceFromTab = Template.bind({});
SaveResourceFromTab.args = {
  context: defaultAppContext(contextMock)
};
SaveResourceFromTab.parameters = parameters;
