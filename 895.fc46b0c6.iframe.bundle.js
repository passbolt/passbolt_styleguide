/*! For license information please see 895.fc46b0c6.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[895],{"./src/shared/constants/inputs.const.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Bh:()=>RESOURCE_PASSWORD_MAX_LENGTH,Dt:()=>RESOURCE_NAME_MAX_LENGTH,E1:()=>RESOURCE_USERNAME_MAX_LENGTH,G3:()=>RESOURCE_DESCRIPTION_MAX_LENGTH,UZ:()=>RESOURCE_TAG_MAX_LENGTH,VB:()=>RESOURCE_TOTP_KEY_MAX_LENGTH,Z_:()=>USER_INPUT_MAX_LENGTH,kW:()=>RESOURCE_URI_MAX_LENGTH,nX:()=>RESOURCE_GROUP_NAME_MAX_LENGTH,yN:()=>RESOURCE_FOLDER_NAME_MAX_LENGTH});const USER_INPUT_MAX_LENGTH=128,RESOURCE_GROUP_NAME_MAX_LENGTH=50,RESOURCE_NAME_MAX_LENGTH=255,RESOURCE_USERNAME_MAX_LENGTH=255,RESOURCE_FOLDER_NAME_MAX_LENGTH=256,RESOURCE_TAG_MAX_LENGTH=128,RESOURCE_PASSWORD_MAX_LENGTH=4096,RESOURCE_DESCRIPTION_MAX_LENGTH=1e4,RESOURCE_URI_MAX_LENGTH=1024,RESOURCE_TOTP_KEY_MAX_LENGTH=1024},"./src/shared/models/resource/ResourcePasswordDescriptionTotpViewModel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/constants/inputs.const.js"),_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/resource/ResourceViewModel.js"),_entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class ResourcePasswordDescriptionTotpViewModel extends _ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A{constructor(resourceViewModel={}){super(resourceViewModel),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.totp=resourceViewModel.totp||null,this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourcePasswordDescriptionTotpViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Dt},uri:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.kW,nullable:!0},username:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.E1,nullable:!0},password:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Bh},description:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},totp:{type:"object"},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return _entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__.fl}updateSecret(secretDto){const resourceViewModel=this.cloneWithMutation("password",secretDto.password);return resourceViewModel.description=secretDto.description,resourceViewModel.totp=secretDto.totp,resourceViewModel}canToggleDescription(){return!1}isDescriptionUnencrypted(){return!1}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return{password:this.password,description:this.description,totp:this.totp,resource_type_id:this.resource_type_id}}areSecretsDifferent(originalSecretDto){const hasSameSecretStructure=3===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password")&&Object.hasOwn(originalSecretDto,"description")&&Object.hasOwn(originalSecretDto,"totp"),isTotpDifferent=Object.keys(this.totp).some((key=>this.totp[key]!==originalSecretDto.totp?.[key]));return!hasSameSecretStructure||this.password!==originalSecretDto.password||this.description!==originalSecretDto.description||isTotpDifferent}}const __WEBPACK_DEFAULT_EXPORT__=ResourcePasswordDescriptionTotpViewModel},"./src/shared/models/resource/ResourcePasswordDescriptionViewModel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/constants/inputs.const.js"),_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/resource/ResourceViewModel.js"),_entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class ResourcePasswordDescriptionViewModel extends _ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A{constructor(resourceViewModel={}){super(resourceViewModel),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourcePasswordDescriptionViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Dt},uri:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.kW,nullable:!0},username:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.E1,nullable:!0},password:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Bh},description:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return _entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__.Bo}updateSecret(secretDto){const resourceViewModel=this.cloneWithMutation("password",secretDto.password);return resourceViewModel.description=secretDto.description,resourceViewModel}canToggleDescription(){return!0}isDescriptionUnencrypted(){return!1}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return{password:this.password,description:this.description,resource_type_id:this.resource_type_id}}areSecretsDifferent(originalSecretDto){return!(2===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password")&&Object.hasOwn(originalSecretDto,"description"))||this.password!==originalSecretDto.password||this.description!==originalSecretDto.description}}const __WEBPACK_DEFAULT_EXPORT__=ResourcePasswordDescriptionViewModel},"./src/shared/models/resource/ResourcePasswordStringViewModel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/constants/inputs.const.js"),_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/resource/ResourceViewModel.js"),_entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");class ResourcePasswordStringViewModel extends _ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A{constructor(resourceViewModel={}){super({}),this.username=resourceViewModel.username||"",this.uri=resourceViewModel.uri||"",this.description=resourceViewModel.description||"",this.folder_parent_id=resourceViewModel.folder_parent_id||null,this.resource_type_id=resourceViewModel.resource_type_id,void 0!==resourceViewModel.id&&(this.id=resourceViewModel.id),resourceViewModel.name&&(this.name=resourceViewModel.name),resourceViewModel.password&&(this.password=resourceViewModel.password),void 0!==resourceViewModel.expired&&(this.expired=resourceViewModel.expired)}static createFromEntity(resourceDto){const resourceViewModelDto={id:resourceDto.id,name:resourceDto.metadata.name,uri:resourceDto.metadata.uris[0],username:resourceDto.metadata.username,description:resourceDto.metadata.description,folder_parent_id:resourceDto.folder_parent_id,resource_type_id:resourceDto.resource_type_id,expired:resourceDto.expired};return new ResourcePasswordStringViewModel(resourceViewModelDto)}static getSchema(mode){const required=["name","password","resource_type_id"];return mode===_ResourceViewModel__WEBPACK_IMPORTED_MODULE_0__.A.EDIT_MODE&&required.push("id"),{type:"object",required,properties:{id:{type:"string",format:"uuid"},name:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Dt},uri:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.kW,nullable:!0},username:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.E1,nullable:!0},password:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.Bh},description:{type:"string",maxLength:_constants_inputs_const__WEBPACK_IMPORTED_MODULE_2__.G3,nullable:!0},expired:{type:"string",format:"date-time",nullable:!0},folder_parent_id:{type:"string",format:"uuid",nullable:!0},resource_type_id:{type:"string",format:"uuid"}}}}static get resourceTypeSlug(){return _entity_resourceType_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_1__._w}updateSecret(secretDto){return this.cloneWithMutation("password",secretDto.password)}canToggleDescription(){return!0}isDescriptionUnencrypted(){return!0}toResourceDto(){const dto={resource_type_id:this.resource_type_id,folder_parent_id:this.folder_parent_id,metadata:{resource_type_id:this.resource_type_id,name:this.name,uris:this.uri?[this.uri]:[],username:this.username,description:this.description}};return void 0!==this.expired&&(dto.expired=this.expired),void 0!==this.id&&(dto.id=this.id),dto}toSecretDto(){return this.password}areSecretsDifferent(originalSecretDto){return!(1===Object.keys(originalSecretDto).length&&Object.hasOwn(originalSecretDto,"password"))||this.password!==originalSecretDto.password}}const __WEBPACK_DEFAULT_EXPORT__=ResourcePasswordStringViewModel},"./src/shared/models/resource/ResourceViewModel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entity_abstract_entitySchema__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js"),_entity_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");class ResourceViewModel{static createFromEntity(){throw new Error("The ViewModel class should declare how to create a ResourceViewModel from a resource entity.")}static getSchema(){throw new Error("The ViewModel class should declare its schema.")}static get resourceTypeSlug(){throw new Error("The ViewModel class should declare its resource type slug.")}updateSecret(){throw new Error("The ViewModel class should declare how to update its secret fields.")}canToggleDescription(){throw new Error("The ViewModel class should declare if description can be toggled.")}isDescriptionUnencrypted(){throw new Error("The ViewModel class should declare if description is unencrypted.")}toResourceDto(){throw new Error("The ViewModel class should declare how to export to a resource dto.")}toSecretDto(){throw new Error("The ViewModel class should declare how to export to a secret dto.")}areSecretsDifferent(){throw new Error("The ViewModel class should declare how to compare secrets.")}cloneWithMutation(field,value){const clone={...this,[field]:value};return new this.constructor(clone)}validate(mode=ResourceViewModel.CREATE_MODE){try{_entity_abstract_entitySchema__WEBPACK_IMPORTED_MODULE_0__.A.validate(this.constructor.name,this,this.constructor.getSchema(mode))}catch(error){return error}return new _entity_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A}static get CREATE_MODE(){return"CREATE_MODE"}static get EDIT_MODE(){return"EDIT_MODE"}}const __WEBPACK_DEFAULT_EXPORT__=ResourceViewModel}}]);