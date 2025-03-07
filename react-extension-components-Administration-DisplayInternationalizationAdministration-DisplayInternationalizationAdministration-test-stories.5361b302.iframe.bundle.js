/*! For license information please see react-extension-components-Administration-DisplayInternationalizationAdministration-DisplayInternationalizationAdministration-test-stories.5361b302.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9253],{"./src/react-extension/components/Administration/DisplayInternationalizationAdministration/DisplayInternationalizationAdministration.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayInternationalizationAdministration_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),DisplayInternationalizationAdministration=__webpack_require__("./src/react-extension/components/Administration/DisplayInternationalizationAdministration/DisplayInternationalizationAdministration.js"),AdministrationInternationalizationContext=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext.js"),ApiAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ApiAppContext.test.data.js");const DisplayInternationalizationAdministration_test_stories={title:"Components/Administration/DisplayInternationalizationAdministration",component:DisplayInternationalizationAdministration.A},Template=args=>react.createElement(AdministrationInternationalizationContext.m$,args,react.createElement("div",{className:"panel middle"},react.createElement("div",{className:"grid grid-responsive-12"},react.createElement(DisplayInternationalizationAdministration.A,args))));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args=function defaultProps(){return{context:(0,ApiAppContext_test_data.s)(),administrationWorkspaceContext:{setDisplayAdministrationWorkspaceAction:jest.fn(),resetDisplayAdministrationWorkspaceAction:jest.fn()},actionFeedbackContext:{displaySuccess:()=>jest.fn(),displayError:jest.fn()}}}();const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:'args => <AdminInternationalizationContextProvider {...args}>\n    <div className="panel middle">\n      <div className="grid grid-responsive-12">\n        <DisplayInternationalizationAdministration {...args} />\n      </div>\n    </div>\n  </AdminInternationalizationContextProvider>',...Initial.parameters?.docs?.source}}}},"./src/img/svg/heart.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _g,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgHeart(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:17,height:16,fill:"none",viewBox:"0 0 17 16"},props),_g||(_g=react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{clipPath:"url(#heart_svg__clip0_93_734678)"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M13.497 9.333c.993-.973 2-2.14 2-3.666A3.667 3.667 0 0 0 11.83 2c-1.173 0-2 .333-3 1.333-1-1-1.827-1.333-3-1.333a3.667 3.667 0 0 0-3.667 3.667c0 1.533 1 2.7 2 3.666L8.83 14z"}))))}},"./src/react-extension/components/Administration/DisplayInternationalizationAdministration/DisplayInternationalizationAdministration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DisplayInternationalizationAdministration_DisplayInternationalizationAdministration});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AdministrationWorkspaceContext=__webpack_require__("./src/react-extension/contexts/AdministrationWorkspaceContext.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),heart=__webpack_require__("./src/img/svg/heart.svg"),Select=__webpack_require__("./src/react-extension/components/Common/Select/Select.js"),ActionFeedbackContext=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),AdministrationInternationalizationContext=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext.js");class DisplayAdministrationInternationalisationActions extends react.Component{constructor(props){super(props),this.bindCallbacks()}async handleSaveClick(){try{await this.props.adminInternationalizationContext.save(),this.handleSaveSuccess()}catch(error){this.handleSaveError(error)}finally{this.props.adminInternationalizationContext.setProcessing(!1)}}isSaveEnabled(){return!this.props.adminInternationalizationContext.isProcessing()&&this.props.adminInternationalizationContext.hasLocaleChanges()}bindCallbacks(){this.handleSaveClick=this.handleSaveClick.bind(this)}async handleSaveSuccess(){await this.props.actionFeedbackContext.displaySuccess(this.props.t("The internationalization settings were updated."))}async handleSaveError(error){"UserAbortsOperationError"!==error.name&&(console.error(error),await this.handleError(error))}async handleError(error){await this.props.actionFeedbackContext.displayError(error.message)}render(){return react.createElement("div",{className:"actions-wrapper"},react.createElement("button",{className:"button primary form",id:"save-settings",type:"button",disabled:!this.isSaveEnabled(),onClick:this.handleSaveClick},react.createElement("span",null,react.createElement(es.x6,null,"Save"))))}}DisplayAdministrationInternationalisationActions.propTypes={context:prop_types_default().object,adminInternationalizationContext:prop_types_default().object,actionFeedbackContext:prop_types_default().object,t:prop_types_default().func};const DisplayAdministrationInternationalisationActions_DisplayAdministrationInternationalisationActions=(0,AdministrationInternationalizationContext.A3)((0,ActionFeedbackContext.ot)((0,es.CI)("common")(DisplayAdministrationInternationalisationActions)));DisplayAdministrationInternationalisationActions.__docgenInfo={description:"This component is a container of multiple actions applicable on setting",methods:[{name:"handleSaveClick",docblock:"Handle save settings",modifiers:["async"],params:[],returns:null,description:"Handle save settings"},{name:"isSaveEnabled",docblock:"Is save button enable\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Is save button enable"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:["async"],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"handleError",docblock:"handle error to display the error dialog\n@param error",modifiers:["async"],params:[{name:"error",optional:!1}],returns:null,description:"handle error to display the error dialog"}],displayName:"DisplayAdministrationInternationalisationActions",props:{context:{description:"",type:{name:"object"},required:!1},adminInternationalizationContext:{description:"",type:{name:"object"},required:!1},actionFeedbackContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var portals=__webpack_require__("./src/shared/utils/portals.js");class DisplayInternationalizationAdministration extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}async componentDidMount(){this.props.adminInternationalizationContext.findLocale()}componentWillUnmount(){this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction(),this.props.adminInternationalizationContext.clearContext()}bindCallbacks(){this.handleInputChange=this.handleInputChange.bind(this)}handleInputChange(event){this.props.adminInternationalizationContext.setLocale(event.target.value)}get supportedLocales(){return this.props.context.siteSettings.supportedLocales?this.props.context.siteSettings.supportedLocales.map((supportedLocale=>({value:supportedLocale.locale,label:supportedLocale.label}))):[]}render(){const lang=this.props.adminInternationalizationContext.getLocale();return react.createElement("div",{className:"row"},react.createElement(react.Fragment,null,react.createElement("div",{className:"internationalisation-settings main-column"},react.createElement("div",{className:"main-content"},react.createElement("h3",{className:"title"},react.createElement(es.x6,null,"Internationalisation")),react.createElement("form",{className:"form"},react.createElement("div",{className:"select-wrapper input"},react.createElement("label",{htmlFor:"app-locale-input"},react.createElement(es.x6,null,"Language")),react.createElement(Select.A,{className:"medium",id:"locale-input",name:"locale",items:this.supportedLocales,value:lang,onChange:this.handleInputChange}),react.createElement("p",null,react.createElement(es.x6,null,"The default language of the organisation.")))))),react.createElement(DisplayAdministrationInternationalisationActions_DisplayAdministrationInternationalisationActions,null)),(0,portals.m)(react.createElement("div",{className:"sidebar-help-section"},react.createElement("h3",null,react.createElement(es.x6,null,"Want to contribute?")),react.createElement("p",null,react.createElement(es.x6,null,"Your language is missing or you discovered an error in the translation, help us to improve passbolt.")),react.createElement("a",{className:"button",href:"https://help.passbolt.com/contribute/translation",target:"_blank",rel:"noopener noreferrer"},react.createElement(heart.A,null),react.createElement("span",null,react.createElement(es.x6,null,"Contribute")))),document.getElementById("administration-help-panel")))}}DisplayInternationalizationAdministration.propTypes={context:prop_types_default().object,administrationWorkspaceContext:prop_types_default().object,adminInternationalizationContext:prop_types_default().object,t:prop_types_default().func};const DisplayInternationalizationAdministration_DisplayInternationalizationAdministration=(0,AppContext.L)((0,AdministrationInternationalizationContext.A3)((0,AdministrationWorkspaceContext.Kk)((0,es.CI)("common")(DisplayInternationalizationAdministration))));DisplayInternationalizationAdministration.__docgenInfo={description:"This component allows to display the internationalisation for the administration",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleInputChange",docblock:"Handle form input changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:[],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form input changes."},{name:"supportedLocales",docblock:"Get the supported locales\n@returns {array}",modifiers:["get"],params:[],returns:{type:{name:"array"}},description:"Get the supported locales"}],displayName:"DisplayInternationalizationAdministration",props:{context:{description:"",type:{name:"object"},required:!1},administrationWorkspaceContext:{description:"",type:{name:"object"},required:!1},adminInternationalizationContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m$:()=>AdminInternationalizationContextProvider,A3:()=>withAdminInternationalization});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),apiClient=__webpack_require__("./src/shared/lib/apiClient/apiClient.js");const Internationalisation_InternationalisationService=class InternationalisationService{constructor(apiClientOptions){apiClientOptions.setResourceName("locale/settings"),this.apiClient=new apiClient.O(apiClientOptions)}async save(lang){return(await this.apiClient.create(lang)).body}},AdminInternationalizationContext=react.createContext({getCurrentLocale:()=>{},getLocale:()=>{},supportedLocales:()=>{},setLocale:()=>{},hasLocaleChanges:()=>{},findLocale:()=>{},save:()=>{},setProcessing:()=>{},isProcessing:()=>{},clearContext:()=>{}});class AdminInternationalizationContextProvider extends react.Component{constructor(props){super(props),this.state=this.defaultState;const apiClientOptions=props.context.getApiClientOptions();this.internalisationService=new Internationalisation_InternationalisationService(apiClientOptions)}get defaultState(){return{currentLocale:null,locale:"en-UK",processing:!0,getCurrentLocale:this.getCurrentLocale.bind(this),getLocale:this.getLocale.bind(this),setLocale:this.setLocale.bind(this),findLocale:this.findLocale.bind(this),hasLocaleChanges:this.hasLocaleChanges.bind(this),isProcessing:this.isProcessing.bind(this),setProcessing:this.setProcessing.bind(this),save:this.save.bind(this),clearContext:this.clearContext.bind(this)}}findLocale(){this.setProcessing(!0);const result=this.props.context.siteSettings.locale;this.setState({currentLocale:result}),this.setState({locale:result}),this.setProcessing(!1)}getCurrentLocale(){return this.state.currentLocale}getLocale(){return this.state.locale}async setLocale(locale){await this.setState({locale})}isProcessing(){return this.state.processing}setProcessing(processing){this.setState({processing})}hasLocaleChanges(){return this.state.locale!==this.state.currentLocale}clearContext(){const{currentLocale,locale,processing}=this.defaultState;this.setState({currentLocale,locale,processing})}async save(){this.setProcessing(!0),await this.internalisationService.save({value:this.state.locale}),this.props.context.onRefreshLocaleRequested(this.state.locale),this.findLocale()}render(){return react.createElement(AdminInternationalizationContext.Provider,{value:this.state},this.props.children)}}AdminInternationalizationContextProvider.propTypes={context:prop_types_default().any,children:prop_types_default().any};(0,AppContext.L)(AdminInternationalizationContextProvider);function withAdminInternationalization(WrappedComponent){return class WithAdminInternationalization extends react.Component{render(){return react.createElement(AdminInternationalizationContext.Consumer,null,(adminInternationalizationContext=>react.createElement(WrappedComponent,{adminInternationalizationContext,...this.props})))}}}AdminInternationalizationContextProvider.__docgenInfo={description:"The Administration Internationalization context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"findLocale",docblock:"Find locale from API\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Find locale from API"},{name:"getCurrentLocale",docblock:"Returns the locale actually saved\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Returns the locale actually saved"},{name:"getLocale",docblock:"Returns the locale that have been fetch previously.\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Returns the locale that have been fetch previously."},{name:"setLocale",docblock:"Handle locale changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:["async"],params:[{name:"locale",optional:!1}],returns:{type:{name:"void"}},description:"Handle locale changes."},{name:"isProcessing",docblock:"Returns true when the data is under processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true when the data is under processing"},{name:"setProcessing",docblock:"Handle processing change.\n@params {Boolean} processing value\n@returns {void}",modifiers:[],params:[{name:"processing",optional:!1}],returns:{type:{name:"void"}},description:"Handle processing change."},{name:"hasLocaleChanges",docblock:"Check if there are changes to apply\n@returns {Boolean}",modifiers:[],params:[],returns:{type:{name:"Boolean"}},description:"Check if there are changes to apply"},{name:"clearContext",docblock:"Puts the state to its default in order to avoid keeping the data users didn't want to save.",modifiers:[],params:[],returns:null,description:"Puts the state to its default in order to avoid keeping the data users didn't want to save."},{name:"save",docblock:"Whenever the save has been requested",modifiers:["async"],params:[],returns:null,description:"Whenever the save has been requested"}],displayName:"AdminInternationalizationContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/lib/Error/PassboltApiFetchError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class PassboltApiFetchError extends Error{constructor(message,data){super(message),this.name="PassboltApiFetchError",this.data=data||{}}}const __WEBPACK_DEFAULT_EXPORT__=PassboltApiFetchError},"./src/shared/lib/Error/PassboltServiceUnavailableError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class PassboltServiceUnavailableError extends Error{constructor(message){super(message=message||"The service is unavailable"),this.name="PassboltServiceUnavailableError"}}const __WEBPACK_DEFAULT_EXPORT__=PassboltServiceUnavailableError},"./src/shared/lib/apiClient/apiClient.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>ApiClient});var PassboltApiFetchError=__webpack_require__("./src/shared/lib/Error/PassboltApiFetchError.js");class PassboltBadResponseError extends Error{constructor(){super("An internal error occurred. The server response could not be parsed. Please contact your administrator."),this.name="PassboltBadResponseError"}}const Error_PassboltBadResponseError=PassboltBadResponseError;var PassboltServiceUnavailableError=__webpack_require__("./src/shared/lib/Error/PassboltServiceUnavailableError.js");const SUPPORTED_METHODS=["GET","POST","PUT","DELETE"];class ApiClient{constructor(options){if(this.options=options,!this.options.getBaseUrl())throw new TypeError("ApiClient constructor error: baseUrl is required.");if(!this.options.getResourceName())throw new TypeError("ApiClient constructor error: resourceName is required.");try{let rawBaseUrl=this.options.getBaseUrl().toString();rawBaseUrl.endsWith("/")&&(rawBaseUrl=rawBaseUrl.slice(0,-1));let resourceName=this.options.getResourceName();resourceName.startsWith("/")&&(resourceName=resourceName.slice(1)),resourceName.endsWith("/")&&(resourceName=resourceName.slice(0,-1)),this.baseUrl=`${rawBaseUrl}/${resourceName}`,this.baseUrl=new URL(this.baseUrl)}catch(typeError){throw new TypeError("ApiClient constructor error: b.")}this.apiVersion="api-version=v2"}getDefaultHeaders(){return{Accept:"application/json","content-type":"application/json"}}async buildFetchOptions(){const optionHeaders=await this.options.getHeaders();return{credentials:"include",headers:{...this.getDefaultHeaders(),...optionHeaders}}}async get(id,urlOptions){this.assertValidId(id);const url=this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});return this.fetchAndHandleResponse("GET",url)}async delete(id,body,urlOptions,dryRun){let url;this.assertValidId(id),void 0===dryRun&&(dryRun=!1),url=dryRun?this.buildUrl(`${this.baseUrl}/${id}/dry-run`,urlOptions||{}):this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});let bodyString=null;return body&&(bodyString=this.buildBody(body)),this.fetchAndHandleResponse("DELETE",url,bodyString)}async findAll(urlOptions){const url=this.buildUrl(this.baseUrl.toString(),urlOptions||{});return this.fetchAndHandleResponse("GET",url)}async create(body,urlOptions){const url=this.buildUrl(this.baseUrl.toString(),urlOptions||{}),bodyString=this.buildBody(body);return this.fetchAndHandleResponse("POST",url,bodyString)}async update(id,body,urlOptions,dryRun){let url;this.assertValidId(id),void 0===dryRun&&(dryRun=!1),url=dryRun?this.buildUrl(`${this.baseUrl}/${id}/dry-run`,urlOptions||{}):this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});let bodyString=null;return body&&(bodyString=this.buildBody(body)),this.fetchAndHandleResponse("PUT",url,bodyString)}async updateAll(body,urlOptions={}){const url=this.buildUrl(this.baseUrl.toString(),urlOptions),bodyString=body?this.buildBody(body):null;return this.fetchAndHandleResponse("PUT",url,bodyString)}assertValidId(id){if(!id)throw new TypeError("ApiClient.assertValidId error: id cannot be empty");if("string"!=typeof id)throw new TypeError("ApiClient.assertValidId error: id should be a string")}assertMethod(method){if("string"!=typeof method)throw new TypeError("ApiClient.assertValidMethod method should be a string.");if(SUPPORTED_METHODS.indexOf(method.toUpperCase())<0)throw new TypeError(`ApiClient.assertValidMethod error: method ${method} is not supported.`)}assertUrl(url){if(!url)throw new TypeError("ApliClient.assertUrl error: url is required.");if(!(url instanceof URL))throw new TypeError("ApliClient.assertUrl error: url should be a valid URL object.");if("https:"!==url.protocol&&"http:"!==url.protocol)throw new TypeError("ApliClient.assertUrl error: url protocol should only be https or http.")}assertBody(body){if(!(body instanceof FormData)&&"string"!=typeof body)throw new TypeError("ApiClient.assertBody error: body should be a string or a FormData.")}buildBody(body){return JSON.stringify(body)}buildUrl(url,urlOptions){if("string"!=typeof url)throw new TypeError("ApiClient.buildUrl error: url should be a string.");const urlObj=new URL(`${url}.json?${this.apiVersion}`);urlOptions=urlOptions||{};for(const[key,value]of Object.entries(urlOptions)){if("string"!=typeof key)throw new TypeError("ApiClient.buildUrl error: urlOptions key should be a string.");if("string"==typeof value)urlObj.searchParams.append(key,value);else{if(!Array.isArray(value))throw new TypeError("ApiClient.buildUrl error: urlOptions value should be a string or array.");value.forEach((v=>{urlObj.searchParams.append(key,v)}))}}return urlObj}async sendRequest(method,url,body,options){this.assertUrl(url),this.assertMethod(method),body&&this.assertBody(body);const fetchStrategy="undefined"!=typeof customApiClientFetch?customApiClientFetch:fetch,fetchOptions={...await this.buildFetchOptions(),...options};fetchOptions.method=method,body&&(fetchOptions.body=body);try{return await fetchStrategy(url.toString(),fetchOptions)}catch(error){throw console.error(error),navigator.onLine?new PassboltServiceUnavailableError.A("Unable to reach the server, an unexpected error occurred"):new PassboltServiceUnavailableError.A("Unable to reach the server, you are not connected to the network")}}async fetchAndHandleResponse(method,url,body,options){const response=await this.sendRequest(method,url,body,options);return this.parseResponseJson(response)}async parseResponseJson(response){let responseJson;try{responseJson=await response.json()}catch(error){throw console.debug(response.url.toString(),error),new Error_PassboltBadResponseError(error,response)}if(!response.ok){const message=responseJson.header.message;throw new PassboltApiFetchError.A(message,{code:response.status,body:responseJson.body})}return responseJson}}},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./src/shared/utils/portals.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>createSafePortal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/index.js");function createSafePortal(children,domNode,key){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,domNode&&(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(children,domNode,key))}createSafePortal.__docgenInfo={description:'Create a portal in a "safe" mode.\n"Safe" mode only means that if the given HTML element doesn\'t exist, the method doesn\'t crash.\nIt will simply ignore the rendering if it happens.\n@param {ReactNode} children the elements to render in the portal\n@param {Element | DocumentFragment} domNode the target where to render the children.\n@param {null | string} [key] a React compatible key to be passed to `createPortal` if any\n@returns {JSX}',methods:[],displayName:"createSafePortal"}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);