/*! For license information please see react-extension-components-ResourceFolder-DeleteResourceFolder-DeleteResourceFolder-test-stories.d10327dc.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7127],{"./src/react-extension/components/ResourceFolder/DeleteResourceFolder/DeleteResourceFolder.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,WithLongFolderName:()=>WithLongFolderName,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DeleteResourceFolder_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),DeleteResourceFolder=__webpack_require__("./src/react-extension/components/ResourceFolder/DeleteResourceFolder/DeleteResourceFolder.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");function defaultAppContext(appContext){const defaultAppContext={port:new MockPort.A,setContext:jest.fn(),folder:{id:"some folder id",name:"some name folder"},folders:[{id:"some folder id",name:"some name folder"}]};return Object.assign(defaultAppContext,appContext||{})}const DeleteResourceFolder_test_stories={title:"Components/ResourceFolder/DeleteResourceFolder",component:DeleteResourceFolder.A},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(DeleteResourceFolder.A,{...args,...routerProps})})));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args={context:defaultAppContext(),onClose:()=>{}};const WithLongFolderName=Template.bind({});WithLongFolderName.args={context:defaultAppContext({folders:[{id:1,name:"foldername".repeat(10)}],folder:{id:1}})},Initial.argTypes={context:{control:{type:"object"}}};const __namedExportsOrder=["Initial","WithLongFolderName"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <DeleteResourceFolder {...args} {...routerProps} />}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}},WithLongFolderName.parameters={...WithLongFolderName.parameters,docs:{...WithLongFolderName.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <DeleteResourceFolder {...args} {...routerProps} />}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...WithLongFolderName.parameters?.docs?.source}}}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormCancelButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.handleClick=this.handleClick.bind(this)}handleClick(){this.props.disabled||this.props.onClick()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",disabled:this.props.disabled,className:"link cancel",onClick:this.handleClick},this.props.value)}}FormCancelButton.defaultProps={value:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Cancel")},FormCancelButton.propTypes={disabled:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,onClick:prop_types__WEBPACK_IMPORTED_MODULE_2___default().func,value:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),prop_types__WEBPACK_IMPORTED_MODULE_2___default().node,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string])};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FormCancelButton);FormCancelButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"handleClick",docblock:"Handle cancel click\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Handle cancel click"}],displayName:"FormCancelButton",props:{value:{defaultValue:{value:"<Trans>Cancel</Trans>",computed:!1},description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/img/svg/spinner.svg"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FormSubmitButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks()}bindCallbacks(){this.getClassName=this.getClassName.bind(this)}getClassName(){let name="button primary";return this.props.warning?name+=" warning":this.props.attention&&(name+=" attention"),this.props.disabled&&(name+=" disabled"),this.props.processing&&(name+=" processing"),this.props.big&&(name+=" big"),this.props.medium&&(name+=" medium"),this.props.fullWidth&&(name+=" full-width"),name}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:this.getClassName(),disabled:this.props.disabled},this.props.value||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Save"),this.props.processing&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_1__.A,null))}}FormSubmitButton.defaultProps={warning:!1,attention:!1},FormSubmitButton.propTypes={processing:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,value:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string]),warning:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,attention:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,big:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,medium:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,fullWidth:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool};const __WEBPACK_DEFAULT_EXPORT__=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FormSubmitButton);FormSubmitButton.__docgenInfo={description:"",methods:[{name:"bindCallbacks",docblock:"Bind callbacks methods\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Bind callbacks methods"},{name:"getClassName",docblock:"Get the input button classname\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get the input button classname"}],displayName:"FormSubmitButton",props:{warning:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},attention:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},processing:{description:"",type:{name:"bool"},required:!1},disabled:{description:"",type:{name:"bool"},required:!1},value:{description:"",type:{name:"union",value:[{name:"arrayOf",value:{name:"node"}},{name:"node"},{name:"string"}]},required:!1},big:{description:"",type:{name:"bool"},required:!1},medium:{description:"",type:{name:"bool"},required:!1},fullWidth:{description:"",type:{name:"bool"},required:!1}}}},"./src/react-extension/components/ResourceFolder/DeleteResourceFolder/DeleteResourceFolder.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Error/NotifyError/NotifyError.js"),_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js"),_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton.js"),_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js"),_contexts_LoadingContext__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/react-extension/contexts/LoadingContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class DeleteResourceFolder extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getStateBasedOnContext(props,this.getDefaultState()),this.bindEventHandlers()}async componentDidMount(){this.setState({loading:!1})}getDefaultState(){return{loading:!0,processing:!1,cascade:!1}}bindEventHandlers(){this.handleClose=this.handleClose.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleInputChange=this.handleInputChange.bind(this)}getStateBasedOnContext(props,defaultState){const folders=props.context.folders,error={message:this.translate("The folder could not be found. Maybe it was deleted or you lost access.")};folders||(console.error("No folders context defined."),this.handleError(error));const folder=props.context.folders.find((item=>item.id===props.context.folder.id))||!1;return folder?defaultState.name=folder.name:(console.error(`Folder ${props.context.folder.id} not found in context.`),this.handleError(error)),defaultState}async handleFormSubmit(event){if(event.preventDefault(),!this.state.processing){await this.toggleProcessing();try{this.props.loadingContext.add(),await this.props.context.port.request("passbolt.folders.delete",this.props.context.folder.id,this.state.cascade),await this.handleSaveSuccess()}catch(error){this.handleSaveError(error)}}}async handleSaveSuccess(){this.props.loadingContext.remove(),await this.props.actionFeedbackContext.displaySuccess(this.translate("The folder was deleted successfully")),this.props.onClose()}handleSaveError(error){this.props.loadingContext.remove(),"UserAbortsOperationError"===error.name||(console.error(error),this.handleError(error)),this.setState({processing:!1})}handleError(error){const errorDialogProps={error};this.props.dialogContext.open(_Common_Error_NotifyError_NotifyError__WEBPACK_IMPORTED_MODULE_2__.A,errorDialogProps)}async toggleProcessing(){const prev=this.state.processing;return new Promise((resolve=>{this.setState({processing:!prev},resolve())}))}handleInputChange(event){const target=event.target,value="checkbox"===target.type?target.checked:target.value,name=target.name;this.setState({[name]:value})}handleClose(){this.state.processing||this.props.onClose()}hasAllInputDisabled(){return this.state.processing||this.state.loading}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Dialog_DialogWrapper_DialogWrapper__WEBPACK_IMPORTED_MODULE_5__.A,{className:"folder-create-dialog",title:this.translate("Delete folder?"),onClose:this.handleClose,disabled:this.hasAllInputDisabled()},react__WEBPACK_IMPORTED_MODULE_0__.createElement("form",{className:"folder-create-form",onSubmit:this.handleFormSubmit,noValidate:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Are you sure you want to delete the folder ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong",{className:"dialog-variable"},{folderName:this.state.name}),"?")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"This action cannot be undone. Other users may lose access.")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"input checkbox"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",{id:"delete-cascade",type:"checkbox",name:"cascade",onChange:this.handleInputChange,autoFocus:!0,disabled:this.hasAllInputDisabled()})," ",react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",{htmlFor:"delete-cascade"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Also delete items inside this folder.")))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormCancelButton__WEBPACK_IMPORTED_MODULE_4__.A,{disabled:this.hasAllInputDisabled(),onClick:this.handleClose}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_3__.A,{disabled:this.hasAllInputDisabled(),processing:this.state.processing,value:this.translate("Delete"),warning:!0}))))}}DeleteResourceFolder.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,onClose:prop_types__WEBPACK_IMPORTED_MODULE_10___default().func,actionFeedbackContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,loadingContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_10___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,_contexts_LoadingContext__WEBPACK_IMPORTED_MODULE_8__.$A)((0,_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__.z9)((0,_contexts_ActionFeedbackContext__WEBPACK_IMPORTED_MODULE_7__.ot)((0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.CI)("common")(DeleteResourceFolder)))));DeleteResourceFolder.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Return default state\n@returns {Object} default state",modifiers:[],params:[],returns:{description:"default state",type:{name:"Object"}},description:"Return default state"},{name:"bindEventHandlers",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"getStateBasedOnContext",docblock:"Return default state based on context and props\nFor example if folder doesn't exist then we show an error message\nOtherwise set the input name value\n\n@param props\n@param defaultState\n@returns {*}",modifiers:[],params:[{name:"props",optional:!1},{name:"defaultState",optional:!1}],returns:{type:{name:"mixed"}},description:"Return default state based on context and props\nFor example if folder doesn't exist then we show an error message\nOtherwise set the input name value"},{name:"handleFormSubmit",docblock:"Handle form submit event.\n@params {ReactEvent} The react event\n@return {Promise}",modifiers:["async"],params:[{name:"event",optional:!1}],returns:{type:{name:"Promise"}},description:"Handle form submit event."},{name:"handleSaveSuccess",docblock:"Handle save operation success.",modifiers:["async"],params:[],returns:null,description:"Handle save operation success."},{name:"handleSaveError",docblock:"Handle save operation error.\n@param {object} error The returned error",modifiers:[],params:[{name:"error",description:"The returned error",type:{name:"object"},optional:!1}],returns:null,description:"Handle save operation error."},{name:"handleError",docblock:"handle error to display the error dialog\n@param error",modifiers:[],params:[{name:"error",optional:!1}],returns:null,description:"handle error to display the error dialog"},{name:"toggleProcessing",docblock:"Toggle processing state\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Toggle processing state"},{name:"handleInputChange",docblock:"Handle form input change.\n@params {ReactEvent} The react event.",modifiers:[],params:[{name:"event",optional:!1}],returns:null,description:"Handle form input change."},{name:"handleClose",docblock:"Handle close button click.",modifiers:[],params:[],returns:null,description:"Handle close button click."},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"DeleteResourceFolder",props:{context:{description:"",type:{name:"any"},required:!1},onClose:{description:"",type:{name:"func"},required:!1},actionFeedbackContext:{description:"",type:{name:"any"},required:!1},dialogContext:{description:"",type:{name:"any"},required:!1},loadingContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/DialogContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>DialogContextProvider,z9:()=>withDialog});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const DialogContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({dialogs:[],open:()=>{},close:()=>{}});class DialogContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{dialogs:[],open:(Dialog,DialogProps)=>{const dialogKey=(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)();return this.setState({dialogs:[...this.state.dialogs,{key:dialogKey,Dialog,DialogProps}]}),dialogKey},close:dialogKey=>this.setState({dialogs:this.state.dialogs.filter((dialog=>dialogKey!==dialog.key))}),closeAll:()=>this.setState({dialogs:[]})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Provider,{value:this.state},this.props.children)}}function withDialog(WrappedComponent){return class WithDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Consumer,null,(dialogContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{dialogContext,...this.props})))}}}DialogContextProvider.displayName="DialogContextProvider",DialogContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},DialogContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"}],displayName:"DialogContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);