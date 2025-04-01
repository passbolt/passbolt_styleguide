/*! For license information please see 7530.9346b706.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7530],{"./src/img/svg/info.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgInfo(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:17,height:18,fill:"none",viewBox:"0 0 17 18"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M8.5 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15M8.5 12V9M8.5 6h.008"})))}},"./src/react-extension/components/Common/Tooltip/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Tooltip extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"tooltip",tabIndex:"0"},this.props.children,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:`tooltip-text ${this.props.direction}`},this.props.message))}}Tooltip.defaultProps={direction:"right"},Tooltip.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any,message:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any.isRequired,direction:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string};const __WEBPACK_DEFAULT_EXPORT__=Tooltip;Tooltip.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{direction:{defaultValue:{value:"'right'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"any"},required:!1},message:{description:"",type:{name:"any"},required:!0}}}},"./src/react-quickaccess/contexts/PrepareResourceContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N5:()=>withPrepareResourceContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const PrepareResourceContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({settings:null,lastGeneratedPassword:null,resourcePrepared:null,onPrepareResource:()=>{},onPasswordGenerated:()=>{},getSettings:()=>{},consumeLastGeneratedPassword:()=>{},consumePreparedResource:()=>{},resetSecretGeneratorSettings:()=>{}});class PrepareResourceContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{settings:null,lastGeneratedPassword:null,resourcePrepared:null,getSettings:this.getSettings.bind(this),onPrepareResource:this.onPrepareResource.bind(this),onPasswordGenerated:this.onPasswordGenerated.bind(this),consumeLastGeneratedPassword:this.consumeLastGeneratedPassword.bind(this),consumePreparedResource:this.consumePreparedResource.bind(this),resetSecretGeneratorSettings:this.resetSecretGeneratorSettings.bind(this)}}componentDidMount(){this.resetSecretGeneratorSettings()}async resetSecretGeneratorSettings(){await this.props.passwordPoliciesContext.findPolicies();const passwordPolicies=this.props.passwordPoliciesContext.getPolicies();this.setState({settings:passwordPolicies})}onPasswordGenerated(newPassword,newGeneratorSettings){this.setState({lastGeneratedPassword:newPassword,settings:newGeneratorSettings})}onPrepareResource(resource){this.setState({resourcePrepared:resource})}getSettings(){return this.state.settings}consumeLastGeneratedPassword(){const lastGeneratedPassword=this.state.lastGeneratedPassword;return this.setState({lastGeneratedPassword:null}),lastGeneratedPassword}consumePreparedResource(){const resourcePrepared=this.state.resourcePrepared;return this.setState({resourcePrepared:null}),resourcePrepared}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrepareResourceContext.Provider,{value:this.state},this.props.children)}}PrepareResourceContextProvider.displayName="PrepareResourceContextProvider",PrepareResourceContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,passwordPoliciesContext:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any};(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__.L)((0,_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_1__.WJ)(PrepareResourceContextProvider));function withPrepareResourceContext(WrappedComponent){return class WithPrepareResource extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrepareResourceContext.Consumer,null,(PrepareResourceContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{prepareResourceContext:PrepareResourceContext,...this.props})))}}}PrepareResourceContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"resetSecretGeneratorSettings",docblock:"Initialize the secret generator settings.\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Initialize the secret generator settings."},{name:"onPasswordGenerated",docblock:"Whenever a password has been generated with the generator\n@param password The generated password",modifiers:[],params:[{name:"newPassword",optional:!1},{name:"newGeneratorSettings",optional:!1}],returns:null,description:"Whenever a password has been generated with the generator"},{name:"onPrepareResource",docblock:"Whenever a resource has been prepared by the user\n@param resource The prepared resource",modifiers:[],params:[{name:"resource",description:"The prepared resource",optional:!1}],returns:null,description:"Whenever a resource has been prepared by the user"},{name:"getSettings",docblock:"Get the settings of the password generator\n@returns {Object}",modifiers:[],params:[],returns:{type:{name:"Object"}},description:"Get the settings of the password generator"},{name:"consumeLastGeneratedPassword",docblock:"Get the last generated password\n@returns {string|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"string"}]}},description:"Get the last generated password"},{name:"consumePreparedResource",docblock:"Consume the prepared resource\n@returns {Object|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"Object"}]}},description:"Consume the prepared resource"}],displayName:"PrepareResourceContextProvider",props:{context:{description:"",type:{name:"object"},required:!1},passwordPoliciesContext:{description:"",type:{name:"object"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-quickaccess/contexts/PrepareResourceContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>defaultPrepareResourceContext});var _shared_models_passwordPolicies_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js"),_shared_models_passwordPolicies_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data.js"),_shared_models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/passwordPolicies/PasswordPoliciesDto.test.data.js");const defaultPrepareResourceContext=(data={})=>{const defaultData={getSettings:()=>(0,_shared_models_passwordPolicies_PasswordPoliciesDto_test_data__WEBPACK_IMPORTED_MODULE_0__.n)({password_generator_settings:(0,_shared_models_passwordPolicies_PasswordGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_1__._)({min_length:8,max_length:128}),passphrase_generator_settings:(0,_shared_models_passwordPolicies_PassphraseGeneratorSettingsDto_test_data__WEBPACK_IMPORTED_MODULE_2__.N)({min_words:4,max_words:40})}),onPrepareResource:jest.fn(),onPasswordGenerated:jest.fn(),consumeLastGeneratedPassword:jest.fn((()=>"aBcD10-é??????????")),consumePreparedResource:jest.fn(),resetSecretGeneratorSettings:jest.fn()};return Object.assign(defaultData,data)}},"./src/shared/components/PasswordComplexity/PasswordComplexity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/lib/SecretGenerator/SecretGeneratorComplexity.js"),_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Tooltip/Tooltip.js"),_img_svg_info_svg__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/img/svg/info.svg");const COLOR_GRADIENT={COLOR_1:hexToRgb("#BA2809"),COLOR_2:hexToRgb("#FFA724"),COLOR_3:hexToRgb("#0EAA00")};function hexToRgb(hex){const result=new RegExp("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$","i").exec(hex.trim());if(result){return{red:parseInt(result[1],16),green:parseInt(result[2],16),blue:parseInt(result[3],16)}}return null}class PasswordComplexity extends react__WEBPACK_IMPORTED_MODULE_0__.Component{get entropy(){return(this.props.entropy||0).toFixed(1)}get tooltipMessage(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Entropy:")," ",this.entropy," bits")}get passwordStrengthLabel(){if(!(this.hasEntropy()||this.hasError()))return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Quality");const strength=_lib_SecretGenerator_SecretGeneratorComplexity__WEBPACK_IMPORTED_MODULE_2__.CH.strength(this.props.entropy);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,strength.label)}hasEntropy(){return null!==this.props.entropy&&void 0!==this.props.entropy}hasError(){return this.props.error}getProgresseBarStyle(){const relativePositionForEntropy=this.getRelativeEntropyPosition();return{width:`${relativePositionForEntropy}%`,backgroundColor:this.colorGradient(relativePositionForEntropy)}}colorGradient(fadeFraction){let rgbColor1,rgbColor2,fade=fadeFraction/100*2;fade>=1?(fade-=1,rgbColor1=COLOR_GRADIENT.COLOR_2,rgbColor2=COLOR_GRADIENT.COLOR_3):(rgbColor1=COLOR_GRADIENT.COLOR_1,rgbColor2=COLOR_GRADIENT.COLOR_2);return`rgb(${Math.floor(rgbColor1.red+(rgbColor2.red-rgbColor1.red)*fade)},${Math.floor(rgbColor1.green+(rgbColor2.green-rgbColor1.green)*fade)},${Math.floor(rgbColor1.blue+(rgbColor2.blue-rgbColor1.blue)*fade)})`}getRelativeEntropyPosition(){return 100-99/(1+Math.pow(this.props.entropy/90,10))}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"password-complexity"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"complexity-text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_3__.A,{message:this.tooltipMessage},this.passwordStrengthLabel," ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_info_svg__WEBPACK_IMPORTED_MODULE_4__.A,null))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar background"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar foreground "+(this.hasError()?"error":""),style:this.hasEntropy()?this.getProgresseBarStyle(this.props.entropy):null})))}}PasswordComplexity.defaultProps={entropy:null},PasswordComplexity.propTypes={entropy:prop_types__WEBPACK_IMPORTED_MODULE_5___default().number,error:prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(PasswordComplexity);PasswordComplexity.__docgenInfo={description:"This component represents a password complexity with the strength, an entropy and a bar",methods:[{name:"entropy",docblock:"Get the entropy value formatted for display.\n@returns {number}",modifiers:["get"],params:[],returns:{type:{name:"number"}},description:"Get the entropy value formatted for display."},{name:"tooltipMessage",docblock:"Get the translated tooltip message.\n@returns {JSX}",modifiers:["get"],params:[],returns:{type:{name:"JSX"}},description:"Get the translated tooltip message."},{name:"passwordStrengthLabel",docblock:"Get the password strength label to display based on the actual entropy or error state.\n@returns {JSX};",modifiers:["get"],params:[],returns:{description:";",type:{name:"JSX"}},description:"Get the password strength label to display based on the actual entropy or error state."},{name:"hasEntropy",docblock:"Has entropy\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has entropy"},{name:"hasError",docblock:"Has error\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has error"},{name:"getProgresseBarStyle",docblock:"Get the dynamic part style of the entropy progression bar.\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Get the dynamic part style of the entropy progression bar."},{name:"colorGradient",docblock:"Get the rgb color at a specific position in percentage\n@param {number} fadeFraction The fade fraction\n@returns {string} the color in rgb(0,0,0)",modifiers:[],params:[{name:"fadeFraction",description:"The fade fraction",type:{name:"number"},optional:!1}],returns:{description:"the color in rgb(0,0,0)",type:{name:"string"}},description:"Get the rgb color at a specific position in percentage"},{name:"getRelativeEntropyPosition",docblock:"Return a percentage value matching the position of the given entropy compared to the full value possible.\n@returns {number}",modifiers:[],params:[],returns:{type:{name:"number"}},description:"Return a percentage value matching the position of the given entropy compared to the full value possible."}],displayName:"PasswordComplexity",props:{entropy:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"number"},required:!1},error:{description:"",type:{name:"bool"},required:!1}}}}}]);