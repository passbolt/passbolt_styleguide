/*! For license information please see react-extension-components-MFA-DisplayMfaProviderConfiguration-DisplayMfaProviderConfiguration-test-stories.d28e26c4.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[1969],{"./src/react-extension/components/MFA/DisplayMfaProviderConfiguration/DisplayMfaProviderConfiguration.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Duo:()=>Duo,Totp:()=>Totp,Yubikey:()=>Yubikey,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayMfaProviderConfiguration_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),MockTranslationProvider=__webpack_require__("./src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider.js"),MFAContext=__webpack_require__("./src/react-extension/contexts/MFAContext.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),MfaProviders_data=__webpack_require__("./src/react-extension/components/MFA/DisplayProviderList/MfaProviders.data.js"),luxon=__webpack_require__("./node_modules/luxon/src/luxon.js");class DisplayMfaProviderConfiguration extends react.Component{constructor(props){super(props),this.bindCallbacks(),this.state=this.defaultState}formatDate(date){return luxon.c9.fromJSDate(new Date(date)).setLocale(this.props.context.locale).toLocaleString(luxon.c9.DATETIME_FULL)}async componentDidMount(){const verification=await this.props.context.port.request("passbolt.mfa-setup.verify-provider",{provider:this.props.mfaContext.provider}),formatedDate=this.formatDate(verification?.verified);this.setState({verifiedDate:formatedDate})}get defaultState(){return{verifiedDate:null}}bindCallbacks(){this.handleCancelClick=this.handleCancelClick.bind(this),this.handleDeleteClick=this.handleDeleteClick.bind(this)}getProvider(){return MfaProviders_data.A.find((mfaProvider=>mfaProvider.id===this.props.mfaContext.provider))}handleCancelClick(){this.props.mfaContext.goToProviderList()}async handleDeleteClick(){await this.props.mfaContext.removeProvider(),this.props.mfaContext.goToProviderList()}get isProcessing(){return this.props.mfaContext.isProcessing()}get title(){return this.props.t(this.getProvider().configuration.title)}get description(){return this.props.t(this.getProvider().configuration.description)}render(){return react.createElement("div",{className:"grid grid-responsive-12"},react.createElement("div",{className:"row mfa-configuration"},react.createElement("div",{className:"col7 main-column"},react.createElement("h3",null,this.title),react.createElement("div",{className:"feedback-card"},react.createElement("div",{className:"illustration icon-feedback"},react.createElement("div",{className:"success"})),react.createElement("div",{className:"additional-information"},react.createElement("p",null,this.description),this.state.verifiedDate&&react.createElement("p",{className:"created date"},this.state.verifiedDate),react.createElement("button",{onClick:this.handleDeleteClick,disabled:this.isProcessing,className:"button warning",role:"button"},"Turn off"))),react.createElement("div",{className:"actions-wrapper",onClick:this.handleCancelClick},react.createElement("button",{className:"button cancel",disabled:this.isProcessing},"Manage providers")))))}}DisplayMfaProviderConfiguration.propTypes={context:prop_types_default().object,t:prop_types_default().func,mfaContext:prop_types_default().object};const DisplayMfaProviderConfiguration_DisplayMfaProviderConfiguration=(0,AppContext.L)((0,MFAContext.dg)((0,es.CI)("common")(DisplayMfaProviderConfiguration)));DisplayMfaProviderConfiguration.__docgenInfo={description:"This component will display the configuration for the mfa provider",methods:[{name:"formatDate",docblock:"Format date\n@param {string} date The date to format\n@return {string}",modifiers:[],params:[{name:"date",description:"The date to format",type:{name:"string"},optional:!1}],returns:{type:{name:"string"}},description:"Format date"},{name:"defaultState",docblock:"Returns the component default state",modifiers:["get"],params:[],returns:null,description:"Returns the component default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"getProvider",docblock:"Return the provider",modifiers:[],params:[],returns:null,description:"Return the provider"},{name:"handleCancelClick",docblock:"handle the cancelation when setup the provider",modifiers:[],params:[],returns:null,description:"handle the cancelation when setup the provider"},{name:"handleDeleteClick",docblock:"handle the remove mfa provider click",modifiers:["async"],params:[],returns:null,description:"handle the remove mfa provider click"},{name:"isProcessing",docblock:"Check to disable button and input when context is processing an action",modifiers:["get"],params:[],returns:null,description:"Check to disable button and input when context is processing an action"},{name:"title",docblock:"Return the title for the provider",modifiers:["get"],params:[],returns:null,description:"Return the title for the provider"},{name:"description",docblock:"Return the description for the provider",modifiers:["get"],params:[],returns:null,description:"Return the description for the provider"}],displayName:"DisplayMfaProviderConfiguration",props:{context:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1},mfaContext:{description:"",type:{name:"object"},required:!1}}};var DisplayProviderList_test_data=__webpack_require__("./src/react-extension/components/MFA/DisplayProviderList/DisplayProviderList.test.data.js");function propsMfaWithProvider(provider){return(0,DisplayProviderList_test_data.Gs)({mfaContext:{provider,goToProviderList:jest.fn(),removeProvider:jest.fn()}})}const DisplayMfaProviderConfiguration_test_stories={title:"Components/MFA/DisplayMfaProviderConfiguration",component:DisplayMfaProviderConfiguration_DisplayMfaProviderConfiguration},Template=args=>react.createElement(MFAContext.N8,args,react.createElement(MockTranslationProvider.A,null,react.createElement("div",{className:"panel middle"},react.createElement("div",{className:"grid grid-responsive-12"},react.createElement(DisplayMfaProviderConfiguration_DisplayMfaProviderConfiguration,args)))),";"),Totp=Template.bind({});Totp.args=propsMfaWithProvider(MFAContext.bb.TOTP);const Yubikey=Template.bind({});Yubikey.args=propsMfaWithProvider(MFAContext.bb.YUBIKEY);const Duo=Template.bind({});Duo.args=propsMfaWithProvider(MFAContext.bb.DUO);const __namedExportsOrder=["Totp","Yubikey","Duo"];Totp.parameters={...Totp.parameters,docs:{...Totp.parameters?.docs,source:{originalSource:'args => <MfaContextProvider {...args}>\n    <MockTranslationProvider>\n      <div className="panel middle">\n        <div className="grid grid-responsive-12">\n          <DisplayMfaProviderConfiguration {...args} />\n        </div>\n      </div>\n    </MockTranslationProvider>;\n  </MfaContextProvider>',...Totp.parameters?.docs?.source}}},Yubikey.parameters={...Yubikey.parameters,docs:{...Yubikey.parameters?.docs,source:{originalSource:'args => <MfaContextProvider {...args}>\n    <MockTranslationProvider>\n      <div className="panel middle">\n        <div className="grid grid-responsive-12">\n          <DisplayMfaProviderConfiguration {...args} />\n        </div>\n      </div>\n    </MockTranslationProvider>;\n  </MfaContextProvider>',...Yubikey.parameters?.docs?.source}}},Duo.parameters={...Duo.parameters,docs:{...Duo.parameters?.docs,source:{originalSource:'args => <MfaContextProvider {...args}>\n    <MockTranslationProvider>\n      <div className="panel middle">\n        <div className="grid grid-responsive-12">\n          <DisplayMfaProviderConfiguration {...args} />\n        </div>\n      </div>\n    </MockTranslationProvider>;\n  </MfaContextProvider>',...Duo.parameters?.docs?.source}}}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entity.js");class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};constructor(dtos={},options={}){super(dtos,options),this.marshall();(options?.validate??!0)&&(this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules))}marshall(){}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity}}]);