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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserWorkspaceActions from "./DisplayUserWorkspaceActions";
import {
  defaultAppContext,
  propsWithSelectedUser,
  propsWithSelectedUserTemporaryHasPendingAccountRecovery
} from "./DisplayUserWorkspaceActions.test.data";


export default {
  title: 'Components/User/DisplayUserWorkspaceActions',
  component: DisplayUserWorkspaceActions
};


const Template = args =>
  <MockTranslationProvider>
    <div className="header third">
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <DisplayUserWorkspaceActions {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </div>
  </MockTranslationProvider>;

export const AdminWithoutReviewRecovery = Template.bind({});
AdminWithoutReviewRecovery.args = Object.assign(propsWithSelectedUser(), {context: defaultAppContext()});

export const AdminWithReviewRecovery =  Template.bind({});
AdminWithReviewRecovery.args = Object.assign(propsWithSelectedUserTemporaryHasPendingAccountRecovery(), {context: defaultAppContext()});

export const User = Template.bind({});
const userRole = {
  loggedInUser: {
    role: {
      name: 'user'
    }
  },
};
User.args = Object.assign(propsWithSelectedUser, {context: defaultAppContext(userRole)});
