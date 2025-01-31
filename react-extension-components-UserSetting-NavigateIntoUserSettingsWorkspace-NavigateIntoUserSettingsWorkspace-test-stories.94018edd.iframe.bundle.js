/*! For license information please see react-extension-components-UserSetting-NavigateIntoUserSettingsWorkspace-NavigateIntoUserSettingsWorkspace-test-stories.94018edd.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[9206],{"./src/react-extension/components/UserSetting/NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,PendingAccountRecovery:()=>PendingAccountRecovery,__namedExportsOrder:()=>__namedExportsOrder,default:()=>NavigateIntoUserSettingsWorkspace_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),NavigateIntoUserSettingsWorkspace=__webpack_require__("./src/react-extension/components/UserSetting/NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace.js"),RbacContext_test_data=__webpack_require__("./src/shared/context/Rbac/RbacContext.test.data.js");function defaultProps(props){const defaultProps={hasPendingAccountRecoveryChoice:!1,hasPendingMfaChoice:!1,context:{onLogoutRequested:()=>{},siteSettings:{canIUse:()=>!0}},rbacContext:(0,RbacContext_test_data.mM)()};return Object.assign(defaultProps,props||{})}const NavigateIntoUserSettingsWorkspace_test_stories={title:"Components/UserSetting/NavigateIntoUserSettingsWorkspace",component:NavigateIntoUserSettingsWorkspace.A},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement("div",{className:"panel"},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(NavigateIntoUserSettingsWorkspace.A,{...args,...routerProps})}))));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args={...defaultProps()};const PendingAccountRecovery=Template.bind({});PendingAccountRecovery.args={...defaultProps(),hasPendingAccountRecoveryChoice:!0};const __namedExportsOrder=["Initial","PendingAccountRecovery"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <div className=\"panel\">\n      <MemoryRouter initialEntries={['/']}>\n        <Route component={routerProps => <NavigateIntoUserSettingsWorkspace {...args} {...routerProps} />}></Route>\n      </MemoryRouter>\n    </div>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}},PendingAccountRecovery.parameters={...PendingAccountRecovery.parameters,docs:{...PendingAccountRecovery.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <div className=\"panel\">\n      <MemoryRouter initialEntries={['/']}>\n        <Route component={routerProps => <NavigateIntoUserSettingsWorkspace {...args} {...routerProps} />}></Route>\n      </MemoryRouter>\n    </div>\n  </AppContext.Provider>",...PendingAccountRecovery.parameters?.docs?.source}}}},"./src/img/svg/attention.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _g,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgAttention(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:18,height:18,fill:"none",viewBox:"0 0 18 18"},props),_g||(_g=react__WEBPACK_IMPORTED_MODULE_0__.createElement("g",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,clipPath:"url(#attention_svg__clip0_2062_453107)"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:"var(--icon-exclamation-background-color)",stroke:"var(--icon-exclamation-border-color)",d:"M9 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{stroke:"var(--icon-exclamation-color)",d:"M9 6v3M9 12h.008"}))))}},"./src/react-extension/components/UserSetting/NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__),react_router_dom__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/react-router/esm/react-router.js"),_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_contexts_NavigationContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/react-extension/contexts/NavigationContext.js"),react_i18next__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_shared_context_Rbac_RbacContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/context/Rbac/RbacContext.js"),_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/shared/services/rbacs/uiActionEnumeration.js"),_img_svg_attention_svg__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/img/svg/attention.svg");class NavigateIntoUserSettingsWorkspace extends react__WEBPACK_IMPORTED_MODULE_0__.Component{get isMfaEnabled(){return this.props.context.siteSettings.canIUse("multiFactorAuthentication")}get canIUseThemeCapability(){return this.props.context.siteSettings&&this.props.context.siteSettings.canIUse("accountSettings")}get canIUseMobileCapability(){return this.props.rbacContext.canIUseUiAction(_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_5__.e.MOBILE_TRANSFER)&&this.props.context.siteSettings&&this.props.context.siteSettings.canIUse("mobile")}get canIUseDesktopCapability(){return this.props.rbacContext.canIUseUiAction(_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_5__.e.DESKTOP_TRANSFER)&&this.props.context.siteSettings&&this.props.context.siteSettings.canIUse("desktop")}get canIUseAccountRecoveryCapability(){return this.props.rbacContext.canIUseUiAction(_shared_services_rbacs_uiActionEnumeration__WEBPACK_IMPORTED_MODULE_5__.e.PROFIL_ACCOUNT_RECOVERY)&&this.props.context.siteSettings&&this.props.context.siteSettings.canIUse("accountRecovery")}render(){const isSelected=pathSuffix=>this.props.location.pathname.endsWith(pathSuffix);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"navigation-secondary navigation-profile"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("profile")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsProfileRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Profile"))))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("keys")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsKeysRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Keys inspector"))))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("passphrase")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsPassphraseRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Passphrase"))))))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("security-token")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsSecurityTokenRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Security token"))))))),this.canIUseThemeCapability&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("theme")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsThemeRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Theme"))))))),this.isMfaEnabled&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("mfa")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsMfaRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Multi Factor Authentication")),this.props.hasPendingMfaChoice&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_attention_svg__WEBPACK_IMPORTED_MODULE_6__.A,{className:"attention-required"})))))),this.canIUseAccountRecoveryCapability&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("account-recovery")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsAccountRecoveryRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Account Recovery")),this.props.hasPendingAccountRecoveryChoice&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_img_svg_attention_svg__WEBPACK_IMPORTED_MODULE_6__.A,{className:"attention-required"})))))),this.canIUseMobileCapability&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{id:"navigation-item-mobile-setup"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("mobile")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsMobileRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Mobile setup"))))))),this.canIUseDesktopCapability&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{id:"navigation-item-desktop-setup"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"row "+(isSelected("desktop")?"selected":"")},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell-wrapper"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"main-cell"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:"link no-border",type:"button",onClick:this.props.navigationContext.onGoToUserSettingsDesktopRequested},react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__.x6,null,"Desktop app setup")))))))))}}NavigateIntoUserSettingsWorkspace.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_7___default().any,navigationContext:prop_types__WEBPACK_IMPORTED_MODULE_7___default().any,history:prop_types__WEBPACK_IMPORTED_MODULE_7___default().object,location:prop_types__WEBPACK_IMPORTED_MODULE_7___default().object,hasPendingAccountRecoveryChoice:prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool,hasPendingMfaChoice:prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool,rbacContext:prop_types__WEBPACK_IMPORTED_MODULE_7___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_shared_context_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)((0,_shared_context_Rbac_RbacContext__WEBPACK_IMPORTED_MODULE_4__.x6)((0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.y)((0,_contexts_NavigationContext__WEBPACK_IMPORTED_MODULE_2__.qN)((0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.CI)("common")(NavigateIntoUserSettingsWorkspace)))));NavigateIntoUserSettingsWorkspace.__docgenInfo={description:"This component allows to navigate throught the differents sections of the user settings workspace",methods:[{name:"isMfaEnabled",docblock:"Returns true if the use has the MFA capability",modifiers:["get"],params:[],returns:null,description:"Returns true if the use has the MFA capability"},{name:"canIUseThemeCapability",docblock:"Can the user access the theme capability.\n@returns {bool}",modifiers:["get"],params:[],returns:{type:{name:"bool"}},description:"Can the user access the theme capability."},{name:"canIUseMobileCapability",docblock:"Can the user access the mobile capability.\n@returns {bool}",modifiers:["get"],params:[],returns:{type:{name:"bool"}},description:"Can the user access the mobile capability."},{name:"canIUseDesktopCapability",docblock:"Can the user access the desktop capability.\n@returns {bool}",modifiers:["get"],params:[],returns:{type:{name:"bool"}},description:"Can the user access the desktop capability."},{name:"canIUseAccountRecoveryCapability",docblock:"Can the user access the account recovery feature.\n@return {bool} true if the plugin is enabled and if an admin enabled the feature.",modifiers:["get"],params:[],returns:{description:"true if the plugin is enabled and if an admin enabled the feature.",type:{name:"bool"}},description:"Can the user access the account recovery feature."}],displayName:"NavigateIntoUserSettingsWorkspace",props:{context:{description:"",type:{name:"any"},required:!1},navigationContext:{description:"",type:{name:"any"},required:!1},history:{description:"",type:{name:"object"},required:!1},location:{description:"",type:{name:"object"},required:!1},hasPendingAccountRecoveryChoice:{description:"",type:{name:"bool"},required:!1},hasPendingMfaChoice:{description:"",type:{name:"bool"},required:!1},rbacContext:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/context/Rbac/RbacContext.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E2:()=>defaultAdministratorRbacContext,UO:()=>denyRbacContext,mM:()=>defaultUserRbacContext});__webpack_require__("./src/shared/models/entity/groupUser/groupUserEntity.test.data.js"),__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");function defaultAdministratorRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function defaultUserRbacContext(data={}){return{canIUseUiAction:()=>!0,...data}}function denyRbacContext(data={}){return{canIUseUiAction:()=>!1,...data}}},"./src/shared/models/entity/avatar/avatarEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Fp:()=>defaultFullAvatarDto,KA:()=>defaultAvatarDto});var uuid__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const defaultAvatarDto=(data={})=>({id:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),url:{medium:"/avatars/view/e6927385-195c-4c7f-a107-a202ea86de40/medium.jpg",small:"/avatars/view/e6927385-195c-4c7f-a107-a202ea86de40/small.jpg"},created:"2023-06-03T12:03:46+00:00",modified:"2023-06-03T12:03:46+00:00",...data}),defaultFullAvatarDto=(data={})=>({id:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),created:"2023-06-03T12:03:46+00:00",modified:"2023-06-03T12:03:46+00:00",user_id:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),foreign_key:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),model:"Avatar",filename:"carol.png",filesize:733439,mime_type:"image/png",extension:"png",hash:"7445a736df60a1ac1bfdab8fc5b842a95c495aec",path:"Avatar/60/6d/93/0519d40b29b94c79a68c8f933896c80d/0519d40b29b94c79a68c8f933896c80d.png",adapter:"Local",url:{medium:"img/public/Avatar/60/6d/93/0519d40b29b94c79a68c8f933896c80d/0519d40b29b94c79a68c8f933896c80d.a99472d5.png",small:"img/public/Avatar/60/6d/93/0519d40b29b94c79a68c8f933896c80d/0519d40b29b94c79a68c8f933896c80d.65a0ba70.png"},...data})},"./src/shared/models/entity/groupUser/groupUserEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M2:()=>defaultGroupUser});var uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");__webpack_require__("./src/shared/models/entity/user/userEntity.test.data.js");const defaultGroupUser=(data={})=>({id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),user_id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),group_id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),is_admin:!1,created:"2022-01-13T13:19:04.661Z",...data})},"./src/shared/models/entity/profile/ProfileEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>defaultProfileDto});var uuid__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),_avatar_avatarEntity_test_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/avatar/avatarEntity.test.data.js");const defaultProfileDto=(data={})=>({id:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),user_id:(0,uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),first_name:"Ada",last_name:"Lovelace",created:"2020-04-20T11:32:17+00:00",modified:"2020-04-20T11:32:17+00:00",avatar:(0,_avatar_avatarEntity_test_data__WEBPACK_IMPORTED_MODULE_1__.KA)(),...data})},"./src/shared/models/entity/user/userEntity.test.data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{HI:()=>defaultAdminUserDto,cI:()=>defaultUserDto,VV:()=>users});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ProfileEntity_test_data=__webpack_require__("./src/shared/models/entity/profile/ProfileEntity.test.data.js"),role_test_data=__webpack_require__("./src/shared/models/entity/role/role.test.data.js"),groupUserEntity_test_data=__webpack_require__("./src/shared/models/entity/groupUser/groupUserEntity.test.data.js"),keys=__webpack_require__("./test/fixture/pgpKeys/keys.js");const defaultUserDto=(data={},options={})=>{const defaultData={id:(0,v4.A)(),role_id:role_test_data.ol,username:"ada@passbolt.com",active:!0,deleted:!1,created:"2020-04-20T11:32:16+00:00",modified:"2020-04-20T11:32:16+00:00",last_logged_in:"2022-07-04T13:39:25+00:00",is_mfa_enabled:!1,...data};!data.role&&options?.withRole&&(defaultData.role=(0,role_test_data.Dm)({id:defaultData.role_id}));const profile=data?.profile||(0,ProfileEntity_test_data.S)({user_id:defaultData.id,...data?.profile});if(defaultData.profile=profile,!data.groups_users&&options?.withGroupsUsers){const groupsUsersCount="number"==typeof options?.withGroupsUsers?options?.withGroupsUsers:1;defaultData.groups_users=[];for(let i=0;i<groupsUsersCount;i++){const groupUserDto=(0,groupUserEntity_test_data.M2)({user_id:defaultData.id});defaultData.groups_users.push(groupUserDto)}}return!data.gpgkey&&options?.withGpgkey&&(defaultData.gpgkey=((data={})=>({id:"91d8a7fd-3ab3-5e98-a4a5-0d8694ff23b9",user_id:"d57c10f5-639d-5160-9c81-8a0c6c4ec856",armored_key:keys.u.ada.public,bits:4096,uid:"Passbolt Default Admin <admin@passbolt.com>",key_id:"D06426D3",fingerprint:"0C1D1761110D1E33C9006D1A5B1B332ED06426D3",type:"RSA",expires:null,key_created:"2015-10-31T16:21:43+00:00",deleted:!1,created:"2020-04-20T11:32:18+00:00",modified:"2020-04-20T11:32:18+00:00",...data}))()),!data.account_recovery_user_setting&&options?.withAccountRecoveryUserSetting&&(defaultData.account_recovery_user_setting=(data=>{const defaultData={user_id:(0,v4.A)(),status:"approved"};return Object.assign(defaultData,data||{})})()),!data.pending_account_recovery_request&&options?.withPendingAccountRecoveryUserRequest&&(defaultData.pending_account_recovery_request=((data={})=>({id:(0,v4.A)(),status:"pending",created:"2020-05-04T20:31:45+00:00",modified:"2020-05-04T20:31:45+00:00",created_by:(0,v4.A)(),modified_by:(0,v4.A)(),...data}))()),defaultData},defaultAdminUserDto=(data={})=>{const role=(0,role_test_data.bd)();return defaultUserDto({role,...data})},users={ada:defaultUserDto({id:"f848277c-5398-58f8-a82a-72397af2d450",username:"ada@passbolt.com",profile:(0,ProfileEntity_test_data.S)({first_name:"Ada",last_name:"Lovelace"})}),admin:defaultAdminUserDto({id:"f642271d-bbb1-401e-bbd1-7ec370f8e19b",username:"admin@passbolt.com",profile:(0,ProfileEntity_test_data.S)({first_name:"Admin",last_name:"User"})}),betty:defaultUserDto({id:"e97b14ba-8957-57c9-a357-f78a6e1e1a46",username:"betty@passbolt.com",profile:(0,ProfileEntity_test_data.S)({first_name:"Betty",last_name:"Holberton"})})}},"./node_modules/uuid/dist/esm-browser/stringify.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});for(var _validate_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js"),byteToHex=[],i=0;i<256;++i)byteToHex.push((i+256).toString(16).substr(1));const __WEBPACK_DEFAULT_EXPORT__=function stringify(arr){var offset=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,uuid=(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase();if(!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.A)(uuid))throw TypeError("Stringified UUID is invalid");return uuid}},"./node_modules/uuid/dist/esm-browser/v4.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var getRandomValues;__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v4});var rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&!(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");const esm_browser_v4=function v4(options,buf,offset){var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return(0,stringify.A)(rnds)}},"./node_modules/uuid/dist/esm-browser/validate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_validate});const regex=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const esm_browser_validate=function validate(uuid){return"string"==typeof uuid&&regex.test(uuid)}},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);