import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ConfirmSaveAccountRecoverySettings from "./ConfirmSaveAccountRecoverySettings";
import {
  disabledPolicyProps, mandatoryPolicyPropsWithOrganisationKey,
  optInPolicyPropsWithOrganisationKey, optOutPolicyPropsWithOrganisationKey
} from "./ConfirmSaveAccountRecoverySettings.test.data";


export default {
  title: 'Passbolt/Administration/ConfirmSaveAccountRecoverySettings',
  component: ConfirmSaveAccountRecoverySettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ConfirmSaveAccountRecoverySettings {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Disabled = Template.bind({});
Disabled.args = disabledPolicyProps();

export const MandatoryWithOrganizationKey = Template.bind({});
MandatoryWithOrganizationKey.args = mandatoryPolicyPropsWithOrganisationKey();

export const OptInWithOrganizationKey = Template.bind({});
OptInWithOrganizationKey.args = optInPolicyPropsWithOrganisationKey();

export const OptOutWithOrganizationKey = Template.bind({});
OptOutWithOrganizationKey.args = optOutPolicyPropsWithOrganisationKey();
