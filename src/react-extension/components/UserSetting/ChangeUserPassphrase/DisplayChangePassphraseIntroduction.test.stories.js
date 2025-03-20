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
import {defaultProps} from "./DisplayChangePassphraseIntroduction.test.data";
import DisplayChangePassphraseIntroduction from "./DisplayChangePassphraseIntroduction";
import DisplayChangePassphraseIntroductionHelp from "./DisplayChangePassphraseIntroductionHelp";

export default {
  title: 'Components/UserSetting/DisplayChangePassphraseIntroduction',
  component: DisplayChangePassphraseIntroduction,
  decorators: [(Story, {args}) =>
    <div id="container" className="page settings">
      <div id="app" className="app" tabIndex="1000" style={{margin: "-1rem"}}>
        <div className="panel main">
          <div className="panel left">
            <div className="sidebar-content">
            </div>
          </div>
          <div className="panel middle">
            <div className="header">
            </div>
            <div className="middle-right">
              <div className="breadcrumbs-and-grid">
                <div className="top-bar">
                </div>
                <div className="main-page">
                  <Story {...args}/>
                </div>
              </div>
              <div className="help-panel">
                <div className="sidebar-help">
                  <DisplayChangePassphraseIntroductionHelp {...args}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ],
};



export const Initial = {
  args: defaultProps()
};
