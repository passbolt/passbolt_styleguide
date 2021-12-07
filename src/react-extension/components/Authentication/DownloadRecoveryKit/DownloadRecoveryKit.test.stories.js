import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "./DownloadRecoveryKit";


export default {
  title: 'Passbolt/Authentication/DownloadRecoveryKit',
  component: DownloadRecoveryKit
};

const context = {
};


const Template = args =>
  <AuthenticationContext.Provider value={context}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <DownloadRecoveryKit {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </AuthenticationContext.Provider>;


export const Initial = Template.bind({});
Initial.parameters = {
  css: "ext_authentication"
};
