import browser from "webextension-polyfill";
import React from "react";
import AppContext from "./contexts/AppContext";
import FilterResourcesByFavoritePage from "./components/FilterResourcesByFavoritePage/FilterResourcesByFavoritePage";
import FilterResourcesByItemsIOwnPage from "./components/FilterResourcesByItemsIOwnPage/FilterResourcesByItemsIOwnPage";
import FilterResourcesByGroupPage from "./components/FilterResourcesByGroupPage/FilterResourcesByGroupPage";
import FilterResourcesByRecentlyModifiedPage
  from "./components/FilterResourcesByRecentlyModifiedPage/FilterResourcesByRecentlyModifiedPage";
import FilterResourcesBySharedWithMePage
  from "./components/FilterResourcesBySharedWithMePage/FilterResourcesBySharedWithMePage";
import FilterResourcesByTagPage from "./components/FilterResourcesByTagPage/FilterResourcesByTagPage";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import MoreFiltersPage from "./components/MoreFiltersPage/MoreFiltersPage";
import ResourceCreatePage from "./components/ResourceCreatePage/ResourceCreatePage";
import ResourceViewPage from "./components/ResourceViewPage/ResourceViewPage";
import Search from "./components/Search/Search";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AnimatedSwitch from "./components/AnimatedSwitch/AnimatedSwitch";
import PassphraseDialog from "./components/PassphraseDialog/PassphraseDialog";
import PropTypes from "prop-types";
import SiteSettings from "../shared/lib/Settings/SiteSettings";
import UserSettings from "../shared/lib/Settings/UserSettings";
import TranslationProvider from "../shared/components/Internationalisation/TranslationProvider";
import SetupExtensionInProgress from "./components/ExtensionSetup/SetupExtensionInProgress/SetupExtensionInProgress";
import ManageQuickAccessMode from "./components/ManageQuickAccessMode/ManageQuickAccessMode";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SaveResource from "./components/ResourceAutoSave/SaveResource";
import GeneratePasswordPage from "./components/GeneratePasswordPage/GeneratePasswordPage";
import PrepareResourceContextProvider from "./contexts/PrepareResourceContext";
import Icon from "../shared/components/Icons/Icon";

const SEARCH_VISIBLE_ROUTES = [
  '/data/quickaccess.html',
  '/data/quickaccess/resources/favorite',
  '/data/quickaccess/resources/group',
  '/data/quickaccess/resources/owned-by-me',
  '/data/quickaccess/resources/recently-modified',
  '/data/quickaccess/resources/shared-with-me',
  '/data/quickaccess/resources/tag'
];

const PASSBOLT_GETTING_STARTED_URL = "https://www.passbolt.com/start";

