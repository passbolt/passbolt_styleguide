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
import {ApiClient} from "../lib/apiClient/apiClient";
import {BROWSER_NAMES, detectBrowserName} from "../lib/Browser/detectBrowserName";
import PassboltApiFetchError from "../lib/Error/PassboltApiFetchError";
import getPropValue from "../lib/Object/getPropValue";

/**
 * The Api recover context.
 * @type {React.Context<object>}
 */
export const ApiRecoverContext = React.createContext({
  userId: null, // The recover user id
  token: null, // The recover token
  state: null, // The current recover workflow state
  // Whenever the initialization of the recover is requested.
  onInitializeRecoverRequested: () => {
  }
});

/**
 * The related context provider
 */
class ApiRecoverContextProvider extends React.Component {
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
      state: ApiRecoverContextState.INITIAL_STATE,
      onInitializeRecoverRequested: this.onInitializeRecoverRequested.bind(this)
    };
  }

  /**
   * Initialize the recover
   * @return {Promise<void>}
   */
  async onInitializeRecoverRequested() {
    if (!this.state.userId || !this.state.token) {
      return this.setState({state: ApiRecoverContextState.ERROR_STATE});
    }
    if (!this.isBrowserSupported()) {
      return this.setState({state: ApiRecoverContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE});
    }

    await this.verifyRecoverInfo()
      .then(this.handleRecoverVerifySuccess.bind(this))
      .catch(this.handleRecoverVerifyError.bind(this));
  }

  /**
   * When the recover info are valid.
   * @return {void}
   */
  handleRecoverVerifySuccess() {
    this.setState({state: ApiRecoverContextState.INSTALL_EXTENSION_STATE});
  }

  /**
   * When the recover info didn't validate
   * @return {void}
   */
  handleRecoverVerifyError(error) {
    if (error instanceof PassboltApiFetchError) {
      const isTokenExpired = getPropValue(error, "data.body.token.expired");
      if (isTokenExpired) {
        return this.setState({state: ApiRecoverContextState.TOKEN_EXPIRED_STATE});
      }
    }
    return this.setState({state: ApiRecoverContextState.ERROR_STATE});
  }

  /**
   * Check if the browser is supported.
   * @returns {boolean}
   */
  isBrowserSupported() {
    const browserName = detectBrowserName();
    const supportedBrowserNames = [BROWSER_NAMES.CHROME, BROWSER_NAMES.FIREFOX];
    return supportedBrowserNames.includes(browserName);
  }

  /**
   * Verify the recover information.
   * @returns {Promise<object>}
   */
  async verifyRecoverInfo() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("setup");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.get(`recover/${this.state.userId}/${this.state.token}`);
    return body;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ApiRecoverContext.Provider value={this.state}>
        {this.props.children}
      </ApiRecoverContext.Provider>
    );
  }
}

ApiRecoverContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default withAppContext(ApiRecoverContextProvider);

/**
 * API Recover Context Consumer HOC
 * @param WrappedComponent
 */
export function withApiRecoverContext(WrappedComponent) {
  return class withApiRecoverContext extends React.Component {
    render() {
      return (
        <ApiRecoverContext.Consumer>
          {
            context => <WrappedComponent apiRecoverContext={context} {...this.props} />
          }
        </ApiRecoverContext.Consumer>
      );
    }
  };
}

/**
 * The recover types of state
 */
export const ApiRecoverContextState = {
  INITIAL_STATE: 'Initial state',
  DOWNLOAD_SUPPORTED_BROWSER_STATE: 'Download supported browser state',
  INSTALL_EXTENSION_STATE: 'Install extension state',
  TOKEN_EXPIRED_STATE: 'Token expired state',
  ERROR_STATE: 'Error state',
};
