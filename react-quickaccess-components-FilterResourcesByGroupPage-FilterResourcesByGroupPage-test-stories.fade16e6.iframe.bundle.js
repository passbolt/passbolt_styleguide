/*! For license information please see react-quickaccess-components-FilterResourcesByGroupPage-FilterResourcesByGroupPage-test-stories.fade16e6.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7972],{"./src/react-quickaccess/components/FilterResourcesByGroupPage/FilterResourcesByGroupPage.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GroupsResourcesMatched:()=>GroupsResourcesMatched,InitialLoad:()=>InitialLoad,NoGroups:()=>NoGroups,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FilterResourcesByGroupPage_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),react_router_dom=__webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),spinner=__webpack_require__("./src/img/svg/spinner.svg"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),sortUtils=__webpack_require__("./src/shared/utils/sortUtils.js"),filterUtils=__webpack_require__("./src/shared/utils/filterUtils.js"),memoize_one_esm=__webpack_require__("./node_modules/memoize-one/dist/memoize-one.esm.js"),ResourceLocalStorageContext=__webpack_require__("./src/react-quickaccess/contexts/ResourceLocalStorageContext.js"),MetadataTypesSettingsLocalStorageContext=__webpack_require__("./src/shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext.js"),ResourceTypesLocalStorageContext=__webpack_require__("./src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext.js"),resourceTypesCollection=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),metadataTypesSettingsEntity=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js"),resourceTypeSchemasDefinition=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class FilterResourcesByGroupPage extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.initEventHandlers()}componentDidMount(){this.props.context.focusSearch(),this.props.context.searchHistory[this.props.location.pathname]&&this.props.context.updateSearch(this.props.context.searchHistory[this.props.location.pathname]),this.props.location?.state?.selectedGroup?this.findAndLoadGroupResourceIds():this.findAndLoadGroups()}get defaultState(){return{groups:null,groupResourceIds:null}}initEventHandlers(){this.handleGoBackClick=this.handleGoBackClick.bind(this),this.handleSelectGroupClick=this.handleSelectGroupClick.bind(this),this.handleSelectResourceClick=this.handleSelectResourceClick.bind(this)}get translate(){return this.props.t}handleGoBackClick(ev){ev.preventDefault(),this.props.context.updateSearch(""),delete this.props.context.searchHistory[this.props.location.pathname],this.props.history.goBack()}handleSelectGroupClick(ev,selectedGroup){ev.preventDefault(),this.props.context.searchHistory[this.props.location.pathname]=this.props.context.search,this.props.context.updateSearch(""),this.props.history.push(`/webAccessibleResources/quickaccess/resources/group/${selectedGroup.id}`,{selectedGroup})}handleSelectResourceClick(ev,resourceId){ev.preventDefault(),this.props.context.searchHistory[this.props.location.pathname]=this.props.context.search,this.props.context.updateSearch(""),this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`)}async findAndLoadGroups(){const filters={"has-users":[this.props.context.userSettings.id]},groups=await this.props.context.port.request("passbolt.groups.find-all",{filters});this.sortGroupsAlphabetically(groups),this.setState({groups})}async findAndLoadGroupResourceIds(){const groupResourceIds=await this.props.context.port.request("passbolt.resources.find-all-ids-by-is-shared-with-group",this.props.location.state.selectedGroup.id);this.setState({groupResourceIds})}filterResourcesByIds=(0,memoize_one_esm.A)(((resources,ids)=>{const groupResources=resources.filter((resource=>ids.includes(resource.id)));return(0,sortUtils.H)(groupResources),groupResources}));sortGroupsAlphabetically(groups){groups.sort(((group1,group2)=>group1.name.localeCompare(group2.name,void 0,{sensitivity:"base"})))}filterGroupsBySearch=(0,memoize_one_esm.A)(((groups,needle,limit=Number.MAX_SAFE_INTEGER)=>{const regexes=needle.split(/\s+/).map((needle=>new RegExp((0,filterUtils.N)(needle),"i")));let filterCount=0;return groups.filter((group=>{if(filterCount>=limit)return!1;let match=!0;for(const i in regexes)match&=regexes[i].test(group.name);return filterCount++,match}))}));filterSearchedResources=(0,memoize_one_esm.A)(((resources,groupResourceIds,search)=>{const groupResources=this.filterResourcesByIds(resources,groupResourceIds);return search?(0,filterUtils.$)(groupResources,search,500):groupResources.slice(0,500)}));filterSearchedGroups=(0,memoize_one_esm.A)(((groups,search)=>search?this.filterGroupsBySearch(groups,search,500):groups.slice(0,500)));hasMetadataTypesSettings(){return Boolean(this.props.metadataTypeSettings)}canCreatePassword(){return this.props.metadataTypeSettings.isDefaultResourceTypeV5?this.props.resourceTypes?.hasOneWithSlug(resourceTypeSchemasDefinition.gG):!!this.props.metadataTypeSettings.isDefaultResourceTypeV4&&this.props.resourceTypes?.hasOneWithSlug(resourceTypeSchemasDefinition.Bo)}render(){const isSearching=this.props.context.search.length>0,listGroupsOnly=!this.props.location?.state?.selectedGroup;let isReady,browsedGroups,browsedResources;return listGroupsOnly?(isReady=null!==this.state.groups,isReady&&(browsedGroups=this.filterSearchedGroups(this.state.groups,this.props.context.search))):(isReady=null!==this.props.resources&&null!==this.state.groupResourceIds,isReady&&(browsedResources=this.filterSearchedResources(this.props.resources,this.state.groupResourceIds,this.props.context.search))),react.createElement("div",{className:"index-list"},react.createElement("div",{className:"back-link"},react.createElement("a",{href:"#",className:"primary-action",onClick:this.handleGoBackClick,title:this.translate("Go back")},react.createElement(Icon.A,{name:"chevron-left"}),react.createElement("span",{className:"primary-action-title"},this.state.selectedGroup&&this.state.selectedGroup.name||react.createElement(es.x6,null,"Groups"))),react.createElement(react_router_dom.N_,{to:"/webAccessibleResources/quickaccess/home",className:"secondary-action button-transparent button",title:this.translate("Cancel")},react.createElement(Icon.A,{name:"close"}),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Cancel")))),react.createElement("div",{className:"list-container"},react.createElement("ul",{className:"list-items"},!isReady&&react.createElement("li",{className:"empty-entry"},react.createElement(spinner.A,null),react.createElement("p",{className:"processing-text"},listGroupsOnly?react.createElement(es.x6,null,"Retrieving your groups"):react.createElement(es.x6,null,"Retrieving your passwords"))),isReady&&react.createElement(react.Fragment,null,listGroupsOnly&&react.createElement(react.Fragment,null,!browsedGroups.length&&react.createElement("li",{className:"empty-entry"},react.createElement("p",null,isSearching&&react.createElement(es.x6,null,"No result match your search. Try with another search term."),!isSearching&&react.createElement(es.x6,null,"You are not member of any group. Wait for a group manager to add you in a group."))),browsedGroups.length>0&&browsedGroups.map((group=>react.createElement("li",{key:group.id,className:"filter-entry"},react.createElement("a",{href:"#",onClick:ev=>this.handleSelectGroupClick(ev,group)},react.createElement("span",{className:"filter"},group.name)))))),!listGroupsOnly&&react.createElement(react.Fragment,null,!browsedResources.length&&react.createElement("li",{className:"empty-entry"},react.createElement("p",null,isSearching&&react.createElement(es.x6,null,"No result match your search. Try with another search term."),!isSearching&&react.createElement(es.x6,null,"No passwords are shared with this group yet. Share a password with this group or wait for a team member to share one with this group."))),browsedResources?.length>0&&browsedResources.map((resource=>react.createElement("li",{className:"browse-resource-entry",key:resource.id},react.createElement("a",{href:"#",onClick:ev=>this.handleSelectResourceClick(ev,resource.id)},react.createElement("div",{className:"inline-resource-entry"},react.createElement("div",{className:"inline-resource-name"},react.createElement("span",{className:"title"},resource.metadata.name),react.createElement("span",{className:"username"}," ",resource.metadata.username?`(${resource.metadata.username})`:"")),react.createElement("span",{className:"url"},resource.metadata.uris?.[0])))))))))),this.hasMetadataTypesSettings()&&this.canCreatePassword()&&react.createElement("div",{className:"submit-wrapper"},react.createElement(react_router_dom.N_,{to:"/webAccessibleResources/quickaccess/resources/create",id:"popupAction",className:"button primary big full-width",role:"button"},react.createElement(es.x6,null,"Create new"))))}}FilterResourcesByGroupPage.propTypes={context:prop_types_default().any,resourceTypes:prop_types_default().instanceOf(resourceTypesCollection.A),metadataTypeSettings:prop_types_default().instanceOf(metadataTypesSettingsEntity.Ay),location:prop_types_default().object,history:prop_types_default().object,resources:prop_types_default().array,t:prop_types_default().func};const FilterResourcesByGroupPage_FilterResourcesByGroupPage=(0,AppContext.L)((0,react_router.y)((0,ResourceTypesLocalStorageContext.KH)((0,ResourceLocalStorageContext.GZ)((0,MetadataTypesSettingsLocalStorageContext.mw)((0,es.CI)("common")(FilterResourcesByGroupPage))))));FilterResourcesByGroupPage.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Returns the component default state\n@return {object}",modifiers:["get"],params:[],returns:{type:{name:"object"}},description:"Returns the component default state"},{name:"initEventHandlers",docblock:"Initializes event handlers",modifiers:[],params:[],returns:null,description:"Initializes event handlers"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"},{name:"handleGoBackClick",docblock:'Handles the click event on the "Go back" button.\n@param {Event} ev',modifiers:[],params:[{name:"ev",type:{name:"Event"},optional:!1}],returns:null,description:'Handles the click event on the "Go back" button.'},{name:"handleSelectGroupClick",docblock:"Handles the click event on a group from the list.\n@param {Event} ev\n@param {Object} selectedGroup",modifiers:[],params:[{name:"ev",type:{name:"Event"},optional:!1},{name:"selectedGroup",type:{name:"Object"},optional:!1}],returns:null,description:"Handles the click event on a group from the list."},{name:"handleSelectResourceClick",docblock:"Handles the click event on a resource from the list.\n@param {Event} ev\n@param {string} resourceId",modifiers:[],params:[{name:"ev",type:{name:"Event"},optional:!1},{name:"resourceId",type:{name:"string"},optional:!1}],returns:null,description:"Handles the click event on a resource from the list."},{name:"findAndLoadGroups",docblock:"Find and load groups.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find and load groups."},{name:"findAndLoadGroupResourceIds",docblock:"Find and load group resource ids.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find and load group resource ids."},{name:"sortGroupsAlphabetically",docblock:"Sort an array of groups alphabetically\n@param {Array} groups The array of group to filter.",modifiers:[],params:[{name:"groups",description:"The array of group to filter.",type:{name:"Array"},optional:!1}],returns:null,description:"Sort an array of groups alphabetically"},{name:"hasMetadataTypesSettings",docblock:"Has metadata types settings\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has metadata types settings"},{name:"canCreatePassword",docblock:"Can create password\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Can create password"}],displayName:"FilterResourcesByGroupPage",props:{context:{description:"",type:{name:"any"},required:!1},resourceTypes:{description:"",type:{name:"instanceOf",value:"ResourceTypesCollection"},required:!1},metadataTypeSettings:{description:"",type:{name:"instanceOf",value:"MetadataTypesSettingsEntity"},required:!1},location:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1},resources:{description:"",type:{name:"array"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var AppContext_test_data=__webpack_require__("./src/react-quickaccess/contexts/AppContext.test.data.js"),mock_MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js"),resourceEntity_test_data=__webpack_require__("./src/shared/models/entity/resource/resourceEntity.test.data.js"),esm_history=__webpack_require__("./node_modules/history/esm/history.js"),groupEntity_test_data=__webpack_require__("./src/shared/models/entity/group/groupEntity.test.data.js"),resourceTypesCollection_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.test.data.js"),metadataTypesSettingsEntity_test_data=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.test.data.js");function defaultProps(props={}){const port=new mock_MockPort.A;port.addRequestListener("passbolt.resources.find-all-ids-by-is-shared-with-group",(()=>new Promise((resolve=>setTimeout((()=>resolve(props.groups??[])),4e3))))),port.addRequestListener("passbolt.groups.find-all",(()=>new Promise((resolve=>setTimeout((()=>resolve(props.resources??[])),4e3)))));const defaultContext={port},defaultProps1={context:(0,AppContext_test_data.s)({...defaultContext,...props?.context}),resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),metadataTypeSettings:new metadataTypesSettingsEntity.Ay((0,metadataTypesSettingsEntity_test_data.uc)())};return delete props.context,Object.assign(defaultProps1,props)}const FilterResourcesByGroupPage_test_stories={title:"Components/QuickAccess/FilterResourcesByGroup",component:FilterResourcesByGroupPage_FilterResourcesByGroupPage},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{path:["/","/:id"],component:routerProps=>react.createElement("div",{className:"container quickaccess"},react.createElement(FilterResourcesByGroupPage_FilterResourcesByGroupPage,{...args,...routerProps}))})));Template.propTypes={context:prop_types_default().object,initialEntries:prop_types_default().array};const parameters={css:"ext_quickaccess"},InitialLoad=Template.bind({});InitialLoad.args=defaultProps(),InitialLoad.parameters=parameters;const NoGroups=Template.bind({});NoGroups.args=function noGroupsProps(props){const port=new mock_MockPort.A;return port.addRequestListener("passbolt.resources.find-all-ids-by-is-shared-with-group",(()=>[])),port.addRequestListener("passbolt.groups.find-all",(()=>[])),defaultProps({context:{...{port},...props?.context}})}(),NoGroups.parameters=parameters;const GroupsResourcesMatched=Template.bind({});GroupsResourcesMatched.args=function withFilteredResourcesProps(props){const port=new mock_MockPort.A,resources=props?.resources??[(0,resourceEntity_test_data.j8)({metadata:{name:"apache",username:"www-data",uris:["http://www.apache.org/"],description:"Apache is the world's most used web server software."}},{withTags:!0}),(0,resourceEntity_test_data.j8)({metadata:{name:"passbolt",username:"passbolt",uris:["http://www.passbolt.local/"],description:"passbolt."}},{withTags:!0})];port.addRequestListener("passbolt.groups.find-all",(()=>[(0,groupEntity_test_data.K)({name:"group1"}),(0,groupEntity_test_data.K)({name:"group2"})])),port.addRequestListener("passbolt.resources.find-all-ids-by-is-shared-with-group",(()=>[resources[0]?.id,resources[1]?.id]));const defaultContext={port};return function withSelectedGroupProps(props){const propsWithGroup=defaultProps(props);return propsWithGroup.history=(0,esm_history.sC)(),propsWithGroup.location=propsWithGroup.history.location,propsWithGroup.location.state={selectedGroup:(0,groupEntity_test_data.K)().id},propsWithGroup}({context:Object.assign(defaultContext,props?.context),resources})}(),GroupsResourcesMatched.parameters=parameters;const __namedExportsOrder=["InitialLoad","NoGroups","GroupsResourcesMatched"];InitialLoad.parameters={...InitialLoad.parameters,docs:{...InitialLoad.parameters?.docs,source:{originalSource:'({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={[\'/\']}>\n      <Route path={["/", "/:id"]} component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>',...InitialLoad.parameters?.docs?.source}}},NoGroups.parameters={...NoGroups.parameters,docs:{...NoGroups.parameters?.docs,source:{originalSource:'({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={[\'/\']}>\n      <Route path={["/", "/:id"]} component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>',...NoGroups.parameters?.docs?.source}}},GroupsResourcesMatched.parameters={...GroupsResourcesMatched.parameters,docs:{...GroupsResourcesMatched.parameters?.docs,source:{originalSource:'({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={[\'/\']}>\n      <Route path={["/", "/:id"]} component={routerProps => <div className="container quickaccess"><FilterResourcesByGroupPage {...args} {...routerProps} /></div>} />\n    </MemoryRouter>\n  </AppContext.Provider>',...GroupsResourcesMatched.parameters?.docs?.source}}}},"./node_modules/memoize-one/dist/memoize-one.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>memoizeOne});var safeIsNaN=Number.isNaN||function ponyfill(value){return"number"==typeof value&&value!=value};function areInputsEqual(newInputs,lastInputs){if(newInputs.length!==lastInputs.length)return!1;for(var i=0;i<newInputs.length;i++)if(first=newInputs[i],second=lastInputs[i],!(first===second||safeIsNaN(first)&&safeIsNaN(second)))return!1;var first,second;return!0}function memoizeOne(resultFn,isEqual){void 0===isEqual&&(isEqual=areInputsEqual);var cache=null;function memoized(){for(var newArgs=[],_i=0;_i<arguments.length;_i++)newArgs[_i]=arguments[_i];if(cache&&cache.lastThis===this&&isEqual(newArgs,cache.lastArgs))return cache.lastResult;var lastResult=resultFn.apply(this,newArgs);return cache={lastResult,lastArgs:newArgs,lastThis:this},lastResult}return memoized.clear=function clear(){cache=null},memoized}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entity.js");class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};constructor(dtos={},options={}){super(dtos,options),this.marshall();(options?.validate??!0)&&(this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules))}marshall(){}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2}}]);