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
 * @since         3.2.0
 */

import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import GeneratePasswordPage from "./GeneratePasswordPage";
import {defaultPrepareResourceContext} from "../../contexts/PrepareResourceContext.test.data";

export default {
  title: 'Components/QuickAccess/GeneratePasswordPage',
  component: GeneratePasswordPage
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <div className="container quickaccess"><GeneratePasswordPage {...args} {...routerProps}/></div>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});
Initial.args = {
  prepareResourceContext: defaultPrepareResourceContext(),
  onClose: () => {},
  t: text => text
};

Initial.parameters = {
  css: "ext_quickaccess"
};
