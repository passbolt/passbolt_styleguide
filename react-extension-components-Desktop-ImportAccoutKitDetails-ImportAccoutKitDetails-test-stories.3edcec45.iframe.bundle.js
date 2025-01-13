/*! For license information please see react-extension-components-Desktop-ImportAccoutKitDetails-ImportAccoutKitDetails-test-stories.3edcec45.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4501],{"./src/react-extension/components/Desktop/ImportAccoutKitDetails/ImportAccoutKitDetails.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ImportAccoutKitDetails_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),ImportAccountKitContext=__webpack_require__("./src/react-extension/contexts/Desktop/ImportAccountKitContext.js"),Password=__webpack_require__("./src/shared/components/Password/Password.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),UserAvatar=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js");class ImportAccoutKitDetails extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.bindEventHandlers(),this.createReferences()}get defaultState(){return{passphrase:"",hasBeenValidated:!1,errors:{emptyPassphrase:!1,invalidGpgKey:!1,invalidPassphrase:!1}}}createReferences(){this.passphraseInputRef=react.createRef()}bindEventHandlers(){this.handleConfirmation=this.handleConfirmation.bind(this),this.handleChangePassphrase=this.handleChangePassphrase.bind(this),this.importAnotherAccount=this.importAnotherAccount.bind(this)}async handleConfirmation(){try{this.validate(),this.state.passphrase.length>0&&await this.props.importAccountKitContext.verifyPassphrase(this.state.passphrase)}catch(error){console.error(error),this.onCheckPassphraseFailure(error)}}get fullname(){return`${this.props.importAccountKitContext.accountKit?.first_name} ${this.props.importAccountKitContext.accountKit?.last_name}`}handleChangePassphrase(event){const passphrase=event.target.value;this.setState({passphrase}),this.state.hasBeenValidated&&this.validate()}get securityToken(){return{code:this.props.importAccountKitContext.accountKit?.security_token.code,backgroundColor:this.props.importAccountKitContext.accountKit?.security_token.color,textColor:this.props.importAccountKitContext.accountKit?.security_token.textcolor}}get areActionsAllowed(){return!this.props.importAccountKitContext.isProcessing()}validate(){const{passphrase}=this.state,errors={emptyPassphrase:""===passphrase.trim(),invalidPassphrase:!1,invalidGpgKey:!1};this.setState({hasBeenValidated:!0,errors})}onCheckPassphraseFailure(error){if("InvalidMasterPasswordError"===error.name)this.setState({errors:{invalidPassphrase:!0}});else{if("GpgKeyError"!==error.name)throw error;this.setState({errors:{invalidGpgKey:!0}})}}importAnotherAccount(){this.props.importAccountKitContext.flushAccountKit(),this.props.importAccountKitContext.navigate(ImportAccountKitContext.S3.IMPORT_ACCOUNT_KIT)}render(){return react.createElement("div",{className:"import-account-kit-details"},react.createElement("div",{className:"user"},react.createElement(UserAvatar.A,{user:this.props.importAccountKitContext.accountKit,baseUrl:this.props.importAccountKitContext.accountKit?.domain,className:"big avatar user-avatar"}),react.createElement("p",{className:"user-name"},this.fullname),react.createElement("p",{className:"user-email"},this.props.importAccountKitContext.accountKit?.username),react.createElement("p",{className:"user-domain"},this.props.importAccountKitContext.accountKit?.domain)),react.createElement("div",{className:"input-password-wrapper input required"},react.createElement("label",{htmlFor:"passphrase"},react.createElement(es.x6,null,"Passphrase")),react.createElement(Password.A,{id:"passphrase-input",autoComplete:"off",value:this.state.passphrase,preview:!0,securityToken:this.securityToken,onChange:this.handleChangePassphrase,disabled:!this.areActionsAllowed}),this.state.hasBeenValidated&&react.createElement(react.Fragment,null,this.state.errors.emptyPassphrase&&react.createElement("div",{className:"empty-passphrase error-message"},react.createElement(es.x6,null,"The passphrase should not be empty.")),this.state.errors.invalidPassphrase&&react.createElement("div",{className:"invalid-passphrase error-message"},react.createElement(es.x6,null,"The passphrase is invalid.")),this.state.errors.invalidGpgKey&&react.createElement("div",{className:"invalid-gpg-key error-message"},react.createElement(es.x6,null,"The private key is invalid.")))),react.createElement("div",{className:"form-actions"},react.createElement("button",{type:"button",onClick:this.handleConfirmation,className:"button primary big full-width"},react.createElement(es.x6,null,"Next")),react.createElement("button",{type:"button",className:"link",onClick:this.importAnotherAccount},react.createElement(es.x6,null,"Import another account"))))}}ImportAccoutKitDetails.propTypes={context:prop_types_default().any,t:prop_types_default().func,importAccountKitContext:prop_types_default().any.isRequired};const ImportAccoutKitDetails_ImportAccoutKitDetails=(0,AppContext.L)((0,ImportAccountKitContext.a0)((0,es.CI)("common")(ImportAccoutKitDetails)));ImportAccoutKitDetails.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Returns the default state",modifiers:["get"],params:[],returns:null,description:"Returns the default state"},{name:"createReferences",docblock:"Creates the references",modifiers:[],params:[],returns:null,description:"Creates the references"},{name:"bindEventHandlers",docblock:"Bind event handlers\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind event handlers"},{name:"handleConfirmation",docblock:"Handle confirmation button click.\n@returns {void}",modifiers:["async"],params:[],returns:{type:{name:"void"}},description:"Handle confirmation button click."},{name:"fullname",docblock:"Returns the user full name",modifiers:["get"],params:[],returns:null,description:"Returns the user full name"},{name:"handleChangePassphrase",docblock:"Whenever the user changes the private key\n@param event An input event",modifiers:[],params:[{name:"event",description:"An input event",optional:!1}],returns:null,description:"Whenever the user changes the private key"},{name:"securityToken",docblock:"Get the security token\n@returns {{backgroundColor, code, textColor}}",modifiers:["get"],params:[],returns:{},description:"Get the security token"},{name:"areActionsAllowed",docblock:"Returns true if the user can perform actions on the component",modifiers:["get"],params:[],returns:null,description:"Returns true if the user can perform actions on the component"},{name:"validate",docblock:"Validate the security token data",modifiers:[],params:[],returns:null,description:"Validate the security token data"},{name:"onCheckPassphraseFailure",docblock:"Whenever the passphrase check failed\n@param {Error} error The error\n@throw {Error} If an unexpected errors hits the component. Errors not of type: InvalidMasterPasswordError, GpgKeyError.",modifiers:[],params:[{name:"error",description:"The error",type:{name:"Error"},optional:!1}],returns:null,description:"Whenever the passphrase check failed"},{name:"importAnotherAccount",docblock:"Redirect to the importation screen\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Redirect to the importation screen"}],displayName:"ImportAccoutKitDetails",props:{context:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1},importAccountKitContext:{description:"",type:{name:"any"},required:!0}}};var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");const defaultAccountKit=(data={})=>{const defaultData={domain:"https://passbolt.local",user_id:(0,v4.A)(),username:"ada@passbolt.dev",first_name:"Ada",last_name:"Lovelace",user_public_armored_key:"",user_private_armored_key:"",server_public_armored_key:"",security_token:defaultSecurityTokenDto(data?.security_token)};return delete data?.securityToken,Object.assign(defaultData,data)},defaultSecurityTokenDto=(data={})=>Object.assign({code:"HGA",color:"#8bc34a",textcolor:"#000000"},data);function defaultImportAccountKitContext(context={}){return{state:null,unexpectedError:null,navigate:jest.fn(),isProcessing:jest.fn(),setProcessing:jest.fn(),clearContext:jest.fn(),verifyAccountKit:jest.fn(),verifyPassphrase:jest.fn(),flushAccountKit:jest.fn(),...context}}const ImportAccoutKitDetails_test_stories={title:"Components/Desktop/ImportAccoutKitDetails",component:ImportAccoutKitDetails_ImportAccoutKitDetails},Template=args=>react.createElement("div",{id:"container",className:"container page login"},react.createElement("div",{className:"content"},react.createElement("div",{className:"login-form"},react.createElement(ImportAccountKitContext.iM.Provider,{value:args.importAccountKitContext},react.createElement(ImportAccoutKitDetails_ImportAccoutKitDetails,args)))));Template.propTypes={context:prop_types_default().object};const Default=Template.bind({});Default.parameters={css:"ext_authentication"},Default.args=function defaultContextProps(props={}){return function defaultProps(data={}){const defaultProps1={context:{port:new MockPort.A}};return Object.assign(defaultProps1,data)}({importAccountKitContext:defaultImportAccountKitContext({accountKit:defaultAccountKit()}),...props})}();const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <ImportAccountKitContext.Provider value={args.importAccountKitContext}>\n          <ImportAccoutKitDetails {...args} />\n        </ImportAccountKitContext.Provider>\n      </div>\n    </div>\n  </div>',...Default.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Avatar/UserAvatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");const DEFAULT_AVATAR_URL_REGEXP=/img\/avatar\/user(_medium)?\.png$/;class UserAvatar extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.bindCallbacks()}getDefaultState(){return{error:!1}}bindCallbacks(){this.handleError=this.handleError.bind(this)}get avatarUrl(){return this.props?.user?.profile?.avatar?.url?.medium}propsHasUrl(){return Boolean(this.avatarUrl)}propsUrlHasProtocol(){return this.avatarUrl.startsWith("https://")||this.avatarUrl.startsWith("http://")}formatUrl(url){return`${this.props.baseUrl}/${url}`}isDefaultAvatarUrlFromApi(){return DEFAULT_AVATAR_URL_REGEXP.test(this.avatarUrl)}getAvatarSrc(){return this.propsHasUrl()?this.propsUrlHasProtocol()?this.avatarUrl:this.formatUrl(this.avatarUrl):null}handleError(){console.error(`Could not load avatar image url: ${this.getAvatarSrc()}`),this.setState({error:!0})}getAltText(){const user=this.props?.user;return user?.first_name&&user?.last_name?this.props.t("Avatar of user {{first_name}} {{last_name}}.",{firstname:user.first_name,lastname:user.last_name}):"..."}render(){const srcAvatar=this.getAvatarSrc(),shouldDisplayDefaultAvatar=this.state.error||this.isDefaultAvatarUrlFromApi()||!srcAvatar;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`${this.props.className} ${this.props.attentionRequired?"attention-required":""}`},shouldDisplayDefaultAvatar&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 42 42","aria-labelledby":"svg-title"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",{id:"svg-title"},this.getAltText()),react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{fill:"#939598",cx:"21",cy:"21",r:"21"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"#ffffff",d:"m21,23.04c-4.14,0-7.51-3.37-7.51-7.51s3.37-7.51,7.51-7.51,7.51,3.37,7.51,7.51-3.37,7.51-7.51,7.51Z"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"#ffffff",d:"m27.17,26.53h-12.33c-2.01,0-3.89.78-5.31,2.2-1.42,1.42-2.2,3.3-2.2,5.31v1.15c3.55,3.42,8.36,5.53,13.67,5.53s10.13-2.11,13.67-5.53v-1.15c0-2.01-.78-3.89-2.2-5.31-1.42-1.42-3.3-2.2-5.31-2.2Z"})),!shouldDisplayDefaultAvatar&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:srcAvatar,onError:this.handleError,alt:this.getAltText()}),this.props.attentionRequired&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"exclamation"}))}}UserAvatar.defaultProps={className:"avatar user-avatar"},UserAvatar.propTypes={baseUrl:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,user:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,attentionRequired:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,className:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,t:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(UserAvatar);UserAvatar.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Get default state\n@returns {*}",modifiers:[],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"avatarUrl",docblock:"Returns the current avatar URL from the props\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Returns the current avatar URL from the props"},{name:"propsHasUrl",docblock:"Return true if the user from props contains a valid profile with avatar url properties\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Return true if the user from props contains a valid profile with avatar url properties"},{name:"propsUrlHasProtocol",docblock:"Check if the url has a protocol like http or https?\n@todo only check https for now\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the url has a protocol like http or https?"},{name:"formatUrl",docblock:"Format the avatar url to point on the site url.\n@param {string} url The relative url\n@returns {string}",modifiers:[],params:[{name:"url",description:"The relative url",type:{name:"string"},optional:!1}],returns:{type:{name:"string"}},description:"Format the avatar url to point on the site url."},{name:"isDefaultAvatarUrlFromApi",docblock:"Returns true if the given URL matches a default avatar from the API\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the given URL matches a default avatar from the API"},{name:"getAvatarSrc",docblock:"Get the user avatar url. If the user has no avatar defined, return the default one.\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the user avatar url. If the user has no avatar defined, return the default one."},{name:"handleError",docblock:"Handle error while loading the user avatar image.\nBy instance when the image is not present on the server.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle error while loading the user avatar image.\nBy instance when the image is not present on the server."},{name:"getAltText",docblock:"Get the user avatar image alternative text.\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the user avatar image alternative text."}],displayName:"UserAvatar",props:{className:{defaultValue:{value:'"avatar user-avatar"',computed:!1},description:"",type:{name:"string"},required:!1},baseUrl:{description:"",type:{name:"string"},required:!1},user:{description:"",type:{name:"object"},required:!1},attentionRequired:{description:"",type:{name:"bool"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/Desktop/ImportAccountKitContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S3:()=>ImportAccountKitWorkflowStates,a0:()=>withImportAccountKitContext,iM:()=>ImportAccountKitContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const ImportAccountKitWorkflowStates={GET_STARTED:"Get started",IMPORT_ACCOUNT_KIT:"Import account kit",VERIFY_PASSPHRASE:"Verify user passphrase",IMPORTING_ACCOUNT:"Importing account",SIGNING_IN:"Sign in",UNEXPECTED_ERROR_STATE:"Unexpected error state"},ImportAccountKitContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({accountKit:null,state:null,unexpectedError:null,navigate:()=>{},isProcessing:()=>{},setProcessing:()=>{},verifyAccountKit:()=>{},importAccountAndConnect:()=>{},flushAccountKit:()=>{}});class ImportAccountKitContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{accountKit:null,state:ImportAccountKitWorkflowStates.GET_STARTED,processing:!1,unexpectedError:null,isProcessing:this.isProcessing.bind(this),setProcessing:this.setProcessing.bind(this),navigate:this.navigate.bind(this),verifyAccountKit:this.verifyAccountKit.bind(this),verifyPassphrase:this.verifyPassphrase.bind(this),flushAccountKit:this.flushAccountKit.bind(this)}}isProcessing(){return this.state.processing}setProcessing(processing){this.setState({processing})}flushAccountKit(){this.setState({accountKit:null})}navigate(state){this.setState({state})}async verifyAccountKit(accountKit){try{this.setProcessing(!0);const accountKitValidated=await this.props.context.port.request("passbolt.background.verify-account-kit",accountKit);return this.setState({state:ImportAccountKitWorkflowStates.VERIFY_PASSPHRASE,accountKit:accountKitValidated})}catch(error){return console.error(error),this.setState({unexpectedError:error,state:ImportAccountKitWorkflowStates.UNEXPECTED_ERROR_STATE})}finally{this.setProcessing(!1)}}async verifyPassphrase(passphrase){try{await this.props.context.port.request("passbolt.auth-import.verify-passphrase",passphrase),this.navigate(ImportAccountKitWorkflowStates.IMPORTING_ACCOUNT),await this.importAccountAndConnect(passphrase)}catch(error){throw console.error(error),error}finally{this.setProcessing(!1)}}async importAccountAndConnect(passphrase){try{this.flushAccountKit(),await this.props.context.port.request("passbolt.auth-import.import-account"),this.navigate(ImportAccountKitWorkflowStates.SIGNING_IN),await this.props.context.port.request("passbolt.auth.login",passphrase)}catch(error){return console.error(error),this.setState({unexpectedError:error,state:ImportAccountKitWorkflowStates.UNEXPECTED_ERROR_STATE})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImportAccountKitContext.Provider,{value:this.state},this.props.children)}}ImportAccountKitContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any};(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)(ImportAccountKitContextProvider);function withImportAccountKitContext(WrappedComponent){return class WithImportAccountKitContext extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImportAccountKitContext.Consumer,null,(importAccountKitContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{importAccountKitContext,...this.props})))}}}ImportAccountKitContextProvider.__docgenInfo={description:"The account kit context provider.\nHandle the business logic of the account kit importation and the manage the workflow.",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"isProcessing",docblock:"Returns true when the data is under processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true when the data is under processing"},{name:"setProcessing",docblock:"Handle processing change.\n@params {Boolean} processing value\n@returns {void}",modifiers:[],params:[{name:"processing",optional:!1}],returns:{type:{name:"void"}},description:"Handle processing change."},{name:"flushAccountKit",docblock:"Flush the account kit\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Flush the account kit"},{name:"navigate",docblock:"Handle processing change.\n@params {Boolean} processing value\n@returns {void}",modifiers:[],params:[{name:"state",optional:!1}],returns:{type:{name:"void"}},description:"Handle processing change."},{name:"verifyAccountKit",docblock:"When the user upload its account we request to the Background webview to verify it.\n@param   {object} the account kit to upload.\n@returns {Promise<void>}",modifiers:["async"],params:[{name:"accountKit",optional:!1}],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"When the user upload its account we request to the Background webview to verify it."},{name:"verifyPassphrase",docblock:"When the user request to verify passphrase to the Background webview to verify it.\n@param   {string} passphrase the passphrase to verify.\n@returns {Promise<void>}",modifiers:["async"],params:[{name:"passphrase",description:"the passphrase to verify.",type:{name:"string"},optional:!1}],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"When the user request to verify passphrase to the Background webview to verify it."},{name:"importAccountAndConnect",docblock:"When the user has validated the passphrase we request to import and sign the user\n@param   {string} passphrase the user's private key passphrase.\n@returns {Promise<void>}",modifiers:["async"],params:[{name:"passphrase",description:"the user's private key passphrase.",type:{name:"string"},optional:!1}],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"When the user has validated the passphrase we request to import and sign the user"}],displayName:"ImportAccountKitContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/shared/components/Password/Password.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class Password extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{viewPassword:!1,hasPassphraseFocus:!1}}bindCallbacks(){this.handleInputChange=this.handleInputChange.bind(this),this.handlePasswordInputFocus=this.handlePasswordInputFocus.bind(this),this.handlePasswordInputBlur=this.handlePasswordInputBlur.bind(this),this.handleViewPasswordButtonClick=this.handleViewPasswordButtonClick.bind(this)}handleInputChange(event){this.props.onChange&&this.props.onChange(event)}handlePasswordInputFocus(){this.setState({hasPassphraseFocus:!0})}handlePasswordInputBlur(){this.setState({hasPassphraseFocus:!1})}handleViewPasswordButtonClick(){this.props.disabled||this.setState({viewPassword:!this.state.viewPassword})}get securityTokenStyle(){const inverseStyle={background:this.props.securityToken.textColor,color:this.props.securityToken.backgroundColor},fullStyle={background:this.props.securityToken.backgroundColor,color:this.props.securityToken.textColor};return this.state.hasPassphraseFocus?inverseStyle:fullStyle}get passphraseInputStyle(){const fullStyle={background:this.props.securityToken.backgroundColor,color:this.props.securityToken.textColor,"--passphrase-placeholder-color":this.props.securityToken.textColor};return this.state.hasPassphraseFocus?fullStyle:undefined}get previewStyle(){const fullStyle={"--icon-color":this.props.securityToken.textColor,"--icon-background-color":this.props.securityToken.backgroundColor};return this.state.hasPassphraseFocus?fullStyle:void 0}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input password ${this.props.disabled?"disabled":""} ${this.state.hasPassphraseFocus?"":"no-focus"} ${this.props.securityToken?"security":""}`,style:this.props.securityToken?this.passphraseInputStyle:void 0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:this.props.id,name:this.props.name,maxLength:"4096",placeholder:this.props.placeholder,type:this.state.viewPassword&&!this.props.disabled?"text":"password",onKeyUp:this.props.onKeyUp,value:this.props.value,onFocus:this.handlePasswordInputFocus,onBlur:this.handlePasswordInputBlur,onChange:this.handleInputChange,disabled:this.props.disabled,readOnly:this.props.readOnly,autoComplete:this.props.autoComplete,"aria-required":!0,ref:this.props.inputRef}),this.props.preview&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"password-view-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handleViewPasswordButtonClick,style:this.props.securityToken?this.previewStyle:void 0,className:"password-view infield button-transparent "+(this.props.disabled?"disabled":"")},!this.state.viewPassword&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"eye-open"}),this.state.viewPassword&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"eye-close"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visually-hidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"View")))),this.props.securityToken&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"security-token-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"security-token",style:this.securityTokenStyle},this.props.securityToken.code)))}}Password.defaultProps={id:"",name:"",autoComplete:"off"},Password.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any,id:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,placeholder:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,autoComplete:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,inputRef:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,preview:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,onChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,onKeyUp:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,securityToken:prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({code:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,backgroundColor:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,textColor:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string})};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(Password);Password.__docgenInfo={description:"This component represent a password input field with some additional properties",methods:[{name:"defaultState",docblock:null,modifiers:["get"],params:[],returns:null},{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handlePasswordInputFocus",docblock:"Whenever the user focus on the password input",modifiers:[],params:[],returns:null,description:"Whenever the user focus on the password input"},{name:"handlePasswordInputBlur",docblock:"Whenever the user blurs on the password input",modifiers:[],params:[],returns:null,description:"Whenever the user blurs on the password input"},{name:"handleViewPasswordButtonClick",docblock:"Handle view password button click.",modifiers:[],params:[],returns:null,description:"Handle view password button click."},{name:"securityTokenStyle",docblock:"Returns the style of the security token (color and text color)",modifiers:["get"],params:[],returns:null,description:"Returns the style of the security token (color and text color)"},{name:"passphraseInputStyle",docblock:"Get the passphrase input style.\n@return {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get the passphrase input style."},{name:"previewStyle",docblock:"Returns the style of preview (icon color and icon background color)",modifiers:["get"],params:[],returns:null,description:"Returns the style of preview (icon color and icon background color)"}],displayName:"Password",props:{id:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},name:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},autoComplete:{defaultValue:{value:'"off"',computed:!1},description:"",type:{name:"string"},required:!1},context:{description:"",type:{name:"any"},required:!1},value:{description:"",type:{name:"string"},required:!1},placeholder:{description:"",type:{name:"string"},required:!1},inputRef:{description:"",type:{name:"object"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},readOnly:{description:"",type:{name:"bool"},required:!1},preview:{description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!1},onKeyUp:{description:"",type:{name:"func"},required:!1},securityToken:{description:"",type:{name:"shape",value:{code:{name:"string",required:!1},backgroundColor:{name:"string",required:!1},textColor:{name:"string",required:!1}}},required:!1}}}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);