import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import DeleteUserGroup from "./DeleteUserGroup";


export default {
  title: 'Passbolt/UserGroup/DeleteUserGroup',
  component: DeleteUserGroup
};

const context = {
  deleteGroupDialogProps: {
    group: {
      id: 1
    }
  },
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUserGroup {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
