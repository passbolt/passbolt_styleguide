import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import FoldersTree from "./FoldersTree";
import "../../../../css/themes/midgar/ext_app.css";


export default {
  title: 'Passbolt/Password/FoldersTree',
  component: FoldersTree
};

const context = {
  folders: [
    {id: 1, name: 'Root', folder_parent_id: null},
    {id: 2, name: 'My Folder', folder_parent_id: 1},
    {id: 3, name: 'My Folder 2', folder_parent_id: 1},
    {id: 4, name: 'My Sub-Folder 1', folder_parent_id: 2}
  ]
};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <FoldersTree {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
