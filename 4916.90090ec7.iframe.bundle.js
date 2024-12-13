/*! For license information please see 4916.90090ec7.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[4916],{"./src/shared/context/Rbac/RbacContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>Rbac_RbacContext,x6:()=>withRbac});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),controlFunctionEnumeration=__webpack_require__("./src/shared/services/rbacs/controlFunctionEnumeration.js"),denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js");class GetControlFunctionService{static getByRbac(rbac){const controlFunction=controlFunctionEnumeration.HJ[rbac.controlFunction];return controlFunction||(console.warn(`Could not find control function for the given rbac entity (${rbac.id})`),denyControlFunction.A)}static getDefaultForAdminAndUiAction(uiActionName){return controlFunctionEnumeration.Y9[uiActionName]||allowControlFunction.A}static getDefaultForUserAndUiAction(uiActionName){return controlFunctionEnumeration.uy[uiActionName]||allowControlFunction.A}}var roleEntity=__webpack_require__("./src/shared/models/entity/role/roleEntity.js");class CanUse{static canRoleUseUiAction(user,rbacs,actionName){if(window.chrome?.webview){const rbac=rbacs.findRbacByActionName(actionName);return this.getByRbacOrDefault(rbac,actionName,user)}const role=new roleEntity.A(user.role);if(role.isAdmin()){return GetControlFunctionService.getDefaultForAdminAndUiAction(actionName).execute()}const rbac=rbacs.findRbacByRoleAndUiActionName(role,actionName);return this.getByRbacOrDefault(rbac,actionName,user)}static getByRbacOrDefault(rbac,actionName,user){if(rbac){return GetControlFunctionService.getByRbac(rbac).execute(user)}return GetControlFunctionService.getDefaultForUserAndUiAction(actionName).execute()}}const RbacContext=react.createContext({canIUseUiAction:()=>{}});class RbacContextProvider extends react.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{canIUseUiAction:this.canIUseUiAction.bind(this)}}canIUseUiAction(actionName){return CanUse.canRoleUseUiAction(this.props.context.loggedInUser,this.props.context.rbacs,actionName)}render(){return react.createElement(RbacContext.Provider,{value:this.state},this.props.children)}}RbacContextProvider.propTypes={context:prop_types_default().any,children:prop_types_default().any};const Rbac_RbacContext=(0,AppContext.L)(RbacContextProvider);function withRbac(WrappedComponent){return class WithRbac extends react.Component{render(){return react.createElement(RbacContext.Consumer,null,(rbacContext=>react.createElement(WrappedComponent,{rbacContext,...this.props})))}}}RbacContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"canIUseUiAction",docblock:"Check if the user can use the given ui action.\n@param {string} actionName The name of the UI action to check for.\n@return {boolean}",modifiers:[],params:[{name:"actionName",description:"The name of the UI action to check for.",type:{name:"string"},optional:!1}],returns:{type:{name:"boolean"}},description:"Check if the user can use the given ui action."}],displayName:"RbacContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entity.js");class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};constructor(dtos={},options={}){super(dtos,options),this.marshall();(options?.validate??!0)&&(this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules))}marshall(){}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./src/shared/services/rbacs/controlFunctionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{HJ:()=>controlFunctionResolutions,HK:()=>controlFunctions,Y9:()=>defaultAdminUiActionControlResolution,uy:()=>defaultUserUiActionControlResolution});var allowControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/allowControlFunction.js"),ControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowIfGroupManagerInOneGroupFunction extends ControlFunction.A{static execute(user){return user.groups_users.some((group=>group.is_admin))}}var denyControlFunction=__webpack_require__("./src/shared/services/rbacs/controlFunctions/denyControlFunction.js"),uiActionEnumeration=__webpack_require__("./src/shared/services/rbacs/uiActionEnumeration.js");const controlFunctions={ALLOW:"Allow",DENY:"Deny",ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP:"AllowIfGroupManagerInOneGroup"},controlFunctionResolutions={[controlFunctions.ALLOW]:allowControlFunction.A,[controlFunctions.DENY]:denyControlFunction.A,[controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP]:AllowIfGroupManagerInOneGroupFunction},defaultAdminUiActionControlResolution={[uiActionEnumeration.e.FOLDERS_USE]:controlFunctionResolutions[controlFunctions.ALLOW]},defaultUserUiActionControlResolution={[uiActionEnumeration.e.ADMINSTRATION_VIEW_WORKSPACE]:controlFunctionResolutions[controlFunctions.DENY]}},"./src/shared/services/rbacs/controlFunctions/ControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ControlFunction});class ControlFunction{}},"./src/shared/services/rbacs/controlFunctions/allowControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>AllowControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class AllowControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!0}}},"./src/shared/services/rbacs/controlFunctions/denyControlFunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DenyControlFunction});var _ControlFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/services/rbacs/controlFunctions/ControlFunction.js");class DenyControlFunction extends _ControlFunction__WEBPACK_IMPORTED_MODULE_0__.A{static execute(){return!1}}},"./src/shared/services/rbacs/uiActionEnumeration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>uiActions});const uiActions={FOLDERS_USE:"Folders.use",RESOURCES_IMPORT:"Resources.import",RESOURCES_EXPORT:"Resources.export",RESOURCES_SEE_ACTIVITIES:"Resources.seeActivities",RESOURCES_SEE_COMMENTS:"Resources.seeComments",SECRETS_PREVIEW:"Secrets.preview",SECRETS_COPY:"Secrets.copy",SHARE_VIEW_LIST:"Share.viewList",TAGS_USE:"Tags.use",USERS_VIEW_WORKSPACE:"Users.viewWorkspace",MOBILE_TRANSFER:"Mobile.transfer",DESKTOP_TRANSFER:"Desktop.transfer",PROFIL_ACCOUNT_RECOVERY:"Profil.accountRecovery",ADMINSTRATION_VIEW_WORKSPACE:"Administration.viewWorkspace",DUO_CONFIGURATION:"Duo.configuration",AVATAR_UPLOAD:"Avatar.upload",SHARE_FOLDER:"Folders.share"}}}]);