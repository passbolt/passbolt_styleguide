/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */

import React from "react";
import DisplaySsoProviderMismatchError from "./DisplaySsoProviderMismatchError";
import {defaultProps} from "./DisplaySsoProviderMismatchError.test.data";

export default {
  title: 'Components/Authentication/DisplaySsoProviderMismatchError',
  component: DisplaySsoProviderMismatchError
};

const Template = args =>
  <div id="container" className="container page login">
    <div className="content">
      <div className="login-form">
        <DisplaySsoProviderMismatchError {...args}/>
      </div>
    </div>
  </div>
;

export const Initial = Template.bind({});
Initial.args = defaultProps();
Initial.parameters = {
  css: "ext_authentication"
};
