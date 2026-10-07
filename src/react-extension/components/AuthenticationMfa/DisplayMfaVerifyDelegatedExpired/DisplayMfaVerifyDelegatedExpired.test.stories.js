/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.17.0
 */

import React from "react";
import DisplayMfaVerifyDelegatedExpired from "./DisplayMfaVerifyDelegatedExpired";
import { ApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import { defaultProps } from "./DisplayMfaVerifyDelegatedExpired.test.data";

export default {
  title: "Components/AuthenticationMfa/DisplayMfaVerifyDelegatedExpired",
  component: DisplayMfaVerifyDelegatedExpired,
  decorators: [
    (Story, { args }) => (
      <div id="container" className="container page login">
        <div className="content">
          <div className="login-form">
            <ApiMfaVerifyContext.Provider value={args.apiMfaVerifyContext}>
              <Story {...args} />
            </ApiMfaVerifyContext.Provider>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    css: "ext_authentication",
  },
};

export const Default = {
  args: defaultProps(),
};
