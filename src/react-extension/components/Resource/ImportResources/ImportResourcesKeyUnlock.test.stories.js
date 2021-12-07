import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import ImportResourcesKeyUnlock from "./ImportResourcesKeyUnlock";


export default {
  title: 'Passbolt/Resource/ImportResources/ImportResourcesKeyUnlock',
  component: ImportResourcesKeyUnlock
};

const context = {
  siteSettings: {
    canIUse: () => true
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ImportResourcesKeyUnlock {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
