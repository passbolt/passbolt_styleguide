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
import DisplayAlreadyLoggedInError, {DisplayAlreadyLoggedInErrorVariations} from "./DisplayAlreadyLoggedInError";

export default {
  title: 'Components/Authentication/DisplayAlreadyLoggedInError',
  component: DisplayAlreadyLoggedInError
};

const Template = args =>
  <div id="container" className="container page login">
    <div className="content">
      <div className="login-form">
        <MemoryRouter initialEntries={['/']}>
          <Route component={routerProps => <DisplayAlreadyLoggedInError {...args} {...routerProps}/>}/>
        </MemoryRouter>
      </div>
    </div>
  </div>;

const defaultParameters = {
  css: "ext_authentication"
};

const logoutCallback = () => { console.log("Trigger log out"); };

export const Setup = Template.bind({});
Setup.args = {
  onLogoutButtonClick: logoutCallback,
  displayAs: DisplayAlreadyLoggedInErrorVariations.SETUP
};
Setup.parameters = defaultParameters;

export const Recover = Template.bind({});
Recover.args = {
  onLogoutButtonClick: logoutCallback,
  displayAs: DisplayAlreadyLoggedInErrorVariations.RECOVER
};
Recover.parameters = defaultParameters;

export const AccountRecovery = Template.bind({});
AccountRecovery.args = {
  onLogoutButtonClick: logoutCallback,
  displayAs: DisplayAlreadyLoggedInErrorVariations.ACCOUNT_RECOVERY
};
AccountRecovery.parameters = defaultParameters;
