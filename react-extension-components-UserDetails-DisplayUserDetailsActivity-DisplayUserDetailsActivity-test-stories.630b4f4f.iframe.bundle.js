/*! For license information please see react-extension-components-UserDetails-DisplayUserDetailsActivity-DisplayUserDetailsActivity-test-stories.630b4f4f.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8934],{"./src/react-extension/components/UserDetails/DisplayUserDetailsActivity/DisplayUserDetailsActivity.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayUserDetailsActivity_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),UserSettings=__webpack_require__("./src/shared/lib/Settings/UserSettings.js"),userSettings=__webpack_require__("./src/react-extension/test/fixture/Settings/userSettings.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),UserAvatar=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),UserWorkspaceContext=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),spinner=__webpack_require__("./src/img/svg/spinner.svg"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),dateUtils=__webpack_require__("./src/shared/utils/dateUtils.js");class DisplayUserDetailsActivity extends react.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.bindCallbacks()}getDefaultState(){return{activities:null,activitiesPage:1,loadingMore:!1,open:!1,loading:!0}}async componentDidUpdate(prevProps){prevProps.userWorkspaceContext.details&&await this.handleUserChange(prevProps.userWorkspaceContext.details.user),prevProps.userWorkspaceContext.refresh&&await this.handleUserActivitiesRefresh(prevProps.userWorkspaceContext.refresh.activities)}bindCallbacks(){this.handleTitleClickEvent=this.handleTitleClickEvent.bind(this),this.handleMoreClickEvent=this.handleMoreClickEvent.bind(this)}async handleUserChange(previousUser){if(!this.state.open)return;if(this.user.id===previousUser.id)return;const state=Object.assign({},this.getDefaultState(),{open:!0});await this.setState(state),await this.fetch(),this.setState({loading:!1})}async handleUserActivitiesRefresh(hasPreviouslyRefreshed){!hasPreviouslyRefreshed&&this.props.userWorkspaceContext.refresh.activities&&(await this.fetch(),await this.props.userWorkspaceContext.onUserActivitiesRefreshed())}async handleTitleClickEvent(){if(this.state.open){const defaultState=this.getDefaultState();this.setState(defaultState)}else await this.setState({loading:!0,open:!0}),await this.fetch(),this.setState({loading:!1})}async handleMoreClickEvent(){const activitiesPage=this.state.activitiesPage+1;await this.setState({activitiesPage,loadingMore:!0}),await this.fetch(),this.setState({loadingMore:!1})}async fetch(){const options={limit:5,page:this.state.activitiesPage},newActivities=await this.props.context.port.request("passbolt.actionlogs.find-all-for","User",this.user.id,options);let activities;activities=this.state.activitiesPage>1?[...this.state.activities||[],...newActivities]:[...newActivities],this.setState({activities})}getActivityCreatorFullName(user){return`${user.profile.first_name} ${user.profile.last_name}`}get baseUrl(){return this.props.context.userSettings.getTrustedDomain()}renderAccountRecoveryRequested(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("span",{className:"creator"},{activityCreatorName})," requested an account recovery")),react.createElement("div",{className:"subinfo third-level light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderAccountRecoveryRequestRejected(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),userLink=`${this.baseUrl}/app/users/view/${activity.creator.id}`,activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("a",{rel:"noopener noreferrer",href:userLink},react.createElement("span",{className:"creator"},{activityCreatorName}))," rejected the account recovery request")),react.createElement("div",{className:"subinfo light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderAccountRecoveryRequestAccepted(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),userLink=`${this.baseUrl}/app/users/view/${activity.creator.id}`,activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("a",{rel:"noopener noreferrer",href:userLink},react.createElement("span",{className:"creator"},{activityCreatorName}))," accepted the account recovery request")),react.createElement("div",{className:"subinfo light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderAccountRecoveryPolicyRejected(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("span",{className:"creator"},{activityCreatorName})," rejected the account recovery policy")),react.createElement("div",{className:"subinfo light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderAccountRecoveryPolicyAccepted(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("span",{className:"creator"},{activityCreatorName})," accepted the account recovery policy")),react.createElement("div",{className:"subinfo light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderUserCreated(activity){const activityCreatorName=this.getActivityCreatorFullName(activity.creator),userLink=`${this.baseUrl}/app/users/view/${activity.creator.id}`,activityFormattedDate=(0,dateUtils.kD)(activity.created,this.props.t,this.props.context.locale);return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement("div",{className:"name"},react.createElement(es.x6,null,react.createElement("a",{rel:"noopener noreferrer",href:userLink},react.createElement("span",{className:"creator"},{activityCreatorName}))," created the user account")),react.createElement("div",{className:"subinfo light"},activityFormattedDate))),react.createElement(UserAvatar.A,{user:activity.creator,baseUrl:this.baseUrl}))}renderUnknownActivity(activity){return react.createElement("li",{key:activity.id,className:"usercard-detailed-col-2"},react.createElement("div",{className:"content-wrapper"},react.createElement("div",{className:"content"},react.createElement(es.x6,null,"Unknown activity, please contact your administrator."))))}renderActivity(activity){let render;switch(activity.type){case"AccountRecovery.Requests.initiated":render=this.renderAccountRecoveryRequested(activity);break;case"AccountRecovery.Requests.accepted":render=this.renderAccountRecoveryRequestAccepted(activity);break;case"AccountRecovery.Requests.rejected":render=this.renderAccountRecoveryRequestRejected(activity);break;case"AccountRecovery.Policies.accepted":render=this.renderAccountRecoveryPolicyAccepted(activity);break;case"AccountRecovery.Policies.rejected":render=this.renderAccountRecoveryPolicyRejected(activity);break;case"Users.created":render=this.renderUserCreated(activity);break;default:render=this.renderUnknownActivity(activity)}return render}mustDisplayMoreButton(){return!this.state.activities.some((activity=>"Users.created"===activity.type))}get user(){return this.props.userWorkspaceContext.details.user}render(){return react.createElement("div",{className:"activity accordion sidebar-section "+(this.state.open?"":"closed")},react.createElement("div",{className:"accordion-header"},react.createElement("h4",null,react.createElement("button",{type:"button",className:"link no-border",onClick:this.handleTitleClickEvent},react.createElement(es.x6,null,"Activity"),this.state.open&&react.createElement(Icon.A,{name:"caret-down"}),!this.state.open&&react.createElement(Icon.A,{name:"caret-right"})))),react.createElement("div",{className:"accordion-content"},this.state.loading&&react.createElement("div",{className:"processing-wrapper"},react.createElement(spinner.A,null),react.createElement("span",{className:"processing-text"},react.createElement(es.x6,null,"Retrieving activities"))),!this.state.loading&&react.createElement(react.Fragment,null,react.createElement("ul",{className:"ready"},this.state.activities.map((activity=>this.renderActivity(activity)))),this.mustDisplayMoreButton()&&react.createElement("div",{className:"actions"},react.createElement("button",{type:"button",disabled:this.state.loadingMore,onClick:this.handleMoreClickEvent,className:"action-logs-load-more "+(this.state.loadingMore?"processing":"")},react.createElement("span",null,react.createElement(es.x6,null,"More")))))))}}DisplayUserDetailsActivity.propTypes={context:prop_types_default().any,userWorkspaceContext:prop_types_default().any,t:prop_types_default().func};const DisplayUserDetailsActivity_DisplayUserDetailsActivity=(0,AppContext.L)((0,UserWorkspaceContext.zY)((0,es.CI)("common")(DisplayUserDetailsActivity)));DisplayUserDetailsActivity.__docgenInfo={description:"This component display activity section of a user",methods:[{name:"getDefaultState",docblock:"Get default state\n@returns {*}",modifiers:[],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleUserChange",docblock:"Check if the user has changed and fetch\n@param previousUser",modifiers:["async"],params:[{name:"previousUser",optional:!1}],returns:null,description:"Check if the user has changed and fetch"},{name:"handleUserActivitiesRefresh",docblock:"Handle the refresh of the activities\n@param hasPreviouslyRefreshed True if one previously refreshed the activities",modifiers:["async"],params:[{name:"hasPreviouslyRefreshed",description:"True if one previously refreshed the activities",optional:!1}],returns:null,description:"Handle the refresh of the activities"},{name:"handleTitleClickEvent",docblock:"handle when the users click on the section header.\nOpen/Close it.",modifiers:["async"],params:[],returns:null,description:"handle when the users click on the section header.\nOpen/Close it."},{name:"handleMoreClickEvent",docblock:"handle when the users click on the more button.\nOpen/Close it.",modifiers:["async"],params:[],returns:null,description:"handle when the users click on the more button.\nOpen/Close it."},{name:"fetch",docblock:"Fetch the user activities\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Fetch the user activities"},{name:"getActivityCreatorFullName",docblock:"Get an activity creator full name\n@param {object} user The creator\n@return string",modifiers:[],params:[{name:"user",description:"The creator",type:{name:"object"},optional:!1}],returns:{description:"string"},description:"Get an activity creator full name"},{name:"baseUrl",docblock:"Get the base url\n@return {string}",modifiers:["get"],params:[],returns:{type:{name:"string"}},description:"Get the base url"},{name:"renderAccountRecoveryRequested",docblock:"Render a requested account recovery activity.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render a requested account recovery activity."},{name:"renderAccountRecoveryRequestRejected",docblock:"Render an account recovery request rejection activity.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render an account recovery request rejection activity."},{name:"renderAccountRecoveryRequestAccepted",docblock:"Render an account recovery request acceptation activity.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render an account recovery request acceptation activity."},{name:"renderAccountRecoveryPolicyRejected",docblock:"Render an account recovery policy rejection activity.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render an account recovery policy rejection activity."},{name:"renderAccountRecoveryPolicyAccepted",docblock:"Render an account recovery policy acceptation activity.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render an account recovery policy acceptation activity."},{name:"renderUserCreated",docblock:"Render an activity about the creation of a user.\n@param {object} activity The target activity\n@returns {JSX}",modifiers:[],params:[{name:"activity",description:"The target activity",type:{name:"object"},optional:!1}],returns:{type:{name:"JSX"}},description:"Render an activity about the creation of a user."},{name:"renderUnknownActivity",docblock:"Render an unknown activity.\n@returns {JSX}",modifiers:[],params:[{name:"activity",optional:!1}],returns:{type:{name:"JSX"}},description:"Render an unknown activity."},{name:"renderActivity",docblock:"Render an activity\n@param {object} activity The activity to render",modifiers:[],params:[{name:"activity",description:"The activity to render",type:{name:"object"},optional:!1}],returns:null,description:"Render an activity"},{name:"mustDisplayMoreButton",docblock:"Check if the more button should be displayed.\n@return {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the more button should be displayed."},{name:"user",docblock:"Returns the current detailed user",modifiers:["get"],params:[],returns:null,description:"Returns the current detailed user"}],displayName:"DisplayUserDetailsActivity",props:{context:{description:"",type:{name:"any"},required:!1},userWorkspaceContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};const DisplayUserDetailsActivity_test_stories={title:"Components/UserDetails/DisplayUserDetailsActivity",component:DisplayUserDetailsActivity_DisplayUserDetailsActivity},userActivityData=[[{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",type:"AccountRecovery.Requests.initiated",creator:{profile:{first_name:"Ada",last_name:"Lovelace"}},created:"2021-12-17T16:37:12+00:00"},{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd0",type:"AccountRecovery.Requests.accepted",creator:{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3eee",profile:{first_name:"Admin",last_name:"admin"}},created:"2021-10-17T16:37:12+00:00"},{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd2",type:"AccountRecovery.Policies.rejected",creator:{profile:{first_name:"Ada",last_name:"Lovelace"}},created:"2021-08-17T16:37:12+00:00"},{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd1",type:"AccountRecovery.Policies.accepted",creator:{profile:{first_name:"Ada",last_name:"Lovelace"}},created:"2021-04-17T16:37:12+00:00"},{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd3",type:"UnknowActivityType",creator:{profile:{first_name:"Ada",last_name:"Lovelace"}}}],[{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd4",type:"AccountRecovery.Requests.rejected",creator:{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3eee",profile:{first_name:"Admin",last_name:"admin"}},created:"2020-08-17T16:37:12+00:00"},{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dd5",type:"Users.created",creator:{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3eee",profile:{first_name:"Admin",last_name:"admin"}},created:"2020-08-17T16:37:12+00:00"}]];let activityDataSetIndex=0;const context={siteSettings:{getServerTimezone:()=>(new Date).toDateString()},userSettings:new UserSettings.A(userSettings.A),port:{request:()=>userActivityData[activityDataSetIndex++%userActivityData.length]}},Initial=(args=>react.createElement(AppContext.A.Provider,{value:args.context},react.createElement(react_router.MemoryRouter,{initialEntries:["/"]},react.createElement("div",{className:"panel aside"},react.createElement(react_router.Route,{component:routerProps=>react.createElement(DisplayUserDetailsActivity_DisplayUserDetailsActivity,{...args,...routerProps})}))))).bind({});Initial.args={context,userWorkspaceContext:{details:{user:{}}}};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={args.context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel aside\">\n        <Route component={routerProps => <DisplayUserDetailsActivity {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayWarning:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayWarning:this.displayWarning.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}displaySuccess(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}displayWarning(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"warning",message:feedbackToAdd}]})}displayError(feedbackToAdd){this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}remove(feedbackToRemove){this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayWarning",docblock:"Display the feedback in a warning mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a warning mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:[],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:[],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading,Ay:()=>LoadingContextProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/test/fixture/Settings/userSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={"user.settings.trustedDomain":new URL(window.location.href).origin,"user.firstname":"Ada","user.id":"f848277c-5398-58f8-a82a-72397af2d450","user.lastname":"Lovelace","user.settings.securityToken.code":"TST","user.settings.securityToken.color":"#000000","user.settings.securityToken.textColor":"#FFFFFF","user.username":"ada@passbolt.com","user.settings.locale":"en-UK","user.settings.theme":"default"}},"./src/shared/context/Rbac/RbacContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{eu:()=>RbacContext,Ay:()=>Rbac_RbacContext,x6:()=>withRbac});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),controlFunctionEnumeration=__webpack_require__("./src/shared/services/rbacs/controlFunctionEnumeration.js"),denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js");class GetControlFunctionService{static getByRbac(rbac){const controlFunction=controlFunctionEnumeration.HJ[rbac.controlFunction];return controlFunction||(console.warn(`Could not find control function for the given rbac entity (${rbac.id})`),denyControlFunction.A)}static getDefaultForAdminAndUiAction(uiActionName){return controlFunctionEnumeration.Y9[uiActionName]||allowControlFunction.A}static getDefaultForUserAndUiAction(uiActionName){return controlFunctionEnumeration.uy[uiActionName]||allowControlFunction.A}}var roleEntity=__webpack_require__("./src/shared/models/entity/role/roleEntity.js");class CanUse{static canRoleUseUiAction(user,rbacs,actionName){if(window.chrome?.webview){const rbac=rbacs.findRbacByActionName(actionName);return this.getByRbacOrDefault(rbac,actionName,user)}const role=new roleEntity.A(user.role);if(role.isAdmin()){return GetControlFunctionService.getDefaultForAdminAndUiAction(actionName).execute()}const rbac=rbacs.findRbacByRoleAndUiActionName(role,actionName);return this.getByRbacOrDefault(rbac,actionName,user)}static getByRbacOrDefault(rbac,actionName,user){if(rbac){return GetControlFunctionService.getByRbac(rbac).execute(user)}return GetControlFunctionService.getDefaultForUserAndUiAction(actionName).execute()}}const RbacContext=react.createContext({canIUseUiAction:()=>{}});class RbacContextProvider extends react.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{canIUseUiAction:this.canIUseUiAction.bind(this)}}canIUseUiAction(actionName){return CanUse.canRoleUseUiAction(this.props.context.loggedInUser,this.props.context.rbacs,actionName)}render(){return react.createElement(RbacContext.Provider,{value:this.state},this.props.children)}}RbacContextProvider.propTypes={context:prop_types_default().any,children:prop_types_default().any};const Rbac_RbacContext=(0,AppContext.L)(RbacContextProvider);function withRbac(WrappedComponent){return class WithRbac extends react.Component{render(){return react.createElement(RbacContext.Consumer,null,(rbacContext=>react.createElement(WrappedComponent,{rbacContext,...this.props})))}}}RbacContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"canIUseUiAction",docblock:"Check if the user can use the given ui action.\n@param {string} actionName The name of the UI action to check for.\n@return {boolean}",modifiers:[],params:[{name:"actionName",description:"The name of the UI action to check for.",type:{name:"string"},optional:!1}],returns:{type:{name:"boolean"}},description:"Check if the user can use the given ui action."}],displayName:"RbacContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/lib/Settings/UserSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>UserSettings});class UserSettings{constructor(settings){this.settings=settings}get id(){return this.settings["user.id"]}get fullName(){return`${this.settings["user.firstname"]} ${this.settings["user.lastname"]}`}get username(){return this.settings["user.username"]}getTheme(){return this.settings["user.settings.theme"]}getTrustedDomain(){return this.settings["user.settings.trustedDomain"]}getSecurityToken(){return{code:this.settings["user.settings.securityToken.code"],backgroundColor:this.settings["user.settings.securityToken.color"],textColor:this.settings["user.settings.securityToken.textColor"]}}get locale(){return this.settings["user.settings.locale"]}}},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./src/shared/services/rbacs/controlFunctionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{HJ:()=>controlFunctionResolutions,HK:()=>controlFunctions,Y9:()=>defaultAdminUiActionControlResolution,uy:()=>defaultUserUiActionControlResolution});var allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js"),ControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowIfGroupManagerInOneGroupFunction extends ControlFunction.A{static execute(user){return user.groups_users.some((group=>group.is_admin))}}var denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),uiActionEnumeration=__webpack_require__("./src/shared/services/rbacs/uiActionEnumeration.js");const controlFunctions={ALLOW:"Allow",DENY:"Deny",ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP:"AllowIfGroupManagerInOneGroup"},controlFunctionResolutions={[controlFunctions.ALLOW]:allowControlFunction.A,[controlFunctions.DENY]:denyControlFunction.A,[controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP]:AllowIfGroupManagerInOneGroupFunction},defaultAdminUiActionControlResolution={[uiActionEnumeration.e.FOLDERS_USE]:controlFunctionResolutions[controlFunctions.ALLOW]},defaultUserUiActionControlResolution={[uiActionEnumeration.e.ADMINSTRATION_VIEW_WORKSPACE]:controlFunctionResolutions[controlFunctions.DENY]}},"./src/shared/services/rbacs/controlFunctions/ControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ControlFunction});class ControlFunction{}},"./src/shared/services/rbacs/controlFunctions/allowControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>AllowControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!0}}},"./src/shared/services/rbacs/controlFunctions/denyControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DenyControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class DenyControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!1}}},"./src/shared/services/rbacs/uiActionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>uiActions});const uiActions={FOLDERS_USE:"Folders.use",RESOURCES_IMPORT:"Resources.import",RESOURCES_EXPORT:"Resources.export",RESOURCES_SEE_ACTIVITIES:"Resources.seeActivities",RESOURCES_SEE_COMMENTS:"Resources.seeComments",SECRETS_PREVIEW:"Secrets.preview",SECRETS_COPY:"Secrets.copy",SHARE_VIEW_LIST:"Share.viewList",TAGS_USE:"Tags.use",USERS_VIEW_WORKSPACE:"Users.viewWorkspace",MOBILE_TRANSFER:"Mobile.transfer",DESKTOP_TRANSFER:"Desktop.transfer",PROFIL_ACCOUNT_RECOVERY:"Profil.accountRecovery",ADMINSTRATION_VIEW_WORKSPACE:"Administration.viewWorkspace",DUO_CONFIGURATION:"Duo.configuration",AVATAR_UPLOAD:"Avatar.upload",SHARE_FOLDER:"Folders.share"}},"./src/shared/utils/dateUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B7:()=>formatDateForApi,Br:()=>formatExpirationDateTimeAgo,kD:()=>formatDateTimeAgo});var luxon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/luxon/src/luxon.js");const formatDateTimeAgo=(date,translate,locale)=>{if(null===date)return"n/a";if("Infinity"===date)return translate("Never");const dateTime=luxon__WEBPACK_IMPORTED_MODULE_0__.c9.fromISO(date),duration=dateTime.diffNow().toMillis();return duration>-1e3&&duration<0?translate("Just now"):dateTime.toRelative({locale})},formatExpirationDateTimeAgo=(date,translate,locale)=>date?formatDateTimeAgo(date,translate,locale):translate("Never"),formatDateForApi=date=>date?.toUTC().toISO()||null}}]);