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
import { MemoryRouter, Route } from "react-router-dom";
import ManageAccountRecoveryUserSettings from "./ManageAccountRecoveryUserSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import { defaultProps } from "./ManageAccountRecoveryUserSettings.test.data";
import { users } from "../../../../shared/models/entity/user/userEntity.test.data";
import {
  defaultAccountRecoveryPolicyCreator,
  optOutOrganizationPolicy,
} from "../HandleAccountRecoveryUserSettingsRoute/HandleAccountRecoveryUserSettingsRoute.test.data";

export default {
  title: "Components/AccountRecovery/ManageAccountRecoveryUserSettings",
  component: ManageAccountRecoveryUserSettings,
};

const Template = (args) => (
  <MockTranslationProvider>
    <MemoryRouter initialEntries={["/"]}>
      <Route component={(routerProps) => <ManageAccountRecoveryUserSettings {...args} {...routerProps} />}></Route>
    </MemoryRouter>
  </MockTranslationProvider>
);

export const OptOut = Template.bind({});
OptOut.args = defaultProps({
  organizationPolicy: optOutOrganizationPolicy({
    creator: defaultAccountRecoveryPolicyCreator({ ...users.ada }),
  }),
});

export const OptIn = Template.bind({});
OptIn.args = defaultProps({
  organizationPolicy: optOutOrganizationPolicy({
    policy: "opt-in",
    creator: defaultAccountRecoveryPolicyCreator({ disabled: new Date().toISOString() }),
  }),
});

export const Mandatory = Template.bind({});
Mandatory.args = defaultProps({
  organizationPolicy: optOutOrganizationPolicy({
    policy: "mandatory",
    creator: defaultAccountRecoveryPolicyCreator({ deleted: true }),
  }),
});
