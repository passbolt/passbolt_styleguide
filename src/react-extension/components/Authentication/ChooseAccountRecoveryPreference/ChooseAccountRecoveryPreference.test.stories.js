import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChooseAccountRecoveryPreference from "./ChooseAccountRecoveryPreference";
import {
  mandatoryPolicyProps,
  mandatoryPolicyPropsWithImportedKey, optInPolicyProps,
  optInPolicyPropsWithImportedKey, optOutPolicyProps, optOutPolicyPropsWithImportedKey
} from "./ChooseAccountRecoveryPreference.test.data";


export default {
  title: 'Passbolt/Authentication/ChooseAccountRecoveryPreference',
  component: ChooseAccountRecoveryPreference
};


const Template = args =>
  <MockTranslationProvider>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <ChooseAccountRecoveryPreference {...args} {...routerProps}/>}></Route>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </MockTranslationProvider>;

export const MandatoryWithLink = Template.bind({});
MandatoryWithLink.args = mandatoryPolicyPropsWithImportedKey();

export const OptOutWithLink = Template.bind({});
OptOutWithLink.args = optOutPolicyPropsWithImportedKey();

export const OptInWithLink = Template.bind({});
OptInWithLink.args = optInPolicyPropsWithImportedKey();

export const Mandatory = Template.bind({});
Mandatory.args = mandatoryPolicyProps();

export const OptOut = Template.bind({});
OptOut.args = optOutPolicyProps();

export const OptIn = Template.bind({});
OptIn.args = optInPolicyProps();
