/*! For license information please see 8606.40039c66.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8606],{"./src/react-extension/lib/Object/getPropValue.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(obj,path)=>path.split(".").reduce(((accumulator,key)=>accumulator?.[key]),obj)},"./src/react-extension/lib/Sanitize/sanitizeUrl.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,P:()=>urlProtocols});const __WEBPACK_DEFAULT_EXPORT__=(uri,options)=>{if(void 0===uri||"string"!=typeof uri||!uri.length)return!1;if((options=options||{}).whitelistedProtocols&&!Array.isArray(options.whitelistedProtocols))throw new TypeError("The whitelistedProtocols should be an array of string.");if(options.defaultProtocol&&"string"!=typeof options.defaultProtocol)throw new TypeError("The defaultProtocol should be a string.");const whitelistedProtocols=options.whitelistedProtocols||[urlProtocols.HTTP,urlProtocols.HTTPS],blacklistedProtocols=[urlProtocols.JAVASCRIPT],defaultProtocol=options.defaultProtocol||"";!/^((?!:\/\/).)*:\/\//.test(uri)&&defaultProtocol&&(uri=`${defaultProtocol}//${uri}`);try{const url=new URL(uri);return!blacklistedProtocols.includes(url.protocol)&&(!!whitelistedProtocols.includes(url.protocol)&&url.href)}catch(error){return!1}},urlProtocols={FTP:"http:",FTPS:"https:",HTTP:"http:",HTTPS:"https:",JAVASCRIPT:"javascript:",SSH:"ssh:"}},"./src/react-extension/test/fixture/Settings/siteSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,B:()=>siteSettingsCe});const siteSettings=(isProEdition=!0)=>({app:{version:{number:"3.5.0",name:"Wide Open"},locale:"en-UK",url:"http://127.0.0.1:3001",debug:1,server_timezone:"UTC",session_timeout:24,image_storage:{public_path:"img/public/"}},passbolt:{legal:{privacy_policy:{url:"https://passbolt.com/privacy"},terms:{url:"https://passbolt.com/terms"}},edition:isProEdition?"pro":"ce",plugins:{accountRecovery:{version:"1.0.0",enabled:isProEdition},rbacs:{version:"1.0.0",enabled:isProEdition},import:{version:"2.0.1",config:{format:["kdbx","csv"]}},export:{version:"2.0.0"},selenium_api:{version:"2.2.0"},passbolt_test_data:{version:"2.0"},license:{version:"2.0.0"},ee:{version:"3.0.0",enabled:isProEdition},accountSettings:{version:"1.0.0",themes:{css:"api_main.min.css"}},rememberMe:{version:"2.0.0",options:{300:"5 minutes",900:"15 minutes",1800:"30 minutes",3600:"1 hour","-1":"until I log out"}},emailNotificationSettings:{version:"1.1.0"},emailDigest:{version:"1.0.0"},resourceTypes:{version:"1.0.0"},reports:{version:"1.0.0"},multiFactorAuthentication:{version:"1.1.0",enabled:isProEdition},directorySync:{version:"1.0.0",enabled:isProEdition},tags:{version:"1.0.1",enabled:isProEdition},log:{version:"1.0.0"},audit_log:{version:"1.0.0",enabled:isProEdition},folders:{version:"2.0.0",enabled:!0},previewPassword:{version:"3.0.0"},passwordGenerator:{version:"3.3.0"},locale:{options:[{locale:"de-DE",label:"Deutsch"},{locale:"en-UK",label:"English"},{locale:"es-ES",label:"Español"},{locale:"fr-FR",label:"Français"},{locale:"it-IT",label:"Italiano (Beta)"},{locale:"ja-JP",label:"日本語"},{locale:"ko-KR",label:"日本語"},{locale:"lt-LT",label:"Lietuvių"},{locale:"nl-NL",label:"Nederlands"},{locale:"pl-PL",label:"Polski"},{locale:"pt-BR",label:"Português Brasil (beta)"},{locale:"ro-RO",label:"Română (beta)"},{locale:"ru-RU",label:"Pусский (beta)"},{locale:"sv-SE",label:"Svenska"}]},mobile:{version:"1.0.0"},accountRecoveryRequestHelp:{version:"1.0.0",enabled:isProEdition},smtpSettings:{version:"1.0.0",enabled:!0},totpResourceTypes:{version:"1.0.0",enabled:!0},disableUser:{enabled:!0},passwordExpiry:{enabled:!0},desktop:{enabled:!0},passwordExpiryPolicies:{enabled:isProEdition},healthcheckUi:{enabled:!0},sso:{enabled:isProEdition},mfaPolicies:{enabled:isProEdition},passwordPoliciesUpdate:{enabled:isProEdition},userPassphrasePolicies:{enabled:isProEdition},metadata:{enabled:!0}}}}),__WEBPACK_DEFAULT_EXPORT__=siteSettings(!0),siteSettingsCe=siteSettings(!1)},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/react-extension/test/mock/MockStorage.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class LocalStorage{constructor(changeCallbacks){this.storage={},this.changeCallbacks=changeCallbacks}get(keys){return keys.reduce(((accumulator,key)=>(this.storage[key]&&(accumulator[key]=this.storage[key]),accumulator)),{})}set(data){const storageChangeEventValue={};Object.keys(data).forEach((key=>{this.storage[key]=data[key],storageChangeEventValue[key]={},storageChangeEventValue[key].newValue=data[key]})),this.changeCallbacks.forEach((callback=>callback(storageChangeEventValue)))}}const __WEBPACK_DEFAULT_EXPORT__=class MockStorage{constructor(){this.changeCallbacks=[],this.local=new LocalStorage(this.changeCallbacks),this.onChanged={addListener:listener=>{this.changeCallbacks.push(listener)},removeListener:listener=>{const listenerIndex=this.changeCallbacks.indexOf(listener);listenerIndex>-1&&this.changeCallbacks.splice(listenerIndex,1)}}}}},"./src/shared/lib/Settings/SiteSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>SiteSettings});var _react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/lib/Object/getPropValue.js"),_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/react-extension/lib/Sanitize/sanitizeUrl.js");class SiteSettings{constructor(settings){this.settings=this.sanitizeDto(settings)}sanitizeDto(dto){const sanitizedDto=JSON.parse(JSON.stringify(dto));return this.sanitizeEmailValidateRegex(sanitizedDto),sanitizedDto}sanitizeEmailValidateRegex(dto){const emailValidateRegex=dto?.passbolt?.email?.validate?.regex;emailValidateRegex&&"string"==typeof emailValidateRegex&&emailValidateRegex.trim().length&&(dto.passbolt.email.validate.regex=emailValidateRegex.trim().replace(/^\/+/,"").replace(/\/+$/,""))}canIUse(name){let result=!1;const configPath=`passbolt.plugins.${name}`,pluginSettings=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,configPath)||null;if(pluginSettings&&"object"==typeof pluginSettings){const pluginEnabled=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(pluginSettings,"enabled");void 0!==pluginEnabled&&!0!==pluginEnabled||(result=!0)}return result}getPluginSettings(name){const configPath=`passbolt.plugins.${name}`;return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,configPath)}getRememberMeOptions(){return(this.getPluginSettings("rememberMe")||{}).options||{}}get hasRememberMeUntilILogoutOption(){return void 0!==(this.getRememberMeOptions()||{})[-1]}getServerTimezone(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.app.server_timezone")}get termsLink(){const termsLink=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.legal.terms.url");return!!termsLink&&(0,_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__.A)(termsLink)}get privacyLink(){const privacyLink=(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.legal.privacy_policy.url");return!!privacyLink&&(0,_react_extension_lib_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_0__.A)(privacyLink)}get registrationPublic(){return!0===(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.registration.public")}get debug(){return!0===(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.debug")}get url(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.url")||""}get version(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.version.number")}get locale(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"app.locale")||SiteSettings.DEFAULT_LOCALE.locale}async setLocale(locale){this.settings.app.locale=locale}get supportedLocales(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.plugins.locale.options")||SiteSettings.DEFAULT_SUPPORTED_LOCALES}get generatorConfiguration(){return(0,_react_extension_lib_Object_getPropValue__WEBPACK_IMPORTED_MODULE_1__.A)(this.settings,"passbolt.plugins.generator.configuration")}get emailValidateRegex(){return this.settings?.passbolt?.email?.validate?.regex||null}static get DEFAULT_SUPPORTED_LOCALES(){return[SiteSettings.DEFAULT_LOCALE]}static get DEFAULT_LOCALE(){return{locale:"en-UK",label:"English"}}}},"./src/shared/lib/Settings/UserSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>UserSettings});class UserSettings{constructor(settings){this.settings=settings}get id(){return this.settings["user.id"]}get fullName(){return`${this.settings["user.firstname"]} ${this.settings["user.lastname"]}`}get username(){return this.settings["user.username"]}getTheme(){return this.settings["user.settings.theme"]}getTrustedDomain(){return this.settings["user.settings.trustedDomain"]}getSecurityToken(){return{code:this.settings["user.settings.securityToken.code"],backgroundColor:this.settings["user.settings.securityToken.color"],textColor:this.settings["user.settings.securityToken.textColor"]}}get locale(){return this.settings["user.settings.locale"]}}}}]);