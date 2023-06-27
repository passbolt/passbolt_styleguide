import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ExportResourcesCredentials from "./ExportResourcesCredentials";


export default {
  title: 'Components/Resource/ExportResources/ExportResourcesCredentials',
  component: ExportResourcesCredentials
};

const context = {
  siteSettings: {
    canIUse: () => true
  },
  setContext: () => {}
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ExportResourcesCredentials {...args} {...routerProps}/>}></Route>
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
