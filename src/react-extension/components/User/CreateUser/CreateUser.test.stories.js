import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import CreateUser from "./CreateUser";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/User/CreateUser',
  component: CreateUser
};

const context = {
  setContext: () => {},
  roles: [
    {name: "admin"},
    {name: "user"}
  ],
  port: new MockPort()
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <CreateUser {...args} {...routerProps}/>}></Route>
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
