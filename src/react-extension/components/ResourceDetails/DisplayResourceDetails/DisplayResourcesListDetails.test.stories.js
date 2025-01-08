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
 * @since         5.0.0
 */

import mockPort from "../../../../../test/mocks/mockPort";
import mockStorage from "../../../../../test/mocks/mockStorage";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";
import DisplayResourcesListDetails from "./DisplayResourcesListDetails";
import {defaultProps} from "./DisplayResourcesListDetails.test.data";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

/**
 * DisplayResourceDetails stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourcesListDetails',
  component: DisplayResourcesListDetails,
  decorators: [
    (Story, {args}) => (
      <Router>
        <AppContext.Provider value={args.context}>
          <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
            <div className="page">
              <div className="app" style={{margin: "-1rem"}}>
                <div className="panel main">
                  <div className="panel middle">
                    <div className="middle-right" style={{display: "flex", justifyContent: "flex-end"}}>
                      <div className="panel aside">
                        <Story {...args} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResourceWorkspaceContext.Provider>
        </AppContext.Provider>
      </Router>
    )
  ]
};

const storage = mockStorage();
const port = mockPort(storage);

port.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({description: "This is a secure note."}));

export const Default = {
  args: {
    ...defaultProps({context: {port}}),
    storage: storage,
  }
};
