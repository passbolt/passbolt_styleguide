/*! For license information please see shared-components-GeneratePassword-ConfigurePassphraseGenerator-test-stories.f380b5cc.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[5051],{"./src/shared/components/GeneratePassword/ConfigurePassphraseGenerator.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ConfigurePassphraseGenerator_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),ConfigurePassphraseGenerator=__webpack_require__("./src/shared/components/GeneratePassword/ConfigurePassphraseGenerator.js"),PassphraseGeneratorSettingsDto_test_data=__webpack_require__("./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js");const ConfigurePassphraseGenerator_test_stories={title:"Components/ResourcePassword/ConfigurePassphraseGenerator",component:ConfigurePassphraseGenerator.A},Initial=(args=>react.createElement(react_router.MemoryRouter,{initialEntries:["/"]},react.createElement(react_router.Route,{component:routerProps=>react.createElement(ConfigurePassphraseGenerator.A,{...args,...routerProps})}))).bind({});Initial.args=function defaultProps(props={}){const configuration=props?.configuration?Object.assign({},props.configuration):(0,PassphraseGeneratorSettingsDto_test_data.N)();return{configuration,onConfigurationChanged:jest.fn((newConfiguration=>{Object.entries(newConfiguration).forEach((([fieldName])=>{configuration[fieldName]=newConfiguration[fieldName]}))}))}}();const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <ConfigurePassphraseGenerator {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...Initial.parameters?.docs?.source}}}},"./src/shared/components/GeneratePassword/ConfigurePassphraseGenerator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_react_extension_components_Common_Select_Select__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Select/Select.js");class ConfigurePassphraseGenerator extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.initEventHandlers()}initEventHandlers(){this.handleInputChange=this.handleInputChange.bind(this),this.handleWordCountChange=this.handleWordCountChange.bind(this)}handleInputChange(event){const target=event.target,value=target.value,name=target.name,configuration={...this.props.configuration};configuration[name]=value,this.props.onConfigurationChanged(configuration)}handleWordCountChange(event){const configuration={...this.props.configuration,words:event.target.value};this.props.onConfigurationChanged(configuration)}get numberOfWords(){const config=this.props.configuration;return{default:config.words,min:config.min_words,max:config.max_words}}get separator(){return this.props.configuration.word_separator}get wordCase(){return this.props.configuration.word_case}get wordCaseList(){return[{value:"lowercase",label:this.translate("Lower case")},{value:"uppercase",label:this.translate("Upper case")},{value:"camelcase",label:this.translate("Camel case")}]}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input text "+(this.props.disabled?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"configure-passphrase-generator-form-word-count"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Number of words")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"slider"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{name:"words",min:this.numberOfWords.min,max:this.numberOfWords.max,value:this.numberOfWords.default,type:"range",onChange:this.handleInputChange,disabled:this.props.disabled}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{type:"number",id:"configure-passphrase-generator-form-word-count",name:"words",min:this.numberOfWords.min,max:this.numberOfWords.max,value:this.numberOfWords.default,onChange:this.handleWordCountChange,disabled:this.props.disabled}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input text "+(this.props.disabled?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"configure-passphrase-generator-form-words-separator"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Words separator")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{type:"text",id:"configure-passphrase-generator-form-words-separator",name:"word_separator",value:this.separator,onChange:this.handleInputChange,placeholder:this.translate("Type one or more characters"),disabled:this.props.disabled})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"select-wrapper input "+(this.props.disabled?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"configure-passphrase-generator-form-words-case"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Words case")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Select_Select__WEBPACK_IMPORTED_MODULE_2__.A,{id:"configure-passphrase-generator-form-words-case",name:"word_case",items:this.wordCaseList,value:this.wordCase,onChange:this.handleInputChange,disabled:this.props.disabled})))}}ConfigurePassphraseGenerator.propTypes={configuration:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object.isRequired,onConfigurationChanged:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,t:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(ConfigurePassphraseGenerator);ConfigurePassphraseGenerator.__docgenInfo={description:"",methods:[{name:"initEventHandlers",docblock:null,modifiers:[],params:[],returns:null},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handleWordCountChange",docblock:"Handle form word count input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form word count input change."},{name:"numberOfWords",docblock:"Returns the current number of words option\n@return {{default: number, min: number, max: number}}",modifiers:["get"],params:[],returns:{},description:"Returns the current number of words option"},{name:"separator",docblock:"Returns the current separator option\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Returns the current separator option"},{name:"wordCase",docblock:"Returns the current word case option\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Returns the current word case option"},{name:"wordCaseList",docblock:"Get word case list\n@returns {Array<{label: string, value: string}>}",modifiers:["get"],params:[],returns:{type:{name:"Array",elements:[]}},description:"Get word case list"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"ConfigurePassphraseGenerator",props:{configuration:{description:"",type:{name:"object"},required:!0},onConfigurationChanged:{description:"",type:{name:"func"},required:!0},disabled:{description:"",type:{name:"bool"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>defaultPassphraseGeneratorSettingsDto});const defaultPassphraseGeneratorSettingsDto=(data={})=>({words:9,word_separator:" ",word_case:"lowercase",...data})}}]);