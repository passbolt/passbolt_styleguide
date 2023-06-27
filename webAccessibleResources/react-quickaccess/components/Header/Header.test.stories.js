import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";
import {defaultAppContext} from "./Header.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";


export default {
  title: 'Components/QuickAccess/Header',
  component: Header
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><Header {...args} {...routerProps}/></div>}></Route>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
  logoutSuccessCallback: () => {}
};

Initial.parameters = {
  css: "ext_quickaccess"
};
