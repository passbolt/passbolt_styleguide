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
import ConfirmSaveAccountRecoverySettings from "./ConfirmSaveAccountRecoverySettings";
import {
  disabledPolicyProps, mandatoryPolicyPropsWithOrganisationKey,
  optInPolicyPropsWithOrganisationKey, optOutPolicyPropsWithOrganisationKey
} from "./ConfirmSaveAccountRecoverySettings.test.data";


export default {
  title: 'Components/Administration/ConfirmSaveAccountRecoverySettings',
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
