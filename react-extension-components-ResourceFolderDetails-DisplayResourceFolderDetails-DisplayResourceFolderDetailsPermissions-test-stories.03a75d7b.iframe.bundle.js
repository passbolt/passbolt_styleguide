/*! For license information please see react-extension-components-ResourceFolderDetails-DisplayResourceFolderDetails-DisplayResourceFolderDetailsPermissions-test-stories.03a75d7b.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9671],{"./src/react-extension/components/ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetailsPermissions.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_shared_lib_Settings_UserSettings__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/lib/Settings/UserSettings.js"),_test_fixture_Settings_userSettings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/test/fixture/Settings/userSettings.js"),_DisplayResourceFolderDetailsPermissions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/react-extension/components/ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetailsPermissions.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ResourceFolderDetails/DisplayResourceFolderDetailsPermissions",component:_DisplayResourceFolderDetailsPermissions__WEBPACK_IMPORTED_MODULE_3__.A},context={siteSettings:{getServerTimezone:()=>(new Date).toDateString()},setContext:()=>{},userSettings:new _shared_lib_Settings_UserSettings__WEBPACK_IMPORTED_MODULE_4__.A(_test_fixture_Settings_userSettings__WEBPACK_IMPORTED_MODULE_2__.A),port:{request:()=>[{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",aco:"Folder",aco_foreign_key:"9e03fd73-04c0-5514-95fa-1a6cf2c7c093",aro:"User",aro_foreign_key:"f848277c-5398-58f8-a82a-72397af2d450",type:15,created:"2020-05-11T10:11:13+00:00",modified:"2020-05-11T10:11:13+00:00",group:{name:"My shared group"}}]}},Initial=(args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.A.Provider,{value:context},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.fS,{initialEntries:["/"]},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"panel aside"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.qh,{component:routerProps=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DisplayResourceFolderDetailsPermissions__WEBPACK_IMPORTED_MODULE_3__.A,{...args,...routerProps})}))))).bind({});Initial.args={resourceWorkspaceContext:{details:{folder:{id:"9e03fd73-04c0-5514-95fa-1a6cf2c7c093",name:"Accounting",created:"2020-02-01T00:00:00+00:00",modified:"2020-02-01T00:00:00+00:00",created_by:"f848277c-5398-58f8-a82a-72397af2d450",modified_by:"f848277c-5398-58f8-a82a-72397af2d450",permission:{id:"6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",aco:"Folder",aco_foreign_key:"9e03fd73-04c0-5514-95fa-1a6cf2c7c093",aro:"User",aro_foreign_key:"f848277c-5398-58f8-a82a-72397af2d450",type:15,created:"2020-05-11T10:11:13+00:00",modified:"2020-05-11T10:11:13+00:00"},folder_parent_id:null,personal:!1}}}};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"args => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <div className=\"panel aside\">\n        <Route component={routerProps => <DisplayResourceFolderDetailsPermissions {...args} {...routerProps} />}></Route>\n      </div>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetailsPermissions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__),_Common_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),_Common_Avatar_GroupAvatar__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/components/Common/Avatar/GroupAvatar.js"),_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/components/Icons/Icon.js"),_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/img/svg/spinner.svg"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),_Share_ShareDialog__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/react-extension/components/Share/ShareDialog.js"),_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/react-extension/contexts/ResourceWorkspaceContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");class DisplayResourceFolderDetailsPermissions extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.getDefaultState(),this.bindCallbacks()}getDefaultState(){return{permissions:null,open:!1,loading:!0}}bindCallbacks(){this.handlePermissionsEditClickEvent=this.handlePermissionsEditClickEvent.bind(this),this.handleTitleClickEvent=this.handleTitleClickEvent.bind(this)}async componentDidUpdate(prevProps){await this.handleFolderChange(prevProps.resourceWorkspaceContext.details.folder)}handleFolderChange(previousFolder){this.folder.id!==previousFolder.id&&this.state.open&&this.fetch()}async fetch(){this.setState({loading:!0});const permissions=await this.props.context.port.request("passbolt.permissions.find-aco-permissions-for-display",this.folder.id,"Folder");permissions&&permissions.sort(((permissionA,permissionB)=>this.sortPermissions(permissionA,permissionB))),this.setState({permissions,loading:!1})}sortPermissions(permissionA,permissionB){return permissionA.user&&permissionB.user?permissionA.user.profile.first_name===permissionB.user.profile.first_name?permissionA.user.profile.last_name<permissionB.user.profile.last_name?-1:1:permissionA.user.profile.first_name<permissionB.user.profile.first_name?-1:1:!permissionA.user&&permissionB.user?1:permissionA.user&&!permissionB.user||permissionA.group.name<permissionB.group.name?-1:1}handleTitleClickEvent(){const open=!this.state.open;open&&this.fetch(),this.setState({open})}handlePermissionsEditClickEvent(){const foldersIds=[this.folder.id];this.props.context.setContext({shareDialogProps:{foldersIds}}),this.props.dialogContext.open(_Share_ShareDialog__WEBPACK_IMPORTED_MODULE_7__.A)}get folder(){return this.props.resourceWorkspaceContext.details.folder}getPermissionAroName(permission){if(permission.user){const profile=permission.user.profile;return`${profile.first_name} ${profile.last_name}`}return permission.group.name}getPermissionLabel(permission){switch(permission.type){case 1:return this.translate("can read");case 7:return this.translate("can update");case 15:return this.translate("is owner")}}isLoading(){return this.state.loading}canShare(){return this.folder.permission&&15===this.folder.permission.type}get translate(){return this.props.t}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"sharedwith accordion sidebar-section "+(this.state.open?"":"closed")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-header"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.handleTitleClickEvent},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Shared with"),this.state.open&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:"caret-down"}),!this.state.open&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:"caret-right"})))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"accordion-content"},this.canShare()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{type:"button",onClick:this.handlePermissionsEditClickEvent,id:"share-folder",className:"section-action button-transparent"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shared_components_Icons_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:"edit"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"visuallyhidden"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"modify"))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",{className:"shared-with ready"},this.isLoading()&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"processing-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_spinner_svg__WEBPACK_IMPORTED_MODULE_4__.A,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:"processing-text"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_9__.x6,null,"Retrieving permissions"))),this.state.permissions&&this.state.permissions.map((permission=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{key:permission.id,className:"usercard-col-2"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"content-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"content"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"name"},this.getPermissionAroName(permission)),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"subinfo"},this.getPermissionLabel(permission)))),permission.user&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_1__.A,{user:permission.user,baseUrl:this.props.context.userSettings.getTrustedDomain()}),permission.group&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Common_Avatar_GroupAvatar__WEBPACK_IMPORTED_MODULE_2__.A,{group:permission.group}))))))))}}DisplayResourceFolderDetailsPermissions.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,resourceWorkspaceContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().object,dialogContext:prop_types__WEBPACK_IMPORTED_MODULE_10___default().any,t:prop_types__WEBPACK_IMPORTED_MODULE_10___default().func};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_5__.L)((0,_contexts_DialogContext__WEBPACK_IMPORTED_MODULE_6__.z9)((0,_contexts_ResourceWorkspaceContext__WEBPACK_IMPORTED_MODULE_8__.Qw)((0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.CI)("common")(DisplayResourceFolderDetailsPermissions))));DisplayResourceFolderDetailsPermissions.__docgenInfo={description:"",methods:[{name:"getDefaultState",docblock:"Get default state\n@returns {*}",modifiers:[],params:[],returns:{type:{name:"mixed"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"handleFolderChange",docblock:"Check if the folder has changed and fetch\n@param previousFolder",modifiers:[],params:[{name:"previousFolder",optional:!1}],returns:null,description:"Check if the folder has changed and fetch"},{name:"fetch",docblock:"Get the folder permissions.",modifiers:["async"],params:[],returns:null,description:"Get the folder permissions."},{name:"sortPermissions",docblock:"Sort permission by user firstname and by group name\n@param permissionA\n@param permissionB\n@returns {number}",modifiers:[],params:[{name:"permissionA",optional:!1},{name:"permissionB",optional:!1}],returns:{type:{name:"number"}},description:"Sort permission by user firstname and by group name"},{name:"handleTitleClickEvent",docblock:"handle when the users click on the section header.\nOpen/Close it.",modifiers:[],params:[],returns:null,description:"handle when the users click on the section header.\nOpen/Close it."},{name:"handlePermissionsEditClickEvent",docblock:"Handle when the user edits the folder permissions.",modifiers:[],params:[],returns:null,description:"Handle when the user edits the folder permissions."},{name:"folder",docblock:"Returns the current detailed resource",modifiers:["get"],params:[],returns:null,description:"Returns the current detailed resource"},{name:"getPermissionAroName",docblock:"Get a permission aro name\n@param {object} permission The permission",modifiers:[],params:[{name:"permission",description:"The permission",type:{name:"object"},optional:!1}],returns:null,description:"Get a permission aro name"},{name:"getPermissionLabel",docblock:"Get a permission aro name\n@param {object} permission The permission",modifiers:[],params:[{name:"permission",description:"The permission",type:{name:"object"},optional:!1}],returns:null,description:"Get a permission aro name"},{name:"isLoading",docblock:"check if no permission is present\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"check if no permission is present"},{name:"canShare",docblock:"Check if the user can share the folder.\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Check if the user can share the folder."},{name:"translate",docblock:"Get the translate function\n@returns {function(...[*]=)}",modifiers:["get"],params:[],returns:{},description:"Get the translate function"}],displayName:"DisplayResourceFolderDetailsPermissions",props:{context:{description:"",type:{name:"any"},required:!1},resourceWorkspaceContext:{description:"",type:{name:"object"},required:!1},dialogContext:{description:"",type:{name:"any"},required:!1},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/components/Share/SharePermissionItemSkeleton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");class SharePermissionItemSkeleton extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{className:"row skeleton"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"avatar"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"aro"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"aro-name"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"aro-details"})),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"select rights"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"actions"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"shimmer"}))}}SharePermissionItemSkeleton.propTypes={};const __WEBPACK_DEFAULT_EXPORT__=SharePermissionItemSkeleton;SharePermissionItemSkeleton.__docgenInfo={description:"",methods:[],displayName:"SharePermissionItemSkeleton"}},"./src/react-extension/lib/Object/getPropValue.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(obj,path)=>path.split(".").reduce(((accumulator,key)=>accumulator?.[key]),obj)},"./src/react-extension/lib/Sanitize/sanitizeUrl.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,P:()=>urlProtocols});const __WEBPACK_DEFAULT_EXPORT__=(uri,options)=>{if(void 0===uri||"string"!=typeof uri||!uri.length)return!1;if((options=options||{}).whitelistedProtocols&&!Array.isArray(options.whitelistedProtocols))throw new TypeError("The whitelistedProtocols should be an array of string.");if(options.defaultProtocol&&"string"!=typeof options.defaultProtocol)throw new TypeError("The defaultProtocol should be a string.");const whitelistedProtocols=options.whitelistedProtocols||[urlProtocols.HTTP,urlProtocols.HTTPS],blacklistedProtocols=[urlProtocols.JAVASCRIPT],defaultProtocol=options.defaultProtocol||"";!/^((?!:\/\/).)*:\/\//.test(uri)&&defaultProtocol&&(uri=`${defaultProtocol}//${uri}`);try{const url=new URL(uri);return!blacklistedProtocols.includes(url.protocol)&&(!!whitelistedProtocols.includes(url.protocol)&&url.href)}catch(error){return!1}},urlProtocols={FTP:"http:",FTPS:"https:",HTTP:"http:",HTTPS:"https:",JAVASCRIPT:"javascript:",SSH:"ssh:"}},"./src/react-extension/test/fixture/Settings/userSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={"user.settings.trustedDomain":new URL(window.location.href).origin,"user.firstname":"Ada","user.id":"f848277c-5398-58f8-a82a-72397af2d450","user.lastname":"Lovelace","user.settings.securityToken.code":"TST","user.settings.securityToken.color":"#000000","user.settings.securityToken.textColor":"#FFFFFF","user.username":"ada@passbolt.com","user.settings.locale":"en-UK","user.settings.theme":"default"}},"./src/shared/lib/Settings/UserSettings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>UserSettings});class UserSettings{constructor(settings){this.settings=settings}get id(){return this.settings["user.id"]}get fullName(){return`${this.settings["user.firstname"]} ${this.settings["user.lastname"]}`}get username(){return this.settings["user.username"]}getTheme(){return this.settings["user.settings.theme"]}getTrustedDomain(){return this.settings["user.settings.trustedDomain"]}getSecurityToken(){return{code:this.settings["user.settings.securityToken.code"],backgroundColor:this.settings["user.settings.securityToken.color"],textColor:this.settings["user.settings.securityToken.textColor"]}}get locale(){return this.settings["user.settings.locale"]}}}}]);