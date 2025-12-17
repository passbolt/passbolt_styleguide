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
 * @since         2.13.0
 */

import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayResourceFolderDetailsActivity from "./DisplayResourceFolderDetailsActivity";
import { defaultFolderDto } from "../../../../shared/models/entity/folder/folderEntity.test.data";

export default {
  title: "Components/ResourceFolderDetails/DisplayResourceFolderDetailsActivity",
  component: DisplayResourceFolderDetailsActivity,
};

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString(),
  },
  userSettings: new UserSettings(userSettingsFixture),
  port: {
    request: () => [
      {
        action_log_id: "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
        type: "Folders.created",
        creator: {
          profile: {
            first_name: "Ada",
            last_name: "Lovelace",
          },
        },
      },
    ],
  },
};

const Template = (args) => (
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={["/"]}>
      <div className="panel aside">
        <Route component={(routerProps) => <DisplayResourceFolderDetailsActivity {...args} {...routerProps} />}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>
);

export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    details: {
      folder: defaultFolderDto(),
    },
  },
};
