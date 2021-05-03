import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import ChooseSecurityToken from "./ChooseSecurityToken";


export default {
  title: 'Passbolt/Authentication/ChooseSecurityToken',
  component: ChooseSecurityToken
};

const context = {
};


const Template = args =>
  <MockTranslationProvider>
    <AuthenticationContext.Provider value={context}>
      <div id="container" className="container page login">
        <div className="content">
          <div className="login-form">
            <MemoryRouter initialEntries={['/']}>
              <Route component={routerProps => <ChooseSecurityToken {...args} {...routerProps}/>}></Route>
            </MemoryRouter>
          </div>
        </div>
      </div>
    </AuthenticationContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

