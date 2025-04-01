/*! For license information please see react-extension-components-User-DisplayUserWorkspaceMainActions-DisplayUserWorkspaceMainActions-test-stories.2b56738b.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3552],{"./src/react-extension/components/User/DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Admin:()=>Admin,User:()=>User,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayUserWorkspaceMainActions_test_stories});var DisplayUserWorkspaceMainActions=__webpack_require__("./src/react-extension/components/User/DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");function defaultAppContext(appContext){const defaultAppContext={port:new MockPort.A,roles:[{id:"8e3874ae-4b40-590b-968a-418f704b9d9a",name:"admin"},{id:"8e3874ae-4b40-590b-968a-418f704b9d9b",name:"user"}],setContext:function(newContext){Object.assign(this,newContext)}};return Object.assign(defaultAppContext,appContext||{})}const DisplayUserWorkspaceMainActions_test_stories={title:"Components/User/DisplayUserWorkspaceMainActions",component:DisplayUserWorkspaceMainActions.A},Admin={args:Object.assign({},{context:defaultAppContext({loggedInUser:{role:{name:"admin"}}})})},User={args:Object.assign({},{context:defaultAppContext({loggedInUser:{role:{name:"user"}}})})},__namedExportsOrder=["Admin","User"];Admin.parameters={...Admin.parameters,docs:{...Admin.parameters?.docs,source:{originalSource:"{\n  args: Object.assign(defaultProps(), {\n    context: defaultAppContext(adminRole)\n  })\n}",...Admin.parameters?.docs?.source}}},User.parameters={...User.parameters,docs:{...User.parameters?.docs,source:{originalSource:"{\n  args: Object.assign(defaultProps(), {\n    context: defaultAppContext(userRole)\n  })\n}",...User.parameters?.docs?.source}}}},"./src/img/svg/users.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgUsers(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:18,height:16,fill:"none",viewBox:"0 0 18 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M12.741 14.338V12.89a2.77 2.77 0 0 0-.826-2.04 2.82 2.82 0 0 0-2.04-.825H4.248a2.825 2.825 0 0 0-2.723 2.865v1.448M7.143 7.26a2.815 2.815 0 1 0-2.815-2.814 2.825 2.825 0 0 0 2.815 2.815M16.994 14.338V12.89a2.85 2.85 0 0 0-.592-1.724 2.8 2.8 0 0 0-1.52-1.02M12.068 1.724a2.74 2.74 0 0 1 1.52 1.02 2.804 2.804 0 0 1 0 3.446 2.74 2.74 0 0 1-1.52 1.02"})))}},"./src/react-extension/components/UserGroup/EditUserGroup/EditUserGroupItem.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>EditUserGroup_EditUserGroupItem});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),UserAvatar=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Select=__webpack_require__("./src/react-extension/components/Common/Select/Select.js"),userUtils=__webpack_require__("./src/shared/utils/userUtils.js"),TooltipPortal=__webpack_require__("./src/react-extension/components/Common/Tooltip/TooltipPortal.js"),Fingerprint=__webpack_require__("./src/react-extension/components/Common/Fingerprint/Fingerprint.js");class TooltipMessageGroupUserDetailsLoading extends react.Component{render(){return react.createElement("div",{className:"group-user-details-tooltip skeleton"},react.createElement("div",{className:"email"}," "),react.createElement("div",{className:"fingerprint"},react.createElement("div",{className:"fingerprint-line"}," "),react.createElement("div",{className:"fingerprint-line"}," ")),react.createElement("div",{className:"shimmer shimmer-tooltip"}))}}const Tooltip_TooltipMessageGroupUserDetailsLoading=TooltipMessageGroupUserDetailsLoading;TooltipMessageGroupUserDetailsLoading.__docgenInfo={description:"",methods:[],displayName:"TooltipMessageGroupUserDetailsLoading"};var svg_close=__webpack_require__("./src/img/svg/close.svg"),fingerprint=__webpack_require__("./src/img/svg/fingerprint.svg");class EditUserGroupItem extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{tooltipFingerprintMessage:null}}bindCallbacks(){this.onTooltipFingerprintMouseHover=this.onTooltipFingerprintMouseHover.bind(this)}getUserFullname(){const user=this.props.groupUser.user;return`${user.profile.first_name} ${user.profile.last_name}`}isUserSuspended(user){return this.props.context.siteSettings.canIUse("disableUser")&&(0,userUtils.B7)(user)}get isManagerSelectOptions(){return[{value:!1,label:react.createElement(es.x6,null,"Member")},{value:!0,label:react.createElement(es.x6,null,"Group manager")}]}async onTooltipFingerprintMouseHover(){if(this.state.tooltipFingerprintMessage)return;const gpgkey=await this.props.context.port.request("passbolt.keyring.get-public-key-info-by-user",this.props.groupUser.user.id),tooltipFingerprintMessage=react.createElement("div",{className:"group-user-details-tooltip"},react.createElement("div",{className:"email ellipsis"},react.createElement("strong",null,this.props.groupUser.user.username)),react.createElement(Fingerprint.A,{fingerprint:gpgkey.fingerprint}));this.setState({tooltipFingerprintMessage})}render(){const isSuspended=this.isUserSuspended(this.props.groupUser.user);return react.createElement("li",{className:`row ${this.props.isMemberChanged?"permission-updated":""} ${isSuspended?"suspended":""}`},react.createElement(UserAvatar.A,{baseUrl:this.props.context.userSettings.getTrustedDomain(),user:this.props.groupUser.user}),react.createElement("div",{className:"aro"},react.createElement("div",{className:"aro-name"},react.createElement("span",{className:"ellipsis"},this.getUserFullname(),isSuspended&&react.createElement("span",{className:"suspended"}," ",react.createElement(es.x6,null,"(suspended)"))),react.createElement(TooltipPortal.A,{message:this.state.tooltipFingerprintMessage||react.createElement(Tooltip_TooltipMessageGroupUserDetailsLoading,null),direction:"auto",onMouseHover:this.onTooltipFingerprintMouseHover},react.createElement(fingerprint.A,null))),react.createElement("div",{className:"permission_changes"},this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be added")),this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be updated")),!this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Unchanged")))),react.createElement("div",{className:"rights"},react.createElement(Select.A,{className:"permission inline",value:this.props.groupUser.is_admin,items:this.isManagerSelectOptions,onChange:event=>this.props.onMemberRoleChange(event,this.props.groupUser),disabled:!this.props.areActionsAllowed,direction:this.props.isLastItemDisplayed?"top":"bottom"})),react.createElement("div",{className:"actions"},react.createElement("button",{type:"button",title:this.props.t("Remove"),className:"remove-item button inline button-transparent",disabled:!this.props.areActionsAllowed,onClick:event=>this.props.onMemberRemoved(event,this.props.groupUser)},react.createElement(svg_close.A,null),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Remove")))))}}EditUserGroupItem.defaultProps={isMemberChanged:!1,isMemberAdded:!1,areActionsAllowed:!1,isLastItemDisplayed:!1},EditUserGroupItem.propTypes={context:prop_types_default().any,groupUser:prop_types_default().object.isRequired,onMemberRoleChange:prop_types_default().func.isRequired,onMemberRemoved:prop_types_default().func.isRequired,isMemberChanged:prop_types_default().bool,isMemberAdded:prop_types_default().bool,areActionsAllowed:prop_types_default().bool,isLastItemDisplayed:prop_types_default().bool,t:prop_types_default().func};const EditUserGroup_EditUserGroupItem=(0,AppContext.L)((0,es.CI)("common")(EditUserGroupItem));EditUserGroupItem.__docgenInfo={description:"This component allows to edit an user group",methods:[{name:"defaultState",docblock:"Returns the component default state",modifiers:["get"],params:[],returns:null,description:"Returns the component default state"},{name:"bindCallbacks",docblock:"Bind callbacks.",modifiers:[],params:[],returns:null,description:"Bind callbacks."},{name:"getUserFullname",docblock:"Get a user full name\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get a user full name"},{name:"isUserSuspended",docblock:"Returns true if the feature flag disableUser is enabled and the given user is suspended.\n@param {object} user\n@returns {boolean}",modifiers:[],params:[{name:"user",type:{name:"object"},optional:!1}],returns:{type:{name:"boolean"}},description:"Returns true if the feature flag disableUser is enabled and the given user is suspended."},{name:"isManagerSelectOptions",docblock:"Get options for permission selection\n@returns {[{label: *, value: boolean}]}",modifiers:["get"],params:[],returns:{type:{name:"tuple",elements:[]}},description:"Get options for permission selection"},{name:"onTooltipFingerprintMouseHover",docblock:"Handle whenever the user passes its mouse hover the tooltip.\n@returns {Promise<JSX>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"JSX"}]}},description:"Handle whenever the user passes its mouse hover the tooltip."}],displayName:"EditUserGroupItem",props:{isMemberChanged:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isMemberAdded:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},areActionsAllowed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isLastItemDisplayed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},context:{description:"",type:{name:"any"},required:!1},groupUser:{description:"",type:{name:"object"},required:!0},onMemberRoleChange:{description:"",type:{name:"func"},required:!0},onMemberRemoved:{description:"",type:{name:"func"},required:!0},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,b_:()=>ActionFeedbackContext,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayWarning:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayWarning:this.displayWarning.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}displaySuccess(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}displayWarning(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"warning",message:feedbackToAdd}]})}displayError(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}remove(feedbackToRemove){this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayWarning",docblock:"Display the feedback in a warning mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a warning mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:[],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/lib/Error/InputValidator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function maxSizeValidation(value,maxLength,translate){const sizeExceeded=value.length>=maxLength,warningMessage=translate("this is the maximum size for this field, make sure your data was not truncated");return sizeExceeded?warningMessage:""}__webpack_require__.d(__webpack_exports__,{d:()=>maxSizeValidation})},"./src/react-extension/lib/Object/getPropValue.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(obj,path)=>path.split(".").reduce(((accumulator,key)=>accumulator?.[key]),obj)},"./src/react-extension/lib/Sanitize/sanitizeUrl.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,P:()=>urlProtocols});const __WEBPACK_DEFAULT_EXPORT__=(uri,options)=>{if(void 0===uri||"string"!=typeof uri||!uri.length)return!1;if((options=options||{}).whitelistedProtocols&&!Array.isArray(options.whitelistedProtocols))throw new TypeError("The whitelistedProtocols should be an array of string.");if(options.defaultProtocol&&"string"!=typeof options.defaultProtocol)throw new TypeError("The defaultProtocol should be a string.");const whitelistedProtocols=options.whitelistedProtocols||[urlProtocols.HTTP,urlProtocols.HTTPS],blacklistedProtocols=[urlProtocols.JAVASCRIPT],defaultProtocol=options.defaultProtocol||"";!/^((?!:\/\/).)*:\/\//.test(uri)&&defaultProtocol&&(uri=`${defaultProtocol}//${uri}`);try{const url=new URL(uri);return!blacklistedProtocols.includes(url.protocol)&&(!!whitelistedProtocols.includes(url.protocol)&&url.href)}catch(error){return!1}},urlProtocols={FTP:"http:",FTPS:"https:",HTTP:"http:",HTTPS:"https:",JAVASCRIPT:"javascript:",SSH:"ssh:"}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024},"./src/shared/lib/Settings/SiteSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>SiteSettings});var _react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/lib/Object/getPropValue.js"),_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/react-extension/lib/Sanitize/sanitizeUrl.js");class SiteSettings{constructor(settings){this.settings=this.sanitizeDto(settings)}sanitizeDto(dto){const sanitizedDto=JSON.parse(JSON.stringify(dto));return this.sanitizeEmailValidateRegex(sanitizedDto),sanitizedDto}sanitizeEmailValidateRegex(dto){const emailValidateRegex=dto?.passbolt?.email?.validate?.regex;emailValidateRegex&&"string"==typeof emailValidateRegex&&emailValidateRegex.trim().length&&(dto.passbolt.email.validate.regex=emailValidateRegex.trim().replace(/^\/+/,"").replace(/\/+$/,""))}canIUse(name){let result=!1;const configPath=`passbolt.plugins.${name}`,pluginSettings=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,configPath)||null;if(pluginSettings&&"object"==typeof pluginSettings){const pluginEnabled=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(pluginSettings,"enabled");void 0!==pluginEnabled&&!0!==pluginEnabled||(result=!0)}return result}getPluginSettings(name){const configPath=`passbolt.plugins.${name}`;return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,configPath)}getRememberMeOptions(){return(this.getPluginSettings("rememberMe")||{}).options||{}}get hasRememberMeUntilILogoutOption(){return void 0!==(this.getRememberMeOptions()||{})[-1]}getServerTimezone(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.app.server_timezone")}get termsLink(){const termsLink=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.legal.terms.url");return!!termsLink&&(0,_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__.A)(termsLink)}get privacyLink(){const privacyLink=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.legal.privacy_policy.url");return!!privacyLink&&(0,_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__.A)(privacyLink)}get registrationPublic(){return!0===(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.registration.public")}get debug(){return!0===(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.debug")}get url(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.url")||""}get version(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.version.number")}get locale(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.locale")||SiteSettings.DEFAULT_LOCALE.locale}async setLocale(locale){this.settings.app.locale=locale}get supportedLocales(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.plugins.locale.options")||SiteSettings.DEFAULT_SUPPORTED_LOCALES}get generatorConfiguration(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.plugins.generator.configuration")}get emailValidateRegex(){return this.settings?.passbolt?.email?.validate?.regex||null}static get DEFAULT_SUPPORTED_LOCALES(){return[SiteSettings.DEFAULT_LOCALE]}static get DEFAULT_LOCALE(){return{locale:"en-UK",label:"English"}}}}}]);