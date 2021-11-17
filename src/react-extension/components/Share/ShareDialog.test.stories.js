import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
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
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ShareDialog {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  context: context
};

export const Loading = Template.bind({});
Loading.args = {
  context: {...context, port: {}}
};
