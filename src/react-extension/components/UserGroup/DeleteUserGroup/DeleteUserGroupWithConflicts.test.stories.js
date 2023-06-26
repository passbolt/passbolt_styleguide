import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteUserGroupWithConflicts from "./DeleteUserGroupWithConflicts";
import {mockGroups, mockResources, mockUsers} from "./DeleteUserGroupWithConflicts.test.data";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/UserGroup/DeleteUserGroupWithConflicts',
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
  setContext: () => {},
  port: new MockPort()
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUserGroupWithConflicts {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: context,
  onClose: () => {}
};
