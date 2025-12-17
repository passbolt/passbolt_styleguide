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
 * @since         2.11.0
 */

import React from "react";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";
import { defaultProps, mockUsers, mockResult } from "./DisplayUserDirectoryAdministration.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import MockFetch from "../../../test/mock/MockFetch";
import { AdminUserDirectoryContextProvider } from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/directorysync\/settings.json/, async () => mockApiResponse(mockResult));
mockFetch.addGetFetchRequest(/users*/, async () => mockApiResponse(mockUsers));

export default {
  title: "Components/Administration/DisplayUserDirectoryAdministration",
  component: DisplayUserDirectoryAdministration,
  decorators: [
    (Story, { args }) => (
      <div id="container" className="page administration">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="main-page">
                    <AdminUserDirectoryContextProvider {...args}>
                      <Story {...args} />
                    </AdminUserDirectoryContextProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    css: "api_main",
  },
};

export const Initial = {
  args: defaultProps(null, mockUsers[4].id),
};
