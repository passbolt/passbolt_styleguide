import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DeleteUserGroupWithConflicts from "./DeleteUserGroupWithConflicts";
import {mockGroups, mockResources, mockUsers} from "./DeleteUserGroupWithConflicts.test.data";


export default {
  title: 'Passbolt/UserGroup/DeleteUserGroupWithConflicts',
  component: DeleteUserGroupWithConflicts
};

const context = {
  users: mockUsers,
  groups: mockGroups,
  deleteGroupWithConflictsDialogProps: {
    group: {
      id: 1
    },
    errors: {
      resources: {
        sole_owner: mockResources
      }
    }
  },
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUserGroupWithConflicts {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
