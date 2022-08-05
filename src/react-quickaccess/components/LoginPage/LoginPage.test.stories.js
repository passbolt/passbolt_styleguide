import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContext";
import LoginPage from "./LoginPage";
import {defaultAppContext} from "./LoginPage.test.data";

export default {
  title: 'Components/QuickAccess/Login',
  component: LoginPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess"><LoginPage {...args} {...routerProps}/></div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
};


export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
  loginSuccessCallback: () => {},
  mfaRequiredCallback: () => {},
  canRememberMe: true,
};
Initial.parameters = {
  css: "ext_quickaccess"
};
