import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteUserGroup from "./DeleteUserGroup";
import {defaultAppContext, mockGroup} from "./DeleteUserGroup.test.data";


export default {
  title: 'Components/UserGroup/DeleteUserGroup',
  component: DeleteUserGroup
};


const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUserGroup {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
  onClose: () => {}
};

export const LongGroupName = Template.bind({});
LongGroupName.args = {
  context: defaultAppContext({deleteGroupDialogProps: {
    group: mockGroup({name: "repeat".repeat(10)})
  },}),
  onClose: () => {}
};
