import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import InputPassphrase from "./InputPassphrase";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";


export default {
  title: 'Components/AuthenticationPassphrase/InputPassphrase',
  component: InputPassphrase
};

const context = {
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin,
    getSecurityToken: () => ({backgroundColor: '#a85632', code: "ABC", textColor: '#ffffff'}),
  },
  siteSettings: new SiteSettings(siteSettingsFixture)
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <InputPassphrase {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
