import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";

export default {
  title: 'Passbolt/Administration/ManageAccountRecoveryAdministrationSettings',
  component: ManageAccountRecoveryAdministrationSettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <div className="panel main">
      <div className="panel middle">
        <div className="workspace-main">
          <div className="grid grid-responsive-12">
            <Route component={routerProps => <ManageAccountRecoveryAdministrationSettings {...args} {...routerProps}/>}></Route>
          </div>
        </div>
      </div>
    </div>
  </MemoryRouter>;

export const Default = Template.bind({});
Default.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Disable',
  }
};

export const Mandatory = Template.bind({});
Mandatory.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Mandatory',
  }
};

export const OptOut = Template.bind({});
OptOut.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Opt-out',
  }
};

export const OptIn = Template.bind({});
OptIn.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Opt-in',
  }
};

export const DefaultWithOrganisationRecoveryKey = Template.bind({});
DefaultWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Disable',
    organisationRecoveryKey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      algorithm: "RSA",
      keyLength: 4096,
      created: "2021-08-05T02:50:34.12",
      expires: "Never"
    }
  }
};

export const MandatoryWithOrganisationRecoveryKey = Template.bind({});
MandatoryWithOrganisationRecoveryKey.args = {
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

export const OptOutWithOrganisationRecoveryKey = Template.bind({});
OptOutWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Opt-out',
    organisationRecoveryKey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      algorithm: "RSA",
      keyLength: 4096,
      created: "2021-08-05T02:50:34.12",
      expires: "Never"
    }
  }
};

export const OptInWithOrganisationRecoveryKey = Template.bind({});
OptInWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US'
  },
  accountRecovery: {
    policy: 'Opt-in',
    organisationRecoveryKey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      algorithm: "RSA",
      keyLength: 4096,
      created: "2021-08-05T02:50:34.12",
      expires: "Never"
    }
  }
};
