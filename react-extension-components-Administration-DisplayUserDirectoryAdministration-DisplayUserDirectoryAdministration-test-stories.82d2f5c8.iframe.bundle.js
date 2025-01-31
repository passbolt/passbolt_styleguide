/*! For license information please see react-extension-components-Administration-DisplayUserDirectoryAdministration-DisplayUserDirectoryAdministration-test-stories.82d2f5c8.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4515],{"./src/react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_DisplayUserDirectoryAdministration__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.js"),_DisplayUserDirectoryAdministration_test_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data.js"),_test_mocks_mockApiResponse__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./test/mocks/mockApiResponse.js"),_test_mock_MockFetch__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/test/mock/MockFetch.js"),_contexts_Administration_AdministrationUserDirectory_AdministrationUserDirectoryContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext.js");const mockFetch=new _test_mock_MockFetch__WEBPACK_IMPORTED_MODULE_3__.A;mockFetch.addGetFetchRequest(/directorysync\/settings.json/,(async()=>(0,_test_mocks_mockApiResponse__WEBPACK_IMPORTED_MODULE_5__._)(_DisplayUserDirectoryAdministration_test_data__WEBPACK_IMPORTED_MODULE_2__.Yw))),mockFetch.addGetFetchRequest(/users*/,(async()=>(0,_test_mocks_mockApiResponse__WEBPACK_IMPORTED_MODULE_5__._)(_DisplayUserDirectoryAdministration_test_data__WEBPACK_IMPORTED_MODULE_2__.rB)));const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Administration/DisplayUserDirectoryAdministration",component:_DisplayUserDirectoryAdministration__WEBPACK_IMPORTED_MODULE_1__.A,decorators:[(Story,{args})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{id:"container",className:"page administration"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{id:"app",className:"app",tabIndex:"1000"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel main"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel middle"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"middle-right"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"breadcrumbs-and-grid"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-page"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_contexts_Administration_AdministrationUserDirectory_AdministrationUserDirectoryContext__WEBPACK_IMPORTED_MODULE_4__.uA,args,react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,args)))))))))],parameters:{css:"api_main"}},Initial={args:(0,_DisplayUserDirectoryAdministration_test_data__WEBPACK_IMPORTED_MODULE_2__.Gs)(null,_DisplayUserDirectoryAdministration_test_data__WEBPACK_IMPORTED_MODULE_2__.rB[4].id)},__namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"{\n  args: defaultProps(null, mockUsers[4].id)\n}",...Initial.parameters?.docs?.source}}}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/DialogContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>DialogContextProvider,z9:()=>withDialog});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const DialogContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({dialogs:[],open:()=>{},close:()=>{}});class DialogContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{dialogs:[],open:(Dialog,DialogProps)=>{const dialogKey=(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)();return this.setState({dialogs:[...this.state.dialogs,{key:dialogKey,Dialog,DialogProps}]}),dialogKey},close:dialogKey=>this.setState({dialogs:this.state.dialogs.filter((dialog=>dialogKey!==dialog.key))}),closeAll:()=>this.setState({dialogs:[]})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Provider,{value:this.state},this.props.children)}}function withDialog(WrappedComponent){return class WithDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Consumer,null,(dialogContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{dialogContext,...this.props})))}}}DialogContextProvider.displayName="DialogContextProvider",DialogContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},DialogContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"}],displayName:"DialogContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/lib/Error/PassboltApiFetchError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class PassboltApiFetchError extends Error{constructor(message,data){super(message),this.name="PassboltApiFetchError",this.data=data||{}}}const __WEBPACK_DEFAULT_EXPORT__=PassboltApiFetchError},"./src/shared/lib/Error/PassboltServiceUnavailableError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class PassboltServiceUnavailableError extends Error{constructor(message){super(message=message||"The service is unavailable"),this.name="PassboltServiceUnavailableError"}}const __WEBPACK_DEFAULT_EXPORT__=PassboltServiceUnavailableError},"./src/shared/lib/apiClient/apiClient.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>ApiClient});var PassboltApiFetchError=__webpack_require__("./src/shared/lib/Error/PassboltApiFetchError.js");class PassboltBadResponseError extends Error{constructor(){super("An internal error occurred. The server response could not be parsed. Please contact your administrator."),this.name="PassboltBadResponseError"}}const Error_PassboltBadResponseError=PassboltBadResponseError;var PassboltServiceUnavailableError=__webpack_require__("./src/shared/lib/Error/PassboltServiceUnavailableError.js");const SUPPORTED_METHODS=["GET","POST","PUT","DELETE"];class ApiClient{constructor(options){if(this.options=options,!this.options.getBaseUrl())throw new TypeError("ApiClient constructor error: baseUrl is required.");if(!this.options.getResourceName())throw new TypeError("ApiClient constructor error: resourceName is required.");try{let rawBaseUrl=this.options.getBaseUrl().toString();rawBaseUrl.endsWith("/")&&(rawBaseUrl=rawBaseUrl.slice(0,-1));let resourceName=this.options.getResourceName();resourceName.startsWith("/")&&(resourceName=resourceName.slice(1)),resourceName.endsWith("/")&&(resourceName=resourceName.slice(0,-1)),this.baseUrl=`${rawBaseUrl}/${resourceName}`,this.baseUrl=new URL(this.baseUrl)}catch(typeError){throw new TypeError("ApiClient constructor error: b.")}this.apiVersion="api-version=v2"}getDefaultHeaders(){return{Accept:"application/json","content-type":"application/json"}}async buildFetchOptions(){const optionHeaders=await this.options.getHeaders();return{credentials:"include",headers:{...this.getDefaultHeaders(),...optionHeaders}}}async get(id,urlOptions){this.assertValidId(id);const url=this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});return this.fetchAndHandleResponse("GET",url)}async delete(id,body,urlOptions,dryRun){let url;this.assertValidId(id),void 0===dryRun&&(dryRun=!1),url=dryRun?this.buildUrl(`${this.baseUrl}/${id}/dry-run`,urlOptions||{}):this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});let bodyString=null;return body&&(bodyString=this.buildBody(body)),this.fetchAndHandleResponse("DELETE",url,bodyString)}async findAll(urlOptions){const url=this.buildUrl(this.baseUrl.toString(),urlOptions||{});return this.fetchAndHandleResponse("GET",url)}async create(body,urlOptions){const url=this.buildUrl(this.baseUrl.toString(),urlOptions||{}),bodyString=this.buildBody(body);return this.fetchAndHandleResponse("POST",url,bodyString)}async update(id,body,urlOptions,dryRun){let url;this.assertValidId(id),void 0===dryRun&&(dryRun=!1),url=dryRun?this.buildUrl(`${this.baseUrl}/${id}/dry-run`,urlOptions||{}):this.buildUrl(`${this.baseUrl}/${id}`,urlOptions||{});let bodyString=null;return body&&(bodyString=this.buildBody(body)),this.fetchAndHandleResponse("PUT",url,bodyString)}async updateAll(body,urlOptions={}){const url=this.buildUrl(this.baseUrl.toString(),urlOptions),bodyString=body?this.buildBody(body):null;return this.fetchAndHandleResponse("PUT",url,bodyString)}assertValidId(id){if(!id)throw new TypeError("ApiClient.assertValidId error: id cannot be empty");if("string"!=typeof id)throw new TypeError("ApiClient.assertValidId error: id should be a string")}assertMethod(method){if("string"!=typeof method)throw new TypeError("ApiClient.assertValidMethod method should be a string.");if(SUPPORTED_METHODS.indexOf(method.toUpperCase())<0)throw new TypeError(`ApiClient.assertValidMethod error: method ${method} is not supported.`)}assertUrl(url){if(!url)throw new TypeError("ApliClient.assertUrl error: url is required.");if(!(url instanceof URL))throw new TypeError("ApliClient.assertUrl error: url should be a valid URL object.");if("https:"!==url.protocol&&"http:"!==url.protocol)throw new TypeError("ApliClient.assertUrl error: url protocol should only be https or http.")}assertBody(body){if(!(body instanceof FormData)&&"string"!=typeof body)throw new TypeError("ApiClient.assertBody error: body should be a string or a FormData.")}buildBody(body){return JSON.stringify(body)}buildUrl(url,urlOptions){if("string"!=typeof url)throw new TypeError("ApiClient.buildUrl error: url should be a string.");const urlObj=new URL(`${url}.json?${this.apiVersion}`);urlOptions=urlOptions||{};for(const[key,value]of Object.entries(urlOptions)){if("string"!=typeof key)throw new TypeError("ApiClient.buildUrl error: urlOptions key should be a string.");if("string"==typeof value)urlObj.searchParams.append(key,value);else{if(!Array.isArray(value))throw new TypeError("ApiClient.buildUrl error: urlOptions value should be a string or array.");value.forEach((v=>{urlObj.searchParams.append(key,v)}))}}return urlObj}async sendRequest(method,url,body,options){this.assertUrl(url),this.assertMethod(method),body&&this.assertBody(body);const fetchStrategy="undefined"!=typeof customApiClientFetch?customApiClientFetch:fetch,fetchOptions={...await this.buildFetchOptions(),...options};fetchOptions.method=method,body&&(fetchOptions.body=body);try{return await fetchStrategy(url.toString(),fetchOptions)}catch(error){throw console.error(error),navigator.onLine?new PassboltServiceUnavailableError.A("Unable to reach the server, an unexpected error occurred"):new PassboltServiceUnavailableError.A("Unable to reach the server, you are not connected to the network")}}async fetchAndHandleResponse(method,url,body,options){const response=await this.sendRequest(method,url,body,options);return this.parseResponseJson(response)}async parseResponseJson(response){let responseJson;try{responseJson=await response.json()}catch(error){throw console.debug(response.url.toString(),error),new Error_PassboltBadResponseError(error,response)}if(!response.ok){const message=responseJson.header.message;throw new PassboltApiFetchError.A(message,{code:response.status,body:responseJson.body})}return responseJson}}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);