import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import "../../../css/themes/default/ext_quickaccess.css";
import PropTypes from "prop-types";
import Header from "./Header";
import AppContext from "../../contexts/AppContext";
import {defaultAppContext} from "./Header.test.data";


export default {
  title: 'Passbolt/QuickAccess/Header',
  component: Header
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container page quickaccess"><Header {...args} {...routerProps}/></div>}></Route>
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




