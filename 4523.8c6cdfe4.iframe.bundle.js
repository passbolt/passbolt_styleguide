/*! For license information please see 4523.8c6cdfe4.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4523],{"./src/react-extension/components/Administration/EditSubscriptionKey/EditSubscriptionKey.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_react_extension_components_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/components/Common/Error/NotifyError/NotifyError.js"),_react_extension_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),_react_extension_components_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),_contexts_AdministrationWorkspaceContext__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/react-extension/contexts/AdministrationWorkspaceContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_contexts_Administration_AdministrationSubscription_AdministrationSubscription__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/react-extension/contexts/Administration/AdministrationSubscription/AdministrationSubscription.js");class EditSubscriptionKey extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.initEventHandlers(),this.createInputRef()}getDefaultState(){return{selectedFile:null,key:"",keyError:"",processing:!1,hasBeenValidated:!1}}initEventHandlers(){this.handleCloseClick=this.handleCloseClick.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleKeyInputKeyUp=this.handleKeyInputKeyUp.bind(this),this.handleSelectSubscriptionKeyFile=this.handleSelectSubscriptionKeyFile.bind(this),this.handleSelectFile=this.handleSelectFile.bind(this)}createInputRef(){this.keyInputRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef(),this.fileUploaderRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}componentDidMount(){this.setState({key:this.props.context.editSubscriptionKey.key||""})}async handleFormSubmit(event){event.preventDefault(),this.state.processing||await this.save()}handleInputChange(event){const target=event.target,value=target.value,name=target.name;this.setState({[name]:value})}handleKeyInputKeyUp(){if(this.state.hasAlreadyBeenValidated){const state=this.validateNameInput();this.setState(state)}}handleCloseClick(){this.props.context.setContext({editSubscriptionKey:null}),this.props.onClose()}handleSelectFile(){this.fileUploaderRef.current.click()}get selectedFilename(){return this.state.selectedFile?this.state.selectedFile.name:""}async handleSelectSubscriptionKeyFile(event){const[subscriptionFile]=event.target.files,subscriptionKey=await this.readSubscriptionKeyFile(subscriptionFile);this.setState({key:subscriptionKey,selectedFile:subscriptionFile}),this.state.hasBeenValidated&&await this.validate()}readSubscriptionKeyFile(subscriptionFile){const reader=new FileReader;return new Promise(((resolve,reject)=>{reader.onloadend=()=>{try{resolve(reader.result)}catch(e){reject(e)}},reader.readAsText(subscriptionFile)}))}async save(){if(this.state.processing)return;if(await this.setState({hasBeenValidated:!0}),await this.toggleProcessing(),!await this.validate())return this.handleValidateError(),void await this.toggleProcessing();const keyDto={data:this.state.key};try{await this.props.administrationWorkspaceContext.onUpdateSubscriptionKeyRequested(keyDto),await this.handleSaveSuccess(),await this.props.adminSubscriptionContext.findSubscriptionKey()}catch(error){await this.toggleProcessing(),this.handleSaveError(error),this.focusFieldError()}}handleValidateError(){this.focusFieldError()}async handleSaveSuccess(){await this.props.actionFeedbackContext.displaySuccess(this.translate("The subscription key has been updated successfully.")),this.props.administrationWorkspaceContext.onMustRefreshSubscriptionKey(),this.props.context.setContext({editSubscriptionKey:null,refreshSubscriptionAnnouncement:!0}),this.props.onClose()}async handleSaveError(error){if("PassboltSubscriptionError"===error.name)this.setState({keyError:error.message});else if("EntityValidationError"===error.name)this.setState({keyError:this.translate("The subscription key is invalid.")});else if("PassboltApiFetchError"===error.name&&error.data&&400===error.data.code)this.setState({keyError:error.message});else{console.error(error);const errorDialogProps={error};this.props.dialogContext.open(_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_5__.A,errorDialogProps)}}focusFieldError(){this.state.keyError&&this.keyInputRef.current.focus()}validateKeyInput(){const key=this.state.key.trim();let keyError="";return key.length||(keyError=this.translate("A subscription key is required.")),new Promise((resolve=>{this.setState({keyError},resolve)}))}async validate(){return this.setState({keyError:""}),await this.validateKeyInput(),""===this.state.keyError}async toggleProcessing(){await this.setState({processing:!this.state.processing})}hasAllInputDisabled(){return this.state.processing}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_2__.A,{title:this.translate("Edit subscription key"),onClose:this.handleCloseClick,disabled:this.state.processing,className:"edit-subscription-dialog"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{onSubmit:this.handleFormSubmit,noValidate:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input textarea required ${this.state.keyError?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"edit-tag-form-name"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Subscription key")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea",{id:"edit-subscription-form-key",name:"key",value:this.state.key,onKeyUp:this.handleKeyInputKeyUp,onChange:this.handleInputChange,disabled:this.hasAllInputDisabled(),ref:this.keyInputRef,className:"required full_report",required:"required",autoComplete:"off",autoFocus:!0})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input file "+(this.hasAllInputDisabled()?"disabled":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{type:"file",ref:this.fileUploaderRef,disabled:this.hasAllInputDisabled(),onChange:this.handleSelectSubscriptionKeyFile}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input-file-inline"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{type:"text",disabled:!0,placeholder:this.translate("No key file selected"),value:this.selectedFilename}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:"button primary",onClick:this.handleSelectFile,disabled:this.hasAllInputDisabled()},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Choose a file")))),this.state.keyError&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"key error-message"},this.state.keyError))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_7__.A,{disabled:this.hasAllInputDisabled(),onClick:this.handleCloseClick}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_react_extension_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_6__.A,{disabled:this.hasAllInputDisabled(),processing:this.state.processing,value:this.translate("Save")}))))}}EditSubscriptionKey.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_11___default().any,onClose:prop_types__WEBPACK_IMPORTED_MODULE_11___default().func,actionFeedbackContext:prop_types__WEBPACK_IMPORTED_MODULE_11___default().any,adminSubscriptionContext:prop_types__WEBPACK_IMPORTED_MODULE_11___default().object,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_11___default().any,administrationWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_11___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_11___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,_contexts_Administration_AdministrationSubscription_AdministrationSubscription__WEBPACK_IMPORTED_MODULE_10__.j$)((0,_contexts_AdministrationWorkspaceContext__WEBPACK_IMPORTED_MODULE_8__.Kk)((0,_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_3__.ot)((0,_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_4__.z9)((0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.CI)("common")(EditSubscriptionKey))))));EditSubscriptionKey.__docgenInfo={description:"Component allows the user to edit the subscription key from a dialog",methods:[{name:"getDefaultState",docblock:null,modifiers:[],params:[],returns:null},{name:"initEventHandlers",docblock:null,modifiers:[],params:[],returns:null},{name:"createInputRef",docblock:"Create DOM nodes or React elements references in order to be able to access them programmatically.",modifiers:[],params:[],returns:null,description:"Create DOM nodes or React elements references in order to be able to access them programmatically."},{name:"handleFormSubmit",docblock:"Handle form submit event.\n@params {ReactEvent} The react event\n@return {Promise}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"Promise"}},description:"Handle form submit event."},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handleKeyInputKeyUp",docblock:"Handle key input keyUp event.",modifiers:[],params:[],returns:null,description:"Handle key input keyUp event."},{name:"handleCloseClick",docblock:"Handle close button click.",modifiers:[],params:[],returns:null,description:"Handle close button click."},{name:"handleSelectFile",docblock:"Handle the selection of a file by file explorer",modifiers:[],params:[],returns:null,description:"Handle the selection of a file by file explorer"},{name:"selectedFilename",docblock:"Returns the selected file's name",modifiers:["get"],params:[],returns:null,description:"Returns the selected file's name"},{name:"handleSelectSubscriptionKeyFile",docblock:"Whenever the user select a subscription key file\n@param event The file dom event",modifiers:["async"],params:[{name:"event",description:"The file dom event",optional:!1}],returns:null,description:"Whenever the user select a subscription key file"},{name:"readSubscriptionKeyFile",docblock:"Read the selected subscription key file and returns its content in a base 64\n@param subscriptionFile A subscription key file",modifiers:[],params:[{name:"subscriptionFile",description:"A subscription key file",optional:!1}],returns:null,description:"Read the selected subscription key file and returns its content in a base 64"},{name:"save",docblock:"Save the changes.",modifiers:["async"],params:[],returns:null,description:"Save the changes."},{name:"handleValidateError",docblock:"Handle validation error.",modifiers:[],params:[],returns:null,description:"Handle validation error."},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:["async"],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"focusFieldError",docblock:"Focus the field of the form which is in error state.",modifiers:[],params:[],returns:null,description:"Focus the field of the form which is in error state."},{name:"validateKeyInput",docblock:"Validate the key input.\n@return {Promise}",modifiers:[],params:[],returns:{type:{name:"Promise"}},description:"Validate the key input."},{name:"validate",docblock:"Validate the form.\n@return {Promise<boolean>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"boolean"}]}},description:"Validate the form."},{name:"toggleProcessing",docblock:"Toggle the processing mode",modifiers:["async"],params:[],returns:null,description:"Toggle the processing mode"},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is processing"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"EditSubscriptionKey",props:{context:{description:"",type:{name:"any"},required:!1},onClose:{description:"",type:{name:"func"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},adminSubscriptionContext:{description:"",type:{name:"object"},required:!1},dialogContext:{description:"",type:{name:"any"},required:!1},administrationWorkspaceContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}}}]);