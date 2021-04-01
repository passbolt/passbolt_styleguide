import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import "../../../../css/themes/midgar/ext_app.css";
import UserSettings from "../../../lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import PasswordSidebarDescriptionSection from "./PasswordSidebarDescriptionSection";


export default {
  title: 'Passbolt/Password/PasswordSidebarDescriptionSection',
  component: PasswordSidebarDescriptionSection
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
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <PasswordSidebarDescriptionSection {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

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
