/*! For license information please see react-extension-components-Resource-ResourceForm-SelectResourceForm-test-stories.27695754.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[2593],{"./src/react-extension/components/Resource/ResourceForm/SelectResourceForm.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Description:()=>Description,Note:()=>Note,Password:()=>Password,Totp:()=>Totp,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SelectResourceForm_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),DialogWrapper=__webpack_require__("./src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper.js"),SelectResourceForm=__webpack_require__("./src/react-extension/components/Resource/ResourceForm/SelectResourceForm.js"),resourceFormEntity_test_data=__webpack_require__("./src/shared/models/entity/resource/resourceFormEntity.test.data.js"),ResourceEditCreateFormEnumerationTypes=__webpack_require__("./src/shared/models/resource/ResourceEditCreateFormEnumerationTypes.js"),resourceTypeEntity=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.js"),resourceTypeEntity_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.test.data.js"),resourceTypesCollection=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),resourceTypesCollection_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.test.data.js");function defaultProps(data={}){const defaultData={resourceFormSelected:ResourceEditCreateFormEnumerationTypes.D.PASSWORD,resource:(0,resourceFormEntity_test_data.R)({secret:{password:""}}),resourceType:new resourceTypeEntity.Ay((0,resourceTypeEntity_test_data.G9)()),resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),onSelectForm:jest.fn(),onAddSecret:jest.fn()};return Object.assign(defaultData,data)}const SelectResourceForm_test_stories={title:"Components/Resource/SelectResourceForm",component:SelectResourceForm.A,decorators:[(Story,{args})=>react.createElement("div",{style:{margin:"-1rem"}},react.createElement(DialogWrapper.A,{title:"Create a resource",className:"create-resource"},react.createElement(Story,args),react.createElement("div",{className:"grid-and-footer"},react.createElement("div",{className:"grid"},react.createElement("div",{className:"resource-info"},react.createElement("div",{className:"information"})),react.createElement("div",{className:"create-workspace"})),react.createElement("div",{className:"submit-wrapper"}))))]},Password={args:defaultProps()},Totp={args:defaultProps({resourceFormSelected:ResourceEditCreateFormEnumerationTypes.D.TOTP,resourceType:new resourceTypeEntity.Ay((0,resourceTypeEntity_test_data.mF)()),resource:(0,resourceFormEntity_test_data.R)({secret:{totp:{}}})})},Note={args:defaultProps({resourceFormSelected:ResourceEditCreateFormEnumerationTypes.D.NOTE,resource:(0,resourceFormEntity_test_data.R)({secret:{description:""}})})},Description={args:defaultProps({resourceFormSelected:ResourceEditCreateFormEnumerationTypes.D.DESCRIPTION})},__namedExportsOrder=["Password","Totp","Note","Description"];Password.parameters={...Password.parameters,docs:{...Password.parameters?.docs,source:{originalSource:"{\n  args: defaultProps()\n}",...Password.parameters?.docs?.source}}},Totp.parameters={...Totp.parameters,docs:{...Totp.parameters?.docs,source:{originalSource:"{\n  args: defaultProps({\n    resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP,\n    resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()),\n    resource: defaultResourceFormDto({\n      secret: {\n        totp: {}\n      }\n    })\n  })\n}",...Totp.parameters?.docs?.source}}},Note.parameters={...Note.parameters,docs:{...Note.parameters?.docs,source:{originalSource:'{\n  args: defaultProps({\n    resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE,\n    resource: defaultResourceFormDto({\n      secret: {\n        description: ""\n      }\n    })\n  })\n}',...Note.parameters?.docs?.source}}},Description.parameters={...Description.parameters,docs:{...Description.parameters?.docs,source:{originalSource:"{\n  args: defaultProps({\n    resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION\n  })\n}",...Description.parameters?.docs?.source}}}},"./src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,KH:()=>withResourceTypesLocalStorage,dA:()=>ResourceTypesLocalStorageContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),_models_entity_resourceType_resourceTypesCollection__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js");const ResourceTypesLocalStorageContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({get:()=>{},resourceTypes:null,updateLocalStorage:()=>{}});class ResourceTypesLocalStorageContextProvider extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state=this.defaultState,this.runningLocalStorageUpdatePromise=null,this.initEventHandlers()}get defaultState(){return{get:this.get.bind(this),resourceTypes:null,updateLocalStorage:this.updateLocalStorage.bind(this)}}initEventHandlers(){this.handleStorageChange=this.handleStorageChange.bind(this)}componentDidMount(){this.props.context.storage.onChanged.addListener(this.handleStorageChange)}componentWillUnmount(){this.props.context.storage.onChanged.removeListener(this.handleStorageChange)}handleStorageChange(changes){changes.resourceTypes&&this.set(changes.resourceTypes.newValue)}set(resourceTypes){const resourceTypesCollection=new _models_entity_resourceType_resourceTypesCollection__WEBPACK_IMPORTED_MODULE_2__.A(resourceTypes);this.setState({resourceTypes:resourceTypesCollection})}get(){return null===this.state.resourceTypes?(this.loadLocalStorage(),null):this.state.resourceTypes}async loadLocalStorage(){const storageData=await this.props.context.storage.local.get(["resourceTypes"]);storageData.resourceTypes?this.set(storageData.resourceTypes):this.updateLocalStorage()}async updateLocalStorage(){null===this.runningLocalStorageUpdatePromise?(this.runningLocalStorageUpdatePromise=this.props.context.port.request("passbolt.resource-type.get-or-find-all"),await this.runningLocalStorageUpdatePromise,this.runningLocalStorageUpdatePromise=null):await this.runningLocalStorageUpdatePromise}render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResourceTypesLocalStorageContext.Provider,{value:this.state},this.props.children)}}ResourceTypesLocalStorageContextProvider.propTypes={context:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any,children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().any};const __WEBPACK_DEFAULT_EXPORT__=(0,_AppContext_AppContext__WEBPACK_IMPORTED_MODULE_1__.L)(ResourceTypesLocalStorageContextProvider);function withResourceTypesLocalStorage(WrappedComponent){return class withResourceTypesLocalStorage extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResourceTypesLocalStorageContext.Consumer,null,(resourceTypesLocalStorageContext=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent,{resourceTypesLocalStorageContext,resourceTypes:resourceTypesLocalStorageContext.get(),...this.props})))}}}ResourceTypesLocalStorageContextProvider.__docgenInfo={description:"The resource types local storage context provider",methods:[{name:"defaultState",docblock:"Returns the default component state\n@returns {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Returns the default component state"},{name:"initEventHandlers",docblock:"Initialize the component event handlers",modifiers:[],params:[],returns:null,description:"Initialize the component event handlers"},{name:"handleStorageChange",docblock:"Handles update of the resource types in the local storage.",modifiers:[],params:[{name:"changes",optional:!1}],returns:null,description:"Handles update of the resource types in the local storage."},{name:"set",docblock:"Set resourceTypes.\n@param {Array<Object>} resourceTypes The resource types to set.\n@private",modifiers:[],params:[{name:"resourceTypes",description:"The resource types to set.",type:{name:"Array",elements:[{name:"Object"}]},optional:!1}],returns:null,description:"Set resourceTypes."},{name:"get",docblock:"Get the resource types from the local storage and/or init them if not the case already.\n@returns {ResourceTypesCollection|null}",modifiers:[],params:[],returns:{type:{name:"union",elements:[{name:"ResourceTypesCollection"}]}},description:"Get the resource types from the local storage and/or init them if not the case already."},{name:"loadLocalStorage",docblock:"Load the resource types from the local storage if it is available.\nIf the local storage is not yet initialised, then it asks for its initialisation.\n@returns {Promise<void>}\n@private",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Load the resource types from the local storage if it is available.\nIf the local storage is not yet initialised, then it asks for its initialisation."},{name:"updateLocalStorage",docblock:"Forces the update of the resource types in the local storage.\n@return {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Forces the update of the resource types in the local storage."}],displayName:"ResourceTypesLocalStorageContextProvider",props:{context:{description:"",type:{name:"any"},required:!1},children:{description:"",type:{name:"any"},required:!1}}}},"./src/shared/models/entity/secretData/secretDataEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,h:()=>SECRET_DATA_OBJECT_TYPE});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js");const SECRET_DATA_OBJECT_TYPE="PASSBOLT_SECRET_DATA";class SecretDataEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:[],properties:{object_type:{type:"string",enum:[SECRET_DATA_OBJECT_TYPE]}}}}get objectType(){return this._props.object_type}}const __WEBPACK_DEFAULT_EXPORT__=SecretDataEntity},"./node_modules/validator/es/lib/util/assertString.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function assertString(input){if(!("string"==typeof input||input instanceof String)){var invalidType=_typeof(input);throw null===input?invalidType="null":"object"===invalidType&&(invalidType=input.constructor.name),new TypeError("Expected a string but received a ".concat(invalidType))}}__webpack_require__.d(__webpack_exports__,{A:()=>assertString})}}]);