/*! For license information please see react-extension-components-ResourceFolder-RenameResourceFolder-RenameResourceFolder-test-stories.5f367499.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[1613],{"./src/react-extension/components/ResourceFolder/RenameResourceFolder/RenameResourceFolder.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),_RenameResourceFolder__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/ResourceFolder/RenameResourceFolder/RenameResourceFolder.js"),_test_mock_MockPort__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/test/mock/MockPort.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ResourceFolder/RenameResourceFolder",component:_RenameResourceFolder__WEBPACK_IMPORTED_MODULE_2__.A},mockedPort=new _test_mock_MockPort__WEBPACK_IMPORTED_MODULE_3__.A;mockedPort.addRequestListener("passbolt.folders.update",(data=>data));const defaultContext={folders:[{id:1,name:"My folder"}],folder:{id:1},setContext:()=>{},port:mockedPort},Template=({context,...args})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.A.Provider,{value:context},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.fS,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.qh,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_RenameResourceFolder__WEBPACK_IMPORTED_MODULE_2__.A,{...args,...routerProps})})));Template.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_5___default().object,onClose:()=>{}};const Initial=Template.bind({});Initial.args={context:defaultContext,onClose:()=>{}},Initial.argTypes={context:{control:{type:"object"}}};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <RenameResourceFolder {...args} {...routerProps} />}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/components/Icons/Icon.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_1__.A,{name:"spinner"}))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}},"./src/react-extension/components/ResourceFolder/RenameResourceFolder/RenameResourceFolder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Error/NotifyError/NotifyError.js"),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_lib_Error_InputValidator__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/react-extension/lib/Error/InputValidator.js"),_shared_constants_inputs_const__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./src/shared/constants/inputs.const.js");class RenameResourceFolder extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getStateBasedOnContext(props,this.getDefaultState()),this.createInputRefs(),this.bindEventHandlers()}async componentDidMount(){this.setState({loading:!1},(()=>{this.nameRef.current.focus()}))}getDefaultState(){return{loading:!0,processing:!1,inlineValidation:!1,name:this.translate("loading..."),nameError:!1,nameWarning:""}}getStateBasedOnContext(props,defaultState){const folders=props.context.folders,error={message:this.translate("The folder could not be found. Maybe it was deleted or you lost access.")};folders||(console.error("No folders context defined."),this.handleError(error));const folder=props.context.folders.find((item=>item.id===props.context.folder.id))||!1;return folder?defaultState.name=folder.name:(console.error(`Folder ${props.context.folder.id} not found in context.`),this.handleError(error)),defaultState}createInputRefs(){this.nameRef=react__WEBPACK_IMPORTED_MODULE_0__.createRef()}bindEventHandlers(){this.handleClose=this.handleClose.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleNameInputKeyUp=this.handleNameInputKeyUp.bind(this)}handleClose(){this.props.onClose()}handleInputChange(event){const target=event.target,value=target.value,name=target.name;this.setState({[name]:value},(()=>{this.state.inlineValidation&&this.validate()}))}async handleFormSubmit(event){if(event.preventDefault(),!this.state.processing){if(this.setState({inlineValidation:this.state.inlineValidation||!0}),await this.toggleProcessing(),await this.validate(),this.hasValidationError())return await this.toggleProcessing(),void this.focusFirstFieldError();try{const folder=await this.updateFolder();await this.handleSaveSuccess(folder.id)}catch(error){this.handleSaveError(error)}}}async handleSaveSuccess(folderId){await this.props.actionFeedbackContext.displaySuccess(this.translate("The folder was renamed successfully")),this.selectAndScrollToFolder(folderId),this.props.onClose()}handleSaveError(error){"UserAbortsOperationError"===error.name||(console.error(error),this.handleError(error)),this.setState({processing:!1})}handleError(error){const errorDialogProps={error};this.props.dialogContext.open(_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_2__.A,errorDialogProps)}async toggleProcessing(){const prev=this.state.processing;return new Promise((resolve=>{this.setState({processing:!prev},resolve())}))}focusFirstFieldError(){this.nameRef.current.focus()}async updateFolder(){const folderDto={id:this.props.context.folder.id,name:this.state.name};return await this.props.context.port.request("passbolt.folders.update",folderDto)}selectAndScrollToFolder(id){this.props.context.port.emit("passbolt.folders.select-and-scroll-to",id)}async validate(){return await this.resetValidation(),await this.validateNameInput(),this.hasValidationError()}async resetValidation(){return new Promise((resolve=>{this.setState({nameError:!1},resolve())}))}validateNameInput(){let nameError=!1;const name=this.state.name.trim();return name.length||(nameError=this.translate("A name is required.")),name.length>256&&(nameError=this.translate("A name can not be more than 256 char in length.")),new Promise((resolve=>{this.setState({nameError},resolve)}))}handleNameInputKeyUp(){const nameWarning=(0,_lib_Error_InputValidator__WEBPACK_IMPORTED_MODULE_10__.d)(this.state.name,_shared_constants_inputs_const__WEBPACK_IMPORTED_MODULE_11__.yN,this.translate);this.setState({nameWarning})}hasValidationError(){return!1!==this.state.nameError}hasAllInputDisabled(){return this.state.processing||this.state.loading}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_3__.A,{className:"rename-folder-dialog",title:this.translate("Rename a folder"),onClose:this.handleClose,disabled:this.hasAllInputDisabled()},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{className:"folder-rename-form",onSubmit:this.handleFormSubmit,noValidate:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`input text required ${this.state.nameError?"error":""} ${this.hasAllInputDisabled()?"disabled":""}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"folder-name-input"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_8__.x6,null,"Folder name"),this.state.nameWarning&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_9__.A,{name:"exclamation"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"folder-name-input",name:"name",ref:this.nameRef,type:"text",value:this.state.name,placeholder:this.translate("Untitled folder"),maxLength:"256",required:"required",onChange:this.handleInputChange,onKeyUp:this.handleNameInputKeyUp,disabled:this.hasAllInputDisabled(),autoComplete:"off",autoFocus:!0}),this.state.nameError&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"name error-message"},this.state.nameError),this.state.nameWarning&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"name warning-message"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_8__.x6,null,"Warning:"))," ",this.state.nameWarning))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_5__.A,{disabled:this.hasAllInputDisabled(),onClick:this.handleClose}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_4__.A,{disabled:this.hasAllInputDisabled(),processing:this.state.processing,value:this.translate("Rename")}))))}}RenameResourceFolder.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_12___default().any,onClose:prop_types__WEBPACK_IMPORTED_MODULE_12___default().func,actionFeedbackContext:prop_types__WEBPACK_IMPORTED_MODULE_12___default().any,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_12___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_12___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__.z9)((0,_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_7__.ot)((0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.CI)("common")(RenameResourceFolder))));RenameResourceFolder.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Return default state\n@returns {Object} default state",modifiers:[],params:[],returns:{description:"default state",type:{name:"Object"}},description:"Return default state"},{name:"getStateBasedOnContext",docblock:"Return default state based on context and props\nFor example if folder doesn't exist then we show an error message\nOtherwise set the input name value\n\n@param props\n@param defaultState\n@returns {*}",modifiers:[],params:[{name:"props",optional:!1},{name:"defaultState",optional:!1}],returns:{type:{name:"mixed"}},description:"Return default state based on context and props\nFor example if folder doesn't exist then we show an error message\nOtherwise set the input name value"},{name:"createInputRefs",docblock:"Create references\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Create references"},{name:"bindEventHandlers",docblock:"Bind event handlers\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind event handlers"},{name:"handleClose",docblock:"Handle close button click.\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle close button click."},{name:"handleInputChange",docblock:"Handle form input changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:[],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form input changes."},{name:"handleFormSubmit",docblock:"Handle form submit event.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form submit event."},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[{name:"folderId",optional:!1}],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:[],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"handleError",docblock:"handle error to display the error dialog\n@param error",modifiers:[],params:[{name:"error",optional:!1}],returns:null,description:"handle error to display the error dialog"},{name:"toggleProcessing",docblock:"Toggle processing state\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Toggle processing state"},{name:"focusFirstFieldError",docblock:"Focus the first field of the form which is in error state.\n@returns {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Focus the first field of the form which is in error state."},{name:"updateFolder",docblock:"Update the folder\n@returns {Promise<Object>} Folder entity or Error",modifiers:["async"],params:[],returns:{description:"Folder entity or Error",type:{name:"Promise",elements:[{name:"Object"}]}},description:"Update the folder"},{name:"selectAndScrollToFolder",docblock:"Select and scroll to a given resource.\n@param {string} id The resource id.\n@returns {void}",modifiers:[],params:[{name:"id",description:"The resource id.",type:{name:"string"},optional:!1}],returns:{type:{name:"void"}},description:"Select and scroll to a given resource."},{name:"validate",docblock:"Validate the form.\n@returns {Promise<boolean>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"boolean"}]}},description:"Validate the form."},{name:"resetValidation",docblock:"Reset validation errors\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Reset validation errors"},{name:"validateNameInput",docblock:"Validate the name input.\n@returns {Promise<void>}",modifiers:[],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Validate the name input."},{name:"handleNameInputKeyUp",docblock:"Handle name input keyUp event.",modifiers:[],params:[],returns:null,description:"Handle name input keyUp event."},{name:"hasValidationError",docblock:"Return true if the form has some validation error\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Return true if the form has some validation error"},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"RenameResourceFolder",props:{context:{description:"",type:{name:"any"},required:!1},onClose:{description:"",type:{name:"func"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},dialogContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/DialogContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>DialogContextProvider,z9:()=>withDialog});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const DialogContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({dialogs:[],open:()=>{},close:()=>{}});class DialogContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{dialogs:[],open:(Dialog,DialogProps)=>{const dialogKey=(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)();return this.setState({dialogs:[...this.state.dialogs,{key:dialogKey,Dialog,DialogProps}]}),dialogKey},close:dialogKey=>this.setState({dialogs:this.state.dialogs.filter((dialog=>dialogKey!==dialog.key))}),closeAll:()=>this.setState({dialogs:[]})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Provider,{value:this.state},this.props.children)}}function withDialog(WrappedComponent){return class WithDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Consumer,null,(dialogContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{dialogContext,...this.props})))}}}DialogContextProvider.displayName="DialogContextProvider",DialogContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},DialogContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"}],displayName:"DialogContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/lib/Error/InputValidator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function maxSizeValidation(value,maxLength,translate){const sizeExceeded=value.length>=maxLength,warningMessage=translate("this is the maximum size for this field, make sure your data was not truncated");return sizeExceeded?warningMessage:""}__webpack_require__.d(__webpack_exports__,{d:()=>maxSizeValidation})},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,VB:()=>RESOURCE_TOTP_KEY_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024,RESOURCE_TOTP_KEY_MAX_LENGTH=1024},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);