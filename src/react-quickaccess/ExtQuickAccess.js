import browser from "webextension-polyfill";
import React from "react";
import FilterResourcesByFavoritePage from "./components/FilterResourcesByFavoritePage/FilterResourcesByFavoritePage";
import FilterResourcesByItemsIOwnPage from "./components/FilterResourcesByItemsIOwnPage/FilterResourcesByItemsIOwnPage";
import FilterResourcesByGroupPage from "./components/FilterResourcesByGroupPage/FilterResourcesByGroupPage";
import FilterResourcesByRecentlyModifiedPage from "./components/FilterResourcesByRecentlyModifiedPage/FilterResourcesByRecentlyModifiedPage";
import FilterResourcesBySharedWithMePage from "./components/FilterResourcesBySharedWithMePage/FilterResourcesBySharedWithMePage";
import FilterResourcesByTagPage from "./components/FilterResourcesByTagPage/FilterResourcesByTagPage";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import MoreFiltersPage from "./components/MoreFiltersPage/MoreFiltersPage";
import ResourceCreatePage from "./components/ResourceCreatePage/ResourceCreatePage";
import ResourceViewPage from "./components/ResourceViewPage/ResourceViewPage";
import Search from "./components/Search/Search";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
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
import SpinnerSVG from "../img/svg/spinner.svg";
import SsoContextProvider from "./contexts/SsoContext";
import RbacsCollection from "../shared/models/entity/rbac/rbacsCollection";
import AppContext from "../shared/context/AppContext/AppContext";
import PasswordPoliciesContext from "../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import PasswordExpirySettingsContextProvider from "../react-extension/contexts/PasswordExpirySettingsContext";
import ConfirmCreatePage from "./components/ConfirmCreatePage/ConfirmCreatePage";
import ResourceLocalStorageProvider from "./contexts/ResourceLocalStorageContext";
import ResourceTypesLocalStorageContextProvider from "../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import MetadataTypesSettingsLocalStorageContextProvider from "../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import AccountEntity from "../shared/models/entity/account/accountEntity";
import ConfirmMetadataKeyDialog from "./components/ConfirmMetadataKeyPage/ConfirmMetadataKeyPage";
import MetadataKeyEntity from "../shared/models/entity/metadata/metadataKeyEntity";
import MetadataTrustedKeyEntity from "../shared/models/entity/metadata/metadataTrustedKeyEntity";
import MetadataKeysSettingsLocalStorageContextProvider from "../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import ActionAbortedMissingMetadataKeysPage from "./components/ActionAbortedMissingMetadataKeysPage/ActionAbortedMissingMetadataKeysPage";
import RbacServiceWorkerService from "../shared/services/serviceWorker/rbac/rbacServiceWorkerService";

const SEARCH_VISIBLE_ROUTES = [
  "/webAccessibleResources/quickaccess/home",
  "/webAccessibleResources/quickaccess/resources/favorite",
  "/webAccessibleResources/quickaccess/resources/group",
  "/webAccessibleResources/quickaccess/resources/owned-by-me",
  "/webAccessibleResources/quickaccess/resources/recently-modified",
  "/webAccessibleResources/quickaccess/resources/shared-with-me",
  "/webAccessibleResources/quickaccess/resources/tag",
];

const PASSBOLT_GETTING_STARTED_URL = "https://www.passbolt.com/start";

// Supported bootstrap features.
export const BOOTSTRAP_FEATURE = {
  LOGIN: "login",
  CREATE_NEW_CREDENTIALS: "create-new-credentials",
  SAVE_CREDENTIALS: "save-credentials",
  AUTOSAVE_CREDENTIALS: "autosave-credentials",
  REQUEST_PASSPHRASE: "request-passphrase",
};

class ExtQuickAccess extends React.Component {
  constructor(props) {
    super(props);
    this.createRefs();
    this.bindCallbacks();
    this.state = this.getDefaultState(props);
    this.rbacServiceWorkerService = new RbacServiceWorkerService(props.port);
    this.getAccount();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.searchRef = React.createRef();
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    const options = this.state.siteSettings.getRememberMeOptions();
    return options !== null && typeof options[-1] !== "undefined";
  }

