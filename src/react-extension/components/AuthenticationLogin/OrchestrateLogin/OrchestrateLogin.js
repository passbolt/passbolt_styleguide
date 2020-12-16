import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import Login from "../Login/Login";
import DisplayLoginInProgress from "../DisplayLoginInProgress/DisplayLoginInProgress";
import DisplayLoginError from "../DisplayLoginError/DisplayLoginError";

/**
 * The component orchestrates the login authentication process
 */
class OrchestrateLogin extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initializeLogin();
  }

  /**
   * Initialize the login process
   */
  initializeLogin() {
    this.context.onInitializeLoginRequested();
  }

  /**
   * Render the component
   */
  render() {
    switch (this.context.state)  {
      case AuthenticationContextState.LOGIN_INITIALIZED:
        return <Login/>;
      case AuthenticationContextState.LOGIN_IN_PROGRESS:
        return <DisplayLoginInProgress/>;
      case AuthenticationContextState.LOGIN_FAILED:
        return <DisplayLoginError error={this.context.error.login}/>;
      default:
        return <></>;
    }
  }
}

OrchestrateLogin.contextType = AuthenticationContext;

export default OrchestrateLogin;
