import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
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
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <ImportResourcesKeyUnlock {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AppContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

