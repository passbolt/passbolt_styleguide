/*! For license information please see 3950.08dddf3c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3950],{"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/AdministrationWorkspaceContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Kk:()=>withAdministrationWorkspace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_LoadingContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/contexts/LoadingContext.js"),_shared_context_Rbac_RbacContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/context/Rbac/RbacContext.js"),_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/services/rbacs/uiActionEnumeration.js");const AdministrationWorkspaceContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({selectedAdministration:null,can:{save:!1},must:{save:!1,editSubscriptionKey:!1,refreshSubscriptionKey:!1},administrationWorkspaceAction:null,setDisplayAdministrationWorkspaceAction:()=>{},resetDisplayAdministrationWorkspaceAction:()=>{},onUpdateSubscriptionKeyRequested:()=>{},onSaveEnabled:()=>{},onMustSaveSettings:()=>{},onMustEditSubscriptionKey:()=>{},onMustRefreshSubscriptionKey:()=>{},onResetActionsSettings:()=>{}});class AdministrationWorkspaceContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{selectedAdministration:AdministrationWorkspaceMenuTypes.NONE,can:{save:!1},must:{save:!1,editSubscriptionKey:!1,refreshSubscriptionKey:!1},administrationWorkspaceAction:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null),setDisplayAdministrationWorkspaceAction:this.setDisplayAdministrationWorkspaceAction.bind(this),resetDisplayAdministrationWorkspaceAction:this.resetDisplayAdministrationWorkspaceAction.bind(this),onUpdateSubscriptionKeyRequested:this.onUpdateSubscriptionKeyRequested.bind(this),onSaveEnabled:this.handleSaveEnabled.bind(this),onMustSaveSettings:this.handleMustSaveSettings.bind(this),onMustEditSubscriptionKey:this.handleMustEditSubscriptionKey.bind(this),onMustRefreshSubscriptionKey:this.handleMustRefreshSubscriptionKey.bind(this),onResetActionsSettings:this.handleResetActionsSettings.bind(this)}}componentDidMount(){this.handleAdministrationMenuRouteChange()}componentDidUpdate(prevProps){this.handleRouteChange(prevProps.location)}handleSaveEnabled(){this.setState({can:{...this.state.can,save:!0}})}handleMustSaveSettings(){this.setState({must:{...this.state.must,save:!0}})}handleMustEditSubscriptionKey(){this.setState({must:{...this.state.must,editSubscriptionKey:!0}})}handleMustRefreshSubscriptionKey(){this.setState({must:{...this.state.must,refreshSubscriptionKey:!0}})}handleResetActionsSettings(){this.setState({must:{save:!1,test:!1,synchronize:!1,editSubscriptionKey:!1,refreshSubscriptionKey:!1}})}handleRouteChange(previousLocation){this.props.location.key!==previousLocation.key&&this.handleAdministrationMenuRouteChange()}handleAdministrationMenuRouteChange(){const newState={can:{save:!1,test:!1,synchronize:!1},must:{save:!1,test:!1,synchronize:!1,editSubscriptionKey:!1,refreshSubscriptionKey:!1}};if(!this.props.rbacContext.canIUseUiAction(_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_4__.e.ADMINSTRATION_VIEW_WORKSPACE))return newState.selectedAdministration=AdministrationWorkspaceMenuTypes.HTTP_403_ACCESS_DENIED,void this.setState(newState);const location=this.props.location.pathname,isAdminHomePageLocation=ADMIN_URL_REGEXP.homePage.test(location),isMfaLocation=ADMIN_URL_REGEXP.mfa.test(location),isMfaPolicyLocation=ADMIN_URL_REGEXP.mfaPolicy.test(location),isPasswordPoliciesLocation=ADMIN_URL_REGEXP.passwordPolicies.test(location),isUserDirectoryLocation=ADMIN_URL_REGEXP.usersDirectory.test(location),isEmailNotificationLocation=ADMIN_URL_REGEXP.emailNotification.test(location),isSubscriptionLocation=ADMIN_URL_REGEXP.subscription.test(location),isInternationalizationLocation=ADMIN_URL_REGEXP.internationalization.test(location),isAccountRecoveryLocation=ADMIN_URL_REGEXP.accountRecovery.test(location),isSmtpSettingsLocation=ADMIN_URL_REGEXP.smtpSettings.test(location),isSelfRegistrationLocation=ADMIN_URL_REGEXP.selfRegistration.test(location),isSso=ADMIN_URL_REGEXP.sso.test(location),rbac=ADMIN_URL_REGEXP.rbac.test(location),isUserPassphrasePolicies=ADMIN_URL_REGEXP.userPassphrasePolicies.test(location),isPasswordExpirySettings=ADMIN_URL_REGEXP.passwordExpirySettings.test(location),healthcheck=ADMIN_URL_REGEXP.healthcheck.test(location),contentTypesEncryptedMetadata=ADMIN_URL_REGEXP.contentTypesEncryptedMetadata.test(location),contentTypesMetadataKey=ADMIN_URL_REGEXP.contentTypesMetadataKey.test(location),migrateMetadata=ADMIN_URL_REGEXP.migrateEncryptedMetadata.test(location);let selectedAdministration;isAdminHomePageLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.HOME:isMfaPolicyLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.MFA_POLICY:isPasswordPoliciesLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES:isMfaLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.MFA:isUserDirectoryLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.USER_DIRECTORY:isEmailNotificationLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION:isSubscriptionLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.SUBSCRIPTION:isInternationalizationLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION:isAccountRecoveryLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY:isSmtpSettingsLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.SMTP_SETTINGS:isSelfRegistrationLocation?selectedAdministration=AdministrationWorkspaceMenuTypes.SELF_REGISTRATION:isSso?selectedAdministration=AdministrationWorkspaceMenuTypes.SSO:rbac?selectedAdministration=AdministrationWorkspaceMenuTypes.RBAC:isUserPassphrasePolicies?selectedAdministration=AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES:isPasswordExpirySettings?selectedAdministration=AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY:healthcheck?selectedAdministration=AdministrationWorkspaceMenuTypes.HEALTHCHECK:contentTypesEncryptedMetadata?selectedAdministration=AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA:contentTypesMetadataKey?selectedAdministration=AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY:migrateMetadata&&(selectedAdministration=AdministrationWorkspaceMenuTypes.MIGRATE_METADATA);if(!selectedAdministration)return newState.selectedAdministration=AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND,void this.setState(newState);if(isAdminHomePageLocation)return void this.setState(newState);const currentFeatureFlag=AdministrationWorkspaceFeatureFlag?.[selectedAdministration];newState.selectedAdministration=currentFeatureFlag&&!this.props.context.siteSettings.canIUse(currentFeatureFlag)?AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND:selectedAdministration,this.setState(newState)}setDisplayAdministrationWorkspaceAction(administrationWorkspaceAction){this.setState({administrationWorkspaceAction})}resetDisplayAdministrationWorkspaceAction(){this.setState({administrationWorkspaceAction:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null)})}onUpdateSubscriptionKeyRequested(keyDto){return this.props.context.port.request("passbolt.subscription.update",keyDto)}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(AdministrationWorkspaceContext.Provider,{value:this.state},this.props.children)}}AdministrationWorkspaceContextProvider.displayName="AdministrationWorkspaceContextProvider",AdministrationWorkspaceContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,children:prop_types__WEBPACK_IMPORTED_MODULE_5___default().any,location:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,match:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,history:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,loadingContext:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,rbacContext:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object};(0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.y)((0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,_shared_context_Rbac_RbacContext__WEBPACK_IMPORTED_MODULE_3__.x6)((0,_LoadingContext__WEBPACK_IMPORTED_MODULE_2__.$A)(AdministrationWorkspaceContextProvider))));function withAdministrationWorkspace(WrappedComponent){return class WithAdministrationWorkspace extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(AdministrationWorkspaceContext.Consumer,null,(administrationWorkspaceContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{administrationWorkspaceContext,...this.props})))}}}const AdministrationWorkspaceMenuTypes={NONE:"NONE",HOME:"HOME",MFA:"MFA",MFA_POLICY:"MFA-POLICY",PASSWORD_POLICIES:"PASSWORD-POLICIES",USER_DIRECTORY:"USER-DIRECTORY",EMAIL_NOTIFICATION:"EMAIL-NOTIFICATION",SUBSCRIPTION:"SUBSCRIPTION",INTERNATIONALIZATION:"INTERNATIONALIZATION",ACCOUNT_RECOVERY:"ACCOUNT-RECOVERY",SMTP_SETTINGS:"SMTP-SETTINGS",SELF_REGISTRATION:"SELF-REGISTRATION",SSO:"SSO",RBAC:"RBAC",USER_PASSPHRASE_POLICIES:"USER-PASSPHRASE-POLICIES",PASSWORD_EXPIRY:"PASSWORD-EXPIRY",HTTP_403_ACCESS_DENIED:"403-ACCESS-DENIED",HTTP_404_NOT_FOUND:"404-NOT-FOUND",HEALTHCHECK:"HEALTHCHECK",CONTENT_TYPES_ENCRYPTED_METADATA:"CONTENT_TYPES_ENCRYPTED_METADATA",CONTENT_TYPES_METADATA_KEY:"CONTENT_TYPES_METADATA_KEY",MIGRATE_METADATA:"MIGRATE_METADATA"},AdministrationWorkspaceFeatureFlag={[AdministrationWorkspaceMenuTypes.MFA]:"multiFactorAuthentication",[AdministrationWorkspaceMenuTypes.MFA_POLICY]:"mfaPolicies",[AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES]:"passwordPoliciesUpdate",[AdministrationWorkspaceMenuTypes.USER_DIRECTORY]:"directorySync",[AdministrationWorkspaceMenuTypes.SUBSCRIPTION]:"ee",[AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION]:"locale",[AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY]:"accountRecovery",[AdministrationWorkspaceMenuTypes.SMTP_SETTINGS]:"smtpSettings",[AdministrationWorkspaceMenuTypes.SELF_REGISTRATION]:"selfRegistration",[AdministrationWorkspaceMenuTypes.SSO]:"sso",[AdministrationWorkspaceMenuTypes.RBAC]:"rbacs",[AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES]:"userPassphrasePolicies",[AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY]:"passwordExpiry",[AdministrationWorkspaceMenuTypes.HEALTHCHECK]:"healthcheckUi",[AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA]:"metadata",[AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY]:"metadata",[AdministrationWorkspaceMenuTypes.MIGRATE_METADATA]:"metadata"},ADMIN_URL_REGEXP={homePage:/^\/app\/administration\/?$/,mfa:/^\/app\/administration\/mfa\/?$/,mfaPolicy:/^\/app\/administration\/mfa-policy\/?$/,passwordPolicies:/^\/app\/administration\/password-policies\/?$/,usersDirectory:/^\/app\/administration\/users-directory\/?$/,emailNotification:/^\/app\/administration\/email-notification\/?$/,subscription:/^\/app\/administration\/subscription\/?$/,internationalization:/^\/app\/administration\/internationalization\/?$/,accountRecovery:/^\/app\/administration\/account-recovery\/?$/,smtpSettings:/^\/app\/administration\/smtp-settings\/?$/,selfRegistration:/^\/app\/administration\/self-registration\/?$/,sso:/^\/app\/administration\/sso\/?$/,rbac:/^\/app\/administration\/rbacs\/?$/,userPassphrasePolicies:/^\/app\/administration\/user-passphrase-policies\/?$/,passwordExpirySettings:/^\/app\/administration\/password-expiry\/?$/,healthcheck:/^\/app\/administration\/healthcheck\/?$/,contentTypesEncryptedMetadata:/^\/app\/administration\/content-types\/metadata\/?$/,contentTypesMetadataKey:/^\/app\/administration\/content-types\/metadata-key\/?$/,migrateEncryptedMetadata:/^\/app\/administration\/migrate-metadata\/?$/};AdministrationWorkspaceContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"handleSaveEnabled",docblock:"Handle save enabled",modifiers:[],params:[],returns:null,description:"Handle save enabled"},{name:"handleMustSaveSettings",docblock:"Handle must save settings",modifiers:[],params:[],returns:null,description:"Handle must save settings"},{name:"handleMustEditSubscriptionKey",docblock:"Handle must edit subscription key",modifiers:[],params:[],returns:null,description:"Handle must edit subscription key"},{name:"handleMustRefreshSubscriptionKey",docblock:"Handle must refresh subscription key",modifiers:[],params:[],returns:null,description:"Handle must refresh subscription key"},{name:"handleResetActionsSettings",docblock:"Handle reset state settings",modifiers:[],params:[],returns:null,description:"Handle reset state settings"},{name:"handleRouteChange",docblock:"Handle the route location change\n@param previousLocation Previous router location",modifiers:[],params:[{name:"previousLocation",description:"Previous router location",optional:!1}],returns:null,description:"Handle the route location change"},{name:"handleAdministrationMenuRouteChange",docblock:"Handle the administration menu route change",modifiers:[],params:[],returns:null,description:"Handle the administration menu route change"},{name:"setDisplayAdministrationWorkspaceAction",docblock:"Set the display of the administration workspace action\n@param administrationWorkspaceAction",modifiers:[],params:[{name:"administrationWorkspaceAction",optional:!1}],returns:null,description:"Set the display of the administration workspace action"},{name:"resetDisplayAdministrationWorkspaceAction",docblock:"Reset the display of the administration workspace action",modifiers:[],params:[],returns:null,description:"Reset the display of the administration workspace action"},{name:"onUpdateSubscriptionKeyRequested",docblock:"Whenever the update of the subscription is requested.\n@param keyDto The new subscription key\n@return {Promise<object>}",modifiers:[],params:[{name:"keyDto",description:"The new subscription key",optional:!1}],returns:{type:{name:"Promise",elements:[{name:"object"}]}},description:"Whenever the update of the subscription is requested."}],displayName:"AdministrationWorkspaceContextProvider",props:{context:{description:"",type:{name:"object"},required:!1},children:{description:"",type:{name:"any"},required:!1},location:{description:"",type:{name:"object"},required:!1},match:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1},loadingContext:{description:"",type:{name:"object"},required:!1},rbacContext:{description:"",type:{name:"object"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);