/*! For license information please see react-extension-components-User-FilterUsersByShortcut-FilterUsersByShortcut-test-stories.acb7a8f7.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[1944],{"./src/react-extension/components/User/FilterUsersByShortcut/FilterUsersByShortcut.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FilterUsersByShortcut_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),FilterUsersByShortcut=__webpack_require__("./src/react-extension/components/User/FilterUsersByShortcut/FilterUsersByShortcut.js"),ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"),UserWorkspaceContext_test_data=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.test.data.js");const FilterUsersByShortcut_test_stories={title:"Components/User/FilterUsersByShortcut",component:FilterUsersByShortcut.A},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement("div",{className:"panel"},react.createElement(react_router.qh,{component:routerProps=>react.createElement(FilterUsersByShortcut.A,{...args,...routerProps})}))));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args={context:(0,ExtAppContext_test_data.dO)(),...function defaultProps(){return{history:{push:jest.fn()},userWorkspaceContext:(0,UserWorkspaceContext_test_data.np)()}}()};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel\">\n        <Route component={routerProps => <FilterUsersByShortcut {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/User/FilterUsersByShortcut/FilterUsersByShortcut.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),react_router_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/contexts/UserWorkspaceContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class FilterUsersByShortcut extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.bindHandlers()}bindHandlers(){this.handleAllItemsClick=this.handleAllItemsClick.bind(this),this.handleRecentlyModifiedClick=this.handleRecentlyModifiedClick.bind(this),this.handleSuspendedUsersClick=this.handleSuspendedUsersClick.bind(this)}get isAllItemsSelected(){return this.props.userWorkspaceContext.filter.type===_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.ALL}get isRecentlyModifiedSelected(){return this.props.userWorkspaceContext.filter.type===_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.RECENTLY_MODIFIED}get isSuspendedUsersSelected(){return this.props.userWorkspaceContext.filter.type===_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.SUSPENDED_USER}handleAllItemsClick(){const filter={type:_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.ALL};this.props.history.push({pathname:"/app/users",state:{filter}})}handleRecentlyModifiedClick(){const filter={type:_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.RECENTLY_MODIFIED};this.props.history.push({pathname:"/app/users",state:{filter}})}handleSuspendedUsersClick(){const filter={type:_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.aj.SUSPENDED_USER};this.props.history.push({pathname:"/app/users",state:{filter}})}get shouldDisplaySuspendedUsersFilter(){return this.props.userWorkspaceContext.shouldDisplaySuspendedUsersFilter()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"navigation-secondary navigation-shortcuts"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(this.isAllItemsSelected?"selected":""),onClick:this.handleAllItemsClick},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",id:"all-users"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"All users"))))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(this.isRecentlyModifiedSelected?"selected":""),onClick:this.handleRecentlyModifiedClick},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",id:"recently-modified"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Recently modified"))))))),this.shouldDisplaySuspendedUsersFilter&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(this.isSuspendedUsersSelected?"selected":""),onClick:this.handleSuspendedUsersClick},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",id:"suspended-users"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_2__.x6,null,"Suspended users")))))))))}}FilterUsersByShortcut.propTypes={history:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,userWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object};const __WEBPACK_DEFAULT_EXPORT__=(0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.y)((0,_contexts_UserWorkspaceContext__WEBPACK_IMPORTED_MODULE_1__.zY)((0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.CI)("common")(FilterUsersByShortcut)));FilterUsersByShortcut.__docgenInfo={description:"This component allows to select shortcut filters applied on users",methods:[{name:"bindHandlers",docblock:"Bind the component handlers",modifiers:[],params:[],returns:null,description:"Bind the component handlers"},{name:"isAllItemsSelected",docblock:"Returns true if the Home shortcut is currently selected",modifiers:["get"],params:[],returns:null,description:"Returns true if the Home shortcut is currently selected"},{name:"isRecentlyModifiedSelected",docblock:"Returns true if the Recently Modified shortcut is currently selected",modifiers:["get"],params:[],returns:null,description:"Returns true if the Recently Modified shortcut is currently selected"},{name:"isSuspendedUsersSelected",docblock:"Returns true if the Suspended users shortcut is currently selected",modifiers:["get"],params:[],returns:null,description:"Returns true if the Suspended users shortcut is currently selected"},{name:"handleAllItemsClick",docblock:'Whenever the shortcut "Home" has been selected',modifiers:[],params:[],returns:null,description:'Whenever the shortcut "Home" has been selected'},{name:"handleRecentlyModifiedClick",docblock:'Whenever the shortcut "Recently modified" has been selected',modifiers:[],params:[],returns:null,description:'Whenever the shortcut "Recently modified" has been selected'},{name:"handleSuspendedUsersClick",docblock:'Whenever the shortcut "Suspended users" has been selected',modifiers:[],params:[],returns:null,description:'Whenever the shortcut "Suspended users" has been selected'},{name:"shouldDisplaySuspendedUsersFilter",docblock:"Returns true if the 'Suspended users' filter should be displayed\n@returns {boolean}",modifiers:["get"],params:[],returns:{type:{name:"boolean"}},description:"Returns true if the 'Suspended users' filter should be displayed"}],displayName:"FilterUsersByShortcut",props:{history:{description:"",type:{name:"object"},required:!1},userWorkspaceContext:{description:"",type:{name:"object"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/contexts/LoadingContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$A:()=>withLoading});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);const LoadingContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({counter:[],add:()=>{},remove:()=>{}});class LoadingContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{counter:0,add:()=>{this.setState({counter:this.state.counter+1})},remove:()=>{this.setState({counter:Math.min(this.state.counter-1,0)})}}}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Provider,{value:this.state},this.props.children)}}function withLoading(WrappedComponent){return class WithLoading extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadingContext.Consumer,null,(loadingContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{loadingContext,...this.props})))}}}LoadingContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().any},LoadingContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"The component default state",modifiers:["get"],params:[],returns:null,description:"The component default state"}],displayName:"LoadingContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))}}]);