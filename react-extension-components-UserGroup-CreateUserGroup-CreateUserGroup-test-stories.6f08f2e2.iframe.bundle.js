/*! For license information please see react-extension-components-UserGroup-CreateUserGroup-CreateUserGroup-test-stories.6f08f2e2.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7169],{"./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_router_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_CreateUserGroup__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.js"),_CreateUserGroup_test_data__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.test.data.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/UserGroup/CreateUserGroup",component:_CreateUserGroup__WEBPACK_IMPORTED_MODULE_2__.A,decorators:[(Story,{args})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.MemoryRouter,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.A.Provider,{value:args.context},react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null)))]},context=(0,_CreateUserGroup_test_data__WEBPACK_IMPORTED_MODULE_3__.st)();context.port.addRequestListener("passbolt.keyring.get-public-key-info-by-user",(async()=>_CreateUserGroup_test_data__WEBPACK_IMPORTED_MODULE_3__.Cs));const Initial={args:{context,...(0,_CreateUserGroup_test_data__WEBPACK_IMPORTED_MODULE_3__.Gs)()}},__namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"{\n  args: {\n    context,\n    ...defaultProps()\n  }\n}",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_list__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-list/react-list.js"),react_list__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_list__WEBPACK_IMPORTED_MODULE_1__),prop_types__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__),_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/components/Common/Error/NotifyError/NotifyError.js"),_Common_Inputs_Autocomplete_Autocomplete__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/components/Common/Inputs/Autocomplete/Autocomplete.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_EditUserGroup_EditUserGroupItem__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./src/react-extension/components/UserGroup/EditUserGroup/EditUserGroupItem.js"),_lib_Error_InputValidator__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./src/react-extension/lib/Error/InputValidator.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_shared_constants_inputs_const__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./src/shared/constants/inputs.const.js");class CreateUserGroup extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindEventHandlers(),this.createRef()}get defaultState(){return{loading:!0,processing:!1,name:"",nameError:"",nameWarning:"",groups_users:[],autocompleteOpen:!1}}bindEventHandlers(){this.handleClose=this.handleClose.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleAutocompleteSelect=this.handleAutocompleteSelect.bind(this),this.handleAutocompleteClose=this.handleAutocompleteClose.bind(this),this.handleAutocompleteOpen=this.handleAutocompleteOpen.bind(this),this.fetchAutocompleteItems=this.fetchAutocompleteItems.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleNameInputKeyUp=this.handleNameInputKeyUp.bind(this),this.handleSelectUpdate=this.handleSelectUpdate.bind(this),this.handleDeleteClickEvent=this.handleDeleteClickEvent.bind(this),this.renderItem=this.renderItem.bind(this),this.renderContainer=this.renderContainer.bind(this)}createRef(){this.groupUsersListRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef(),this.nameInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}async componentDidMount(){await this.addCurrentUser(),this.setState({loading:!1},(()=>{this.nameInputRef.current.focus()}))}handleClose(){this.props.onClose()}handleAutocompleteOpen(){this.setState({autocompleteOpen:!0})}handleAutocompleteClose(){this.setState({autocompleteOpen:!1})}handleInputChange(event){const target=event.target,value=target.value,name=target.name;this.setState({[name]:value})}handleNameInputKeyUp(){const state=this.validateNameInput();this.setState(state);const nameWarning=(0,_lib_Error_InputValidator__WEBPACK_IMPORTED_MODULE_13__.d)(this.state.name,_shared_constants_inputs_const__WEBPACK_IMPORTED_MODULE_14__.nX,this.translate);this.setState({nameWarning})}handleSelectUpdate(event,userId){const is_admin=!0===event.target.value,groups_users=Object.assign(this.state.groups_users),index=groups_users.findIndex((groups_user=>groups_user.user.id===userId));groups_users[index]=Object.assign(groups_users[index],{is_admin}),this.setState({groups_users})}handleDeleteClickEvent(event,userId){const groups_users=Object.assign(this.state.groups_users),index=groups_users.findIndex((groups_user=>groups_user.user.id===userId));groups_users.splice(index,1),this.setState({groups_users})}async handleFormSubmit(event){if(event.preventDefault(),await this.validate()){if(!this.state.processing){await this.toggleProcessing();try{await this.createGroup(),await this.handleSaveSuccess()}catch(error){this.handleSaveError(error)}}}else this.handleValidateError()}handleValidateError(){this.setState({processing:!1}),this.focusFieldError()}async handleSaveSuccess(){await this.props.actionFeedbackContext.displaySuccess(this.translate("The group has been created successfully.")),this.props.onClose()}handleSaveError(error){"UserAbortsOperationError"===error.name?this.setState({processing:!1}):this.hasGroupNameAlreadyExists(error.data)?this.setState({processing:!1,nameError:error.data.body.name.group_unique}):(console.error(error),this.handleError(error),this.setState({processing:!1}))}hasGroupNameAlreadyExists(errorData){return errorData&&errorData.body&&errorData.body.name&&errorData.body.name.group_unique}handleError(error){const errorDialogProps={error};this.props.dialogContext.open(_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_5__.A,errorDialogProps)}async addCurrentUser(){const[user]=await this.decorateUsersWithGpgKey([this.props.context.loggedInUser]);this.state.groups_users.push({user,is_admin:!0})}async toggleProcessing(){const prev=this.state.processing;return this.setState({processing:!prev})}focusFieldError(){this.state.nameError&&this.nameInputRef.current.focus()}validateNameInput(){const name=this.state.name.trim();let nameError="";return name.length||(nameError=this.translate("A name is required.")),new Promise((resolve=>{this.setState({nameError},resolve)}))}async validate(){return this.setState({error:"",nameError:""}),await this.validateNameInput(),""===this.state.nameError}handleAutocompleteSelect(aro){const groups_users=this.state.groups_users,is_admin=0===this.state.groups_users.length;groups_users.push({user:aro,is_admin}),this.setState({groups_users},(()=>{this.groupUsersListRef.current.scrollTo(groups_users.length-1)}))}async createGroup(){const groups_users=this.state.groups_users.map((groups_user=>({user_id:groups_user.user.id,is_admin:groups_user.is_admin}))),groupDto={name:this.state.name,groups_users};return await this.props.context.port.request("passbolt.groups.create",groupDto)}async fetchAutocompleteItems(keyword){const words=(keyword=keyword.toLowerCase())&&keyword.split(/\s+/)||[""],userAlreadyAdded=user=>this.state.groups_users.some((groups_user=>groups_user.user.id===user.id)),matchWord=(word,value)=>(word=>new RegExp((word=>word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"))(word),"i"))(word).test(value),matchUser=(word,user)=>((word,user)=>matchWord(word,user.username))(word,user)||((word,user)=>matchWord(word,user.profile.first_name)||matchWord(word,user.profile.last_name))(word,user);let currentCount=0;const firstUsersMatched=this.props.context.users.filter((user=>{const isUserMatching=currentCount<_Common_Inputs_Autocomplete_Autocomplete__WEBPACK_IMPORTED_MODULE_6__.A.DISPLAY_LIMIT&&!0===user.active&&!userAlreadyAdded(user)&&(user=>words.every((word=>matchUser(word,user))))(user);return isUserMatching&&currentCount++,isUserMatching}));return this.decorateUsersWithGpgKey(firstUsersMatched)}async decorateUsersWithGpgKey(users){return await Promise.all(users.map((async user=>Object.assign(user,{gpgkey:await this.props.context.port.request("passbolt.keyring.get-public-key-info-by-user",user.id)}))))}hasAllInputDisabled(){return this.state.processing||this.state.loading}hasManager(){return this.hasMembers()&&this.state.groups_users.some((groups_user=>!0===groups_user.is_admin))}hasMembers(){return this.state.groups_users.length>0}hasSubmitDisabled(){return!this.hasManager()||this.hasAllInputDisabled()}formatFingerprint(fingerprint){const result=fingerprint.toUpperCase().replace(/.{4}/g,"$& ");return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,result.substr(0,24),react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),result.substr(25))}get permissions(){return[{value:!1,label:this.translate("Member")},{value:!0,label:this.translate("Group manager")}]}renderItem(index,key){const groupUser=this.state.groups_users[index],createUserGroupItemKey=groupUser.user.id;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditUserGroup_EditUserGroupItem__WEBPACK_IMPORTED_MODULE_11__.A,{key:createUserGroupItemKey,itemKey:createUserGroupItemKey,groupUser,onMemberRoleChange:event=>this.handleSelectUpdate(event,groupUser.user.id),onMemberRemoved:event=>this.handleDeleteClickEvent(event,groupUser.user.id),isLastItemDisplayed:key>=2,isMemberChanged:!0,isMemberAdded:!0,areActionsAllowed:!this.hasAllInputDisabled()})}renderContainer(items,ref){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{className:"permissions groups_users",ref},items)}get isSuspendedUserFeatureEnabled(){return this.props.context.siteSettings.canIUse("disableUser")}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_3__.A,{title:this.translate("Create group"),className:"edit-group-dialog",onClose:this.handleClose,disabled:this.hasAllInputDisabled()},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{className:"group-form",onSubmit:this.handleFormSubmit,noValidate:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input text required ${this.state.nameError?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"group_name"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"Group name"),this.state.nameWarning&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_12__.A,{name:"exclamation"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"group-name-input",name:"name","aria-required":!0,className:"required",maxLength:"50",type:"text",placeholder:this.translate("group name"),onKeyUp:this.handleNameInputKeyUp,onChange:this.handleInputChange,disabled:this.hasAllInputDisabled(),ref:this.nameInputRef}),this.state.nameError&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"name error-message"},this.state.nameError),this.state.nameWarning&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"name warning-message"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"Warning:"))," ",this.state.nameWarning)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input required"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"group_permission"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"Group members"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"group_members"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"scroll permission-edit"},this.hasMembers()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_list__WEBPACK_IMPORTED_MODULE_1___default(),{ref:this.groupUsersListRef,itemRenderer:this.renderItem,itemsRenderer:this.renderContainer,length:this.state.groups_users.length,minSize:4,type:this.state.groups_users.length<4?"simple":"uniform",threshold:30})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"permission-add"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_Autocomplete_Autocomplete__WEBPACK_IMPORTED_MODULE_6__.A,{id:"user-name-input",name:"name",label:this.translate("Add people"),placeholder:this.translate("Start typing a person name"),searchCallback:this.fetchAutocompleteItems,onSelect:this.handleAutocompleteSelect,onOpen:this.handleAutocompleteOpen,onClose:this.handleAutocompleteClose,disabled:this.hasAllInputDisabled(),baseUrl:this.props.context.userSettings.getTrustedDomain(),canShowUserAsSuspended:this.isSuspendedUserFeatureEnabled})),!this.hasMembers()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"message warning"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"The group is empty, please add a group manager."))),this.hasMembers()&&!this.hasManager()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"message error"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"Please make sure there is at least one group manager."))),this.hasManager()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"message warning"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"You need to click save for the changes to take place."))),this.state.nameWarning&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"message warning"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_10__.x6,null,"Warning:"))," ",this.state.nameWarning))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__.A,{disabled:this.hasAllInputDisabled(),onClick:this.handleClose}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_2__.A,{disabled:this.hasSubmitDisabled(),processing:this.state.processing,value:this.translate("Save")}))))}}CreateUserGroup.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_15___default().any,onClose:prop_types__WEBPACK_IMPORTED_MODULE_15___default().func,actionFeedbackContext:prop_types__WEBPACK_IMPORTED_MODULE_15___default().any,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_15___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_15___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_7__.L)((0,_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_9__.ot)((0,_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_8__.z9)((0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.CI)("common")(CreateUserGroup))));CreateUserGroup.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindEventHandlers",docblock:"Bind event handlers\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind event handlers"},{name:"createRef",docblock:"Create ref",modifiers:[],params:[],returns:null,description:"Create ref"},{name:"handleClose",docblock:"Handle close button click.\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close button click."},{name:"handleAutocompleteOpen",docblock:"handleAutocompleteOpen\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"handleAutocompleteOpen"},{name:"handleAutocompleteClose",docblock:"handleAutocompleteClose\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"handleAutocompleteClose"},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handleNameInputKeyUp",docblock:"Handle name input keyUp event.",modifiers:[],params:[],returns:null,description:"Handle name input keyUp event."},{name:"handleSelectUpdate",docblock:"Handle select update\n@param event\n@param userId",modifiers:[],params:[{name:"event",optional:!1},{name:"userId",optional:!1}],returns:null,description:"Handle select update"},{name:"handleDeleteClickEvent",docblock:"Handle delete click event\n@param event\n@param userId",modifiers:[],params:[{name:"event",optional:!1},{name:"userId",optional:!1}],returns:null,description:"Handle delete click event"},{name:"handleFormSubmit",docblock:"Handle form submit event.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form submit event."},{name:"handleValidateError",docblock:"Handle validation error.",modifiers:[],params:[],returns:null,description:"Handle validation error."},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:[],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"hasGroupNameAlreadyExists",docblock:"has username already exists\n@param errorData the error data received\n@returns {*}",modifiers:[],params:[{name:"errorData",description:"the error data received",optional:!1}],returns:{type:{name:"mixed"}},description:"has username already exists"},{name:"handleError",docblock:"handle error to display the error dialog\n@param error",modifiers:[],params:[{name:"error",optional:!1}],returns:null,description:"handle error to display the error dialog"},{name:"addCurrentUser",docblock:"Adds the current user in the group as group manager",modifiers:["async"],params:[],returns:null,description:"Adds the current user in the group as group manager"},{name:"toggleProcessing",docblock:"Toggle processing state\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Toggle processing state"},{name:"focusFieldError",docblock:"Focus the field of the form which is in error state.",modifiers:[],params:[],returns:null,description:"Focus the field of the form which is in error state."},{name:"validateNameInput",docblock:"Validate the name input.\n@return {Promise}",modifiers:[],params:[],returns:{type:{name:"Promise"}},description:"Validate the name input."},{name:"validate",docblock:"Validate the form.\n@return {Promise<boolean>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"boolean"}]}},description:"Validate the form."},{name:"handleAutocompleteSelect",docblock:"handleAutocompleteSelect\nWhat happens when an item in the autocomplete list is selected\ne.g. if it's not already in the list, add it and scroll\n@param {object} aro",modifiers:[],params:[{name:"aro",type:{name:"object"},optional:!1}],returns:null,description:"handleAutocompleteSelect\nWhat happens when an item in the autocomplete list is selected\ne.g. if it's not already in the list, add it and scroll"},{name:"createGroup",docblock:"Save the group\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Save the group"},{name:"fetchAutocompleteItems",docblock:"Get users matching the given keyword\n@param {string} keyword\n@returns users,",modifiers:["async"],params:[{name:"keyword",type:{name:"string"},optional:!1}],returns:{description:"users,"},description:"Get users matching the given keyword"},{name:"decorateUsersWithGpgKey",docblock:"Decorate a list of users with their gpg key.\n@param {array} users\n@returns {Promise<array}",modifiers:["async"],params:[{name:"users",type:{name:"array"},optional:!1}],returns:null,description:"Decorate a list of users with their gpg key."},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"},{name:"hasManager",docblock:"Has no manager\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has no manager"},{name:"hasMembers",docblock:"Has members\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Has members"},{name:"hasSubmitDisabled",docblock:"Return true if submit button should be disabled\nTrue if there is no owner, if all input should be disabled\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Return true if submit button should be disabled\nTrue if there is no owner, if all input should be disabled"},{name:"formatFingerprint",docblock:"Format fingerprint\n@param fingerprint\n@returns {JSX.Element}",modifiers:[],params:[{name:"fingerprint",optional:!1}],returns:{type:{name:"JSX.Element"}},description:"Format fingerprint"},{name:"permissions",docblock:"Get permissions\n@returns {[{label: *, value: boolean}]}",modifiers:["get"],params:[],returns:{type:{name:"tuple",elements:[]}},description:"Get permissions"},{name:"renderItem",docblock:"Use to render a single item of the user group list\n@param {integer} index of the item in the source list\n@param {integer} key index of the HTML element in the ReactList\n@returns {JSX.Element}",modifiers:[],params:[{name:"index",description:"of the item in the source list",type:{name:"integer"},optional:!1},{name:"key",description:"index of the HTML element in the ReactList",type:{name:"integer"},optional:!1}],returns:{type:{name:"JSX.Element"}},description:"Use to render a single item of the user group list"},{name:"renderContainer",docblock:"Use to render the container of the list of the ReactList component\n@param {Array<JSX.Element>} items the list of the items to be rendered as children element of the conainer\n@param {*} ref the ref ReactList needs to manage the scroll\n@returns {JSX.Element}",modifiers:[],params:[{name:"items",description:"the list of the items to be rendered as children element of the conainer",type:{name:"Array",elements:[{name:"JSX.Element"}]},optional:!1},{name:"ref",description:"the ref ReactList needs to manage the scroll",type:{name:"mixed"},optional:!1}],returns:{type:{name:"JSX.Element"}},description:"Use to render the container of the list of the ReactList component"},{name:"isSuspendedUserFeatureEnabled",docblock:"Returns true if the feature flag disableUser is enabled.\n@param {object} user\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the feature flag disableUser is enabled."},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"CreateUserGroup",props:{context:{description:"",type:{name:"any"},required:!1},onClose:{description:"",type:{name:"func"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},dialogContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/UserGroup/EditUserGroup/EditUserGroupItem.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>EditUserGroup_EditUserGroupItem});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),UserAvatar=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Select=__webpack_require__("./src/react-extension/components/Common/Select/Select.js"),userUtils=__webpack_require__("./src/shared/utils/userUtils.js"),TooltipPortal=__webpack_require__("./src/react-extension/components/Common/Tooltip/TooltipPortal.js"),Fingerprint=__webpack_require__("./src/react-extension/components/Common/Fingerprint/Fingerprint.js");class TooltipMessageGroupUserDetailsLoading extends react.Component{render(){return react.createElement("div",{className:"group-user-details-tooltip skeleton"},react.createElement("div",{className:"email"}," "),react.createElement("div",{className:"fingerprint"},react.createElement("div",{className:"fingerprint-line"}," "),react.createElement("div",{className:"fingerprint-line"}," ")),react.createElement("div",{className:"shimmer shimmer-tooltip"}))}}const Tooltip_TooltipMessageGroupUserDetailsLoading=TooltipMessageGroupUserDetailsLoading;TooltipMessageGroupUserDetailsLoading.__docgenInfo={description:"",methods:[],displayName:"TooltipMessageGroupUserDetailsLoading"};var svg_close=__webpack_require__("./src/img/svg/close.svg"),fingerprint=__webpack_require__("./src/img/svg/fingerprint.svg");class EditUserGroupItem extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{tooltipFingerprintMessage:null}}bindCallbacks(){this.onTooltipFingerprintMouseHover=this.onTooltipFingerprintMouseHover.bind(this)}getUserFullname(){const user=this.props.groupUser.user;return`${user.profile.first_name} ${user.profile.last_name}`}isUserSuspended(user){return this.props.context.siteSettings.canIUse("disableUser")&&(0,userUtils.B7)(user)}get isManagerSelectOptions(){return[{value:!1,label:react.createElement(es.x6,null,"Member")},{value:!0,label:react.createElement(es.x6,null,"Group manager")}]}async onTooltipFingerprintMouseHover(){if(this.state.tooltipFingerprintMessage)return;const gpgkey=await this.props.context.port.request("passbolt.keyring.get-public-key-info-by-user",this.props.groupUser.user.id),tooltipFingerprintMessage=react.createElement("div",{className:"group-user-details-tooltip"},react.createElement("div",{className:"email ellipsis"},react.createElement("strong",null,this.props.groupUser.user.username)),react.createElement(Fingerprint.A,{fingerprint:gpgkey.fingerprint}));this.setState({tooltipFingerprintMessage})}render(){const isSuspended=this.isUserSuspended(this.props.groupUser.user);return react.createElement("li",{className:`row ${this.props.isMemberChanged?"permission-updated":""} ${isSuspended?"suspended":""}`},react.createElement(UserAvatar.A,{baseUrl:this.props.context.userSettings.getTrustedDomain(),user:this.props.groupUser.user}),react.createElement("div",{className:"aro"},react.createElement("div",{className:"aro-name"},react.createElement("span",{className:"ellipsis"},this.getUserFullname(),isSuspended&&react.createElement("span",{className:"suspended"}," ",react.createElement(es.x6,null,"(suspended)"))),react.createElement(TooltipPortal.A,{message:this.state.tooltipFingerprintMessage||react.createElement(Tooltip_TooltipMessageGroupUserDetailsLoading,null),direction:"auto",onMouseHover:this.onTooltipFingerprintMouseHover},react.createElement(fingerprint.A,null))),react.createElement("div",{className:"permission_changes"},this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be added")),this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be updated")),!this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Unchanged")))),react.createElement("div",{className:"rights"},react.createElement(Select.A,{className:"permission inline",value:this.props.groupUser.is_admin,items:this.isManagerSelectOptions,onChange:event=>this.props.onMemberRoleChange(event,this.props.groupUser),disabled:!this.props.areActionsAllowed,direction:this.props.isLastItemDisplayed?"top":"bottom"})),react.createElement("div",{className:"actions"},react.createElement("button",{type:"button",title:this.props.t("Remove"),className:"remove-item button inline button-transparent",disabled:!this.props.areActionsAllowed,onClick:event=>this.props.onMemberRemoved(event,this.props.groupUser)},react.createElement(svg_close.A,null),react.createElement("span",{className:"visually-hidden"},react.createElement(es.x6,null,"Remove")))))}}EditUserGroupItem.defaultProps={isMemberChanged:!1,isMemberAdded:!1,areActionsAllowed:!1,isLastItemDisplayed:!1},EditUserGroupItem.propTypes={context:prop_types_default().any,groupUser:prop_types_default().object.isRequired,onMemberRoleChange:prop_types_default().func.isRequired,onMemberRemoved:prop_types_default().func.isRequired,isMemberChanged:prop_types_default().bool,isMemberAdded:prop_types_default().bool,areActionsAllowed:prop_types_default().bool,isLastItemDisplayed:prop_types_default().bool,t:prop_types_default().func};const EditUserGroup_EditUserGroupItem=(0,AppContext.L)((0,es.CI)("common")(EditUserGroupItem));EditUserGroupItem.__docgenInfo={description:"This component allows to edit an user group",methods:[{name:"defaultState",docblock:"Returns the component default state",modifiers:["get"],params:[],returns:null,description:"Returns the component default state"},{name:"bindCallbacks",docblock:"Bind callbacks.",modifiers:[],params:[],returns:null,description:"Bind callbacks."},{name:"getUserFullname",docblock:"Get a user full name\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get a user full name"},{name:"isUserSuspended",docblock:"Returns true if the feature flag disableUser is enabled and the given user is suspended.\n@param {object} user\n@returns {boolean}",modifiers:[],params:[{name:"user",type:{name:"object"},optional:!1}],returns:{type:{name:"boolean"}},description:"Returns true if the feature flag disableUser is enabled and the given user is suspended."},{name:"isManagerSelectOptions",docblock:"Get options for permission selection\n@returns {[{label: *, value: boolean}]}",modifiers:["get"],params:[],returns:{type:{name:"tuple",elements:[]}},description:"Get options for permission selection"},{name:"onTooltipFingerprintMouseHover",docblock:"Handle whenever the user passes its mouse hover the tooltip.\n@returns {Promise<JSX>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"JSX"}]}},description:"Handle whenever the user passes its mouse hover the tooltip."}],displayName:"EditUserGroupItem",props:{isMemberChanged:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isMemberAdded:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},areActionsAllowed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isLastItemDisplayed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},context:{description:"",type:{name:"any"},required:!1},groupUser:{description:"",type:{name:"object"},required:!0},onMemberRoleChange:{description:"",type:{name:"func"},required:!0},onMemberRemoved:{description:"",type:{name:"func"},required:!0},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/lib/Error/InputValidator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function maxSizeValidation(value,maxLength,translate){const sizeExceeded=value.length>=maxLength,warningMessage=translate("this is the maximum size for this field, make sure your data was not truncated");return sizeExceeded?warningMessage:""}__webpack_require__.d(__webpack_exports__,{d:()=>maxSizeValidation})},"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,VB:()=>RESOURCE_TOTP_KEY_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024,RESOURCE_TOTP_KEY_MAX_LENGTH=1024},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);