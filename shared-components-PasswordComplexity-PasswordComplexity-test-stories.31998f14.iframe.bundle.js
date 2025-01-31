/*! For license information please see shared-components-PasswordComplexity-PasswordComplexity-test-stories.31998f14.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[2754],{"./src/shared/components/PasswordComplexity/PasswordComplexity.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultPasswordComplexity:()=>DefaultPasswordComplexity,ErrorPasswordComplexity:()=>ErrorPasswordComplexity,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Foundations/PasswordComplexity",component:__webpack_require__("./src/shared/components/PasswordComplexity/PasswordComplexity.js").A},DefaultPasswordComplexity={args:{entropy:87.9,error:!1}},ErrorPasswordComplexity={args:{error:!0}},__namedExportsOrder=["DefaultPasswordComplexity","ErrorPasswordComplexity"];DefaultPasswordComplexity.parameters={...DefaultPasswordComplexity.parameters,docs:{...DefaultPasswordComplexity.parameters?.docs,source:{originalSource:"{\n  args: {\n    entropy: 87.9,\n    error: false\n  }\n}",...DefaultPasswordComplexity.parameters?.docs?.source}}},ErrorPasswordComplexity.parameters={...ErrorPasswordComplexity.parameters,docs:{...ErrorPasswordComplexity.parameters?.docs,source:{originalSource:"{\n  args: {\n    error: true\n  }\n}",...ErrorPasswordComplexity.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/shared/components/PasswordComplexity/PasswordComplexity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/lib/SecretGenerator/SecretGeneratorComplexity.js"),_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js"),_Icons_Icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/components/Icons/Icon.js");const COLOR_GRADIENT={COLOR_1:hexToRgb("#BA2809"),COLOR_2:hexToRgb("#FFA724"),COLOR_3:hexToRgb("#0EAA00")};function hexToRgb(hex){const result=new RegExp("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$","i").exec(hex.trim());if(result){return{red:parseInt(result[1],16),green:parseInt(result[2],16),blue:parseInt(result[3],16)}}return null}class PasswordComplexity extends react__WEBPACK_IMPORTED_MODULE_0__.Component{get entropy(){return(this.props.entropy||0).toFixed(1)}get tooltipMessage(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Entropy:")," ",this.entropy," bits")}get passwordStrengthLabel(){if(!(this.hasEntropy()||this.hasError()))return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Quality");const strength=_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__.CH.strength(this.props.entropy);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,strength.label)}hasEntropy(){return null!==this.props.entropy&&void 0!==this.props.entropy}hasError(){return this.props.error}getProgresseBarStyle(){const relativePositionForEntropy=this.getRelativeEntropyPosition();return{width:`${relativePositionForEntropy}%`,backgroundColor:this.colorGradient(relativePositionForEntropy)}}colorGradient(fadeFraction){let rgbColor1,rgbColor2,fade=fadeFraction/100*2;fade>=1?(fade-=1,rgbColor1=COLOR_GRADIENT.COLOR_2,rgbColor2=COLOR_GRADIENT.COLOR_3):(rgbColor1=COLOR_GRADIENT.COLOR_1,rgbColor2=COLOR_GRADIENT.COLOR_2);return`rgb(${Math.floor(rgbColor1.red+(rgbColor2.red-rgbColor1.red)*fade)},${Math.floor(rgbColor1.green+(rgbColor2.green-rgbColor1.green)*fade)},${Math.floor(rgbColor1.blue+(rgbColor2.blue-rgbColor1.blue)*fade)})`}getRelativeEntropyPosition(){return 100-99/(1+Math.pow(this.props.entropy/90,10))}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"password-complexity"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"complexity-text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__.A,{message:this.tooltipMessage},this.passwordStrengthLabel," ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_4__.A,{name:"info-circle"}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar background"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar foreground "+(this.hasError()?"error":""),style:this.hasEntropy()?this.getProgresseBarStyle(this.props.entropy):null})))}}PasswordComplexity.defaultProps={entropy:null},PasswordComplexity.propTypes={entropy:prop_types__WEBPACK_IMPORTED_MODULE_5___default().number,error:prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(PasswordComplexity);PasswordComplexity.__docgenInfo={description:"This component represents a password complexity with the strength, an entropy and a bar",methods:[{name:"entropy",docblock:"Get the entropy value formatted for display.\n@returns {number}",modifiers:["get"],params:[],returns:{type:{name:"number"}},description:"Get the entropy value formatted for display."},{name:"tooltipMessage",docblock:"Get the translated tooltip message.\n@returns {JSX}",modifiers:["get"],params:[],returns:{type:{name:"JSX"}},description:"Get the translated tooltip message."},{name:"passwordStrengthLabel",docblock:"Get the password strength label to display based on the actual entropy or error state.\n@returns {JSX};",modifiers:["get"],params:[],returns:{description:";",type:{name:"JSX"}},description:"Get the password strength label to display based on the actual entropy or error state."},{name:"hasEntropy",docblock:"Has entropy\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has entropy"},{name:"hasError",docblock:"Has error\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has error"},{name:"getProgresseBarStyle",docblock:"Get the dynamic part style of the entropy progression bar.\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Get the dynamic part style of the entropy progression bar."},{name:"colorGradient",docblock:"Get the rgb color at a specific position in percentage\n@param {number} fadeFraction The fade fraction\n@returns {string} the color in rgb(0,0,0)",modifiers:[],params:[{name:"fadeFraction",description:"The fade fraction",type:{name:"number"},optional:!1}],returns:{description:"the color in rgb(0,0,0)",type:{name:"string"}},description:"Get the rgb color at a specific position in percentage"},{name:"getRelativeEntropyPosition",docblock:"Return a percentage value matching the position of the given entropy compared to the full value possible.\n@returns {number}",modifiers:[],params:[],returns:{type:{name:"number"}},description:"Return a percentage value matching the position of the given entropy compared to the full value possible."}],displayName:"PasswordComplexity",props:{entropy:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"number"},required:!1},error:{description:"",type:{name:"bool"},required:!1}}}}}]);