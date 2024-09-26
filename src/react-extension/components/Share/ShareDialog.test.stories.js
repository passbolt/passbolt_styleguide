import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import {defaultAppContext, resources} from "./ShareDialog.test.data";

export default {
  title: 'Components/Share/ShareDialog',
  component: ShareDialog
};

const context = defaultAppContext({
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
  },
  shareDialogProps: {
    resourcesIds: resources.map(resource => resource.id)
  },
  port: {
    request: (path, option) => {
      switch (path) {
        case 'passbolt.share.find-resources-for-share':
          return resources;
        case 'passbolt.share.search-aros':
          return context.users.filter(user => user.username.indexOf(option) !== -1);
      }
    }
  },
});

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
