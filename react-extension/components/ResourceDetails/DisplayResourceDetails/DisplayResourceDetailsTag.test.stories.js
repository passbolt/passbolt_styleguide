import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsTag',
  component: DisplayResourceDetailsTag
};

const tags = [{
  id: 1,
  slug: 'apache'
}];
const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.tags.find-all", () => tags);

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  },
  userSettings: new UserSettings(userSettingsFixture),
  port: mockedPort
};

const Template = args =>
  <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <div className="panel aside">
          <Route component={routerProps => <DisplayResourceDetailsTag {...args} {...routerProps}/>}></Route>
        </div>
      </MemoryRouter>
    </AppContext.Provider>
  </TranslationProvider>;

export const DecryptedDescription = Template.bind({});
DecryptedDescription.args = {
  resourceWorkspaceContext: {
    details: {
      resource: {
        permission: {
          type: 15
        },
        tags: tags
      }
    }
  }
};
