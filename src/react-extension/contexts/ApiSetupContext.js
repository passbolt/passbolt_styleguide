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
import getPropValue from "../lib/Object/getPropValue";

/**
 * The Api setup context.
 * @type {React.Context<object>}
 */
export const ApiSetupContext = React.createContext({
  userId: null, // The setup user id
  token: null, // The setup token
  state: null, // The current setup workflow state
  // Whenever the initialization of the setup is requested.
  onInitializeSetupRequested: () => {
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
      userId: null,
      token: null,
      state: ApiSetupContextState.INITIAL_STATE,
      onInitializeSetupRequested: this.onInitializeSetupRequested.bind(this)
    };
  }

  /**
   * Initialize the setup
   * @return {Promise<void>}
   */
  async onInitializeSetupRequested() {
    if (!this.state.userId || !this.state.token) {
      return this.setState({state: ApiSetupContextState.ERROR_STATE});
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
   * When the setup start failed.
   * @return {void}
   */
  handleStartSetupError(error) {
    if (error instanceof PassboltApiFetchError) {
      const isTokenExpired = getPropValue(error, "data.body.token.expired");
      if (isTokenExpired) {
        return this.setState({state: ApiSetupContextState.TOKEN_EXPIRED_STATE});
      }
    }
    return this.setState({state: ApiSetupContextState.ERROR_STATE});
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
  ERROR_STATE: 'Error state',
};
