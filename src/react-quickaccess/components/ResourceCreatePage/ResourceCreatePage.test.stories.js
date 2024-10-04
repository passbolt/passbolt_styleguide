import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import ResourceCreatePage from "./ResourceCreatePage";
import {defaultProps, mockResults} from "./ResourceCreatePage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";
import {defaultAppContext} from "../../contexts/AppContext.test.data";

export default {
  title: 'Components/QuickAccess/ResourceCreate',
  component: ResourceCreatePage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><ResourceCreatePage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

const parameters = {
  css: "ext_quickaccess"
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
Initial.parameters = parameters;

const contextMock = {
  port: {
    request: path => mockResults[path]
  },
};
export const CreateResourceFromTab = Template.bind({});
CreateResourceFromTab.args = defaultProps({context: defaultAppContext(contextMock)});
CreateResourceFromTab.parameters = parameters;
