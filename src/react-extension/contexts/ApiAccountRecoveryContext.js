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
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";

/**
 * The ApiAccountRecovery context.
 * @type {React.Context<object>}
 */
export const ApiAccountRecoveryContext = React.createContext({
  accountRecoveryRequestId: null, // The account recovery request id
  userId: null, // The account recovery user id
  authenticationToken: null, // The account recovery authentication token
  state: null, // The current account recovery workflow state
  onInitializeAccountRecoveryRequested: () => {
  } // Whenever the initialization of the account recovery is requested.
});

/**
 * The related context provider
 */
class ApiAccountRecoveryContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, props.value);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      accountRecoveryRequestId: null, // The account recovery request id
      userId: null, // The account recovery user id
      authenticationToken: null, // The account recovery authentication token
      state: ApiAccountRecoveryContextState.INITIAL_STATE, // The current account recovery workflow state
      onInitializeAccountRecoveryRequested:  this.onInitializeAccountRecoveryRequested.bind(this) // Whenever the initialization of the account recovery is requested.
    };
  }

  /**
   * Initialize the account recovery
   * @return {Promise<void>}
   */
  async onInitializeAccountRecoveryRequested() {
    if (!this.state.accountRecoveryRequestId || !this.state.userId || !this.state.authenticationToken) {
      return this.setState({state: ApiAccountRecoveryContextState.ERROR_STATE});
    }

    await this.verifyAccountRecoveryInfo()
      .then(this.handleAccountRecoveryVerifySuccess.bind(this))
      .catch(this.handleAccountRecoveryVerifyError.bind(this));
  }

  /**
   * Verify the account recovery information.
   * @returns {Promise<object>}
   */
  async verifyAccountRecoveryInfo() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("account-recovery");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.get(`requests/${this.state.accountRecoveryRequestId}/${this.state.userId}/${this.state.authenticationToken}`);
    return body;
  }

  /**
   * When the account recovery info are valid.
   * @return {void}
   */
  handleAccountRecoveryVerifySuccess() {
    this.setState({state: ApiAccountRecoveryContextState.RESTART_FROM_SCRATCH});
  }

  /**
   * When the account recovery info didn't validate
   * @return {void}
   */
  handleAccountRecoveryVerifyError(error) {
    return this.setState({state: ApiAccountRecoveryContextState.ERROR_STATE, error: error});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ApiAccountRecoveryContext.Provider value={this.state}>
        {this.props.children}
      </ApiAccountRecoveryContext.Provider>
    );
  }
}

ApiAccountRecoveryContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default withAppContext(ApiAccountRecoveryContextProvider);

/**
 * API Account Recovery Context Consumer HOC
 * @param WrappedComponent
 */
export function withApiAccountRecoveryContext(WrappedComponent) {
  return class withApiRecoverContext extends React.Component {
    render() {
      return (
        <ApiAccountRecoveryContext.Consumer>
          {
            context => <WrappedComponent apiAccountRecoveryContext={context} {...this.props} />
          }
        </ApiAccountRecoveryContext.Consumer>
      );
    }
  };
}

/**
 * The account recovery types of state
 */
export const ApiAccountRecoveryContextState = {
  INITIAL_STATE: 'Initial state',
  RESTART_FROM_SCRATCH: 'Restart from scratch state',
  ERROR_STATE: 'Error state',
};
