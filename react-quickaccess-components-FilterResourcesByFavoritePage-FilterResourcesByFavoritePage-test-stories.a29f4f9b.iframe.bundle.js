/*! For license information please see react-quickaccess-components-FilterResourcesByFavoritePage-FilterResourcesByFavoritePage-test-stories.a29f4f9b.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9486],{"./src/react-quickaccess/components/FilterResourcesByFavoritePage/FilterResourcesByFavoritePage.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FavoriteResources:()=>FavoriteResources,InitialLoad:()=>InitialLoad,NoFavoriteResource:()=>NoFavoriteResource,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FilterResourcesByFavoritePage_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),react_router_dom=__webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),spinner=__webpack_require__("./src/img/svg/spinner.svg"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),filterUtils=__webpack_require__("./src/shared/utils/filterUtils.js"),ResourceLocalStorageContext=__webpack_require__("./src/react-quickaccess/contexts/ResourceLocalStorageContext.js"),memoize_one_esm=__webpack_require__("./node_modules/memoize-one/dist/memoize-one.esm.js"),ResourceTypesLocalStorageContext=__webpack_require__("./src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext.js"),MetadataTypesSettingsLocalStorageContext=__webpack_require__("./src/shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext.js"),resourceTypesCollection=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),metadataTypesSettingsEntity=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js"),resourceTypeSchemasDefinition=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class FilterResourcesByFavoritePage extends react.Component{constructor(props){super(props),this.initEventHandlers()}componentDidMount(){this.props.context.focusSearch(),this.props.context.searchHistory[this.props.location.pathname]&&this.props.context.updateSearch(this.props.context.searchHistory[this.props.location.pathname])}initEventHandlers(){this.handleGoBackClick=this.handleGoBackClick.bind(this),this.handleSelectResourceClick=this.handleSelectResourceClick.bind(this)}handleGoBackClick(ev){ev.preventDefault(),this.props.context.updateSearch(""),delete this.props.context.searchHistory[this.props.location.pathname],this.props.history.goBack()}handleSelectResourceClick(ev,resourceId){ev.preventDefault(),this.props.context.searchHistory[this.props.location.pathname]=this.props.context.search,this.props.context.updateSearch(""),this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`)}filterByFavorite=(0,memoize_one_esm.A)((resources=>resources.filter((resource=>Boolean(resource.favorite)))));filterSearchedResources=(0,memoize_one_esm.A)(((resources,search)=>{const favoriteResources=this.filterByFavorite(resources);return search?(0,filterUtils.$)(favoriteResources,search,100):favoriteResources}));hasMetadataTypesSettings(){return Boolean(this.props.metadataTypeSettings)}canCreatePassword(){return this.props.metadataTypeSettings.isDefaultResourceTypeV5?this.props.resourceTypes?.hasOneWithSlug(resourceTypeSchemasDefinition.gG):!!this.props.metadataTypeSettings.isDefaultResourceTypeV4&&this.props.resourceTypes?.hasOneWithSlug(resourceTypeSchemasDefinition.Bo)}render(){const isReady=null!=this.props.resources,isSearching=this.props.context.search.length>0;let browsedResources;return isReady&&(browsedResources=this.filterSearchedResources(this.props.resources,this.props.context.search)),react.createElement("div",{className:"index-list"},react.createElement("div",{className:"back-link"},react.createElement("a",{href:"#",className:"primary-action",onClick:this.handleGoBackClick,title:this.props.t("Go back")},react.createElement(Icon.A,{name:"chevron-left"}),react.createElement("span",{className:"primary-action-title"},react.createElement(es.x6,null,"Favorite"))),react.createElement(react_router_dom.N_,{to:"/webAccessibleResources/quickaccess/home",className:"secondary-action button-transparent button",title:this.props.t("Cancel")},react.createElement(Icon.A,{name:"close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Cancel")))),react.createElement("div",{className:"list-container"},react.createElement("ul",{className:"list-items"},!isReady&&react.createElement("li",{className:"empty-entry"},react.createElement(spinner.A,null),react.createElement("p",{className:"processing-text"},react.createElement(es.x6,null,"Retrieving your passwords"))),isReady&&react.createElement(react.Fragment,null,!browsedResources.length&&react.createElement("li",{className:"empty-entry"},react.createElement("p",null,isSearching&&react.createElement(es.x6,null,"No result match your search. Try with another search term."),!isSearching&&react.createElement(es.x6,null,"None of your passwords are yet marked as favorite. Add stars to passwords you want to easily find later."))),browsedResources.length>0&&browsedResources.map((resource=>react.createElement("li",{className:"browse-resource-entry",key:resource.id},react.createElement("a",{href:"#",onClick:ev=>this.handleSelectResourceClick(ev,resource.id)},react.createElement("div",{className:"inline-resource-entry"},react.createElement("div",{className:"inline-resource-name"},react.createElement("span",{className:"title"},resource.metadata.name),react.createElement("span",{className:"username"}," ",resource.metadata.username?`(${resource.metadata.username})`:"")),react.createElement("span",{className:"url"},resource.metadata.uris?.[0]))))))))),this.hasMetadataTypesSettings()&&this.canCreatePassword()&&react.createElement("div",{className:"submit-wrapper"},react.createElement(react_router_dom.N_,{to:"/webAccessibleResources/quickaccess/resources/create",id:"popupAction",className:"button primary big full-width",role:"button"},react.createElement(es.x6,null,"Create new"))))}}FilterResourcesByFavoritePage.propTypes={context:prop_types_default().any,resourceTypes:prop_types_default().instanceOf(resourceTypesCollection.A),metadataTypeSettings:prop_types_default().instanceOf(metadataTypesSettingsEntity.Ay),location:prop_types_default().object,history:prop_types_default().object,resources:prop_types_default().array,t:prop_types_default().func};const FilterResourcesByFavoritePage_FilterResourcesByFavoritePage=(0,AppContext.L)((0,react_router.y)((0,ResourceTypesLocalStorageContext.KH)((0,ResourceLocalStorageContext.GZ)((0,MetadataTypesSettingsLocalStorageContext.mw)((0,es.CI)("common")(FilterResourcesByFavoritePage))))));FilterResourcesByFavoritePage.__docgenInfo={description:"",methods:[{name:"initEventHandlers",docblock:"Initializes event handlers",modifiers:[],params:[],returns:null,description:"Initializes event handlers"},{name:"handleGoBackClick",docblock:'Handles the click event on the "Go back" button.\n@param {Event} ev',modifiers:[],params:[{name:"ev",type:{name:"Event"},optional:!1}],returns:null,description:'Handles the click event on the "Go back" button.'},{name:"handleSelectResourceClick",docblock:"Handles the click event on a resource from the list.\n@param {Event} ev\n@param {string} resourceId",modifiers:[],params:[{name:"ev",type:{name:"Event"},optional:!1},{name:"resourceId",type:{name:"string"},optional:!1}],returns:null,description:"Handles the click event on a resource from the list."},{name:"hasMetadataTypesSettings",docblock:"Has metadata types settings\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has metadata types settings"},{name:"canCreatePassword",docblock:"Can create password\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Can create password"}],displayName:"FilterResourcesByFavoritePage",props:{context:{description:"",type:{name:"any"},required:!1},resourceTypes:{description:"",type:{name:"instanceOf",value:"ResourceTypesCollection"},required:!1},metadataTypeSettings:{description:"",type:{name:"instanceOf",value:"MetadataTypesSettingsEntity"},required:!1},location:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1},resources:{description:"",type:{name:"array"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var AppContext_test_data=__webpack_require__("./src/react-quickaccess/contexts/AppContext.test.data.js"),resourceEntity_test_data=__webpack_require__("./src/shared/models/entity/resource/resourceEntity.test.data.js"),resourceTypesCollection_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.test.data.js"),metadataTypesSettingsEntity_test_data=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.test.data.js");const FilterResourcesByFavoritePage_test_stories={title:"Components/QuickAccess/FilterResourcesByFavorite",component:FilterResourcesByFavoritePage_FilterResourcesByFavoritePage},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement("div",{className:"container quickaccess"},react.createElement(FilterResourcesByFavoritePage_FilterResourcesByFavoritePage,{...args,...routerProps}))})));Template.propTypes={context:prop_types_default().object};const parameters={css:"ext_quickaccess"},InitialLoad=Template.bind({});InitialLoad.args=((data={})=>({context:(0,AppContext_test_data.s)(data.context),resources:null,resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),metadataTypeSettings:new metadataTypesSettingsEntity.Ay((0,metadataTypesSettingsEntity_test_data.uc)()),...data}))(),InitialLoad.parameters=parameters;const NoFavoriteResource=Template.bind({});NoFavoriteResource.args=((data={})=>({context:(0,AppContext_test_data.s)(data.context),resources:[],resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),metadataTypeSettings:new metadataTypesSettingsEntity.Ay((0,metadataTypesSettingsEntity_test_data.uc)()),...data}))(),NoFavoriteResource.parameters=parameters;const FavoriteResources=Template.bind({});FavoriteResources.args=((data={})=>({context:(0,AppContext_test_data.s)(data.context),resources:[(0,resourceEntity_test_data.j8)({metadata:{name:"apache",username:"www-data",uri:"http://www.apache.org/",description:"Apache is the world's most used web server software."}},{withFavorite:!0}),(0,resourceEntity_test_data.j8)({metadata:{name:"esaie",username:"test",uri:"http://www.essaie.org/",description:""}},{withFavorite:!0})],resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),metadataTypeSettings:new metadataTypesSettingsEntity.Ay((0,metadataTypesSettingsEntity_test_data.uc)()),...data}))(),FavoriteResources.parameters=parameters;const __namedExportsOrder=["InitialLoad","NoFavoriteResource","FavoriteResources"];InitialLoad.parameters={...InitialLoad.parameters,docs:{...InitialLoad.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <div className=\"container quickaccess\"><FilterResourcesByFavoritePage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>",...InitialLoad.parameters?.docs?.source}}},NoFavoriteResource.parameters={...NoFavoriteResource.parameters,docs:{...NoFavoriteResource.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <div className=\"container quickaccess\"><FilterResourcesByFavoritePage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>",...NoFavoriteResource.parameters?.docs?.source}}},FavoriteResources.parameters={...FavoriteResources.parameters,docs:{...FavoriteResources.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <div className=\"container quickaccess\"><FilterResourcesByFavoritePage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>",...FavoriteResources.parameters?.docs?.source}}}},"./node_modules/memoize-one/dist/memoize-one.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>memoizeOne});var safeIsNaN=Number.isNaN||function ponyfill(value){return"number"==typeof value&&value!=value};function areInputsEqual(newInputs,lastInputs){if(newInputs.length!==lastInputs.length)return!1;for(var i=0;i<newInputs.length;i++)if(first=newInputs[i],second=lastInputs[i],!(first===second||safeIsNaN(first)&&safeIsNaN(second)))return!1;var first,second;return!0}function memoizeOne(resultFn,isEqual){void 0===isEqual&&(isEqual=areInputsEqual);var cache=null;function memoized(){for(var newArgs=[],_i=0;_i<arguments.length;_i++)newArgs[_i]=arguments[_i];if(cache&&cache.lastThis===this&&isEqual(newArgs,cache.lastArgs))return cache.lastResult;var lastResult=resultFn.apply(this,newArgs);return cache={lastResult,lastArgs:newArgs,lastThis:this},lastResult}return memoized.clear=function clear(){cache=null},memoized}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/abstract/entity.js"),validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/validator/es/lib/util/assertString.js"),_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");const SCALAR_PROPERTY_TYPES=["string","number","integer","boolean"];class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_2__.A{static _cachedSchema={};constructor(dtos={},options={}){const validate=options?.validate??!0;if(super(dtos,options),this.marshall(),validate){const error=this.validate({schema:options?.schema,validateBuildRules:options?.validateBuildRules});if(error)throw error}}marshall(){}validate(options={}){try{this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules)}catch(error){if(!(error instanceof _entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A))throw error;return error}return null}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}get(propName){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');return this._props[propName]}set(propName,value,options={}){(0,validator_es_lib_util_assertString__WEBPACK_IMPORTED_MODULE_3__.A)(propName);const validate=options?.validate??!0,schemaProperties=this.constructor.getSchema().properties[propName];if(!schemaProperties)throw new Error(`The property "${propName}" has no schema definition.`);if(!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type))throw new Error('The property "associated_entity" should reference scalar properties only.');validate&&_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validateProp(propName,value,schemaProperties),this._props[propName]=value}diffProps(compareEntity){if(!(compareEntity instanceof EntityV2))throw new TypeError('The property "compareEntity" should be of "EntityV2" type.');const diff={},schema=this.constructor.getSchema(),propertiesNamesToCompare=Object.keys(schema.properties).filter((propertyName=>SCALAR_PROPERTY_TYPES.includes(schema.properties[propertyName].type)));for(const propertyName of propertiesNamesToCompare){const propValue=this.get(propertyName),comparedPropValue=compareEntity.get(propertyName);propValue!==comparedPropValue&&(diff[propertyName]=comparedPropValue)}return diff}hasDiffProps(compareEntity){const diff=this.diffProps(compareEntity);return Object.keys(diff).length>0}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2}}]);