import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import DisplayLoginError from "./DisplayLoginError";


export default {
  title: 'Passbolt/AuthenticationLogin/DisplayLoginError',
  component: DisplayLoginError
};

const context = {
};


const Template = args =>
  <AuthenticationContext.Provider value={context}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <DisplayLoginError {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </AuthenticationContext.Provider>;


export const Initial = Template.bind({});
Initial.parameters = {
  css: "ext_authentication"
};
