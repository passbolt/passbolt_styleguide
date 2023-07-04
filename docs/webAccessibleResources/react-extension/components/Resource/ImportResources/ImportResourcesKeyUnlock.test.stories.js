import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ImportResourcesKeyUnlock from "./ImportResourcesKeyUnlock";


export default {
  title: 'Components/Resource/ImportResources/ImportResourcesKeyUnlock',
  component: ImportResourcesKeyUnlock
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
      <Route component={routerProps => <ImportResourcesKeyUnlock {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  onClose: () => {},
  resourceWorkspaceContext: {
    onResourceFileToImport: () => {},
    resourceFileToImport: "test"
  }
};
