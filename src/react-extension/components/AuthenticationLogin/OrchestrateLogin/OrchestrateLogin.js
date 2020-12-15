import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import Login from "../Login/Login";
import DisplayLoginInProgress from "../DisplayLoginInProgress/DisplayLoginInProgress";
import DisplayLoginError from "../DisplayLoginError/DisplayLoginError";
import AcceptLoginServerKeyChange from "../AcceptLoginServerKeyChange/AcceptLoginServerKeyChange";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";
import PropTypes from "prop-types";

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
   * Returns the server key fingerprint
   */
  get serverKeyFingerprint() {
    const {serverKey} = this.context;
    return (serverKey && serverKey.fingerprint) || '';
  }

  /**
   * Verify the potential change ofserver key
   */
  verifyServerKey() {
    this.context.onVerifyServerKeyRequested()
      .catch(this.onVerifyServerKeyFailure);
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
      case AuthenticationContextState.LOGIN_SERVER_KEY_CHANGED:
        return <AcceptLoginServerKeyChange fingerprint={this.serverKeyFingerprint}/>;
      default:
        return <></>;
    }
  }
}

OrchestrateLogin.contextType = AuthenticationContext;
OrchestrateLogin.propTypes = {
  dialogContext: PropTypes.any // The dialog context
};
export default withDialog(OrchestrateLogin);
