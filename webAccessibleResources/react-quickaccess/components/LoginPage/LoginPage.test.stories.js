import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "./LoginPage";
import {defaultAppContext, defaultSsoContext} from "./LoginPage.test.data";
import AppContext from "../../../shared/context/AppContext/AppContext";

export default {
  title: 'Components/QuickAccess/Login',
  component: LoginPage
};

const Template = ({context, ...args}) =>
  <AppContext.Provider value={context}>
    <MemoryRouter initialEntries={['/']}>
      <Route component={routerProps => <div className="container quickaccess">
        <LoginPage {...args} {...routerProps}/>
      </div>}/>
    </MemoryRouter>
  </AppContext.Provider>;

Template.propTypes = {
  context: PropTypes.object,
  ssoContext: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = {
  context: defaultAppContext(),
  ssoContext: defaultSsoContext({hasUserAnSsoKit: () => false}),
  loginSuccessCallback: () => {},
  mfaRequiredCallback: () => {},
  canRememberMe: true,
};
Initial.parameters = {
  css: "ext_quickaccess"
};

export const WithSsoAvailable = Template.bind({});
WithSsoAvailable.args = {
  context: defaultAppContext(),
  ssoContext: defaultSsoContext(),
  loginSuccessCallback: () => {},
  mfaRequiredCallback: () => {},
  canRememberMe: true,
};
WithSsoAvailable.parameters = {
  css: "ext_quickaccess"
};

export const WithSsoLoginError = Template.bind({});
WithSsoLoginError.args = {
  context: defaultAppContext(),
  ssoContext: defaultSsoContext({runSignInProcess: () => { throw new Error("Unable to decrypt the private key's with the given passphrase"); }}),
  loginSuccessCallback: () => {},
  mfaRequiredCallback: () => {},
  canRememberMe: true,
};
WithSsoLoginError.parameters = {
  css: "ext_quickaccess"
};
