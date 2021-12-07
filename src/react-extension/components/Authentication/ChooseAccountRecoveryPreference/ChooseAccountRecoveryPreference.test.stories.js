import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_authentication.css";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChooseAccountRecoveryPreference from "./ChooseAccountRecoveryPreference";


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



export const RecommendedWithLink = Template.bind({});
RecommendedWithLink.args = {
  type: 'Recommended',
  canGenerateKey: true
};

export const OptionalWithLink = Template.bind({});
OptionalWithLink.args = {
  type: 'Optional',
  canGenerateKey: true
};

export const MandatoryWithLink = Template.bind({});
MandatoryWithLink.args = {
  type: 'Mandatory',
  canGenerateKey: true
};

export const RecommendedWithoutLink = Template.bind({});
RecommendedWithoutLink.args = {
  type: 'Recommended',
  canGenerateKey: false
};

export const OptionalWithoutLink = Template.bind({});
OptionalWithoutLink.args = {
  type: 'Optional',
  canGenerateKey: false
};

export const MandatoryWithoutLink = Template.bind({});
MandatoryWithoutLink.args = {
  type: 'Mandatory',
  canGenerateKey: false
};
