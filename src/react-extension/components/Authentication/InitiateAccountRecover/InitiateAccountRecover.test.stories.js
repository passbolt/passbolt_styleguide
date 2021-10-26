import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import InitiateRecoverAccount from "./InitiateAccountRecover";


export default {
  title: 'Passbolt/Authentication/InitiateRecoverAccount',
  component: InitiateRecoverAccount
};


const Template = args =>
  <MockTranslationProvider>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <InitiateRecoverAccount {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

