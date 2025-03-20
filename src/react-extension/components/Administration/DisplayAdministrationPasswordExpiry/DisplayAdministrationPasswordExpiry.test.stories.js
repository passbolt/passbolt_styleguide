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
 * @since         4.4.0
 */

import React from "react";
import {defaultPropsCE, defaultPropsPro} from "./DisplayAdministrationPasswordExpiry.test.data";
import AdministrationPasswordExpiryContextProvider from "../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import DisplayAdministrationPasswordExpiry from "./DisplayAdministrationPasswordExpiry";

export default {
  title: 'Components/Administration/DisplayAdministrationPasswordExpiry',
  component: DisplayAdministrationPasswordExpiry,
  decorators: [(Story, {args}) =>
    <div className="page administration">
      <div className="app" >
        <div className="panel main">
          <div className="panel middle">
            <div className="middle-right">
              <div className="main-page">
                <AdministrationPasswordExpiryContextProvider {...args}>
                  <Story {...args}/>
                </AdministrationPasswordExpiryContextProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ]
};

export const ProVersion = {
  args: defaultPropsPro(),
};


export const CeVersion = {
  args: defaultPropsCE(),
};
