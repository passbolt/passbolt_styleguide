import React, {Component} from "react";
import CreateGpgKey from "../../Authentication/CreateGpgKey/CreateGpgKey";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "../../Authentication/DownloadRecoveryKit/DownloadRecoveryKit";

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
      default:
        return <></>;
    }
  }
}

SetupAuthentication.contextType = AuthenticationContext;

export default SetupAuthentication;
