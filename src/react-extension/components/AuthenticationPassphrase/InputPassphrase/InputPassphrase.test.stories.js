import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
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
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <InputPassphrase {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
