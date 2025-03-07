/*! For license information please see 3077.888ba521.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3077],{"./src/react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DisplayMfaAdministration_DisplayMfaAdministration});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),file=__webpack_require__("./src/img/svg/file.svg"),AdministrationWorkspaceContext=__webpack_require__("./src/react-extension/contexts/AdministrationWorkspaceContext.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),ActionFeedbackContext=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),AdministrationMfaContext=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationMfa/AdministrationMfaContext.js"),lib=__webpack_require__("./node_modules/xregexp/lib/index.js"),lib_default=__webpack_require__.n(lib);class MfaFormService{constructor(context,translation){this.context=context,this.translation=translation}static getInstance(context,translation){return this.instance||(this.instance=new MfaFormService(context,translation)),this.instance}static killInstance(){this.instance=null}validateInput(inputValue,regex,messages){const value=inputValue.trim();return value.length?lib_default()(regex).test(value)?null:this.translation(messages.regex):this.translation(messages.required)}validateYubikeyClientIdentifier(value){const result=this.validateInput(value,"^[0-9]{1,64}$",{required:"A client identifier is required.",regex:"The client identifier should be an integer."});return this.context.setError("yubikeyClientIdentifierError",result),result}validateYubikeySecretKey(value){const result=this.validateInput(value,"^[a-zA-Z0-9\\/=+]{10,128}$",{required:"A secret key is required.",regex:"This secret key is not valid."});return this.context.setError("yubikeySecretKeyError",result),result}validateDuoHostname(value){const result=this.validateInput(value,"^api-[a-fA-F0-9]{8,16}\\.duosecurity\\.com$",{required:"A hostname is required.",regex:"This is not a valid hostname."});return this.context.setError("duoHostnameError",result),result}validateDuoClientId(value){const result=this.validateInput(value,"^[a-zA-Z0-9]{16,32}$",{required:"A client id is required.",regex:"This is not a valid client id."});return this.context.setError("duoClientIdError",result),result}validateDuoClientSecret(value){const result=this.validateInput(value,"^[a-zA-Z0-9]{32,128}$",{required:"A client secret is required.",regex:"This is not a valid client secret."});return this.context.setError("duoClientSecretError",result),result}validateYubikeyInputs(){let yubikeyClientIdentifierError=null,yubikeySecretKeyError=null;const settings=this.context.getSettings();let result={};return settings.yubikeyToggle&&(yubikeyClientIdentifierError=this.validateYubikeyClientIdentifier(settings.yubikeyClientIdentifier),yubikeySecretKeyError=this.validateYubikeySecretKey(settings.yubikeySecretKey),result={yubikeyClientIdentifierError,yubikeySecretKeyError}),result}validateDuoInputs(){let duoHostnameError=null,duoClientIdError=null,duoClientSecretError=null,result={};const settings=this.context.getSettings();return settings.duoToggle&&(duoHostnameError=this.validateDuoHostname(settings.duoHostname),duoClientIdError=this.validateDuoClientId(settings.duoClientId),duoClientSecretError=this.validateDuoClientSecret(settings.duoClientSecret),result={duoHostnameError,duoClientIdError,duoClientSecretError}),result}async validate(){const validation=Object.assign(this.validateYubikeyInputs(),this.validateDuoInputs());return await this.context.setErrors(validation),0===Object.values(validation).filter((x=>x)).length}}const Mfa_MfaFormService=MfaFormService;class DisplayAdministrationMfaActions extends react.Component{constructor(props){super(props),this.bindCallbacks(),this.mfaFormService=Mfa_MfaFormService.getInstance(this.props.adminMfaContext,this.props.t)}async handleSaveClick(){try{await this.mfaFormService.validate()&&(await this.props.adminMfaContext.save(),this.handleSaveSuccess())}catch(error){this.handleSaveError(error)}finally{this.props.adminMfaContext.setSubmitted(!0),this.props.adminMfaContext.setProcessing(!1)}}isSaveEnabled(){return!this.props.adminMfaContext.isProcessing()&&this.props.adminMfaContext.hasSettingsChanges()}bindCallbacks(){this.handleSaveClick=this.handleSaveClick.bind(this)}async handleSaveSuccess(){await this.props.actionFeedbackContext.displaySuccess(this.props.t("The multi factor authentication settings for the organization were updated."))}async handleSaveError(error){"UserAbortsOperationError"!==error.name&&(console.error(error),await this.handleError(error))}async handleError(error){await this.props.actionFeedbackContext.displayError(error.message)}render(){return react.createElement("div",{className:"actions-wrapper"},react.createElement("button",{id:"save-settings",className:"button primary form",type:"button",disabled:!this.isSaveEnabled(),onClick:this.handleSaveClick},react.createElement("span",null,react.createElement(es.x6,null,"Save"))))}}DisplayAdministrationMfaActions.propTypes={adminMfaContext:prop_types_default().object,actionFeedbackContext:prop_types_default().object,t:prop_types_default().func};const DisplayAdministrationMfaActions_DisplayAdministrationMfaActions=(0,AdministrationMfaContext.sS)((0,ActionFeedbackContext.ot)((0,es.CI)("common")(DisplayAdministrationMfaActions)));DisplayAdministrationMfaActions.__docgenInfo={description:"This component is a container of multiple actions applicable on setting",methods:[{name:"handleSaveClick",docblock:"Handle save settings",modifiers:["async"],params:[],returns:null,description:"Handle save settings"},{name:"isSaveEnabled",docblock:"Is save button enable\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Is save button enable"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:["async"],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"handleError",docblock:"handle error to display the error dialog\n@param error",modifiers:["async"],params:[{name:"error",optional:!1}],returns:null,description:"handle error to display the error dialog"}],displayName:"DisplayAdministrationMfaActions",props:{adminMfaContext:{description:"",type:{name:"object"},required:!1},actionFeedbackContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var Password=__webpack_require__("./src/shared/components/Password/Password.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),portals=__webpack_require__("./src/shared/utils/portals.js");class DisplayMfaAdministration extends react.Component{constructor(props){super(props),this.mfaFormService=Mfa_MfaFormService.getInstance(this.props.adminMfaContext,this.props.t),this.bindCallbacks()}async componentDidMount(){this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationMfaActions_DisplayAdministrationMfaActions),this.isRunningUnderHttps&&this.props.adminMfaContext.findMfaSettings()}componentWillUnmount(){this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction(),this.props.adminMfaContext.clearContext(),Mfa_MfaFormService.killInstance(),this.mfaFormService=null}bindCallbacks(){this.handleInputChange=this.handleInputChange.bind(this)}handleInputChange(event){const target=event.target,value="checkbox"===target.type?target.checked:target.value,name=target.name;this.props.adminMfaContext.setSettings(name,value),this.validateInput(name,value)}validateInput(name,value){switch(name){case"yubikeyClientIdentifier":this.mfaFormService.validateYubikeyClientIdentifier(value);break;case"yubikeySecretKey":this.mfaFormService.validateYubikeySecretKey(value);break;case"duoHostname":this.mfaFormService.validateDuoHostname(value);break;case"duoClientId":this.mfaFormService.validateDuoClientId(value);break;case"duoClientSecret":this.mfaFormService.validateDuoClientSecret(value)}}get isRunningUnderHttps(){const trustedDomain=this.props.context.trustedDomain;return"https:"===new URL(trustedDomain).protocol}hasAllInputDisabled(){return this.props.adminMfaContext.isProcessing()}render(){const isSubmitted=this.props.adminMfaContext.isSubmitted(),settings=this.props.adminMfaContext.getSettings(),errors=this.props.adminMfaContext.getErrors();return react.createElement("div",{className:"row"},react.createElement(react.Fragment,null,react.createElement("div",{className:"mfa-settings main-column"},react.createElement("div",{className:"main-content"},react.createElement("h3",{className:"title"},"Multi Factor Authentication"),!this.isRunningUnderHttps&&react.createElement("p",null,react.createElement(es.x6,null,"Sorry the multi factor authentication feature is only available in a secure context (HTTPS).")),this.isRunningUnderHttps&&react.createElement(react.Fragment,null,react.createElement("p",null,react.createElement(es.x6,null,"In this section you can choose which multi factor authentication will be available.")),react.createElement("div",{className:"provider-section"},react.createElement("h4",{className:"no-border"},react.createElement("span",{className:"input toggle-switch form-element ready"},react.createElement("input",{id:"totp-provider-toggle-button",type:"checkbox",className:"toggle-switch-checkbox checkbox",name:"totpProviderToggle",onChange:this.handleInputChange,checked:settings.totpProviderToggle,disabled:this.hasAllInputDisabled()}),react.createElement("label",{htmlFor:"totp-provider-toggle-button"},react.createElement(es.x6,null,"Time-based One Time Password")))),!settings.totpProviderToggle&&react.createElement("p",{className:"description"},react.createElement(es.x6,null,"The Time-based One Time Password provider is disabled for all users.")),settings.totpProviderToggle&&react.createElement("p",{className:"description"},react.createElement(es.x6,null,"The Time-based One Time Password provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication."))),react.createElement("div",{className:"provider-section"},react.createElement("h4",null,react.createElement("span",{className:"input toggle-switch form-element"},react.createElement("input",{id:"yubikey-provider-toggle-button",type:"checkbox",className:"toggle-switch-checkbox checkbox",name:"yubikeyToggle",onChange:this.handleInputChange,checked:settings.yubikeyToggle,disabled:this.hasAllInputDisabled()}),react.createElement("label",{htmlFor:"yubikey-provider-toggle-button"},"Yubikey"))),!settings.yubikeyToggle&&react.createElement("p",{className:"description"},react.createElement(es.x6,null,"The Yubikey provider is disabled for all users.")),settings.yubikeyToggle&&react.createElement(react.Fragment,null,react.createElement("p",{className:"description"},react.createElement(es.x6,null,"The Yubikey provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.")),react.createElement("div",{className:`input text required ${errors.yubikeyClientIdentifierError&&isSubmitted?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react.createElement("label",null,react.createElement(es.x6,null,"Client identifier")),react.createElement("input",{id:"yubikeyClientIdentifier",type:"text",name:"yubikeyClientIdentifier","aria-required":!0,className:"required fluid form-element ready",placeholder:"123456789",onChange:this.handleInputChange,value:settings.yubikeyClientIdentifier,disabled:this.hasAllInputDisabled()}),errors.yubikeyClientIdentifierError&&isSubmitted&&react.createElement("div",{className:"yubikey_client_identifier error-message"},errors.yubikeyClientIdentifierError)),react.createElement("div",{className:`input required input-secret ${errors.yubikeySecretKeyError&&isSubmitted?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react.createElement("label",null,react.createElement(es.x6,null,"Secret key")),react.createElement(Password.A,{id:"yubikeySecretKey",onChange:this.handleInputChange,autoComplete:"off",name:"yubikeySecretKey",placeholder:"**********",disabled:this.hasAllInputDisabled(),value:settings.yubikeySecretKey,preview:!0}),errors.yubikeySecretKeyError&&isSubmitted&&react.createElement("div",{className:"yubikey_secret_key error-message"},errors.yubikeySecretKeyError)))),react.createElement("div",{className:"provider-section"},react.createElement("h4",null,react.createElement("span",{className:"input toggle-switch form-element ready"},react.createElement("input",{id:"duo-provider-toggle-button",type:"checkbox",className:"toggle-switch-checkbox checkbox",name:"duoToggle",onChange:this.handleInputChange,checked:settings.duoToggle,disabled:this.hasAllInputDisabled()}),react.createElement("label",{htmlFor:"duo-provider-toggle-button"},"Duo"))),!settings.duoToggle&&react.createElement("p",{className:"description"},react.createElement(es.x6,null,"The Duo provider is disabled for all users.")),settings.duoToggle&&react.createElement(react.Fragment,null,react.createElement("p",{className:"description enabled"},react.createElement(es.x6,null,"The Duo provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.")),react.createElement("div",{className:`input text required ${errors.duoHostnameError&&isSubmitted?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react.createElement("label",null,react.createElement(es.x6,null,"Hostname")),react.createElement("input",{id:"duoHostname",type:"text",name:"duoHostname","aria-required":!0,className:"required fluid form-element ready",placeholder:"api-24zlkn4.duosecurity.com",value:settings.duoHostname,onChange:this.handleInputChange,disabled:this.hasAllInputDisabled()}),errors.duoHostnameError&&isSubmitted&&react.createElement("div",{className:"duo_hostname error-message"},errors.duoHostnameError)),react.createElement("div",{className:`input text required ${errors.duoClientIdError&&isSubmitted?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react.createElement("label",null,react.createElement(es.x6,null,"Client id")),react.createElement("input",{id:"duoClientId",type:"text",name:"duoClientId","aria-required":!0,className:"required fluid form-element ready",placeholder:"HASJKDSQJO213123KQSLDF",value:settings.duoClientId,onChange:this.handleInputChange,disabled:this.hasAllInputDisabled()}),errors.duoClientIdError&&isSubmitted&&react.createElement("div",{className:"duo_client_id error-message"},errors.duoClientIdError)),react.createElement("div",{className:`input text required ${errors.duoClientSecretError&&isSubmitted?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react.createElement("label",null,react.createElement(es.x6,null,"Client secret")),react.createElement(Password.A,{id:"duoClientSecret",onChange:this.handleInputChange,autoComplete:"off",name:"duoClientSecret",placeholder:"**********",disabled:this.hasAllInputDisabled(),value:settings.duoClientSecret,preview:!0}),errors.duoClientSecretError&&isSubmitted&&react.createElement("div",{className:"duo_client_secret error-message"},errors.duoClientSecretError))))))),react.createElement(DisplayAdministrationMfaActions_DisplayAdministrationMfaActions,null)),(0,portals.m)(react.createElement("div",{className:"sidebar-help-section"},react.createElement("h3",null,react.createElement(es.x6,null,"Need some help?")),react.createElement("p",null,react.createElement(es.x6,null,"Check out our Multi Factor Authentication configuration guide.")),react.createElement("a",{className:"button",href:"https://passbolt.com/docs/admin/authentication/mfa/",target:"_blank",rel:"noopener noreferrer"},react.createElement(file.A,null),react.createElement("span",null,react.createElement(es.x6,null,"Read the documentation")))),document.getElementById("administration-help-panel")))}}DisplayMfaAdministration.propTypes={context:prop_types_default().object,adminMfaContext:prop_types_default().object,createPortal:prop_types_default().func,administrationWorkspaceContext:prop_types_default().object,t:prop_types_default().func};const DisplayMfaAdministration_DisplayMfaAdministration=(0,AppContext.L)((0,AdministrationMfaContext.sS)((0,AdministrationWorkspaceContext.Kk)((0,es.CI)("common")(DisplayMfaAdministration))));DisplayMfaAdministration.__docgenInfo={description:"This component allows to display the MFA for the administration",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleInputChange",docblock:"Handle form input changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:[],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form input changes."},{name:"validateInput",docblock:"validate the input\n@params {string} The input name\n@params {string} The input valude\n@returns {void}",modifiers:[],params:[{name:"name",optional:!1},{name:"value",optional:!1}],returns:{type:{name:"void"}},description:"validate the input"},{name:"isRunningUnderHttps",docblock:"Returns true if the current URL is using the protocol HTTPS\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the current URL is using the protocol HTTPS"},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"}],displayName:"DisplayMfaAdministration",props:{context:{description:"",type:{name:"object"},required:!1},adminMfaContext:{description:"",type:{name:"object"},required:!1},createPortal:{description:"",type:{name:"func"},required:!1},administrationWorkspaceContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/Administration/AdministrationMfa/AdministrationMfaContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oT:()=>AdminMfaContextProvider,sS:()=>withAdminMfa});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const MfaProviders_totp="totp",MfaProviders_yubikey="yubikey",MfaProviders_duo="duo";const Mfa_MfaModel=class MfaModel{constructor(mfaDTO={}){this.totpProviderToggle="providers"in mfaDTO&&mfaDTO.providers.includes(MfaProviders_totp),this.yubikeyToggle="providers"in mfaDTO&&mfaDTO.providers.includes(MfaProviders_yubikey),this.yubikeyClientIdentifier="yubikey"in mfaDTO?mfaDTO.yubikey.clientId:"",this.yubikeySecretKey="yubikey"in mfaDTO?mfaDTO.yubikey.secretKey:"",this.duoToggle="providers"in mfaDTO&&mfaDTO.providers.includes(MfaProviders_duo),this.duoHostname="duo"in mfaDTO?mfaDTO.duo.hostName:"",this.duoClientId="duo"in mfaDTO?mfaDTO.duo.integrationKey:"",this.duoClientSecret="duo"in mfaDTO?mfaDTO.duo.secretKey:""}};const Mfa_Yubikey=class Yubikey{constructor(yubikey={}){this.clientId="yubikeyClientIdentifier"in yubikey?yubikey.yubikeyClientIdentifier:yubikey.clientId,this.secretKey="yubikeySecretKey"in yubikey?yubikey.yubikeySecretKey:yubikey.secretKey}};const Mfa_Duo=class Duo{constructor(duo={}){this.apiHostName=duo.duoHostname,this.clientId=duo.duoClientId,this.clientSecret=duo.duoClientSecret}};const Mfa_MfaDTO=class MfaDTO{constructor(mfaModel={}){this.providers=[],this.setProviders(mfaModel),this.yubikey=this.providers.includes(MfaProviders_yubikey)?new Mfa_Yubikey(mfaModel):{},this.duo=this.providers.includes(MfaProviders_duo)?new Mfa_Duo(mfaModel):{}}setProviders(mfaModel){mfaModel.totpProviderToggle&&this.providers.push(MfaProviders_totp),mfaModel.yubikeyToggle&&this.providers.push(MfaProviders_yubikey),mfaModel.duoToggle&&this.providers.push(MfaProviders_duo)}};var apiClient=__webpack_require__("./src/shared/lib/apiClient/apiClient.js");const MfaService=class MFAService{constructor(apiClientOptions){this.apiClientOptions=apiClientOptions}async findAllSettings(){return this.initClient(),(await this.apiClient.findAll()).body}async save(MFASetting){return this.initClient(),(await this.apiClient.create(MFASetting)).body}async getUserSettings(){return this.initClient("setup/select"),(await this.apiClient.findAll()).body}initClient(path="settings"){this.apiClientOptions.setResourceName(`mfa/${path}`),this.apiClient=new apiClient.O(this.apiClientOptions)}},AdminMfaContext=react.createContext({getCurrentSettings:()=>{},getSettings:()=>{},setSettings:()=>{},hasSettingsChanges:()=>{},findMfaSettings:()=>{},save:()=>{},setProcessing:()=>{},isProcessing:()=>{},getErrors:()=>{},setError:()=>{},isSubmitted:()=>{},setSubmitted:()=>{},setErrors:()=>{},clearContext:()=>{}});class AdminMfaContextProvider extends react.Component{constructor(props){super(props),this.state=this.defaultState;const apiClientOptions=props.context.getApiClientOptions();this.mfaService=new MfaService(apiClientOptions)}get defaultState(){return{errors:this.initErrors(),currentSettings:null,settings:new Mfa_MfaModel,submitted:!1,processing:!0,getCurrentSettings:this.getCurrentSettings.bind(this),getSettings:this.getSettings.bind(this),setSettings:this.setSettings.bind(this),findMfaSettings:this.findMfaSettings.bind(this),hasSettingsChanges:this.hasSettingsChanges.bind(this),isProcessing:this.isProcessing.bind(this),isSubmitted:this.isSubmitted.bind(this),setSubmitted:this.setSubmitted.bind(this),setProcessing:this.setProcessing.bind(this),save:this.save.bind(this),getErrors:this.getErrors.bind(this),setError:this.setError.bind(this),setErrors:this.setErrors.bind(this),clearContext:this.clearContext.bind(this)}}initErrors(){return{yubikeyClientIdentifierError:null,yubikeySecretKeyError:null,duoHostnameError:null,duoClientIdError:null,duoClientSecretError:null}}async findMfaSettings(){this.setProcessing(!0);const result=await this.mfaService.findAllSettings(),currentSettings=new Mfa_MfaModel(result);this.setState({currentSettings}),this.setState({settings:Object.assign({},currentSettings)}),this.setProcessing(!1)}getCurrentSettings(){return this.state.currentSettings}getSettings(){return this.state.settings}async setSettings(key,value){const newSettings=Object.assign({},this.state.settings,{[key]:value});await this.setState({settings:newSettings})}isProcessing(){return this.state.processing}setProcessing(processing){this.setState({processing})}hasSettingsChanges(){return JSON.stringify(this.state.currentSettings)!==JSON.stringify(this.state.settings)}isSubmitted(){return this.state.submitted}setSubmitted(submitted){this.setState({submitted})}clearContext(){const{currentSettings,settings,processing}=this.defaultState;this.setState({currentSettings,settings,processing})}async save(){this.setProcessing(!0);const newSettings=new Mfa_MfaDTO(this.state.settings);await this.mfaService.save(newSettings),await this.findMfaSettings()}getErrors(){return this.state.errors}setError(key,value){const errors=Object.assign({},this.state.errors,{[key]:value});this.setState({errors})}setErrors(newErrors,callback=()=>{}){const errors=Object.assign({},this.state.errors,newErrors);return this.setState({errors},callback)}render(){return react.createElement(AdminMfaContext.Provider,{value:this.state},this.props.children)}}AdminMfaContextProvider.propTypes={context:prop_types_default().any,children:prop_types_default().any};(0,AppContext.L)(AdminMfaContextProvider);function withAdminMfa(WrappedComponent){return class WithAdminMfa extends react.Component{render(){return react.createElement(AdminMfaContext.Consumer,null,(adminMfaContext=>react.createElement(WrappedComponent,{adminMfaContext,...this.props})))}}}AdminMfaContextProvider.__docgenInfo={description:"The Administration Mfa context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"initErrors",docblock:"init the errors object\n@return {Promise<void>}",modifiers:[],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"init the errors object"},{name:"findMfaSettings",docblock:"Find the Mfa settings\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find the Mfa settings"},{name:"getCurrentSettings",docblock:"Returns the setting actually saved inside DB\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Returns the setting actually saved inside DB"},{name:"getSettings",docblock:"Returns the Mfa settings that have been fetch previously.\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Returns the Mfa settings that have been fetch previously."},{name:"setSettings",docblock:"Handle settings changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:["async"],params:[{name:"key",optional:!1},{name:"value",optional:!1}],returns:{type:{name:"void"}},description:"Handle settings changes."},{name:"isProcessing",docblock:"Returns true when the data is under processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true when the data is under processing"},{name:"setProcessing",docblock:"Handle processing change.\n@params {Boolean} processing value\n@returns {void}",modifiers:[],params:[{name:"processing",optional:!1}],returns:{type:{name:"void"}},description:"Handle processing change."},{name:"hasSettingsChanges",docblock:"Check if there are changes to apply\n@returns {Boolean}",modifiers:[],params:[],returns:{type:{name:"Boolean"}},description:"Check if there are changes to apply"},{name:"isSubmitted",docblock:"return true if the form has been submitted\n@returns {Boolean}",modifiers:[],params:[],returns:{type:{name:"Boolean"}},description:"return true if the form has been submitted"},{name:"setSubmitted",docblock:"rchange value for submitted\n@returns {Boolean}",modifiers:[],params:[{name:"submitted",optional:!1}],returns:{type:{name:"Boolean"}},description:"rchange value for submitted"},{name:"clearContext",docblock:"Puts the state to its default in order to avoid keeping the data users didn't want to save.",modifiers:[],params:[],returns:null,description:"Puts the state to its default in order to avoid keeping the data users didn't want to save."},{name:"save",docblock:"Whenever the save has been requested",modifiers:["async"],params:[],returns:null,description:"Whenever the save has been requested"},{name:"getErrors",docblock:"return the errors object",modifiers:[],params:[],returns:null,description:"return the errors object"},{name:"setError",docblock:"set an error to object",modifiers:[],params:[{name:"key",optional:!1},{name:"value",optional:!1}],returns:null,description:"set an error to object"},{name:"setErrors",docblock:"set errors to object",modifiers:[],params:[{name:"newErrors",optional:!1},{name:"callback",optional:!0}],returns:null,description:"set errors to object"}],displayName:"AdminMfaContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}}}]);