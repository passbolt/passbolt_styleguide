/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */
import React from "react";
import AppContext from "../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import SiteSettings from "../../shared/lib/Settings/SiteSettings";
import {ApiClientOptions} from "../../shared/lib/apiClient/apiClientOptions";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";
import PassboltSubscriptionError from "../lib/Error/PassboltSubscriptionError";
import {CsrfToken} from "../../shared/lib/apiClient/csrfToken";
import RbacMeService from "../../shared/services/api/rbac/rbacMeService";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import AuthService from "../../shared/services/api/auth/AuthService";

const IS_AUTHENTICATED_CHECK_PERIOD = 60000;

/**
 * The ApiApp context provider
 */
class ApiAppContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.authService = new AuthService(this.getApiClientOptions());
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.getLoggedInUser();
    await this.getSiteSettings();
    await this.getRbacs();
    this.initLocale();
    this.removeSplashScreen();
  }

  /**
   * Whenever the component is unmount.
   */
  componentWillUnmount() {
    clearTimeout(this.state.onExpiredSession);
  }

  /**
   * Default state
   * @returns {object}
   */
  get defaultState() {
    return {
      name: "api", // The application name
      loggedInUser: null, // The logged in user
      rbacs: null, // The logged in user
      siteSettings: null, // The site settings
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      basename: (new URL(this.baseUrl)).pathname, // Base path to be used for routing if needed ex. /workspace
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options
      locale: null, // The locale

      displayTestUserDirectoryDialogProps: {
        userDirectoryTestResult: null, // The result of the test user directory
      },

      // @todo check if still necessary
      setContext: context => {
        this.setState(context);
      },

      // Navigation
      onLogoutRequested: () => this.onLogoutRequested(),
      onCheckIsAuthenticatedRequested: () => this.onCheckIsAuthenticatedRequested(),

      // Expired session
      onExpiredSession: this.onExpiredSession.bind(this),

      // Subscription
      onGetSubscriptionKeyRequested: () => this.onGetSubscriptionKeyRequested(),

      // Locale
      onRefreshLocaleRequested: this.onRefreshLocaleRequested.bind(this)
    };
  }

  /**
   * Returns true when the component can be rendered
   */
  get isReady() {
    return this.state.loggedInUser !== null
      && this.state.rbacs !== null
      && this.state.siteSettings !== null
      && this.state.locale !== null;
  }

  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    const baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, '');
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setCsrfToken(CsrfToken.getToken());
  }

  /**
   * Retrieve the logged in user.
   * @returns {Promise<object>}
   */
  async getLoggedInUser() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("users");
    const apiClient = new ApiClient(apiClientOptions);
    const result = await apiClient.get("me");
    const loggedInUser = result.body;
    this.setState({loggedInUser});
  }

  /**
   * Retrieve the rbacs.
   * @returns {Promise<object>}
   */
  async getRbacs() {
    const canIUseRbac = this.state.siteSettings.canIUse('rbacs');
    let rbacsDto = [];
    if (canIUseRbac) {
      const apiClientOptions = this.getApiClientOptions();
      const rbacService = new RbacMeService(apiClientOptions);
      rbacsDto = await rbacService.findMe({ui_action: true});
    }
    const rbacs = new RbacsCollection(rbacsDto);
    this.setState({rbacs});
  }

  /**
   * Fetch the site settings
   */
  async getSiteSettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const siteSettings = await apiClient.findAll();
    await this.setState({siteSettings: new SiteSettings(siteSettings.body)});
  }

  /**
   * Get the locale following this priority:
   * 1. The user locale if set;
   * 2. The organization locale;
   * @warning Require the site settings to be fetch to work.
   */
  async initLocale() {
    const userLocale = await this.getUserLocale();
    if (userLocale) {
      return this.setState({locale: userLocale.locale});
    }

    const organizationLocale = this.state.siteSettings.locale;
    return this.setState({locale: organizationLocale});
  }

  /**
   * Get the user locale.
   * @returns {Promise<object>}
   */
  async getUserLocale() {
    const userSettings = await this.getUserSettings();
    const userLocaleSettings = userSettings.find(userSetting => userSetting.property === "locale");
    if (userLocaleSettings) {
      return this.state.siteSettings.supportedLocales.find(supportedLocale => supportedLocale.locale === userLocaleSettings.value);
    }
  }

  /**
   * Get the user settings.
   * @returns {Promise<array>}
   */
  async getUserSettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("account/settings");
    const apiClient = new ApiClient(apiClientOptions);
    const userSettings = await apiClient.findAll();
    return userSettings.body;
  }

  /**
   * Remove the splashscreen.
   */
  removeSplashScreen() {
    document.getElementsByTagName("html")[0].classList.remove("launching");
  }

  /**
   * Listen when the user wants to logout.
   */
  async onLogoutRequested() {
    await this.authService.logout();
    window.location.reload();
  }

  /**
   * Whenever the user authentication status must be checked
   * @return {Promise<boolean>}
   * @throw Error if an unexpected error occurred while checking the session
   */
  async onCheckIsAuthenticatedRequested() {
    try {
      const apiClientOptions = this.getApiClientOptions().setResourceName("auth");
      const apiClient = new ApiClient(apiClientOptions);
      await apiClient.get('is-authenticated');
      return true;
    } catch (error) {
      if (error instanceof PassboltApiFetchError) {
        if (error.data.code === 401) {
          return false;
        }
      }
      throw error;
    }
  }

  /**
   * Check when the user session is expired and execute the callback.
   * @param {function} callback The callback to execute
   */
  onExpiredSession(callback) {
    this.scheduledCheckIsAuthenticatedTimeout = setTimeout(async() => {
      const isAuthenticated = await this.onCheckIsAuthenticatedRequested();
      if (!isAuthenticated) {
        callback();
      } else {
        this.onExpiredSession(callback);
      }
    }, IS_AUTHENTICATED_CHECK_PERIOD);
  }

  /**
   * Whenever the subsription key is requested
   * @return {Promise<Object>}
   * @throw Error if an unexpected error occurred while get the subscription key
   */
  async onGetSubscriptionKeyRequested() {
    try {
      const apiClientOptions = this.getApiClientOptions().setResourceName("ee/subscription");
      const apiClient = new ApiClient(apiClientOptions);
      const subscription = await apiClient.get('key');
      return subscription.body;
    } catch (error) {
      if (error instanceof PassboltApiFetchError) {
        const isPaymentRequired = error.data && error.data.code === 402;
        if (isPaymentRequired) {
          const subscriptionKey = error.data.body;
          throw new PassboltSubscriptionError(error.message, subscriptionKey);
        }
      }
      throw error;
    }
  }

  /**
   * Refresh the organization locale
   * @param locale
   */
  onRefreshLocaleRequested(locale) {
    this.state.siteSettings.setLocale(locale);
    this.initLocale();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.isReady && this.props.children}
      </AppContext.Provider>
    );
  }
}

ApiAppContextProvider.propTypes = {
  children: PropTypes.any // The children components
};

export default ApiAppContextProvider;
