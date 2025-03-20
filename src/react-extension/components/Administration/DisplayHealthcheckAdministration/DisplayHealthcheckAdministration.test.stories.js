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
 * @since         4.5.0
 */

import DisplayHealthcheckAdministration from "./DisplayHealthcheckAdministration";
import React from "react";
import {defaultProps} from "./DisplayHealthcheckAdministration.test.data";
import {defaultAdministrationHealthcheckContext, mockHealthcheckDataAllChecksFail} from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext.test.data";
import HealthcheckEntity from "../../../../shared/models/entity/healthcheck/healthcheckEntity";

export default {
  title: 'Components/Administration/DisplayHealthcheckAdministration',
  component: DisplayHealthcheckAdministration,
  decorators: [(Story, {args}) =>
    <div id="container" className="page administration">
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
  ],
  parameters: {
    css: "api_main"
  },
};

export const Initial = {
  args: defaultProps(),
};

export const FailingTest = {
  args: defaultProps({
    adminHealthcheckContext: defaultAdministrationHealthcheckContext({
      healthcheckData: new HealthcheckEntity(mockHealthcheckDataAllChecksFail),
    }),
  }),
};
