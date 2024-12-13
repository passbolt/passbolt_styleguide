/*! For license information please see react-extension-components-UserGroup-CreateUserGroup-CreateUserGroup-test-stories.6d698ea6.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[7169],{"./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Initial:()=>Initial,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CreateUserGroup_test_stories});var react_router=__webpack_require__("./node_modules/react-router/esm/react-router.js"),react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),CreateUserGroup=__webpack_require__("./src/react-extension/components/UserGroup/CreateUserGroup/CreateUserGroup.js"),role_test_data=__webpack_require__("./src/shared/models/entity/role/role.test.data.js"),ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js");const mockUsers=[{id:"8e3874ae-4b40-590b-968a-418f704b9d9a",role_id:role_test_data.ol,username:"carol@passbolt.com",active:!0,deleted:!1,created:"2020-05-11T09:32:49+00:00",modified:"2020-05-12T09:32:49+00:00",profile:{id:"48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",user_id:"640ebc06-5ec1-5322-a1ae-6120ed2f3a74",first_name:"Carol",last_name:"Shaw",created:"2020-05-13T09:32:49+00:00",modified:"2020-05-13T09:32:49+00:00",avatar:{id:"0f769127-3053-45e4-bd8e-75e766bb4d52",user_id:"640ebc06-5ec1-5322-a1ae-6120ed2f3a74",foreign_key:"48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",model:"Avatar",filename:"carol.png",filesize:733439,mime_type:"image/png",extension:"png",hash:"7445a736df60a1ac1bfdab8fc5b842a95c495aec",path:"Avatar/73/09/19/0f769127305345e4bd8e75e766bb4d52/0f769127305345e4bd8e75e766bb4d52.png",adapter:"Local",created:"2020-05-13T09:32:51+00:00",modified:"2020-05-13T09:32:51+00:00",url:{medium:"img/public/Avatar/73/09/19/0f769127305345e4bd8e75e766bb4d52/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",small:"img/public/Avatar/73/09/19/0f769127305345e4bd8e75e766bb4d52/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"}}},__placeholder_last_logged_in__:"",last_logged_in:""},{id:"f848277c-5398-58f8-a82a-72397af2d450",role_id:role_test_data.ol,role:{created:"2012-07-04T13:39:25+00:00",description:"Logged in user",id:role_test_data.ol,modified:"2012-07-04T13:39:25+00:00",name:"user"},username:"ada@passbolt.com",active:!0,deleted:!1,created:"2020-03-13T09:32:49+00:00",modified:"2020-04-13T09:32:49+00:00",profile:{id:"99522cc9-0acc-5ae2-b996-d03bded3c0a6",user_id:"f848277c-5398-58f8-a82a-72397af2d450",first_name:"Ada",last_name:"Lovelace",created:"2020-05-13T09:32:49+00:00",modified:"2020-05-13T09:32:49+00:00",avatar:{id:"b5e7a332-595f-4e52-9591-79df27f8a978",user_id:"f848277c-5398-58f8-a82a-72397af2d450",foreign_key:"99522cc9-0acc-5ae2-b996-d03bded3c0a6",model:"Avatar",filename:"ada.png",filesize:170049,mime_type:"image/png",extension:"png",hash:"97e36ab6528e26e3b9f988444ef490f125f49a39",path:"Avatar/ef/71/ed/b5e7a332595f4e52959179df27f8a978/b5e7a332595f4e52959179df27f8a978.png",adapter:"Local",created:"2020-05-13T09:32:52+00:00",modified:"2020-05-13T09:32:52+00:00",url:{medium:"img/public/Avatar/ef/71/ed/b5e7a332595f4e52959179df27f8a978/b5e7a332595f4e52959179df27f8a978.a99472d5.png",small:"img/public/Avatar/ef/71/ed/b5e7a332595f4e52959179df27f8a978/b5e7a332595f4e52959179df27f8a978.65a0ba70.png"}}},__placeholder_last_logged_in__:"2020-05-12T15:56:49+00:00",last_logged_in:"2020-08-12T15:56:49+00:00"}],mockGpgKey={id:"04481719-5d9d-5e22-880a-a6b9270601d2",user_id:"f848277c-5398-58f8-a82a-72397af2d450",armored_key:"-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\n=Kwft\n-----END PGP PUBLIC KEY BLOCK-----",bits:4096,uid:"Ada Lovelace <ada@passbolt.com>",key_id:"5D9B054F",fingerprint:"03F60E958F4CB29723ACDF761353B5B15D9B054F",type:"RSA",expires:null,key_created:"2015-08-09T12:48:31+00:00",deleted:!1,created:"2020-08-19T14:56:54+00:00",modified:"2020-08-19T14:56:54+00:00"},CreateUserGroup_test_stories={title:"Components/UserGroup/CreateUserGroup",component:CreateUserGroup.A},Template=({context,...args})=>react.createElement(AppContext.A.Provider,{value:context},react.createElement(react_router.fS,{initialEntries:["/"]},react.createElement(react_router.qh,{component:routerProps=>react.createElement(CreateUserGroup.A,{...args,...routerProps})})));Template.propTypes={context:prop_types_default().object};const context=function defaultAppContext(appContext={}){const defaultAppContext1=(0,ExtAppContext_test_data.dO)({loggedInUser:mockUsers[0],users:mockUsers});return Object.assign(defaultAppContext1,appContext)}();context.port.addRequestListener("passbolt.keyring.get-public-key-info-by-user",(async()=>mockGpgKey));const Initial=Template.bind({});Initial.args={context,...function defaultProps(){return{onClose:jest.fn()}}()};const __namedExportsOrder=["Initial"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:"({\n  context,\n  ...args\n}) => <AppContext.Provider value={context}>\n    <MemoryRouter initialEntries={['/']}>\n      <Route component={routerProps => <CreateUserGroup {...args} {...routerProps} />}></Route>\n    </MemoryRouter>\n  </AppContext.Provider>",...Initial.parameters?.docs?.source}}}},"./src/react-extension/components/UserGroup/EditUserGroup/EditUserGroupItem.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>EditUserGroup_EditUserGroupItem});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),UserAvatar=__webpack_require__("./src/react-extension/components/Common/Avatar/UserAvatar.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),Select=__webpack_require__("./src/react-extension/components/Common/Select/Select.js"),userUtils=__webpack_require__("./src/shared/utils/userUtils.js"),TooltipPortal=__webpack_require__("./src/react-extension/components/Common/Tooltip/TooltipPortal.js"),Fingerprint=__webpack_require__("./src/react-extension/components/Common/Fingerprint/Fingerprint.js");class TooltipMessageGroupUserDetailsLoading extends react.Component{render(){return react.createElement("div",{className:"group-user-details-tooltip skeleton"},react.createElement("div",{className:"email"}," "),react.createElement("div",{className:"fingerprint"},react.createElement("div",{className:"fingerprint-line"}," "),react.createElement("div",{className:"fingerprint-line"}," ")),react.createElement("div",{className:"shimmer shimmer-tooltip"}))}}const Tooltip_TooltipMessageGroupUserDetailsLoading=TooltipMessageGroupUserDetailsLoading;TooltipMessageGroupUserDetailsLoading.__docgenInfo={description:"",methods:[],displayName:"TooltipMessageGroupUserDetailsLoading"};class EditUserGroupItem extends react.Component{constructor(props){super(props),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{tooltipFingerprintMessage:null}}bindCallbacks(){this.onTooltipFingerprintMouseHover=this.onTooltipFingerprintMouseHover.bind(this)}getUserFullname(){const user=this.props.groupUser.user;return`${user.profile.first_name} ${user.profile.last_name}`}isUserSuspended(user){return this.props.context.siteSettings.canIUse("disableUser")&&(0,userUtils.B7)(user)}get isManagerSelectOptions(){return[{value:!1,label:react.createElement(es.x6,null,"Member")},{value:!0,label:react.createElement(es.x6,null,"Group manager")}]}async onTooltipFingerprintMouseHover(){if(this.state.tooltipFingerprintMessage)return;const gpgkey=await this.props.context.port.request("passbolt.keyring.get-public-key-info-by-user",this.props.groupUser.user.id),tooltipFingerprintMessage=react.createElement("div",{className:"group-user-details-tooltip"},react.createElement("div",{className:"email ellipsis"},react.createElement("strong",null,this.props.groupUser.user.username)),react.createElement(Fingerprint.A,{fingerprint:gpgkey.fingerprint}));this.setState({tooltipFingerprintMessage})}render(){const isSuspended=this.isUserSuspended(this.props.groupUser.user);return react.createElement("li",{className:`row ${this.props.isMemberChanged?"permission-updated":""} ${isSuspended?"suspended":""}`},react.createElement(UserAvatar.A,{baseUrl:this.props.context.userSettings.getTrustedDomain(),user:this.props.groupUser.user}),react.createElement("div",{className:"aro"},react.createElement("div",{className:"aro-name"},react.createElement("span",{className:"ellipsis"},this.getUserFullname(),isSuspended&&react.createElement("span",{className:"suspended"}," ",react.createElement(es.x6,null,"(suspended)"))),react.createElement(TooltipPortal.A,{message:this.state.tooltipFingerprintMessage||react.createElement(Tooltip_TooltipMessageGroupUserDetailsLoading,null),direction:"auto",onMouseHover:this.onTooltipFingerprintMouseHover},react.createElement(Icon.A,{name:"info-circle",baseline:!0}))),react.createElement("div",{className:"permission_changes"},this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be added")),this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Will be updated")),!this.props.isMemberChanged&&!this.props.isMemberAdded&&react.createElement("span",null,react.createElement(es.x6,null,"Unchanged")))),react.createElement("div",{className:"rights"},react.createElement(Select.A,{className:"permission inline",value:this.props.groupUser.is_admin,items:this.isManagerSelectOptions,onChange:event=>this.props.onMemberRoleChange(event,this.props.groupUser),disabled:!this.props.areActionsAllowed,direction:this.props.isLastItemDisplayed?"top":"bottom"})),react.createElement("div",{className:"actions"},react.createElement("button",{type:"button",title:this.props.t("Remove"),className:"remove-item button-transparent",disabled:!this.props.areActionsAllowed,onClick:event=>this.props.onMemberRemoved(event,this.props.groupUser)},react.createElement(Icon.A,{name:"close"}),react.createElement("span",{className:"visuallyhidden"},react.createElement(es.x6,null,"Remove")))))}}EditUserGroupItem.defaultProps={isMemberChanged:!1,isMemberAdded:!1,areActionsAllowed:!1,isLastItemDisplayed:!1},EditUserGroupItem.propTypes={context:prop_types_default().any,groupUser:prop_types_default().object.isRequired,onMemberRoleChange:prop_types_default().func.isRequired,onMemberRemoved:prop_types_default().func.isRequired,isMemberChanged:prop_types_default().bool,isMemberAdded:prop_types_default().bool,areActionsAllowed:prop_types_default().bool,isLastItemDisplayed:prop_types_default().bool,t:prop_types_default().func};const EditUserGroup_EditUserGroupItem=(0,AppContext.L)((0,es.CI)("common")(EditUserGroupItem));EditUserGroupItem.__docgenInfo={description:"This component allows to edit an user group",methods:[{name:"defaultState",docblock:"Returns the component default state",modifiers:["get"],params:[],returns:null,description:"Returns the component default state"},{name:"bindCallbacks",docblock:"Bind callbacks.",modifiers:[],params:[],returns:null,description:"Bind callbacks."},{name:"getUserFullname",docblock:"Get a user full name\n@returns {string}",modifiers:[],params:[],returns:{type:{name:"string"}},description:"Get a user full name"},{name:"isUserSuspended",docblock:"Returns true if the feature flag disableUser is enabled and the given user is suspended.\n@param {object} user\n@returns {boolean}",modifiers:[],params:[{name:"user",type:{name:"object"},optional:!1}],returns:{type:{name:"boolean"}},description:"Returns true if the feature flag disableUser is enabled and the given user is suspended."},{name:"isManagerSelectOptions",docblock:"Get options for permission selection\n@returns {[{label: *, value: boolean}]}",modifiers:["get"],params:[],returns:{type:{name:"tuple",elements:[]}},description:"Get options for permission selection"},{name:"onTooltipFingerprintMouseHover",docblock:"Handle whenever the user passes its mouse hover the tooltip.\n@returns {Promise<JSX>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"JSX"}]}},description:"Handle whenever the user passes its mouse hover the tooltip."}],displayName:"EditUserGroupItem",props:{isMemberChanged:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isMemberAdded:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},areActionsAllowed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},isLastItemDisplayed:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},context:{description:"",type:{name:"any"},required:!1},groupUser:{description:"",type:{name:"object"},required:!0},onMemberRoleChange:{description:"",type:{name:"func"},required:!0},onMemberRemoved:{description:"",type:{name:"func"},required:!0},t:{description:"",type:{name:"func"},required:!1}}}},"./src/react-extension/contexts/ActionFeedbackContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>ActionFeedbackContextProvider,ot:()=>withActionFeedback});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),uuid__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");const ActionFeedbackContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({feedbacks:[],displaySuccess:()=>{},displayError:()=>{},remove:()=>{}});class ActionFeedbackContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState}get defaultState(){return{feedbacks:[],displaySuccess:this.displaySuccess.bind(this),displayError:this.displayError.bind(this),remove:this.remove.bind(this)}}async displaySuccess(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"success",message:feedbackToAdd}]})}async displayError(feedbackToAdd){await this.setState({feedbacks:[...this.state.feedbacks,{id:(0,uuid__WEBPACK_IMPORTED_MODULE_1__.A)(),type:"error",message:feedbackToAdd}]})}async remove(feedbackToRemove){await this.setState({feedbacks:this.state.feedbacks.filter((feedback=>feedbackToRemove.id!==feedback.id))})}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Provider,{value:this.state},this.props.children)}}function withActionFeedback(WrappedComponent){return class WithActionFeedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionFeedbackContext.Consumer,null,(actionFeedbackContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{actionFeedbackContext,...this.props})))}}}ActionFeedbackContextProvider.displayName="ActionFeedbackContextProvider",ActionFeedbackContextProvider.propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_2___default().any},ActionFeedbackContextProvider.__docgenInfo={description:"The related context provider",methods:[{name:"defaultState",docblock:"Returns the default component state",modifiers:["get"],params:[],returns:null,description:"Returns the default component state"},{name:"displaySuccess",docblock:"Display the feedback in a success mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a success mode"},{name:"displayError",docblock:"Display the feedback in a error mode\n@param feedbackToAdd A feedback",modifiers:["async"],params:[{name:"feedbackToAdd",description:"A feedback",optional:!1}],returns:null,description:"Display the feedback in a error mode"},{name:"remove",docblock:"Remove the feedback\n@param feedbackToRemove A feedback",modifiers:["async"],params:[{name:"feedbackToRemove",description:"A feedback",optional:!1}],returns:null,description:"Remove the feedback"}],displayName:"ActionFeedbackContextProvider",props:{children:{description:"",type:{name:"any"},required:!1}}}},"./src/react-extension/lib/Error/InputValidator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function maxSizeValidation(value,maxLength,translate){const sizeExceeded=value.length>=maxLength,warningMessage=translate("this is the maximum size for this field, make sure your data was not truncated");return sizeExceeded?warningMessage:""}__webpack_require__.d(__webpack_exports__,{d:()=>maxSizeValidation})},"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,VB:()=>RESOURCE_TOTP_KEY_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024,RESOURCE_TOTP_KEY_MAX_LENGTH=1024},"./src/shared/models/entity/abstract/entity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});class Entity{constructor(dto,options={}){(options?.clone??!0)&&(dto=JSON.parse(JSON.stringify(dto))),this._props=dto}toDto(){return JSON.parse(JSON.stringify(this))}toJSON(){return this._props}_hasProp(propName){if(!propName.includes(".")){const normalizedPropName=Entity._normalizePropName(propName);return Object.prototype.hasOwnProperty.call(this._props,normalizedPropName)}try{return this._getPropByPath(propName),!0}catch(error){return!1}}_getPropByPath(path){return Entity._normalizePropName(path).split(".").reduce(((obj,i)=>{if(Object.prototype.hasOwnProperty.call(obj,i))return obj[i];throw new Error}),this._props)}static _normalizePropName(name){return name.replace(/([A-Z])/g,((x,y)=>`_${y.toLowerCase()}`)).replace(/\._/,".").replace(/^_/,"").replace(/^\./,"")}}const __WEBPACK_DEFAULT_EXPORT__=Entity},"./src/shared/models/entity/abstract/entityV2.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entity.js");class EntityV2 extends _entity__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};constructor(dtos={},options={}){super(dtos,options),this.marshall();(options?.validate??!0)&&(this.validateSchema(options?.schema),this.validateBuildRules(options?.validateBuildRules))}marshall(){}validateSchema(schema=null){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this._props,schema??this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The entity class should declare its schema.")}validateBuildRules(options={}){}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2},"./src/shared/models/entity/role/roleEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");class RoleEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["id","name"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",enum:[RoleEntity.ROLE_ADMIN,RoleEntity.ROLE_USER,RoleEntity.ROLE_GUEST,RoleEntity.ROLE_ROOT]},description:{type:"string",maxLength:255},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"}}}}get id(){return this._props.id}get name(){return this._props.name}get description(){return this._props.description||null}get created(){return this._props.created||null}get modified(){return this._props.modified||null}isAdmin(){return this.name===RoleEntity.ROLE_ADMIN}static get ENTITY_NAME(){return"Role"}static get ROLE_ADMIN(){return"admin"}static get ROLE_USER(){return"user"}static get ROLE_GUEST(){return"guest"}static get ROLE_ROOT(){return"root"}}const __WEBPACK_DEFAULT_EXPORT__=RoleEntity},"./node_modules/uuid/dist/esm-browser/v5.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>esm_browser_v5});var stringify=__webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js"),validate=__webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");const esm_browser_parse=function parse(uuid){if(!(0,validate.A)(uuid))throw TypeError("Invalid UUID");var v,arr=new Uint8Array(16);return arr[0]=(v=parseInt(uuid.slice(0,8),16))>>>24,arr[1]=v>>>16&255,arr[2]=v>>>8&255,arr[3]=255&v,arr[4]=(v=parseInt(uuid.slice(9,13),16))>>>8,arr[5]=255&v,arr[6]=(v=parseInt(uuid.slice(14,18),16))>>>8,arr[7]=255&v,arr[8]=(v=parseInt(uuid.slice(19,23),16))>>>8,arr[9]=255&v,arr[10]=(v=parseInt(uuid.slice(24,36),16))/1099511627776&255,arr[11]=v/4294967296&255,arr[12]=v>>>24&255,arr[13]=v>>>16&255,arr[14]=v>>>8&255,arr[15]=255&v,arr};function f(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:case 3:return x^y^z;case 2:return x&y^x&z^y&z}}function ROTL(x,n){return x<<n|x>>>32-n}const esm_browser_v5=function v35(name,version,hashfunc){function generateUUID(value,namespace,buf,offset){if("string"==typeof value&&(value=function stringToBytes(str){str=unescape(encodeURIComponent(str));for(var bytes=[],i=0;i<str.length;++i)bytes.push(str.charCodeAt(i));return bytes}(value)),"string"==typeof namespace&&(namespace=esm_browser_parse(namespace)),16!==namespace.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var bytes=new Uint8Array(16+value.length);if(bytes.set(namespace),bytes.set(value,namespace.length),(bytes=hashfunc(bytes))[6]=15&bytes[6]|version,bytes[8]=63&bytes[8]|128,buf){offset=offset||0;for(var i=0;i<16;++i)buf[offset+i]=bytes[i];return buf}return(0,stringify.A)(bytes)}try{generateUUID.name=name}catch(err){}return generateUUID.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",generateUUID.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",generateUUID}("v5",80,(function sha1(bytes){var K=[1518500249,1859775393,2400959708,3395469782],H=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof bytes){var msg=unescape(encodeURIComponent(bytes));bytes=[];for(var i=0;i<msg.length;++i)bytes.push(msg.charCodeAt(i))}else Array.isArray(bytes)||(bytes=Array.prototype.slice.call(bytes));bytes.push(128);for(var l=bytes.length/4+2,N=Math.ceil(l/16),M=new Array(N),_i=0;_i<N;++_i){for(var arr=new Uint32Array(16),j=0;j<16;++j)arr[j]=bytes[64*_i+4*j]<<24|bytes[64*_i+4*j+1]<<16|bytes[64*_i+4*j+2]<<8|bytes[64*_i+4*j+3];M[_i]=arr}M[N-1][14]=8*(bytes.length-1)/Math.pow(2,32),M[N-1][14]=Math.floor(M[N-1][14]),M[N-1][15]=8*(bytes.length-1)&4294967295;for(var _i2=0;_i2<N;++_i2){for(var W=new Uint32Array(80),t=0;t<16;++t)W[t]=M[_i2][t];for(var _t=16;_t<80;++_t)W[_t]=ROTL(W[_t-3]^W[_t-8]^W[_t-14]^W[_t-16],1);for(var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],_t2=0;_t2<80;++_t2){var s=Math.floor(_t2/20),T=ROTL(a,5)+f(s,b,c,d)+e+K[s]+W[_t2]>>>0;e=d,d=c,c=ROTL(b,30)>>>0,b=a,a=T}H[0]=H[0]+a>>>0,H[1]=H[1]+b>>>0,H[2]=H[2]+c>>>0,H[3]=H[3]+d>>>0,H[4]=H[4]+e>>>0}return[H[0]>>24&255,H[0]>>16&255,H[0]>>8&255,255&H[0],H[1]>>24&255,H[1]>>16&255,H[1]>>8&255,255&H[1],H[2]>>24&255,H[2]>>16&255,H[2]>>8&255,255&H[2],H[3]>>24&255,H[3]>>16&255,H[3]>>8&255,255&H[3],H[4]>>24&255,H[4]>>16&255,H[4]>>8&255,255&H[4]]}))}}]);