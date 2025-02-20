/*! For license information please see react-extension-components-Administration-DisplaySelfRegistrationAdministration-DisplaySelfRegistrationAdministration-test-stories.247482ea.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7297],{"./src/react-extension/components/Administration/DisplaySelfRegistrationAdministration/DisplaySelfRegistrationAdministration.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplaySelfRegistrationAdministration_test_stories,withProfesionnalDomains:()=>withProfesionnalDomains});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),mockApiResponse=__webpack_require__("./test/mocks/mockApiResponse.js"),MockFetch=__webpack_require__("./src/react-extension/test/mock/MockFetch.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),AdministrationWorkspaceContext=__webpack_require__("./src/react-extension/contexts/AdministrationWorkspaceContext.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),DomainUtil=__webpack_require__("./src/react-extension/lib/Domain/DomainUtil.js"),MapObject=__webpack_require__("./src/react-extension/lib/Map/MapObject.js"),AdministrationSelfRegistrationContext=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext.js");class DisplayAdministrationSelfRegistrationActions extends react.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleSave=this.handleSave.bind(this)}get allowedDomains(){return this.props.adminSelfRegistrationContext.getAllowedDomains()}isSaveEnabled(){let isFirstUsageWithoutChanges=!1;return this.props.adminSelfRegistrationContext.getCurrentSettings()?.provider||(isFirstUsageWithoutChanges=!this.props.adminSelfRegistrationContext.hasSettingsChanges()),!this.props.adminSelfRegistrationContext.isProcessing()&&!isFirstUsageWithoutChanges}async handleSave(){this.isSaveEnabled()&&this.props.adminSelfRegistrationContext.save()}render(){return react.createElement("div",{className:"col2_3 actions-wrapper"},react.createElement("div",{className:"actions"},react.createElement("ul",null,react.createElement("li",null,react.createElement("button",{type:"button",disabled:!this.isSaveEnabled(),id:"save-settings",onClick:this.handleSave},react.createElement(Icon.A,{name:"save"}),react.createElement("span",null,react.createElement(es.x6,null,"Save settings")))))))}}DisplayAdministrationSelfRegistrationActions.propTypes={adminSelfRegistrationContext:prop_types_default().object,t:prop_types_default().func};const DisplayAdministrationSelfRegistrationActions_DisplayAdministrationSelfRegistrationActions=(0,es.CI)("common")((0,AdministrationSelfRegistrationContext.v6)(DisplayAdministrationSelfRegistrationActions));DisplayAdministrationSelfRegistrationActions.__docgenInfo={description:"This component is a container of multiple actions applicable on setting",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"allowedDomains",docblock:"return the allowed domains",modifiers:["get"],params:[],returns:null,description:"return the allowed domains"},{name:"isSaveEnabled",docblock:"Is save button enable\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Is save button enable"},{name:"handleSave",docblock:"Handle the save action.\nIn case we have more than one domain and we have changes, we should display a confirmation dialog to inform the user\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Handle the save action.\nIn case we have more than one domain and we have changes, we should display a confirmation dialog to inform the user"}],displayName:"DisplayAdministrationSelfRegistrationActions",props:{adminSelfRegistrationContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};const map=new Map;function setRef(key){if("string"!=typeof key)return console.warn("useDynamicRefs: Cannot set ref without key");const ref=react.createRef();return map.set(key,ref),ref}function getRef(key){return key?map.get(key):console.warn("useDynamicRefs: Cannot get ref without key")}const DynamicRef=function useDynamicRefs(){return{getRef,setRef}};var DialogContext=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),SelfRegistrationDomainsViewModel=__webpack_require__("./src/shared/models/selfRegistration/SelfRegistrationDomainsViewModel.js"),dist=__webpack_require__("./node_modules/debounce-promise/dist/index.js"),dist_default=__webpack_require__.n(dist);class DisplaySelfRegistrationAdministration extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.dynamicRefs=DynamicRef(),this.checkForPublicDomainDebounce=dist_default()(this.checkForWarnings,300),this.bindCallbacks()}async componentDidMount(){this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSelfRegistrationActions_DisplayAdministrationSelfRegistrationActions),await this.findSettings()}componentDidUpdate(){this.shouldFocusOnError(),this.shouldCheckWarnings()}componentWillUnmount(){this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction(),this.props.adminSelfRegistrationContext.clearContext()}get defaultState(){return{isEnabled:!1,warnings:new Map}}bindCallbacks(){this.handleToggleClicked=this.handleToggleClicked.bind(this),this.handleAddRowClick=this.handleAddRowClick.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleDeleteRow=this.handleDeleteRow.bind(this)}get currentUser(){return this.props.context.loggedInUser}get allowedDomains(){return this.props.adminSelfRegistrationContext.getAllowedDomains()}async findSettings(){await this.props.adminSelfRegistrationContext.findSettings(),this.setState({isEnabled:this.allowedDomains.size>0}),this.checkForWarnings(),this.validateForm()}checkForWarnings(){this.setState({warnings:new Map},(()=>{this.allowedDomains.forEach(((value,key)=>this.checkDomainIsProfessional(key,value)))}))}setupSettings(){if(this.props.adminSelfRegistrationContext.setDomains(new SelfRegistrationDomainsViewModel.A(this.props.adminSelfRegistrationContext.getCurrentSettings())),this.checkForWarnings(),0===this.allowedDomains.size){const domain=DomainUtil.A.extractDomainFromEmail(this.currentUser?.username);DomainUtil.A.checkDomainValidity(domain),this.populateUserDomain(domain)}}shouldFocusOnError(){const onFocus=this.props.adminSelfRegistrationContext.shouldFocus(),[error]=this.props.adminSelfRegistrationContext.getErrors().keys();if(error&&onFocus){this.dynamicRefs.getRef(error).current.focus(),this.props.adminSelfRegistrationContext.setFocus(!1)}}shouldCheckWarnings(){this.props.adminSelfRegistrationContext.isSaved()&&(this.props.adminSelfRegistrationContext.setSaved(!1),this.checkForWarnings())}populateUserDomain(domain){const row=DomainUtil.A.isProfessional(domain)?domain:"";this.addRow(row)}addRow(value=""){const uuid=(0,v4.A)();this.props.adminSelfRegistrationContext.setAllowedDomains(uuid,value,(()=>{const inputRef=this.dynamicRefs.getRef(uuid);inputRef?.current.focus()}))}handleDeleteRow(key){if(this.canDelete()){const domains=this.allowedDomains;domains.delete(key),this.props.adminSelfRegistrationContext.setDomains({allowedDomains:domains}),this.validateForm(),this.checkForWarnings()}}hasWarnings(){return this.state.warnings.size>0}hasAllInputDisabled(){return this.props.adminSelfRegistrationContext.isProcessing()}handleToggleClicked(){this.setState({isEnabled:!this.state.isEnabled},(()=>{this.state.isEnabled?this.setupSettings():(this.props.adminSelfRegistrationContext.setDomains({allowedDomains:new Map}),this.props.adminSelfRegistrationContext.setErrors(new Map))}))}handleAddRowClick(){this.addRow()}checkDomainIsProfessional(uuid,value){this.setState((prevState=>{const warnings=MapObject.A.clone(prevState.warnings);return DomainUtil.A.isProfessional(value)?warnings.delete(uuid):warnings.set(uuid,"This is not a safe professional domain"),{warnings}}))}handleInputChange(event){const value=event.target.value,uuid=event.target.name;this.props.adminSelfRegistrationContext.setAllowedDomains(uuid,value,(()=>this.validateForm())),this.checkForPublicDomainDebounce()}validateForm(){this.props.adminSelfRegistrationContext.validateForm()}canDelete(){return this.allowedDomains.size>1}render(){const isSubmitted=this.props.adminSelfRegistrationContext.isSubmitted(),errors=this.props.adminSelfRegistrationContext.getErrors();return react.createElement("div",{className:"row"},react.createElement("div",{className:"self-registration col7 main-column"},react.createElement("h3",null,react.createElement("span",{className:"input toggle-switch form-element"},react.createElement("input",{type:"checkbox",className:"toggle-switch-checkbox checkbox",name:"settings-toggle",onChange:this.handleToggleClicked,checked:this.state.isEnabled,disabled:this.hasAllInputDisabled(),id:"settings-toggle"}),react.createElement("label",{htmlFor:"settings-toggle"},react.createElement(es.x6,null,"Self Registration")))),this.props.adminSelfRegistrationContext.hasSettingsChanges()&&react.createElement("div",{className:"warning message",id:"self-registration-setting-overridden-banner"},react.createElement("p",null,react.createElement(es.x6,null,"Don't forget to save your settings to apply your modification."))),!this.state.isEnabled&&react.createElement("p",{className:"description",id:"disabled-description"},react.createElement(es.x6,null,"User self registration is disabled.")," ",react.createElement(es.x6,null,"Only administrators can invite users to register.")),this.state.isEnabled&&react.createElement(react.Fragment,null,react.createElement("div",{id:"self-registration-subtitle",className:`input ${this.hasWarnings()&&"warning"} ${isSubmitted&&errors.size>0&&"error"}`},react.createElement("label",{id:"enabled-label"},react.createElement(es.x6,null,"Email domain safe list"))),react.createElement("p",{className:"description",id:"enabled-description"},react.createElement(es.x6,null,"All the users with an email address ending with the domain in the safe list are allowed to register on passbolt.")),MapObject.A.iterators(this.allowedDomains).map((key=>react.createElement("div",{key,className:"input"},react.createElement("div",{className:"domain-row"},react.createElement("input",{type:"text",className:"full-width",onChange:this.handleInputChange,id:`input-${key}`,name:key,value:this.allowedDomains.get(key),disabled:!this.hasAllInputDisabled,ref:this.dynamicRefs.setRef(key),placeholder:this.props.t("domain")}),react.createElement("button",{type:"button",disabled:!this.canDelete(),className:"button-icon",id:`delete-${key}`,onClick:()=>this.handleDeleteRow(key)},react.createElement(Icon.A,{name:"trash"}))),this.hasWarnings()&&this.state.warnings.get(key)&&react.createElement("div",{id:"domain-name-input-feedback",className:"warning-message"},react.createElement(es.x6,null,this.state.warnings.get(key))),errors.get(key)&&isSubmitted&&react.createElement("div",{className:"error-message"},react.createElement(es.x6,null,errors.get(key)))))),react.createElement("div",{className:"domain-add"},react.createElement("button",{type:"button",onClick:this.handleAddRowClick},react.createElement(Icon.A,{name:"add"}),react.createElement("span",null,react.createElement(es.x6,null,"Add")))))),react.createElement("div",{className:"col4 last"},react.createElement("div",{className:"sidebar-help"},react.createElement("h3",null,react.createElement(es.x6,null,"What is user self registration?")),react.createElement("p",null,react.createElement(es.x6,null,"User self registration enables users with an email from a whitelisted domain to create their passbolt account without prior admin invitation.")),react.createElement("a",{className:"button",href:"https://passbolt.com/docs/admin/user-provisioning/self-registration/",target:"_blank",rel:"noopener noreferrer"},react.createElement(Icon.A,{name:"document"}),react.createElement("span",null,react.createElement(es.x6,null,"Read the documentation"))))))}}DisplaySelfRegistrationAdministration.propTypes={dialogContext:prop_types_default().any,context:prop_types_default().any,adminSelfRegistrationContext:prop_types_default().object,administrationWorkspaceContext:prop_types_default().object,t:prop_types_default().func};const DisplaySelfRegistrationAdministration_DisplaySelfRegistrationAdministration=(0,AppContext.L)((0,DialogContext.z9)((0,AdministrationSelfRegistrationContext.v6)((0,AdministrationWorkspaceContext.Kk)((0,es.CI)("common")(DisplaySelfRegistrationAdministration)))));DisplaySelfRegistrationAdministration.__docgenInfo={description:"This component allows to display the Self registration for the administration",methods:[{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"currentUser",docblock:"return the current user",modifiers:["get"],params:[],returns:null,description:"return the current user"},{name:"allowedDomains",docblock:"return the allowed domains",modifiers:["get"],params:[],returns:null,description:"return the allowed domains"},{name:"findSettings",docblock:"Bind callbacks methods",modifiers:["async"],params:[],returns:null,description:"Bind callbacks methods"},{name:"checkForWarnings",docblock:"We check for warnings and errors into the form",modifiers:[],params:[],returns:null,description:"We check for warnings and errors into the form"},{name:"setupSettings",docblock:"setup settings for the first time",modifiers:[],params:[],returns:null,description:"setup settings for the first time"},{name:"shouldFocusOnError",docblock:"set focus to the first input error",modifiers:[],params:[],returns:null,description:"set focus to the first input error"},{name:"shouldCheckWarnings",docblock:"in case of saved settings we should check warnings again",modifiers:[],params:[],returns:null,description:"in case of saved settings we should check warnings again"},{name:"populateUserDomain",docblock:"Check domain and populate it if it is a professional\n@param {string} domain",modifiers:[],params:[{name:"domain",type:{name:"string"},optional:!1}],returns:null,description:"Check domain and populate it if it is a professional"},{name:"addRow",docblock:"Check domain and populate it if is a professional domain\n@param {string} domain",modifiers:[],params:[{name:"value",optional:!0}],returns:null,description:"Check domain and populate it if is a professional domain"},{name:"handleDeleteRow",docblock:"Remove a domain row\n@param {string} key",modifiers:[],params:[{name:"key",type:{name:"string"},optional:!1}],returns:null,description:"Remove a domain row"},{name:"hasWarnings",docblock:"Check if inputs has warnings",modifiers:[],params:[],returns:null,description:"Check if inputs has warnings"},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"},{name:"handleToggleClicked",docblock:"Handle the click on the self registration title\n@param {UserDirectory} userDirectory state",modifiers:[],params:[],returns:null,description:"Handle the click on the self registration title"},{name:"handleAddRowClick",docblock:"Handle the click on the add button",modifiers:[],params:[],returns:null,description:"Handle the click on the add button"},{name:"checkDomainIsProfessional",docblock:"check if domain is a professional one",modifiers:[],params:[{name:"uuid",optional:!1},{name:"value",optional:!1}],returns:null,description:"check if domain is a professional one"},{name:"handleInputChange",docblock:"Handle input change\n@param event",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle input change"},{name:"validateForm",docblock:"validate the form\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"validate the form"},{name:"canDelete",docblock:"we cannot delete a row if we have only one domaine\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"we cannot delete a row if we have only one domaine"}],displayName:"DisplaySelfRegistrationAdministration",props:{dialogContext:{description:"",type:{name:"any"},required:!1},context:{description:"",type:{name:"any"},required:!1},adminSelfRegistrationContext:{description:"",type:{name:"object"},required:!1},administrationWorkspaceContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var SelfRegistrationEnumeration=__webpack_require__("./src/shared/models/selfRegistration/SelfRegistrationEnumeration.js"),ApiAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ApiAppContext.test.data.js");function defaultProps(data={}){const defaultProps1={context:(0,ApiAppContext_test_data.s)(data?.context),administrationWorkspaceContext:{setDisplayAdministrationWorkspaceAction:jest.fn(),resetDisplayAdministrationWorkspaceAction:jest.fn()},actionFeedbackContext:{displaySuccess:jest.fn(),displayError:jest.fn()},dialogContext:{open:jest.fn(),close:jest.fn()},t:text=>text};return Object.assign(defaultProps1,data)}function mockResult(domains=allowedDomains,provider=SelfRegistrationEnumeration.y.EMAILDOMAINS){return{id:"287ddd52-8131-4ef0-bdb8-19cf8291bf11",provider,data:{allowed_domains:domains}}}const allowedDomains=["passbolt.com","passbolt.io","passbolt.lu"],DisplaySelfRegistrationAdministration_test_stories=(allowedDomains[0],allowedDomains[1],allowedDomains[2],{title:"Components/Administration/DisplaySelfRegistrationAdministration",component:DisplaySelfRegistrationAdministration_DisplaySelfRegistrationAdministration});let currentStory=null;(new MockFetch.A).addGetFetchRequest(/self-registration\/settings\.json/,(async()=>{switch(currentStory){case"components-administration-displayselfregistrationadministration--default":return(0,mockApiResponse._)(mockResult(null));case"components-administration-displayselfregistrationadministration--with-profesionnal-domains":return(0,mockApiResponse._)(mockResult())}throw new Error("Unsupported story")}));const decorators=[(Story,context)=>(currentStory=context.id,react.createElement(react.Fragment,null,react.createElement(Story,null)))],Template=args=>react.createElement(AdministrationSelfRegistrationContext.ji,args,react.createElement("div",{className:"panel middle"},react.createElement("div",{className:"grid grid-responsive-12"},react.createElement(DisplaySelfRegistrationAdministration_DisplaySelfRegistrationAdministration,args))));Template.propTypes={context:prop_types_default().object};const Default=Template.bind({});Default.args=defaultProps(),Default.decorators=decorators,Default.parameters={css:"api_main"};const withProfesionnalDomains=Template.bind({});withProfesionnalDomains.args=defaultProps(),withProfesionnalDomains.decorators=decorators;const __namedExportsOrder=["Default","withProfesionnalDomains"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => <AdminSelfRegistrationContextProvider {...args}>\n    <div className="panel middle">\n      <div className="grid grid-responsive-12">\n        <DisplaySelfRegistrationAdministration {...args} />\n      </div>\n    </div>\n  </AdminSelfRegistrationContextProvider>',...Default.parameters?.docs?.source}}},withProfesionnalDomains.parameters={...withProfesionnalDomains.parameters,docs:{...withProfesionnalDomains.parameters?.docs,source:{originalSource:'args => <AdminSelfRegistrationContextProvider {...args}>\n    <div className="panel middle">\n      <div className="grid grid-responsive-12">\n        <DisplaySelfRegistrationAdministration {...args} />\n      </div>\n    </div>\n  </AdminSelfRegistrationContextProvider>',...withProfesionnalDomains.parameters?.docs?.source}}}},"./node_modules/debounce-promise/dist/index.js":module=>{module.exports=function debounce(fn){var wait=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,options=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},lastCallAt=void 0,deferred=void 0,timer=void 0,pendingArgs=[];return function debounced(){var currentWait=function getWait(wait){return"function"==typeof wait?wait():wait}(wait),currentTime=(new Date).getTime(),isCold=!lastCallAt||currentTime-lastCallAt>currentWait;lastCallAt=currentTime;for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];if(isCold&&options.leading)return options.accumulate?Promise.resolve(fn.call(this,[args])).then((function(result){return result[0]})):Promise.resolve(fn.call.apply(fn,[this].concat(args)));if(deferred?clearTimeout(timer):deferred=function defer(){var deferred={};return deferred.promise=new Promise((function(resolve,reject){deferred.resolve=resolve,deferred.reject=reject})),deferred}(),pendingArgs.push(args),timer=setTimeout(flush.bind(this),currentWait),options.accumulate){var argsIndex=pendingArgs.length-1;return deferred.promise.then((function(results){return results[argsIndex]}))}return deferred.promise};function flush(){var thisDeferred=deferred;clearTimeout(timer),Promise.resolve(options.accumulate?fn.call(this,pendingArgs):fn.apply(this,pendingArgs[pendingArgs.length-1])).then(thisDeferred.resolve,thisDeferred.reject),pendingArgs=[],deferred=null}}},"./src/react-extension/test/mock/MockFetch.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var fetch_mock__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/fetch-mock/esm/client.js");const __WEBPACK_DEFAULT_EXPORT__=class MockFetch{constructor(){this.requestListeners={}}async addGetFetchRequest(name,callback){await fetch_mock__WEBPACK_IMPORTED_MODULE_0__.A.get(name,callback)}async addPostFetchRequest(name,callback){await fetch_mock__WEBPACK_IMPORTED_MODULE_0__.A.post(name,callback)}async addPutFetchRequest(name,callback){await fetch_mock__WEBPACK_IMPORTED_MODULE_0__.A.put(name,callback)}async addDeleteFetchRequest(name,callback){await fetch_mock__WEBPACK_IMPORTED_MODULE_0__.A.delete(name,callback)}}},"./test/mocks/mockApiResponse.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>mockApiResponse});const mockApiResponse=(body={},header={})=>Promise.resolve(JSON.stringify({header,body}))}}]);