/*! For license information please see 8768.20c48adf.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8768],{"./src/react-extension/contexts/NavigationContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,qN:()=>withNavigationContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-router/esm/react-router.js");const NavigationContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({onGoToAdministrationRequested:()=>{},onGoToAdministrationSelfRegistrationRequested:()=>{},onGoToAdministrationMfaRequested:()=>{},onGoToAdministrationUsersDirectoryRequested:()=>{},onGoToAdministrationEmailNotificationsRequested:()=>{},onGoToAdministrationSubscriptionRequested:()=>{},onGoToAdministrationInternationalizationRequested:()=>{},onGoToAdministrationAccountRecoveryRequested:()=>{},onGoToAdministrationSmtpSettingsRequested:()=>{},onGoToAdministrationSsoRequested:()=>{},onGoToAdministrationPasswordPoliciesRequested:()=>{},onGoToAdministrationUserPassphrasePoliciesRequested:()=>{},onGoToAdministrationPasswordExpirySettingsRequested:()=>{},onGoToAdministrationHealthcheckRequested:()=>{},onGoToPasswordsRequested:()=>{},onGoToUsersRequested:()=>{},onGoToUserSettingsProfileRequested:()=>{},onGoToUserSettingsPassphraseRequested:()=>{},onGoToUserSettingsSecurityTokenRequested:()=>{},onGoToUserSettingsThemeRequested:()=>{},onGoToUserSettingsMfaRequested:()=>{},onGoToUserSettingsKeysRequested:()=>{},onGoToUserSettingsMobileRequested:()=>{},onGoToUserSettingsDesktopRequested:()=>{},onGoToUserSettingsAccountRecoveryRequested:()=>{},onGoToNewTab:()=>{},onGoToAdministrationRbacsRequested:()=>{},onGoToAdministrationMigrateMetadataRequested:()=>{},onGoToAdministrationAllowContentTypesRequested:()=>{}});class NavigationContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{onGoToNewTab:this.onGoToNewTab.bind(this),onGoToAdministrationRequested:this.onGoToAdministrationRequested.bind(this),onGoToAdministrationMfaRequested:this.onGoToAdministrationMfaRequested.bind(this),onGoToAdministrationUsersDirectoryRequested:this.onGoToAdministrationUsersDirectoryRequested.bind(this),onGoToAdministrationEmailNotificationsRequested:this.onGoToAdministrationEmailNotificationsRequested.bind(this),onGoToAdministrationSubscriptionRequested:this.onGoToAdministrationSubscriptionRequested.bind(this),onGoToAdministrationInternationalizationRequested:this.onGoToAdministrationInternationalizationRequested.bind(this),onGoToAdministrationAccountRecoveryRequested:this.onGoToAdministrationAccountRecoveryRequested.bind(this),onGoToAdministrationSmtpSettingsRequested:this.onGoToAdministrationSmtpSettingsRequested.bind(this),onGoToAdministrationSelfRegistrationRequested:this.onGoToAdministrationSelfRegistrationRequested.bind(this),onGoToAdministrationSsoRequested:this.onGoToAdministrationSsoRequested.bind(this),onGoToAdministrationMfaPolicyRequested:this.onGoToAdministrationMfaPolicyRequested.bind(this),onGoToAdministrationPasswordPoliciesRequested:this.onGoToAdministrationPasswordPoliciesRequested.bind(this),onGoToAdministrationUserPassphrasePoliciesRequested:this.onGoToAdministrationUserPassphrasePoliciesRequested.bind(this),onGoToAdministrationPasswordExpirySettingsRequested:this.onGoToAdministrationPasswordExpirySettingsRequested.bind(this),onGoToAdministrationHealthcheckRequested:this.onGoToAdministrationHealthcheckRequested.bind(this),onGoToAdministrationContentTypesEncryptedMetadataRequested:this.onGoToAdministrationContentTypesEncryptedMetadataRequested.bind(this),onGoToAdministrationContentTypesMetadataKeyRequested:this.onGoToAdministrationContentTypesMetadataKeyRequested.bind(this),onGoToAdministrationMigrateMetadataRequested:this.onGoToAdministrationMigrateMetadataRequested.bind(this),onGoToAdministrationAllowContentTypesRequested:this.onGoToAdministrationAllowContentTypesRequested.bind(this),onGoToPasswordsRequested:this.onGoToPasswordsRequested.bind(this),onGoToUsersRequested:this.onGoToUsersRequested.bind(this),onGoToUserSettingsProfileRequested:this.onGoToUserSettingsProfileRequested.bind(this),onGoToUserSettingsPassphraseRequested:this.onGoToUserSettingsPassphraseRequested.bind(this),onGoToUserSettingsSecurityTokenRequested:this.onGoToUserSettingsSecurityTokenRequested.bind(this),onGoToUserSettingsThemeRequested:this.onGoToUserSettingsThemeRequested.bind(this),onGoToUserSettingsMfaRequested:this.onGoToUserSettingsMfaRequested.bind(this),onGoToUserSettingsKeysRequested:this.onGoToUserSettingsKeysRequested.bind(this),onGoToUserSettingsMobileRequested:this.onGoToUserSettingsMobileRequested.bind(this),onGoToUserSettingsDesktopRequested:this.onGoToUserSettingsDesktopRequested.bind(this),onGoToUserSettingsAccountRecoveryRequested:this.onGoToUserSettingsAccountRecoveryRequested.bind(this),onGoToAdministrationRbacsRequested:this.onGoToAdministrationRbacsRequested.bind(this)}}async goTo(appName,pathname){if(appName===this.props.context.name)await this.props.history.push({pathname});else{const url=`${this.props.context.userSettings?this.props.context.userSettings.getTrustedDomain():this.props.context.trustedDomain}${pathname}`;window.open(url,"_parent","noopener,noreferrer")}}onGoToNewTab(url){window.open(url,"_blank","noopener,noreferrer")}async onGoToAdministrationRequested(){let pathname="/app/administration/email-notification";this.isMfaEnabled?pathname="/app/administration/mfa":this.isUserDirectoryEnabled?pathname="/app/administration/users-directory":this.isSmtpSettingsEnable?pathname="/app/administration/smtp-settings":this.isSelfRegistrationEnable?pathname="/app/administration/self-registation":this.isPasswordPoliciesEnable?pathname="/app/administration/password-policies":this.isUserPassphrasePoliciesEnable?pathname="/app/administration/user-passphrase-policies":this.isPasswordExpiryEnable&&(pathname="/app/administration/password-expiry"),await this.goTo("api",pathname)}async onGoToAdministrationMfaRequested(){await this.goTo("api","/app/administration/mfa")}async onGoToAdministrationMfaPolicyRequested(){await this.goTo("api","/app/administration/mfa-policy")}async onGoToAdministrationPasswordPoliciesRequested(){await this.goTo("browser-extension","/app/administration/password-policies")}async onGoToAdministrationSelfRegistrationRequested(){await this.goTo("api","/app/administration/self-registration")}async onGoToAdministrationUsersDirectoryRequested(){await this.goTo("api","/app/administration/users-directory")}async onGoToAdministrationHealthcheckRequested(){await this.goTo("api","/app/administration/healthcheck")}async onGoToAdministrationEmailNotificationsRequested(){await this.goTo("api","/app/administration/email-notification")}async onGoToAdministrationSmtpSettingsRequested(){await this.goTo("api","/app/administration/smtp-settings")}async onGoToAdministrationSubscriptionRequested(){await this.goTo("browser-extension","/app/administration/subscription")}async onGoToAdministrationInternationalizationRequested(){await this.goTo("api","/app/administration/internationalization")}async onGoToAdministrationAccountRecoveryRequested(){await this.goTo("browser-extension","/app/administration/account-recovery")}async onGoToAdministrationSsoRequested(){await this.goTo("browser-extension","/app/administration/sso")}async onGoToAdministrationRbacsRequested(){await this.goTo("api","/app/administration/rbacs")}async onGoToAdministrationUserPassphrasePoliciesRequested(){await this.goTo("browser-extension","/app/administration/user-passphrase-policies")}async onGoToAdministrationPasswordExpirySettingsRequested(){await this.goTo("browser-extension","/app/administration/password-expiry")}async onGoToAdministrationContentTypesEncryptedMetadataRequested(){await this.goTo("browser-extension","/app/administration/content-types/metadata")}async onGoToAdministrationContentTypesMetadataKeyRequested(){await this.goTo("browser-extension","/app/administration/content-types/metadata-key")}async onGoToAdministrationMigrateMetadataRequested(){await this.goTo("browser-extension","/app/administration/migrate-metadata")}async onGoToAdministrationAllowContentTypesRequested(){await this.goTo("browser-extension","/app/administration/allow-content-types")}get isMfaEnabled(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("multiFactorAuthentication")}get isUserDirectoryEnabled(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("directorySync")}get isSmtpSettingsEnable(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("smtpSettings")}get isSelfRegistrationEnable(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("selfRegistration")}get isPasswordPoliciesEnable(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("passwordPoliciesUpdate")}get isUserPassphrasePoliciesEnable(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("userPassphrasePolicies")}get isPasswordExpiryEnable(){const siteSettings=this.props.context.siteSettings;return siteSettings&&siteSettings.canIUse("passwordExpiry")}async onGoToPasswordsRequested(){await this.goTo("browser-extension","/app/passwords")}async onGoToUsersRequested(){await this.goTo("browser-extension","/app/users")}async onGoToUserSettingsProfileRequested(){await this.goTo("browser-extension","/app/settings/profile")}async onGoToUserSettingsPassphraseRequested(){await this.goTo("browser-extension","/app/settings/passphrase")}async onGoToUserSettingsSecurityTokenRequested(){await this.goTo("browser-extension","/app/settings/security-token")}async onGoToUserSettingsThemeRequested(){await this.goTo("browser-extension","/app/settings/theme")}async onGoToUserSettingsMfaRequested(){await this.goTo("browser-extension","/app/settings/mfa")}async onGoToUserSettingsDuoSetupRequested(){let app="api";window.chrome?.webview&&(app="browser-extension"),await this.goTo(app,"/app/settings/mfa")}async onGoToUserSettingsKeysRequested(){await this.goTo("browser-extension","/app/settings/keys")}async onGoToUserSettingsMobileRequested(){await this.goTo("browser-extension","/app/settings/mobile")}async onGoToUserSettingsDesktopRequested(){await this.goTo("browser-extension","/app/settings/desktop")}async onGoToUserSettingsAccountRecoveryRequested(){await this.goTo("browser-extension","/app/settings/account-recovery")}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider,{value:this.state},this.props.children)}}NavigationContextProvider.displayName="NavigationContextProvider",NavigationContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,location:prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,match:prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,history:prop_types__WEBPACK_IMPORTED_MODULE_2___default().object};const __WEBPACK_DEFAULT_EXPORT__=(0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.withRouter)((0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)(NavigationContextProvider));function withNavigationContext(WrappedComponent){return class WithAdministrationWorkspace extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Consumer,null,(navigationContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{navigationContext,...this.props})))}}}NavigationContextProvider.__docgenInfo={description:"The navigation context provider provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"goTo",docblock:"@param appName\n@param pathname\n@returns {Promise<void>}",modifiers:["async"],params:[{name:"appName",optional:!1},{name:"pathname",optional:!1}],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:null},{name:"onGoToNewTab",docblock:"Open new tab.\n@param {string} url The url to go too",modifiers:[],params:[{name:"url",description:"The url to go too",type:{name:"string"},optional:!1}],returns:null,description:"Open new tab."},{name:"onGoToAdministrationRequested",docblock:"Whenever the user wants to navigate to the administration workspace.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace."},{name:"onGoToAdministrationMfaRequested",docblock:"Whenever the user wants to navigate to the administration workspace mfa.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace mfa."},{name:"onGoToAdministrationMfaPolicyRequested",docblock:"Whenever the user wants to navigate to the administration workspace mfa policy.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace mfa policy."},{name:"onGoToAdministrationPasswordPoliciesRequested",docblock:"Whenever the user wants to navigate to the administration workspace password policy.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace password policy."},{name:"onGoToAdministrationSelfRegistrationRequested",docblock:"Whenever the user wants to navigate to the administration workspace selft registration.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace selft registration."},{name:"onGoToAdministrationUsersDirectoryRequested",docblock:"Whenever the user wants to navigate to the administration workspace users directory.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace users directory."},{name:"onGoToAdministrationHealthcheckRequested",docblock:"Whenever the user wants to navigate to the administration healthcheck directory.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration healthcheck directory."},{name:"onGoToAdministrationEmailNotificationsRequested",docblock:"Whenever the user wants to navigate to the administration workspace email notifications.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace email notifications."},{name:"onGoToAdministrationSmtpSettingsRequested",docblock:"Whenever the user wants to navigate to the administration workspace email notifications.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace email notifications."},{name:"onGoToAdministrationSubscriptionRequested",docblock:"Whenever the user wants to navigate to the administration workspace subscription.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace subscription."},{name:"onGoToAdministrationInternationalizationRequested",docblock:"Whenever the user wants to navigate to the administration workspace internationalization.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace internationalization."},{name:"onGoToAdministrationAccountRecoveryRequested",docblock:"Whenever the user wants to navigate to the administration workspace account recovery.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace account recovery."},{name:"onGoToAdministrationSsoRequested",docblock:"Whenever the user wants to navigate to the administration workspace sso.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace sso."},{name:"onGoToAdministrationRbacsRequested",docblock:"Whenever the user wants to navigate to the administration workspace rbac.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace rbac."},{name:"onGoToAdministrationUserPassphrasePoliciesRequested",docblock:"Whenever the user wants to navigate to the administration workspace user passphrase policies.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace user passphrase policies."},{name:"onGoToAdministrationPasswordExpirySettingsRequested",docblock:"Whenever the user wants to navigate to the users settings workspace account recovery section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace account recovery section."},{name:"onGoToAdministrationContentTypesEncryptedMetadataRequested",docblock:"Whenever the user wants to navigate to the administration workspace content types encrypted metadata.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace content types encrypted metadata."},{name:"onGoToAdministrationContentTypesMetadataKeyRequested",docblock:"Whenever the user wants to navigate to the administration workspace content types metadata key.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace content types metadata key."},{name:"onGoToAdministrationMigrateMetadataRequested",docblock:"Whenever the user wants to navigate to the administration workspace migrate metadata.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace migrate metadata."},{name:"onGoToAdministrationAllowContentTypesRequested",docblock:"Whenever the user wants to navigate to the administration workspace allow content types.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the administration workspace allow content types."},{name:"isMfaEnabled",docblock:"Returns true if the user has the MFA capability\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the MFA capability"},{name:"isUserDirectoryEnabled",docblock:"Returns true if the user has the user directory capability\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the user directory capability"},{name:"isSmtpSettingsEnable",docblock:"Returns true if the user has the SMTP settings capability\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the SMTP settings capability"},{name:"isSelfRegistrationEnable",docblock:"Returns true if the user has the self registration enabled\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the self registration enabled"},{name:"isPasswordPoliciesEnable",docblock:"Returns true if the user has the password policies update enabled\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the password policies update enabled"},{name:"isUserPassphrasePoliciesEnable",docblock:"Returns true if the user has the user passphrase policies enabled\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the user passphrase policies enabled"},{name:"isPasswordExpiryEnable",docblock:"Returns true if the user has the password expiry enabled\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the user has the password expiry enabled"},{name:"onGoToPasswordsRequested",docblock:"Whenever the user wants to navigate to the passwords workspace.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the passwords workspace."},{name:"onGoToUsersRequested",docblock:"Whenever the user wants to navigate to the users workspace.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users workspace."},{name:"onGoToUserSettingsProfileRequested",docblock:"Whenever the user wants to navigate to the users settings workspace profile section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace profile section."},{name:"onGoToUserSettingsPassphraseRequested",docblock:"Whenever the user wants to navigate to the users settings workspace passphrase section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace passphrase section."},{name:"onGoToUserSettingsSecurityTokenRequested",docblock:"Whenever the user wants to navigate to the users settings workspace security token section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace security token section."},{name:"onGoToUserSettingsThemeRequested",docblock:"Whenever the user wants to navigate to the users settings workspace theme section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace theme section."},{name:"onGoToUserSettingsMfaRequested",docblock:"Whenever the user wants to navigate to the users settings workspace mfa section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace mfa section."},{name:"onGoToUserSettingsDuoSetupRequested",docblock:"Whenever the user wants to navigate to the users settings workspace mfa duo setup.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace mfa duo setup."},{name:"onGoToUserSettingsKeysRequested",docblock:"Whenever the user wants to navigate to the users settings workspace keys section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace keys section."},{name:"onGoToUserSettingsMobileRequested",docblock:"Whenever the user wants to navigate to the users settings workspace mobile section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace mobile section."},{name:"onGoToUserSettingsDesktopRequested",docblock:"Whenever the user wants to navigate to the users settings workspace desktop section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace desktop section."},{name:"onGoToUserSettingsAccountRecoveryRequested",docblock:"Whenever the user wants to navigate to the users settings workspace account recovery section.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Whenever the user wants to navigate to the users settings workspace account recovery section."}],displayName:"NavigationContextProvider",props:{context:{description:"",type:{name:"object"},required:!1},children:{description:"",type:{name:"any"},required:!1},location:{description:"",type:{name:"object"},required:!1},match:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1}}}}}]);