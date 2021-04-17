import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";
import {mockUserDirectorySettings, mockUsers} from "./DisplayUserDirectoryAdministration.test.data";


export default {
  title: 'Passbolt/Administration/DisplayUserDirectoryAdministration',
  component: DisplayUserDirectoryAdministration
};

const context = {};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DisplayUserDirectoryAdministration {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  administrationWorkspaceContext: {
    mustSaveSettings: false,
    mustTestSettings: false,
    onResetActionsSettings: () => {},
    isSaveEnabled: false,
    onSaveEnabled: () => {},
    onTestEnabled: () => {},
    onSynchronizeEnabled: () => {},
    onGetUsersDirectoryRequested: () => mockUserDirectorySettings,
    onGetUsersRequested: () => mockUsers,
    onTestUsersDirectoryRequested: () => mockUserDirectorySettings,
  },
  dialogContext: {
    open: () => {}
  }
};



