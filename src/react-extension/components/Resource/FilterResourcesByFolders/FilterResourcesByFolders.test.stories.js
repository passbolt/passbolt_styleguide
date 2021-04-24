import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import "../../../../css/themes/midgar/ext_app.css";
import FilterResourcesByFolders from "./FilterResourcesByFolders";


export default {
  title: 'Passbolt/Resource/FilterResourcesByFolders',
  component: FilterResourcesByFolders
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
      <div className="panel">
        <Route component={routerProps => <FilterResourcesByFolders {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});
