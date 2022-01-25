import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";


export default {
  title: "Passbolt/UserSetting/DisplayAccountRecoveryUserSettings",
  component: DisplayAccountRecoveryUserSettings
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayAccountRecoveryUserSettings {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;


const getTemplateArgs = () => ({
  context: {
    locale: "en-US",
    userSettings: {
      getTrustedDomain: () => new URL(window.location).origin
    }
  },
  accountRecovery: {
    status: "enabled",
    requestor: {
      profile: {
        first_name: "Ada",
        last_name: "Lovelace"
      },
      gpgkey: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
      }
    },
    requestedDate: "2021-05-25T09:08:34.123"
  }
});

export const Enabled = Template.bind({});
Enabled.args = getTemplateArgs();

export const Pending = Template.bind({});
Pending.args = getTemplateArgs();
Pending.args.accountRecovery.status = "pending";

export const Disabled = Template.bind({});
Disabled.args = getTemplateArgs();
Disabled.args.accountRecovery.status = "disabled";
