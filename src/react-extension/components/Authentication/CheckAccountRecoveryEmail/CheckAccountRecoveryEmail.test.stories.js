import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import CheckAccountRecoveryEmail from "./CheckAccountRecoveryEmail";


export default {
  title: 'Passbolt/Authentication/CheckAccountRecoveryEmail',
  component: CheckAccountRecoveryEmail
};

const Template = args =>
  <div id="container" className="container page login">
    <div className="content">
      <div className="login-form">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <CheckAccountRecoveryEmail {...args} {...routerProps}/>}/>
        </MemoryRouter>
      </div>
    </div>
  </div>;

export const Initial = Template.bind({});

Initial.parameters = {
  css: "ext_authentication"
};
