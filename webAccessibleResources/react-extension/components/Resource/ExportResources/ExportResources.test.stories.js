import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ExportResources from "./ExportResources";


export default {
  title: 'Components/Resource/ExportResources/ExportResources',
  component: ExportResources
};

const context = {
  siteSettings: {
    canIUse: () => true
  },
  resources: [
    {
      "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
      "name": "apache",
      "username": "www-data",
      "uri": "http:\/\/www.apache.org\/",
      "description": "Apache is the world\u0027s most used web server software.",
      "deleted": false,
      "created": "2020-08-25T08:35:19+00:00",
      "modified": "2020-08-26T08:35:19+00:00",
      "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
      "favorite": {
        "id": "56216dba-b6da-592b-87cb-fb5cbbd0a424",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "foreign_model": "Resource",
        "created": "2020-08-27T08:35:21+00:00",
        "modified": "2020-08-27T08:35:21+00:00"
      },
      "permission": {
        "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
        "aco": "Resource",
        "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
        "aro": "User",
        "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
        "type": 15,
        "created": "2020-08-27T08:35:19+00:00",
        "modified": "2020-08-27T08:35:19+00:00"
      }
    }
  ],
  folders: [
    {
      id: 1
    },
    {
      id: 2
    }
  ],
  setContext: () => {}
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ExportResources {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    resourcesToExport: {
      foldersIds: [1, 2]
    },
    onResourcesToExport: () => {}
  },
  onClose: () => {}
};
