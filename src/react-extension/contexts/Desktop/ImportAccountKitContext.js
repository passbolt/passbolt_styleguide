/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";

// The import account kit workflow states.
export const ImportAccountKitWorkflowStates = {
  GET_STARTED: "Get started",
  IMPORT_ACCOUNT_KIT: "Import account kit"
};

/**
 * The account kit context provider.
 * Handle the business logic of the account kit importation and the manage the workflow.
 * @type {React.Context<{}>}
 */
export const ImportAccountKitContext = React.createContext({
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  setProcessing: () => {}, //Update processing object
  getState: () => {}, // return the workflow state
  setState: () => {}, // set the workflow state
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The account kit context provider.
 * Handle the business logic of the account kit importation and the manage the workflow.
 */
export class ImportAccountKitContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      // Workflow data.
      state: ImportAccountKitWorkflowStates.GET_STARTED, // The current login workflow state.
      processing: false, // Context is processing data

      // Public workflow mutators.
      getState: this.getState.bind(this), // return the workflow state
      setState: this.setState.bind(this), // set the workflow state
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this)
    };
  }

  /**
   * Returns the workflow state.
   * @returns {String}
   */
  getState() {
    return this.state;
  }

  /**
   * setter for the workflow state.
   * @param {String} state The workflow state
   */
  setState(state) {
    return this.setState({state});
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
   *
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * Handle processing change.
   * @params {Boolean} processing value
   * @returns {void}
   */
  setProcessing(processing) {
    this.setState({processing});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ImportAccountKitContext.Provider value={this.state}>
        {this.props.children}
      </ImportAccountKitContext.Provider>
    );
  }
}

ImportAccountKitContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(ImportAccountKitContextProvider);

/**
 * Import account kit Context Consumer HOC
 * @param WrappedComponent
 */
export function withImportAccountKitContext(WrappedComponent) {
  return class WithImportAccountKitContext extends React.Component {
    render() {
      return (
        <ImportAccountKitContext.Consumer>
          {
            importAccountKitContext => <WrappedComponent importAccountKitContext={importAccountKitContext} {...this.props} />
          }
        </ImportAccountKitContext.Consumer>
      );
    }
  };
}
