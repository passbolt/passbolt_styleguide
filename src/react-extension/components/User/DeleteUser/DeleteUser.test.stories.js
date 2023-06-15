import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import DeleteUser from "./DeleteUser";
import {defaultAppContext, mockUser} from "./DeleteUser.test.data";


export default {
  title: 'Components/User/DeleteUser',
  component: DeleteUser
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <DeleteUser {...args} {...routerProps}/>}></Route>
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

export const LongUsername = Template.bind({});
LongUsername.args = {
  context: defaultAppContext({deleteUserDialogProps: {
    user: mockUser({username: "repeat".repeat(10)})
  }}),
  onClose: () => {}
};
