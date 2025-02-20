/*! For license information please see react-extension-components-Administration-DisplayContentTypesMetadataKeyAdministration-DisplayContentTypesMetadataKeyAdministration-test-stories.20baf04a.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[1155],{"./src/react-extension/components/Administration/DisplayContentTypesMetadataKeyAdministration/DisplayContentTypesMetadataKeyAdministration.test.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GeneratedMetadataKey:()=>GeneratedMetadataKey,Initial:()=>Initial,MultipleActiveKeys:()=>MultipleActiveKeys,MultipleKeys:()=>MultipleKeys,SingleActiveMetadataKey:()=>SingleActiveMetadataKey,WithValidationError:()=>WithValidationError,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DisplayContentTypesMetadataKeyAdministration_test_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),memoize_one_esm=__webpack_require__("./node_modules/memoize-one/dist/memoize-one.esm.js"),react_dom=__webpack_require__("./node_modules/react-dom/index.js"),AppContext=__webpack_require__("./src/shared/context/AppContext/AppContext.js"),metadataSettingsServiceWorkerService=__webpack_require__("./src/shared/services/serviceWorker/metadata/metadataSettingsServiceWorkerService.js"),NotifyError=__webpack_require__("./src/react-extension/components/Common/Error/NotifyError/NotifyError.js"),DialogContext=__webpack_require__("./src/react-extension/contexts/DialogContext.js"),dateUtils=__webpack_require__("./src/shared/utils/dateUtils.js"),metadataKeysServiceWorkerService=__webpack_require__("./src/shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService.js"),Fingerprint=__webpack_require__("./src/react-extension/components/Common/Fingerprint/Fingerprint.js"),externalGpgKeyEntity=__webpack_require__("./src/shared/models/entity/gpgkey/externalGpgKeyEntity.js"),entityCollection=__webpack_require__("./src/shared/models/entity/abstract/entityCollection.js"),entitySchema=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),entityCollectionError=__webpack_require__("./src/shared/models/entity/abstract/entityCollectionError.js");class ExternalGpgKeyCollection extends entityCollection.A{constructor(externalGpgKeyCollectionDto,options={}){super(entitySchema.A.validate(ExternalGpgKeyCollection.ENTITY_NAME,externalGpgKeyCollectionDto,ExternalGpgKeyCollection.getSchema()),options);this._props.map((resource=>resource.id)).sort().sort(((a,b)=>{if(a===b)throw new entityCollectionError.A(0,ExternalGpgKeyCollection.RULE_UNIQUE_ID,`Gpgkey fingerprint ${a} already exists.`)})),this._props.forEach((resource=>{this._items.push(new externalGpgKeyEntity.A(resource,{clone:!1}))})),this._props=null}static getSchema(){return{type:"array",items:externalGpgKeyEntity.A.getSchema()}}static get ENTITY_NAME(){return"externalGpgKey"}static get RULE_UNIQUE_ID(){return"fingerprint"}}const externalGpgKeyCollection=ExternalGpgKeyCollection;const gpgServiceWorkerService=class GpgServiceWorkerService{constructor(port){this.port=port}async keyInfo(armoredKey){const keyInfoDto=await this.port.request("passbolt.keyring.get-key-info",armoredKey);return new externalGpgKeyEntity.A(keyInfoDto)}async keysInfo(armoredKeys=[]){const keysInfoDto=[];for(const armoredKey of armoredKeys){const keyInfo=await this.keyInfo(armoredKey);keysInfoDto.push(keyInfo)}return new externalGpgKeyCollection(keysInfoDto)}};var metadataKeysCollection=__webpack_require__("./src/shared/models/entity/metadata/metadataKeysCollection.js"),metadataKeysSettingsEntity=__webpack_require__("./src/shared/models/entity/metadata/metadataKeysSettingsEntity.js"),externalGpgKeyPairEntity=__webpack_require__("./src/shared/models/entity/gpgkey/external/externalGpgKeyPairEntity.js");class MetadataKeysSettingsFormEntity extends metadataKeysSettingsEntity.A{constructor(dto,options={}){super(dto,options),this._props.generated_metadata_key&&(this._generated_metadata_key=new externalGpgKeyPairEntity.A(this._props.generated_metadata_key,{...options,clone:!1}),delete this._props.generated_metadata_key)}static getSchema(){return{type:"object",required:["allow_usage_of_personal_keys","zero_knowledge_key_share"],properties:{...metadataKeysSettingsEntity.A.getSchema().properties,generated_metadata_key:externalGpgKeyPairEntity.A.getSchema()}}}toDto(){return{...this._props,generated_metadata_key:this.generatedMetadataKey?.toDto({public_key:!0,private_key:!0})||null}}get generatedMetadataKey(){return this._generated_metadata_key||null}set generatedMetadataKey(generatedMetadataKey){if(null!==generatedMetadataKey&&!(generatedMetadataKey instanceof externalGpgKeyPairEntity.A))throw new TypeError("The parameter `generatedMetadataKey` should be of type ExternalGpgKeyPairEntity.");this._generated_metadata_key=generatedMetadataKey}}const metadataKeysSettingsFormEntity=MetadataKeysSettingsFormEntity;var metadataKeyEntity=__webpack_require__("./src/shared/models/entity/metadata/metadataKeyEntity.js"),Icon=__webpack_require__("./src/shared/components/Icons/Icon.js");class DisplayContentTypesMetadataKeyAdministration extends react.Component{render(){return react.createElement("div",{className:"col2_3 actions-wrapper"},react.createElement("div",{className:"actions"},react.createElement("ul",null,react.createElement("li",null,react.createElement("button",{type:"button",disabled:this.props.isProcessing,onClick:this.props.onSaveRequested},react.createElement(Icon.A,{name:"save"}),react.createElement("span",null,react.createElement(es.x6,null,"Save settings")))))))}}DisplayContentTypesMetadataKeyAdministration.propTypes={isProcessing:prop_types_default().bool,onSaveRequested:prop_types_default().func,t:prop_types_default().func};const DisplayContentTypesMetadataKeyAdministrationActions=(0,es.CI)("common")(DisplayContentTypesMetadataKeyAdministration);DisplayContentTypesMetadataKeyAdministration.__docgenInfo={description:"",methods:[],displayName:"DisplayContentTypesMetadataKeyAdministration",props:{isProcessing:{description:"",type:{name:"bool"},required:!1},onSaveRequested:{description:"",type:{name:"func"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var entityValidationError=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js"),ActionFeedbackContext=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.js");class DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration extends react.Component{originalSettings=null;formSettings=null;constructor(props){super(props),this.metadataSettingsServiceWorkerService=props.metadataSettingsServiceWorkerService??new metadataSettingsServiceWorkerService.Ay(props.context.port),this.metadataKeysServiceWorkerService=props.metadataKeysServiceWorkerService??new metadataKeysServiceWorkerService.Ay(props.context.port),this.gpgServiceWorkerService=props.gpgServiceWorkerService??new gpgServiceWorkerService(props.context.port),this.state=this.defaultState,this.bindCallbacks()}get defaultState(){return{isProcessing:!0,hasAlreadyBeenValidated:!1,settings:{allow_usage_of_personal_keys:!0,zero_knowledge_key_share:!1,generated_metadata_key:null},activeMetadataKeys:null,expiredMetadataKeys:null}}bindCallbacks(){this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.generateMetadataKey=this.generateMetadataKey.bind(this),this.save=this.save.bind(this)}async componentDidMount(){await this.loadKeysSettings(),await this.loadKeys(),this.setState({isProcessing:!1})}async loadKeysSettings(){try{const settings=await this.metadataSettingsServiceWorkerService.findKeysSettings();this.originalSettings=new metadataKeysSettingsFormEntity(settings.toDto(),{validate:!1}),this.formSettings=new metadataKeysSettingsFormEntity(settings.toDto(),{validate:!1}),this.setState({settings:this.formSettings.toDto()})}catch(error){await this.handleUnexpectedError(error)}}handleUnexpectedError(error){if(console.error(error),"UserAbortsOperationError"!==error.name)return this.props.dialogContext.open(NotifyError.A,{error})}async loadKeys(){try{const metadataKeys=await this.metadataKeysServiceWorkerService.findAll(),activeMetadataKeys=new metadataKeysCollection.A(metadataKeys);activeMetadataKeys.filterByCallback((metadataKey=>!metadataKey.expired));const expiredMetadataKeys=new metadataKeysCollection.A(metadataKeys);expiredMetadataKeys.filterByCallback((metadataKey=>metadataKey.expired));const armoredKeys=metadataKeys.items.map((metadataKey=>metadataKey.armoredKey)),metadataKeysInfo=await this.gpgServiceWorkerService.keysInfo(armoredKeys);this.setState({activeMetadataKeys,expiredMetadataKeys,metadataKeysInfo})}catch(error){await this.handleUnexpectedError(error)}}hasSettingsChanges=(0,memoize_one_esm.A)(((originalSettings,formSettings,formSettingsDto)=>originalSettings?.hasDiffProps(formSettings)||originalSettings?.generatedMetadataKey!==formSettings?.generatedMetadataKey));handleInputChange(event){if(this.hasAllInputDisabled())return;const{type,checked,value,name}=event.target;let parsedValue=value;"checkbox"===type&&(parsedValue=checked),"allow_usage_of_personal_keys"!==name&&"zero_knowledge_key_share"!==name||(parsedValue="true"===value),this.setFormPropertyValue(name,parsedValue)}setFormPropertyValue(name,parsedValue){this.formSettings.set(name,parsedValue,{validate:!1}),this.setState({settings:this.formSettings.toDto()})}hasAllInputDisabled(){return this.state.isProcessing}async generateMetadataKey(){const metadataKeysInfo=this.state.metadataKeysInfo,activeMetadataKeys=this.state.activeMetadataKeys;this.setState({isProcessing:!0});try{const metadataKeyPair=await this.metadataKeysServiceWorkerService.generateKeyPair(),metadataKeyInfo=await this.gpgServiceWorkerService.keyInfo(metadataKeyPair.publicKey.armoredKey);metadataKeysInfo.push(metadataKeyInfo);const metadataKey=new metadataKeyEntity.A({armored_key:metadataKeyPair.publicKey.armoredKey,fingerprint:metadataKeyInfo.fingerprint});activeMetadataKeys.push(metadataKey),this.formSettings.generatedMetadataKey=metadataKeyPair,this.setState({activeMetadataKeys,metadataKeysInfo,settings:this.formSettings.toDto()})}catch(error){await this.handleUnexpectedError(error)}this.setState({isProcessing:!1})}handleFormSubmit(event){event.preventDefault(),this.save()}async save(){if(this.state.isProcessing)return;this.setState({isProcessing:!0});const validationError=this.validateForm(this.state.settings);if(validationError?.hasErrors())this.setState({isProcessing:!1,hasAlreadyBeenValidated:!0});else{try{await this.saveMetadataKeysSettings(),await this.createMetadataKey(),await this.props.actionFeedbackContext.displaySuccess(this.props.t("The metadata key settings were updated."))}catch(error){await this.handleUnexpectedError(error)}this.setState({isProcessing:!1,settings:this.formSettings.toDto()})}}validateForm=(0,memoize_one_esm.A)((formSettingsDto=>{if(!this.formSettings)return null;let validationErrors=this.formSettings.validate();return this.state.activeMetadataKeys.length||(validationErrors=validationErrors||new entityValidationError.A,validationErrors.addError("generated_metadata_key","required",this.props.t("A shared metadata key is required."))),validationErrors}));async saveMetadataKeysSettings(){const metadataKeysSettings=new metadataKeysSettingsEntity.A(this.formSettings.toDto()),savedMetadataKeysSettings=await this.metadataSettingsServiceWorkerService.saveKeysSettings(metadataKeysSettings);this.originalSettings=new metadataKeysSettingsFormEntity({...this.originalSettings.toDto(),...savedMetadataKeysSettings.toDto()}),this.formSettings=new metadataKeysSettingsFormEntity({...this.formSettings.toDto(),...savedMetadataKeysSettings.toDto()})}async createMetadataKey(){if(!this.formSettings.generatedMetadataKey)return;const metadataKey=await this.metadataKeysServiceWorkerService.createKey(this.formSettings.generatedMetadataKey);this.state.activeMetadataKeys.pushOrReplace(metadataKey,{},{replacePropertyName:"fingerprint"}),this.formSettings.generatedMetadataKey=null}render(){const errors=this.state.hasAlreadyBeenValidated?this.validateForm(this.state.settings):null,hasSettingsChanges=this.hasSettingsChanges(this.originalSettings,this.formSettings,this.state.settings);return react.createElement("div",{className:"row"},(this.props.createPortal||react_dom.createPortal)(react.createElement(DisplayContentTypesMetadataKeyAdministrationActions,{onSaveRequested:this.save,isProcessing:this.state.isProcessing}),document.getElementById("administration-actions-content-action")),react.createElement("div",{id:"content-types-metadata-key-settings",className:"col8 main-column"},react.createElement("form",{onSubmit:this.handleFormSubmit,"data-testid":"submit-form"},react.createElement("h3",null,react.createElement("label",null,react.createElement(es.x6,null,"Metadata key"))),hasSettingsChanges&&react.createElement("div",{className:"warning message form-banner"},react.createElement("p",null,react.createElement(es.x6,null,"Don't forget to save your settings to apply your modification."))),errors?.hasError("generated_metadata_key","required")&&react.createElement("div",{className:"warning message form-banner"},react.createElement("p",null,react.createElement(es.x6,null,"A shared metadata key is required to save the metadata keys settings."))),react.createElement("p",{className:"description"},react.createElement(es.x6,null,"This section controls the layer of encryption that is used to protect metadata such as the name of a resource, URIs, etc.")),react.createElement("h4",{className:"no-border"},react.createElement(es.x6,null,"Metadata key policy")),react.createElement("p",{className:"description"},react.createElement(es.x6,null,"It is possible for users to use their personal keys to encrypt resources metadata for more security. However you can elect to enforce the use of the shared metadata keys for all resources metadata for auditing purposes. Secrets such as passwords will always be encrypted using the user personal keys.")),react.createElement("div",{className:"radiolist-alt"},react.createElement("div",{className:"input radio "+(!0===this.state.settings.allow_usage_of_personal_keys?"checked":"")},react.createElement("input",{type:"radio",value:"true",onChange:this.handleInputChange,name:"allow_usage_of_personal_keys",checked:!0===this.state.settings.allow_usage_of_personal_keys,id:"allowUsageOfPersonalKeysInput",disabled:this.hasAllInputDisabled()}),react.createElement("label",{htmlFor:"allowUsageOfPersonalKeysInput"},react.createElement("span",{className:"name"},react.createElement(es.x6,null,"Allow the use of personal keys. (Recommended)")),react.createElement("span",{className:"info"},react.createElement(es.x6,null,"Users can use shared and personal keys. By default personal resources that are not shared will be encrypted with the users personal keys."),react.createElement("br",null))))),react.createElement("div",{className:"radiolist-alt"},react.createElement("div",{className:"input radio "+(!1===this.state.settings.allow_usage_of_personal_keys?"checked":"")},react.createElement("input",{type:"radio",value:"false",onChange:this.handleInputChange,name:"allow_usage_of_personal_keys",checked:!1===this.state.settings.allow_usage_of_personal_keys,id:"disallowUsageOfPersonalKeysInput",disabled:this.hasAllInputDisabled()}),react.createElement("label",{htmlFor:"disallowUsageOfPersonalKeysInput"},react.createElement("span",{className:"name"},react.createElement(es.x6,null,"Enforce the use of shared metadata keys.")),react.createElement("span",{className:"info"},react.createElement(es.x6,null,"By default, metadata wil be encrypted with the shared keys. It is not possible to use personal keys to encrypt metadata."),react.createElement("br",null))))),react.createElement("h4",{className:"no-border"},react.createElement(es.x6,null,"Zero knowledge (Coming soon)")),react.createElement("p",{className:"description"},react.createElement(es.x6,null,"This section defines how the shared metadata key is shared with users.")),react.createElement("div",{className:"radiolist-alt"},react.createElement("div",{className:"input radio "+(!1===this.state.settings.zero_knowledge_key_share?"checked":"")},react.createElement("input",{type:"radio",value:"true",name:"zero_knowledge_key_share",checked:!1===this.state.settings.zero_knowledge_key_share,id:"disableZeroKnowledgeKeyShareInput",disabled:!0}),react.createElement("label",{htmlFor:"disableZeroKnowledgeKeyShareInput"},react.createElement("span",{className:"name"},react.createElement(es.x6,null,"User-friendly mode (Better on-boarding)")),react.createElement("span",{className:"info"},react.createElement(es.x6,null,"The shared metadata key is accessible to the server and can be shared by the server when a user completes the setup. In practice, an attacker with full server access can see the shared metadata."),react.createElement("br",null))))),react.createElement("div",{className:"radiolist-alt"},react.createElement("div",{className:"input radio "+(!0===this.state.settings.zero_knowledge_key_share?"checked":"")},react.createElement("input",{type:"radio",value:"true",name:"zero_knowledge_key_share",checked:!0===this.state.settings.zero_knowledge_key_share,id:"enableZeroKnowledgeKeyShareInput",disabled:!0}),react.createElement("label",{htmlFor:"enableZeroKnowledgeKeyShareInput"},react.createElement("span",{className:"name"},react.createElement(es.x6,null,"Zero-knowledge mode (More secure)")),react.createElement("span",{className:"info"},react.createElement(es.x6,null,"The shared metadata key is not available to the server and must be shared with users by the admins. New users are not allowed to create or access shared content until they are provided the metadata key. It is recommended to rotate the key if you switch to that mode."),react.createElement("br",null))))),react.createElement("h4",{className:"no-border"},react.createElement(es.x6,null,"Shared metadata keys")),react.createElement("div",{className:`metadata-key-info ${errors?.hasError("generated_metadata_key","required")&&"error"}`},this.state.activeMetadataKeys?.length>0&&react.createElement("div",{id:"metadata-active-keys"},this.state.activeMetadataKeys?.items.map((metadataKey=>{const metadataKeyInfo=this.state.metadataKeysInfo?.getFirst("fingerprint",metadataKey.fingerprint);return react.createElement("table",{key:metadataKey.fingerprint,className:"table-info"},react.createElement("tbody",null,react.createElement("tr",{className:"fingerprint"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Fingerprint")),react.createElement("td",{className:"value"},react.createElement(Fingerprint.A,{fingerprint:metadataKey.fingerprint}))),react.createElement("tr",{className:"algorithm"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Algorithm")),react.createElement("td",{className:"value"},metadataKeyInfo?.algorithm," ",metadataKeyInfo?.curve)),react.createElement("tr",{className:"key-length"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Key length")),react.createElement("td",{className:"value"},metadataKeyInfo?.length)),react.createElement("tr",{className:"created"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Created")),metadataKey.created&&react.createElement("td",{className:"value"},react.createElement("span",{title:metadataKey.created},(0,dateUtils.kD)(metadataKey.created,this.props.t,this.props.context.locale))),!metadataKey.created&&react.createElement("td",{className:"empty-value"},react.createElement(es.x6,null,"Pending")))))}))),!this.state.activeMetadataKeys?.length&&react.createElement("div",{id:"no-metadata-active-keys"},react.createElement("table",{className:"table-info"},react.createElement("tbody",null,react.createElement("tr",null,react.createElement("td",{className:"empty-value"},react.createElement(es.x6,null,"You need to generate a new shared key to enable encrypted metadata.")),react.createElement("td",{className:"table-button"},react.createElement("button",{className:"button primary medium",type:"button",disabled:this.hasAllInputDisabled(),onClick:this.generateMetadataKey,"data-testid":"generate-key-buton"},react.createElement(es.x6,null,"Generate key")))),errors?.hasError("generated_metadata_key","required")&&react.createElement("tr",{className:"error-message"},react.createElement(es.x6,null,"A shared metadata key is required."))))),this.state.expiredMetadataKeys?.length>0&&react.createElement(react.Fragment,null,react.createElement("h4",{className:"no-border"},react.createElement(es.x6,null,"Previous keys")),react.createElement("div",{id:"metadata-expired-keys"},this.state.expiredMetadataKeys?.items.map((metadataKey=>{const metadataKeyInfo=this.state.metadataKeysInfo.getFirst("fingerprint",metadataKey.fingerprint);return react.createElement("table",{key:metadataKey.fingerprint,className:"table-info"},react.createElement("tbody",null,react.createElement("tr",{className:"fingerprint"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Fingerprint")),react.createElement("td",{className:"value"},react.createElement(Fingerprint.A,{fingerprint:metadataKey.fingerprint}))),react.createElement("tr",{className:"algorithm"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Algorithm")),react.createElement("td",{className:"value"},metadataKeyInfo?.algorithm," ",metadataKeyInfo?.curve)),react.createElement("tr",{className:"key-length"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Key length")),react.createElement("td",{className:"value"},metadataKeyInfo?.length)),react.createElement("tr",{className:"created"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Created")),react.createElement("td",{className:"value"},react.createElement("span",{title:metadataKey.created},(0,dateUtils.kD)(metadataKey.created,this.props.t,this.props.context.locale)))),react.createElement("tr",{className:"expired"},react.createElement("td",{className:"label"},react.createElement(es.x6,null,"Expired")),react.createElement("td",{className:"value"},react.createElement("span",{title:metadataKey.expired},(0,dateUtils.kD)(metadataKey.expired,this.props.t,this.props.context.locale))))))}))))))))}}DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration.propTypes={context:prop_types_default().object,actionFeedbackContext:prop_types_default().object,dialogContext:prop_types_default().object,createPortal:prop_types_default().func,metadataSettingsServiceWorkerService:prop_types_default().object,metadataKeysServiceWorkerService:prop_types_default().object,gpgServiceWorkerService:prop_types_default().object,t:prop_types_default().func};const Administration_DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration=(0,AppContext.L)((0,DialogContext.z9)((0,ActionFeedbackContext.ot)((0,es.CI)("common")(DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration))));DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration.__docgenInfo={description:"",methods:[{name:"defaultState",docblock:"Get default state\n@returns {Object}",modifiers:["get"],params:[],returns:{type:{name:"Object"}},description:"Get default state"},{name:"bindCallbacks",docblock:"Bind callbacks methods",modifiers:[],params:[],returns:null,description:"Bind callbacks methods"},{name:"loadKeysSettings",docblock:"Load the metadata key settings.\nIf the settings cannot be loaded, display the error dialog.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Load the metadata key settings.\nIf the settings cannot be loaded, display the error dialog."},{name:"handleUnexpectedError",docblock:"Handle unexpected error\n@param {Error} error The error\n@returns {Promise<string>} Return the dialog key identifier.",modifiers:[],params:[{name:"error",description:"The error",type:{name:"Error"},optional:!1}],returns:{description:"Return the dialog key identifier.",type:{name:"Promise",elements:[{name:"string"}]}},description:"Handle unexpected error"},{name:"loadKeys",docblock:"Load the metadata keys.\nIf the metadata keys cannot be loaded, display the error dialog.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Load the metadata keys.\nIf the metadata keys cannot be loaded, display the error dialog."},{name:"handleInputChange",docblock:"Handle form input changes.\n@params {ReactEvent} The react event\n@returns {void}",modifiers:[],params:[{name:"event",optional:!1}],returns:{type:{name:"void"}},description:"Handle form input changes."},{name:"setFormPropertyValue",docblock:"Set a form property value. Trigger the validation if the form has already been submitted once.\n@param name\n@param parsedValue",modifiers:[],params:[{name:"name",optional:!1},{name:"parsedValue",optional:!1}],returns:null,description:"Set a form property value. Trigger the validation if the form has already been submitted once."},{name:"hasAllInputDisabled",docblock:"Should input be disabled? True if state is loading or processing\n@returns {boolean}",modifiers:[],params:[],returns:{type:{name:"boolean"}},description:"Should input be disabled? True if state is loading or processing"},{name:"generateMetadataKey",docblock:"Generate a new metadata key\n@return {Promise}",modifiers:["async"],params:[],returns:{type:{name:"Promise"}},description:"Generate a new metadata key"},{name:"handleFormSubmit",docblock:"Handle form submission that can be trigger when hitting `enter`\n@param {Event} event The html event triggering the form submit.",modifiers:[],params:[{name:"event",description:"The html event triggering the form submit.",type:{name:"Event"},optional:!1}],returns:null,description:"Handle form submission that can be trigger when hitting `enter`"},{name:"save",docblock:"Save the settings.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Save the settings."},{name:"saveMetadataKeysSettings",docblock:"Save the metadata keys settings.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Save the metadata keys settings."},{name:"createMetadataKey",docblock:"Create the metadata key.\n@returns {Promise<void>}",modifiers:["async"],params:[],returns:{type:{name:"Promise",elements:[{name:"void"}]}},description:"Create the metadata key."}],displayName:"DisplayContentTypesMetadataKeyAdministration",props:{context:{description:"",type:{name:"object"},required:!1},actionFeedbackContext:{description:"",type:{name:"object"},required:!1},dialogContext:{description:"",type:{name:"object"},required:!1},createPortal:{description:"",type:{name:"func"},required:!1},metadataSettingsServiceWorkerService:{description:"",type:{name:"object"},required:!1},metadataKeysServiceWorkerService:{description:"",type:{name:"object"},required:!1},gpgServiceWorkerService:{description:"",type:{name:"object"},required:!1},t:{description:"",type:{name:"func"},required:!1}}};var ExtAppContext_test_data=__webpack_require__("./src/react-extension/contexts/ExtAppContext.test.data.js"),DialogContext_test_data=__webpack_require__("./src/react-extension/contexts/DialogContext.test.data.js"),resourceTypesCollection=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.js"),resourceTypesCollection_test_data=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypesCollection.test.data.js");var metadataKeyEntity_test_data=__webpack_require__("./src/shared/models/entity/metadata/metadataKeyEntity.test.data.js"),keys=__webpack_require__("./test/fixture/pgpKeys/keys.js");const ed25519ExternalPublicGpgKeyEntityDto=(data={})=>{const defaultData={armored_key:keys.u.eddsa_ed25519.public,key_id:keys.u.eddsa_ed25519.key_id,user_ids:keys.u.eddsa_ed25519.user_ids,fingerprint:keys.u.eddsa_ed25519.fingerprint,expires:"Infinity",created:keys.u.eddsa_ed25519.created,algorithm:keys.u.eddsa_ed25519.algorithm?.toLowerCase(),length:keys.u.eddsa_ed25519.length,curve:keys.u.eddsa_ed25519.curve,private:!1,revoked:keys.u.eddsa_ed25519.revoked};return Object.assign(defaultData,data)},ed25519ExternalPrivateGpgKeyEntityDto=(data={})=>{const defaultData={armored_key:keys.u.eddsa_ed25519.private,key_id:keys.u.eddsa_ed25519.key_id,user_ids:keys.u.eddsa_ed25519.user_ids,fingerprint:keys.u.eddsa_ed25519.fingerprint,expires:"Infinity",created:keys.u.eddsa_ed25519.created,algorithm:keys.u.eddsa_ed25519.algorithm?.toLowerCase(),length:keys.u.eddsa_ed25519.length,curve:keys.u.eddsa_ed25519.curve,private:!0,revoked:keys.u.eddsa_ed25519.revoked};return Object.assign(defaultData,data)};var ActionFeedbackContext_test_data=__webpack_require__("./src/react-extension/contexts/ActionFeedbackContext.test.data.js");const metadataKeysInfoDto=[((data={})=>{const defaultData={armored_key:keys.u.ada.private,key_id:keys.u.ada.key_id,user_ids:keys.u.ada.user_ids,fingerprint:keys.u.ada.fingerprint,expires:keys.u.ada.expires,created:keys.u.ada.created,algorithm:keys.u.ada.algorithm.toLowerCase(),length:keys.u.ada.length,curve:keys.u.ada.curve,private:!0,revoked:keys.u.ada.revoked};return Object.assign(defaultData,data)})(),((data={})=>{const defaultData={armored_key:keys.u.betty.public,key_id:keys.u.betty.key_id,user_ids:keys.u.betty.user_ids,fingerprint:keys.u.betty.fingerprint,expires:keys.u.betty.expires,created:keys.u.betty.created,algorithm:keys.u.betty.algorithm?.toLowerCase(),length:keys.u.betty.length,curve:keys.u.betty.curve,private:!1,revoked:keys.u.betty.revoked};return Object.assign(defaultData,data)})(),((data={})=>{const defaultData={armored_key:keys.u.carol.public,key_id:keys.u.carol.key_id,user_ids:keys.u.carol.user_ids,fingerprint:keys.u.carol.fingerprint,expires:"Infinity",created:keys.u.carol.created,algorithm:keys.u.carol.algorithm?.toLowerCase(),length:keys.u.carol.length,curve:keys.u.carol.curve,private:!1,revoked:keys.u.carol.revoked};return Object.assign(defaultData,data)})(),ed25519ExternalPublicGpgKeyEntityDto()];function defaultProps(props={}){const metadataKeysInfo=new externalGpgKeyCollection(metadataKeysInfoDto);return{context:(0,ExtAppContext_test_data.dO)(),dialogContext:(0,DialogContext_test_data.L)(),actionFeedbackContext:(0,ActionFeedbackContext_test_data.M)(),metadataSettingsServiceWorkerService:{findKeysSettings:()=>new metadataKeysSettingsEntity.A(((data={})=>Object.assign({allow_usage_of_personal_keys:!0,zero_knowledge_key_share:!1},data))()),saveKeysSettings:settings=>settings},metadataKeysServiceWorkerService:{findAll:()=>new metadataKeysCollection.A([]),generateKeyPair:()=>new externalGpgKeyPairEntity.A({public_key:ed25519ExternalPublicGpgKeyEntityDto(),private_key:ed25519ExternalPrivateGpgKeyEntityDto()}),createKey:()=>new metadataKeyEntity.A((0,metadataKeyEntity_test_data.L)({fingerprint:keys.u.eddsa_ed25519.fingerprint,armored_key:keys.u.eddsa_ed25519.public}))},gpgServiceWorkerService:{keyInfo:armoredKey=>metadataKeysInfo.getFirst("armored_key",armoredKey),keysInfo:()=>metadataKeysInfo},createPortal:jest.fn(),resourceTypes:new resourceTypesCollection.A((0,resourceTypesCollection_test_data.V1)()),t:text=>text,...props}}var dom_esm=__webpack_require__("./node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js");const DisplayContentTypesMetadataKeyAdministration_test_stories={title:"Components/Administration/DisplayContentTypesMetadataKeyAdministration",component:Administration_DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration},Template=args=>react.createElement("div",{className:"panel middle"},react.createElement("div",{className:"grid grid-responsive-12"},react.createElement(Administration_DisplayContentTypesMetadataKeyAdministration_DisplayContentTypesMetadataKeyAdministration,args)));Template.propTypes={context:prop_types_default().object};const Initial=Template.bind({});Initial.args=defaultProps();const WithValidationError=Template.bind({});WithValidationError.args=defaultProps(),WithValidationError.play=async({canvasElement})=>{(0,dom_esm.ux)(canvasElement).getByTestId("submit-form").requestSubmit()};const GeneratedMetadataKey=Template.bind({});GeneratedMetadataKey.args=defaultProps(),GeneratedMetadataKey.play=async({canvasElement})=>{(0,dom_esm.ux)(canvasElement).getByTestId("generate-key-buton").click()};const SingleActiveMetadataKey=Template.bind({});SingleActiveMetadataKey.args=function defaultSettingsAndSingleActiveKeyProps(props={}){const metadataKeysDto=[(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.ada.public,fingerprint:keys.u.ada.fingerprint})];return defaultProps({metadataKeysServiceWorkerService:{findAll:()=>new metadataKeysCollection.A(metadataKeysDto)},...props})}();const MultipleActiveKeys=Template.bind({});MultipleActiveKeys.args=function defaultSettingsAndMultipleActiveKeysProps(props={}){const metadataKeysDto=[(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.ada.public,fingerprint:keys.u.ada.fingerprint}),(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.betty.public,fingerprint:keys.u.betty.fingerprint})];return defaultProps({metadataKeysServiceWorkerService:{findAll:()=>new metadataKeysCollection.A(metadataKeysDto)},...props})}();const MultipleKeys=Template.bind({});MultipleKeys.args=function defaultSettingsAndMultipleKeysProps(props={}){const metadataKeysDto=[(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.ada.public,fingerprint:keys.u.ada.fingerprint}),(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.betty.public,fingerprint:keys.u.betty.fingerprint}),(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.carol.public,fingerprint:keys.u.carol.fingerprint,expired:"2022-03-04T13:59:11+00:00"}),(0,metadataKeyEntity_test_data.L)({armored_key:keys.u.eddsa_ed25519.public,fingerprint:keys.u.eddsa_ed25519.fingerprint,expired:"2023-10-04T15:11:45+00:00"})];return defaultProps({metadataKeysServiceWorkerService:{findAll:()=>new metadataKeysCollection.A(metadataKeysDto)},...props})}();const __namedExportsOrder=["Initial","WithValidationError","GeneratedMetadataKey","SingleActiveMetadataKey","MultipleActiveKeys","MultipleKeys"];Initial.parameters={...Initial.parameters,docs:{...Initial.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...Initial.parameters?.docs?.source}}},WithValidationError.parameters={...WithValidationError.parameters,docs:{...WithValidationError.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...WithValidationError.parameters?.docs?.source}}},GeneratedMetadataKey.parameters={...GeneratedMetadataKey.parameters,docs:{...GeneratedMetadataKey.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...GeneratedMetadataKey.parameters?.docs?.source}}},SingleActiveMetadataKey.parameters={...SingleActiveMetadataKey.parameters,docs:{...SingleActiveMetadataKey.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...SingleActiveMetadataKey.parameters?.docs?.source}}},MultipleActiveKeys.parameters={...MultipleActiveKeys.parameters,docs:{...MultipleActiveKeys.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...MultipleActiveKeys.parameters?.docs?.source}}},MultipleKeys.parameters={...MultipleKeys.parameters,docs:{...MultipleKeys.parameters?.docs,source:{originalSource:'args => <div className="panel middle">\n    <div className="grid grid-responsive-12">\n      <DisplayContentTypesMetadataKeyAdministration {...args} />\n    </div>\n  </div>',...MultipleKeys.parameters?.docs?.source}}}},"./src/react-extension/components/Common/Fingerprint/Fingerprint.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);class Fingerprint extends react__WEBPACK_IMPORTED_MODULE_0__.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"fingerprint"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"fingerprint-line"},this.props.fingerprint?.substring(0,20)?.replace(/.{4}/g,"$& ")),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"fingerprint-line"},this.props.fingerprint?.substring(20)?.replace(/.{4}/g,"$& ")))}}Fingerprint.propTypes={fingerprint:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired};const __WEBPACK_DEFAULT_EXPORT__=Fingerprint;Fingerprint.__docgenInfo={description:"",methods:[],displayName:"Fingerprint",props:{fingerprint:{description:"",type:{name:"string"},required:!0}}}},"./src/shared/utils/dateUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B7:()=>formatDateForApi,Br:()=>formatExpirationDateTimeAgo,kD:()=>formatDateTimeAgo});var luxon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/luxon/src/luxon.js");const formatDateTimeAgo=(date,translate,locale)=>{if(null===date)return"n/a";if("Infinity"===date)return translate("Never");const dateTime=luxon__WEBPACK_IMPORTED_MODULE_0__.c9.fromISO(date),duration=dateTime.diffNow().toMillis();return duration>-1e3&&duration<0?translate("Just now"):dateTime.toRelative({locale})},formatExpirationDateTimeAgo=(date,translate,locale)=>date?formatDateTimeAgo(date,translate,locale):translate("Never"),formatDateForApi=date=>date?.toUTC().toISO()||null},"?4f7e":()=>{}}]);