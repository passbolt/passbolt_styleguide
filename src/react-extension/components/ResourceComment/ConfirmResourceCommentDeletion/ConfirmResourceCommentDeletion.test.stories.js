import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/default/ext_app.css";
import AppContext from "../../../contexts/AppContext";
import ConfirmResourceCommentDeletion from "./ConfirmResourceCommentDeletion";


export default {
  title: 'Passbolt/ResourceComment/ConfirmResourceCommentDeletion',
  component: ConfirmResourceCommentDeletion
};

const context = {
  siteSettings: {
    canIUse: () => true,
    settings: {
      app: {
        url: 'some url'
      }
    }
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ConfirmResourceCommentDeletion {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;


export const Initial = Template.bind({});
