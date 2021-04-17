import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ExportResourcesCredentials from "./ExportResourcesCredentials";


export default {
  title: 'Passbolt/Resource/ExportResources/ExportResourcesCredentials',
  component: ExportResourcesCredentials
};

const context = {
  siteSettings: {
    canIUse: () => true
  }
};


const Template = args =>
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <ExportResourcesCredentials {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AppContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});
Initial.args = {
  resourceWorkspaceContext: {
    resourceFileImportResult: {
      created: {
        foldersCount: 10,
        resourcesCount: 15
      }
    }
  }
};

