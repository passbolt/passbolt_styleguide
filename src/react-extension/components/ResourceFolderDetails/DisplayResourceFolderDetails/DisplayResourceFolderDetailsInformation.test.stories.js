import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DisplayResourceFolderDetailsInformation from "./DisplayResourceFolderDetailsInformation";


export default {
  title: 'Components/ResourceFolderDetails/DisplayResourceFolderDetailsInformation',
  component: DisplayResourceFolderDetailsInformation
};

const context = {
  siteSettings: {
    getServerTimezone: () => new Date().toDateString()
  }
};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <div className="panel aside">
        <Route component={routerProps => <DisplayResourceFolderDetailsInformation {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    details: {
      folder: {
        "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
        "name": "Accounting",
        "created": "2020-02-01T00:00:00+00:00",
        "modified": "2020-02-01T00:00:00+00:00",
        "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
        "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
        "permission": {
          "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
          "aco": "Folder",
          "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
          "aro": "User",
          "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
          "type": 1,
          "created": "2020-05-11T10:11:13+00:00",
          "modified": "2020-05-11T10:11:13+00:00"
        },
        "folder_parent_id": null,
        "personal": false
      }
    }
  }
};
