import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ProvideAccountRecoveryOrganizationKey from "./ProvideAccountRecoveryOrganizationKey";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";


export default {
  title: 'Passbolt/Administration/ProvideAccountRecoveryOrganizationKey',
  component: ProvideAccountRecoveryOrganizationKey
};


const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ProvideAccountRecoveryOrganizationKey {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = {
  context: {
    userSettings: new UserSettings(userSettingsFixture),
  },
  onClose: () => {}
};



