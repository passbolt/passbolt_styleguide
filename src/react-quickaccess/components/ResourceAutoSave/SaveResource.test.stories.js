import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import SaveResource from "./SaveResource";
import {defaultProps, mockExtensionCall, mockExtensionCallWithTabInfo} from "./SaveResource.test.data";
import Header from "../Header/Header";
import AppContext from "../../../shared/context/AppContext/AppContext";
import {defaultAppContext} from "../../contexts/AppContext.test.data";

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
const initialAppContext = defaultAppContext();
mockExtensionCall(initialAppContext);
export const Initial = Template.bind({});
Initial.args = defaultProps({context: initialAppContext});
Initial.parameters = parameters;

const appContextWithTabInfo = defaultAppContext();
mockExtensionCallWithTabInfo(appContextWithTabInfo);
export const SaveResourceFromTab = Template.bind({});
SaveResourceFromTab.args = defaultProps({context: appContextWithTabInfo});
SaveResourceFromTab.parameters = parameters;
