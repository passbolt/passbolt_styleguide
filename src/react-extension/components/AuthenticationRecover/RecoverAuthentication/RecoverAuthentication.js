import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import ImportGpgKey from "../../Authentication/ImportGpgKey/ImportGpgKey";

/**
 * The component allows the user to recover his authentication
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
    this.handleCompleteRecover();
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
      default:
        return <></>;
    }
  }
}

RecoverAuthentication.contextType = AuthenticationContext;

export default RecoverAuthentication;
