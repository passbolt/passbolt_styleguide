import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ShareDialog from "./ShareDialog";
import AppContext from "../../contexts/AppContext";
import {autocompleteResult, resources} from "./ShareDialog.test.data";


export default {
  title: 'Components/Share/ShareDialog',
  component: ShareDialog
};

const context = {
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
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
  },
  setContext: () => {}
};


const Template = args =>
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ShareDialog {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  context: context,
  onClose: () => {}
};

export const Loading = Template.bind({});
Loading.args = {
  context: {...context, port: {}}
};
