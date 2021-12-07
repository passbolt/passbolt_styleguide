import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ChooseAccountRecoveryPolicy from "./ChooseAccountRecoveryPolicy";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";


export default {
  title: 'Passbolt/AccountRecovery/ChooseAccountRecoveryPolicy',
  component: ChooseAccountRecoveryPolicy
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ChooseAccountRecoveryPolicy {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;

export const OptOut = Template.bind({});
OptOut.args = {
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
  type: "Opt-Out",
  date: "2021-05-25T09:08:34.123",
  onClose: () => {}
};

export const OptIn = Template.bind({});
OptIn.args = {
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
  type: "Opt-In",
  date: "2021-05-25T09:08:34.123",
  onClose: () => {}
};

export const Mandatory = Template.bind({});
Mandatory.args = {
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
  type: "Mandatory",
  date: "2021-05-25T09:08:34.123",
  onClose: () => {}
};
