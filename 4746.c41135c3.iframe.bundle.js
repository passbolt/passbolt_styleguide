/*! For license information please see 4746.c41135c3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4746],{"./src/react-extension/contexts/PasswordExpirySettingsContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f4:()=>withPasswordExpiry});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_utils_dateUtils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/utils/dateUtils.js"),luxon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/luxon/src/luxon.js");const PasswordExpirySettingsContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({getSettings:()=>{},getDefaultExpirationDate:()=>{},findSettings:()=>{},isFeatureEnabled:()=>{}});class PasswordExpirySettingsContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{settings:null,findSettings:this.findSettings.bind(this),getSettings:this.getSettings.bind(this),getDefaultExpirationDate:this.getDefaultExpirationDate.bind(this),isFeatureEnabled:this.isFeatureEnabled.bind(this)}}async findSettings(){if(!this.props.context.siteSettings.canIUse("passwordExpiry")||null!==this.getSettings())return;const settings=await this.props.context.port.request("passbolt.password-expiry.get-or-find");this.setState({settings})}getSettings(){return this.state.settings}getDefaultExpirationDate(){if(!this.props.context.siteSettings.canIUse("passwordExpiryPolicies"))return null;const settings=this.getSettings();if(!settings?.default_expiry_period)return null;const durationInDays=settings.default_expiry_period,expirationDate=luxon__WEBPACK_IMPORTED_MODULE_4__.c9.utc().plus({days:durationInDays});return(0,_shared_utils_dateUtils__WEBPACK_IMPORTED_MODULE_3__.B7)(expirationDate)}isFeatureEnabled(){const settings=this.getSettings();if(!this.props.context.siteSettings.canIUse("passwordExpiry")||!settings)return!1;return Boolean(settings.id)}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PasswordExpirySettingsContext.Provider,{value:this.state},this.props.children)}}PasswordExpirySettingsContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_5___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_5___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_5___default().any};(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(PasswordExpirySettingsContextProvider));function withPasswordExpiry(WrappedComponent){return class WithPasswordExpiry extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PasswordExpirySettingsContext.Consumer,null,(passwordExpiryContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{passwordExpiryContext,...this.props})))}}}PasswordExpirySettingsContextProvider.__docgenInfo={description:"The Password Expiry settings context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"findSettings",docblock:"Find the User Passphrase Policies\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find the User Passphrase Policies"},{name:"getSettings",docblock:"Get the User Passphrase Policies\n@return {Object}",modifiers:[],params:[],returns:{type:{name:"Object"}},description:"Get the User Passphrase Policies"},{name:"getDefaultExpirationDate",docblock:"Returns the expiry date based on the configuration if any.\n@returns {string|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"string"}]}},description:"Returns the expiry date based on the configuration if any."},{name:"isFeatureEnabled",docblock:"Returns true if the feature flag is enabled and the settings are set.\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the feature flag is enabled and the settings are set."}],displayName:"PasswordExpirySettingsContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"any"},required:!1}}}},"./src/react-quickaccess/components/ConfirmCreatePage/ConfirmCreatePage.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,_:()=>ConfirmCreatePageRuleVariations});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__),react_router_dom__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_PrepareResourceContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-quickaccess/contexts/PrepareResourceContext.js"),_react_extension_contexts_PasswordExpirySettingsContext__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/contexts/PasswordExpirySettingsContext.js"),_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.js"),_shared_context_ResourceTypesLocalStorageContext_ResourceTypesLocalStorageContext__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext.js"),_shared_models_entity_resourceType_resourceTypesCollection__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),_shared_models_entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");const ConfirmCreatePageRuleVariations={IN_DICTIONARY:"In dictionary",MINIMUM_ENTROPY:"Minimum entropy"};class ConfirmCreatePage extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent{constructor(props){super(props),this.state=this.getDefaultState(),this.initEventHandlers()}getDefaultState(){return{error:"",processing:!1}}initEventHandlers(){this.handleGoBackClick=this.handleGoBackClick.bind(this),this.handleConfirmClick=this.handleConfirmClick.bind(this)}handleGoBackClick(event){event.preventDefault();const additionalState={passwordInDictionary:this.props.location.state.rule===ConfirmCreatePageRuleVariations.IN_DICTIONARY};this.props.history.replace({pathname:"/webAccessibleResources/quickaccess/resources/create",state:additionalState}),this.props.history.goBack()}handleConfirmClick(event){event.preventDefault(),this.save()}async save(){const resourceTypeId=this.props.resourceTypes?.getFirstBySlug(_shared_models_entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_9__.Bo)?.id,preparedResource=this.props.prepareResourceContext.consumePreparedResource(),resourceDto={resource_type_id:resourceTypeId,metadata:{name:preparedResource.name,username:preparedResource.username,uris:[preparedResource.uri],resource_type_id:resourceTypeId,expired:this.props.passwordExpiryContext.getDefaultExpirationDate()}},secretDto={password:preparedResource.password,description:""};this.setState({processing:!0});try{const resource=await this.props.context.port.request("passbolt.resources.create",resourceDto,secretDto),goToComponentState={goBackEntriesCount:-3};this.props.prepareResourceContext.resetSecretGeneratorSettings(),this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`,goToComponentState)}catch(error){this.handleSubmitError(error)}}handleSubmitError(error){"UserAbortsOperationError"===error.name?this.setState({processing:!1}):this.setState({error:error.message,processing:!1})}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"confirm-create"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"back-link"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",{href:"#",className:"primary-action",onClick:this.handleGoBackClick,title:this.translate("Edit password")},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__.A,{name:"chevron-left"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"primary-action-title"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Confirm password creation"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",{href:"#",className:"secondary-action button-transparent button",onClick:this.handleGoBackClick,title:this.translate("Reject")},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__.A,{name:"close"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visually-hidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Reject")))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-container"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,{[ConfirmCreatePageRuleVariations.IN_DICTIONARY]:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"The password is part of an exposed data breach."),[ConfirmCreatePageRuleVariations.MINIMUM_ENTROPY]:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"The password is very weak and might be part of an exposed data breach.")}[this.props.location.state.rule]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Are you sure you want to create the resource ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,{resourceName:this.props.location.state.resourceName}),"?"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper input"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handleConfirmClick,className:"button primary attention big full-width "+(this.state.processing?"processing":""),role:"button",disabled:this.state.processing},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Proceed anyway"),this.state.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__.A,{name:"spinner"})),this.state.error&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"error-message"},this.state.error)))}}ConfirmCreatePage.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,prepareResourceContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,passwordExpiryContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().object,resourceTypes:prop_types__WEBPACK_IMPORTED_MODULE_10___default().instanceOf(_shared_models_entity_resourceType_resourceTypesCollection__WEBPACK_IMPORTED_MODULE_8__.A),match:prop_types__WEBPACK_IMPORTED_MODULE_10___default().object,location:prop_types__WEBPACK_IMPORTED_MODULE_10___default().object,history:prop_types__WEBPACK_IMPORTED_MODULE_10___default().object,t:prop_types__WEBPACK_IMPORTED_MODULE_10___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__.L)((0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.y)((0,_shared_context_ResourceTypesLocalStorageContext_ResourceTypesLocalStorageContext__WEBPACK_IMPORTED_MODULE_7__.KH)((0,_contexts_PrepareResourceContext__WEBPACK_IMPORTED_MODULE_4__.N5)((0,_react_extension_contexts_PasswordExpirySettingsContext__WEBPACK_IMPORTED_MODULE_5__.f4)((0,_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_6__.WJ)((0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(ConfirmCreatePage)))))));ConfirmCreatePage.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Get the default state\n@returns {object}",modifiers:[],params:[],returns:{type:{name:"object"}},description:"Get the default state"},{name:"initEventHandlers",docblock:"initialize event handlers\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"initialize event handlers"},{name:"handleGoBackClick",docblock:"Handles click on the `go back` button and cancel button\n@param {React.Event} event",modifiers:[],params:[{name:"event",type:{name:"React.Event"},optional:!1}],returns:null,description:"Handles click on the `go back` button and cancel button"},{name:"handleConfirmClick",docblock:'Handles the click on the "x" button\n@param {React.Event} event',modifiers:[],params:[{name:"event",type:{name:"React.Event"},optional:!1}],returns:null,description:'Handles the click on the "x" button'},{name:"save",docblock:"Save the resource\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Save the resource"},{name:"handleSubmitError",docblock:"Handles error during form submission\n@param {Error} error",modifiers:[],params:[{name:"error",type:{name:"Error"},optional:!1}],returns:null,description:"Handles error during form submission"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"ConfirmCreatePage",props:{context:{description:"",type:{name:"any"},required:!1},prepareResourceContext:{description:"",type:{name:"any"},required:!1},passwordExpiryContext:{description:"",type:{name:"object"},required:!1},resourceTypes:{description:"",type:{name:"instanceOf",value:"ResourceTypesCollection"},required:!1},match:{description:"",type:{name:"object"},required:!1},location:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-quickaccess/contexts/PrepareResourceContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N5:()=>withPrepareResourceContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const PrepareResourceContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({settings:null,lastGeneratedPassword:null,resourcePrepared:null,onPrepareResource:()=>{},onPasswordGenerated:()=>{},getSettings:()=>{},consumeLastGeneratedPassword:()=>{},consumePreparedResource:()=>{},resetSecretGeneratorSettings:()=>{}});class PrepareResourceContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{settings:null,lastGeneratedPassword:null,resourcePrepared:null,getSettings:this.getSettings.bind(this),onPrepareResource:this.onPrepareResource.bind(this),onPasswordGenerated:this.onPasswordGenerated.bind(this),consumeLastGeneratedPassword:this.consumeLastGeneratedPassword.bind(this),consumePreparedResource:this.consumePreparedResource.bind(this),resetSecretGeneratorSettings:this.resetSecretGeneratorSettings.bind(this)}}componentDidMount(){this.resetSecretGeneratorSettings()}async resetSecretGeneratorSettings(){await this.props.passwordPoliciesContext.findPolicies();const passwordPolicies=this.props.passwordPoliciesContext.getPolicies();this.setState({settings:passwordPolicies})}onPasswordGenerated(newPassword,newGeneratorSettings){this.setState({lastGeneratedPassword:newPassword,settings:newGeneratorSettings})}onPrepareResource(resource){this.setState({resourcePrepared:resource})}getSettings(){return this.state.settings}consumeLastGeneratedPassword(){const lastGeneratedPassword=this.state.lastGeneratedPassword;return this.setState({lastGeneratedPassword:null}),lastGeneratedPassword}consumePreparedResource(){const resourcePrepared=this.state.resourcePrepared;return this.setState({resourcePrepared:null}),resourcePrepared}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrepareResourceContext.Provider,{value:this.state},this.props.children)}}PrepareResourceContextProvider.displayName="PrepareResourceContextProvider",PrepareResourceContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,passwordPoliciesContext:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any};(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__.L)((0,_shared_context_PasswordPoliciesContext_PasswordPoliciesContext__WEBPACK_IMPORTED_MODULE_1__.WJ)(PrepareResourceContextProvider));function withPrepareResourceContext(WrappedComponent){return class WithPrepareResource extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(PrepareResourceContext.Consumer,null,(PrepareResourceContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{prepareResourceContext:PrepareResourceContext,...this.props})))}}}PrepareResourceContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"resetSecretGeneratorSettings",docblock:"Initialize the secret generator settings.\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Initialize the secret generator settings."},{name:"onPasswordGenerated",docblock:"Whenever a password has been generated with the generator\n@param password The generated password",modifiers:[],params:[{name:"newPassword",optional:!1},{name:"newGeneratorSettings",optional:!1}],returns:null,description:"Whenever a password has been generated with the generator"},{name:"onPrepareResource",docblock:"Whenever a resource has been prepared by the user\n@param resource The prepared resource",modifiers:[],params:[{name:"resource",description:"The prepared resource",optional:!1}],returns:null,description:"Whenever a resource has been prepared by the user"},{name:"getSettings",docblock:"Get the settings of the password generator\n@returns {Object}",modifiers:[],params:[],returns:{type:{name:"Object"}},description:"Get the settings of the password generator"},{name:"consumeLastGeneratedPassword",docblock:"Get the last generated password\n@returns {string|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"string"}]}},description:"Get the last generated password"},{name:"consumePreparedResource",docblock:"Consume the prepared resource\n@returns {Object|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"Object"}]}},description:"Consume the prepared resource"}],displayName:"PrepareResourceContextProvider",props:{context:{description:"",type:{name:"object"},required:!1},passwordPoliciesContext:{description:"",type:{name:"object"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityCollection.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entityCollectionError__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityCollectionError.js"),_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");class EntityCollection{constructor(dtos=[],options={}){const clone=options?.clone??!0;this._items=[],clone&&(dtos=JSON.parse(JSON.stringify(dtos))),this._props=dtos}toDto(){return JSON.parse(JSON.stringify(this._items))}toJSON(){return this.toDto()}get items(){return this._items}get length(){return this._items.length}[Symbol.iterator](){let i=0;return{next:()=>i<this._items.length?{value:this._items[i++],done:!1}:{done:!0}}}getAll(propName,search){if("string"!=typeof propName)throw new TypeError("EntityCollection excludeAll expects propName to be string.");if("string"!=typeof search)throw new TypeError("EntityCollection excludeAll expects search to be string.");return this._items.filter((item=>Object.prototype.hasOwnProperty.call(item._props,propName)&&item._props[propName]===search))}getFirst(propName,search){if("string"!=typeof propName||"string"!=typeof search)throw new TypeError("EntityCollection getFirst by expect propName and search to be strings");const found=this.getAll(propName,search);if(found&&found.length)return found[0]}extract(propName){if("string"!=typeof propName)throw new TypeError("EntityCollection extract expects propName to be a string.");return this._items.reduce(((accumulator,item)=>(void 0!==item._props[propName]&&accumulator.push(item._props[propName]),accumulator)),[])}push(item){return this._items.push(item),this._items.length}unshift(item){return this._items.unshift(item),this._items.length}filterByPropertyValueIn(propName,needles,excludeUndefined=!0){if("string"!=typeof propName)throw new TypeError("EntityCollection filterByPropertyValueIn expects propName to be a string.");if(!Array.isArray(needles))throw new TypeError("EntityCollection filterByPropertyValueIn expects needles to be an array.");this.filterByCallback((item=>{const isPropertyDefined=Object.prototype.hasOwnProperty.call(item._props,propName);return!(excludeUndefined&&!isPropertyDefined||isPropertyDefined&&!needles.includes(item._props[propName]))}))}filterByCallback(callback){if("function"!=typeof callback)throw new TypeError("EntityCollection filterByCallback expects callback to be a function.");for(let currentIndex=this._items.length-1;currentIndex>=0;currentIndex--)callback(this._items[currentIndex])||this._items.splice(currentIndex,1)}assertUniqueByProperty(propName,message){const ruleId=`unique_${propName}`,propValues=this.extract(propName),uniqueElements=new Set;message=message||`The collection should only contain items with unique values for the property: ${propName}.`,propValues.forEach(((propValue,index)=>{if(uniqueElements.add(propValue),index!==uniqueElements.size-1)throw new _entityCollectionError__WEBPACK_IMPORTED_MODULE_0__.A(index,ruleId,message)}))}assertNotExist(propName,propValue,options={}){if(void 0===propValue)return;let haystackSet=options?.haystackSet;if(!haystackSet){const propValues=this.extract(propName);haystackSet=new Set(propValues)}if(haystackSet.has(propValue)){const error=new _entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A,message=options?.message||`The collection already includes an element that has a property (${propName}) with an identical value.`;throw error.addError(propName,"unique",message),error}}}const __WEBPACK_DEFAULT_EXPORT__=EntityCollection},"./src/shared/models/entity/abstract/entityCollectionError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class EntityCollectionError extends Error{constructor(position,rule,message){if(super(message=message||"Entity collection error."),"number"!=typeof position)throw new TypeError("EntityCollectionError requires a valid position");if(!rule||"string"!=typeof rule)throw new TypeError("EntityCollectionError requires a valid rule");if(!message||"string"!=typeof message)throw new TypeError("EntityCollectionError requires a valid message");this.position=position,this.rule=rule}}const __WEBPACK_DEFAULT_EXPORT__=EntityCollectionError},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/abstract/entity.js"),validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/validator/es/lib/util/assertString.js"),_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");const SCALAR_PROPERTY_TYPES=["string","number","integer","boolean"];class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_2__.A{static _cachedSchema={};constructor(dtos={},options={}){const validate=options?.validate??!0;if(super(dtos,options),this.marshall(),validate){const error=this.validate({schema:options?.schema,validateBuildRules:options?.validateBuildRules});if(error)throw error}}marshall(){}validate(options={}){try{this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules)}catch(error){if(!(error instanceof _entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A))throw error;return error}return null}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}get(propName){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');return this._props[propName]}set(propName,value,options={}){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const validate=options?.validate??!0,schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');validate&&_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validateProp(propName,value,schemaProperties),this._props[propName]=value}diffProps(compareEntity){if(!(compareEntity instanceof EntityV2))throw new TypeError('The property "compareEntity" should be of "EntityV2" type.');const diff={},schema=this.constructor.getSchema(),propertiesNamesToCompare=Object.keys(schema.properties).filter((propertyName=>SCALAR_PROPERTY_TYPES.includes(schema.properties[propertyName].type)));for(const propertyName of propertiesNamesToCompare){const propValue=this.get(propertyName),comparedPropValue=compareEntity.get(propertyName);propValue!==comparedPropValue&&(diff[propertyName]=comparedPropValue)}return diff}hasDiffProps(compareEntity){const diff=this.diffProps(compareEntity);return Object.keys(diff).length>0}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/utils/dateUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B7:()=>formatDateForApi,Br:()=>formatExpirationDateTimeAgo,kD:()=>formatDateTimeAgo});var luxon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/luxon/src/luxon.js");const formatDateTimeAgo=(date,translate,locale)=>{if(null===date)return"n/a";if("Infinity"===date)return translate("Never");const dateTime=luxon__WEBPACK_IMPORTED_MODULE_0__.c9.fromISO(date),duration=dateTime.diffNow().toMillis();return duration>-1e3&&duration<0?translate("Just now"):dateTime.toRelative({locale})},formatExpirationDateTimeAgo=(date,translate,locale)=>date?formatDateTimeAgo(date,translate,locale):translate("Never"),formatDateForApi=date=>date?.toUTC().toISO()||null}}]);