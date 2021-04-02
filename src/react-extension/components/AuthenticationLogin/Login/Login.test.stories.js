import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import Login from "./Login";


export default {
  title: 'Passbolt/AuthenticationLogin/Login',
  component: Login
};

const context = {
  loginInfo: {
    userSettings: {
      getTrustedDomain: () => 'some url',
      getSecurityTokenBackgroundColor: () => '#a85632',
      getSecurityTokenTextColor: () => '#ffffff',
      getSecurityTokenCode: () => "ABC"
    }
  }
};


const Template = args =>
  <MockTranslationProvider>
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
    </AuthenticationContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

