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
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { ApiClient } from "../../shared/lib/apiClient/apiClient";
import { BROWSER_NAMES, detectBrowserName } from "../../shared/lib/Browser/detectBrowserName";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";
import PassboltServiceUnavailableError from "../../shared/lib/Error/PassboltServiceUnavailableError";
import AuthLogoutService from "../../shared/services/api/auth/AuthLogoutService";
import WindowNavigationService from "../../shared/utils/windowNavigationService";

/**
 * The Api recover context.
 * @type {React.Context<object>}
 */
export const ApiRecoverContext = React.createContext({
  userId: null, // The recover user id
  token: null, // The recover token
  state: null, // The current recover workflow state
  unexpectedError: null, // The unexpected error obejct if any
  // Whenever the initialization of the recover is requested.
  onInitializeRecoverRequested: () => {},
  // Callback to be used when a user is unexpectedly logged in.
  logoutUserAndRefresh: () => {},
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
    this.authLogoutService = new AuthLogoutService(props.context.getApiClientOptions());
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      userId: null, // The recover user id
      token: null, // The recover token
      state: ApiRecoverContextState.INITIAL_STATE, // The current recover workflow state
      unexpectedError: null, // The unexpected error obejct if any
      onInitializeRecoverRequested: this.onInitializeRecoverRequested.bind(this), // Whenever the initialization of the recover is requested.
      logoutUserAndRefresh: this.logoutUserAndRefresh.bind(this), // Callback to be used when a user is unexpectedly logged in.
      handleSafariExtensionDownloading: this.handleSafariExtensionDownloading.bind(this), // callback when user clicked on the Safari extension download button
      handleSafariExtensionNotDownloaded: this.handleSafariExtensionNotDownloaded.bind(this), // callback when user clicked on the "I didn't download the Safari extension" button
      handleExtensionAlreadyInstalled: this.handleExtensionAlreadyInstalled.bind(this), // callback when user clicked on "already installed extension" button
    };
  }

  /**
   * Initialize the recover
   * @return {Promise<void>}
   */
  async onInitializeRecoverRequested() {
    if (!this.state.userId || !this.state.token) {
      return this.setState({ state: ApiRecoverContextState.REQUEST_INVITATION_ERROR });
    }
    if (!this.isBrowserSupported()) {
      return this.setState({ state: ApiRecoverContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE });
    }

    await this.startRecover()
      .then(this.handleStartRecoverSuccess.bind(this))
      .catch(this.handleStartRecoverError.bind(this));
  }

  /**
   * When the recover started with success.
   * @return {void}
   */
  handleStartRecoverSuccess() {
    const currentBrowser = detectBrowserName();

    const state =
      currentBrowser === BROWSER_NAMES.SAFARI
        ? ApiRecoverContextState.INSTALL_SAFARI_EXTENSION_STATE
        : ApiRecoverContextState.INSTALL_EXTENSION_STATE;

    this.setState({ state });
  }

  /**
   * When the user click on the Safari extension link for downloading.
   * @return {void}
   */
  handleSafariExtensionDownloading() {
    const state = ApiRecoverContextState.CONFIGURE_SAFARI_EXTENSION_STATE;
    this.setState({ state });
  }

  /**
   * When the user click on "I didn't download the extension".
   * @return {void}
   */
  handleSafariExtensionNotDownloaded() {
    const state = ApiRecoverContextState.INSTALL_SAFARI_EXTENSION_STATE;
    this.setState({ state });
  }

  /**
   * When the user click on "Already installed extension" button.
   * @return {void}
   */
  handleExtensionAlreadyInstalled() {
    const state = ApiRecoverContextState.CONFIGURE_SAFARI_EXTENSION_STATE;
    this.setState({ state });
  }

  /**
   * When the recover didn't start with success.
   * @return {void}
   */
  handleStartRecoverError(error) {
    if (error instanceof PassboltApiFetchError) {
      const isUserLoggedIn = error.data.code === 403;
      if (isUserLoggedIn) {
        return this.setState({ state: ApiRecoverContextState.ERROR_ALREADY_SIGNED_IN_STATE });
      }

      const isTokenExpired = Boolean(error.data.body?.token?.expired);
      const isTokenConsumed = Boolean(error.data.body?.token?.isActive);
      if (isTokenExpired || isTokenConsumed) {
        return this.setState({ state: ApiRecoverContextState.TOKEN_EXPIRED_STATE });
      }

      if (error?.data?.code === 400) {
        return this.setState({ state: ApiRecoverContextState.REQUEST_INVITATION_ERROR });
      }
    }
    return this.setState({ state: ApiRecoverContextState.UNEXPECTED_ERROR_STATE });
  }

  /**
   * When the user asks for logging out before going on with the desired process.
   * @returns {Promise<void>}
   */
  async logoutUserAndRefresh() {
    try {
      await this.authLogoutService.logout();
    } catch (e) {
      const error = new PassboltServiceUnavailableError(e.message);
      return this.setState({ unexpectedError: error, state: ApiRecoverContextState.UNEXPECTED_ERROR_STATE });
    }

    WindowNavigationService.reload();
  }

  /**
   * Check if the browser is supported.
   * @returns {boolean}
   */
  isBrowserSupported() {
    const browserName = detectBrowserName();
    const supportedBrowserNames = [BROWSER_NAMES.CHROME, BROWSER_NAMES.FIREFOX, BROWSER_NAMES.EDGE];

    const isSafariEnabled = this.props.context.siteSettings.canIUse("safari");
    if (isSafariEnabled) {
      supportedBrowserNames.push(BROWSER_NAMES.SAFARI);
    }

    return supportedBrowserNames.includes(browserName);
  }

  /**
   * Start the recover.
   * @returns {Promise<void>}
   */
  async startRecover() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("setup");
    const apiClient = new ApiClient(apiClientOptions);
    await apiClient.get(`recover/${this.state.userId}/${this.state.token}`);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <ApiRecoverContext.Provider value={this.state}>{this.props.children}</ApiRecoverContext.Provider>;
  }
}

ApiRecoverContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any, // The children components
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
          {(context) => <WrappedComponent apiRecoverContext={context} {...this.props} />}
        </ApiRecoverContext.Consumer>
      );
    }
  };
}

/**
 * The recover types of state
 */
export const ApiRecoverContextState = {
  INITIAL_STATE: "Initial state",
  DOWNLOAD_SUPPORTED_BROWSER_STATE: "Download supported browser state",
  INSTALL_EXTENSION_STATE: "Install extension state",
  INSTALL_SAFARI_EXTENSION_STATE: "Install Safari extension state",
  CONFIGURE_SAFARI_EXTENSION_STATE: "Configure Safari extension state",
  TOKEN_EXPIRED_STATE: "Token expired state",
  ERROR_ALREADY_SIGNED_IN_STATE: "Error, already signed in state",
  REQUEST_INVITATION_ERROR: "Request inviration error state",
  UNEXPECTED_ERROR_STATE: "Unexpected error state",
};
