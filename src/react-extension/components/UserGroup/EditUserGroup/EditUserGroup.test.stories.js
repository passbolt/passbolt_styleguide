import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import {defaultProps, mockGpgKey, mockUsers} from "./EditUserGroup.test.data";
import EditUserGroup from "./EditUserGroup";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";


export default {
  title: 'Components/UserGroup/EditUserGroup',
  component: EditUserGroup
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
    id: "54c6278e-f824-5fda-91ff-3e946b18d994",
    profile: {
      id: "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
      user_id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      first_name: "Carol",
      last_name: "Shaw"
    },
    role: {
      created: "2012-07-04T13:39:25+00:00",
      description: "Logged in user",
      id: TEST_ROLE_USER_ID,
      modified: "2012-07-04T13:39:25+00:00",
      name: "admin"
    }
  }
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <EditUserGroup {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();

export const Loading = Template.bind({});
Loading.args = Object.assign(defaultProps(), {context: {...context, port: {}}});
