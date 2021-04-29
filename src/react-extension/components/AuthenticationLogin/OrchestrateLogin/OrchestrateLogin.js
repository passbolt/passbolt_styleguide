import React, {Component} from "react";
import {
  AuthenticationContextState,
  withAuthenticationContext
} from "../../../contexts/AuthenticationContext";
import Login from "../Login/Login";
import DisplayLoginInProgress from "../DisplayLoginInProgress/DisplayLoginInProgress";
import DisplayLoginError from "../DisplayLoginError/DisplayLoginError";
import AcceptLoginServerKeyChange from "../AcceptLoginServerKeyChange/AcceptLoginServerKeyChange";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import PropTypes from "prop-types";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import {withAppContext} from "../../../contexts/AppContext";

/**
 * The component orchestrates the login authentication process
 */
class OrchestrateLogin extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.verifyServerKey();
  }

  /**
   * Whenever the component changes
   */
  componentDidUpdate() {
    const isServerKeyChecked = this.props.authenticationContext.state === AuthenticationContextState.LOGIN_SERVER_KEY_CHECKED;
    const isServerKeyAccepted = this.props.authenticationContext.state === AuthenticationContextState.LOGIN_NEW_SERVER_KEY_ACCEPTED;
    const canInitialize = isServerKeyAccepted || isServerKeyChecked;
    if (canInitialize) {
      this.initializeLogin();
    }
  }

  /**
   * Verify the potential change of server key
   */
  verifyServerKey() {
    this.props.authenticationContext.onVerifyServerKeyRequested()
      .catch(this.onVerifyServerKeyFailure.bind(this));
  }

  /**
   * Whenever an uncontrolled error occured while the verification of server key
   */
  onVerifyServerKeyFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(NotifyError, ErrorDialogProps);
  }

  /**
   * Initialize the login process
   */
  initializeLogin() {
    this.props.authenticationContext.onInitializeLoginRequested();
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    return this.props.context.siteSettings.hasRememberMeUntilILogoutOption;
  }

  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationContext.state) {
      case AuthenticationContextState.LOGIN_INITIALIZED:
        if (this.props.context.siteSettings) {
          return <Login canRememberMe={this.canRememberMe}/>;
        } else {
          return <LoadingSpinner/>;
        }
      case AuthenticationContextState.LOGIN_IN_PROGRESS:
        return <DisplayLoginInProgress/>;
      case AuthenticationContextState.LOGIN_FAILED:
        return <DisplayLoginError error={this.props.authenticationContext.error}/>;
      case AuthenticationContextState.LOGIN_SERVER_KEY_CHANGED:
        return <AcceptLoginServerKeyChange/>;
      case AuthenticationContextState.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError error={this.props.authenticationContext.error}/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateLogin.propTypes = {
  context: PropTypes.any, // The application context
  authenticationContext: PropTypes.any, // The authentication context
  siteSettings: PropTypes.object, // The site settings
  dialogContext: PropTypes.any // The dialog context
};
export default withAppContext(withAuthenticationContext(withDialog(OrchestrateLogin)));
