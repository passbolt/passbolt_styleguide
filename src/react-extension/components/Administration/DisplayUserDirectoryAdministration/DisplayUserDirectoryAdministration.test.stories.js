import React from "react";
import PropTypes from "prop-types";
import DisplayUserDirectoryAdministration from "./DisplayUserDirectoryAdministration";
import {mockUserDirectorySettings, mockUsers} from "./DisplayUserDirectoryAdministration.test.data";


export default {
  title: 'Components/Administration/DisplayUserDirectoryAdministration',
  component: DisplayUserDirectoryAdministration
};

const Template = args =>
  <div className="grid grid-responsive-12">
    <DisplayUserDirectoryAdministration {...args}/>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  administrationWorkspaceContext: {
    must: {
      save: false,
      test: false
    },
    onResetActionsSettings: () => {},
    can: {
      save: false
    },
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
