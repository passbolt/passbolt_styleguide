import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import SetupExtensionInProgress from "./SetupExtensionInProgress";
import Header from "../../Header/Header";

export default {
  title: 'Components/QuickAccess/SetupExtensionInProgress',
  component: SetupExtensionInProgress
};

const Template = () =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <div className="container quickaccess"><Header/><SetupExtensionInProgress {...routerProps}/></div>}/>
  </MemoryRouter>;


export const Initial = Template.bind({});
Initial.args = {
};

Initial.parameters = {
  css: "ext_quickaccess"
};
