import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_app.css";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import ShareDialog from "./ShareDialog";
import AppContext from "../../contexts/AppContext";
import {autocompleteResult, resources} from "./ShareDialog.test.data";


export default {
  title: 'Passbolt/Share/ShareDialog',
  component: ShareDialog
};

const context = {
  userSettings: {
    getTrustedDomain: () => "some url"
  },
  shareDialogProps: {
    resourcesIds: resources.map(resource => resource.id)
  },
  port: {
    request: path => {
      switch (path) {
        case 'passbolt.share.get-resources':
          return resources;
        case 'passbolt.share.search-aros':
          return autocompleteResult;
      }
    }
  }
};


const Template = args =>
  <MockTranslationProvider>
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <ShareDialog {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </AppContext.Provider>
  </MockTranslationProvider>;



export const Initial = Template.bind({});

