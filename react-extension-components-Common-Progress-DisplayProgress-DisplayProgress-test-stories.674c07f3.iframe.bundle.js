/*! For license information please see react-extension-components-Common-Progress-DisplayProgress-DisplayProgress-test-stories.674c07f3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[6424],{"./src/react-extension/components/Common/Progress/DisplayProgress/DisplayProgress.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,ProgressMessage:()=>ProgressMessage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_DisplayProgress__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Progress/DisplayProgress/DisplayProgress.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Common/DisplayProgress",component:_DisplayProgress__WEBPACK_IMPORTED_MODULE_1__.A},Template=args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.fS,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.qh,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DisplayProgress__WEBPACK_IMPORTED_MODULE_1__.A,{...args,...routerProps})})),Initial=Template.bind({});Initial.args={progressContext:{progressDialogProps:{}}};const ProgressMessage=Template.bind({});ProgressMessage.args={progressContext:{progressDialogProps:{title:"Title",goals:100,completed:50,message:"message"}}};const __namedExportsOrder=["Initial","ProgressMessage"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <DisplayProgress {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...Initial.parameters?.docs?.source}}},ProgressMessage.parameters={...ProgressMessage.parameters,docs:{...ProgressMessage.parameters?.docs,source:{originalSource:"args => <MemoryRouter initialEntries={['/']}>\n    <Route component={routerProps => <DisplayProgress {...args} {...routerProps} />}></Route>\n  </MemoryRouter>",...ProgressMessage.parameters?.docs?.source}}}},"./src/img/svg/spinner.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _circle,_circle2,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgSpinner(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:18,height:18,fill:"none",className:"svg-icon spinner",viewBox:"0 0 18 18"},props),_circle||(_circle=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"background",cx:8,cy:8,r:8,fill:"none",stroke:"var(--spinner-background)",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(1 1)"})),_circle2||(_circle2=react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle",{id:"loading",r:8,fill:"none",stroke:"var(--spinner-color)",strokeLinecap:"round",strokeWidth:"var(--spinner-stroke-width)",transform:"translate(9 9)"})))}},"./src/react-extension/components/Common/Progress/DisplayProgress/DisplayProgress.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_ProgressContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/contexts/ProgressContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/img/svg/spinner.svg");class DisplayProgress extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.infiniteTimerUpdateIntervalId=null,this.state=this.defaultState}get defaultState(){return{infiniteTimer:0}}componentDidMount(){this.startInfiniteTimerUpdateProgress()}startInfiniteTimerUpdateProgress(){this.isInfiniteProgressMode()&&(this.infiniteTimerUpdateIntervalId=setInterval((()=>{const infiniteTimer=this.state.infiniteTimer+2;this.setState({infiniteTimer})}),500))}componentDidUpdate(){!this.isInfiniteProgressMode()&&this.infiniteTimerUpdateIntervalId&&this.resetInterval()}componentWillUnmount(){this.resetInterval()}isInfiniteProgressMode(){return!this.props.progressContext.progressDialogProps.goals}resetInterval(){this.infiniteTimerUpdateIntervalId&&(clearInterval(this.infiniteTimerUpdateIntervalId),this.infiniteTimerUpdateIntervalId=null)}calculateProgress(){return this.props.progressContext.progressDialogProps?.goals>0?this.calculateGoalsProgress():this.calculateInfiniteProgress()}calculateInfiniteProgress(){return 100-100/Math.pow(1.1,this.state.infiniteTimer)}calculateGoalsProgress(){const completed=this.props.progressContext.progressDialogProps.completed||0;let progress=Math.round(100*completed/this.props.progressContext.progressDialogProps.goals);return progress>100&&(progress=100),progress}render(){const progress=this.calculateProgress(),progressBarStyle={width:`${progress}%`};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-wrapper progress-dialog"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"dialog-title-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,this.props.progressContext.progressDialogProps.title||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Please wait...")))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"dialog-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"form-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("label",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Take a deep breath and enjoy being in the present moment...")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"progress-bar-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-bar"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress "+(100===progress?"completed":""),style:progressBarStyle})),!this.isInfiniteProgressMode()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"progress-details"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-step-label"},this.props.progressContext.progressDialogProps.message||react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Please wait...")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"progress-percent"},progress,"%")))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"submit-wrapper clearfix"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"submit",className:"disabled processing"},"Submit",react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_3__.A,null))))))}}DisplayProgress.propTypes={progressContext:prop_types__WEBPACK_IMPORTED_MODULE_4___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_contexts_ProgressContext__WEBPACK_IMPORTED_MODULE_1__.E0)((0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(DisplayProgress));DisplayProgress.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Returns the component default state\n@return {object}",modifiers:["get"],params:[],returns:{type:{name:"object"}},description:"Returns the component default state"},{name:"startInfiniteTimerUpdateProgress",docblock:"Start the infinite timer update.\n@return {void}",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Start the infinite timer update."},{name:"isInfiniteProgressMode",docblock:"Check if the component should display an infinite progress bar.\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the component should display an infinite progress bar."},{name:"resetInterval",docblock:"Reset interval",modifiers:[],params:[],returns:null,description:"Reset interval"},{name:"calculateProgress",docblock:"Calculate the progress\n@return {number}",modifiers:[],params:[],returns:{type:{name:"number"}},description:"Calculate the progress"},{name:"calculateInfiniteProgress",docblock:"Calculate the infinite progress\n@return {number}",modifiers:[],params:[],returns:{type:{name:"number"}},description:"Calculate the infinite progress"},{name:"calculateGoalsProgress",docblock:"Calculate the progress based on the goals\n@return {number}",modifiers:[],params:[],returns:{type:{name:"number"}},description:"Calculate the progress based on the goals"}],displayName:"DisplayProgress",props:{progressContext:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/DialogContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>DialogContextProvider,z9:()=>withDialog});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const DialogContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({dialogs:[],open:()=>{},close:()=>{}});class DialogContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{dialogs:[],open:(Dialog,DialogProps)=>{const dialogKey=(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)();return this.setState({dialogs:[...this.state.dialogs,{key:dialogKey,Dialog,DialogProps}]}),dialogKey},close:dialogKey=>this.setState({dialogs:this.state.dialogs.filter((dialog=>dialogKey!==dialog.key))}),closeAll:()=>this.setState({dialogs:[]})}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Provider,{value:this.state},this.props.children)}}function withDialog(WrappedComponent){return class WithDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogContext.Consumer,null,(dialogContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{dialogContext,...this.props})))}}}DialogContextProvider.displayName="DialogContextProvider",DialogContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},DialogContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"}],displayName:"DialogContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/ProgressContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,E0:()=>withProgress});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_components_Common_Progress_DisplayProgress_DisplayProgress__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Progress/DisplayProgress/DisplayProgress.js"),_DialogContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/contexts/DialogContext.js");const ProgressContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({progressDialogProps:null,dialogIndex:null,open:()=>{},updateMessage:()=>{},updateGoals:()=>{},close:()=>{}});class ProgressContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindCallbacks(),this.state=this.defaultState}get defaultState(){return{progressDialogProps:null,dialogIndex:null,open:this.open,updateMessage:this.updateMessage,updateGoals:this.updateGoals,close:this.close}}bindCallbacks(){this.open=this.open.bind(this),this.updateGoals=this.updateGoals.bind(this),this.updateMessage=this.updateMessage.bind(this),this.close=this.close.bind(this)}open(title,goals,message){const progressDialogProps={title,goals,message};this.setState({progressDialogProps});const dialogIndex=this.props.dialogContext.open(_components_Common_Progress_DisplayProgress_DisplayProgress__WEBPACK_IMPORTED_MODULE_1__.A);this.setState({dialogIndex})}updateMessage(message,completed=!1){const progressDialogProps={...this.state.progressDialogProps,message:message||this.state.progressDialogProps.message,completed};this.setState({progressDialogProps})}async updateGoals(goals){const progressDialogProps={...this.state.progressDialogProps,goals};this.setState({progressDialogProps})}async close(){this.props.dialogContext.close(this.state.dialogIndex);this.setState({progressDialogProps:{},dialogIndex:null})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ProgressContext.Provider,{value:this.state},this.props.children)}}ProgressContextProvider.displayName="ProgressContextProvider",ProgressContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object};const __WEBPACK_DEFAULT_EXPORT__=(0,_DialogContext__WEBPACK_IMPORTED_MODULE_2__.z9)(ProgressContextProvider);function withProgress(WrappedComponent){return class WithProgress extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ProgressContext.Consumer,null,(progressContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{progressContext,...this.props})))}}}ProgressContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"bindCallbacks",docblock:"Bind callbacks",modifiers:[],params:[],returns:null,description:"Bind callbacks"},{name:"open",docblock:"Open the progress dialog\n@param {string} title The title\n@param {integer} goals The goals\n@param {string} message The message",modifiers:[],params:[{name:"title",description:"The title",type:{name:"string"},optional:!1},{name:"goals",description:"The goals",type:{name:"integer"},optional:!1},{name:"message",description:"The message",type:{name:"string"},optional:!1}],returns:null,description:"Open the progress dialog"},{name:"updateMessage",docblock:"Update the progress dialog message.\n@param {string} message The message\n@param {boolean} completed The progress is completed.",modifiers:[],params:[{name:"message",description:"The message",type:{name:"string"},optional:!1},{name:"completed",description:"The progress is completed.",type:{name:"boolean"},optional:!0}],returns:null,description:"Update the progress dialog message."},{name:"updateGoals",docblock:"Upate the progress dialog goals.\n@param {integer} goals the goals",modifiers:["async"],params:[{name:"goals",description:"the goals",type:{name:"integer"},optional:!1}],returns:null,description:"Upate the progress dialog goals."},{name:"close",docblock:"Close the progress dialog.",modifiers:["async"],params:[],returns:null,description:"Close the progress dialog."}],displayName:"ProgressContextProvider",props:{children:{description:"",type:{name:"any"},required:!1},dialogContext:{description:"",type:{name:"object"},required:!1}}}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}}}]);