import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContext";
import SaveResource from "./SaveResource";
import {defaultAppContext, mockResults} from "./SaveResource.test.data";
import Header from "../Header/Header";

export default {
  title: 'Passbolt/QuickAccess/SaveResource',
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



export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
};

const contextMock = {
  port: {
    request: path => mockResults[path]
  },
};
export const SaveResourceFromTab = Template.bind({});
SaveResourceFromTab.args = {
  context: defaultAppContext(contextMock)
};