  /**
   * Bind callbacks methods.
   * @return {void}
   */
  bindCallbacks() {
    this.focusSearch = this.focusSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackgroundPageRequiresPassphraseEvent = this.handleBackgroundPageRequiresPassphraseEvent.bind(this);
    this.handlePassphraseDialogCompleted = this.handlePassphraseDialogCompleted.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
    this.logoutSuccessCallback = this.logoutSuccessCallback.bind(this);
    this.mfaRequiredCallback = this.mfaRequiredCallback.bind(this);
    this.setWindowBlurBehaviour = this.setWindowBlurBehaviour.bind(this);
    this.getOpenerTabId = this.getOpenerTabId.bind(this);
    this.getBootstrapFeature = this.getBootstrapFeature.bind(this);
    this.getDetached = this.getDetached.bind(this);
    this.handleBackgroundPageConfirmMetadataKeyEvent = this.handleBackgroundPageConfirmMetadataKeyEvent.bind(this);
    this.handleConfirmMetadataKeyDialogCompleted = this.handleConfirmMetadataKeyDialogCompleted.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    try {
      this.state.port.on("passbolt.passphrase.request", this.handleBackgroundPageRequiresPassphraseEvent);
      this.state.port.on("passbolt.metadata-key.trust-confirm", this.handleBackgroundPageConfirmMetadataKeyEvent);
      this.handlePassphraseRequest();
      await this.checkPluginIsConfigured();
      await this.getUser();
      await this.checkAuthStatus();
      await this.getSiteSettings();
      if (this.state.isAuthenticated) {
        await this.getLoggedInUser();
      }
      this.getLocale();
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: e.message,
      });
    }
  }

  /**
   * Get the default state value.
   * @param {object} props The component props.
   * @returns {object}
   */
  getDefaultState(props) {
    return {
      storage: props.storage,
      port: props.port,
      isAuthenticated: null,
      userSettings: null,
      siteSettings: null,
      loggedInUser: null,
      account: null, // The account
      rbacs: null, // The role based access control
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
      passphraseRequestId: "",
      // Manage popup blur
      shouldCloseAtWindowBlur: true, // when true the quickaccess in detached mode should close when losing focus
      setWindowBlurBehaviour: this.setWindowBlurBehaviour, // set the detached mode blur behaviour
      // Quickaccess properties getters.
      getOpenerTabId: this.getOpenerTabId, // Get the opener tab id, useful when used in detached mode to get info of the opener tab.
      getBootstrapFeature: this.getBootstrapFeature, // The bootstrap feature.
      getDetached: this.getDetached, // The detached mode
      // Confirm metadata key
      confirmMetadataKeyRequired: false,
      confirmMetadataKeyRequestId: null,
      confirmMetadataKeyMetadataKey: null,
      confirmMetadataKeyMetadataTrustedKey: null,
    };
  }

  /**
   * Get the opener tab identifier.
   * @returns {string}
   */
  getOpenerTabId() {
    return this.props.openerTabId;
  }

  /**
   * Get the bootstrap feature.
   * @returns {string}
   */
  getBootstrapFeature() {
    return this.props.bootstrapFeature;
  }

  /**
   * Get the detached mode
   * @return {boolean}
   */
  getDetached() {
    return this.props.detached;
  }

  updateSearch(search) {
    this.setState({ search });
  }

  focusSearch() {
    if (this.searchRef.current) {
      this.searchRef.current.focus();
    }
  }

  /**
   * When set to true the quickaccess in detached mode should close when losing focus
   * @param {boolean} shouldCloseAtWindowBlur
   */
  setWindowBlurBehaviour(shouldCloseAtWindowBlur) {
    this.setState({ shouldCloseAtWindowBlur });
  }

  async checkPluginIsConfigured() {
    const isConfigured = await this.state.port.request("passbolt.addon.is-configured");
    if (!isConfigured) {
      browser.tabs.create({ url: PASSBOLT_GETTING_STARTED_URL });
      window.close();
    }
  }

  async getUser() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({ userSettings });
  }

  async getSiteSettings() {
    const siteSettingsDto = await this.state.port.request("passbolt.organization-settings.get");
    const siteSettings = new SiteSettings(siteSettingsDto);
    this.setState({ siteSettings });
  }

  /**
   * Get the current user info from background page and set it in the state
   */
  async getLoggedInUser() {
    const canIUseRbac = this.state.siteSettings.canIUse("rbacs");
    const loggedInUser = await this.props.port.request("passbolt.users.find-logged-in-user");
    const rbacsDto = canIUseRbac ? await this.rbacServiceWorkerService.findMe() : [];
    const rbacs = new RbacsCollection(rbacsDto);
    this.setState({ loggedInUser, rbacs });
  }

  async getLocale() {
    const { locale } = await this.state.port.request("passbolt.locale.get");
    this.setState({ locale });
  }

  /**
   * Get the account
   * @returns {Promise<void>}
   */
  async getAccount() {
    const accountDto = await this.state.port.request("passbolt.account.get");
    const account = new AccountEntity(accountDto);
    this.setState({ account });
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
    const { isAuthenticated, isMfaRequired } = await this.state.port.request("passbolt.auth.check-status");
    if (isMfaRequired) {
      this.redirectToMfaAuthentication();
      return;
    }
    this.setState({ isAuthenticated });
  }

  /**
   * Redirect to MFA authentication.
   */
  redirectToMfaAuthentication() {
    browser.tabs.create({ url: this.state.userSettings.getTrustedDomain() });
    window.close();
  }

  async loginSuccessCallback() {
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.LOGIN) {
      window.close();
      return;
    }

    await this.getSiteSettings();
    this.setState({ isAuthenticated: true });
    await this.getLoggedInUser();
  }

  logoutSuccessCallback() {
    this.setState({ isAuthenticated: false });
  }

  mfaRequiredCallback(url) {
    browser.tabs.create({ url });
    window.close();
  }

  handleKeyDown(event) {
    // Close the quickaccess popup when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      window.close();
    }
  }

  handleBackgroundPageRequiresPassphraseEvent(requestId) {
    this.setState({ passphraseRequired: true, passphraseRequestId: requestId });
  }

  /**
   * Handle background page confirm metadata key event
   * @param requestId
   * @param confirmMetadataKey
   */
  handleBackgroundPageConfirmMetadataKeyEvent(requestId, data) {
    try {
      // Set validation to false as data is required for the entity used by the service worker but should not be sent to the content code.
      const metadataKey = new MetadataKeyEntity(data.metadata_key, { validate: false });
      const metadataTrustedKey = new MetadataTrustedKeyEntity(data.metadata_trusted_key);
      this.setState({
        confirmMetadataKeyRequired: true,
        confirmMetadataKeyRequestId: requestId,
        confirmMetadataKeyMetadataKey: metadataKey,
        confirmMetadataKeyMetadataTrustedKey: metadataTrustedKey,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  handlePassphraseDialogCompleted() {
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.REQUEST_PASSPHRASE) {
      window.close();
    } else {
      this.setState({ passphraseRequired: false, passphraseRequestId: null });
    }
  }

  handlePassphraseRequest() {
    if (this.props.bootstrapFeature === BOOTSTRAP_FEATURE.REQUEST_PASSPHRASE) {
      this.handleBackgroundPageRequiresPassphraseEvent(this.props.bootstrapRequestId);
    }
  }

  /**
   * Handle confirm metadata key dialog completed
   */
  handleConfirmMetadataKeyDialogCompleted() {
    this.setState({
      confirmMetadataKeyRequired: false,
      confirmMetadataKeyRequestId: null,
      confirmMetadataKeyMetadataKey: null,
      confirmMetadataKeyMetadataTrustedKey: null,
    });
  }

  isReady() {
    return (
      this.state.isAuthenticated !== null &&
      this.state.userSettings !== null &&
      this.state.siteSettings != null &&
      this.state.locale !== null
    );
  }

  /**
   * Get the route to quickaccess should bootstrap on.
   * @returns {string}
   */
  getBootstrapRoute() {
    if (!this.state.isAuthenticated) {
      return "/webAccessibleResources/quickaccess/login";
    }

    switch (this.props.bootstrapFeature) {
      case BOOTSTRAP_FEATURE.CREATE_NEW_CREDENTIALS:
      case BOOTSTRAP_FEATURE.SAVE_CREDENTIALS:
        return "/webAccessibleResources/quickaccess/resources/create";
      case BOOTSTRAP_FEATURE.AUTOSAVE_CREDENTIALS:
        return "/webAccessibleResources/quickaccess/resources/autosave";
    }

    return "/webAccessibleResources/quickaccess/home";
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    const isReady = this.isReady();

    return (
      <AppContext.Provider value={this.state}>
        <TranslationProvider
          loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json"
          locale={this.state?.locale}
        >
          <Router>
            <div className="container quickaccess" onKeyDown={this.handleKeyDown}>
              <Header logoutSuccessCallback={this.logoutSuccessCallback} />
              {!isReady && !this.state.hasError && (
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
              {isReady && (
                <>
                  <ManageQuickAccessMode />
                  <Switch>
                    {/* The initial route the quickaccess panel is loaded on is a triage url. */}
                    <Route
                      exact
                      path={"/webAccessibleResources/quickaccess.html"}
                      render={() => <Redirect to={this.getBootstrapRoute()} />}
                    />
                    {/* The route when the user is not authenticated */}
                    <Route
                      exact
                      path="/webAccessibleResources/quickaccess/login"
                      render={() => (
                        <SsoContextProvider>
                          <LoginPage
                            loginSuccessCallback={this.loginSuccessCallback}
                            mfaRequiredCallback={this.mfaRequiredCallback}
                            canRememberMe={this.canRememberMe}
                          />
                        </SsoContextProvider>
                      )}
                    />
                    {/* Any other authenticated routes. */}
                    <Route path="/">
                      {this.state.passphraseRequired && (
                        <PassphraseDialog
                          requestId={this.state.passphraseRequestId}
                          onComplete={this.handlePassphraseDialogCompleted}
                          canRememberMe={this.canRememberMe}
                        />
                      )}
                      {this.state.confirmMetadataKeyRequired && (
                        <ConfirmMetadataKeyDialog
                          requestId={this.state.confirmMetadataKeyRequestId}
                          metadataKey={this.state.confirmMetadataKeyMetadataKey}
                          metadataTrustedKey={this.state.confirmMetadataKeyMetadataTrustedKey}
                          onComplete={this.handleConfirmMetadataKeyDialogCompleted}
                        />
                      )}
                      <div
                        className={`${this.state.passphraseRequired || this.state.confirmMetadataKeyRequired ? "visually-hidden" : ""}`}
                      >
                        <Route
                          path={SEARCH_VISIBLE_ROUTES}
                          render={() => <Search ref={(el) => (this.searchRef = el)} />}
                        />
                        <ResourceTypesLocalStorageContextProvider>
                          <ResourceLocalStorageProvider>
                            <MetadataTypesSettingsLocalStorageContextProvider>
                              <MetadataKeysSettingsLocalStorageContextProvider>
                                <PasswordPoliciesContext>
                                  <PrepareResourceContextProvider>
                                    <PasswordExpirySettingsContextProvider>
                                      <AnimatedSwitch>
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/group"
                                          component={FilterResourcesByGroupPage}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/group/:id"
                                          component={FilterResourcesByGroupPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/tag"
                                          component={FilterResourcesByTagPage}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/tag/:id"
                                          component={FilterResourcesByTagPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/favorite"
                                          component={FilterResourcesByFavoritePage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/owned-by-me"
                                          component={FilterResourcesByItemsIOwnPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/recently-modified"
                                          component={FilterResourcesByRecentlyModifiedPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/shared-with-me"
                                          component={FilterResourcesBySharedWithMePage}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/create"
                                          component={ResourceCreatePage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/confirm-create"
                                          component={ConfirmCreatePage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/resources/autosave"
                                          component={SaveResource}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/view/:id"
                                          component={ResourceViewPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/more-filters"
                                          component={MoreFiltersPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/setup-extension-in-progress"
                                          component={SetupExtensionInProgress}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/generate-password"
                                          component={GeneratePasswordPage}
                                        />
                                        <PrivateRoute
                                          path="/webAccessibleResources/quickaccess/resources/action-aborted-missing-metadata-keys"
                                          component={ActionAbortedMissingMetadataKeysPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path="/webAccessibleResources/quickaccess/home"
                                          component={HomePage}
                                        />
                                      </AnimatedSwitch>
                                    </PasswordExpirySettingsContextProvider>
                                  </PrepareResourceContextProvider>
                                </PasswordPoliciesContext>
                              </MetadataKeysSettingsLocalStorageContextProvider>
                            </MetadataTypesSettingsLocalStorageContextProvider>
                          </ResourceLocalStorageProvider>
                        </ResourceTypesLocalStorageContextProvider>
                      </div>
                    </Route>
                  </Switch>
                </>
              )}
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
  bootstrapFeature: PropTypes.string,
  bootstrapRequestId: PropTypes.string,
  openerTabId: PropTypes.string,
  detached: PropTypes.bool,
};

export default ExtQuickAccess;
