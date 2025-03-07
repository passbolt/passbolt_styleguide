/*! For license information please see react-extension-components-Resource-ResourceForm-AddResourceDescription-test-stories.dff2db69.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[5076],{"./src/react-extension/components/Resource/ResourceForm/AddResourceDescription.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Resource/AddResourceDescription",component:__webpack_require__("./src/react-extension/components/Resource/ResourceForm/AddResourceDescription.js").A,decorators:[(Story,{args})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{margin:"-1rem"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_1__.A,{title:"Create a resource",className:"create-resource"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"left-sidebar"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-action-wrapper"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sidebar-content-sections"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"grid-and-footer"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"grid"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"resource-info"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"information"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"create-workspace"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,args))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper"}))))]},Default={},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}}},"./src/img/svg/close.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m12 4-8 8M4 4l8 8"})))}},"./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DialogWrapper_DialogWrapper});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),svg_close=__webpack_require__("./src/img/svg/close.svg");class DialogCloseButton extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleCloseClick=this.handleCloseClick.bind(this)}handleCloseClick(){this.props.onClose()}render(){return react.createElement("button",{type:"button",disabled:this.props.disabled,className:"dialog-close button button-transparent",onClick:this.handleCloseClick},react.createElement(svg_close.A,{className:"svg-icon close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Close")))}}DialogCloseButton.propTypes={onClose:prop_types_default().func,disabled:prop_types_default().bool};const DialogCloseButton_DialogCloseButton=(0,es.CI)("common")(DialogCloseButton);DialogCloseButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleCloseClick",docblock:"Handle close click.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close click."}],displayName:"DialogCloseButton",props:{onClose:{description:"",type:{name:"func"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1}}};var Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),Tooltip=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js");class DialogWrapper extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleKeyDown=this.handleKeyDown.bind(this),this.handleClose=this.handleClose.bind(this)}handleKeyDown(event){27===event.keyCode&&this.handleClose()}handleClose(){this.props.disabled||this.props.onClose()}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown,{capture:!1})}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown,{capture:!1})}render(){return react.createElement("div",{className:`${this.props.className} dialog-wrapper`},react.createElement("div",{className:"dialog"},react.createElement("div",{className:"dialog-header"},react.createElement("div",{className:"dialog-title-wrapper"},react.createElement("h2",null,react.createElement("span",{className:"dialog-header-title"},this.props.title),this.props.subtitle&&react.createElement("span",{className:"dialog-header-subtitle"},this.props.subtitle)),this.props.tooltip&&""!==this.props.tooltip&&react.createElement(Tooltip.A,{message:this.props.tooltip},react.createElement(Icon.A,{name:"info-circle"}))),react.createElement(DialogCloseButton_DialogCloseButton,{onClose:this.handleClose,disabled:this.props.disabled})),react.createElement("div",{className:"dialog-content"},this.props.children)))}}DialogWrapper.propTypes={children:prop_types_default().node,className:prop_types_default().string,title:prop_types_default().oneOfType([prop_types_default().arrayOf(prop_types_default().node),prop_types_default().node,prop_types_default().string]),subtitle:prop_types_default().string,tooltip:prop_types_default().string,disabled:prop_types_default().bool,onClose:prop_types_default().func};const DialogWrapper_DialogWrapper=DialogWrapper;DialogWrapper.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleKeyDown",docblock:"Handle key down\n@param {ReactEvent} event The triggered event",modifiers:[],params:[{name:"event",description:"The triggered event",type:{name:"ReactEvent"},optional:!1}],returns:null,description:"Handle key down"},{name:"handleClose",docblock:"Handle close",modifiers:[],params:[],returns:null,description:"Handle close"}],displayName:"DialogWrapper",props:{children:{description:"",type:{name:"node"},required:!1},className:{description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},subtitle:{description:"",type:{name:"string"},required:!1},tooltip:{description:"",type:{name:"string"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClose:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/react-extension/components/Resource/ResourceForm/AddResourceDescription.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class AddResourceDescription extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}get translate(){return this.props.t}bindCallbacks(){this.handleInputChange=this.handleInputChange.bind(this)}handleInputChange(event){this.props.onChange&&this.props.onChange(event)}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"title"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Description"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"description-fields"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input textarea"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"resource-description"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Content")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea",{id:"resource-description",name:"metadata.description",maxLength:"10000",placeholder:this.translate("Add a description"),onChange:this.handleInputChange,value:this.resource?.metadata?.description})))))}}AddResourceDescription.propTypes={resource:prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,onChange:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,t:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(AddResourceDescription);AddResourceDescription.__docgenInfo={description:"",methods:[{name:"translate",docblock:"Get the translation function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translation function"},{name:"bindCallbacks",docblock:"Bind callbacks",modifiers:[],params:[],returns:null,description:"Bind callbacks"},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."}],displayName:"AddResourceDescription",props:{resource:{description:"",type:{name:"object"},required:!1},onChange:{description:"",type:{name:"func"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}}}]);