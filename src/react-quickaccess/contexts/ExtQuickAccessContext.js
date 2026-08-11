/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         6.0.0
 */

import React from "react";
import AppContext from "../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import AccountEntity from "../../shared/models/entity/account/accountEntity";
import RbacServiceWorkerService from "../../shared/services/serviceWorker/rbac/rbacServiceWorkerService";
import SpinnerSVG from "../../img/svg/spinner.svg";
import { withActiveSessionLocalStorage } from "../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../shared/models/entity/session/userActiveSessionEntity";
import { BOOTSTRAP_FEATURE } from "../ExtQuickAccess";
import LogoSVG from "../../img/svg/logo.svg";
import SiteSettingsServiceWorkerService from "../../shared/services/serviceWorker/siteSettings/siteSettingsServiceWorkerService";

/**
 * The ExtApp context provider
 */
export class ExtQuickAccessContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.getDefaultState(props);
    this.rbacServiceWorkerService = new RbacServiceWorkerService(props.port);
    this.siteSettingsServiceWorkerService = new SiteSettingsServiceWorkerService(props.port);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Initialize quickaccess
   * @return {Promise<void>}
   */
  async initialize() {
    try {
      await this.checkPluginIsConfigured();
      this.getUserSettings();
      this.getLocale();
      await this.props.activeSessionLocalStorageContext.updateLocalStorage();
      const siteSettings = this.props.activeSession.isServerReachable
        ? await this.findAndUpdateSiteSettings()
        : await this.getOrFindSiteSettings();
      if (this.props.activeSession.isSessionOnline) {
        this.loadOnlineData(siteSettings);
      } else if (this.props.activeSession.isSessionOffline) {
        this.loadOfflineData(siteSettings);
      }
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: e.message,
      });
    }
  }

  /**
   * Load online data
   * - Find and update site settings
   * - If authenticated
   *  - If Mfa is required redirect to the MFA screen and close the quick-access
   *  - Get or find rbacs
   *  - Get logged-in user
   * @param {SiteSettingsEntity} siteSettings
   * @return {Promise<void>}
   */
  async loadOnlineData(siteSettings) {
    if (this.props.activeSession.isAuthenticated) {
      if (this.props.activeSession.isMfaRequired) {
        await this.redirectToMfaAuthentication();
        return;
      }
      this.getLoggedInUser();
      this.getOrFindRbacs(siteSettings);
    }
  }

  /**
   * Load offline data
   * - Get or find site settings
   * - Get or find rbacs
   * - Get logged-in user
   * @param {SiteSettingsEntity} siteSettings
   * @return {Promise<void>}
   */
  async loadOfflineData(siteSettings) {
    this.getLoggedInUser();
    this.getOrFindRbacs(siteSettings);
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.updateSearch = this.updateSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.loginOnlineSuccessCallBack = this.loginOnlineSuccessCallBack.bind(this);
    this.loginOfflineSuccessCallBack = this.loginOfflineSuccessCallBack.bind(this);
    this.redirectToMfaAuthentication = this.redirectToMfaAuthentication.bind(this);
    this.setWindowBlurBehaviour = this.setWindowBlurBehaviour.bind(this);
  }

  /**
   * Get the default state
   * @param props
   * @return {*}
   */
  getDefaultState(props) {
    return {
      storage: props.storage,
      port: props.port,
      userSettings: null,
      /*
        Important:
        Using undefined value help to know if context is ready for offline flow
        - if data from local storage are empty, the context should be ready even if the data is null
       */
      siteSettings: undefined,
      loggedInUser: undefined,
      account: props.account, // The account
      rbacs: null, // The role based access control
      hasError: false,
      errorMessage: "",
      locale: "en-UK", // To avoid any weird blink, launch the quickaccess with a default english locale
      // Search
      search: "",
      searchHistory: {},
      updateSearch: this.updateSearch,
      openerTabId: this.props.openerTabId, // Get the opener tab id, useful when used in detached mode to get info of the opener tab.
      // Manage popup blur
      shouldCloseAtWindowBlur: true, // when true the quickaccess in detached mode should close when losing focus
      setWindowBlurBehaviour: this.setWindowBlurBehaviour, // set the detached mode blur behaviour
      closeWindow: this.closeWindow,
      // authentication transitions
      loginOnlineSuccessCallBack: this.loginOnlineSuccessCallBack,
      loginOfflineSuccessCallBack: this.loginOfflineSuccessCallBack,
      // login mfa required callback
      mfaRequiredCallback: this.redirectToMfaAuthentication,
    };
  }

  /**
   * Handle key down event
   * @param event
   * @return {Promise<void>}
   */
  async handleKeyDown(event) {
    // Close the quickaccess popup when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      await this.closeWindow();
    }
  }

  /**
   * Closes the current window.
   * @returns {Promise<void>}
   */
  async closeWindow() {
    if (this.props.detached) {
      await this.state.port.request("passbolt.active-tab.close");
    } else {
      window.close();
    }
  }

  /**
   * When set to true the quickaccess in detached mode should close when losing focus
   * @param {boolean} shouldCloseAtWindowBlur
   */
  setWindowBlurBehaviour(shouldCloseAtWindowBlur) {
    this.setState({ shouldCloseAtWindowBlur });
  }

  /**
   * Check if plugin is configured
   *  - not configured will redirect to getting started passbolt page and close quickaccess
   * @return {Promise<void>}
   */
  async checkPluginIsConfigured() {
    const isConfigured = await this.state.port.request("passbolt.addon.is-configured");
    if (!isConfigured) {
      await this.props.state.request("passbolt.tabs.open-website-getting-started-page");
      await this.closeWindow();
    }
  }

  /**
   * Update search
   * @param search
   */
  updateSearch(search) {
    this.setState({ search });
  }

  /**
   * Redirect to MFA authentication.
   */
  async redirectToMfaAuthentication() {
    await this.state.port.request("passbolt.tabs.open-trusted-domain");
    await this.closeWindow();
  }

  /*
   * =============================================================
   *  Authentication transitions
   *
   *  Each transition settles the state the routed components read: the active
   *  session drives both the triage route and the private routes and returns. Navigation is
   *  left to the caller: this provider sits outside the router and has no history.
   * =============================================================
   */

  /**
   * Complete an online sign-in.
   * @return {Promise<void>}
   */
  async loginOnlineSuccessCallBack() {
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.LOGIN) {
      await this.closeWindow();
      return;
    }

    const siteSettings = await this.findAndUpdateSiteSettings();
    if (siteSettings) {
      await this.getLoggedInUser();
      await this.getOrFindRbacs(siteSettings);
    }
  }

  /**
   * Complete an offline sign-in.
   * @return {Promise<void>}
   */
  async loginOfflineSuccessCallBack() {
    await this.state.port.request("passbolt.offline.resources-update-local-storage");
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.LOGIN) {
      await this.closeWindow();
    }
  }

  /*
   * =============================================================
   *  State initialization
   * =============================================================
   */
  /**
   * Get the current user info from background page and set it in the state
   */
  async getLoggedInUser() {
    const loggedInUser = await this.state.port.request("passbolt.users.find-logged-in-user");
    this.setState({ loggedInUser });
  }

  /**
   * Get or find RBACs and set it in the state
   * @param {SiteSettingsEntity} siteSettings
   */
  async getOrFindRbacs(siteSettings) {
    const canIUseRbac = siteSettings?.canIUse("rbacs");
    const rbacsCollection = canIUseRbac ? await this.rbacServiceWorkerService.findMe() : new RbacsCollection([]);
    this.setState({ rbacs: rbacsCollection });
  }

  /**
   * Get or find site settings
   * @return {Promise<SiteSettingsEntity>}
   */
  async getOrFindSiteSettings() {
    const siteSettings = await this.siteSettingsServiceWorkerService.getOrFind();
    this.setState({ siteSettings });
    return siteSettings;
  }

  /**
   * Find and update site settings
   * @return {Promise<SiteSettingsEntity>}
   */
  async findAndUpdateSiteSettings() {
    const siteSettings = await this.siteSettingsServiceWorkerService.findAndUpdate();
    this.setState({ siteSettings });
    return siteSettings;
  }

  /**
   * Get the locale
   * @return {Promise<void>}
   */
  async getLocale() {
    const { locale } = await this.state.port.request("passbolt.locale.get");
    this.setState({ locale });
  }

  /**
   * Get the list of user settings from local storage and set it in the state
   * Using UserSettings
   */
  async getUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({ userSettings });
  }

  /**
   * Is offline data loaded
   * @return {boolean}
   */
  get isOfflineDataLoaded() {
    return this.state.loggedInUser !== undefined && this.state.rbacs != null;
  }

  /**
   * Is context data ready
   * @return {boolean}
   */
  isReady() {
    return (
      this.props.activeSession?.isAuthenticated !== null &&
      this.state.userSettings !== null &&
      this.state.siteSettings !== undefined &&
      this.state.locale !== null &&
      (this.props.activeSession.isSessionOnline || this.isOfflineDataLoaded)
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="container quickaccess" onKeyDown={this.handleKeyDown}>
          {!this.isReady() && (
            <>
              <div className="quickaccess-header">
                <div className="logo-svg">
                  <a href="#">
                    <LogoSVG role="img" width="10rem" height="1.8rem" />
                  </a>
                </div>
              </div>
              {!this.state.hasError && (
                <div className="processing-wrapper">
                  <SpinnerSVG />
                  <p className="processing-text">Connecting your account</p>
                </div>
              )}
              {this.state.hasError && (
                <div className="processing-wrapper">
                  <p className="processing-text">{this.state.errorMessage}</p>
                </div>
              )}
            </>
          )}
          {this.isReady() && this.props.children}
        </div>
      </AppContext.Provider>
    );
  }
}

ExtQuickAccessContextProvider.propTypes = {
  port: PropTypes.object, // The port
  storage: PropTypes.object, // The storage
  account: PropTypes.instanceOf(AccountEntity), // The user account
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  activeSessionLocalStorageContext: PropTypes.any, // The active session context
  openerTabId: PropTypes.string, // The opener tab id
  bootstrapFeature: PropTypes.string, // The bootstrap feature
  children: PropTypes.any, // The children components
};

export default withActiveSessionLocalStorage(ExtQuickAccessContextProvider);
