/*! For license information please see react-extension-components-Administration-ConfirmSaveAccountRecoverySettings-ConfirmSaveAccountRecoverySettings-test-stories.b46c3abb.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4071],{"./src/react-extension/components/Administration/ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,MandatoryWithOrganizationKey:()=>MandatoryWithOrganizationKey,OptInWithOrganizationKey:()=>OptInWithOrganizationKey,OptOutWithOrganizationKey:()=>OptOutWithOrganizationKey,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ConfirmSaveAccountRecoverySettings_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),ConfirmSaveAccountRecoverySettings=__webpack_require__("./src/react-extension/components/Administration/ConfirmSaveAccountRecoverySettings/ConfirmSaveAccountRecoverySettings.js"),ExtAppContext_test_data=(__webpack_require__("./node_modules/luxon/src/luxon.js"),__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"));function defaultProps(props={}){const _props={context:(0,ExtAppContext_test_data.st)(props?.context),policy:"opt-in",keyInfo:null,onClose:jest.fn(),onCancel:jest.fn(),onSubmit:jest.fn(),onError:jest.fn()};return delete props.context,Object.assign(_props,props)}const ConfirmSaveAccountRecoverySettings_test_stories={title:"Components/Administration/ConfirmSaveAccountRecoverySettings",component:ConfirmSaveAccountRecoverySettings.A},Template=args=>react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(ConfirmSaveAccountRecoverySettings.A,{...args,...routerProps})})),Disabled=Template.bind({});Disabled.args=function disabledPolicyProps(props={}){return defaultProps(Object.assign({policy:"disabled"},props))}();const MandatoryWithOrganizationKey=Template.bind({});MandatoryWithOrganizationKey.args=function mandatoryPolicyPropsWithOrganisationKey(props={}){return defaultProps(Object.assign({policy:"mandatory",keyInfo:{fingerprint:"0c1d1761110d1e33c9006d1a5b1b332ed06426d3",algorithm:"RSA",length:"4096",created:"2020-09-01T13:11:08+00:00",expires:"Infinity"}},props))}();const OptInWithOrganizationKey=Template.bind({});OptInWithOrganizationKey.args=function optInPolicyPropsWithOrganisationKey(props={}){return defaultProps(Object.assign({policy:"opt-in",keyInfo:{fingerprint:"0c1d1761110d1e33c9006d1a5b1b332ed06426d3",algorithm:"RSA",length:"4096",created:"2020-09-01T13:11:08+00:00",expires:"Infinity"}},props))}();const OptOutWithOrganizationKey=Template.bind({});OptOutWithOrganizationKey.args=function optOutPolicyPropsWithOrganisationKey(props={}){return defaultProps(Object.assign({policy:"opt-out",keyInfo:{fingerprint:"0c1d1761110d1e33c9006d1a5b1b332ed06426d3",algorithm:"RSA",length:"4096",created:"2020-09-01T13:11:08+00:00",expires:"Infinity"}},props))}();const __namedExportsOrder=["Disabled","MandatoryWithOrganizationKey","OptInWithOrganizationKey","OptOutWithOrganizationKey"];Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <ConfirmSaveAccountRecoverySettings {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...Disabled.parameters?.docs?.source}}},MandatoryWithOrganizationKey.parameters={...MandatoryWithOrganizationKey.parameters,docs:{...MandatoryWithOrganizationKey.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <ConfirmSaveAccountRecoverySettings {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...MandatoryWithOrganizationKey.parameters?.docs?.source}}},OptInWithOrganizationKey.parameters={...OptInWithOrganizationKey.parameters,docs:{...OptInWithOrganizationKey.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <ConfirmSaveAccountRecoverySettings {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...OptInWithOrganizationKey.parameters?.docs?.source}}},OptOutWithOrganizationKey.parameters={...OptOutWithOrganizationKey.parameters,docs:{...OptOutWithOrganizationKey.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <ConfirmSaveAccountRecoverySettings {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...OptOutWithOrganizationKey.parameters?.docs?.source}}}},"./src/img/svg/close.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m12 4-8 8M4 4l8 8"})))}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DialogWrapper_DialogWrapper});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),svg_close=__webpack_require__("./src/img/svg/close.svg");class DialogCloseButton extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleCloseClick=this.handleCloseClick.bind(this)}handleCloseClick(){this.props.onClose()}render(){return react.createElement("button",{type:"button",disabled:this.props.disabled,className:"dialog-close button button-transparent",onClick:this.handleCloseClick},react.createElement(svg_close.A,{className:"svg-icon close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Close")))}}DialogCloseButton.propTypes={onClose:prop_types_default().func,disabled:prop_types_default().bool};const DialogCloseButton_DialogCloseButton=(0,es.CI)("common")(DialogCloseButton);DialogCloseButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleCloseClick",docblock:"Handle close click.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close click."}],displayName:"DialogCloseButton",props:{onClose:{description:"",type:{name:"func"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1}}};var Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),Tooltip=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js");class DialogWrapper extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleKeyDown=this.handleKeyDown.bind(this),this.handleClose=this.handleClose.bind(this)}handleKeyDown(event){27===event.keyCode&&this.handleClose()}handleClose(){this.props.disabled||this.props.onClose()}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown,{capture:!1})}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown,{capture:!1})}render(){return react.createElement("div",{className:`${this.props.className} dialog-wrapper`},react.createElement("div",{className:"dialog"},react.createElement("div",{className:"dialog-header"},react.createElement("div",{className:"dialog-title-wrapper"},react.createElement("h2",null,react.createElement("span",{className:"dialog-header-title"},this.props.title),this.props.subtitle&&react.createElement("span",{className:"dialog-header-subtitle"},this.props.subtitle)),this.props.tooltip&&""!==this.props.tooltip&&react.createElement(Tooltip.A,{message:this.props.tooltip},react.createElement(Icon.A,{name:"info-circle"}))),react.createElement(DialogCloseButton_DialogCloseButton,{onClose:this.handleClose,disabled:this.props.disabled})),react.createElement("div",{className:"dialog-content"},this.props.children)))}}DialogWrapper.propTypes={children:prop_types_default().node,className:prop_types_default().string,title:prop_types_default().oneOfType([prop_types_default().arrayOf(prop_types_default().node),prop_types_default().node,prop_types_default().string]),subtitle:prop_types_default().string,tooltip:prop_types_default().string,disabled:prop_types_default().bool,onClose:prop_types_default().func};const DialogWrapper_DialogWrapper=DialogWrapper;DialogWrapper.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleKeyDown",docblock:"Handle key down\n@param {ReactEvent} event The triggered event",modifiers:[],params:[{name:"event",description:"The triggered event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle key down"},{name:"handleClose",docblock:"Handle close",modifiers:[],params:[],returns:null,description:"Handle close"}],displayName:"DialogWrapper",props:{children:{description:"",type:{name:"node"},required:!1},className:{description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},subtitle:{description:"",type:{name:"string"},required:!1},tooltip:{description:"",type:{name:"string"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClose:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/img/svg/spinner.svg"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__.A,null))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entity.js");class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};constructor(dtos={},options={}){super(dtos,options),this.marshall();(options?.validate??!0)&&(this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules))}marshall(){}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);