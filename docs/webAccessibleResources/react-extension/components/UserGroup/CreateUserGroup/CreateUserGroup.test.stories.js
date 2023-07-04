import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import CreateUserGroup from "./CreateUserGroup";
import {mockGpgKey, mockUsers} from "./CreateUserGroup.test.data";


export default {
  title: 'Components/UserGroup/CreateUserGroup',
  component: CreateUserGroup
};

const context = {
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin
  },
  port: {
    request: () => mockGpgKey
  },
  users: mockUsers,
  loggedInUser: {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    profile: {
      id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
      user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      first_name: "Carol",
      last_name: "Shaw"
    }
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateUserGroup {...args} {...routerProps}/>}></Route>
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
