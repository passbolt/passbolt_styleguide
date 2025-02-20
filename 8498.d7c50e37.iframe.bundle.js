/*! For license information please see 8498.d7c50e37.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpassbolt_styleguide=self.webpackChunkpassbolt_styleguide||[]).push([[8498],{"./src/shared/models/entity/abstract/entityV2Collection.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entityValidationError__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js"),_entityCollection__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityCollection.js"),_collectionValidationError__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/abstract/collectionValidationError.js"),_entityCollectionError__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/models/entity/abstract/entityCollectionError.js"),_entitySchema__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/models/entity/abstract/entitySchema.js");class EntityV2Collection extends _entityCollection__WEBPACK_IMPORTED_MODULE_1__.A{static _cachedSchema={};get entityClass(){throw new Error("The collection class should declare the entity class that is handled.")}constructor(dtos=[],options={}){super(dtos,options);(options?.validate??!0)&&this.validateSchema(),this.pushMany(this._props,{...options,clone:!1}),this._props=null}validateSchema(){this._props=_entitySchema__WEBPACK_IMPORTED_MODULE_4__.A.validate(this.constructor.name,this._props,this.cachedSchema)}get cachedSchema(){return this.constructor._cachedSchema[this.constructor.name]||(this.constructor._cachedSchema[this.constructor.name]=this.constructor.getSchema()),this.constructor._cachedSchema[this.constructor.name]}static getSchema(){throw new Error("The collection class should declare its schema.")}buildOrCloneEntity(data,entityOptions={}){if(!data||"object"!=typeof data)throw new TypeError(`${this.entityClass.name}::buildOrCloneEntity expects "data" to be an object.`);return data instanceof this.entityClass&&(data=data.toDto(this.entityClass?.ALL_CONTAIN_OPTIONS)),new this.entityClass(data,entityOptions)}validateBuildRules(item,options={}){}push(data,entityOptions={},options={}){const entity=this.buildOrCloneEntity(data,entityOptions);this.validateBuildRules(entity,options?.validateBuildRules),this._items.push(entity),options?.onItemPushed?.(entity)}pushOrReplace(data,entityOptions={},options={}){const replacePropertyName=options?.replacePropertyName||"id",foundIndex=this.items.findIndex((entity=>entity[replacePropertyName]===data[replacePropertyName]));if(-1!==foundIndex){this.items.splice(foundIndex,1);const entity=this.buildOrCloneEntity(data,entityOptions);this.validateBuildRules(entity,options?.validateBuildRules),this.items.splice(foundIndex,0,entity)}else this.push(data,entityOptions,options)}pushMany(data,entityOptions={},options={}){if(!Array.isArray(data))throw new TypeError(`${this.constructor.name} pushMany expects "data" to be an array.`);data.forEach(((itemDto,index)=>{try{this.push(itemDto,entityOptions,options)}catch(error){this.handlePushItemError(index,error,entityOptions)}}))}handlePushItemError(index,error,entityOptions){if(!(error instanceof _entityValidationError__WEBPACK_IMPORTED_MODULE_0__.A||error instanceof _collectionValidationError__WEBPACK_IMPORTED_MODULE_2__.A||error instanceof _entityCollectionError__WEBPACK_IMPORTED_MODULE_3__.A))throw error;if(!entityOptions?.ignoreInvalidEntity){const collectionValidationError=new _collectionValidationError__WEBPACK_IMPORTED_MODULE_2__.A;throw collectionValidationError.addItemValidationError(index,error),collectionValidationError}console.debug(`${this.entityClass.name}::pushMany ignore item (${index}) due to validation error ${JSON.stringify(error?.details)}`)}}const __WEBPACK_DEFAULT_EXPORT__=EntityV2Collection},"./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,LP:()=>RESOURCE_TYPE_VERSION_5,Sr:()=>RESOURCE_TYPE_VERSION_4});var _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js"),_abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/abstract/entityValidationError.js");const RESOURCE_TYPE_VERSION_4="v4",RESOURCE_TYPE_VERSION_5="v5";class MetadataTypesSettingsEntity extends _abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{static getSchema(){return{type:"object",required:["default_resource_types","default_folder_type","default_tag_type","default_comment_type","allow_creation_of_v5_resources","allow_creation_of_v5_folders","allow_creation_of_v5_tags","allow_creation_of_v5_comments","allow_creation_of_v4_resources","allow_creation_of_v4_folders","allow_creation_of_v4_tags","allow_creation_of_v4_comments","allow_v4_v5_upgrade","allow_v5_v4_downgrade"],properties:{default_resource_types:{type:"string",enum:[RESOURCE_TYPE_VERSION_4,RESOURCE_TYPE_VERSION_5]},default_folder_type:{type:"string",enum:[RESOURCE_TYPE_VERSION_4,RESOURCE_TYPE_VERSION_5]},default_tag_type:{type:"string",enum:[RESOURCE_TYPE_VERSION_4,RESOURCE_TYPE_VERSION_5]},default_comment_type:{type:"string",enum:[RESOURCE_TYPE_VERSION_4,RESOURCE_TYPE_VERSION_5]},allow_creation_of_v5_resources:{type:"boolean"},allow_creation_of_v5_folders:{type:"boolean"},allow_creation_of_v5_tags:{type:"boolean"},allow_creation_of_v5_comments:{type:"boolean"},allow_creation_of_v4_resources:{type:"boolean"},allow_creation_of_v4_folders:{type:"boolean"},allow_creation_of_v4_tags:{type:"boolean"},allow_creation_of_v4_comments:{type:"boolean"},allow_v4_v5_upgrade:{type:"boolean"},allow_v5_v4_downgrade:{type:"boolean"}}}}static createFromV4Default(){return new MetadataTypesSettingsEntity({default_resource_types:RESOURCE_TYPE_VERSION_4,default_folder_type:RESOURCE_TYPE_VERSION_4,default_tag_type:RESOURCE_TYPE_VERSION_4,default_comment_type:RESOURCE_TYPE_VERSION_4,allow_creation_of_v5_resources:!1,allow_creation_of_v5_folders:!1,allow_creation_of_v5_tags:!1,allow_creation_of_v5_comments:!1,allow_creation_of_v4_resources:!0,allow_creation_of_v4_folders:!0,allow_creation_of_v4_tags:!0,allow_creation_of_v4_comments:!0,allow_v4_v5_upgrade:!1,allow_v5_v4_downgrade:!1})}static createFromDefault(data={}){return new MetadataTypesSettingsEntity({...{default_resource_types:RESOURCE_TYPE_VERSION_4,default_folder_type:RESOURCE_TYPE_VERSION_4,default_tag_type:RESOURCE_TYPE_VERSION_4,default_comment_type:RESOURCE_TYPE_VERSION_4,allow_creation_of_v5_resources:!1,allow_creation_of_v5_folders:!1,allow_creation_of_v5_tags:!1,allow_creation_of_v5_comments:!1,allow_creation_of_v4_resources:!0,allow_creation_of_v4_folders:!0,allow_creation_of_v4_tags:!0,allow_creation_of_v4_comments:!0,allow_v4_v5_upgrade:!1,allow_v5_v4_downgrade:!1},...data})}validateBuildRules(){let error;if(this.isDefaultResourceTypeV4&&!this.allowCreationOfV4Resources){error=error||new _abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A;const message="Allow creation of v4 resources should be true when default resources is v4";error.addError("allow_creation_of_v4_resources","is_default",message),error.addError("default_resource_types","allow_create_v4",message)}else if(this.isDefaultResourceTypeV5&&!this.allowCreationOfV5Resources){error=error||new _abstract_entityValidationError__WEBPACK_IMPORTED_MODULE_1__.A;const message="Allow creation of v5 resources should be true when default resources is v5";error.addError("allow_creation_of_v5_resources","is_default",message),error.addError("default_resource_types","allow_create_v5",message)}if(error)throw error}get defaultResourceTypes(){return this._props.default_resource_types}get allowCreationOfV5Resources(){return this._props.allow_creation_of_v5_resources}get allowCreationOfV4Resources(){return this._props.allow_creation_of_v4_resources}get allowCreationOfV5Folders(){return this._props.allow_creation_of_v5_folders}get allowCreationOfV4Folders(){return this._props.allow_creation_of_v4_folders}get allowCreationOfV5Tags(){return this._props.allow_creation_of_v5_tags}get allowCreationOfV4Tags(){return this._props.allow_creation_of_v4_tags}get allowCreationOfV5Comments(){return this._props.allow_creation_of_v5_comments}get allowCreationOfV4Comments(){return this._props.allow_creation_of_v4_comments}get isDefaultResourceTypeV5(){return this._props.default_resource_types===RESOURCE_TYPE_VERSION_5}get isDefaultResourceTypeV4(){return this._props.default_resource_types===RESOURCE_TYPE_VERSION_4}get allowV5V4Downgrade(){return this._props.allow_v5_v4_downgrade}get allowV4V5Upgrade(){return this._props.allow_v4_v5_upgrade}}const __WEBPACK_DEFAULT_EXPORT__=MetadataTypesSettingsEntity},"./src/shared/models/entity/resourceType/resourceTypeEntity.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,zc:()=>PASSWORD_RESOURCE_TYPES});var _entity_abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2.js"),_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js"),_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js");const PASSWORD_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__._w,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Bo,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.fl,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.gG,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.a5,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Eh],TOTP_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.fl,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.KY,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.a5,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.uQ],STANDALONE_TOTP_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.KY,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.uQ],PASSWORD_STRING_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__._w,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Eh],SECRET_DESCRIPTION_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Bo,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.fl,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.gG,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.a5],METADATA_DESCRIPTION_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__._w,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.gG,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.a5,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Eh,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.uQ];class ResourceTypeEntity extends _entity_abstract_entityV2__WEBPACK_IMPORTED_MODULE_0__.A{marshall(){if("string"!=typeof this._props.slug||!(this._props.slug in _resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Ay.SCHEMAS))return void delete this._props.definition;const resourceTypeDefinitionSchema=_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Ay.SCHEMAS[this._props.slug],definition=Object.assign({},resourceTypeDefinitionSchema);this._props.definition=definition}static getSchema(){return{type:"object",required:["id","name","slug","definition"],properties:{id:{type:"string",format:"uuid"},name:{type:"string",minLength:1,maxLength:255},slug:{type:"string",minLength:1,maxLength:64},definition:{type:"object"},description:{type:"string",maxLength:255,nullable:!0},resources_count:{type:"integer"},created:{type:"string",format:"date-time"},modified:{type:"string",format:"date-time"},deleted:{type:"string",format:"date-time",nullable:!0}}}}get id(){return this._props.id}get slug(){return this._props.slug}get definition(){return this._props.definition}hasTotp(){return TOTP_RESOURCE_TYPES.includes(this.slug)}hasPassword(){return PASSWORD_RESOURCE_TYPES.includes(this.slug)}isStandaloneTotp(){return STANDALONE_TOTP_RESOURCE_TYPES.includes(this.slug)}isPasswordString(){return PASSWORD_STRING_RESOURCE_TYPES.includes(this.slug)}hasSecretDescription(){return SECRET_DESCRIPTION_RESOURCE_TYPES.includes(this.slug)}hasMetadataDescription(){return METADATA_DESCRIPTION_RESOURCE_TYPES.includes(this.slug)}get version(){return this.slug.startsWith("v5")?_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.LP:_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.Sr}isV5(){return this.version===_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.LP}isV4(){return this.version===_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.Sr}}const __WEBPACK_DEFAULT_EXPORT__=ResourceTypeEntity},"./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,Bo:()=>RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,Eh:()=>RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,KY:()=>RESOURCE_TYPE_TOTP_SLUG,WC:()=>V4_TO_V5_RESOURCE_TYPE_MAPPING,_w:()=>RESOURCE_TYPE_PASSWORD_STRING_SLUG,a5:()=>RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,fl:()=>RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,gG:()=>RESOURCE_TYPE_V5_DEFAULT_SLUG,uQ:()=>RESOURCE_TYPE_V5_TOTP_SLUG});const RESOURCE_TYPE_PASSWORD_STRING_SLUG="password-string",RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG="password-and-description",RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG="password-description-totp",RESOURCE_TYPE_TOTP_SLUG="totp",RESOURCE_TYPE_V5_DEFAULT_SLUG="v5-default",RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG="v5-password-string",RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG="v5-default-with-totp",RESOURCE_TYPE_V5_TOTP_SLUG="v5-totp-standalone",RESOURCE_TYPE_PASSWORD_STRING_LEGACY_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},description:{maxLength:1e4,nullable:!0,type:"string"},uri:{type:"string",maxLength:1024,nullable:!0}}},secret:{type:"string",maxLength:4096}},RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},uri:{type:"string",maxLength:1024,nullable:!0}}},secret:{type:"object",required:["password"],properties:{password:{type:"string",maxLength:4096},description:{type:"string",maxLength:1e4,nullable:!0}}}},RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},uri:{type:"string",maxLength:1024,nullable:!0}}},secret:{type:"object",required:["totp"],properties:{totp:{type:"object",required:["secret_key","digits","algorithm"],properties:{algorithm:{type:"string",minLength:4,maxLength:6},secret_key:{type:"string",maxLength:1024},digits:{type:"number",minimum:6,maximum:8},period:{type:"number"}}}}}},RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},uri:{type:"string",maxLength:1024,nullable:!0}}},secret:{type:"object",required:["password","totp"],properties:{password:{type:"string",maxLength:4096},description:{type:"string",maxLength:1e4,nullable:!0},totp:RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA.secret.properties.totp}}},RESOURCE_TYPE_V5_DEFAULT_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},uris:{type:"array",items:{type:"string",maxLength:1024,nullable:!0}},description:{type:"string",maxLength:1e4,nullable:!0}}},secret:{type:"object",required:["password"],properties:{password:{type:"string",maxLength:4096},description:{type:"string",maxLength:1e4,nullable:!0}}}},RESOURCE_TYPE_V5_PASSWORD_STRING_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},uris:{type:"array",items:{type:"string",maxLength:1024,nullable:!0}},description:{type:"string",maxLength:1e4,nullable:!0}}},secret:{type:"string",maxLength:4096}},RESOURCE_TYPE_V5_DEFAULT_TOTP_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},username:{type:"string",maxLength:255,nullable:!0},uris:{type:"array",items:{type:"string",maxLength:1024,nullable:!0}},description:{type:"string",maxLength:1e4,nullable:!0}}},secret:{type:"object",required:["password","totp"],properties:{password:{type:"string",maxLength:4096},description:{type:"string",maxLength:1e4,nullable:!0},totp:RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA.secret.properties.totp}}},RESOURCE_TYPE_V5_TOTP_DEFINITION_SCHEMA={resource:{type:"object",required:["name"],properties:{name:{type:"string",maxLength:255},uris:{type:"array",items:{type:"string",maxLength:1024,nullable:!0}},description:{type:"string",maxLength:1e4,nullable:!0}}},secret:RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA.secret},V4_TO_V5_RESOURCE_TYPE_MAPPING={[RESOURCE_TYPE_PASSWORD_STRING_SLUG]:RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,[RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG]:RESOURCE_TYPE_V5_DEFAULT_SLUG,[RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG]:RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,[RESOURCE_TYPE_TOTP_SLUG]:RESOURCE_TYPE_V5_TOTP_SLUG};const __WEBPACK_DEFAULT_EXPORT__=new class ResourceTypeSchemasDefinition{get SCHEMAS(){return{[RESOURCE_TYPE_PASSWORD_STRING_SLUG]:RESOURCE_TYPE_PASSWORD_STRING_LEGACY_DEFINITION_SCHEMA,[RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG]:RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_DEFINITION_SCHEMA,[RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG]:RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_DEFINITION_SCHEMA,[RESOURCE_TYPE_TOTP_SLUG]:RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA,[RESOURCE_TYPE_V5_DEFAULT_SLUG]:RESOURCE_TYPE_V5_DEFAULT_DEFINITION_SCHEMA,[RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG]:RESOURCE_TYPE_V5_PASSWORD_STRING_DEFINITION_SCHEMA,[RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG]:RESOURCE_TYPE_V5_DEFAULT_TOTP_DEFINITION_SCHEMA,[RESOURCE_TYPE_V5_TOTP_SLUG]:RESOURCE_TYPE_V5_TOTP_DEFINITION_SCHEMA}}}},"./src/shared/models/entity/resourceType/resourceTypesCollection.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _entity_abstract_entityV2Collection__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/models/entity/abstract/entityV2Collection.js"),_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/models/entity/metadata/metadataTypesSettingsEntity.js"),_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeSchemasDefinition.js"),_resourceTypeEntity__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/models/entity/resourceType/resourceTypeEntity.js");const SUPPORTED_RESOURCE_TYPES=[_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__._w,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Bo,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.fl,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.KY,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.gG,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.a5,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.Eh,_resourceTypeSchemasDefinition__WEBPACK_IMPORTED_MODULE_2__.uQ];class ResourceTypesCollection extends _entity_abstract_entityV2Collection__WEBPACK_IMPORTED_MODULE_0__.A{get entityClass(){return _resourceTypeEntity__WEBPACK_IMPORTED_MODULE_3__.Ay}constructor(dtos=[],options={}){super(dtos,options)}static getSchema(){return{type:"array",items:_resourceTypeEntity__WEBPACK_IMPORTED_MODULE_3__.Ay.getSchema()}}validateBuildRules(item,options={}){this.assertNotExist("id",item._props.id,{haystackSet:options?.uniqueIdsSetCache}),this.assertNotExist("slug",item._props.slug,{haystackSet:options?.uniqueSlugsSetCache})}isResourceTypeIdPresent(id){return this._items.some((resourceType=>resourceType.id===id))}filterByPasswordResourceTypes(){this.filterByPropertyValueIn("slug",_resourceTypeEntity__WEBPACK_IMPORTED_MODULE_3__.zc)}filterByResourceTypeVersion(version){this.filterByCallback((resourceType=>resourceType.version===version))}getFirstById(id){return this.getFirst("id",id)}getFirstBySlug(slug){return this.getFirst("slug",slug)}hasOneWithSlug(slug){return Boolean(this.getFirstBySlug(slug))}hasSomePasswordResourceTypes(version=_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.Sr){return this.items.some((resourceType=>resourceType.hasPassword()&&resourceType.version===version))}hasSomeTotpResourceTypes(version=_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.Sr){return this.items.some((resourceType=>resourceType.hasTotp()&&resourceType.version===version))}hasSomeOfVersion(version=_metadata_metadataTypesSettingsEntity__WEBPACK_IMPORTED_MODULE_1__.Sr){return this.items.some((resourceType=>resourceType.version===version))}pushMany(data,entityOptions={},options={}){const uniqueIdsSetCache=new Set(this.extract("id")),uniqueSlugsSetCache=new Set(this.extract("slug"));options={onItemPushed:item=>{uniqueIdsSetCache.add(item.id),uniqueSlugsSetCache.add(item.slug)},validateBuildRules:{...options?.validateBuildRules,uniqueIdsSetCache,uniqueSlugsSetCache},...options},super.pushMany(data,entityOptions,options)}push(data,entityOptions={},options={}){SUPPORTED_RESOURCE_TYPES.includes(data?.slug)&&super.push(data,entityOptions,options)}}const __WEBPACK_DEFAULT_EXPORT__=ResourceTypesCollection}}]);