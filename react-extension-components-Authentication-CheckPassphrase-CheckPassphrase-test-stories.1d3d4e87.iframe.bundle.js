/*! For license information please see react-extension-components-Authentication-CheckPassphrase-CheckPassphrase-test-stories.1d3d4e87.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4547],{"./src/react-extension/components/Authentication/CheckPassphrase/CheckPassphrase.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Recover:()=>Recover,Setup:()=>Setup,SetupWithRememberMe:()=>SetupWithRememberMe,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CheckPassphrase_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Password=__webpack_require__("./src/shared/components/Password/Password.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const CheckPassphrase_CheckPassphraseVariations_SETUP="Setup",CheckPassphrase_CheckPassphraseVariations_RECOVER="Recover";class CheckPassphrase extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.isPwndProcessingPromise=null,this.bindEventHandlers(),this.createReferences()}get defaultState(){return{passphrase:"",rememberMe:!1,isObfuscated:!0,actions:{processing:!1},hasBeenValidated:!1,errors:{emptyPassphrase:!1,invalidPassphrase:!1}}}get areActionsAllowed(){return!this.state.actions.processing}get isProcessing(){return this.state.actions.processing}get hasErrors(){return this.state.errors.emptyPassphrase||this.state.errors.invalidPassphrase}async componentDidMount(){this.focusOnPassphrase()}bindEventHandlers(){this.handleSubmit=this.handleSubmit.bind(this),this.handleChangePassphrase=this.handleChangePassphrase.bind(this),this.handleToggleRememberMe=this.handleToggleRememberMe.bind(this)}createReferences(){this.passphraseInputRef=react.createRef()}async handleSubmit(event){event.preventDefault();this.validate().emptyPassphrase?this.focusOnPassphrase():(this.toggleProcessing(),await this.check())}handleChangePassphrase(event){const newState={passphrase:event.target.value,errors:{emptyPassphrase:!1,invalidPassphrase:!1}};this.setState(newState)}handleToggleRememberMe(){this.toggleRemmemberMe()}async check(){await this.props.onComplete(this.state.passphrase,this.state.rememberMe).catch(this.onCheckFailure.bind(this))}onCheckFailure(error){if(this.toggleProcessing(),"InvalidMasterPasswordError"!==error.name)throw error;this.setState({errors:{...this.state.errors,invalidPassphrase:!0}}),this.focusOnPassphrase()}toggleRemmemberMe(){this.setState({rememberMe:!this.state.rememberMe})}validate(){const{passphrase}=this.state,errors={...this.state.errors,emptyPassphrase:""===passphrase.trim()};return this.setState({hasBeenValidated:!0,errors}),errors}toggleProcessing(){this.setState({actions:{processing:!this.state.actions.processing}})}focusOnPassphrase(){this.passphraseInputRef.current.focus()}render(){const processingClassName=this.isProcessing?"processing":"";return react.createElement("div",{className:"check-passphrase"},react.createElement("h1",null,react.createElement(es.x6,null,"Please enter your passphrase to continue.")),react.createElement("form",{acceptCharset:"utf-8",onSubmit:this.handleSubmit,className:"enter-passphrase"},react.createElement("div",{className:"form-content"},react.createElement("div",{className:`input-password-wrapper input required ${this.hasErrors?"error":""} ${this.areActionsAllowed?"":"disabled"}`},react.createElement("label",{htmlFor:"passphrase"},react.createElement(es.x6,null,"Passphrase")),react.createElement(Password.A,{id:"passphrase",autoComplete:"off",inputRef:this.passphraseInputRef,name:"passphrase",value:this.state.passphrase,preview:!0,onChange:this.handleChangePassphrase,disabled:!this.areActionsAllowed}),this.state.hasBeenValidated&&react.createElement(react.Fragment,null,this.state.errors.emptyPassphrase&&react.createElement("div",{className:"empty-passphrase error-message"},react.createElement(es.x6,null,"The passphrase should not be empty.")),!this.state.errors.emptyPassphrase&&this.state.errors.invalidPassphrase&&react.createElement("div",{className:"invalid-passphrase error-message"},react.createElement(es.x6,null,"The passphrase is invalid.")))),this.props.canRememberMe&&react.createElement("div",{className:"input checkbox"},react.createElement("input",{id:"remember-me",type:"checkbox",name:"remember-me",value:this.state.rememberMe,onChange:this.handleToggleRememberMe,disabled:!this.areActionsAllowed}),react.createElement("label",{htmlFor:"remember-me"},react.createElement(es.x6,null,"Remember until signed out.")))),react.createElement("div",{className:"form-actions"},react.createElement("button",{type:"submit",className:`button primary big full-width ${processingClassName}`,disabled:this.isProcessing},react.createElement(es.x6,null,"Verify")),this.props.onSecondaryActionClick&&react.createElement("button",{type:"button",className:"link",onClick:this.props.onSecondaryActionClick},{[CheckPassphrase_CheckPassphraseVariations_SETUP]:react.createElement(es.x6,null,"I lost my passphrase, generate a new private key."),[CheckPassphrase_CheckPassphraseVariations_RECOVER]:react.createElement(es.x6,null,"Help, I lost my passphrase.")}[this.props.displayAs]))))}}CheckPassphrase.defaultProps={displayAs:CheckPassphrase_CheckPassphraseVariations_SETUP},CheckPassphrase.propTypes={context:prop_types_default().any,userPassphrasePolicies:prop_types_default().object.isRequired,onComplete:prop_types_default().func.isRequired,displayAs:prop_types_default().PropTypes.oneOf([CheckPassphrase_CheckPassphraseVariations_SETUP,CheckPassphrase_CheckPassphraseVariations_RECOVER]),canRememberMe:prop_types_default().bool,onSecondaryActionClick:prop_types_default().func};const CheckPassphrase_CheckPassphrase=(0,AppContext.L)((0,es.CI)("common")(CheckPassphrase));CheckPassphrase.__docgenInfo={description:"This component checks the passphrase of an user gpg key",methods:[{name:"defaultState",docblock:"Returns the default state",modifiers:["get"],params:[],returns:null,description:"Returns the default state"},{name:"areActionsAllowed",docblock:"Returns true if the user can perform actions on the component",modifiers:["get"],params:[],returns:null,description:"Returns true if the user can perform actions on the component"},{name:"isProcessing",docblock:"Returns true if the component must be in a processing mode",modifiers:["get"],params:[],returns:null,description:"Returns true if the component must be in a processing mode"},{name:"hasErrors",docblock:"Return true if there are errors",modifiers:["get"],params:[],returns:null,description:"Return true if there are errors"},{name:"bindEventHandlers",docblock:"Handle component event handlers",modifiers:[],params:[],returns:null,description:"Handle component event handlers"},{name:"createReferences",docblock:"Creates the references",modifiers:[],params:[],returns:null,description:"Creates the references"},{name:"handleSubmit",docblock:"Whenever the users submits his passphrase\n@param event Dom event",modifiers:["async"],params:[{name:"event",description:"Dom event",optional:!1}],returns:null,description:"Whenever the users submits his passphrase"},{name:"handleChangePassphrase",docblock:"Whenever the user changes the private key\n@param event An input event",modifiers:[],params:[{name:"event",description:"An input event",optional:!1}],returns:null,description:"Whenever the user changes the private key"},{name:"handleToggleRememberMe",docblock:"Whenever the user toggles the remember me flag",modifiers:[],params:[],returns:null,description:"Whenever the user toggles the remember me flag"},{name:"check",docblock:"Check the private gpg key passphrase",modifiers:["async"],params:[],returns:null,description:"Check the private gpg key passphrase"},{name:"onCheckFailure",docblock:"Whenever the gpg key import failed\n@param {Error} error The error\n@throw {Error} If an unexpected errors hits the component. Errors not of type: InvalidMasterPasswordError.",modifiers:[],params:[{name:"error",description:"The error",type:{name:"Error"},optional:!1}],returns:null,description:"Whenever the gpg key import failed"},{name:"toggleRemmemberMe",docblock:"Toggle the remember me flag value",modifiers:[],params:[],returns:null,description:"Toggle the remember me flag value"},{name:"validate",docblock:"Validate the security token data",modifiers:[],params:[],returns:null,description:"Validate the security token data"},{name:"toggleProcessing",docblock:"Toggle the processing mode",modifiers:[],params:[],returns:null,description:"Toggle the processing mode"},{name:"focusOnPassphrase",docblock:"Put the focus on the passphrase input",modifiers:[],params:[],returns:null,description:"Put the focus on the passphrase input"}],displayName:"CheckPassphrase",props:{displayAs:{defaultValue:{value:"'Setup'",computed:!1},description:"",type:{name:"enum",value:[{value:"'Setup'",computed:!1},{value:"'Recover'",computed:!1}]},required:!1},context:{description:"",type:{name:"any"},required:!1},userPassphrasePolicies:{description:"",type:{name:"object"},required:!0},onComplete:{description:"",type:{name:"func"},required:!0},canRememberMe:{description:"",type:{name:"bool"},required:!1},onSecondaryActionClick:{description:"",type:{name:"func"},required:!1}}};var ApiAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ApiAppContext.test.data.js"),UserPassphrasePoliciesDto_test_data=__webpack_require__("./src/shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data.js");const defaultProps=(props={})=>{const defaultProps={context:(0,ApiAppContext_test_data.s)(),displayAs:CheckPassphrase_CheckPassphraseVariations_SETUP,canRememberMe:!1,onComplete:jest.fn((()=>Promise.resolve())),onSecondaryActionClick:jest.fn((()=>Promise.resolve())),userPassphrasePolicies:(0,UserPassphrasePoliciesDto_test_data.Vg)()};return Object.assign(defaultProps,props||{})},CheckPassphrase_test_stories={title:"Components/Authentication/CheckPassphrase",component:CheckPassphrase_CheckPassphrase},Template=args=>react.createElement("div",{id:"container",className:"container page login"},react.createElement("div",{className:"content"},react.createElement("div",{className:"login-form"},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(CheckPassphrase_CheckPassphrase,{...args,...routerProps})}))))),defaultParameters={css:"ext_authentication"},Setup=Template.bind({});Setup.args=defaultProps(),Setup.parameters=defaultParameters;const SetupWithRememberMe=Template.bind({});SetupWithRememberMe.args=defaultProps({canRememberMe:!0}),SetupWithRememberMe.parameters=defaultParameters;const Recover=Template.bind({});Recover.args=defaultProps({displayAs:CheckPassphrase_CheckPassphraseVariations_RECOVER}),Recover.parameters=defaultParameters;const __namedExportsOrder=["Setup","SetupWithRememberMe","Recover"];Setup.parameters={...Setup.parameters,docs:{...Setup.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <CheckPassphrase {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Setup.parameters?.docs?.source}}},SetupWithRememberMe.parameters={...SetupWithRememberMe.parameters,docs:{...SetupWithRememberMe.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <CheckPassphrase {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...SetupWithRememberMe.parameters?.docs?.source}}},Recover.parameters={...Recover.parameters,docs:{...Recover.parameters?.docs,source:{originalSource:'args => <div id="container" className="container page login">\n    <div className="content">\n      <div className="login-form">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <CheckPassphrase {...args} {...routerProps} />} />\n        </MemoryRouter>\n      </div>\n    </div>\n  </div>',...Recover.parameters?.docs?.source}}}},"./src/shared/components/Password/Password.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class Password extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{viewPassword:!1,hasPassphraseFocus:!1}}bindCallbacks(){this.handleInputChange=this.handleInputChange.bind(this),this.handlePasswordInputFocus=this.handlePasswordInputFocus.bind(this),this.handlePasswordInputBlur=this.handlePasswordInputBlur.bind(this),this.handleViewPasswordButtonClick=this.handleViewPasswordButtonClick.bind(this)}handleInputChange(event){this.props.onChange&&this.props.onChange(event)}handlePasswordInputFocus(){this.setState({hasPassphraseFocus:!0})}handlePasswordInputBlur(){this.setState({hasPassphraseFocus:!1})}handleViewPasswordButtonClick(){this.props.disabled||this.setState({viewPassword:!this.state.viewPassword})}get securityTokenStyle(){const inverseStyle={background:this.props.securityToken.textColor,color:this.props.securityToken.backgroundColor},fullStyle={background:this.props.securityToken.backgroundColor,color:this.props.securityToken.textColor};return this.state.hasPassphraseFocus?inverseStyle:fullStyle}get passphraseInputStyle(){const fullStyle={background:this.props.securityToken.backgroundColor,color:this.props.securityToken.textColor,"--passphrase-placeholder-color":this.props.securityToken.textColor};return this.state.hasPassphraseFocus?fullStyle:undefined}get previewStyle(){const fullStyle={"--icon-color":this.props.securityToken.textColor,"--icon-background-color":this.props.securityToken.backgroundColor};return this.state.hasPassphraseFocus?fullStyle:void 0}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input password ${this.props.disabled?"disabled":""} ${this.state.hasPassphraseFocus?"":"no-focus"} ${this.props.securityToken?"security":""}`,style:this.props.securityToken?this.passphraseInputStyle:void 0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:this.props.id,name:this.props.name,maxLength:"4096",placeholder:this.props.placeholder,type:this.state.viewPassword&&!this.props.disabled?"text":"password",onKeyUp:this.props.onKeyUp,value:this.props.value,onFocus:this.handlePasswordInputFocus,onBlur:this.handlePasswordInputBlur,onChange:this.handleInputChange,disabled:this.props.disabled,readOnly:this.props.readOnly,autoComplete:this.props.autoComplete,"aria-required":!0,ref:this.props.inputRef}),this.props.preview&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"password-view-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handleViewPasswordButtonClick,style:this.props.securityToken?this.previewStyle:void 0,className:"password-view infield button-transparent "+(this.props.disabled?"disabled":"")},!this.state.viewPassword&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"eye-open"}),this.state.viewPassword&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"eye-close"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visually-hidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"View")))),this.props.securityToken&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"security-token-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"security-token",style:this.securityTokenStyle},this.props.securityToken.code)))}}Password.defaultProps={id:"",name:"",autoComplete:"off"},Password.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any,id:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,name:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,placeholder:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,autoComplete:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,inputRef:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,readOnly:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,preview:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,onChange:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,onKeyUp:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,securityToken:prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({code:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,backgroundColor:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,textColor:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string})};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(Password);Password.__docgenInfo={description:"This component represent a password input field with some additional properties",methods:[{name:"defaultState",docblock:null,modifiers:["get"],params:[],returns:null},{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handlePasswordInputFocus",docblock:"Whenever the user focus on the password input",modifiers:[],params:[],returns:null,description:"Whenever the user focus on the password input"},{name:"handlePasswordInputBlur",docblock:"Whenever the user blurs on the password input",modifiers:[],params:[],returns:null,description:"Whenever the user blurs on the password input"},{name:"handleViewPasswordButtonClick",docblock:"Handle view password button click.",modifiers:[],params:[],returns:null,description:"Handle view password button click."},{name:"securityTokenStyle",docblock:"Returns the style of the security token (color and text color)",modifiers:["get"],params:[],returns:null,description:"Returns the style of the security token (color and text color)"},{name:"passphraseInputStyle",docblock:"Get the passphrase input style.\n@return {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get the passphrase input style."},{name:"previewStyle",docblock:"Returns the style of preview (icon color and icon background color)",modifiers:["get"],params:[],returns:null,description:"Returns the style of preview (icon color and icon background color)"}],displayName:"Password",props:{id:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},name:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},autoComplete:{defaultValue:{value:'"off"',computed:!1},description:"",type:{name:"string"},required:!1},context:{description:"",type:{name:"any"},required:!1},value:{description:"",type:{name:"string"},required:!1},placeholder:{description:"",type:{name:"string"},required:!1},inputRef:{description:"",type:{name:"object"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},readOnly:{description:"",type:{name:"bool"},required:!1},preview:{description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!1},onKeyUp:{description:"",type:{name:"func"},required:!1},securityToken:{description:"",type:{name:"shape",value:{code:{name:"string",required:!1},backgroundColor:{name:"string",required:!1},textColor:{name:"string",required:!1}}},required:!1}}}},"./src/shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Vg:()=>defaultUserPassphrasePoliciesEntityDto});const defaultUserPassphrasePoliciesEntityDto=(data={})=>Object.assign({external_dictionary_check:!0,entropy_minimum:112},data)},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);