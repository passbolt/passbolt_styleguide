import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import FilterResourcesByFolders from "./FilterResourcesByFolders";
import {DragContext} from "../../../contexts/DragContext";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/Resource/FilterResourcesByFolders',
  component: FilterResourcesByFolders
};

const context = {
  folders: [
    {id: 1, name: 'Root', folder_parent_id: null},
    {id: 2, name: 'My Folder', folder_parent_id: 1},
    {id: 3, name: 'My Folder 2', folder_parent_id: 1},
    {id: 4, name: 'My Sub-Folder 1', folder_parent_id: 2}
  ],
  port: new MockPort()
};

const Template = ({...args}) =>
  <AppContext.Provider value={args.context}>
    <DragContext.Provider value={args.dragContext}>
      <MemoryRouter initialEntries={['/']}>
        <div className="panel">
          <Route component={routerProps => <FilterResourcesByFolders {...args} {...routerProps}/>}></Route>
        </div>
      </MemoryRouter>
    </DragContext.Provider>
  </AppContext.Provider>;

export const Initial = Template.bind({});
Initial.args = {
  context: context,
  dragContext: {
    draggedItems: {
      folders: [],
      resources: []
    },
    onDragStart: () => {},
    onDragEnd: () => {}
  }
};
