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
 * @since         3.1.0
 */

import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ChangeUserSecurityToken from "./ChangeUserSecurityToken";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

export default {
  title: 'Components/UserSetting/ChangeUserSecurityToken',
  component: ChangeUserSecurityToken,
  decorators: [(Story, {args}) =>
    <AppContext.Provider value={args.context}>
      <div id="container" className="page settings">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="main-page">
                    <Story {...args}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  ]
};

export const Initial = {
  args: {
    context: defaultAppContext({
      userSettings: {
        getSecurityToken: () => ({
          code: "ABC",
          backgroundColor: '#8bc34a'
        }),
      },
    }),
  },
};
