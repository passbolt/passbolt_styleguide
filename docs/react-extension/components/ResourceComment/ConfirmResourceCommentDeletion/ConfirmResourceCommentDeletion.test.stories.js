import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ConfirmResourceCommentDeletion from "./ConfirmResourceCommentDeletion";


export default {
  title: 'Components/ResourceComment/ConfirmResourceCommentDeletion',
  component: ConfirmResourceCommentDeletion
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: (new URL(window.location.href)).origin
      }
    }
  },
  setContext: () => {},
};


const Template = args =>
  <AppContext.Provider value={args.context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ConfirmResourceCommentDeletion {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
Initial.args = {
  context: context,
  onClose: () => {},
};
