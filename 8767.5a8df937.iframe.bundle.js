/*! For license information please see 8767.5a8df937.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8767],{"./src/react-extension/components/Administration/DisplaySimulateSynchronizeUserDirectoryAdministration/DisplaySimulateSynchronizeUserDirectoryAdministration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_DisplayLoadingDialog_DisplayLoadingDialog__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/components/Administration/DisplayLoadingDialog/DisplayLoadingDialog.js"),_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_contexts_Administration_AdministrationUserDirectory_AdministrationUserDirectoryContext__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext.js");class DisplaySimulateSynchronizeUserDirectoryAdministration extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindEventHandlers()}get defaultState(){return{loading:!0,openFullReport:!1,userDirectorySimulateSynchronizeResult:null}}bindEventHandlers(){this.handleFullReportClicked=this.handleFullReportClicked.bind(this),this.handleClose=this.handleClose.bind(this),this.handleSynchronize=this.handleSynchronize.bind(this)}async componentDidMount(){try{const result=await this.props.adminUserDirectoryContext.simulateUsers();this.setState({loading:!1,userDirectorySimulateSynchronizeResult:result})}catch(error){await this.handleError(error)}}async handleError(error){console.error(error),await this.props.actionFeedbackContext.displayError(error.message),this.handleClose()}handleFullReportClicked(){this.setState({openFullReport:!this.state.openFullReport})}handleClose(){this.props.onClose()}handleSynchronize(){this.props.adminUserDirectoryContext.requestSynchronization(!0),this.handleClose()}isLoading(){return this.state.loading}get users(){return this.state.userDirectorySimulateSynchronizeResult.users}get groups(){return this.state.userDirectorySimulateSynchronizeResult.groups}get usersSuccess(){return this.users.filter((user=>"success"===user.status))}get groupsSuccess(){return this.groups.filter((group=>"success"===group.status))}get usersWarning(){return this.users.filter((user=>"warning"===user.status))}get groupsWarning(){return this.groups.filter((group=>"warning"===group.status))}get usersError(){return this.users.filter((user=>"error"===user.status))}get groupsError(){return this.groups.filter((group=>"error"===group.status))}get usersIgnored(){return this.users.filter((user=>"ignore"===user.status))}get groupsIgnored(){return this.groups.filter((group=>"ignore"===group.status))}hasSuccessResource(){return this.usersSuccess.length>0||this.groupsSuccess.length>0}hasSuccessUserResource(){return this.usersSuccess.length>0}hasSuccessGroupResource(){return this.groupsSuccess.length>0}hasErrorOrIgnoreResource(){return this.usersError.length>0||this.groupsError.length>0||this.usersWarning.length>0||this.groupsWarning.length>0||this.usersIgnored.length>0||this.groupsIgnored.length>0}getFullReport(){let fullReport="";return fullReport=fullReport.concat(this.getUsersFullReport()),fullReport=fullReport.concat(this.getGroupsFullReport()),fullReport}getUsersFullReport(){if(!(this.usersSuccess.length>0||this.usersWarning.length>0||this.usersError.length>0||this.usersIgnored.length>0))return"";let userFullReport="";const usersHeader=`-----------------------------------------------\n${this.props.t("Users")}\n-----------------------------------------------\n`;userFullReport=userFullReport.concat(usersHeader);const addMessage=user=>userFullReport=userFullReport.concat(`- ${user.message}\n`);return this.usersSuccess.length>0&&(userFullReport=userFullReport.concat(`\n${this.props.t("Success:")}\n`),this.usersSuccess.map(addMessage)),this.usersWarning.length>0&&(userFullReport=userFullReport.concat(`\n${this.props.t("Warning:")}\n`),this.usersWarning.map(addMessage)),this.usersError.length>0&&(userFullReport=userFullReport.concat(`\n${this.props.t("Errors:")}\n`),this.usersError.map(addMessage)),this.usersIgnored.length>0&&(userFullReport=userFullReport.concat(`\n${this.props.t("Ignored:")}\n`),this.usersIgnored.map(addMessage)),userFullReport.concat("\n")}getGroupsFullReport(){if(!(this.groupsSuccess.length>0||this.groupsWarning.length>0||this.groupsError.length>0||this.groupsIgnored.length>0))return"";let groupFullReport="";const groupsHeader=`-----------------------------------------------\n${this.props.t("Groups")}\n-----------------------------------------------\n`;groupFullReport=groupFullReport.concat(groupsHeader);const addMessage=group=>groupFullReport=groupFullReport.concat(`- ${group.message}\n`);return this.groupsSuccess.length>0&&(groupFullReport=groupFullReport.concat(`\n${this.props.t("Success:")}\n`),this.groupsSuccess.map(addMessage)),this.groupsWarning.length>0&&(groupFullReport=groupFullReport.concat(`\n${this.props.t("Warning:")}\n`),this.groupsWarning.map(addMessage)),this.groupsError.length>0&&(groupFullReport=groupFullReport.concat(`\n${this.props.t("Errors:")}\n`),this.groupsError.map(addMessage)),this.groupsIgnored.length>0&&(groupFullReport=groupFullReport.concat(`\n${this.props.t("Ignored:")}\n`),this.groupsIgnored.map(addMessage)),groupFullReport}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,this.isLoading()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DisplayLoadingDialog_DisplayLoadingDialog__WEBPACK_IMPORTED_MODULE_4__.A,{onClose:this.handleClose,title:this.props.t("Synchronize simulation")}),!this.isLoading()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_1__.A,{className:"ldap-simulate-synchronize-dialog",title:this.props.t("Synchronize simulation report"),onClose:this.handleClose,disabled:this.isLoading()},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content",onSubmit:this.handleFormSubmit},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_6__.x6,null,"The operation was successful."))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null),this.hasSuccessResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{id:"resources-synchronize"},this.hasSuccessUserResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,this.props.t("{{count}} user will be synchronized.",{count:this.usersSuccess.length})),this.hasSuccessUserResource()&&this.hasSuccessGroupResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),this.hasSuccessGroupResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,this.props.t("{{count}} group will be synchronized.",{count:this.groupsSuccess.length}))),!this.hasSuccessResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{id:"no-resources"}," ",react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_6__.x6,null,"No resources will be synchronized.")," "),this.hasErrorOrIgnoreResource()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{className:"error inline-error"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_6__.x6,null,"Some resources will not be synchronized and will require your attention, see the full report.")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion operation-details "+(this.state.openFullReport?"":"closed")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-header",onClick:this.handleFullReportClicked},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:"link no-border"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_6__.x6,null,"Full report"),this.state.openFullReport&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:"caret-down"}),!this.state.openFullReport&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:"caret-right"}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea",{className:"full_report",readOnly:!0,value:this.getFullReport()})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_2__.A,{disabled:this.isLoading(),onClick:this.handleClose}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",disabled:this.isLoading(),className:"primary",onClick:this.handleSynchronize},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_6__.x6,null,"Synchronize")))))}}DisplaySimulateSynchronizeUserDirectoryAdministration.propTypes={onClose:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_8___default().object,actionFeedbackContext:prop_types__WEBPACK_IMPORTED_MODULE_8___default().any,adminUserDirectoryContext:prop_types__WEBPACK_IMPORTED_MODULE_8___default().object,t:prop_types__WEBPACK_IMPORTED_MODULE_8___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_5__.ot)((0,_contexts_Administration_AdministrationUserDirectory_AdministrationUserDirectoryContext__WEBPACK_IMPORTED_MODULE_7__.e$)((0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.CI)("common")(DisplaySimulateSynchronizeUserDirectoryAdministration)));DisplaySimulateSynchronizeUserDirectoryAdministration.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindEventHandlers",docblock:"Bind event handlers\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind event handlers"},{name:"handleError",docblock:"Handle operation error.\n@param {object} error The returned error",modifiers:["async"],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle operation error."},{name:"handleFullReportClicked",docblock:"Handle the click on the errors",modifiers:[],params:[],returns:null,description:"Handle the click on the errors"},{name:"handleClose",docblock:"Handle close button click.\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close button click."},{name:"handleSynchronize",docblock:"Handle synchronize button click.",modifiers:[],params:[],returns:null,description:"Handle synchronize button click."},{name:"isLoading",docblock:"Should input be disabled? True if state is loading\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading"},{name:"users",docblock:"Get users\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get users"},{name:"groups",docblock:"Get groups\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get groups"},{name:"usersSuccess",docblock:"Get users success\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get users success"},{name:"groupsSuccess",docblock:"Get groups success\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get groups success"},{name:"usersWarning",docblock:"Get users success\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get users success"},{name:"groupsWarning",docblock:"Get groups error\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get groups error"},{name:"usersError",docblock:"Get users error\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get users error"},{name:"groupsError",docblock:"Get groups error\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get groups error"},{name:"usersIgnored",docblock:"Get users ignored\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get users ignored"},{name:"groupsIgnored",docblock:"Get groups ignored\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get groups ignored"},{name:"hasSuccessResource",docblock:"Has success resource\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has success resource"},{name:"hasSuccessUserResource",docblock:"Has success user resource\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has success user resource"},{name:"hasSuccessGroupResource",docblock:"Has success resource\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has success resource"},{name:"hasErrorOrIgnoreResource",docblock:"Has error or ignore resource\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has error or ignore resource"},{name:"getFullReport",docblock:"get the full reports\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"get the full reports"},{name:"getUsersFullReport",docblock:"get the full users report\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"get the full users report"},{name:"getGroupsFullReport",docblock:"get the full groups report\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"get the full groups report"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"DisplaySimulateSynchronizeUserDirectoryAdministration",props:{onClose:{description:"",type:{name:"func"},required:!1},dialogContext:{description:"",type:{name:"object"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},adminUserDirectoryContext:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}}}]);