import React from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";
import SiteSettings from "../lib/Settings/SiteSettings";
import {ApiClientOptions} from "../lib/apiClient/apiClientOptions";
import {ApiClient} from "../lib/apiClient/apiClient";
import PassboltApiFetchError from "../lib/Error/passboltApiFetchError";
import PassboltSubscriptionError from "../lib/Error/PassboltSubscriptionError";

/**
 * The ApiApp context provider
 */
class ApiAppContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.getLoggedInUser();
    await this.getSiteSettings();
    this.removeSplashScreen();
  }

  /**
   * Default state
   * @returns {object}
   */
  getDefaultState(props) {
    return {
      name: "api", // The application name
      loggedInUser: null, // The logged in user
      siteSettings: null, // The site settings
      trustedDomain: props.trustedDomain, // The site domain (use trusted domain for compatibility with browser extension applications)
      basename: props.basename, // Base path to be used for routing if needed ex. /workspace
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options

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

      // Subscription
      onGetSubscriptionKeyRequested: () => this.onGetSubscriptionKeyRequested(),
    };
  }

  /**
   * Returns true when the component can be rendered
   */
  get isReady() {
    // Waiting for the site settings to have the appropriate redirection
    return this.state.siteSettings;
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setCsrfToken(this.getCsrfToken());
  }

  /**
   * Get csrf token
   * @returns {string}
   */
  getCsrfToken() {
    const cookieString = document.cookie;
    if (!cookieString) {
      return undefined;
    }
    const cookieArray = cookieString.split('; ');
    if (!cookieArray) {
      return undefined;
    }
    const csrfCookie = cookieArray.find(row => row.startsWith('csrfToken'));
    if (!csrfCookie) {
      return undefined;
    }
    const csrfToken = csrfCookie.split('=');
    if (csrfToken && csrfToken.length === 2) {
      return csrfToken[1];
    }

    return undefined;
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
   * Fetch the site settings
   */
  async getSiteSettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const siteSettings = await apiClient.findAll();
    await this.setState({siteSettings: new SiteSettings(siteSettings.body)});
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
  onLogoutRequested() {
    document.location.href = `${this.state.trustedDomain}/auth/logout`;
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
        if (error.data.code === 403) {
          return false;
        }
      }
      throw error;
    }
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isReady = this.isReady;
    return (
      <AppContext.Provider value={this.state}>
        {isReady && this.props.children}
      </AppContext.Provider>
    );
  }
}

ApiAppContextProvider.propTypes = {
  basename: PropTypes.string, // The basename
  trustedDomain: PropTypes.string, // The trusted domain
  children: PropTypes.any // The children components
};

export default ApiAppContextProvider;
