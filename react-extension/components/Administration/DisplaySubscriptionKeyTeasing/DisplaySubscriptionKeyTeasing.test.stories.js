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
 * @since         5.5.0
 */
import DisplaySubscriptionKeyTeasing from "./DisplaySubscriptionKeyTeasing";
import React from "react";
import {AdminSubscriptionContextProvider} from '../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription';
import {
  defaultProps
} from "./DisplaySubscriptionKeyTeasing.test.data";

export default {
  title: 'Components/Administration/DisplaySubscriptionKeyTeasing',
  component: DisplaySubscriptionKeyTeasing,
  decorators: [(Story, {args}) =>
    <AdminSubscriptionContextProvider{...args}>
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
    </AdminSubscriptionContextProvider>
  ]
};

export const Initial = {
  args: defaultProps()
};
