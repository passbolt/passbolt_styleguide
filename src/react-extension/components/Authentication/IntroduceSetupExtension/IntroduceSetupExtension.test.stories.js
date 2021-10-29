import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import IntroduceSetupExtension from "./IntroduceSetupExtension";


export default {
  title: 'Passbolt/Authentication/IntroduceSetupExtension',
  component: IntroduceSetupExtension
};

const context = {
  onCompletedIntroduceSetupExtension: jest.fn()
};


const Template = args =>
  <AuthenticationContext.Provider value={context}>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <IntroduceSetupExtension {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </AuthenticationContext.Provider>;


export const Initial = Template.bind({});
