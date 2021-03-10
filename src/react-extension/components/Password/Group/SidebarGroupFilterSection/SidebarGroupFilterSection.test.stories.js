import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import SidebarGroupFilterSection
  from "./SidebarGroupFilterSection";
import AppContext from "../../../../contexts/AppContext";
import {ResourceWorkspaceFilterTypes} from "../../../../contexts/ResourceWorkspaceContext";


export default {
  title: 'Passbolt/Password/Group/SidebarGroupFilterSection',
  component: SidebarGroupFilterSection
};

const context = {
  groups: [
    {id: 1, name: 'Group 1'},
    {id: 2, name: 'Group 2'},
    {id: 3, name: 'Group 3'}
  ]
};

const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <SidebarGroupFilterSection {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});

export const SelectedGroup = Template.bind({});
SelectedGroup.args = {
  resourceWorkspaceContext: {
    filter: {
      type: ResourceWorkspaceFilterTypes.GROUP,
      payload: {
        group: {
          id: 1
        }
      }
    }
  }
};