class ExtQuickAccess extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.bindCallbacks();
    this.state = this.initState(props);
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    const options = this.state.siteSettings.getRememberMeOptions();
    return options !== null && Object.keys(options).length > 0;
  }

  bindCallbacks() {
    this.focusSearch = this.focusSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handlekeyDown = this.handleKeyDown.bind(this);
    this.handleBackgroundPageRequiresPassphraseEvent = this.handleBackgroundPageRequiresPassphraseEvent.bind(this);
    this.handlePassphraseDialogCompleted = this.handlePassphraseDialogCompleted.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
    this.logoutSuccessCallback = this.logoutSuccessCallback.bind(this);
    this.mfaRequiredCallback = this.mfaRequiredCallback.bind(this);
  }

  async componentDidMount() {
    try {
      this.state.port.on('passbolt.passphrase.request', this.handleBackgroundPageRequiresPassphraseEvent);
      this.handlePassphraseRequest();
      await this.checkPluginIsConfigured();
      await this.getUser();
      await this.checkAuthStatus();
      await this.getSiteSettings();
      this.getLocale();
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: e.message
      });
    }
  }

  initState(props) {
    return {
      storage: props.storage,
      port: props.port,
      isAuthenticated: null,
      userSettings: null,
      siteSettings: null,
      hasError: false,
      errorMessage: "",
      locale: "en-UK", // To avoid any weird blink, launch the quickaccess with a default english locale
      // Search
      search: "",
      searchHistory: {},
      updateSearch: this.updateSearch,
      focusSearch: this.focusSearch,
      // Passphrase
      passphraseRequired: false,
      passphraseRequestId: '',
      // Tab id to refer to the good one if detached mode
      tabId: this.getTabIdFromUrl(),
    };
  }

  /**
   * Get the tabId from URL
   * @returns {string}
   */
  getTabIdFromUrl() {
    const queryParameters = new URLSearchParams(window.location.search);
    return queryParameters.get('tabId');
  }

  updateSearch(search) {
    this.setState({search});
  }

  focusSearch() {
    if (this.searchRef.current) {
      this.searchRef.current.focus();
    }
  }

  async checkPluginIsConfigured() {
    const isConfigured = await this.state.port.request('passbolt.addon.is-configured');
    if (!isConfigured) {
      browser.tabs.create({url: PASSBOLT_GETTING_STARTED_URL});
      window.close();
    }
  }

  async getUser() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({userSettings});
  }

  async getSiteSettings() {
    const siteSettingsDto = await this.state.port.request('passbolt.organization-settings.get');
    const siteSettings = new SiteSettings(siteSettingsDto);
    this.setState({siteSettings});
  }

  async getLocale() {
    const {locale} = await this.state.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Is feature is present
   * @param feature {string}
   * @returns {boolean}
   */
  isInFeature(feature) {
    const queryParameters = new URLSearchParams(window.location.search);
    return queryParameters.get("feature") === feature;
  }

  /**
   * Retrieve the authentication status.
   *
   * If the user is authenticated but the MFA challenge is required, close the quickaccess and redirect the user to
   * the passbolt application.
   *
   * This function requires the user settings to be present in the component state.
   * @returns {Promise<void>}
   */
  async checkAuthStatus() {
    const {isAuthenticated, isMfaRequired} = await this.state.port.request("passbolt.auth.check-status");
    if (isMfaRequired) {
      this.redirectToMfaAuthentication();
      return;
    }
    this.setState({isAuthenticated});
  }

  redirectToMfaAuthentication() {
    browser.tabs.create({url: this.state.userSettings.getTrustedDomain()});
    window.close();
  }

  loginSuccessCallback() {
    if (!this.isInFeature('login')) {
      this.getSiteSettings();
      this.setState({isAuthenticated: true});
    } else {
      window.close();
    }
  }

  logoutSuccessCallback() {
    this.setState({isAuthenticated: false});
  }

  mfaRequiredCallback(url) {
    browser.tabs.create({url});
    window.close();
  }

  handleKeyDown(event) {
    // Close the quickaccess popup when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      window.close();
    }
  }

  handleBackgroundPageRequiresPassphraseEvent(requestId) {
    this.setState({passphraseRequired: true, passphraseRequestId: requestId});
  }

  handlePassphraseDialogCompleted() {
    if (this.isInFeature("request-passphrase")) {
      window.close();
    } else {
      this.setState({passphraseRequired: false, passphraseRequestId: null});
    }
  }

  handlePassphraseRequest() {
    if (this.isInFeature("request-passphrase")) {
      const queryParameters = new URLSearchParams(window.location.search);
      this.handleBackgroundPageRequiresPassphraseEvent(queryParameters.get("requestId"));
    }
  }

  isReady() {
    return this.state.isAuthenticated !== null
      && this.state.userSettings !== null
      && this.state.siteSettings != null
      && this.state.locale !== null;
  }

  render() {
    const isReady = this.isReady();

    return (
      <AppContext.Provider value={this.state}>
        <TranslationProvider loadingPath="/data/locales/{{lng}}/{{ns}}.json" locale={this.state?.locale}>
          <Router>
            <div className="container quickaccess" onKeyDown={this.handleKeyDown}>
              <Header logoutSuccessCallback={this.logoutSuccessCallback}/>
              {!isReady && !this.state.hasError &&
              <div className="processing-wrapper">
                <Icon name="spinner"/>
                <p className="processing-text">Connecting your account</p>
              </div>
              }
              {this.state.hasError &&
              <div className="processing-wrapper">
                <p className="processing-text">{this.state.errorMessage}</p>
              </div>
              }
              {isReady &&
              <React.Fragment>
                <ManageQuickAccessMode/>
                {this.state.passphraseRequired &&
                <PassphraseDialog requestId={this.state.passphraseRequestId} onComplete={this.handlePassphraseDialogCompleted}/>
                }
                <div className={`${this.state.passphraseRequired ? "visually-hidden" : ""}`}>
                  <Route path={SEARCH_VISIBLE_ROUTES} render={() => (
                    <Search ref={el => this.searchRef = el}/>
                  )}/>
                  <PrepareResourceContextProvider>
                    <AnimatedSwitch>
                      <Route path="/data/quickaccess/login" render={() => (
                        <LoginPage
                          loginSuccessCallback={this.loginSuccessCallback}
                          mfaRequiredCallback={this.mfaRequiredCallback}
                          canRememberMe={this.canRememberMe}/>
                      )}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/group" component={FilterResourcesByGroupPage}/>
                      <PrivateRoute path="/data/quickaccess/resources/group/:id" component={FilterResourcesByGroupPage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/tag" component={FilterResourcesByTagPage}/>
                      <PrivateRoute path="/data/quickaccess/resources/tag/:id" component={FilterResourcesByTagPage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/favorite" component={FilterResourcesByFavoritePage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/owned-by-me" component={FilterResourcesByItemsIOwnPage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/recently-modified" component={FilterResourcesByRecentlyModifiedPage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/shared-with-me" component={FilterResourcesBySharedWithMePage}/>
                      <PrivateRoute path="/data/quickaccess/resources/create" component={ResourceCreatePage}/>
                      <PrivateRoute exact path="/data/quickaccess/resources/autosave" component={SaveResource}/>
                      <PrivateRoute path="/data/quickaccess/resources/view/:id" component={ResourceViewPage}/>
                      <PrivateRoute exact path="/data/quickaccess/more-filters" component={MoreFiltersPage}/>
                      <PrivateRoute exact path="/data/quickaccess/setup-extension-in-progress" component={SetupExtensionInProgress}/>
                      <PrivateRoute path="/data/quickaccess/resources/generate-password" component={GeneratePasswordPage}/>
                      <PrivateRoute exact path="/data/quickaccess.html" component={HomePage}/>
                    </AnimatedSwitch>
                  </PrepareResourceContextProvider>
                </div>
              </React.Fragment>
              }
            </div>
          </Router>
        </TranslationProvider>
      </AppContext.Provider>
    );
  }
}

ExtQuickAccess.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtQuickAccess;
