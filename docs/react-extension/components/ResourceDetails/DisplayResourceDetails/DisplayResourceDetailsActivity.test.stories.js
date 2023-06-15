import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayResourceDetailsActivity from "./DisplayResourceDetailsActivity";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";


export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsActivity',
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
  <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <div className="panel aside">
          <Route component={routerProps => <DisplayResourceDetailsActivity {...args} {...routerProps}/>}></Route>
        </div>
      </MemoryRouter>
    </AppContext.Provider>
  </TranslationProvider>;

export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    details: {
      resource: {
        name: "resource"
      }
    }
  }
};
