import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import SaveAccountRecoverySettings from "./SaveAccountRecoverySettings";


export default {
  title: 'Passbolt/Administration/SaveAccountRecoverySettings',
  component: SaveAccountRecoverySettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <SaveAccountRecoverySettings {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Mandatory = Template.bind({});
Mandatory.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Mandatory',
  }
};

export const MandatoryWithOrganisationKey = Template.bind({});
MandatoryWithOrganisationKey.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Mandatory',
    organisationRecoveryKey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      algorithm: "RSA",
      keyLength: 4096,
      created: "2021-08-05T02:50:34.12",
      expires: "Never"
    }
  }
};

export const OrganisationRecoveryKey = Template.bind({});
OrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    organisationRecoveryKey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      algorithm: "RSA",
      keyLength: 4096,
      created: "2021-08-05T02:50:34.12",
      expires: "Never"
    }
  }
};
