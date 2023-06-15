import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByGroups from "./FilterResourcesByGroups";


export default {
  title: 'Components/Resource/FilterResourcesByGroups',
  component: FilterResourcesByGroups
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
      <div className="panel">
        <Route component={routerProps => <FilterResourcesByGroups {...args} {...routerProps}/>}></Route>
      </div>
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
