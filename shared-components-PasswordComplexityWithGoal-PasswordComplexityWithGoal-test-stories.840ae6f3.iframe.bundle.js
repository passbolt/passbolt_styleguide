/*! For license information please see shared-components-PasswordComplexityWithGoal-PasswordComplexityWithGoal-test-stories.840ae6f3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3884],{"./src/shared/components/PasswordComplexityWithGoal/PasswordComplexityWithGoal.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Foundations/PasswordComplexityWithGoal",component:__webpack_require__("./src/shared/components/PasswordComplexityWithGoal/PasswordComplexityWithGoal.js").A},Default={args:{targetEntropy:112,entropy:87.5,error:!1}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    targetEntropy: 112,\n    entropy: 87.5,\n    error: false\n  }\n}",...Default.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/shared/components/PasswordComplexityWithGoal/PasswordComplexityWithGoal.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/lib/SecretGenerator/SecretGeneratorComplexity.js"),_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js"),_Icons_Icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/components/Icons/Icon.js");class PasswordComplexityWithGoal extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent{static getRelativeEntropyPosition(entropyValue){return 100-99/(1+Math.pow(entropyValue/90,3))}formatEntropy(entropy){return(entropy=entropy||0).toFixed(1)}get relativeTargetEntropyRatio(){return PasswordComplexityWithGoal.getRelativeEntropyPosition(this.props.targetEntropy)}get targetEntropyPositionStyle(){return{left:`calc(${this.relativeTargetEntropyRatio}% - 0.6rem`}}get colorClassName(){if(!this.hasEntropy())return"";return this.props.entropy>=this.props.targetEntropy?"reached":this.props.isMinimumEntropyRequired?"required":"recommended"}get targetTooltipMessage(){return this.props.isMinimumEntropyRequired?this.props.t("Minimal requirement"):this.props.t("Minimal recommendation")}get currentEntropyTooltipMessage(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Entropy: ",this.formatEntropy(this.props.entropy)," / ",this.formatEntropy(this.props.targetEntropy)," bits"))}get passwordStrengthLabel(){if(!(this.hasEntropy()||this.hasError()))return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Quality");const strength=_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__.CH.strength(this.props.entropy);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,strength.label)}getProgresseBarStyle(entropy){return{width:`${PasswordComplexityWithGoal.getRelativeEntropyPosition(entropy)}%`}}hasEntropy(){return null!==this.props.entropy&&void 0!==this.props.entropy}hasError(){return this.props.error}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"password-complexity with-goal"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"complexity-text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__.A,{message:this.currentEntropyTooltipMessage},this.passwordStrengthLabel," ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icons_Icon__WEBPACK_IMPORTED_MODULE_4__.A,{name:"info-circle"}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar background"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`progress-bar target ${this.colorClassName}`,style:this.hasEntropy()?this.getProgresseBarStyle(this.props.targetEntropy):null}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`progress-bar foreground ${this.colorClassName}`,style:this.hasEntropy()?this.getProgresseBarStyle(this.props.entropy):null}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`target-entropy ${this.colorClassName}`,style:this.targetEntropyPositionStyle},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__.A,{message:this.targetTooltipMessage},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"tooltip-anchor"})))))}}PasswordComplexityWithGoal.defaultProps={isMinimumEntropyRequired:!0},PasswordComplexityWithGoal.propTypes={targetEntropy:prop_types__WEBPACK_IMPORTED_MODULE_5___default().number.isRequired,isMinimumEntropyRequired:prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool.isRequired,entropy:prop_types__WEBPACK_IMPORTED_MODULE_5___default().number,error:prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool,t:prop_types__WEBPACK_IMPORTED_MODULE_5___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(PasswordComplexityWithGoal);PasswordComplexityWithGoal.__docgenInfo={description:"This component represents a password complexity with the strength and a goal, an entropy and a bar",methods:[{name:"getRelativeEntropyPosition",docblock:"Return a percentage value matching the position of the given entropy compared to the full value possible.\n@param {number} entropyValue\n@returns {number}",modifiers:["static"],params:[{name:"entropyValue",type:{name:"number"},optional:!1}],returns:{type:{name:"number"}},description:"Return a percentage value matching the position of the given entropy compared to the full value possible."},{name:"formatEntropy",docblock:"Get a formatted entropy value to display.\n@param {number} entropy\n@returns {number}",modifiers:[],params:[{name:"entropy",type:{name:"number"},optional:!1}],returns:{type:{name:"number"}},description:"Get a formatted entropy value to display."},{name:"relativeTargetEntropyRatio",docblock:"Get the representative percentage of the targetted entropy compared to the full available entropy\n@returns {number}",modifiers:["get"],params:[],returns:{type:{name:"number"}},description:"Get the representative percentage of the targetted entropy compared to the full available entropy"},{name:"targetEntropyPositionStyle",docblock:"Get the dynamic style of the target entropy cursors.\n@return {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get the dynamic style of the target entropy cursors."},{name:"colorClassName",docblock:"Get the class to set on the different markers.\n@returns {'reached' | 'required' | 'recommended' | ''}",modifiers:["get"],params:[],returns:{type:{name:"union",elements:[]}},description:"Get the class to set on the different markers."},{name:"targetTooltipMessage",docblock:"Get the translated message for the target tooltip\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the translated message for the target tooltip"},{name:"currentEntropyTooltipMessage",docblock:"Get the message for the current entropy tooltip\n@returns {JSX}",modifiers:["get"],params:[],returns:{type:{name:"JSX"}},description:"Get the message for the current entropy tooltip"},{name:"passwordStrengthLabel",docblock:"Get the password strength label to display based on the actual entropy or error state.\n@returns {JSX};",modifiers:["get"],params:[],returns:{description:";",type:{name:"JSX"}},description:"Get the password strength label to display based on the actual entropy or error state."},{name:"getProgresseBarStyle",docblock:"Get the dynamic part style of the entropy progression bar.\n@param {number} entropy\n@returns {object}",modifiers:[],params:[{name:"entropy",type:{name:"number"},optional:!1}],returns:{type:{name:"object"}},description:"Get the dynamic part style of the entropy progression bar."},{name:"hasEntropy",docblock:"Has entropy\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has entropy"},{name:"hasError",docblock:"Has error\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has error"}],displayName:"PasswordComplexityWithGoal",props:{isMinimumEntropyRequired:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},targetEntropy:{description:"",type:{name:"number"},required:!0},entropy:{description:"",type:{name:"number"},required:!1},error:{description:"",type:{name:"bool"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}}}]);