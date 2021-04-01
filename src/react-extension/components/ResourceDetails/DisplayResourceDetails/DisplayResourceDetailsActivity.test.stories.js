import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import "../../../../css/themes/midgar/ext_app.css";
import UserSettings from "../../../lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayResourceDetailsActivity from "./DisplayResourceDetailsActivity";


export default {
  title: 'Passbolt/ResourceDetails/DisplayResourceDetailsActivity',
  component: DisplayResourceDetailsActivity
};

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  },
  userSettings: new UserSettings(userSettingsFixture),
  port: {
    request: () => [
      {
        "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
        "type": "Resources.created",
        "creator": {
          "profile": {
            "first_name": "Ada",
            "last_name": "Lovelace"
          }
        }
      }
    ]
  }
};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayResourceDetailsActivity {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    details: {
      resource: {

      }
    }
  }
};
