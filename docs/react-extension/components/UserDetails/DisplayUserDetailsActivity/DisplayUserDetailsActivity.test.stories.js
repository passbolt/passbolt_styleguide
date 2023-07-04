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

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayUserDetailsActivity from "./DisplayUserDetailsActivity";

export default {
  title: 'Components/UserDetails/DisplayUserDetailsActivity',
  component: DisplayUserDetailsActivity
};

const firstActivityDataSet = [
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "type": "AccountRecovery.Requests.initiated",
    "creator": {
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace"
      }
    },
    "created": "2021-12-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd0",
    "type": "AccountRecovery.Requests.accepted",
    "creator": {
      "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3eee",
      "profile": {
        "first_name": "Admin",
        "last_name": "admin"
      }
    },
    "created": "2021-10-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd2",
    "type": "AccountRecovery.Policies.rejected",
    "creator": {
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace"
      }
    },
    "created": "2021-08-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd1",
    "type": "AccountRecovery.Policies.accepted",
    "creator": {
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace"
      }
    },
    "created": "2021-04-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd3",
    "type": "UnknowActivityType",
    "creator": {
      "profile": {
        "first_name": "Ada",
        "last_name": "Lovelace"
      }
    }
  }
];

const lastActivityDataSet = [
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd4",
    "type": "AccountRecovery.Requests.rejected",
    "creator": {
      "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3eee",
      "profile": {
        "first_name": "Admin",
        "last_name": "admin"
      }
    },
    "created": "2020-08-17T16:37:12+00:00"
  },
  {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dd5",
    "type": "Users.created",
    "creator": {
      "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3eee",
      "profile": {
        "first_name": "Admin",
        "last_name": "admin"
      }
    },
    "created": "2020-08-17T16:37:12+00:00"
  }
];

const userActivityData = [firstActivityDataSet, lastActivityDataSet];
let activityDataSetIndex = 0;
const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  },
  userSettings: new UserSettings(userSettingsFixture),
  port: {
    request: () => userActivityData[activityDataSetIndex++ % userActivityData.length]
  }
};

const Template = args =>
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <Route component={routerProps => <DisplayUserDetailsActivity {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  context: context,
  userWorkspaceContext: {
    details: {
      user: {

      }
    }
  }
};
