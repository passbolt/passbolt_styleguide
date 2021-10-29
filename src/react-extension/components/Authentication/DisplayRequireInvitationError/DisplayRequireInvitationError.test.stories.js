import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import DisplayRequireInvitationError from "./DisplayRequireInvitationError";


export default {
  title: 'Passbolt/Authentication/DisplayRequireInvitationError',
  component: DisplayRequireInvitationError
};

const context = {
};


const Template = args =>
  <AuthenticationContext.Provider value={context}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <DisplayRequireInvitationError {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </AuthenticationContext.Provider>;


export const Initial = Template.bind({});
