import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import ImportGpgKey from "../../Authentication/ImportGpgKey/ImportGpgKey";
import CheckPassphrase from "../../Authentication/CheckPassphrase/CheckPassphrase";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import AskForAuthenticationHelp from "../../Authentication/AskForAuthenticationHelp/AskForAuthenticationHelp";
import LoadingSpinner from "../../../../react/components/Common/Loading/LoadingSpinner/LoadingSpinner";

/**
 * The component orchestrates the recover authentication process
 */
class RecoverAuthentication extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.initializeRecover();
  }

  /**
   * Whenever the component is updated
   */
  componentDidUpdate() {
    this.handleSecurityTokenSaved();
    this.handleCompleteRecover();
  }


  /**
   * Whenever the security token has been saved
   */
  handleSecurityTokenSaved() {
    if (this.context.state === AuthenticationContextState.SECURITY_TOKEN_SAVED) {
      this.context.onCompleteRecoverRequested();
    }
  }

  /**
   * Whenever one has to complete the setup
   */
  handleCompleteRecover() {
    if (this.context.state === AuthenticationContextState.RECOVER_COMPLETED) {
      // TODO
    }
  }

  /**
   * Initialize the authentication recover process
   */
  initializeRecover() {
    this.context.onInitializeRecoverRequested();
  }

  /**
   * Render the component
   */
  render() {
    switch (this.context.state)  {
      case AuthenticationContextState.RECOVER_INITIALIZED:
        return <ImportGpgKey canGenerate={false}></ImportGpgKey>;
      case AuthenticationContextState.GPG_KEY_VALIDATED:
        return <CheckPassphrase/>;
      case AuthenticationContextState.GPG_KEY_IMPORTED:
        return <ChooseSecurityToken/>;
      case AuthenticationContextState.PASSPHRASE_LOST:
        return <AskForAuthenticationHelp/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

RecoverAuthentication.contextType = AuthenticationContext;

export default RecoverAuthentication;
