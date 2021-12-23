import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import {
  disabledPolicyProps, disabledPolicyPropsWithOrganisationKey,
  mandatoryPolicyProps, mandatoryPolicyPropsWithOrganisationKey, optInPolicyProps, optInPolicyPropsWithOrganisationKey,
  optOutPolicyProps, optOutPolicyPropsWithOrganisationKey
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
Default.args = disabledPolicyProps();

export const Mandatory = Template.bind({});
Mandatory.args = mandatoryPolicyProps();

export const OptOut = Template.bind({});
OptOut.args = optOutPolicyProps();

export const OptIn = Template.bind({});
OptIn.args = optInPolicyProps();

export const DefaultWithOrganisationRecoveryKey = Template.bind({});
DefaultWithOrganisationRecoveryKey.args = disabledPolicyPropsWithOrganisationKey();

export const MandatoryWithOrganisationRecoveryKey = Template.bind({});
MandatoryWithOrganisationRecoveryKey.args = mandatoryPolicyPropsWithOrganisationKey();

export const OptOutWithOrganisationRecoveryKey = Template.bind({});
OptOutWithOrganisationRecoveryKey.args = optOutPolicyPropsWithOrganisationKey();

export const OptInWithOrganisationRecoveryKey = Template.bind({});
OptInWithOrganisationRecoveryKey.args = optInPolicyPropsWithOrganisationKey();
