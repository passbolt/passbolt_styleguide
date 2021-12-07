import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ProvideOrganizationKey from "./ProvideOrganizationKey";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";


export default {
  title: 'Passbolt/Administration/ProvideOrganizationKey',
  component: ProvideOrganizationKey
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ProvideOrganizationKey {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = {
  context: {
    userSettings: new UserSettings(userSettingsFixture),
  },
  onClose: () => {}
};



