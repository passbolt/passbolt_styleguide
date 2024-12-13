/*! For license information please see react-extension-components-Resource-EditTotp-EditTotp-test-stories.24443818.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7747],{"./src/react-extension/components/Resource/EditTotp/EditTotp.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>EditTotp_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),EditTotp=__webpack_require__("./src/react-extension/components/Resource/EditTotp/EditTotp.js");const EditTotp_test_stories={title:"Components/Resource/EditTotp",component:EditTotp.A},Initial=(args=>react.createElement(EditTotp.A,args)).bind({});Initial.args=function defaultProps(data={}){const defaultData={totp:{secret_key:"2F2SA73OFJERVNBL",period:60,digits:7,algorithm:"SHA256"},onClose:jest.fn(),onSubmit:jest.fn(),onCancel:jest.fn(),onOpenUploadQrCode:jest.fn()};return Object.assign(defaultData,data)}();const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <EditTotp {...args} />",...Initial.parameters?.docs?.source}}}},"./src/img/svg/close.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m12 4-8 8M4 4l8 8"})))}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DialogWrapper_DialogWrapper});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),svg_close=__webpack_require__("./src/img/svg/close.svg");class DialogCloseButton extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleCloseClick=this.handleCloseClick.bind(this)}handleCloseClick(){this.props.onClose()}render(){return react.createElement("button",{type:"button",disabled:this.props.disabled,className:"dialog-close button button-transparent",onClick:this.handleCloseClick},react.createElement(svg_close.A,{className:"svg-icon close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Close")))}}DialogCloseButton.propTypes={onClose:prop_types_default().func,disabled:prop_types_default().bool};const DialogCloseButton_DialogCloseButton=(0,es.CI)("common")(DialogCloseButton);DialogCloseButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleCloseClick",docblock:"Handle close click.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close click."}],displayName:"DialogCloseButton",props:{onClose:{description:"",type:{name:"func"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1}}};var Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),Tooltip=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js");class DialogWrapper extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleKeyDown=this.handleKeyDown.bind(this),this.handleClose=this.handleClose.bind(this)}handleKeyDown(event){27===event.keyCode&&this.handleClose()}handleClose(){this.props.disabled||this.props.onClose()}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown,{capture:!1})}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown,{capture:!1})}render(){return react.createElement("div",{className:`${this.props.className} dialog-wrapper`},react.createElement("div",{className:"dialog"},react.createElement("div",{className:"dialog-header"},react.createElement("div",{className:"dialog-title-wrapper"},react.createElement("h2",null,react.createElement("span",{className:"dialog-header-title"},this.props.title),this.props.subtitle&&react.createElement("span",{className:"dialog-header-subtitle"},this.props.subtitle)),this.props.tooltip&&""!==this.props.tooltip&&react.createElement(Tooltip.A,{message:this.props.tooltip},react.createElement(Icon.A,{name:"info-circle"}))),react.createElement(DialogCloseButton_DialogCloseButton,{onClose:this.handleClose,disabled:this.props.disabled})),react.createElement("div",{className:"dialog-content"},this.props.children)))}}DialogWrapper.propTypes={children:prop_types_default().node,className:prop_types_default().string,title:prop_types_default().oneOfType([prop_types_default().arrayOf(prop_types_default().node),prop_types_default().node,prop_types_default().string]),subtitle:prop_types_default().string,tooltip:prop_types_default().string,disabled:prop_types_default().bool,onClose:prop_types_default().func};const DialogWrapper_DialogWrapper=DialogWrapper;DialogWrapper.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleKeyDown",docblock:"Handle key down\n@param {ReactEvent} event The triggered event",modifiers:[],params:[{name:"event",description:"The triggered event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle key down"},{name:"handleClose",docblock:"Handle close",modifiers:[],params:[],returns:null,description:"Handle close"}],displayName:"DialogWrapper",props:{children:{description:"",type:{name:"node"},required:!1},className:{description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},subtitle:{description:"",type:{name:"string"},required:!1},tooltip:{description:"",type:{name:"string"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClose:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/img/svg/spinner.svg"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__.A,null))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/react-extension/components/Resource/EditTotp/EditTotp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),react_i18next__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_Common_Select_Select__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/components/Common/Select/Select.js"),_shared_models_totp_TotpViewModel__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/shared/models/totp/TotpViewModel.js");class EditTotp extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.initEventHandlers(),this.createInputRef()}get defaultState(){return{totp:new _shared_models_totp_TotpViewModel__WEBPACK_IMPORTED_MODULE_7__.A(this.props.totp),errors:null,warnings:{},processing:!1,hasAlreadyBeenValidated:!1,openAdvancedSettings:!1}}initEventHandlers(){this.handleClose=this.handleClose.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleInputKeyUp=this.handleInputKeyUp.bind(this),this.handleAdvancedSettingClickEvent=this.handleAdvancedSettingClickEvent.bind(this),this.handleUploadImageButtonClick=this.handleUploadImageButtonClick.bind(this)}createInputRef(){this.keyInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef(),this.periodInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef(),this.digitsInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}async handleFormSubmit(event){if(event.preventDefault(),!this.state.processing){if(this.setState({hasAlreadyBeenValidated:!0}),await this.toggleProcessing(),!this.validate())return await this.toggleProcessing(),void this.focusFirstFieldError();this.props.onSubmit(this.state.totp),this.handleClose()}}async toggleProcessing(){const prev=this.state.processing;return new Promise((resolve=>{this.setState({processing:!prev},resolve())}))}validate(){const errors=this.state.totp.validate();return this.setState({errors}),!errors.hasErrors()}focusFirstFieldError(){this.isFieldError("secret_key")?this.keyInputRef.current.focus():this.isFieldError("period")?(this.setState({openAdvancedSettings:!0}),this.periodInputRef.current.focus()):this.isFieldError("digits")&&(this.setState({openAdvancedSettings:!0}),this.digitsInputRef.current.focus())}handleInputChange(event){const target=event.target;let value;value="number"===target.type?Number.isNaN(target.valueAsNumber)?"":target.valueAsNumber:target.value;const name=target.name,totp=this.state.totp.cloneWithMutation(name,value);this.setState({totp})}handleInputKeyUp(event){const name=event.target.name;if(this.state.hasAlreadyBeenValidated){const errors=this.state.totp.validateField(name);this.updateErrorsField(errors,name)}else this.updateWarningsField(name)}updateErrorsField(errors,fieldName){const errorsDetails=this.state.errors.details;delete errorsDetails[fieldName],Object.assign(errors.details,errorsDetails),this.setState({errors})}updateWarningsField(fieldName){const warnings={...this.state.warnings};delete warnings[fieldName],this.state.totp.isWarningSizeField(fieldName)&&(warnings[fieldName]=this.translate("this is the maximum size for this field, make sure your data was not truncated")),this.setState({warnings})}handleClose(){this.props.onCancel(),this.props.onClose()}async handleAdvancedSettingClickEvent(){const openAdvancedSettings=!this.state.openAdvancedSettings;this.setState({openAdvancedSettings})}handleUploadImageButtonClick(){this.props.onOpenUploadQrCode()}get secretKeyErrorMessage(){const error=this.state.errors?.getError("secret_key");return error?.notEmpty?this.translate("The key is required."):error?.pattern?this.translate("The key is not valid."):null}get periodErrorMessage(){const error=this.state.errors?.getError("period");return error?.type?this.translate("TOTP expiry is required."):error?.minimum?this.translate("TOTP expiry must be greater than 0."):null}get digitsErrorMessage(){const error=this.state.errors?.getError("digits");return error?.type?this.translate("TOTP length is required."):error?.minimum||error?.maximum?this.translate("TOTP length must be between 6 and 8."):null}isFieldError(name){return this.state.errors?.hasError(name)}isFieldWarning(name){return Boolean(this.state.warnings[name])}get supportedAlgorithms(){return _shared_models_totp_TotpViewModel__WEBPACK_IMPORTED_MODULE_7__.A.SUPPORTED_ALGORITHMS.map((algorithm=>({value:algorithm,label:algorithm})))}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_2__.A,{title:this.translate("Edit TOTP"),className:"edit-totp-dialog",disabled:this.state.processing,onClose:this.handleClose},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{onSubmit:this.handleFormSubmit,noValidate:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input text required ${this.isFieldError("secret_key")?"error":""} ${this.state.processing?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"edit-totp-form-key"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"Key")," (",react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"secret"),")",this.isFieldWarning("secret_key")&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"exclamation"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input-wrapper-inline"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"edit-totp-form-key",name:"secret_key",maxLength:"1024",type:"text",onKeyUp:this.handleInputKeyUp,autoComplete:"off",value:this.state.totp.secret_key,onChange:this.handleInputChange,placeholder:this.translate("Key"),disabled:this.state.processing,ref:this.keyInputRef}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handleUploadImageButtonClick,disabled:this.state.processing,className:"button-icon "+(this.state.processing?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"camera",big:!0}))),this.isFieldError("secret_key")&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"key error-message"},this.secretKeyErrorMessage),this.isFieldWarning("secret_key")&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"key warning-message"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"Warning:"))," ",this.state.warnings.secret_key))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content no-padding"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion accordion-section "+(this.state.openAdvancedSettings?"":"closed")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.handleAdvancedSettingClickEvent},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"Advanced settings"),this.state.openAdvancedSettings&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"caret-down"}),!this.state.openAdvancedSettings&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"caret-right"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input text required ${this.isFieldError("period")?"error":""} ${this.state.processing?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"edit-totp-form-period"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"TOTP expiry")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input-wrapper-inline"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"edit-totp-form-period",name:"period",type:"number",value:this.state.totp.period,onChange:this.handleInputChange,disabled:this.state.processing,ref:this.periodInputRef,onKeyUp:this.handleInputKeyUp,className:"required",min:"1",max:"120"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"seconds until the TOTP expires"))),this.isFieldError("period")&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"period error-message"},this.periodErrorMessage)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input text required ${this.isFieldError("digits")?"error":""} ${this.state.processing?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"edit-totp-form-digits"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"TOTP length")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input-wrapper-inline"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"edit-totp-form-digits",name:"digits",type:"number",value:this.state.totp.digits,onChange:this.handleInputChange,disabled:this.state.processing,className:"required",min:"6",max:"8",onKeyUp:this.handleInputKeyUp,ref:this.digitsInputRef}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"digits"))),this.isFieldError("digits")&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"digits error-message"},this.digitsErrorMessage)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"select-wrapper input required "+(this.state.processing?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"edit-totp-form-algorithm"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__.x6,null,"Algorithm")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Select_Select__WEBPACK_IMPORTED_MODULE_6__.A,{id:"edit-totp-form-algorithm",name:"algorithm",value:this.state.totp.algorithm,items:this.supportedAlgorithms,disabled:this.state.processing,onChange:this.handleInputChange}))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__.A,{disabled:this.state.processing,onClick:this.handleClose}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_3__.A,{value:this.translate("Apply"),disabled:this.state.processing,processing:this.state.processing}))))}}EditTotp.propTypes={totp:prop_types__WEBPACK_IMPORTED_MODULE_8___default().object.isRequired,onClose:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func,onCancel:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func,onSubmit:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func,onOpenUploadQrCode:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func,t:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.CI)("common")(EditTotp);EditTotp.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Get the default state\n@return {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get the default state"},{name:"initEventHandlers",docblock:null,modifiers:[],params:[],returns:null},{name:"createInputRef",docblock:"Create DOM nodes or React elements references in order to be able to access them programmatically.",modifiers:[],params:[],returns:null,description:"Create DOM nodes or React elements references in order to be able to access them programmatically."},{name:"handleFormSubmit",docblock:"Handle form submit event.\n@params {ReactEvent} The react event\n@return {Promise}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"Promise"}},description:"Handle form submit event."},{name:"toggleProcessing",docblock:"Toggle processing state when validating / saving\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Toggle processing state when validating / saving"},{name:"validate",docblock:"Validate the form.\n@return {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Validate the form."},{name:"focusFirstFieldError",docblock:"Focus the first field of the form which is in error state.",modifiers:[],params:[],returns:null,description:"Focus the first field of the form which is in error state."},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handleInputKeyUp",docblock:"Handle name input keyUp event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle name input keyUp event."},{name:"updateErrorsField",docblock:"Update errors field\n@param {EntityValidationError} errors\n@param {string} fieldName",modifiers:[],params:[{name:"errors",type:{name:"EntityValidationError"},optional:!1},{name:"fieldName",type:{name:"string"},optional:!1}],returns:null,description:"Update errors field"},{name:"updateWarningsField",docblock:"Update warnings field\n@param {string} fieldName",modifiers:[],params:[{name:"fieldName",type:{name:"string"},optional:!1}],returns:null,description:"Update warnings field"},{name:"handleClose",docblock:"Handle close",modifiers:[],params:[],returns:null,description:"Handle close"},{name:"handleAdvancedSettingClickEvent",docblock:"handle when the users click on the section advanced settings.\nOpen/Close it.",modifiers:["async"],params:[],returns:null,description:"handle when the users click on the section advanced settings.\nOpen/Close it."},{name:"handleUploadImageButtonClick",docblock:"Handle click on camera icon to upload qr code",modifiers:[],params:[],returns:null,description:"Handle click on camera icon to upload qr code"},{name:"secretKeyErrorMessage",docblock:"Get the secret key error message\n@return {*|null}",modifiers:["get"],params:[],returns:{type:{name:"union",elements:[{name:"mixed"}]}},description:"Get the secret key error message"},{name:"periodErrorMessage",docblock:"Get the period error message\n@return {*|null}",modifiers:["get"],params:[],returns:{type:{name:"union",elements:[{name:"mixed"}]}},description:"Get the period error message"},{name:"digitsErrorMessage",docblock:"Get the digits error message\n@return {*|null}",modifiers:["get"],params:[],returns:{type:{name:"union",elements:[{name:"mixed"}]}},description:"Get the digits error message"},{name:"isFieldError",docblock:"Is field has error\n@param {string} name\n@return {boolean}",modifiers:[],params:[{name:"name",type:{name:"string"},optional:!1}],returns:{type:{name:"boolean"}},description:"Is field has error"},{name:"isFieldWarning",docblock:"Is field has warning\n@param {string} name\n@return {boolean}",modifiers:[],params:[{name:"name",type:{name:"string"},optional:!1}],returns:{type:{name:"boolean"}},description:"Is field has warning"},{name:"supportedAlgorithms",docblock:"Get the supported algorithms\n@returns {array}",modifiers:["get"],params:[],returns:{type:{name:"array"}},description:"Get the supported algorithms"},{name:"translate",docblock:"Get translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get translate function"}],displayName:"EditTotp",props:{totp:{description:"",type:{name:"object"},required:!0},onClose:{description:"",type:{name:"func"},required:!1},onCancel:{description:"",type:{name:"func"},required:!1},onSubmit:{description:"",type:{name:"func"},required:!1},onOpenUploadQrCode:{description:"",type:{name:"func"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,VB:()=>RESOURCE_TOTP_KEY_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024,RESOURCE_TOTP_KEY_MAX_LENGTH=1024},"./src/shared/models/totp/TotpViewModel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entity_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js"),_entity_abstract_entitySchema__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/constants/inputs.const.js");class TotpViewModel{constructor(resource={}){this.secret_key=resource.secret_key||"",this.period=resource.period??30,this.digits=resource.digits??6,this.algorithm=resource.algorithm||TotpViewModel.SUPPORTED_ALGORITHMS[0]}static getSchema(){return{type:"object",required:["secret_key","period","digits","algorithm"],properties:{secret_key:{type:"string",notEmpty:!0,pattern:/^\s*[A-Za-z2-7\s]+=*\s*$/,maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.VB},period:{type:"number",minimum:1},digits:{type:"number",maximum:8,minimum:6},algorithm:{type:"string",notEmpty:!0,enum:TotpViewModel.SUPPORTED_ALGORITHMS}}}}toSecretDto(){return{totp:{algorithm:this.algorithm,digits:this.digits,period:this.period,secret_key:this.secret_key.replaceAll(/\s+/g,"").toUpperCase()}}}cloneWithMutation(field,value){const clone={...this,[field]:value};return new this.constructor(clone)}static areSecretsDifferent(a,b){return["secret_key","period","digits","algorithm"].some((key=>a[key]!==b[key]))}validate(){try{_entity_abstract_entitySchema__WEBPACK_IMPORTED_MODULE_1__.A.validate(this.constructor.name,this,this.constructor.getSchema())}catch(error){return error}return new _entity_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_0__.A}validateField(field){try{_entity_abstract_entitySchema__WEBPACK_IMPORTED_MODULE_1__.A.validateProp(field,this[field],this.constructor.getSchema().properties[field])}catch(error){return error}return new _entity_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_0__.A}isWarningSizeField(field){const schema=this.constructor.getSchema();return this[field].length>=schema.properties[field].maxLength}static get SUPPORTED_ALGORITHMS(){return["SHA1","SHA256","SHA512"]}}const __WEBPACK_DEFAULT_EXPORT__=TotpViewModel}}]);