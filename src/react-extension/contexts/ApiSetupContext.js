/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";
import {BROWSER_NAMES, detectBrowserName} from "../../shared/lib/Browser/detectBrowserName";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";
import PassboltServiceUnavailableError from "../../shared/lib/Error/PassboltServiceUnavailableError";

/**
 * The Api setup context.
 * @type {React.Context<object>}
 */
export const ApiSetupContext = React.createContext({
  userId: null, // The setup user id
  token: null, // The setup token
  state: null, // The current setup workflow state
  unexpectedError: null, // The unexpected error obejct if any
  // Whenever the initialization of the setup is requested.
  onInitializeSetupRequested: () => {
  },
  // Callback to be used when a user is unexpectedly logged in.
  logoutUserAndRefresh: () => {
  }
});

/**
 * The related context provider
 */
class ApiSetupContextProvider extends React.Component {
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
      userId: null, // The account recovery user id
      token: null, // The recover token
      state: ApiSetupContextState.INITIAL_STATE, // The current recover workflow state
      unexpectedError: null, // The unexpected error obejct if any
      onInitializeSetupRequested: this.onInitializeSetupRequested.bind(this), // Whenever the initialization of the recover is requested.
      logoutUserAndRefresh: this.logoutUserAndRefresh.bind(this), // Callback to be used when a user is unexpectedly logged in.
    };
  }

  /**
   * Initialize the setup
   * @return {Promise<void>}
   */
  async onInitializeSetupRequested() {
    if (!this.state.userId || !this.state.token) {
      return this.setState({state: ApiSetupContextState.REQUEST_INVITATION_ERROR});
    }
    if (!this.isBrowserSupported()) {
      return this.setState({state: ApiSetupContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE});
    }

    await this.startSetup()
      .then(this.handleStartSetupSuccess.bind(this))
      .catch(this.handleStartSetupError.bind(this));
  }

  /**
   * When the setup start succeed.
   * @return {void}
   */
  handleStartSetupSuccess() {
    this.setState({state: ApiSetupContextState.INSTALL_EXTENSION_STATE});
  }

  /**
   * When the user asks for logging out before going on with the desired process.
   * @returns {Promise<void>}
   */
  async logoutUserAndRefresh() {
    try {
      const apiClientOptions = this.props.context.getApiClientOptions();
      apiClientOptions.setResourceName("auth");
      const apiClient = new ApiClient(apiClientOptions);
      const fetchOptions = {...apiClient.buildFetchOptions(), method: 'POST', redirect: "manual"};
      const url = apiClient.buildUrl(`${apiClient.baseUrl}/logout`);
      await fetch(url.toString(), fetchOptions);
    } catch (e) {
      const error = new PassboltServiceUnavailableError(e.message);
      return this.setState({unexpectedError: error, state: ApiSetupContextState.UNEXPECTED_ERROR_STATE});
    }

    window.location.reload();
  }

  /**
   * When the setup start failed.
   * @return {void}
   */
  handleStartSetupError(error) {
    if (error instanceof PassboltApiFetchError) {
      const isUserLoggedIn = error.data.code === 403;
      if (isUserLoggedIn) {
        return this.setState({state: ApiSetupContextState.ERROR_ALREADY_SIGNED_IN_STATE});
      }

      const isTokenExpired = Boolean(error.data.body?.token?.expired);
      const isTokenConsumed = Boolean(error.data.body?.token?.isActive);
      if (isTokenExpired || isTokenConsumed) {
        return this.setState({state: ApiSetupContextState.TOKEN_EXPIRED_STATE});
      }

      if (error?.data?.code === 400) {
        return this.setState({state: ApiSetupContextState.REQUEST_INVITATION_ERROR});
      }
    }
    return this.setState({state: ApiSetupContextState.UNEXPECTED_ERROR_STATE});
  }

  /**
   * Check if the browser is supported.
   * @returns {boolean}
   */
  isBrowserSupported() {
    const browserName = detectBrowserName();
    const supportedBrowserNames = [BROWSER_NAMES.CHROME, BROWSER_NAMES.FIREFOX, BROWSER_NAMES.EDGE];
    return supportedBrowserNames.includes(browserName);
  }

  /**
   * Verify the setup information.
   * @returns {Promise<object>}
   */
  async startSetup() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("setup");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.get(`install/${this.state.userId}/${this.state.token}`);
    return body;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ApiSetupContext.Provider value={this.state}>
        {this.props.children}
      </ApiSetupContext.Provider>
    );
  }
}

ApiSetupContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default withAppContext(ApiSetupContextProvider);

/**
 * API Setup Context Consumer HOC
 * @param WrappedComponent
 */
export function withApiSetupContext(WrappedComponent) {
  return class withApiSetupContext extends React.Component {
    render() {
      return (
        <ApiSetupContext.Consumer>
          {
            context => <WrappedComponent apiSetupContext={context} {...this.props} />
          }
        </ApiSetupContext.Consumer>
      );
    }
  };
}

/**
 * The setup types of state
 */
export const ApiSetupContextState = {
  INITIAL_STATE: 'Initial state',
  DOWNLOAD_SUPPORTED_BROWSER_STATE: 'Download supported browser state',
  INSTALL_EXTENSION_STATE: 'Install extension state',
  TOKEN_EXPIRED_STATE: 'Token expired state',
  ERROR_ALREADY_SIGNED_IN_STATE: 'Error, already signed in state',
  REQUEST_INVITATION_ERROR: 'Request inviration error state',
  UNEXPECTED_ERROR_STATE: 'Unexpected error state',
};
