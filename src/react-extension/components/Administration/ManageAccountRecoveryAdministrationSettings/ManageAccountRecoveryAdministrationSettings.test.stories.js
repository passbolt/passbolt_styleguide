import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import {
  mockAccountRecoveryDisableWithOrganisationKey,
  mockAccountRecoveryEmpty,
  mockAccountRecoveryMandatory,
  mockAccountRecoveryMandatoryWithOrganisationKey,
  mockAccountRecoveryOptIn, mockAccountRecoveryOptInWithOrganisationKey,
  mockAccountRecoveryOptOut, mockAccountRecoveryOptOutWithOrganisationKey
} from "./ManageAccountRecoveryAdministrationSettings.test.data";

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
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryEmpty
    }
  },
};

export const Mandatory = Template.bind({});
Mandatory.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryMandatory
    }
  }
};

export const OptOut = Template.bind({});
OptOut.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptOut
    }
  }
};

export const OptIn = Template.bind({});
OptIn.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptIn
    }
  }
};

export const DefaultWithOrganisationRecoveryKey = Template.bind({});
DefaultWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryDisableWithOrganisationKey
    }
  }
};

export const MandatoryWithOrganisationRecoveryKey = Template.bind({});
MandatoryWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryMandatoryWithOrganisationKey
    }
  }
};

export const OptOutWithOrganisationRecoveryKey = Template.bind({});
OptOutWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptOutWithOrganisationKey
    }
  }
};

export const OptInWithOrganisationRecoveryKey = Template.bind({});
OptInWithOrganisationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptInWithOrganisationKey
    }
  }
};
