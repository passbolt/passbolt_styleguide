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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";
import PassboltServiceUnavailableError from "../../shared/lib/Error/PassboltServiceUnavailableError";
import AuthService from "../../shared/services/api/auth/AuthService";

/**
 * The ApiAccountRecovery context.
 * @type {React.Context<object>}
 */
export const ApiAccountRecoveryContext = React.createContext({
  userId: null, // The account recovery user id
  authenticationToken: null, // The account recovery authentication token
  state: null, // The current account recovery workflow state
  unexpectedError: null, // The unexpected error obejct if any
  // Whenever the initialization of the account recovery is requested.,
  onInitializeAccountRecoveryRequested: () => {
  },
  // Callback to be used when a user is unexpectedly logged in.
  logoutUserAndRefresh: () => {
  },
});

/**
 * The related context provider
 */
export class ApiAccountRecoveryContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, props.value);
    this.authService = new AuthService(props.context.getApiClientOptions());
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      userId: null, // The account recovery user id
      authenticationToken: null, // The account recovery authentication token
      state: ApiAccountRecoveryContextState.INITIAL_STATE, // The current account recovery workflow state
      unexpectedError: null, // The unexpected error obejct if any
      onInitializeAccountRecoveryRequested: this.onInitializeAccountRecoveryRequested.bind(this), // Whenever the initialization of the account recovery is requested.
      logoutUserAndRefresh: this.logoutUserAndRefresh.bind(this), // Callback to be used when a user is unexpectedly logged in.
    };
  }

  /**
   * Initialize the account recovery
   * @return {Promise<void>}
   */
  async onInitializeAccountRecoveryRequested() {
    if (!this.state.userId || !this.state.authenticationToken) {
      return this.setState({state: ApiAccountRecoveryContextState.REQUEST_INVITATION_ERROR});
    }

    try {
      await this.verifyCanContinueAccountRecovery();
      this.setState({state: ApiAccountRecoveryContextState.RESTART_FROM_SCRATCH});
    } catch (error) {
      await this.handleVerifyCanContinueAccountRecoveryError(error);
    }
  }

  /**
   * Verify the user can continue its account recovery.
   * @returns {Promise<void>}
   */
  async verifyCanContinueAccountRecovery() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("account-recovery");
    const apiClient = new ApiClient(apiClientOptions);
    await apiClient.get(`continue/${this.state.userId}/${this.state.authenticationToken}`);
  }

  /**
   * Handle error on the can continue account recovery verification.
   * @return {Promise<void>}
   */
  async handleVerifyCanContinueAccountRecoveryError(error) {
    if (error instanceof PassboltApiFetchError) {
      const isUserLoggedIn = error.data.code === 403;
      if (isUserLoggedIn) {
        return this.setState({state: ApiAccountRecoveryContextState.ERROR_ALREADY_SIGNED_IN_STATE});
      }

      const isTokenExpired = Boolean(error?.data?.body?.token?.expired);
      const isNotActive = Boolean(error?.data?.body?.token?.isActive);
      if (isTokenExpired || isNotActive) {
        return this.setState({state: ApiAccountRecoveryContextState.TOKEN_EXPIRED_STATE});
      }
    }
    this.setState({state: ApiAccountRecoveryContextState.UNEXPECTED_ERROR_STATE, unexpectedError: error});
  }

  /**
   * When the user asks for logging out before going on with the desired process.
   * @returns {Promise<void>}
   */
  async logoutUserAndRefresh() {
    try {
      await this.authService.logout();
    } catch (e) {
      const error = new PassboltServiceUnavailableError(e.message);
      return this.setState({unexpectedError: error, state: ApiAccountRecoveryContextState.UNEXPECTED_ERROR_STATE});
    }

    window.location.reload();
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
  TOKEN_EXPIRED_STATE: 'Token expired state',
  ERROR_ALREADY_SIGNED_IN_STATE: 'Error, already signed in state',
  REQUEST_INVITATION_ERROR: 'Request inviration error state',
  UNEXPECTED_ERROR_STATE: 'Unexpected error state',
};
