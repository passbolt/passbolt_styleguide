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
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {users} from "../../../../shared/models/entity/user/userEntity.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAccountRecoveryPolicyDto} from "./DisplayAccountRecoveryUserSettings.test.data";

export default {
  title: "Components/UserSetting/DisplayAccountRecoveryUserSettings",
  component: DisplayAccountRecoveryUserSettings
};


const Template = args =>
  <MockTranslationProvider>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayAccountRecoveryUserSettings {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </MockTranslationProvider>;


const getTemplateArgs = () => ({
  context: defaultAppContext(),
  accountRecoveryContext: {
    status: "approved",
    isReady: () => true,
    loadAccountRecoveryPolicy: () => {},
    getPolicy: () => ({
      policy: "opt-out",
    }),
    getRequestor: () => ({
      ...users.ada,
      gpgkey: {
        fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
      }
    }),
    getRequestedDate: () => "2021-05-25T09:08:34.123",
    getOrganizationPolicy: () => defaultAccountRecoveryPolicyDto()
  }
});

export const Enabled = Template.bind({});
Enabled.args = getTemplateArgs();

export const Pending = Template.bind({});
Pending.args = getTemplateArgs();
Pending.args.accountRecoveryContext.status = "pending";

export const Disabled = Template.bind({});
Disabled.args = getTemplateArgs();
Disabled.args.accountRecoveryContext.status = "rejected";
