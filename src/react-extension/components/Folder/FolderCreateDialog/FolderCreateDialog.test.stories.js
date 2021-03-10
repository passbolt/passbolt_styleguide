import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../../css/themes/midgar/ext_app.css";
import FolderCreateDialog from "./FolderCreateDialog";


export default {
  title: 'Passbolt/Folder/FolderCreateDialog',
  component: FolderCreateDialog
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <FolderCreateDialog {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Initial = Template.bind({});


