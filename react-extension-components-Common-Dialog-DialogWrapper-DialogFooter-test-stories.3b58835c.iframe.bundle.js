/*! For license information please see react-extension-components-Common-Dialog-DialogWrapper-DialogFooter-test-stories.3b58835c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3425],{"./src/react-extension/components/Common/Dialog/DialogWrapper/DialogFooter.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,Warning:()=>Warning,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Common/DialogFooter",component:args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-content"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-footer"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"button button-left",disabled:args.disabled,type:"button"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Learn more")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{disabled:args.disabled,className:"link cancel"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Cancel")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_1__.A,{disabled:args.disabled,processing:args.processing,warning:args.warning}))))},Default={args:{disabled:!1,processing:!1,warning:!1}},Disabled={args:{disabled:!0,processing:!0,warning:!1}},Warning={args:{disabled:!1,processing:!1,warning:!0}},__namedExportsOrder=["Default","Disabled","Warning"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    disabled: false,\n    processing: false,\n    warning: false\n  }\n}",...Default.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    disabled: true,\n    processing: true,\n    warning: false\n  }\n}",...Disabled.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:"{\n  args: {\n    disabled: false,\n    processing: false,\n    warning: true\n  }\n}",...Warning.parameters?.docs?.source}}}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/img/svg/spinner.svg"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__.A,null))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}}}]);