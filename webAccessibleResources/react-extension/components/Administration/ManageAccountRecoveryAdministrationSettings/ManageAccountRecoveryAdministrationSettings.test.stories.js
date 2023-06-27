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

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import {
  disabledPolicyProps, disabledPolicyPropsWithOrganisationKey,
  mandatoryPolicyProps, mandatoryPolicyPropsWithOrganisationKey, optInPolicyProps, optInPolicyPropsWithOrganisationKey,
  optOutPolicyProps, optOutPolicyPropsWithOrganisationKey
} from "./ManageAccountRecoveryAdministrationSettings.test.data";

export default {
  title: 'Components/Administration/ManageAccountRecoveryAdministrationSettings',
  component: ManageAccountRecoveryAdministrationSettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <div className="panel main">
      <div className="panel middle">
        <div className="grid grid-responsive-12">
          <Route component={routerProps => <ManageAccountRecoveryAdministrationSettings {...args} {...routerProps}/>}></Route>
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
