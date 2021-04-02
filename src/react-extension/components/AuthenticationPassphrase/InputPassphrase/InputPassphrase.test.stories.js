import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import InputPassphrase from "./InputPassphrase";
import AppContext from "../../../contexts/AppContext";


export default {
  title: 'Passbolt/AuthenticationLogin/InputPassphrase',
  component: InputPassphrase
};

const context = {
  userSettings: {
    getTrustedDomain: () => 'some url',
    getSecurityTokenBackgroundColor: () => '#a85632',
    getSecurityTokenTextColor: () => '#ffffff',
    getSecurityTokenCode: () => "ABC",
  },
  siteSettings: {
    getRememberMeOptions: () => true
  }
};


const Template = args =>
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <InputPassphrase {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AppContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

