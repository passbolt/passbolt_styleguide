import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "./DownloadRecoveryKit";


export default {
  title: 'Passbolt/Authentication/DownloadRecoveryKit',
  component: DownloadRecoveryKit
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
              <Route component={routerProps => <DownloadRecoveryKit {...args} {...routerProps}/>}></Route>
            </MemoryRouter>
          </div>
        </div>
      </div>
    </AuthenticationContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

