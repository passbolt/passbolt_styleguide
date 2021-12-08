import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import {
  mockAccountRecoveryDisableWithOrganizationKey,
  mockAccountRecoveryEmpty,
  mockAccountRecoveryMandatory,
  mockAccountRecoveryMandatoryWithOrganizationKey,
  mockAccountRecoveryOptIn, mockAccountRecoveryOptInWithOrganizationKey,
  mockAccountRecoveryOptOut, mockAccountRecoveryOptOutWithOrganizationKey
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

export const DefaultWithOrganizationRecoveryKey = Template.bind({});
DefaultWithOrganizationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryDisableWithOrganizationKey
    }
  }
};

export const MandatoryWithOrganizationRecoveryKey = Template.bind({});
MandatoryWithOrganizationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryMandatoryWithOrganizationKey
    }
  }
};

export const OptOutWithOrganizationRecoveryKey = Template.bind({});
OptOutWithOrganizationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptOutWithOrganizationKey
    }
  }
};

export const OptInWithOrganizationRecoveryKey = Template.bind({});
OptInWithOrganizationRecoveryKey.args = {
  context: {
    locale: 'en-US',
    port: {
      request: () => mockAccountRecoveryOptInWithOrganizationKey
    }
  }
};
