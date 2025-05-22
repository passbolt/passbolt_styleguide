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
import DisplayUsersContextualMenu from "./DisplayUsersContextualMenu";
import {
  defaultAppContext,
  defaultProps,
  propsWithUserTemporaryHasPendingAccountRecovery
} from "./DisplayUsersContextualMenu.test.data";


export default {
  title: 'Components/User/DisplayUsersContextualMenu',
  component: DisplayUsersContextualMenu,
  decorators: [
    (Story, args) =>
      <MockTranslationProvider>
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <Story {...args} {...routerProps}/>}></Route>
        </MemoryRouter>
      </MockTranslationProvider>
  ],
};

export const AdminWithoutReviewRecovery = {
  args: defaultProps({context: defaultAppContext()})
};

export const AdminWithReviewRecovery = {
  args: propsWithUserTemporaryHasPendingAccountRecovery({context: defaultAppContext()})
};

export const User = {
  args: defaultProps({
    context: defaultAppContext({
      loggedInUser: {
        role: {
          name: 'user',
        },
      },
    }),
  }),
};
