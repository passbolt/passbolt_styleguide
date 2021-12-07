import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import DisplayUserAccountRecovery from "./DisplayUserAccountRecovery";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";


export default {
  title: "Passbolt/UserSetting/DisplayUserAccountRecovery",
  component: DisplayUserAccountRecovery
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayUserAccountRecovery {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;


const getTemplateArgs = () => ({
  context: {
    locale: "en-US",
    userSettings: {
      getTrustedDomain: () => "https://passbolt.local"
    }
  },
  requestor: {
    profile: {
      first_name: "Ada",
      last_name: "Lovelace"
    },
    gpgkey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
    }
  },
  date: "2021-05-25T09:08:34.123",
  accountRecovery: {
    status: "enabled"
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
