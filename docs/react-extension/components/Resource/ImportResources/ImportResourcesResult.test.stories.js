import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ImportResourcesResult from "./ImportResourcesResult";
import AppContext from "../../../../shared/context/AppContext/AppContext";


export default {
  title: 'Components/Resource/ImportResources/ImportResourcesResult',
  component: ImportResourcesResult
};

const context = {
  siteSettings: {
    canIUse: () => true
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ImportResourcesResult {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    resourceFileImportResult: {
      created: {
        foldersCount: 10,
        resourcesCount: 15
      }
    }
  },
  onClose: () => {}
};

export const ImportWithErrors = Template.bind({});
ImportWithErrors.args = {
  resourceWorkspaceContext: {
    resourceFileImportResult: {
      created: {
        foldersCount: 10,
        resourcesCount: 15
      },
      errors: {
        resources: ["Example of resource import error", "Example of resource import error"],
        folders: ["Example of folder import error", "Example of folder import error"]
      }
    }
  },
  onClose: () => {}
};
