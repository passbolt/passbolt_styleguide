import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import ConfirmDisableUserMFA from "./ConfirmDisableUserMFA";


export default {
  title: 'Passbolt/User/ConfirmDisableUserMFA',
  component: ConfirmDisableUserMFA
};

const context = {};


const Template = args =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <ConfirmDisableUserMFA {...args} {...routerProps}/>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
