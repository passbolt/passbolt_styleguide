import React, {Component} from "react";
import CreateGpgKey from "../../Authentication/CreateGpgKey/CreateGpgKey";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "../../Authentication/DownloadRecoveryKit/DownloadRecoveryKit";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import ImportGpgKey from "../../Authentication/ImportGpgKey/ImportGpgKey";
import CheckPassphrase from "../../Authentication/CheckPassphrase/CheckPassphrase";

/**
 * The component allows the user to create a Gpg key by automatic generation or by manually importing one
 */
class SetupAuthentication extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.initializeSetup();
  }

  /**
   * Whenever the component is updated
   */
  componentDidUpdate() {
    this.handleSecurityTokenSaved();
    this.handleCompleteSetup();
  }

  /**
   * Whenever the security token has been saved
   */
  handleSecurityTokenSaved() {
    if (this.context.state === AuthenticationContextState.SECURITY_TOKEN_SAVED) {
      this.context.onCompleteSetupRequested();
    }
  }

  /**
   * Whenever one has to complete the setup
   */
  handleCompleteSetup() {
    if (this.context.state === AuthenticationContextState.SETUP_COMPLETED) {
      // TODO
    }
  }

  /**
   * Initialize the authentication setup process
   */
  initializeSetup() {
    this.context.onInitializeSetupRequested();
  }

  /**
   * Render the component
   */
  render() {
    switch (this.context.state)  {
      case AuthenticationContextState.SETUP_INITIALIZED:
        return <CreateGpgKey/>;
      case AuthenticationContextState.GPG_KEY_GENERATED:
        return <DownloadRecoveryKit/>;
      case AuthenticationContextState.RECOVERY_KIT_DOWNLOADED:
      case AuthenticationContextState.GPG_KEY_IMPORTED:
        return <ChooseSecurityToken/>;
      case AuthenticationContextState.GPG_KEY_TO_IMPORT_REQUESTED:
        return <ImportGpgKey/>;
      case AuthenticationContextState.GPG_KEY_VALIDATED:
        return <CheckPassphrase/>;
      default:
        return <></>;
    }
  }
}

SetupAuthentication.contextType = AuthenticationContext;

export default SetupAuthentication;
