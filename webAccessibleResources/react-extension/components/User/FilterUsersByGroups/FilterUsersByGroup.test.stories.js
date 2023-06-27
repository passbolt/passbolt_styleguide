import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import FilterUsersByGroup from "./FilterUsersByGroup";
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";


export default {
  title: 'Components/User/FilterUsersByGroup',
  component: FilterUsersByGroup
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
        <Route component={routerProps => <FilterUsersByGroup {...args} {...routerProps}/>}></Route>
      </div>
    </MemoryRouter>
  </AppContext.Provider>;

export const Initial = Template.bind({});

export const SelectedGroup = Template.bind({});
SelectedGroup.args = {
  userWorkspaceContext: {
    filter: {
      type: UserWorkspaceFilterTypes.GROUP,
      payload: {
        group: {
          id: 1
        }
      }
    }
  }
};
