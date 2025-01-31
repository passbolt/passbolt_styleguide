/*! For license information please see react-extension-components-AccountRecovery-AccountRecoveryInviteUserSettingPreferenceDialog-AccountRecoveryInviteUserSettingPreferenceDialog-test-stories.2c1088e1.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3011],{"./src/react-extension/components/AccountRecovery/AccountRecoveryInviteUserSettingPreferenceDialog/AccountRecoveryInviteUserSettingPreferenceDialog.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Mandatory:()=>Mandatory,OptOut:()=>OptOut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>AccountRecoveryInviteUserSettingPreferenceDialog_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),DialogWrapper=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),FormSubmitButton=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const PolicyVariations_MANDATORY="mandatory",PolicyVariations_OPT_OUT="opt-out";class AccountRecoveryInviteUserSettingPreferenceDialog extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleSubmit=this.handleSubmit.bind(this),this.handleCancel=this.handleCancel.bind(this)}async handleSubmit(event){event.preventDefault(),this.props.onClose(),await this.props.history.push({pathname:"/app/settings/account-recovery/edit"})}async handleCancel(){await this.props.context.port.request("passbolt.account-recovery.postpone-user-setting-invitation"),this.props.onClose()}get translate(){return this.props.t}render(){return react.createElement(DialogWrapper.A,{title:`${this.translate("Account recovery enrollment")}`,onClose:this.handleCancel,className:"recovery-account-policy-dialog"},react.createElement("form",{onSubmit:this.handleSubmit},react.createElement("div",{className:"form-content"},react.createElement("p",null,{[PolicyVariations_MANDATORY]:react.createElement(es.x6,null,"It is mandatory to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?"),[PolicyVariations_OPT_OUT]:react.createElement(es.x6,null,"It is recommended to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?")}[this.props.policy])),react.createElement("div",{className:"submit-wrapper clearfix"},react.createElement("button",{type:"button",className:"link cancel",onClick:this.handleCancel},react.createElement(es.x6,null,"Later")),react.createElement(FormSubmitButton.A,{value:this.translate("Continue")}))))}}AccountRecoveryInviteUserSettingPreferenceDialog.propTypes={context:prop_types_default().object,policy:prop_types_default().string,onClose:prop_types_default().func,t:prop_types_default().func,history:prop_types_default().object};const AccountRecoveryInviteUserSettingPreferenceDialog_AccountRecoveryInviteUserSettingPreferenceDialog=(0,react_router.y)((0,AppContext.L)((0,es.CI)("common")(AccountRecoveryInviteUserSettingPreferenceDialog)));AccountRecoveryInviteUserSettingPreferenceDialog.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleSubmit",docblock:"Handle click on continue button\n@param {Event} event A form submit event",modifiers:["async"],params:[{name:"event",description:"A form submit event",type:{name:"Event"},optional:!1}],returns:null,description:"Handle click on continue button"},{name:"handleCancel",docblock:"Handle click on cancel buttons",modifiers:["async"],params:[],returns:null,description:"Handle click on cancel buttons"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"AccountRecoveryInviteUserSettingPreferenceDialog",props:{context:{description:"",type:{name:"object"},required:!1},policy:{description:"",type:{name:"string"},required:!1},onClose:{description:"",type:{name:"func"},required:!1},t:{description:"",type:{name:"func"},required:!1},history:{description:"",type:{name:"object"},required:!1}}};var MockTranslationProvider=__webpack_require__("./src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");const AccountRecoveryInviteUserSettingPreferenceDialog_test_stories={title:"Components/AccountRecovery/AccountRecoveryInviteUserSettingPreferenceDialog",component:AccountRecoveryInviteUserSettingPreferenceDialog_AccountRecoveryInviteUserSettingPreferenceDialog},Template=args=>react.createElement(MockTranslationProvider.A,null,react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(AccountRecoveryInviteUserSettingPreferenceDialog_AccountRecoveryInviteUserSettingPreferenceDialog,args))),Mandatory=Template.bind({});Mandatory.args={context:{port:new MockPort.A,locale:"en-US"},policy:"mandatory",onClose:()=>{}};const OptOut=Template.bind({});OptOut.args={context:{port:new MockPort.A,locale:"en-US"},policy:"opt-out",onClose:()=>{}};const __namedExportsOrder=["Mandatory","OptOut"];Mandatory.parameters={...Mandatory.parameters,docs:{...Mandatory.parameters?.docs,source:{originalSource:"args => <MockTranslationProvider>\n    <MemoryRouter initialEntries={['/']}>\n      <AccountRecoveryInviteUserSettingPreferenceDialog {...args} />\n    </MemoryRouter>\n  </MockTranslationProvider>",...Mandatory.parameters?.docs?.source}}},OptOut.parameters={...OptOut.parameters,docs:{...OptOut.parameters?.docs,source:{originalSource:"args => <MockTranslationProvider>\n    <MemoryRouter initialEntries={['/']}>\n      <AccountRecoveryInviteUserSettingPreferenceDialog {...args} />\n    </MemoryRouter>\n  </MockTranslationProvider>",...OptOut.parameters?.docs?.source}}}},"./src/img/svg/close.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m12 4-8 8M4 4l8 8"})))}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DialogWrapper_DialogWrapper});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),svg_close=__webpack_require__("./src/img/svg/close.svg");class DialogCloseButton extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleCloseClick=this.handleCloseClick.bind(this)}handleCloseClick(){this.props.onClose()}render(){return react.createElement("button",{type:"button",disabled:this.props.disabled,className:"dialog-close button button-transparent",onClick:this.handleCloseClick},react.createElement(svg_close.A,{className:"svg-icon close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Close")))}}DialogCloseButton.propTypes={onClose:prop_types_default().func,disabled:prop_types_default().bool};const DialogCloseButton_DialogCloseButton=(0,es.CI)("common")(DialogCloseButton);DialogCloseButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleCloseClick",docblock:"Handle close click.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close click."}],displayName:"DialogCloseButton",props:{onClose:{description:"",type:{name:"func"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1}}};var Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),Tooltip=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js");class DialogWrapper extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleKeyDown=this.handleKeyDown.bind(this),this.handleClose=this.handleClose.bind(this)}handleKeyDown(event){27===event.keyCode&&this.handleClose()}handleClose(){this.props.disabled||this.props.onClose()}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown,{capture:!1})}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown,{capture:!1})}render(){return react.createElement("div",{className:`${this.props.className} dialog-wrapper`},react.createElement("div",{className:"dialog"},react.createElement("div",{className:"dialog-header"},react.createElement("div",{className:"dialog-title-wrapper"},react.createElement("h2",null,react.createElement("span",{className:"dialog-header-title"},this.props.title),this.props.subtitle&&react.createElement("span",{className:"dialog-header-subtitle"},this.props.subtitle)),this.props.tooltip&&""!==this.props.tooltip&&react.createElement(Tooltip.A,{message:this.props.tooltip},react.createElement(Icon.A,{name:"info-circle"}))),react.createElement(DialogCloseButton_DialogCloseButton,{onClose:this.handleClose,disabled:this.props.disabled})),react.createElement("div",{className:"dialog-content"},this.props.children)))}}DialogWrapper.propTypes={children:prop_types_default().node,className:prop_types_default().string,title:prop_types_default().oneOfType([prop_types_default().arrayOf(prop_types_default().node),prop_types_default().node,prop_types_default().string]),subtitle:prop_types_default().string,tooltip:prop_types_default().string,disabled:prop_types_default().bool,onClose:prop_types_default().func};const DialogWrapper_DialogWrapper=DialogWrapper;DialogWrapper.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleKeyDown",docblock:"Handle key down\n@param {ReactEvent} event The triggered event",modifiers:[],params:[{name:"event",description:"The triggered event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle key down"},{name:"handleClose",docblock:"Handle close",modifiers:[],params:[],returns:null,description:"Handle close"}],displayName:"DialogWrapper",props:{children:{description:"",type:{name:"node"},required:!1},className:{description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},subtitle:{description:"",type:{name:"string"},required:!1},tooltip:{description:"",type:{name:"string"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClose:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/img/svg/spinner.svg"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary form";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__.A,null))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}}}]);