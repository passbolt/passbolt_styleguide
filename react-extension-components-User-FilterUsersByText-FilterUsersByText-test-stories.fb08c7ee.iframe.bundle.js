/*! For license information please see react-extension-components-User-FilterUsersByText-FilterUsersByText-test-stories.fb08c7ee.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[624],{"./src/react-extension/components/User/FilterUsersByText/FilterUsersByText.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_FilterUsersByText__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/User/FilterUsersByText/FilterUsersByText.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/User/FilterUsersByText",component:_FilterUsersByText__WEBPACK_IMPORTED_MODULE_1__.A},Initial=(args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.MemoryRouter,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Route,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FilterUsersByText__WEBPACK_IMPORTED_MODULE_1__.A,{...args,...routerProps})}))).bind({}),__namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <FilterUsersByText {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Navigation/Search/SearchBar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class SearchBar extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks(),this.createReferences()}bindCallbacks(){this.handleChangeEvent=this.handleChangeEvent.bind(this),this.handleOnSubmitEvent=this.handleOnSubmitEvent.bind(this)}createReferences(){this.searchInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}handleChangeEvent(event){const text=event.target.value;this.props.onSearch&&this.props.onSearch(text)}handleOnSubmitEvent(event){if(event.preventDefault(),this.props.onSearch){const text=this.searchInputRef.current.value;this.props.onSearch(text)}}get placeholderLabel(){return this.props.placeholder||this.props.t("Search")}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"col2 search-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{className:"search",onSubmit:this.handleOnSubmitEvent},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input search required "+(this.props.disabled?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{className:"visuallyhidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Search")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{ref:this.searchInputRef,className:"required",type:"search",disabled:this.props.disabled,onChange:this.handleChangeEvent,placeholder:this.placeholderLabel,value:this.props.value}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"search-button-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"button button-transparent",value:this.placeholderLabel,onBlur:this.handleSubmitButtonBlur,onFocus:this.handleSubmitButtonFocus,type:"submit",disabled:this.props.disabled?"disabled":""},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"search"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visuallyhidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,this.placeholderLabel)))))))}}SearchBar.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,onSearch:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,placeholder:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,t:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func},SearchBar.defaultProps={disabled:!1};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(SearchBar);SearchBar.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"createReferences",docblock:"Create elements references",modifiers:[],params:[],returns:null,description:"Create elements references"},{name:"handleChangeEvent",docblock:"Handle search input change\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle search input change"},{name:"handleOnSubmitEvent",docblock:"Handle on submit\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle on submit"},{name:"placeholderLabel",docblock:null,modifiers:["get"],params:[],returns:null}],displayName:"SearchBar",props:{disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},onSearch:{description:"",type:{name:"func"},required:!1},placeholder:{description:"",type:{name:"string"},required:!1},value:{description:"",type:{name:"string"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/User/FilterUsersByText/FilterUsersByText.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_Common_Navigation_Search_SearchBar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Navigation/Search/SearchBar.js"),_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FilterUsersByText extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}bindCallbacks(){this.handleSearchEvent=this.handleSearchEvent.bind(this)}get defaultState(){return{text:"",debounceTimeoutIt:null}}componentDidUpdate(previousProps){this.handleFilterChanged(previousProps.userWorkspaceContext.filter)}componentWillUnmount(){clearTimeout(this.state.debounceTimeoutIt)}handleFilterChanged(previousFilter){const wasTextFilter=previousFilter.type===_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__.aj.TEXT,isTextFilter=this.props.userWorkspaceContext.filter.type===_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__.aj.TEXT;wasTextFilter&&!isTextFilter&&this.setState({text:""})}handleSearchEvent(text){this.search(text)}search(text){clearTimeout(this.state.debounceTimeoutId);const debounceTimeoutId=setTimeout((()=>{const filter={type:_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__.aj.TEXT,payload:text};this.props.history.push({pathname:"/app/users",state:{filter}})}),300);this.setState({debounceTimeoutId,text})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Navigation_Search_SearchBar__WEBPACK_IMPORTED_MODULE_1__.A,{disabled:this.props.disabled,onSearch:this.handleSearchEvent,placeholder:this.props.t("Search users"),value:this.state.text})}}FilterUsersByText.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool,userWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,history:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,t:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.withRouter)((0,_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__.zY)((0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.CI)("common")(FilterUsersByText)));FilterUsersByText.__docgenInfo={description:"This component allows to filter the list of users by text",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"handleFilterChanged",docblock:"Whenever the user filter changed",modifiers:[],params:[{name:"previousFilter",optional:!1}],returns:null,description:"Whenever the user filter changed"},{name:"handleSearchEvent",docblock:"Handle search input change\n@params {string} text The entered text",modifiers:[],params:[{name:"text",optional:!1}],returns:null,description:"Handle search input change"},{name:"search",docblock:"Search for the text\n@param text",modifiers:[],params:[{name:"text",optional:!1}],returns:null,description:"Search for the text"}],displayName:"FilterUsersByText",props:{disabled:{description:"",type:{name:"bool"},required:!1},userWorkspaceContext:{description:"",type:{name:"object"},required:!1},history:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayWarning:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayWarning:this.displayWarning.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}displaySuccess(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}displayWarning(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"warning",message:feedbackToAdd}]})}displayError(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}remove(feedbackToRemove){this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayWarning",docblock:"Display the feedback in a warning mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a warning mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:[],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading,Ay:()=>LoadingContextProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/context/Rbac/RbacContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{eu:()=>RbacContext,Ay:()=>Rbac_RbacContext,x6:()=>withRbac});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),controlFunctionEnumeration=__webpack_require__("./src/shared/services/rbacs/controlFunctionEnumeration.js"),denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js");class GetControlFunctionService{static getByRbac(rbac){const controlFunction=controlFunctionEnumeration.HJ[rbac.controlFunction];return controlFunction||(console.warn(`Could not find control function for the given rbac entity (${rbac.id})`),denyControlFunction.A)}static getDefaultForAdminAndUiAction(uiActionName){return controlFunctionEnumeration.Y9[uiActionName]||allowControlFunction.A}static getDefaultForUserAndUiAction(uiActionName){return controlFunctionEnumeration.uy[uiActionName]||allowControlFunction.A}}var roleEntity=__webpack_require__("./src/shared/models/entity/role/roleEntity.js");class CanUse{static canRoleUseUiAction(user,rbacs,actionName){if(window.chrome?.webview){const rbac=rbacs.findRbacByActionName(actionName);return this.getByRbacOrDefault(rbac,actionName,user)}const role=new roleEntity.A(user.role);if(role.isAdmin()){return GetControlFunctionService.getDefaultForAdminAndUiAction(actionName).execute()}const rbac=rbacs.findRbacByRoleAndUiActionName(role,actionName);return this.getByRbacOrDefault(rbac,actionName,user)}static getByRbacOrDefault(rbac,actionName,user){if(rbac){return GetControlFunctionService.getByRbac(rbac).execute(user)}return GetControlFunctionService.getDefaultForUserAndUiAction(actionName).execute()}}const RbacContext=react.createContext({canIUseUiAction:()=>{}});class RbacContextProvider extends react.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{canIUseUiAction:this.canIUseUiAction.bind(this)}}canIUseUiAction(actionName){return CanUse.canRoleUseUiAction(this.props.context.loggedInUser,this.props.context.rbacs,actionName)}render(){return react.createElement(RbacContext.Provider,{value:this.state},this.props.children)}}RbacContextProvider.propTypes={context:prop_types_default().any,children:prop_types_default().any};const Rbac_RbacContext=(0,AppContext.L)(RbacContextProvider);function withRbac(WrappedComponent){return class WithRbac extends react.Component{render(){return react.createElement(RbacContext.Consumer,null,(rbacContext=>react.createElement(WrappedComponent,{rbacContext,...this.props})))}}}RbacContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"canIUseUiAction",docblock:"Check if the user can use the given ui action.\n@param {string} actionName The name of the UI action to check for.\n@return {boolean}",modifiers:[],params:[{name:"actionName",description:"The name of the UI action to check for.",type:{name:"string"},optional:!1}],returns:{type:{name:"boolean"}},description:"Check if the user can use the given ui action."}],displayName:"RbacContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./src/shared/services/rbacs/controlFunctionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{HJ:()=>controlFunctionResolutions,HK:()=>controlFunctions,Y9:()=>defaultAdminUiActionControlResolution,uy:()=>defaultUserUiActionControlResolution});var allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js"),ControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowIfGroupManagerInOneGroupFunction extends ControlFunction.A{static execute(user){return user.groups_users.some((group=>group.is_admin))}}var denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),uiActionEnumeration=__webpack_require__("./src/shared/services/rbacs/uiActionEnumeration.js");const controlFunctions={ALLOW:"Allow",DENY:"Deny",ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP:"AllowIfGroupManagerInOneGroup"},controlFunctionResolutions={[controlFunctions.ALLOW]:allowControlFunction.A,[controlFunctions.DENY]:denyControlFunction.A,[controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP]:AllowIfGroupManagerInOneGroupFunction},defaultAdminUiActionControlResolution={[uiActionEnumeration.e.FOLDERS_USE]:controlFunctionResolutions[controlFunctions.ALLOW]},defaultUserUiActionControlResolution={[uiActionEnumeration.e.ADMINSTRATION_VIEW_WORKSPACE]:controlFunctionResolutions[controlFunctions.DENY]}},"./src/shared/services/rbacs/controlFunctions/ControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ControlFunction});class ControlFunction{}},"./src/shared/services/rbacs/controlFunctions/allowControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>AllowControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!0}}},"./src/shared/services/rbacs/controlFunctions/denyControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DenyControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class DenyControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!1}}},"./src/shared/services/rbacs/uiActionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>uiActions});const uiActions={FOLDERS_USE:"Folders.use",RESOURCES_IMPORT:"Resources.import",RESOURCES_EXPORT:"Resources.export",RESOURCES_SEE_ACTIVITIES:"Resources.seeActivities",RESOURCES_SEE_COMMENTS:"Resources.seeComments",SECRETS_PREVIEW:"Secrets.preview",SECRETS_COPY:"Secrets.copy",SHARE_VIEW_LIST:"Share.viewList",TAGS_USE:"Tags.use",USERS_VIEW_WORKSPACE:"Users.viewWorkspace",MOBILE_TRANSFER:"Mobile.transfer",DESKTOP_TRANSFER:"Desktop.transfer",PROFIL_ACCOUNT_RECOVERY:"Profil.accountRecovery",ADMINSTRATION_VIEW_WORKSPACE:"Administration.viewWorkspace",DUO_CONFIGURATION:"Duo.configuration",AVATAR_UPLOAD:"Avatar.upload",SHARE_FOLDER:"Folders.share"}}}]);