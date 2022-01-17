import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import Login from "./Login";


export default {
  title: 'Passbolt/AuthenticationLogin/Login',
  component: Login
};

const context = {
  loginInfo: {
    userSettings: {
      getTrustedDomain: () => (new URL(window.location.href)).origin,
      getSecurityTokenBackgroundColor: () => '#a85632',
      getSecurityTokenTextColor: () => '#ffffff',
      getSecurityTokenCode: () => "ABC"
    }
  }
};


const Template = args =>
  <AuthenticationContext.Provider value={context}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <Login {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </AuthenticationContext.Provider>;


export const Initial = Template.bind({});
Initial.parameters = {
  css: "ext_authentication"
};
