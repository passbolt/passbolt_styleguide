/*! For license information please see 4741.9661069f.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4741],{"./src/shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,mw:()=>withMetadataTypesSettingsLocalStorage});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_models_entity_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js");const MetadataTypesSettingsLocalStorageContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({get:()=>{},metadataTypeSettings:null,updateLocalStorage:()=>{}});class MetadataTypesSettingsLocalStorageContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.runningLocalStorageUpdatePromise=null,this.initEventHandlers()}get defaultState(){return{get:this.get.bind(this),metadataTypeSettings:null,updateLocalStorage:this.updateLocalStorage.bind(this)}}initEventHandlers(){this.handleStorageChange=this.handleStorageChange.bind(this)}componentDidMount(){this.props.context.storage.onChanged.addListener(this.handleStorageChange)}componentWillUnmount(){this.props.context.storage.onChanged.removeListener(this.handleStorageChange)}handleStorageChange(changes){changes[this.storageKey]&&this.set(changes[this.storageKey].newValue)}set(metadataTypeSettings){const metadataTypeSettingsCollection=new _models_entity_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_2__.Ay(metadataTypeSettings);this.setState({metadataTypeSettings:metadataTypeSettingsCollection})}get(){return null===this.state.metadataTypeSettings?(this.loadLocalStorage(),null):this.state.metadataTypeSettings}get storageKey(){return`metadata_types_settings-${this.props.context.account?.id}`}async loadLocalStorage(){const storageData=await this.props.context.storage.local.get([this.storageKey]);storageData[this.storageKey]?this.set(storageData[this.storageKey]):this.updateLocalStorage()}async updateLocalStorage(){null===this.runningLocalStorageUpdatePromise?(this.runningLocalStorageUpdatePromise=this.props.context.port.request("passbolt.metadata.get-or-find-metadata-types-settings"),await this.runningLocalStorageUpdatePromise,this.runningLocalStorageUpdatePromise=null):await this.runningLocalStorageUpdatePromise}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(MetadataTypesSettingsLocalStorageContext.Provider,{value:this.state},this.props.children)}}MetadataTypesSettingsLocalStorageContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)(MetadataTypesSettingsLocalStorageContextProvider);function withMetadataTypesSettingsLocalStorage(WrappedComponent){return class withMetadataTypesSettingsTypesLocalStorage extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(MetadataTypesSettingsLocalStorageContext.Consumer,null,(metadataTypeSettingsLocalStorageContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{metadataTypeSettingsLocalStorageContext,metadataTypeSettings:metadataTypeSettingsLocalStorageContext.get(),...this.props})))}}}MetadataTypesSettingsLocalStorageContextProvider.__docgenInfo={description:"The metadata type settings local storage context provider",methods:[{name:"defaultState",docblock:"Returns the default component state\n@returns {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Returns the default component state"},{name:"initEventHandlers",docblock:"Initialize the component event handlers",modifiers:[],params:[],returns:null,description:"Initialize the component event handlers"},{name:"handleStorageChange",docblock:"Handles update of the metadata type settings in the local storage.",modifiers:[],params:[{name:"changes",optional:!1}],returns:null,description:"Handles update of the metadata type settings in the local storage."},{name:"set",docblock:"Set metadataTypeSettings.\n@param {Object} metadataTypeSettings The metadata type settings to set.\n@private",modifiers:[],params:[{name:"metadataTypeSettings",description:"The metadata type settings to set.",type:{name:"Object"},optional:!1}],returns:null,description:"Set metadataTypeSettings."},{name:"get",docblock:"Get the metadata type settings from the local storage and/or init them if not the case already.\n@returns {MetadataTypesSettingsEntity|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"MetadataTypesSettingsEntity"}]}},description:"Get the metadata type settings from the local storage and/or init them if not the case already."},{name:"storageKey",docblock:"Get the storage key.\n@returns {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the storage key."},{name:"loadLocalStorage",docblock:"Load the metadata type settings from the local storage if it is available.\nIf the local storage is not yet initialised, then it asks for its initialisation.\n@returns {Promise<void>}\n@private",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Load the metadata type settings from the local storage if it is available.\nIf the local storage is not yet initialised, then it asks for its initialisation."},{name:"updateLocalStorage",docblock:"Forces the update of the metadata type settings in the local storage.\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Forces the update of the metadata type settings in the local storage."}],displayName:"MetadataTypesSettingsLocalStorageContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WJ:()=>withPasswordPolicies});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const PasswordPoliciesContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({policies:null,getPolicies:()=>{},findPolicies:()=>{},shouldRunDictionaryCheck:()=>{}});class PasswordPoliciesContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{policies:null,getPolicies:this.getPolicies.bind(this),findPolicies:this.findPolicies.bind(this),shouldRunDictionaryCheck:this.shouldRunDictionaryCheck.bind(this)}}async findPolicies(){if(null!==this.getPolicies())return;const policies=await this.props.context.port.request("passbolt.password-policies.get");this.setState({policies})}getPolicies(){return this.state.policies}shouldRunDictionaryCheck(){return Boolean(this.state.policies?.external_dictionary_check)}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PasswordPoliciesContext.Provider,{value:this.state},this.props.children)}}PasswordPoliciesContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any};(0,_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)(PasswordPoliciesContextProvider);function withPasswordPolicies(WrappedComponent){return class WithPasswordPolicies extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PasswordPoliciesContext.Consumer,null,(passwordPoliciesContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{passwordPoliciesContext,...this.props})))}}}PasswordPoliciesContextProvider.__docgenInfo={description:"The Password policies context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"findPolicies",docblock:"Find the password policies settings\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find the password policies settings"},{name:"getPolicies",docblock:"Returns the policies for password setting.\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Returns the policies for password setting."},{name:"shouldRunDictionaryCheck",docblock:"Returns true if the password policies allows external dictionary checks\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the password policies allows external dictionary checks"}],displayName:"PasswordPoliciesContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/models/resource/ResourceViewModelFactory.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>resource_ResourceViewModelFactory});var ResourcePasswordDescriptionTotpViewModel=__webpack_require__("./src/shared/models/resource/ResourcePasswordDescriptionTotpViewModel.js"),inputs_const=__webpack_require__("./src/shared/constants/inputs.const.js"),ResourceViewModel=__webpack_require__("./src/shared/models/resource/ResourceViewModel.js"),resourceTypeSchemasDefinition=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class ResourceV5DefaultTotpViewModel extends ResourceViewModel.A{constructor(resourceViewModel={}){super(resourceViewModel),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.totp=resourceViewModel.totp||null,this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,description:resourceDto.metadata.description,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourceV5DefaultTotpViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===ResourceViewModel.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:inputs_const.Dt},uri:{type:"string",maxLength:inputs_const.kW,nullable:!0},username:{type:"string",maxLength:inputs_const.E1,nullable:!0},password:{type:"string",maxLength:inputs_const.Bh},description:{type:"string",maxLength:inputs_const.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},totp:{type:"object"},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return resourceTypeSchemasDefinition.a5}updateSecret(secretDto){const resourceViewModel=this.cloneWithMutation("password",secretDto.password);return resourceViewModel.description=secretDto.description,resourceViewModel.totp=secretDto.totp,resourceViewModel}canToggleDescription(){return!1}isDescriptionUnencrypted(){return!1}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return{password:this.password,description:this.description,totp:this.totp,resource_type_id:this.resource_type_id}}areSecretsDifferent(originalSecretDto){const hasSameSecretStructure=3===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password")&&Object.hasOwn(originalSecretDto,"description")&&Object.hasOwn(originalSecretDto,"totp"),isTotpDifferent=Object.keys(this.totp).some((key=>this.totp[key]!==originalSecretDto.totp?.[key]));return!hasSameSecretStructure||this.password!==originalSecretDto.password||this.description!==originalSecretDto.description||isTotpDifferent}}const resource_ResourceV5DefaultTotpViewModel=ResourceV5DefaultTotpViewModel;var ResourcePasswordDescriptionViewModel=__webpack_require__("./src/shared/models/resource/ResourcePasswordDescriptionViewModel.js");class ResourceV5DefaultViewModel extends ResourceViewModel.A{constructor(resourceViewModel={}){super(resourceViewModel),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,description:resourceDto.metadata.description,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourceV5DefaultViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===ResourceViewModel.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:inputs_const.Dt},uri:{type:"string",maxLength:inputs_const.kW,nullable:!0},username:{type:"string",maxLength:inputs_const.E1,nullable:!0},password:{type:"string",maxLength:inputs_const.Bh},description:{type:"string",maxLength:inputs_const.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return resourceTypeSchemasDefinition.gG}updateSecret(secretDto){const resourceViewModel=this.cloneWithMutation("password",secretDto.password);return resourceViewModel.description=secretDto.description,resourceViewModel}canToggleDescription(){return!1}isDescriptionUnencrypted(){return!1}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return{password:this.password,description:this.description,resource_type_id:this.resource_type_id}}areSecretsDifferent(originalSecretDto){return!(2===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password")&&Object.hasOwn(originalSecretDto,"description"))||this.password!==originalSecretDto.password||this.description!==originalSecretDto.description}}const resource_ResourceV5DefaultViewModel=ResourceV5DefaultViewModel;var ResourcePasswordStringViewModel=__webpack_require__("./src/shared/models/resource/ResourcePasswordStringViewModel.js");class ResourceV5PasswordStringViewModel extends ResourceViewModel.A{constructor(resourceViewModel={}){super({}),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,description:resourceDto.metadata.description,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourceV5PasswordStringViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===ResourceViewModel.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:inputs_const.Dt},uri:{type:"string",maxLength:inputs_const.kW,nullable:!0},username:{type:"string",maxLength:inputs_const.E1,nullable:!0},password:{type:"string",maxLength:inputs_const.Bh},description:{type:"string",maxLength:inputs_const.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return resourceTypeSchemasDefinition.Eh}updateSecret(secretDto){return this.cloneWithMutation("password",secretDto.password)}canToggleDescription(){return!0}isDescriptionUnencrypted(){return!0}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username,description:this.description}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return this.password}areSecretsDifferent(originalSecretDto){return!(1===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password"))||this.password!==originalSecretDto.password}}const resource_ResourceV5PasswordStringViewModel=ResourceV5PasswordStringViewModel;const resource_ResourceViewModelFactory=class ResourceViewModelFactory{static createFromResourceTypeAndResourceViewModelDto(resourceType,dto){switch(resourceType?.slug){case ResourcePasswordDescriptionViewModel.A.resourceTypeSlug:return new ResourcePasswordDescriptionViewModel.A(dto);case ResourcePasswordDescriptionTotpViewModel.A.resourceTypeSlug:return new ResourcePasswordDescriptionTotpViewModel.A(dto);case resource_ResourceV5DefaultViewModel.resourceTypeSlug:return new resource_ResourceV5DefaultViewModel(dto);case resource_ResourceV5DefaultTotpViewModel.resourceTypeSlug:return new resource_ResourceV5DefaultTotpViewModel(dto);case ResourcePasswordStringViewModel.A.resourceTypeSlug:return new ResourcePasswordStringViewModel.A(dto);case resource_ResourceV5PasswordStringViewModel.resourceTypeSlug:return new resource_ResourceV5PasswordStringViewModel(dto);default:throw new Error("No ViewModel has been found for the resource type.")}}static createFromResourceTypeAndEntityDto(resourceType,resourceDto){switch(resourceType?.slug){case ResourcePasswordDescriptionViewModel.A.resourceTypeSlug:return ResourcePasswordDescriptionViewModel.A.createFromEntity(resourceDto);case ResourcePasswordDescriptionTotpViewModel.A.resourceTypeSlug:return ResourcePasswordDescriptionTotpViewModel.A.createFromEntity(resourceDto);case resource_ResourceV5DefaultViewModel.resourceTypeSlug:return resource_ResourceV5DefaultViewModel.createFromEntity(resourceDto);case resource_ResourceV5DefaultTotpViewModel.resourceTypeSlug:return resource_ResourceV5DefaultTotpViewModel.createFromEntity(resourceDto);case ResourcePasswordStringViewModel.A.resourceTypeSlug:return ResourcePasswordStringViewModel.A.createFromEntity(resourceDto);case resource_ResourceV5PasswordStringViewModel.resourceTypeSlug:return resource_ResourceV5PasswordStringViewModel.createFromEntity(resourceDto);default:throw new Error("No ViewModel has been found for the resource type.")}}}}}]);