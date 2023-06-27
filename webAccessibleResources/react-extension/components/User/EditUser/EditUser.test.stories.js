import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import EditUser from "./EditUser";
import MockPort from "../../../test/mock/MockPort";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";


export default {
  title: 'Components/User/EditUser',
  component: EditUser
};

const context = {
  roles: [
    {
      id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
      name: "admin"
    },
    {
      id: TEST_ROLE_USER_ID,
      name: "user"
    }
  ],
  users: [
    {
      id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
      profile: {
        first_name: "firstname",
        last_name: "lastname",
      },
      username: "firstname@passbolt.com",
      role_id: TEST_ROLE_USER_ID
    }
  ],
  editUserDialogProps: {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a"
  },
  setContext: () => {},
  port: new MockPort()
};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <EditUser {...args} {...routerProps}/>}></Route>
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
Initial.parameters = {
  css: "api_main"
};
