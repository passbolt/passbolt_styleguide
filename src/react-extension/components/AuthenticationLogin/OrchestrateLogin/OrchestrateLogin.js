import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import Login from "../Login/Login";
import DisplayLoginInProgress from "../DisplayLoginInProgress/DisplayLoginInProgress";
import DisplayLoginError from "../DisplayLoginError/DisplayLoginError";
import AcceptLoginServerKeyChange from "../AcceptLoginServerKeyChange/AcceptLoginServerKeyChange";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import PropTypes from "prop-types";
import LoadingSpinner from "../../../../react/components/Common/Loading/LoadingSpinner/LoadingSpinner";

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
    const isServerKeyChecked = this.context.state === AuthenticationContextState.LOGIN_SERVER_KEY_CHECKED;
    const isServerKeyAccepted = this.context.state === AuthenticationContextState.LOGIN_NEW_SERVER_KEY_ACCEPTED;
    const canInitialize = isServerKeyAccepted || isServerKeyChecked;
    if (canInitialize) {
      this.initializeLogin();
    }
  }

  /**
   * Verify the potential change of server key
   */
  verifyServerKey() {
    this.context.onVerifyServerKeyRequested()
      .catch(this.onVerifyServerKeyFailure.bind(this));
  }

  /**
   * Whenever an uncontrolled error occured while the verification of server key
   */
  onVerifyServerKeyFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
  }

  /**
   * Initialize the login process
   */
  initializeLogin() {
    this.context.onInitializeLoginRequested();
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    return this.props.siteSettings.hasRememberMeUntilILogoutOption;
  }

  /**
   * Render the component
   */
  render() {
    switch (this.context.state) {
      case AuthenticationContextState.LOGIN_INITIALIZED:
        if (this.props.siteSettings) {
          return <Login canRememberMe={this.canRememberMe}/>;
        } else {
          return <LoadingSpinner/>;
        }
      case AuthenticationContextState.LOGIN_IN_PROGRESS:
        return <DisplayLoginInProgress/>;
      case AuthenticationContextState.LOGIN_FAILED:
        return <DisplayLoginError error={this.context.error.login}/>;
      case AuthenticationContextState.LOGIN_SERVER_KEY_CHANGED:
        return <AcceptLoginServerKeyChange/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateLogin.contextType = AuthenticationContext;
OrchestrateLogin.propTypes = {
  siteSettings: PropTypes.object, // The site settings
  dialogContext: PropTypes.any // The dialog context
};
export default withDialog(OrchestrateLogin);
