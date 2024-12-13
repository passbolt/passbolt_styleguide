"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[6502],{"./src/react-quickaccess/components/Header/Header.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Header_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),Header=__webpack_require__("./src/react-quickaccess/components/Header/Header.js"),MockPort=__webpack_require__("./src/react-extension/test/mock/MockPort.js");var AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js");const Header_test_stories={title:"Components/QuickAccess/Header",component:Header.A},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement("div",{className:"container quickaccess"},react.createElement(Header.A,{...args,...routerProps}))})));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args={context:function defaultAppContext(appContext){const defaultAppContext={port:new MockPort.A,isAuthenticated:!0};return Object.assign(defaultAppContext,appContext||{})}(),logoutSuccessCallback:()=>{}},Initial.parameters={css:"ext_quickaccess"};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <div className=\"container quickaccess\"><Header {...args} {...routerProps} /></div>}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/react-quickaccess/components/Header/Header.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/context/AppContext/AppContext.js");class Header extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.initEventHandlers()}initEventHandlers(){this.handleLogoutClick=this.handleLogoutClick.bind(this)}get translate(){return this.props.t}async handleLogoutClick(){this.props.context.port.request("passbolt.auth.logout",!1),this.props.logoutSuccessCallback()}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"quickaccess-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"logo-svg"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",{href:this.props.context.userSettings?this.props.context.userSettings.getTrustedDomain():"#",target:"_blank",rel:"noopener noreferrer",title:this.translate("open passbolt in a new tab")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{height:"17.5px",role:"img","aria-labelledby":"logo",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"100%",viewBox:"0 30 450 20"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",{id:"logo"},"Passbolt logo"),react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12.1114 26.4938V52.609h7.4182c4.9203 0 8.3266-1.0597 10.3704-3.1035 2.0438-2.0438 3.0278-5.5258 3.0278-10.2947 0-4.6175-.9083-7.8724-2.8007-9.7648-1.8924-2.0438-5.0717-2.9522-9.6891-2.9522h-8.3266zM0 16.5776h23.3144c7.0398 0 12.4899 2.0438 16.4261 6.2071 3.9362 4.1633 5.9043 9.9162 5.9043 17.2588 0 3.0278-.3785 5.8286-1.2111 8.3265-.8327 2.498-2.0438 4.8446-3.7091 6.8884-1.9681 2.498-4.3904 4.3147-7.1155 5.4501-2.8007 1.0598-6.4342 1.5896-11.0516 1.5896H12.1114v16.5775H0v-62.298zM70.0188 53.1389H85.158v-9.462H70.9272c-2.8008 0-4.7689.3785-5.8287 1.1354-1.0597.757-1.5896 2.1195-1.5896 4.0119 0 1.5896.4542 2.7251 1.2869 3.4063.8326.6056 2.5736.9084 5.223.9084zM53.9712 16.5776h24.7527c6.2827 0 10.9759 1.4383 14.1551 4.3147 3.1793 2.8765 4.7689 7.1155 4.7689 12.7927v28.6888H65.0985c-4.5417 0-8.0994-1.1354-10.5217-3.4063s-3.6334-5.5258-3.6334-9.7648c0-5.223 1.3625-8.9322 4.1633-11.203 2.8007-2.2709 7.4939-3.4064 14.0794-3.4064h15.8962v-1.1354c0-2.7251-.8326-4.6175-2.4222-5.7529-1.5897-1.1355-4.3904-1.6653-8.5537-1.6653H53.9712v-9.4621zM107.488 52.8356h25.51c2.271 0 3.936-.3784 4.92-1.0597 1.06-.6813 1.59-1.8167 1.59-3.4063 0-1.5897-.53-2.7251-1.59-3.4064-1.059-.7569-2.725-1.1354-4.92-1.1354h-10.446c-6.207 0-10.37-.9841-12.566-2.8765-2.195-1.8924-3.255-5.2987-3.255-10.0676 0-4.9202 1.287-8.5536 3.937-10.9002 2.649-2.3466 6.737-3.482 12.187-3.482h25.964v9.5377h-21.347c-3.482 0-5.753.3028-6.812.9083-1.06.6056-1.59 1.6654-1.59 3.255 0 1.4382.454 2.498 1.362 3.1035.909.6813 2.423.9841 4.391.9841h10.976c4.996 0 8.856 1.2111 11.43 3.5577 2.649 2.3466 3.936 5.6772 3.936 10.0676 0 4.239-1.211 7.721-3.558 10.3704-2.346 2.6493-5.298 4.0119-9.007 4.0119h-31.112v-9.4621zM159.113 52.8356h25.51c2.271 0 3.936-.3784 4.92-1.0597 1.06-.6813 1.59-1.8167 1.59-3.4063 0-1.5897-.53-2.7251-1.59-3.4064-1.059-.7569-2.725-1.1354-4.92-1.1354h-10.446c-6.207 0-10.37-.9841-12.566-2.8765-2.195-1.8924-3.255-5.2987-3.255-10.0676 0-4.9202 1.287-8.5536 3.937-10.9002 2.649-2.3466 6.737-3.482 12.187-3.482h25.964v9.5377h-21.347c-3.482 0-5.753.3028-6.812.9083-1.06.6056-1.59 1.6654-1.59 3.255 0 1.4382.454 2.498 1.362 3.1035.909.6813 2.423.9841 4.391.9841h10.976c4.996 0 8.856 1.2111 11.43 3.5577 2.649 2.3466 3.936 5.6772 3.936 10.0676 0 4.239-1.211 7.721-3.558 10.3704-2.346 2.6493-5.298 4.0119-9.007 4.0119h-31.263v-9.4621h.151zM223.607 0v16.5775h10.37c4.617 0 8.251.5298 11.052 1.6653 2.8 1.0597 5.147 2.8764 7.115 5.3744 1.665 2.1195 2.876 4.3904 3.709 6.9641.833 2.4979 1.211 5.2987 1.211 8.3265 0 7.3426-1.968 13.0955-5.904 17.2588-3.936 4.1633-9.386 6.2071-16.426 6.2071h-23.315V0h12.188zm7.342 26.4937h-7.418v26.1152h8.326c4.618 0 7.873-.9841 9.69-2.8765 1.892-1.9681 2.8-5.223 2.8-9.9162 0-4.7689-1.059-8.1752-3.103-10.219-1.968-2.1195-5.45-3.1035-10.295-3.1035zM274.172 39.5132c0 4.3904.984 7.721 3.027 10.219 2.044 2.4223 4.845 3.6334 8.554 3.6334 3.633 0 6.434-1.2111 8.554-3.6334 2.044-2.4223 3.103-5.8286 3.103-10.219s-1.059-7.721-3.103-10.1433c-2.044-2.4222-4.845-3.6334-8.554-3.6334-3.633 0-6.434 1.2112-8.554 3.6334-2.043 2.4223-3.027 5.8286-3.027 10.1433zm35.88 0c0 7.1912-2.196 12.9441-6.586 17.2588-4.39 4.2389-10.219 6.4341-17.637 6.4341-7.418 0-13.323-2.1195-17.713-6.4341-4.391-4.3147-6.586-9.9919-6.586-17.1831 0-7.1911 2.195-12.944 6.586-17.2587 4.39-4.3147 10.295-6.5099 17.713-6.5099 7.342 0 13.247 2.1952 17.637 6.5099 4.39 4.239 6.586 9.9919 6.586 17.183zM329.884 62.3737h-12.565V0h12.565v62.3737zM335.712 16.5775h8.554V0h12.111v16.5775h12.793v9.1592h-12.793v18.4699c0 3.4063.606 5.7529 1.742 7.1154 1.135 1.2869 3.179 1.9681 6.055 1.9681h4.996v9.1593h-11.127c-4.466 0-7.873-1.2112-10.295-3.7091-2.346-2.498-3.558-6.0557-3.558-10.6732V25.7367h-8.553v-9.1592h.075z",fill:"var(--icon-color)"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M446.532 30.884L419.433 5.52579c-2.347-2.19519-6.056-2.19519-8.478 0L393.923 21.4977c4.466 1.6653 7.948 5.3744 9.235 9.9919h23.012c1.211 0 2.119.984 2.119 2.1195v3.482c0 1.2111-.984 2.1195-2.119 2.1195h-2.649v4.9202c0 1.2112-.985 2.1195-2.12 2.1195h-5.829c-1.211 0-2.119-.984-2.119-2.1195v-4.9202h-10.219c-1.287 4.6932-4.769 8.478-9.311 10.0676l17.108 15.9719c2.346 2.1952 6.055 2.1952 8.478 0l27.023-25.3582c2.574-2.4223 2.574-6.5099 0-9.0079z",fill:"#E10600"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M388.927 28.3862c-1.135 0-2.195.3028-3.179.757-2.271 1.1354-3.86 3.482-3.86 6.2071 0 2.6493 1.438 4.9202 3.633 6.1314.984.5298 2.12.8326 3.331.8326 3.86 0 6.964-3.1035 6.964-6.964.151-3.7848-3.028-6.9641-6.889-6.9641z",fill:"#E10600"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,"Passbolt"))),this.props.context.isAuthenticated&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",{role:"button",className:"option-link button button-transparent",onClick:this.handleLogoutClick,title:this.translate("sign out")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visually-hidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"sign out")),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_2__.A,{name:"power"}))))}}Header.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_4___default().any,logoutSuccessCallback:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func,t:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_3__.L)((0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(Header));Header.__docgenInfo={description:"",methods:[{name:"initEventHandlers",docblock:null,modifiers:[],params:[],returns:null},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"},{name:"handleLogoutClick",docblock:null,modifiers:["async"],params:[],returns:null}],displayName:"Header",props:{context:{description:"",type:{name:"any"},required:!1},logoutSuccessCallback:{description:"",type:{name:"func"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}}}]);