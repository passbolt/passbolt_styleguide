/*! For license information please see react-extension-components-Resource-FilterResourcesByGroups-FilterResourcesByGroups-test-stories.d158e8ec.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[3795],{"./src/react-extension/components/Resource/FilterResourcesByGroups/FilterResourcesByGroups.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,SelectedGroup:()=>SelectedGroup,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/contexts/ResourceWorkspaceContext.js"),_FilterResourcesByGroups__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/Resource/FilterResourcesByGroups/FilterResourcesByGroups.js"),_test_mock_MockPort__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/react-extension/test/mock/MockPort.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Resource/FilterResourcesByGroups",component:_FilterResourcesByGroups__WEBPACK_IMPORTED_MODULE_3__.A},mockedPort=new _test_mock_MockPort__WEBPACK_IMPORTED_MODULE_4__.A,context={groups:[{id:1,name:"Group 1"},{id:2,name:"Group 2"},{id:3,name:"Group 3"}],port:mockedPort};mockedPort.addRequestListener("passbolt.groups.find-my-groups",(()=>context.groups));const Template=args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.A.Provider,{value:context},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.MemoryRouter,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FilterResourcesByGroups__WEBPACK_IMPORTED_MODULE_3__.A,{...args,...routerProps})})))),Initial=Template.bind({}),SelectedGroup=Template.bind({});SelectedGroup.args={resourceWorkspaceContext:{filter:{type:_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_2__.FM.GROUP,payload:{group:{id:1}}}}};const __namedExportsOrder=["Initial","SelectedGroup"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel\">\n        <Route component={routerProps => <FilterResourcesByGroups {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}},SelectedGroup.parameters={...SelectedGroup.parameters,docs:{...SelectedGroup.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel\">\n        <Route component={routerProps => <FilterResourcesByGroups {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...SelectedGroup.parameters?.docs?.source}}}},"./src/img/svg/caret_down.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgCaretDown(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:10,height:8,fill:"none",viewBox:"0 0 10 8"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m1 2 4 4 4-4"})))}},"./src/img/svg/caret_right.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgCaretRight(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:8,height:10,fill:"none",viewBox:"0 0 8 10"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m2 9 4-4-4-4"})))}},"./src/img/svg/users.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgUsers(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:18,height:16,fill:"none",viewBox:"0 0 18 16"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-color)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M12.741 14.338V12.89a2.77 2.77 0 0 0-.826-2.04 2.82 2.82 0 0 0-2.04-.825H4.248a2.825 2.825 0 0 0-2.723 2.865v1.448M7.143 7.26a2.815 2.815 0 1 0-2.815-2.814 2.825 2.825 0 0 0 2.815 2.815M16.994 14.338V12.89a2.85 2.85 0 0 0-.592-1.724 2.8 2.8 0 0 0-1.52-1.02M12.068 1.724a2.74 2.74 0 0 1 1.52 1.02 2.804 2.804 0 0 1 0 3.446 2.74 2.74 0 0 1-1.52 1.02"})))}},"./src/react-extension/components/Resource/FilterResourcesByGroups/FilterResourcesByGroups.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/contexts/ResourceWorkspaceContext.js"),prop_types__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__),react_router_dom__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_img_svg_caret_down_svg__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/img/svg/caret_down.svg"),_img_svg_caret_right_svg__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/img/svg/caret_right.svg"),_img_svg_users_svg__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/img/svg/users.svg");class FilterResourcesByGroups extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{open:!0,groups:null,loading:!1}}async componentDidMount(){await this.loadGroupsData()}async loadGroupsData(){if(!this.state.loading){this.setState({loading:!0});const groups=await this.props.context.port.request("passbolt.groups.find-my-groups");this.setState({groups,loading:!1})}}bindCallbacks(){this.handleTitleClickEvent=this.handleTitleClickEvent.bind(this),this.handleClickGroupEvent=this.handleClickGroupEvent.bind(this)}async handleTitleClickEvent(){const open=!this.state.open;this.setState({open}),open&&await this.loadGroupsData()}handleClickGroupEvent(group){const filter={type:_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__.FM.GROUP,payload:{group}};this.props.history.push({pathname:"/app/passwords",state:{filter}})}isSelected(groupId){const filter=this.props.resourceWorkspaceContext.filter;return filter.type===_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__.FM.GROUP&&filter.payload.group.id===groupId}hasGroup(){return this.groups?.length>0}get groups(){return this.state.groups}get groupsSorted(){return this.groups.sort(((groupA,groupB)=>groupA.name.localeCompare(groupB.name)))}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,this.hasGroup()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"navigation-secondary-tree navigation-secondary navigation-groups accordion"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{className:"accordion-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"node root "+(this.state.open?"open":"close")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row title",onClick:this.handleTitleClickEvent},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3",{className:"section-title"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"folders-label"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:"link no-border"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_users_svg__WEBPACK_IMPORTED_MODULE_6__.A,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_1__.x6,null,"Groups")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"toggle-folder"},this.state.open?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_caret_down_svg__WEBPACK_IMPORTED_MODULE_4__.A,null):react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_caret_right_svg__WEBPACK_IMPORTED_MODULE_5__.A,null)))))))))),this.state.open&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{className:"tree ready"},this.groupsSorted.map((group=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"node root group-item",key:group.id},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(this.isSelected(group.id)?"selected":""),onClick:()=>this.handleClickGroupEvent(group)},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",className:"link no-border",title:group.name},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"ellipsis"},group.name))))))))))))}}FilterResourcesByGroups.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_7___default().any,resourceWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_7___default().any,history:prop_types__WEBPACK_IMPORTED_MODULE_7___default().object};const __WEBPACK_DEFAULT_EXPORT__=(0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.withRouter)((0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_2__.L)((0,_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_3__.Qw)((0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.CI)("common")(FilterResourcesByGroups))));FilterResourcesByGroups.__docgenInfo={description:"This component display groups to filter the resources",methods:[{name:"defaultState",docblock:"Get default state\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"loadGroupsData",docblock:"Loads the groups the current user is member of.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Loads the groups the current user is member of."},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleTitleClickEvent",docblock:"Handle when the user click on the title.",modifiers:["async"],params:[],returns:null,description:"Handle when the user click on the title."},{name:"handleClickGroupEvent",docblock:"Handle when the user selects a group.",modifiers:[],params:[{name:"group",optional:!1}],returns:null,description:"Handle when the user selects a group."},{name:"isSelected",docblock:"Check if the tag associated to this component is selected.\n@returns {boolean}\n@param tagId\n@returns {boolean}",modifiers:[],params:[{name:"groupId",optional:!1}],returns:{type:{name:"boolean"}},description:"Check if the tag associated to this component is selected."},{name:"hasGroup",docblock:"has at least one group that the user belongs to\n@returns {*|boolean}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"mixed"},{name:"boolean"}]}},description:"has at least one group that the user belongs to"},{name:"groups",docblock:"get groups that the user belongs to\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"get groups that the user belongs to"},{name:"groupsSorted",docblock:"get the groups sorted\n@returns {*}",modifiers:["get"],params:[],returns:{type:{name:"mixed"}},description:"get the groups sorted"}],displayName:"FilterResourcesByGroups",props:{context:{description:"",type:{name:"any"},required:!1},resourceWorkspaceContext:{description:"",type:{name:"any"},required:!1},history:{description:"",type:{name:"object"},required:!1}}}},"./src/react-extension/lib/Object/getPropValue.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(obj,path)=>path.split(".").reduce(((accumulator,key)=>accumulator?.[key]),obj)},"./src/react-extension/lib/Sanitize/sanitizeUrl.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,P:()=>urlProtocols});const __WEBPACK_DEFAULT_EXPORT__=(uri,options)=>{if(void 0===uri||"string"!=typeof uri||!uri.length)return!1;if((options=options||{}).whitelistedProtocols&&!Array.isArray(options.whitelistedProtocols))throw new TypeError("The whitelistedProtocols should be an array of string.");if(options.defaultProtocol&&"string"!=typeof options.defaultProtocol)throw new TypeError("The defaultProtocol should be a string.");const whitelistedProtocols=options.whitelistedProtocols||[urlProtocols.HTTP,urlProtocols.HTTPS],blacklistedProtocols=[urlProtocols.JAVASCRIPT],defaultProtocol=options.defaultProtocol||"";!/^((?!:\/\/).)*:\/\//.test(uri)&&defaultProtocol&&(uri=`${defaultProtocol}//${uri}`);try{const url=new URL(uri);return!blacklistedProtocols.includes(url.protocol)&&(!!whitelistedProtocols.includes(url.protocol)&&url.href)}catch(error){return!1}},urlProtocols={FTP:"http:",FTPS:"https:",HTTP:"http:",HTTPS:"https:",JAVASCRIPT:"javascript:",SSH:"ssh:"}},"./src/react-extension/test/mock/MockPort.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function delay(t,v){return new Promise((resolve=>{setTimeout((()=>resolve(v)),t)}))}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class MockPort{constructor(storage){this.storage=storage,this.onListeners={},this.requestListeners={},this.emitListener={},this.onConnectErrorHandler={}}async emit(name,eventObject){let result;return console.debug(`PORT EMIT: ${name}`),console.debug("Arguments",eventObject),this.emitListener[name]?(result=await this.emitListener[name](eventObject),console.debug("response: ",result)):console.debug(`The emit ${name} has not been mocked`),delay(0,result)}on(name,callback){console.debug(`PORT ON: ${name}`),console.debug("PORT ON PARAMETERS:",callback),this.addOnListener(name,callback)}async request(name){let result;if(console.debug(`PORT REQUEST: ${name}`),console.debug("PORT REQUEST PARAMETERS:",Array.prototype.slice.call(arguments)),this.requestListeners[name]){const listenerArguments=Array.prototype.slice.call(arguments,1,arguments.length);console.debug("listenerArguments",listenerArguments),listenerArguments.push(this.storage),console.debug("listenerArguments",listenerArguments),result=await this.requestListeners[name](...listenerArguments),console.debug("response: ",result)}else console.debug(`The request ${name} has not been mocked`);return delay(0,result)}addEmitListener(name){console.debug(`PORT EMIT: ${name}`),console.debug("PORT EMIT PARAMETERS:",Array.prototype.slice.call(arguments))}addOnListener(name,callback){this.emitListener[name]=callback}addRequestListener(name,callback){this.requestListeners[name]=callback}onConnectError(callback){this.onConnectErrorHandler.callback=callback}}},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);