/*! For license information please see react-extension-components-UserDetails-DisplayUserDetailsAccountRecovery-DisplayUserDetailsAccountRecovery-test-stories.e2f2b4d0.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[5880],{"./src/react-extension/components/UserDetails/DisplayUserDetailsAccountRecovery/DisplayUserDetailsAccountRecovery.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AccountRecoveryApproved:()=>AccountRecoveryApproved,AccountRecoveryApprovedWithPending:()=>AccountRecoveryApprovedWithPending,AccountRecoveryRejected:()=>AccountRecoveryRejected,AccountRecoveryRejectedWithPending:()=>AccountRecoveryRejectedWithPending,AccountRecoveryWithOneRequest:()=>AccountRecoveryWithOneRequest,AccountRecoveryWithOneRequestPending:()=>AccountRecoveryWithOneRequestPending,Loading:()=>Loading,NoAccountRecovery:()=>NoAccountRecovery,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayUserDetailsAccountRecovery_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),MockTranslationProvider=__webpack_require__("./src/react-extension/test/mock/components/Internationalisation/MockTranslationProvider.js"),DisplayUserDetailsAccountRecovery=__webpack_require__("./src/react-extension/components/UserDetails/DisplayUserDetailsAccountRecovery/DisplayUserDetailsAccountRecovery.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");function defaultProps(props={}){const defaultProps1={context:{port:new MockPort.A},userWorkspaceContext:{details:{user:{id:"54c6278e-f824-5fda-91ff-3e946b18d994",pending_account_recovery_request:null}}},workflowContext:{start:jest.fn()}};return Object.assign(defaultProps1,props)}const oneUserAccountRequestsPending=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"pending",created:"2020-05-04T20:31:45+00:00"}],oneUserAccountRequestsApproved=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"approved",created:"2020-05-04T20:31:45+00:00"}],userAccountRequestsRejectedWithPending=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"pending",created:"2020-05-04T20:31:45+00:00"},{id:"54c6278e-f824-5fda-91ff-3e946b18d999",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"rejected",created:"2020-05-04T20:31:45+00:00"}],userAccountRequestsApprovedWithPending=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"pending",created:"2020-05-04T20:31:45+00:00"},{id:"54c6278e-f824-5fda-91ff-3e946b18d999",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"approved",created:"2020-05-04T20:31:45+00:00"}],userAccountRequestsApproved=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"approved",created:"2020-05-04T20:31:45+00:00"},{id:"54c6278e-f824-5fda-91ff-3e946b18d999",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"approved",created:"2020-05-04T20:31:45+00:00"}],userAccountRequestsRejected=[{id:"54c6278e-f824-5fda-91ff-3e946b18d994",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"rejected",created:"2020-05-04T20:31:45+00:00"},{id:"54c6278e-f824-5fda-91ff-3e946b18d999",user_id:"d4c0e643-3967-443b-93b3-102d902c4511",status:"rejected",created:"2020-05-04T20:31:45+00:00"}],DisplayUserDetailsAccountRecovery_test_stories={title:"Components/UserDetails/DisplayUserDetailsAccountRecovery",component:DisplayUserDetailsAccountRecovery.A},Template=args=>react.createElement(MockTranslationProvider.A,null,react.createElement("div",{className:"panel aside"},react.createElement("div",{className:"detailed-information"},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(DisplayUserDetailsAccountRecovery.A,{...args,...routerProps})}))))),Loading=Template.bind({});Loading.args=defaultProps({context:{port:{}}});const NoAccountRecovery=Template.bind({});NoAccountRecovery.args=defaultProps({context:{port:{request:()=>[]}}});const contextWithPreviousApproved={context:{port:{request:()=>userAccountRequestsApproved}}},AccountRecoveryApproved=Template.bind({});AccountRecoveryApproved.args=defaultProps(contextWithPreviousApproved);const contextWithPreviousRejected={context:{port:{request:()=>userAccountRequestsRejected}}},AccountRecoveryRejected=Template.bind({});AccountRecoveryRejected.args=defaultProps(contextWithPreviousRejected);const contextWithPreviousApprovedAndPending={context:{port:{request:()=>userAccountRequestsApprovedWithPending}},userWorkspaceContext:{details:{user:{id:"54c6278e-f824-5fda-91ff-3e946b18d994",pending_account_recovery_request:{status:"pending"}}}}},AccountRecoveryApprovedWithPending=Template.bind({});AccountRecoveryApprovedWithPending.args=defaultProps(contextWithPreviousApprovedAndPending);const contextWithPreviousRejectedAndPending={context:{port:{request:()=>userAccountRequestsRejectedWithPending}},userWorkspaceContext:{details:{user:{id:"54c6278e-f824-5fda-91ff-3e946b18d994",pending_account_recovery_request:{status:"pending"}}}}},AccountRecoveryRejectedWithPending=Template.bind({});AccountRecoveryRejectedWithPending.args=defaultProps(contextWithPreviousRejectedAndPending);const contextWithOnePending={context:{port:{request:()=>oneUserAccountRequestsPending}},userWorkspaceContext:{details:{user:{id:"54c6278e-f824-5fda-91ff-3e946b18d994",pending_account_recovery_request:{status:"pending"}}}}},AccountRecoveryWithOneRequestPending=Template.bind({});AccountRecoveryWithOneRequestPending.args=defaultProps(contextWithOnePending);const contextWithOneRequest={context:{port:{request:()=>oneUserAccountRequestsApproved}}},AccountRecoveryWithOneRequest=Template.bind({});AccountRecoveryWithOneRequest.args=defaultProps(contextWithOneRequest);const __namedExportsOrder=["Loading","NoAccountRecovery","AccountRecoveryApproved","AccountRecoveryRejected","AccountRecoveryApprovedWithPending","AccountRecoveryRejectedWithPending","AccountRecoveryWithOneRequestPending","AccountRecoveryWithOneRequest"];Loading.parameters={...Loading.parameters,docs:{...Loading.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...Loading.parameters?.docs?.source}}},NoAccountRecovery.parameters={...NoAccountRecovery.parameters,docs:{...NoAccountRecovery.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...NoAccountRecovery.parameters?.docs?.source}}},AccountRecoveryApproved.parameters={...AccountRecoveryApproved.parameters,docs:{...AccountRecoveryApproved.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryApproved.parameters?.docs?.source}}},AccountRecoveryRejected.parameters={...AccountRecoveryRejected.parameters,docs:{...AccountRecoveryRejected.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryRejected.parameters?.docs?.source}}},AccountRecoveryApprovedWithPending.parameters={...AccountRecoveryApprovedWithPending.parameters,docs:{...AccountRecoveryApprovedWithPending.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryApprovedWithPending.parameters?.docs?.source}}},AccountRecoveryRejectedWithPending.parameters={...AccountRecoveryRejectedWithPending.parameters,docs:{...AccountRecoveryRejectedWithPending.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryRejectedWithPending.parameters?.docs?.source}}},AccountRecoveryWithOneRequestPending.parameters={...AccountRecoveryWithOneRequestPending.parameters,docs:{...AccountRecoveryWithOneRequestPending.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryWithOneRequestPending.parameters?.docs?.source}}},AccountRecoveryWithOneRequest.parameters={...AccountRecoveryWithOneRequest.parameters,docs:{...AccountRecoveryWithOneRequest.parameters?.docs,source:{originalSource:'args => <MockTranslationProvider>\n    <div className="panel aside">\n      <div className="detailed-information">\n        <MemoryRouter initialEntries={[\'/\']}>\n          <Route component={routerProps => <DisplayUserDetailsAccountRecovery {...args} {...routerProps} />}></Route>\n        </MemoryRouter>\n      </div>\n    </div>\n  </MockTranslationProvider>',...AccountRecoveryWithOneRequest.parameters?.docs?.source}}}},"./src/react-extension/components/UserDetails/DisplayUserDetailsAccountRecovery/DisplayUserDetailsAccountRecovery.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js"),_AccountRecovery_HandleReviewAccountRecoveryRequestWorkflow_HandleReviewAccountRecoveryRequestWorkflow__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/components/AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow.js"),_contexts_WorkflowContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/contexts/WorkflowContext.js"),_shared_utils_dateUtils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/shared/utils/dateUtils.js");class DisplayUserDetailsAccountRecovery extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindHandlers()}get defaultState(){return{loading:!0,open:!1,userRequests:[]}}async componentDidUpdate(prevProps){await this.handleUserChange(prevProps.userWorkspaceContext.details.user),await this.handleUserPendingAccountRecoveryRequestChange(prevProps.userWorkspaceContext.details.user)}async handleUserChange(previousUser){if(this.selectedUser.id!==previousUser.id&&this.state.open){const state=Object.assign({},this.defaultState,{open:!0});await this.setState(state),await this.findUserRequests(),this.setState({loading:!1})}}async handleUserPendingAccountRecoveryRequestChange(user){this.state.open&&user?.pending_account_recovery_request?.status!==this.props.userWorkspaceContext.details.user?.pending_account_recovery_request?.status&&(await this.setState({loading:!0}),await this.findUserRequests(),await this.setState({loading:!1}))}bindHandlers(){this.handleTitleClicked=this.handleTitleClicked.bind(this),this.handleReviewClicked=this.handleReviewClicked.bind(this)}async handleTitleClicked(){if(this.state.open){const defaultState=this.defaultState;this.setState(defaultState)}else await this.setState({loading:!0,open:!0}),await this.findUserRequests(),this.setState({loading:!1})}handleReviewClicked(){const accountRecoveryRequestId=this.selectedUser.pending_account_recovery_request.id;this.props.workflowContext.start(_AccountRecovery_HandleReviewAccountRecoveryRequestWorkflow_HandleReviewAccountRecoveryRequestWorkflow__WEBPACK_IMPORTED_MODULE_5__.A,{accountRecoveryRequestId})}async findUserRequests(){const userRequests=(await this.props.context.port.request("passbolt.account-recovery.get-user-requests",this.selectedUser.id)).sort(((a,b)=>new Date(b.created)-new Date(a.created)));this.setState({userRequests})}get selectedUser(){return this.props.userWorkspaceContext.details.user}get isAccountRecoveryPending(){return Boolean(this.selectedUser.pending_account_recovery_request)}get hasUserRequests(){return this.state.userRequests.length>0}get previousAccountRecoveryRequest(){return this.isAccountRecoveryPending?this.state.userRequests.length>1?this.state.userRequests[1]:null:this.hasUserRequests?this.state.userRequests[0]:null}capitalizeFirstLetter(string){return string[0].toUpperCase()+string.slice(1)}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"detailed-account-recovery accordion sidebar-section "+(this.state.open?"":"closed")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.handleTitleClicked},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Account recovery"),this.isAccountRecoveryPending&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"exclamation",baseline:!0})),this.state.open&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"caret-down"}),!this.state.open&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"caret-right"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-content"},this.state.loading&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"processing-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"spinner"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"processing-text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Retrieving account recovery"))),!this.state.loading&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",null,this.isAccountRecoveryPending&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"pending-request-status"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"label"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Current status")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handleReviewClicked},"Review")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"previous-request"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"label"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Previous recovery")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"value"},this.previousAccountRecoveryRequest?`${this.capitalizeFirstLetter(this.previousAccountRecoveryRequest.status)} ${(0,_shared_utils_dateUtils__WEBPACK_IMPORTED_MODULE_7__.kD)(this.previousAccountRecoveryRequest.created,this.props.t,this.props.context.locale)}`:"Never")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"requests-count"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"label"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Number of recovery")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"value"},this.state.userRequests.length)))))}}DisplayUserDetailsAccountRecovery.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_8___default().any,userWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_8___default().object,workflowContext:prop_types__WEBPACK_IMPORTED_MODULE_8___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__.L)((0,_contexts_WorkflowContext__WEBPACK_IMPORTED_MODULE_6__.AV)((0,_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_4__.zY)((0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(DisplayUserDetailsAccountRecovery))));DisplayUserDetailsAccountRecovery.__docgenInfo={description:"This component displays the user details about information",methods:[{name:"defaultState",docblock:"Returns the component default state",modifiers:["get"],params:[],returns:null,description:"Returns the component default state"},{name:"handleUserChange",docblock:"Check if the user has changed and fetch\n@param previousUser",modifiers:["async"],params:[{name:"previousUser",optional:!1}],returns:null,description:"Check if the user has changed and fetch"},{name:"handleUserPendingAccountRecoveryRequestChange",docblock:"Handle the update of the user pending account recovery request.\nWhen an admin reviews a pending request by instance, refresh the section content.\n@param {object} user The previous user",modifiers:["async"],params:[{name:"user",description:"The previous user",type:{name:"object"},optional:!1}],returns:null,description:"Handle the update of the user pending account recovery request.\nWhen an admin reviews a pending request by instance, refresh the section content."},{name:"bindHandlers",docblock:"Bind the component handlers",modifiers:[],params:[],returns:null,description:"Bind the component handlers"},{name:"handleTitleClicked",docblock:"Handle the click on the title",modifiers:["async"],params:[],returns:null,description:"Handle the click on the title"},{name:"handleReviewClicked",docblock:"Handle the click on the review button",modifiers:[],params:[],returns:null,description:"Handle the click on the review button"},{name:"findUserRequests",docblock:"Find the user account recovery request and populate the state.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Find the user account recovery request and populate the state."},{name:"selectedUser",docblock:"Get the selected user\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get the selected user"},{name:"isAccountRecoveryPending",docblock:"Is account recovery pending\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Is account recovery pending"},{name:"hasUserRequests",docblock:"Has user requests\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Has user requests"},{name:"previousAccountRecoveryRequest",docblock:"The previous account recovery requests\n@returns {*|null}",modifiers:["get"],params:[],returns:{type:{name:"union",elements:[{name:"mixed"}]}},description:"The previous account recovery requests"},{name:"capitalizeFirstLetter",docblock:"Capitalize first letter\n@param string\n@returns {string}",modifiers:[],params:[{name:"string",optional:!1}],returns:{type:{name:"string"}},description:"Capitalize first letter"}],displayName:"DisplayUserDetailsAccountRecovery",props:{context:{description:"",type:{name:"any"},required:!1},userWorkspaceContext:{description:"",type:{name:"object"},required:!1},workflowContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}}}]);