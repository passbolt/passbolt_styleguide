import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayResourceDetailsDescription from "./DisplayResourceDetailsDescription";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";


export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsDescription',
  component: DisplayResourceDetailsDescription
};

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  },
  userSettings: new UserSettings(userSettingsFixture),
  port: {
    request: () => "A resource description"
  }
};

const Template = args =>
  <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <div className="panel aside">
          <Route component={routerProps => <DisplayResourceDetailsDescription {...args} {...routerProps}/>}></Route>
        </div>
      </MemoryRouter>
    </AppContext.Provider>
  </TranslationProvider>;

export const DecryptedDescription = Template.bind({});
DecryptedDescription.args = {
  resourceWorkspaceContext: {
    details: {
      resource: {
        description: "A resource description"
      }
    }
  }
};
