/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import DisplayUnexpectedError from "./DisplayUnexpectedError";
import {
  defaultProps,
  passboltApiFetchErrorProps,
  passboltEntityValidationErrorProps
} from "./DisplayUnexpectedError.test.data";

export default {
  title: 'Components/Authentication/DisplayUnexpectedError',
  component: DisplayUnexpectedError,
  decorators: [(Story, {args}) =>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={['/']}>
            <Route component={routerProps => <Story {...args} {...routerProps}/>}/>
          </MemoryRouter>
        </div>
      </div>
    </div>
  ],
  parameters: {
    css: "ext_authentication"
  }
};


export const Initial = {
  args: defaultProps()
};

export const SignInError = {
  args: defaultProps({
    title: "Sorry, you have not been signed in.",
    message: "Something went wrong, the sign in failed with the following error",
  })
};

export const ErrorWithData = {
  args: passboltApiFetchErrorProps()
};

export const ErrorWithDetails = {
  args: passboltEntityValidationErrorProps()
};
