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
import SiteSettingsEntity from "../../shared/models/entity/siteSettings/siteSettingsEntity";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import AccountEntity from "../../shared/models/entity/account/accountEntity";
import RbacServiceWorkerService from "../../shared/services/serviceWorker/rbac/rbacServiceWorkerService";
import CanUse from "../../shared/services/rbacs/canUseService";
import { actions } from "../../shared/services/rbacs/actionEnumeration";
import SpinnerSVG from "../../img/svg/spinner.svg";
import { withActiveSessionLocalStorage } from "../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../shared/models/entity/session/userActiveSessionEntity";
import { BOOTSTRAP_FEATURE } from "../ExtQuickAccess";
import LogoSVG from "../../img/svg/logo.svg";

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
      await this.props.activeSessionLocalStorageContext.updateLocalStorage();
      await this.getUserSettings();
      const siteSettings = await this.getSiteSettings();
      if (this.props.activeSession.isAuthenticated) {
        if (this.props.activeSession.isMfaRequired) {
          await this.redirectToMfaAuthentication();
          return;
        }
        await this.getLoggedInUser(siteSettings);
      }
      await this.resolveCanUseOfflineMode(siteSettings);
      await this.getLocale();
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: e.message,
      });
    }
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.updateSearch = this.updateSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
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
      siteSettings: null,
      loggedInUser: null,
      account: props.account, // The account
      rbacs: null, // The role based access control
      canUseOfflineMode: null, // Whether the user can use the offline mode (null until resolved)
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
      // login success callback
      loginSuccessCallback: this.loginSuccessCallback,
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

  /**
   * Login success callback
   * If bootstrap equals login then close the window
   * Else Update the site settings and logged-in user
   * @return {Promise<void>}
   */
  async loginSuccessCallback() {
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.LOGIN) {
      await this.closeWindow();
      return;
    }

    const siteSettings = await this.getSiteSettings();
    this.getLoggedInUser(siteSettings);
  }

  /*
   * =============================================================
   *  State initialization
   * =============================================================
   */
  /**
   * Get the current user info from background page and set it in the state
   * @param {SiteSettingsEntity} siteSettings
   */
  async getLoggedInUser(siteSettings) {
    const canIUseRbac = siteSettings.canIUse("rbacs");
    const loggedInUser = await this.state.port.request("passbolt.users.find-logged-in-user");
    const rbacsDto = canIUseRbac ? await this.rbacServiceWorkerService.findMe() : [];
    const rbacs = new RbacsCollection(rbacsDto);
    this.setState({ loggedInUser, rbacs });
  }

  /**
   * Resolve whether the current user can use the offline mode and set the flag in the state.
   *
   * Offline mode is available if the offline settings are cached (offline mode configured for the org)
   * and the user's role can view offline items (RBAC). The user + rbacs are read locally only to
   * compute the flag; the logged-in user is deliberately NOT exposed on the context while unauthenticated
   * (offline settings + rbac local storages are retained on logout for offline-eligible users). Failures
   * (e.g. a non-eligible user with flushed caches) leave the flag false.
   * @param {SiteSettingsEntity} siteSettings
   * @returns {Promise<void>}
   */
  async resolveCanUseOfflineMode(siteSettings) {
    try {
      if (!siteSettings.canIUse("offlineMode")) {
        this.setState({ canUseOfflineMode: false });
        return;
      }
      const user = await this.state.port.request("passbolt.users.find-logged-in-user");
      if (!user) {
        this.setState({ canUseOfflineMode: false });
        return;
      }
      const rbacsDto = siteSettings.canIUse("rbacs") ? await this.rbacServiceWorkerService.findMe() : [];
      const rbacs = new RbacsCollection(rbacsDto);
      this.setState({ canUseOfflineMode: CanUse.canRoleUseAction(user, rbacs, actions.OFFLINE_ITEMS_VIEW) });
    } catch (error) {
      console.error(error);
      this.setState({ canUseOfflineMode: false });
    }
  }

  async getSiteSettings() {
    const siteSettingsDto = await this.state.port.request(
      "passbolt.site-settings.get-or-find",
      this.props.activeSession.isServerReachable,
    );
    const siteSettings = new SiteSettingsEntity(siteSettingsDto);
    this.setState({ siteSettings });
    return siteSettings;
  }

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

  isReady() {
    return (
      this.props.activeSession?.isAuthenticated !== null &&
      this.state.userSettings !== null &&
      this.state.siteSettings != null &&
      this.state.locale !== null &&
      this.state.canUseOfflineMode !== null
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
