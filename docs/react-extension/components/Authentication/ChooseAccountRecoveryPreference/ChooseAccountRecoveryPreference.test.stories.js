/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChooseAccountRecoveryPreference from "./ChooseAccountRecoveryPreference";
import {
  mandatoryPolicyProps,
  mandatoryPolicyPropsWithImportedKey, optInPolicyProps,
  optInPolicyPropsWithImportedKey, optOutPolicyProps, optOutPolicyPropsWithImportedKey
} from "./ChooseAccountRecoveryPreference.test.data";


export default {
  title: 'Components/Authentication/ChooseAccountRecoveryPreference',
  component: ChooseAccountRecoveryPreference
};

const Template = args =>
  <MockTranslationProvider>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <ChooseAccountRecoveryPreference {...args} {...routerProps}/>}/>
          </MemoryRouter>
        </div>
      </div>
    </div>
  </MockTranslationProvider>;

const defaultParameters = {
  css: "ext_authentication"
};

export const MandatoryWithLink = Template.bind({});
MandatoryWithLink.args = mandatoryPolicyPropsWithImportedKey();
MandatoryWithLink.parameters = defaultParameters;

export const OptOutWithLink = Template.bind({});
OptOutWithLink.args = optOutPolicyPropsWithImportedKey();
OptOutWithLink.parameters = defaultParameters;

export const OptInWithLink = Template.bind({});
OptInWithLink.args = optInPolicyPropsWithImportedKey();
OptInWithLink.parameters = defaultParameters;

export const Mandatory = Template.bind({});
Mandatory.args = mandatoryPolicyProps();
Mandatory.parameters = defaultParameters;

export const OptOut = Template.bind({});
OptOut.args = optOutPolicyProps();
OptOut.parameters = defaultParameters;

export const OptIn = Template.bind({});
OptIn.args = optInPolicyProps();
OptIn.parameters = defaultParameters;
