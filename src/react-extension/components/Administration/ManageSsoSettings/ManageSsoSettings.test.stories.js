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
import ManageSsoSettings from "./ManageSsoSettings";
import {disabledSso, azureConfiguredSso} from "./ManageSsoSettings.test.data";

export default {
  title: 'Components/Administration/ManageSsoSettings',
  component: ManageSsoSettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <div className="panel main">
      <div className="panel middle">
        <div className="grid grid-responsive-12">
          <Route component={routerProps => <ManageSsoSettings {...args} {...routerProps}/>}></Route>
        </div>
      </div>
    </div>
  </MemoryRouter>;

export const Default = Template.bind({});
Default.args = disabledSso();

export const Azure = Template.bind({});
Azure.args = azureConfiguredSso();
